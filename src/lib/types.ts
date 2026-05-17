// ==========================================
// Tin12 Pro Cánh Diều - Type Definitions
// ==========================================

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Track = 'cs' | 'ict' | 'general';
export type UserRole = 'student' | 'teacher' | 'admin';
export type QuestionType = 'mcq' | 'true-false';
export type LabType = 'html-css' | 'network' | 'data' | 'project';

// ============ USER ============
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  joinedAt: string;
  goals: string[];
  track: Track;
  completedLessons: string[];
  quizScores: QuizScore[];
  examScores: ExamScore[];
  badges: string[];
}

export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface ExamScore {
  examId: string;
  score: number;
  part1Score: number;
  part2Score: number;
  completedAt: string;
  timeSpent: number;
}

// ============ COURSE ============
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  track: Track;
  difficulty: Difficulty;
  modules: Module[];
  estimatedHours: number;
  color: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

// ============ LESSON ============
export interface Lesson {
  id: string;
  slug: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  track: Track;
  order: number;
  content: LessonContent;
}

export interface LessonContent {
  learningObjectives: string[];
  explainLikeNew: string;
  theory: string;
  deepDive: string;
  realWorldExamples: string[];
  visualSummary: string;
  commonMistakes: string[];
  quickCheck: QuickCheckQuestion[];
  practice: string;
  examCorner: string;
  sixtySecondSummary: string;
  flashcards: string[]; // IDs of related flashcards
  nextStep: string;
}

export interface QuickCheckQuestion {
  question: string;
  options?: string[];
  correctAnswer: number | boolean;
  explanation: string;
}

// ============ QUIZ ============
export interface Quiz {
  id: string;
  lessonId?: string;
  topic: string;
  title: string;
  questions: Question[];
  timeLimit?: number; // minutes
  passingScore: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];      // for MCQ
  statements?: string[];   // for T/F group
  correctAnswer: number | boolean[]; // MCQ: number index, T/F: boolean[]
  explanation: string;
  difficulty: Difficulty;
  topic: string;
}

// ============ EXAM ============
export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  part1: ExamPart1;
  part2: ExamPart2;
}

export interface ExamPart1 {
  questions: MCQuestion[];
  totalQuestions: number;
  pointsEach: number;
}

export interface ExamPart2 {
  groups: TFGroup[];
  totalQuestions: number;
  pointsEach: number;
}

export interface MCQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  difficulty: Difficulty;
}

export interface TFGroup {
  id: string;
  context: string;
  statements: TFStatement[];
}

export interface TFStatement {
  id: string;
  text: string;
  isCorrect: boolean;
}

// ============ LAB ============
export interface Lab {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: LabType;
  difficulty: Difficulty;
  estimatedMinutes: number;
  starterCode: string;
  solutionCode?: string;
  instructions: LabInstruction[];
  hints: string[];
  rubric: LabRubricItem[];
}

export interface LabInstruction {
  step: number;
  text: string;
  required?: boolean;
}

export interface LabRubricItem {
  criterion: string;
  points: number;
  description: string;
}

// ============ FLASHCARD ============
export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  topic: string;
  difficulty: Difficulty;
  nextReview?: string;
  easeFactor?: number;
  interval?: number;
}

// ============ BADGE ============
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  xpReward: number;
}

// ============ DASHBOARD ============
export interface TodayPlan {
  lessons: PlanItem[];
  practice: PlanItem[];
  labs: PlanItem[];
  reason: string;
}

export interface PlanItem {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'lab';
  reason: string;
  estimatedMinutes: number;
}

export interface MasteryMap {
  topic: string;
  score: number;
  weakTopics: string[];
}

// ============ ONBOARDING ============
export interface OnboardingState {
  step: 'goal' | 'level' | 'track' | 'placement' | 'result';
  selectedGoal?: string;
  placementScore?: number;
  recommendedPath?: string;
}

export interface PlacementQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: number;
  topic: string;
}