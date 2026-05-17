// ==========================================
// Auth - Logout API Route
// POST /api/auth/logout
// ==========================================

import { NextResponse } from 'next/server';
import { createSuccess } from '@/lib/validation';

export async function POST() {
  try {
    // In a real app, would invalidate the session token
    // For demo, just return success
    
    const response = NextResponse.json(
      createSuccess(null, 'Đăng xuất thành công')
    );

    // Clear auth cookie
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}