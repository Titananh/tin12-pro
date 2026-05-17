// ==========================================
// AI Tutor API Route
// POST /api/ai-tutor/chat
// Mock AI tutor for demo
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, chatSchema, validate } from '@/lib/validation';
import { getCurrentUser } from '@/lib/auth';
import { generateTutorResponse, type TutorContext, type TutorMode } from '@/lib/ai-tutor';

function parseTutorContext(context?: string): TutorContext | undefined {
  if (!context) return undefined;
  try {
    return JSON.parse(context) as TutorContext;
  } catch {
    return { currentTopic: context };
  }
}

function parseTutorMode(context?: string): TutorMode | undefined {
  if (!context) return undefined;
  try {
    const parsed = JSON.parse(context) as { mode?: TutorMode };
    return parsed.mode;
  } catch {
    return undefined;
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
    const validation = validate(chatSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { message, context } = validation.data;

    const tutorContext = parseTutorContext(context);
    const mode = parseTutorMode(context);
    const response = generateTutorResponse(message, tutorContext, mode);

    return NextResponse.json(createSuccess({
      ...response,
      timestamp: new Date().toISOString(),
      userId: user.id,
    }));
  } catch (error) {
    console.error('AI Tutor error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
