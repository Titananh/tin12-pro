// ==========================================
// Quiz Engine - Tin12 Pro Cánh Diều
// Core quiz logic: MCQ and True/False
// ==========================================

import type { Question, QuizScore, Quiz } from './types';

export interface QuizState {
  quizId: string;
  currentQuestionIndex: number;
  answers: (number | boolean[] | null)[];
  startTime: number;
  endTime?: number;
  isComplete: boolean;
  markedForReview: number[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeSpent: number;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: number | boolean[] | null;
  correctAnswer: number | boolean[];
  isCorrect: boolean;
  explanation: string;
}

// ============ QUIZ STATE MANAGEMENT ============

export function createQuizState(quiz: Quiz): QuizState {
  return {
    quizId: quiz.id,
    currentQuestionIndex: 0,
    answers: new Array(quiz.questions.length).fill(null),
    startTime: Date.now(),
    isComplete: false,
    markedForReview: [],
  };
}

export function answerQuestion(
  state: QuizState,
  questionIndex: number,
  answer: number | boolean[] | null
): QuizState {
  const newAnswers = [...state.answers];
  newAnswers[questionIndex] = answer;
  return { ...state, answers: newAnswers };
}

export function toggleMarkForReview(state: QuizState, questionIndex: number): QuizState {
  const marked = state.markedForReview.includes(questionIndex)
    ? state.markedForReview.filter(i => i !== questionIndex)
    : [...state.markedForReview, questionIndex];
  return { ...state, markedForReview: marked };
}

export function nextQuestion(state: QuizState, totalQuestions: number): QuizState {
  const nextIndex = Math.min(state.currentQuestionIndex + 1, totalQuestions - 1);
  return { ...state, currentQuestionIndex: nextIndex };
}

export function prevQuestion(state: QuizState): QuizState {
  const prevIndex = Math.max(state.currentQuestionIndex - 1, 0);
  return { ...state, currentQuestionIndex: prevIndex };
}

export function goToQuestion(state: QuizState, questionIndex: number): QuizState {
  return { ...state, currentQuestionIndex: questionIndex };
}

export function completeQuiz(state: QuizState): QuizState {
  return { ...state, isComplete: true, endTime: Date.now() };
}

// ============ SCORING ============

export function calculateScore(
  questions: Question[],
  answers: (number | boolean[] | null)[]
): QuizResult {
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;
  const questionResults: QuestionResult[] = [];

  questions.forEach((question, index) => {
    const userAnswer = answers[index];
    let isCorrect = false;

    if (userAnswer === null) {
      unanswered++;
      isCorrect = false;
    } else if (question.type === 'mcq') {
      isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      else incorrectAnswers++;
    } else if (question.type === 'true-false') {
      // True/False: all statements must match
      const correctBoolArray = question.correctAnswer as boolean[];
      const userBoolArray = userAnswer as boolean[];
      isCorrect = JSON.stringify(correctBoolArray) === JSON.stringify(userBoolArray);
      if (isCorrect) correctAnswers++;
      else incorrectAnswers++;
    }

    questionResults.push({
      questionId: question.id,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation,
    });
  });

  const score = (correctAnswers / questions.length) * 100;
  const timeSpent = Date.now() - (questionResults[0] ? Date.now() : Date.now());

  return {
    score,
    totalQuestions: questions.length,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    timeSpent,
    questionResults,
  };
}

export function gradeQuestion(question: Question, userAnswer: number | boolean[] | null): boolean {
  if (userAnswer === null) return false;
  
  if (question.type === 'mcq') {
    return userAnswer === question.correctAnswer;
  }
  
  if (question.type === 'true-false') {
    const correct = question.correctAnswer as boolean[];
    const user = userAnswer as boolean[];
    return JSON.stringify(correct) === JSON.stringify(user);
  }
  
  return false;
}

// ============ STANDALONE GRADING FUNCTIONS (for tests) ============

export interface MultipleChoiceGradeResult {
  isCorrect: boolean;
  userAnswer: number;
  correctAnswer: number;
}

/**
 * Grade a single multiple choice question
 */
export function gradeMultipleChoice(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

export interface TrueFalseGroupGradeResult {
  isFullyCorrect: boolean;
  correctCount: number;
  totalCount: number;
  results: {
    statementIndex: number;
    userAnswer: boolean;
    correctAnswer: boolean;
    isCorrect: boolean;
  }[];
}

/**
 * Grade a true/false group (all statements must match for full credit)
 */
export function gradeTrueFalseGroup(
  userAnswers: boolean[],
  correctAnswers: boolean[]
): TrueFalseGroupGradeResult {
  const results = userAnswers.map((userAnswer, idx) => ({
    statementIndex: idx,
    userAnswer,
    correctAnswer: correctAnswers[idx] ?? false,
    isCorrect: userAnswer === correctAnswers[idx],
  }));
  
  const correctCount = results.filter(r => r.isCorrect).length;
  const totalCount = results.length;
  const isFullyCorrect = results.every(r => r.isCorrect);
  
  return { isFullyCorrect, correctCount, totalCount, results };
}

// ============ QUIZ SUBMISSION ANALYZER ============

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, number | boolean[]>;
}

export interface AnalyzeQuizResult {
  score: number;
  correctCount: number;
  wrongCount: number;
  part1Score: number;
  part2Score: number;
  wrongTopics: string[];
  explanations: Record<string, string>;
}

/**
 * Analyze a complete quiz submission
 */
export function analyzeQuizSubmission(
  submission: QuizSubmission,
  questions: Question[]
): AnalyzeQuizResult {
  let correctCount = 0;
  let wrongCount = 0;
  let part1Correct = 0;
  let part1Total = 0;
  let part2Correct = 0;
  let part2Total = 0;
  const wrongTopics: string[] = [];
  const explanations: Record<string, string> = {};
  
  for (const question of questions) {
    explanations[question.id] = question.explanation;
    const userAnswer = submission.answers[question.id];
    
    if (userAnswer === undefined) {
      wrongCount++;
      if (question.type === 'mcq') part1Total++;
      else part2Total++;
      wrongTopics.push(question.topic);
      continue;
    }
    
    if (question.type === 'mcq') {
      part1Total++;
      if (userAnswer === question.correctAnswer) {
        correctCount++;
        part1Correct++;
      } else {
        wrongCount++;
        wrongTopics.push(question.topic);
      }
    } else if (question.type === 'true-false') {
      part2Total++;
      const correctBoolArr = question.correctAnswer as boolean[];
      const userBoolArr = userAnswer as boolean[];
      const isCorrect = JSON.stringify(correctBoolArr) === JSON.stringify(userBoolArr);
      if (isCorrect) {
        correctCount++;
        part2Correct++;
      } else {
        wrongCount++;
        wrongTopics.push(question.topic);
      }
    }
  }
  
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const part1Score = part1Total > 0 ? Math.round((part1Correct / part1Total) * 100) : 0;
  const part2Score = part2Total > 0 ? Math.round((part2Correct / part2Total) * 100) : 0;
  
  return { score, correctCount, wrongCount, part1Score, part2Score, wrongTopics, explanations };
}

// ============ PART SCORE CALCULATORS ============

export interface PartScoreResult {
  score: number;
  correctCount: number;
  totalCount: number;
}

/**
 * Calculate score for Part 1 (MCQ exam part)
 */
export function calculatePart1Score(
  userAnswers: Record<string, number>,
  questions: { id: string; correctAnswer: number; topic: string }[]
): PartScoreResult {
  let correctCount = 0;
  const totalCount = questions.length;
  
  for (const q of questions) {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  }
  
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  return { score, correctCount, totalCount };
}

export interface TFGroup {
  id: string;
  context: string;
  statements: { id: string; text: string; isCorrect: boolean }[];
}

/**
 * Calculate score for Part 2 (True/False exam part)
 */
export function calculatePart2Score(
  userAnswers: Record<string, boolean[]>,
  groups: TFGroup[]
): PartScoreResult {
  let correctCount = 0;
  let totalCount = 0;
  
  for (const group of groups) {
    const userAnswer = userAnswers[group.id];
    if (!userAnswer) {
      totalCount += group.statements.length;
      continue;
    }
    
    for (let i = 0; i < group.statements.length; i++) {
      totalCount++;
      if (userAnswer[i] === group.statements[i].isCorrect) {
        correctCount++;
      }
    }
  }
  
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  return { score, correctCount, totalCount };
}

// ============ AUTOSAVE (localStorage) ============

const QUIZ_STATE_KEY = 'tin12_pro_quiz_state';

export function saveQuizState(state: QuizState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save quiz state:', e);
  }
}

export function loadQuizState(quizId: string): QuizState | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(QUIZ_STATE_KEY);
    if (!saved) return null;
    const state = JSON.parse(saved) as QuizState;
    // Only return if it's the same quiz
    if (state.quizId === quizId && !state.isComplete) {
      return state;
    }
  } catch (e) {
    console.warn('Failed to load quiz state:', e);
  }
  return null;
}

export function clearQuizState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(QUIZ_STATE_KEY);
}

// ============ QUIZ SCORE RECORDING ============

export function saveQuizScore(quizId: string, result: QuizResult): QuizScore {
  const score: QuizScore = {
    quizId,
    score: result.score,
    totalQuestions: result.totalQuestions,
    completedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const key = `tin12_pro_scores_${quizId}`;
      const existing = localStorage.getItem(key);
      const scores = existing ? JSON.parse(existing) : [];
      scores.push(score);
      localStorage.setItem(key, JSON.stringify(scores));
    } catch (e) {
      console.warn('Failed to save quiz score:', e);
    }
  }

  return score;
}

export function getQuizScores(quizId: string): QuizScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = `tin12_pro_scores_${quizId}`;
    const existing = localStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

// ============ UTILITIES ============

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random items from array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

/**
 * Calculate average time per question
 */
export function calculateAvgTimePerQuestion(
  timeSpent: number,
  questionCount: number
): number {
  if (questionCount <= 0) return 0;
  return Math.round(timeSpent / questionCount);
}

/**
 * Identify slow questions (took > 60 seconds on average × 2)
 */
export function identifySlowQuestions(
  questionTimes: Record<string, number>, // questionId -> seconds spent
  avgTimePerQuestion: number
): string[] {
  const threshold = avgTimePerQuestion * 2;
  return Object.entries(questionTimes)
    .filter(([, time]) => time > threshold)
    .map(([qId]) => qId);
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Xuất sắc';
  if (score >= 80) return 'Giỏi';
  if (score >= 70) return 'Khá';
  if (score >= 60) return 'Trung bình';
  return 'Cần cố gắng';
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}