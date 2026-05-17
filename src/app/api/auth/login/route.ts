// ==========================================
// Auth - Login API Route
// POST /api/auth/login
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema, validate, createError, createSuccess } from '@/lib/validation';
import { verifyPassword, createDemoToken } from '@/lib/auth';
import { getUserByEmail } from '@/lib/db';
import { isRateLimited } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(`login:${clientIp}`, 10, 60000)) {
      return NextResponse.json(
        createError('Quá nhiều yêu cầu. Vui lòng thử lại.', 'RATE_LIMITED'),
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    
    // Validate input
    const validation = validate(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user in database
    const dbUser = await getUserByEmail(email);
    
    if (dbUser && dbUser.passwordHash) {
      // Verify password
      if (!verifyPassword(password, dbUser.passwordHash)) {
        return NextResponse.json(
          createError('Email hoặc mật khẩu không đúng', 'INVALID_CREDENTIALS'),
          { status: 401 }
        );
      }

      // Create auth token
      const token = createDemoToken({
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role as 'STUDENT' | 'TEACHER' | 'ADMIN',
        track: dbUser.track as 'CS' | 'ICT' | 'GENERAL',
        xp: dbUser.xp,
        level: dbUser.level,
      });

      return NextResponse.json(
        createSuccess({
          user: {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
            track: dbUser.track,
            xp: dbUser.xp,
            level: dbUser.level,
          },
          token,
        }, 'Đăng nhập thành công')
      );
    }

    // Demo mode - accept any valid email format with password >= 6 chars
    if (!dbUser) {
      // For demo, create a mock user session
      const mockUser = {
        id: `demo-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'STUDENT' as const,
        track: 'GENERAL' as const,
        xp: 0,
        level: 1,
      };

      const token = createDemoToken(mockUser);

      return NextResponse.json(
        createSuccess({
          user: mockUser,
          token,
        }, 'Đăng nhập thành công (demo mode)')
      );
    }

    return NextResponse.json(
      createError('Email hoặc mật khẩu không đúng', 'INVALID_CREDENTIALS'),
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      createError('Lỗi server. Vui lòng thử lại.', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}