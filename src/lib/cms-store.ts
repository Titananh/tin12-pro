// ==========================================
// CMS Store - Tin12 Pro Cánh Diều
// localStorage-based content management store
// ==========================================

import { Course, Lesson, Question, Lab, Exam } from './types';

// Storage keys
const STORAGE_KEYS = {
  COURSES: 'cms_courses',
  LESSONS: 'cms_lessons',
  QUESTIONS: 'cms_questions',
  LABS: 'cms_labs',
  EXAMS: 'cms_exams',
} as const;

// Base CMS item interface
export interface CMSItem {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'published';
  lastModified: string;
  createdAt: string;
}

// Generic localStorage CRUD operations
function getStoredArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredArray<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ============ COURSES ============
export function getCourses(): CMSItem[] {
  const courses = getStoredArray<Course>(STORAGE_KEYS.COURSES);
  return courses.map(c => ({
    id: c.id,
    title: c.title,
    type: 'course',
    status: c.modules?.length ? 'published' : 'draft',
    lastModified: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }));
}

export function saveCourse(course: Partial<Course>): Course {
  const courses = getStoredArray<Course>(STORAGE_KEYS.COURSES);
  const newCourse: Course = {
    id: course.id || `course-${Date.now()}`,
    slug: course.slug || course.title?.toLowerCase().replace(/\s+/g, '-') || '',
    title: course.title || 'Untitled Course',
    description: course.description || '',
    icon: course.icon || 'BOOK',
    track: course.track || 'general',
    difficulty: course.difficulty || 'medium',
    modules: course.modules || [],
    estimatedHours: course.estimatedHours || 20,
    color: course.color || '#2563EB',
  };
  
  const existingIndex = courses.findIndex(c => c.id === newCourse.id);
  if (existingIndex >= 0) {
    courses[existingIndex] = newCourse;
  } else {
    courses.push(newCourse);
  }
  setStoredArray(STORAGE_KEYS.COURSES, courses);
  return newCourse;
}

export function deleteCourse(id: string): void {
  const courses = getStoredArray<Course>(STORAGE_KEYS.COURSES);
  setStoredArray(STORAGE_KEYS.COURSES, courses.filter(c => c.id !== id));
}

// ============ LESSONS ============
export function getLessons(): CMSItem[] {
  const lessons = getStoredArray<Lesson>(STORAGE_KEYS.LESSONS);
  return lessons.map(l => ({
    id: l.id,
    title: l.title,
    type: 'lesson',
    status: 'published', // lessons from content are published by default
    lastModified: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }));
}

export function saveLesson(lesson: Partial<Lesson>): Lesson {
  const lessons = getStoredArray<Lesson>(STORAGE_KEYS.LESSONS);
  const newLesson: Lesson = {
    id: lesson.id || `lesson-${Date.now()}`,
    slug: lesson.slug || lesson.title?.toLowerCase().replace(/\s+/g, '-') || '',
    moduleId: lesson.moduleId || 'mod-default',
    courseId: lesson.courseId || 'course-1',
    title: lesson.title || 'Untitled Lesson',
    description: lesson.description || '',
    estimatedMinutes: lesson.estimatedMinutes || 45,
    difficulty: lesson.difficulty || 'medium',
    track: lesson.track || 'general',
    order: lesson.order || 1,
    content: lesson.content || {
      learningObjectives: [],
      explainLikeNew: '',
      theory: '',
      deepDive: '',
      realWorldExamples: [],
      visualSummary: '',
      commonMistakes: [],
      quickCheck: [],
      practice: '',
      examCorner: '',
      sixtySecondSummary: '',
      flashcards: [],
      nextStep: '',
    },
  };
  
  const existingIndex = lessons.findIndex(l => l.id === newLesson.id);
  if (existingIndex >= 0) {
    lessons[existingIndex] = newLesson;
  } else {
    lessons.push(newLesson);
  }
  setStoredArray(STORAGE_KEYS.LESSONS, lessons);
  return newLesson;
}

export function deleteLesson(id: string): void {
  const lessons = getStoredArray<Lesson>(STORAGE_KEYS.LESSONS);
  setStoredArray(STORAGE_KEYS.LESSONS, lessons.filter(l => l.id !== id));
}

// ============ QUESTIONS ============
export function getQuestions(): CMSItem[] {
  const questions = getStoredArray<Question>(STORAGE_KEYS.QUESTIONS);
  return questions.map(q => ({
    id: q.id,
    title: q.question.substring(0, 50) + (q.question.length > 50 ? '...' : ''),
    type: q.type,
    status: 'published',
    lastModified: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }));
}

export function saveQuestion(question: Partial<Question>): Question {
  const questions = getStoredArray<Question>(STORAGE_KEYS.QUESTIONS);
  const newQuestion: Question = {
    id: question.id || `q-${Date.now()}`,
    type: question.type || 'mcq',
    question: question.question || '',
    options: question.options || [],
    statements: question.statements,
    correctAnswer: question.correctAnswer ?? 0,
    explanation: question.explanation || '',
    difficulty: question.difficulty || 'medium',
    topic: question.topic || 'general',
  };
  
  const existingIndex = questions.findIndex(q => q.id === newQuestion.id);
  if (existingIndex >= 0) {
    questions[existingIndex] = newQuestion;
  } else {
    questions.push(newQuestion);
  }
  setStoredArray(STORAGE_KEYS.QUESTIONS, questions);
  return newQuestion;
}

export function deleteQuestion(id: string): void {
  const questions = getStoredArray<Question>(STORAGE_KEYS.QUESTIONS);
  setStoredArray(STORAGE_KEYS.QUESTIONS, questions.filter(q => q.id !== id));
}

// ============ LABS ============
export function getLabs(): CMSItem[] {
  const labs = getStoredArray<Lab>(STORAGE_KEYS.LABS);
  return labs.map(l => ({
    id: l.id,
    title: l.title,
    type: l.type,
    status: l.solutionCode ? 'published' : 'draft',
    lastModified: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }));
}

export function saveLab(lab: Partial<Lab>): Lab {
  const labs = getStoredArray<Lab>(STORAGE_KEYS.LABS);
  const newLab: Lab = {
    id: lab.id || `lab-${Date.now()}`,
    slug: lab.slug || lab.title?.toLowerCase().replace(/\s+/g, '-') || '',
    title: lab.title || 'Untitled Lab',
    description: lab.description || '',
    type: lab.type || 'html-css',
    difficulty: lab.difficulty || 'medium',
    estimatedMinutes: lab.estimatedMinutes || 30,
    starterCode: lab.starterCode || '',
    solutionCode: lab.solutionCode,
    instructions: lab.instructions || [],
    hints: lab.hints || [],
    rubric: lab.rubric || [],
  };
  
  const existingIndex = labs.findIndex(l => l.id === newLab.id);
  if (existingIndex >= 0) {
    labs[existingIndex] = newLab;
  } else {
    labs.push(newLab);
  }
  setStoredArray(STORAGE_KEYS.LABS, labs);
  return newLab;
}

export function deleteLab(id: string): void {
  const labs = getStoredArray<Lab>(STORAGE_KEYS.LABS);
  setStoredArray(STORAGE_KEYS.LABS, labs.filter(l => l.id !== id));
}

// ============ EXAMS ============
export function getExams(): CMSItem[] {
  const exams = getStoredArray<Exam>(STORAGE_KEYS.EXAMS);
  return exams.map(e => ({
    id: e.id,
    title: e.title,
    type: 'exam',
    status: 'published',
    lastModified: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }));
}

// ============ ANALYTICS ============
export interface CMSAnalytics {
  totalCourses: number;
  totalLessons: number;
  totalQuestions: number;
  totalLabs: number;
  totalExams: number;
  questionsByTopic: Record<string, number>;
  questionsByDifficulty: Record<string, number>;
  questionTypeBreakdown: Record<string, number>;
  publishedCount: number;
  draftCount: number;
  lastUpdated: string;
}

export function getCMSAnalytics(): CMSAnalytics {
  const courses = getStoredArray<Course>(STORAGE_KEYS.COURSES);
  const lessons = getStoredArray<Lesson>(STORAGE_KEYS.LESSONS);
  const questions = getStoredArray<Question>(STORAGE_KEYS.QUESTIONS);
  const labs = getStoredArray<Lab>(STORAGE_KEYS.LABS);
  const exams = getStoredArray<Exam>(STORAGE_KEYS.EXAMS);
  
  const questionsByTopic: Record<string, number> = {};
  const questionsByDifficulty: Record<string, number> = {};
  const questionTypeBreakdown: Record<string, number> = {};
  
  questions.forEach(q => {
    questionsByTopic[q.topic] = (questionsByTopic[q.topic] || 0) + 1;
    questionsByDifficulty[q.difficulty] = (questionsByDifficulty[q.difficulty] || 0) + 1;
    questionTypeBreakdown[q.type] = (questionTypeBreakdown[q.type] || 0) + 1;
  });
  
  return {
    totalCourses: courses.length,
    totalLessons: lessons.length,
    totalQuestions: questions.length,
    totalLabs: labs.length,
    totalExams: exams.length,
    questionsByTopic,
    questionsByDifficulty,
    questionTypeBreakdown,
    publishedCount: courses.filter(c => c.modules?.length).length + labs.filter(l => l.solutionCode).length,
    draftCount: courses.filter(c => !c.modules?.length).length + labs.filter(l => !l.solutionCode).length,
    lastUpdated: new Date().toISOString(),
  };
}

// ============ PUBLISH/UNPUBLISH ============
export function publishItem(type: string, id: string): void {
  // For now, just mark as published in localStorage
  // In a real app, this would update a backend
  console.log(`Publishing ${type} with id ${id}`);
}

export function unpublishItem(type: string, id: string): void {
  console.log(`Unpublishing ${type} with id ${id}`);
}

// ============ CLEAR ALL CMS DATA ============
export function clearCMSData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
