// ==========================================
// Admin - Questions CRUD API
// GET /api/admin/questions - list all (admin)
// POST /api/admin/questions - create question
// PUT /api/admin/questions/[id] - update question
// DELETE /api/admin/questions/[id] - delete question
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, createQuestionSchema, validate } from '@/lib/validation';
import { requireRole } from '@/lib/rbac';
import { getCurrentUser } from '@/lib/auth';
import { questions } from '@/content/questions';

export async function GET() {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'questions', 'read');

    return NextResponse.json(createSuccess(questions));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin questions error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'questions', 'create');

    const body = await request.json();
    const validation = validate(createQuestionSchema, body);
    if (!validation.success) {
      return NextResponse.json(createError(validation.errors.join(', '), 'VALIDATION_ERROR'), { status: 400 });
    }

    const questionData = validation.data;
    
    const newQuestion = {
      id: `q-${Date.now()}`,
      ...questionData,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(createSuccess(newQuestion, 'Tạo câu hỏi thành công'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin create question error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}