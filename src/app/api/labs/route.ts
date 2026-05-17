// ==========================================
// Labs API Route
// GET /api/labs - list all labs
// GET /api/labs/[slug] - get lab details
// POST /api/labs/submit - submit lab solution
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, submitLabSchema, validate } from '@/lib/validation';
import { getLabBySlug, getAllLabs } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { labs } from '@/content/labs';
import { sanitizeHTML } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const lab = getLabBySlug(slug);
      if (!lab) {
        return NextResponse.json(
          createError('Không tìm thấy lab', 'NOT_FOUND'),
          { status: 404 }
        );
      }
      return NextResponse.json(createSuccess(lab));
    }

    const labList = getAllLabs().map(l => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      description: l.description,
      type: l.type,
      difficulty: l.difficulty,
      estimatedMinutes: l.estimatedMinutes,
      instructions: l.instructions.map(i => i.text),
    }));

    return NextResponse.json(createSuccess(labList));
  } catch (error) {
    console.error('Labs error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        createError('Vui lòng đăng nhập', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validate(submitLabSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const { labId, code } = validation.data;

    // Find lab
    const lab = labs.find(l => l.id === labId || l.slug === labId);
    if (!lab) {
      return NextResponse.json(
        createError('Không tìm thấy lab', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Sanitize code (basic XSS prevention for lab preview)
    const sanitizedCode = sanitizeHTML(code);

    // Simple rubric-based scoring (demo)
    let score = 0;
    const feedback: string[] = [];

    if (lab.rubric && lab.rubric.length > 0) {
      for (const item of lab.rubric) {
        // Simple heuristic scoring
        const criterion = item.criterion.toLowerCase();
        const _hasValidContent = sanitizedCode.length > 50;
        
        // Check for basic HTML structure if expected
        if (criterion.includes('html') && sanitizedCode.includes('<html>')) {
          score += item.points * 0.5;
          feedback.push(`✓ Cấu trúc HTML cơ bản`);
        }
        if (criterion.includes('heading') && /<h[1-6]>/i.test(sanitizedCode)) {
          score += item.points * 0.5;
          feedback.push(`✓ Có thẻ heading`);
        }
        if (criterion.includes('paragraph') && /<p>/i.test(sanitizedCode)) {
          score += item.points * 0.5;
          feedback.push(`✓ Có thẻ paragraph`);
        }
      }
    } else {
      // Basic scoring based on code length and structure
      score = Math.min(100, Math.round(sanitizedCode.length / 10));
    }

    return NextResponse.json(createSuccess({
      labId: lab.id,
      score: Math.round(score),
      feedback: feedback.length > 0 ? feedback : ['Đã lưu bài nộp'],
      submittedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Lab submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}