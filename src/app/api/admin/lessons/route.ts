// ==========================================
// Admin - Lessons CRUD API
// POST /api/admin/lessons - create lesson
// PUT /api/admin/lessons/[id] - update lesson
// DELETE /api/admin/lessons/[id] - delete lesson
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, createLessonSchema, validate } from '@/lib/validation';
import { requireRole } from '@/lib/rbac';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'lessons', 'create');

    const body = await request.json();
    const validation = validate(createLessonSchema, body);
    if (!validation.success) {
      return NextResponse.json(createError(validation.errors.join(', '), 'VALIDATION_ERROR'), { status: 400 });
    }

    const lessonData = validation.data;
    
    const newLesson = {
      id: `lesson-${Date.now()}`,
      slug: lessonData.slug || lessonData.title.toLowerCase().replace(/\s+/g, '-'),
      ...lessonData,
      content: lessonData.content || {},
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(createSuccess(newLesson, 'Tạo bài học thành công'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin create lesson error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}