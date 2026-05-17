// ==========================================
// Database Utilities - Tin12 Pro Cánh Diều
// Prisma client with in-memory fallback for demo
// ==========================================

// Prisma client - only import when DATABASE_URL is set
// For demo mode without DB, use local content
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

async function getPrismaClient() {
  if (process.env.DATABASE_URL && !prisma) {
    try {
      const { PrismaClient } = await import('@prisma/client');
      prisma = new PrismaClient();
    } catch {
      // @prisma/client not installed, continue without DB
      prisma = null;
    }
  }
  return prisma;
}

// Re-export for convenience
export { getPrismaClient };

// ============ CONTENT STORE (for demo without DB) ============

import { courses } from '@/content/courses';
import { lessons } from '@/content/lessons';
import { questions } from '@/content/questions';
import { labs } from '@/content/labs';
import { exams } from '@/content/exams';
import { flashcards } from '@/content/flashcards';

export interface ContentStore {
  courses: typeof courses;
  lessons: typeof lessons;
  questions: typeof questions;
  labs: typeof labs;
  exams: typeof exams;
  flashcards: typeof flashcards;
}

// ============ DATABASE CHECK ============

let dbAvailable = false;

export async function checkDatabaseAvailable(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  
  try {
    const client = await getPrismaClient();
    if (!client) return false;
    await client.$queryRaw`SELECT 1`;
    dbAvailable = true;
    return true;
  } catch {
    dbAvailable = false;
    return false;
  }
}

export function isDatabaseEnabled(): boolean {
  return dbAvailable && !!process.env.DATABASE_URL;
}

// ============ CONTENT HELPERS ============

/**
 * Get course by slug from local content
 */
export function getCourseBySlug(slug: string) {
  return courses.find(c => c.slug === slug);
}

/**
 * Get lesson by slug from local content
 */
export function getLessonBySlug(slug: string) {
  return lessons.find(l => l.slug === slug);
}

/**
 * Get lab by slug from local content
 */
export function getLabBySlug(slug: string) {
  return labs.find(l => l.slug === slug);
}

/**
 * Get exam by id from local content
 */
export function getExamById(id: string) {
  return exams.find(e => e.id === id);
}

/**
 * Get flashcards by deck from local content
 */
export function getFlashcardsByDeck(deckId: string) {
  return flashcards.filter(f => f.deckId === deckId);
}

/**
 * Get questions by topic from local content
 */
export function getQuestionsByTopic(topic: string) {
  return questions.filter(q => q.topic === topic);
}

/**
 * Get all courses from local content
 */
export function getAllCourses() {
  return courses;
}

/**
 * Get all lessons from local content
 */
export function getAllLessons() {
  return lessons;
}

/**
 * Get all labs from local content
 */
export function getAllLabs() {
  return labs;
}

// ============ DB OPERATION WRAPPERS ============

/**
 * Get user by email (DB) or mock
 */
export async function getUserByEmail(email: string) {
  if (!isDatabaseEnabled()) {
    return null; // Use mock auth in demo mode
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      passwordHash: true,
      track: true,
      xp: true,
      level: true,
    },
  });
}

/**
 * Create user (DB) or mock
 */
export async function createUser(data: {
  email: string;
  passwordHash: string;
  name: string;
  track?: string;
}) {
  if (!isDatabaseEnabled()) {
    return null; // Use mock auth in demo mode
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
      track: (data.track as 'CS' | 'ICT' | 'GENERAL') || 'GENERAL',
    },
  });
}

/**
 * Get lesson progress
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.lessonProgress.findUnique({
    where: {
      userId_lessonId: { userId, lessonId },
    },
  });
}

/**
 * Update lesson progress
 */
export async function upsertLessonProgress(userId: string, lessonId: string, completed: boolean) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId, lessonId },
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
    },
    create: {
      userId,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null,
    },
  });
}

/**
 * Save quiz score
 */
export async function saveQuizScore(userId: string, quizId: string, score: number, totalQuestions: number) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.quizScore.create({
    data: {
      userId,
      quizId,
      score,
      totalQuestions,
    },
  });
}

/**
 * Get exam attempt
 */
export async function getExamAttempt(userId: string, examId: string) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.examAttempt.findFirst({
    where: {
      userId,
      examId,
      completedAt: null,
    },
    orderBy: {
      startedAt: 'desc',
    },
  });
}

/**
 * Create exam attempt
 */
export async function createExamAttempt(userId: string, examId: string) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.examAttempt.create({
    data: {
      userId,
      examId,
    },
  });
}

/**
 * Complete exam attempt
 */
export async function completeExamAttempt(
  attemptId: string,
  score: number,
  part1Score: number,
  part2Score: number,
  timeSpent: number
) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.examAttempt.update({
    where: { id: attemptId },
    data: {
      completedAt: new Date(),
      score,
      part1Score,
      part2Score,
      timeSpent,
    },
  });
}

/**
 * Save flashcard progress
 */
export async function upsertFlashcardProgress(
  userId: string,
  cardId: string,
  data: {
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReviewAt: Date;
    reviewCount: number;
  }
) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.flashcardProgress.upsert({
    where: {
      userId_cardId: { userId, cardId },
    },
    update: {
      easeFactor: data.easeFactor,
      interval: data.interval,
      repetitions: data.repetitions,
      nextReviewAt: data.nextReviewAt,
      lastReviewedAt: new Date(),
      reviewCount: data.reviewCount,
    },
    create: {
      userId,
      cardId,
      ...data,
    },
  });
}

/**
 * Get user flashcard progress
 */
export async function getFlashcardProgress(userId: string) {
  if (!isDatabaseEnabled()) {
    return {};
  }
  
  const client = await getPrismaClient();
  if (!client) return {};
  
  const progress = await client.flashcardProgress.findMany({
    where: { userId },
  });
  
  return progress.reduce((acc: Record<string, typeof progress[0]>, p: typeof progress[0]) => {
    acc[p.cardId] = p;
    return acc;
  }, {} as Record<string, typeof progress[0]>);
}

/**
 * Save lab submission
 */
export async function upsertLabSubmission(
  userId: string,
  labId: string,
  code: string,
  status: 'DRAFT' | 'SUBMITTED' | 'GRADED' = 'SUBMITTED',
  score?: number
) {
  if (!isDatabaseEnabled()) {
    return null;
  }
  
  const client = await getPrismaClient();
  if (!client) return null;
  
  return client.labSubmission.upsert({
    where: {
      userId_labId: { userId, labId },
    },
    update: {
      code,
      status,
      ...(score !== undefined && { score }),
      ...(status === 'GRADED' && { gradedAt: new Date() }),
    },
    create: {
      userId,
      labId,
      code,
      status,
      ...(score !== undefined && { score }),
    },
  });
}