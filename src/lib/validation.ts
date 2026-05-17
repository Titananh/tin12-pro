// ==========================================
// Validation Utilities - Tin12 Pro Cánh Diều
// Input validation schemas and helpers
// ==========================================

import { z } from 'zod';

// ============ BASIC VALIDATORS ============

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Mật khẩu phải có ít nhất 6 ký tự');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate UUID format
 */
export function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length <= 50;
}

// ============ ZOD SCHEMAS ============

// User schemas
export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100),
  track: z.enum(['CS', 'ICT', 'GENERAL']).optional().default('GENERAL'),
});

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

// Course schemas
export const createCourseSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được trống').max(200),
  description: z.string().max(1000).optional().default(''),
  slug: z.string().min(1).max(100).optional(),
  icon: z.string().max(20).optional().default('📚'),
  track: z.enum(['CS', 'ICT', 'GENERAL']).default('GENERAL'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  estimatedHours: z.number().min(1).max(500).optional().default(20),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().default('#2563EB'),
});

export const updateCourseSchema = createCourseSchema.partial();

// Lesson schemas
export const createLessonSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được trống').max(200),
  description: z.string().max(1000).optional().default(''),
  slug: z.string().min(1).max(100).optional(),
  moduleId: z.string().min(1),
  estimatedMinutes: z.number().min(5).max(300).optional().default(45),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  track: z.enum(['CS', 'ICT', 'GENERAL']).default('GENERAL'),
  order: z.number().min(1).optional().default(1),
  content: z.object({
    learningObjectives: z.array(z.string()).optional().default([]),
    explainLikeNew: z.string().optional().default(''),
    theory: z.string().optional().default(''),
    deepDive: z.string().optional().default(''),
    realWorldExamples: z.array(z.string()).optional().default([]),
    visualSummary: z.string().optional().default(''),
    commonMistakes: z.array(z.string()).optional().default([]),
    quickCheck: z.array(z.any()).optional().default([]),
    practice: z.string().optional().default(''),
    examCorner: z.string().optional().default(''),
    sixtySecondSummary: z.string().optional().default(''),
    flashcards: z.array(z.string()).optional().default([]),
    nextStep: z.string().optional().default(''),
  }).optional().default({}),
});

// Question schemas
export const createQuestionSchema = z.object({
  type: z.enum(['MCQ', 'TRUE_FALSE']),
  question: z.string().min(1, 'Câu hỏi không được trống').max(1000),
  options: z.array(z.string()).optional(),
  statements: z.array(z.string()).optional(),
  correctAnswer: z.union([z.number(), z.array(z.boolean())]),
  explanation: z.string().max(500).optional().default(''),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  topic: z.string().min(1).max(100),
  lessonId: z.string().optional(),
});

export const submitAnswerSchema = z.object({
  questionId: z.string().min(1),
  answer: z.union([z.number(), z.array(z.boolean())]),
  timeSpent: z.number().min(0).optional().default(0),
});

// Exam schemas
export const startExamSchema = z.object({
  examId: z.string().min(1),
});

export const submitExamSchema = z.object({
  examId: z.string().min(1),
  answers: z.record(z.string(), z.union([z.number(), z.array(z.boolean())])),
  timeSpent: z.number().min(0).optional().default(0),
});

// Lab schemas
export const submitLabSchema = z.object({
  labId: z.string().min(1),
  code: z.string().min(1, 'Code không được trống'),
});

// Flashcard schemas
export const reviewFlashcardSchema = z.object({
  cardId: z.string().min(1),
  quality: z.number().min(0).max(5).int(),
});

// AI Tutor schemas
export const chatSchema = z.object({
  message: z.string().min(1, 'Tin nhắn không được trống').max(2000),
  context: z.string().optional(),
});

// ============ VALIDATION HELPERS ============

/**
 * Parse and validate data against schema
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors.map(e => e.message) };
    }
    return { success: false, errors: ['Validation error'] };
  }
}

/**
 * Safe parse JSON
 */
export function safeParseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Validate array of IDs
 */
export function validateIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids.filter(isValidId);
}

/**
 * Create error response object
 */
export function createError(message: string, code?: string) {
  return {
    error: message,
    code: code || 'VALIDATION_ERROR',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create success response object
 */
export function createSuccess<T>(data: T, message?: string) {
  return {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  };
}