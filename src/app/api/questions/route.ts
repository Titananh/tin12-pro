// ==========================================
// Questions API Route
// GET /api/questions
// POST /api/questions/submit (practice)
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, submitAnswerSchema, validate } from '@/lib/validation';
import { questions } from '@/content/questions';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');
    const type = searchParams.get('type');

    let filtered = questions;

    if (topic) {
      filtered = filtered.filter(q => q.topic === topic);
    }

    if (type) {
      filtered = filtered.filter(q => q.type === type);
    }

    // Remove correctAnswer from response (don't expose answers)
    const safeQuestions = filtered.map(q => ({
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      statements: q.statements,
      explanation: q.explanation,
      difficulty: q.difficulty,
      topic: q.topic,
    }));

    return NextResponse.json(createSuccess(safeQuestions));
  } catch (error) {
    console.error('Questions error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication for submission
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        createError('Vui lòng đăng nhập', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validate(submitAnswerSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { questionId, answer } = validation.data;

    // Find question
    const question = questions.find(q => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        createError('Không tìm thấy câu hỏi', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Check answer
    let isCorrect = false;
    if (question.type === 'mcq') {
      isCorrect = answer === question.correctAnswer;
    } else if (question.type === 'true-false') {
      const correctArr = question.correctAnswer as boolean[];
      const userArr = answer as boolean[];
      isCorrect = JSON.stringify(correctArr) === JSON.stringify(userArr);
    }

    // In production, would save to database
    // For demo, just return result

    return NextResponse.json(createSuccess({
      questionId,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    }));
  } catch (error) {
    console.error('Question submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}