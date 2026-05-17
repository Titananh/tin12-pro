// ==========================================
// Auth - Me API Route
// GET /api/auth/me
// ==========================================

import { NextResponse } from 'next/server';
import { createError, createSuccess } from '@/lib/validation';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        createError('Chưa đăng nhập', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createSuccess({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        track: user.track,
        xp: user.xp,
        level: user.level,
      })
    );
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json(
      createError('Lỗi server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}