// ==========================================
// Exam Generator - Tin12 Pro Cánh Diều
// Generates exam sets following TN THPT format
// ==========================================

import { Question, MCQuestion, TFGroup, Exam, Track } from './types';
import { shuffleArray } from './quiz-engine';

// ============ TOPIC DEFINITIONS ============

export const TOPIC_CATEGORIES = {
  AI: ['ai-ml', 'machine-learning', 'deep-learning', 'data-science'],
  MANG: ['mạng-máy-tính', 'network', 'tcp-ip', 'internet'],
  DAO_DUC: ['đạo-đức-số', 'digital-citizenship', 'an-toan-mang', 'bao-mat'],
  HTML_CSS: ['html-css', 'html', 'css', 'flexbox', 'grid', 'responsive'],
  KI_TRUC: ['kiến-trúc-máy-tính', 'hardware', 'software', 'he-thong-so'],
  THUAT_TOAN: ['thuật-toán', 'algorithm', 'cs-datastructures', 'sql'],
  DATA_SIM: ['data-simulation', 'data', 'simulation', 'iot'],
} as const;

export type TopicCategory = keyof typeof TOPIC_CATEGORIES;

/**
 * Map track to relevant topic categories
 */
export function getTopicsForTrack(track: Track): TopicCategory[] {
  switch (track) {
    case 'cs':
      return ['AI', 'MANG', 'THUAT_TOAN', 'KI_TRUC', 'DAO_DUC'];
    case 'ict':
      return ['HTML_CSS', 'MANG', 'DATA_SIM', 'KI_TRUC', 'DAO_DUC'];
    case 'general':
    default:
      return ['AI', 'MANG', 'DAO_DUC', 'HTML_CSS', 'KI_TRUC', 'THUAT_TOAN', 'DATA_SIM'];
  }
}

/**
 * Check if a question topic belongs to a category
 */
export function topicMatchesCategory(topic: string, category: TopicCategory): boolean {
  const categoryTopics = TOPIC_CATEGORIES[category];
  return categoryTopics.some(ct => topic.toLowerCase().includes(ct.toLowerCase()));
}

// ============ QUESTION FILTERING ============

interface FilterOptions {
  topics?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  track?: Track;
  excludeIds?: string[];
}

/**
 * Filter questions by various criteria
 */
export function filterQuestions(
  questions: Question[],
  options: FilterOptions
): Question[] {
  const { topics, difficulty, track, excludeIds = [] } = options;

  return questions.filter(q => {
    if (excludeIds.includes(q.id)) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    if (track) {
      const relevantTopics = getTopicsForTrack(track);
      const matchesTrack = relevantTopics.some(cat => topicMatchesCategory(q.topic, cat));
      if (!matchesTrack) return false;
    }
    if (topics && topics.length > 0) {
      const matchesTopic = topics.some(t => q.topic.toLowerCase().includes(t.toLowerCase()));
      if (!matchesTopic) return false;
    }
    return true;
  });
}

// ============ BALANCED SELECTION ============

/**
 * Select questions maintaining difficulty balance
 * Target: 40% easy, 40% medium, 20% hard
 */
export function selectBalancedQuestions(
  questions: Question[],
  totalNeeded: number,
  options: { track?: Track; excludeIds?: string[] } = {}
): Question[] {
  const { track, excludeIds = [] } = options;

  const targetEasy = Math.round(totalNeeded * 0.4);
  const targetMedium = Math.round(totalNeeded * 0.4);
  const targetHard = totalNeeded - targetEasy - targetMedium;

  const available = track
    ? filterQuestions(questions, { track, excludeIds })
    : questions.filter(q => !excludeIds.includes(q.id));

  const byDifficulty = {
    easy: available.filter(q => q.difficulty === 'easy'),
    medium: available.filter(q => q.difficulty === 'medium'),
    hard: available.filter(q => q.difficulty === 'hard'),
  };

  const selected: Question[] = [];

  const easyCount = Math.min(targetEasy, byDifficulty.easy.length);
  selected.push(...shuffleArray(byDifficulty.easy).slice(0, easyCount));

  const mediumCount = Math.min(targetMedium, byDifficulty.medium.length);
  selected.push(...shuffleArray(byDifficulty.medium).slice(0, mediumCount));

  const hardCount = Math.min(targetHard, byDifficulty.hard.length);
  selected.push(...shuffleArray(byDifficulty.hard).slice(0, hardCount));

  const remaining = totalNeeded - selected.length;
  if (remaining > 0) {
    const usedIds = new Set(selected.map(q => q.id));
    const remainingQuestions = questions.filter(q => !usedIds.has(q.id));
    selected.push(...shuffleArray(remainingQuestions).slice(0, remaining));
  }

  return shuffleArray(selected).slice(0, totalNeeded);
}

// ============ TOPIC BALANCE ============

export interface TopicBalanceResult {
  selected: Question[];
  balanceReport: Record<string, { count: number; percentage: number }>;
  missingTopics: string[];
}

/**
 * Select questions balancing across multiple topic categories
 */
export function selectBalancedByTopics(
  questions: Question[],
  topicCategories: TopicCategory[],
  countPerTopic: number,
  options: { track?: Track; excludeIds?: string[] } = {}
): TopicBalanceResult {
  const { track, excludeIds = [] } = options;
  const selected: Question[] = [];
  const balanceReport: Record<string, { count: number; percentage: number }> = {};
  const missingTopics: string[] = [];

  for (const cat of topicCategories) {
    balanceReport[cat] = { count: 0, percentage: 0 };
  }

  const usedIds = new Set(excludeIds);

  for (const category of topicCategories) {
    const categoryQuestions = questions.filter(q => {
      if (usedIds.has(q.id)) return false;
      if (track) {
        const relevantTopics = getTopicsForTrack(track);
        if (!relevantTopics.includes(category)) return false;
      }
      return topicMatchesCategory(q.topic, category);
    });

    const shuffled = shuffleArray(categoryQuestions);
    const toSelect = shuffled.slice(0, countPerTopic);
    
    if (toSelect.length < countPerTopic) {
      missingTopics.push(category);
    }

    selected.push(...toSelect);
    toSelect.forEach(q => usedIds.add(q.id));
    balanceReport[category].count = toSelect.length;
  }

  const totalSelected = selected.length;
  for (const cat of topicCategories) {
    balanceReport[cat].percentage = totalSelected > 0
      ? Math.round((balanceReport[cat].count / totalSelected) * 100)
      : 0;
  }

  return { selected, balanceReport, missingTopics };
}

// ============ EXAM GENERATOR ============

export interface ExamGeneratorOptions {
  track?: Track;
  duration?: number;
  part1Count?: number;
  part2Count?: number;
  excludeQuestionIds?: string[];
}

/**
 * Generate a complete exam following TN THPT format
 * - Part 1: 24 MCQ questions
 * - Part 2: 6 True/False groups (4 statements each)
 * - Difficulty balance: 40% easy, 40% medium, 20% hard
 */
export function generateExam(
  allQuestions: Question[],
  options: ExamGeneratorOptions = {}
): {
  exam: Exam;
  selectionReport: {
    part1Difficulty: Record<string, number>;
    part2Difficulty: Record<string, number>;
    part1Topics: Record<string, number>;
    part2Topics: Record<string, number>;
  };
} {
  const {
    duration = 50,
    part1Count = 24,
    part2Count = 6,
    excludeQuestionIds = [],
  } = options;

  // ========== PART 1: MCQ ==========
  
  const part1Easy = Math.round(part1Count * 0.4);
  const part1Medium = Math.round(part1Count * 0.4);
  const part1Hard = part1Count - part1Easy - part1Medium;

  const mcqQuestions = allQuestions.filter(q => q.type === 'mcq');

  const mcqByDiff = {
    easy: shuffleArray(mcqQuestions.filter(q => q.difficulty === 'easy')),
    medium: shuffleArray(mcqQuestions.filter(q => q.difficulty === 'medium')),
    hard: shuffleArray(mcqQuestions.filter(q => q.difficulty === 'hard')),
  };

  const part1Questions: MCQuestion[] = [];
  
  const easyAvail = mcqByDiff.easy.filter(q => !excludeQuestionIds.includes(q.id));
  part1Questions.push(
    ...easyAvail.slice(0, part1Easy).map(q => ({
      id: q.id,
      question: q.question,
      options: q.options!,
      correctAnswer: q.correctAnswer as number,
      topic: q.topic,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
    }))
  );

  const mediumAvail = mcqByDiff.medium.filter(q => !excludeQuestionIds.includes(q.id));
  part1Questions.push(
    ...mediumAvail.slice(0, part1Medium).map(q => ({
      id: q.id,
      question: q.question,
      options: q.options!,
      correctAnswer: q.correctAnswer as number,
      topic: q.topic,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
    }))
  );

  const hardAvail = mcqByDiff.hard.filter(q => !excludeQuestionIds.includes(q.id));
  part1Questions.push(
    ...hardAvail.slice(0, part1Hard).map(q => ({
      id: q.id,
      question: q.question,
      options: q.options!,
      correctAnswer: q.correctAnswer as number,
      topic: q.topic,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
    }))
  );

  while (part1Questions.length < part1Count) {
    const remaining = mcqQuestions.filter(
      q => !part1Questions.some(pq => pq.id === q.id) && !excludeQuestionIds.includes(q.id)
    );
    if (remaining.length === 0) break;
    const next = remaining[0];
    part1Questions.push({
      id: next.id,
      question: next.question,
      options: next.options!,
      correctAnswer: next.correctAnswer as number,
      topic: next.topic,
      difficulty: next.difficulty as 'easy' | 'medium' | 'hard',
    });
  }

  // ========== PART 2: TRUE/FALSE GROUPS ==========
  
  const tfQuestions = allQuestions.filter(q => q.type === 'true-false');
  const availableTF = shuffleArray(tfQuestions).slice(0, part2Count);
  
  const part2Groups: TFGroup[] = availableTF.map(q => ({
    id: q.id,
    context: q.question,
    statements: (q.statements || []).map((text: string, idx: number) => ({
      id: `s${idx}`,
      text,
      isCorrect: (q.correctAnswer as boolean[])[idx],
    })),
  }));

  // ========== BUILD EXAM ==========
  
  const exam: Exam = {
    id: `exam-${Date.now()}`,
    title: `Đề thi thử - ${new Date().toLocaleDateString('vi-VN')}`,
    description: `Đề thi tự động tạo theo cấu trúc TN THPT. Thời gian ${duration} phút. Part 1: ${part1Count} MCQ. Part 2: ${part2Count} câu T/F.`,
    duration,
    part1: {
      questions: part1Questions.slice(0, part1Count),
      totalQuestions: part1Questions.length,
      pointsEach: 0.25,
    },
    part2: {
      groups: part2Groups,
      totalQuestions: part2Groups.length,
      pointsEach: 0.5,
    },
  };

  // ========== GENERATE REPORT ==========
  
  const part1Difficulty: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
  const part2Difficulty: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
  const part1Topics: Record<string, number> = {};
  const part2Topics: Record<string, number> = {};

  for (const q of exam.part1.questions) {
    part1Difficulty[q.difficulty]++;
    part1Topics[q.topic] = (part1Topics[q.topic] || 0) + 1;
  }

  for (const g of exam.part2.groups) {
    const sourceQ = tfQuestions.find(q => q.id === g.id);
    if (sourceQ) {
      part2Difficulty[sourceQ.difficulty]++;
    }
    const topicKey = sourceQ?.topic || 'unknown';
    part2Topics[topicKey] = (part2Topics[topicKey] || 0) + 1;
  }

  return {
    exam,
    selectionReport: {
      part1Difficulty,
      part2Difficulty,
      part1Topics,
      part2Topics,
    },
  };
}

// ========== PRACTICE QUESTION SELECTOR ==========

/**
 * Select practice questions based on wrong answers and weaknesses
 */
export function selectPracticeQuestions(
  allQuestions: Question[],
  wrongQuestionIds: string[],
  topicWeaknesses: string[],
  count: number = 20,
  _track?: Track
): string[] {
  const practiceIds: string[] = [];

  const wrongQuestions = allQuestions.filter(q => wrongQuestionIds.includes(q.id));
  practiceIds.push(...wrongQuestions.slice(0, Math.ceil(count * 0.3)).map(q => q.id));

  const weakTopicQuestions = allQuestions.filter(q => {
    if (practiceIds.includes(q.id)) return false;
    if (wrongQuestionIds.includes(q.id)) return false;
    return topicWeaknesses.some(wt => q.topic.toLowerCase().includes(wt.toLowerCase()));
  });
  practiceIds.push(...shuffleArray(weakTopicQuestions).slice(0, Math.ceil(count * 0.5)).map(q => q.id));

  if (practiceIds.length < count) {
    const usedIds = new Set(practiceIds);
    const wrongSet = new Set(wrongQuestionIds);
    const fillQuestions = allQuestions.filter(q => {
      if (usedIds.has(q.id)) return false;
      if (wrongSet.has(q.id)) return false;
      return true;
    });
    practiceIds.push(...shuffleArray(fillQuestions).slice(0, count - practiceIds.length).map(q => q.id));
  }

  return practiceIds.slice(0, count);
}

// ========== QUICK GENERATORS ==========

/**
 * Generate a quick practice quiz (10 questions)
 */
export function generatePracticeQuiz(
  questions: Question[],
  topic?: string,
  difficulty?: 'easy' | 'medium' | 'hard'
): Question[] {
  let pool = questions;

  if (topic) {
    pool = pool.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  if (difficulty) {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  return shuffleArray(pool).slice(0, 10);
}

/**
 * Generate a topic-specific test
 */
export function generateTopicTest(
  questions: Question[],
  topic: string,
  questionCount: number = 10
): MCQuestion[] {
  const topicQuestions = questions.filter(
    q => q.type === 'mcq' && q.topic.toLowerCase().includes(topic.toLowerCase())
  );

  return shuffleArray(topicQuestions)
    .slice(0, questionCount)
    .map(q => ({
      id: q.id,
      question: q.question,
      options: q.options!,
      correctAnswer: q.correctAnswer as number,
      topic: q.topic,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
    }));
}