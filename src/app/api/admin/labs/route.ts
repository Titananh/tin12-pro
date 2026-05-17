// ==========================================
// Admin - Labs CRUD API
// GET /api/admin/labs - list all (admin)
// POST /api/admin/labs - create lab
// PUT /api/admin/labs/[id] - update lab
// DELETE /api/admin/labs/[id] - delete lab
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess } from '@/lib/validation';
import { requireRole } from '@/lib/rbac';
import { getCurrentUser } from '@/lib/auth';
import { labs } from '@/content/labs';

export async function GET() {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'labs', 'read');

    return NextResponse.json(createSuccess(labs));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin labs error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    requireRole(user, 'labs', 'create');

    const body = await request.json();
    
    const newLab = {
      id: `lab-${Date.now()}`,
      slug: body.title?.toLowerCase().replace(/\s+/g, '-') || `lab-${Date.now()}`,
      title: body.title || 'Untitled Lab',
      description: body.description || '',
      type: body.type || 'HTML_CSS',
      difficulty: body.difficulty || 'MEDIUM',
      estimatedMinutes: body.estimatedMinutes || 30,
      starterCode: body.starterCode || '',
      solutionCode: body.solutionCode,
      instructions: body.instructions || [],
      hints: body.hints || [],
      rubric: body.rubric || [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(createSuccess(newLab, 'Tạo lab thành công'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(createError('Không có quyền', 'FORBIDDEN'), { status: 403 });
    }
    console.error('Admin create lab error:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}