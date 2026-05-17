// ==========================================
// Lessons API Route
// GET /api/lessons
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess } from '@/lib/validation';
import { getAllLessons, getLessonBySlug } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const courseId = searchParams.get('courseId');

    if (slug) {
      const lesson = getLessonBySlug(slug);
      if (!lesson) {
        return NextResponse.json(
          createError('Không tìm thấy bài học', 'NOT_FOUND'),
          { status: 404 }
        );
      }
      return NextResponse.json(createSuccess(lesson));
    }

    let lessons = getAllLessons();

    if (courseId) {
      lessons = lessons.filter(l => l.courseId === courseId);
    }

    return NextResponse.json(createSuccess(lessons));
  } catch (error) {
    console.error('Lessons error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}