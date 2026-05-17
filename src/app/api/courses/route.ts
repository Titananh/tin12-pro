// ==========================================
// Courses API Route
// GET /api/courses
// ==========================================

import { NextResponse } from 'next/server';
import { createSuccess } from '@/lib/validation';
import { getAllCourses } from '@/lib/db';

export async function GET() {
  try {
    const courses = getAllCourses();

    return NextResponse.json(
      createSuccess(courses)
    );
  } catch (error) {
    console.error('Courses error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}