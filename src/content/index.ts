// ==========================================
// Content Index - Tin12 Pro Cánh Diều
// Export all seed data modules
// ==========================================

// Courses
export { courses, getCourseBySlug, getCourseById } from './courses';
export type { Course } from '@/lib/types';

// Lessons
export { lessons } from './lessons';
export type { Lesson, LessonContent } from '@/lib/types';

// Questions
export {
  questions,
  getQuestionsByTopic,
  getQuestionsByDifficulty,
  getRandomQuestions,
  generateExamSet
} from './questions';
export type { Question } from '@/lib/types';

// Exams
export { exams, getExamById } from './exams';
export type { Exam, ExamPart1, ExamPart2 } from '@/lib/types';

// Labs
export { labs, getLabBySlug, getLabsByType } from './labs';
export type { Lab, LabInstruction, LabRubricItem } from '@/lib/types';

// Flashcards
export { flashcards, getFlashcardsByDeck, getFlashcardsByTopic, getFlashcardById, decks } from './flashcards';
export type { Flashcard } from '@/lib/types';

// Badges
export { badges, getBadgeById, getBadgesByCriteria, badgeCategories } from './badges';
export type { Badge } from '@/lib/types';

// ==========================================
// Content Stats (for debugging/admin)
// ==========================================
export const contentStats = {
  courses: 5,
  lessons: 21,
  questions: {
    total: 224,  // 136 MCQ + 60 T/F statements (15 groups) + 25 scenario/code reading
    mcq: 136,
    trueFalse: 15,  // 15 T/F groups (60 statements)
    scenario: 25
  },
  exams: 3,
  labs: 8,
  flashcards: 100,
  badges: 28,
  topics: [
    'kiến-trúc-máy-tính',
    'ai-ml',
    'mạng-máy-tính',
    'đạo-đức-số',
    'html-css',
    'thuật-toán',
    'data-io'
  ],
  tracks: ['cs', 'ict', 'general'],
  decks: [
    { id: 'deck-arch', name: 'Kiến trúc máy tính', count: 15 },
    { id: 'deck-ai', name: 'AI & Machine Learning', count: 20 },
    { id: 'deck-network', name: 'Mạng máy tính', count: 15 },
    { id: 'deck-ethics', name: 'Đạo đức số', count: 15 },
    { id: 'deck-html', name: 'HTML & CSS', count: 15 },
    { id: 'deck-algo', name: 'Thuật toán', count: 15 },
    { id: 'deck-data', name: 'Dữ liệu & IoT', count: 5 }
  ]
};