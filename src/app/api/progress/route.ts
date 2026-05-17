// ==========================================
// Progress API Route
// GET /api/progress - get user progress overview
// POST /api/progress/lesson - update lesson progress
// POST /api/progress/quiz - save quiz score
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess } from '@/lib/validation';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const _user = await getCurrentUser();
    
    // Demo progress data (in production, would come from database)
    const progressData = {
      completedLessons: ['lesson-1-1', 'lesson-1-2'],
      completedQuizzes: ['q-kt-1', 'q-kt-2', 'q-ai-1'],
      quizScores: {
        'q-kt-1': { score: 80, totalQuestions: 5 },
        'q-kt-2': { score: 100, totalQuestions: 5 },
        'q-ai-1': { score: 60, totalQuestions: 5 },
      },
      examScores: {},
      streak: 3,
      xp: 150,
      level: 2,
      topics: {
        'kiến-trúc-máy-tính': { score: 75, questionsAnswered: 10 },
        'ai-ml': { score: 60, questionsAnswered: 5 },
        'mạng-máy-tính': { score: 0, questionsAnswered: 0 },
      },
    };

    return NextResponse.json(createSuccess(progressData));
  } catch (error) {
    console.error('Progress error:', error);
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
    const { action, ...data } = body;

    if (action === 'lesson') {
      // Update lesson progress
      const { lessonId, completed, timeSpent } = data;
      
      // In production, would save to database
      return NextResponse.json(createSuccess({
        lessonId,
        completed: completed || false,
        timeSpent,
        updatedAt: new Date().toISOString(),
      }));
    }

    if (action === 'quiz') {
      // Save quiz score
      const { quizId, score, totalQuestions } = data;
      
      return NextResponse.json(createSuccess({
        quizId,
        score,
        totalQuestions,
        completedAt: new Date().toISOString(),
      }));
    }

    return NextResponse.json(
      createError('Action không hợp lệ', 'INVALID_ACTION'),
      { status: 400 }
    );
  } catch (error) {
    console.error('Progress error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}