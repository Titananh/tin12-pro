// ==========================================
// Exams API Route
// GET /api/exams - list all exams
// POST /api/exams/start - start an exam attempt
// POST /api/exams/submit - submit exam answers
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createError, createSuccess, startExamSchema, submitExamSchema, validate } from '@/lib/validation';
import { getCurrentUser } from '@/lib/auth';
import { exams } from '@/content/exams';

export async function GET() {
  try {
    // Return exam list (without answers)
    const examList = exams.map(e => ({
      id: e.id,
      title: e.title,
      description: e.description,
      duration: e.duration,
      part1: {
        totalQuestions: e.part1.totalQuestions,
        pointsEach: e.part1.pointsEach,
      },
      part2: {
        totalQuestions: e.part2.totalQuestions,
        pointsEach: e.part2.pointsEach,
      },
    }));

    return NextResponse.json(createSuccess(examList));
  } catch (error) {
    console.error('Exams error:', error);
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
    const { action } = body;

    if (action === 'start') {
      const validation = validate(startExamSchema, body);
      if (!validation.success) {
        return NextResponse.json(
          createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }

      const { examId } = validation.data;
      const exam = exams.find(e => e.id === examId);
      if (!exam) {
        return NextResponse.json(
          createError('Không tìm thấy đề thi', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      // Return exam questions (without correct answers for part 2)
      const examData = {
        id: exam.id,
        title: exam.title,
        duration: exam.duration,
        part1: {
          questions: exam.part1.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            topic: q.topic,
            difficulty: q.difficulty,
          })),
        },
        part2: {
          groups: exam.part2.groups.map(g => ({
            id: g.id,
            context: g.context,
            statements: g.statements.map(s => ({
              id: s.id,
              text: s.text,
            })),
          })),
        },
      };

      return NextResponse.json(createSuccess(examData));
    }

    if (action === 'submit') {
      const validation = validate(submitExamSchema, body);
      if (!validation.success) {
        return NextResponse.json(
          createError(validation.errors.join(', '), 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }

      const { examId, answers, timeSpent } = validation.data;
      const exam = exams.find(e => e.id === examId);
      if (!exam) {
        return NextResponse.json(
          createError('Không tìm thấy đề thi', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      // Grade Part 1 (MCQ)
      const part1Questions = exam.part1.questions;
      const part1Results = part1Questions.map(q => ({
        id: q.id,
        userAnswer: answers[q.id],
        correctAnswer: q.correctAnswer,
        isCorrect: answers[q.id] === q.correctAnswer,
      }));

      // Grade Part 2 (True/False groups)
      const part2Results = exam.part2.groups.map(g => {
        const userAnswer = answers[g.id] as boolean[];
        return {
          id: g.id,
          statements: g.statements.map((s, i) => ({
            id: s.id,
            isCorrect: s.isCorrect,
            userAnswer: userAnswer?.[i],
          })),
        };
      });

      // Calculate scores
      const part1Correct = part1Results.filter(r => r.isCorrect).length;
      const part1Score = (part1Correct / part1Questions.length) * 100;

      let part2Correct = 0;
      let part2Total = 0;
      for (const group of part2Results) {
        for (const stmt of group.statements) {
          part2Total++;
          if (stmt.isCorrect === stmt.userAnswer) {
            part2Correct++;
          }
        }
      }
      const part2Score = (part2Correct / part2Total) * 100;

      const totalScore = (part1Score * 0.67) + (part2Score * 0.33); // Part 1 = 6pts, Part 2 = 3pts

      return NextResponse.json(createSuccess({
        score: Math.round(totalScore * 10) / 10,
        part1Score: Math.round(part1Score * 10) / 10,
        part2Score: Math.round(part2Score * 10) / 10,
        part1Correct,
        part1Total: part1Questions.length,
        part2Correct,
        part2Total,
        timeSpent,
        detailedResults: {
          part1: part1Results,
          part2: part2Results,
        },
      }));
    }

    return NextResponse.json(
      createError('Action không hợp lệ', 'INVALID_ACTION'),
      { status: 400 }
    );
  } catch (error) {
    console.error('Exam error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi server' },
      { status: 500 }
    );
  }
}