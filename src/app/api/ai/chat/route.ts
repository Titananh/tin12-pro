// ==========================================
// AI Tutor Chat API Route
// POST /api/ai/chat
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { generateTutorResponse, type TutorContext, type TutorMode } from '@/lib/ai-tutor';

interface ChatBody {
  message?: string;
  mode?: TutorMode;
  context?: TutorContext;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatBody;
    if (!body.message?.trim()) {
      return NextResponse.json({ success: false, error: 'Tin nhắn không được trống' }, { status: 400 });
    }

    const response = generateTutorResponse(body.message, body.context, body.mode);
    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Lỗi xử lý AI Tutor' }, { status: 500 });
  }
}
