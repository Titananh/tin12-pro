// ==========================================
// Admin - Courses CRUD API
// GET /api/admin/courses - list all (admin)
// POST /api/admin/courses - create course
// PUT /api/admin/courses/[id] - update course
// DELETE /api/admin/courses/[id] - delete course
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, createCourseSchema, validate } from '@/lib/validation';
import { requireRole } from '@/lib/rbac';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'courses', 'read');

    // Return all courses (admin view)
    const { courses } = await import('@/content/courses');
    return NextResponse.json(createSuccess(courses));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin courses error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'courses', 'create');

    const body = await request.json();
    const validation = validate(createCourseSchema, body);
    if (!validation.success) {
      return NextResponse.json(createError(validation.errors.join(', '), 'VALIDATION_ERROR'), { status: 400 });
    }

    const courseData = validation.data;
    
    // In production, would save to database
    // For demo, just return the data
    const newCourse = {
      id: `course-${Date.now()}`,
      slug: courseData.slug || courseData.title.toLowerCase().replace(/\s+/g, '-'),
      ...courseData,
      modules: [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(createSuccess(newCourse, 'Tạo khóa học thành công'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin create course error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}