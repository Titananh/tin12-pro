// ==========================================
// Flashcards API Route
// GET /api/flashcards - get flashcard decks
// GET /api/flashcards/today - get cards due today
// POST /api/flashcards/review - submit review result
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, reviewFlashcardSchema, validate } from '@/lib/validation';
import { getFlashcardsByDeck } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { flashcards, decks } from '@/content/flashcards';
import { updateCardAfterReview } from '@/lib/flashcards';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deckId = searchParams.get('deckId');
    const today = searchParams.get('today') === 'true';

    if (deckId) {
      const cards = getFlashcardsByDeck(deckId);
      return NextResponse.json(createSuccess(cards));
    }

    if (today) {
      // Get cards due today (demo - show random selection)
      const dueCards = flashcards.slice(0, 20);
      return NextResponse.json(createSuccess(dueCards));
    }

    // Return all decks
    return NextResponse.json(createSuccess(decks));
  } catch (error) {
    console.error('Flashcards error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        createError('Vui lòng đăng nhập', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validate(reviewFlashcardSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { cardId, quality } = validation.data;

    // Find card
    const card = flashcards.find(f => f.id === cardId);
    if (!card) {
      return NextResponse.json(
        createError('Không tìm thấy flashcard', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Calculate next review using SM-2 simplified
    const currentProgress = {
      id: cardId,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReviewAt: new Date().toISOString(),
      reviewCount: 0,
    };

    const wasCorrect = quality >= 3;
    const result = updateCardAfterReview(currentProgress, wasCorrect);

    return NextResponse.json(createSuccess({
      cardId,
      nextReviewAt: result.nextReviewAt,
      newInterval: result.newInterval,
      wasCorrect,
    }));
  } catch (error) {
    console.error('Flashcard review error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}