// ==========================================
// Auth - Register API Route
// POST /api/auth/register
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { registerSchema, validate, createError, createSuccess } from '@/lib/validation';
import { hashPassword, createDemoToken } from '@/lib/auth';
import { getUserByEmail, createUser } from '@/lib/db';
import { isRateLimited } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(`register:${clientIp}`, 5, 60000)) {
      return NextResponse.json(
        createError('Quá nhiều yêu cầu. Vui lòng thử lại sau.', 'RATE_LIMITED'),
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    
    // Validate input
    const validation = validate(registerSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { email, password, name, track } = validation.data;

    // Check if database is available
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        createError('Email đã được sử dụng', 'USER_EXISTS'),
        { status: 409 }
      );
    }

    // Hash password (demo only - use bcrypt in production)
    const passwordHash = hashPassword(password);

    // Create user
    const newUser = await createUser({
      email,
      passwordHash,
      name,
      track,
    });

    if (!newUser) {
      // Database not available - return mock success for demo
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        name,
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
        }, 'Đăng ký thành công (demo mode)')
      );
    }

    // Create auth token
    const token = createDemoToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role as 'STUDENT' | 'TEACHER' | 'ADMIN',
      track: newUser.track as 'CS' | 'ICT' | 'GENERAL',
      xp: newUser.xp,
      level: newUser.level,
    });

    return NextResponse.json(
      createSuccess({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          track: newUser.track,
          xp: newUser.xp,
          level: newUser.level,
        },
        token,
      }, 'Đăng ký thành công')
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      createError('Lỗi server. Vui lòng thử lại.', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}