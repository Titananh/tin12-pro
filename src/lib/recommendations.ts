// ==========================================
// Recommendation Engine - Tin12 Pro Cánh Diều
// Generates personalized learning plans for students
// ==========================================

import { questions } from '../content/questions';
import { lessons } from '../content/lessons';
import { labs } from '../content/labs';
import type { Track, PlanItem, TodayPlan } from './types';

// ============ TYPES ============

export interface StudentProfile {
  track: Track;
  completedLessons: string[];
  completedLabs: string[];
  quizScores: { score: number; date: string }[];
  examScores: { score: number; date: string }[];
  weakTopics: string[];
  strongTopics: string[];
  streak: number;
  xp: number;
  level: number;
}

export interface RecommendationReason {
  type: 'weakness' | 'strength' | 'new' | 'revision' | 'streak' | 'level';
  label: string;
  description: string;
}

export interface PersonalizedItem extends PlanItem {
  recommendationReason: RecommendationReason;
}

// ============ RECOMMENDATION HELPERS ============

/**
 * Analyze student's weak areas and recommend content
 */
export function getWeakTopicRecommendations(
  student: StudentProfile,
  maxItems: number = 3
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  for (const topic of student.weakTopics.slice(0, maxItems)) {
    // Find lessons for this topic
    const topicLessons = lessons.filter(l => 
      l.content.learningObjectives.some(obj => 
        obj.toLowerCase().includes(topic.toLowerCase())
      ) || l.title.toLowerCase().includes(topic.toLowerCase())
    );

    if (topicLessons.length > 0) {
      const lesson = topicLessons[0];
      items.push({
        id: lesson.id,
        title: lesson.title,
        type: 'lesson',
        reason: `Ôn lại kiến thức yếu: ${topic}`,
        estimatedMinutes: lesson.estimatedMinutes,
        recommendationReason: {
          type: 'weakness',
          label: 'Cần cải thiện',
          description: `Bạn còn yếu chủ đề "${topic}", hãy ôn lại bài này để cải thiện điểm số.`,
        },
      });
    }
  }

  return items;
}

/**
 * Recommend based on strength to build confidence
 */
export function getStrengthBuildingRecommendations(
  student: StudentProfile,
  maxItems: number = 2
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  for (const topic of student.strongTopics.slice(0, maxItems)) {
    const topicLessons = lessons.filter(l => 
      l.title.toLowerCase().includes(topic.toLowerCase()) ||
      l.content.learningObjectives.some(obj => 
        obj.toLowerCase().includes(topic.toLowerCase())
      )
    );

    if (topicLessons.length > 0) {
      const lesson = topicLessons[0];
      items.push({
        id: lesson.id,
        title: lesson.title,
        type: 'lesson',
        reason: `Củng cố điểm mạnh: ${topic}`,
        estimatedMinutes: lesson.estimatedMinutes,
        recommendationReason: {
          type: 'strength',
          label: 'Giỏi rồi, giỏi hơn nữa',
          description: `Bạn đã nắm vững "${topic}", hãy học sâu hơn để giỏi hơn nữa!`,
        },
      });
    }
  }

  return items;
}

/**
 * Recommend new content based on track and progress
 */
export function getNewContentRecommendations(
  student: StudentProfile,
  maxItems: number = 3
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];
  const completedIds = new Set(student.completedLessons);

  // Get track-specific lessons
  const trackLessons = lessons.filter(l => {
    if (completedIds.has(l.id)) return false;
    if (student.track !== 'general' && l.track !== student.track && l.track !== 'general') return false;
    return true;
  });

  // Prioritize by order
  const sortedTrackLessons = trackLessons.sort((a, b) => a.order - b.order);

  for (const lesson of sortedTrackLessons.slice(0, maxItems)) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      reason: `Bài học mới cho track ${student.track}`,
      estimatedMinutes: lesson.estimatedMinutes,
      recommendationReason: {
        type: 'new',
        label: 'Bài mới',
        description: `Học bài mới "${lesson.title}" để mở rộng kiến thức.`,
      },
    });
  }

  return items;
}

/**
 * Recommend revision for better retention
 */
export function getRevisionRecommendations(
  student: StudentProfile,
  maxItems: number = 2
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  // Find lessons that haven't been revisited in a while
  // Simplified: just pick from completed lessons
  const completed = lessons.filter(l => student.completedLessons.includes(l.id));
  
  for (const lesson of completed.slice(0, maxItems)) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      reason: 'Ôn tập để nhớ lâu',
      estimatedMinutes: Math.round(lesson.estimatedMinutes * 0.5), // Quick review
      recommendationReason: {
        type: 'revision',
        label: 'Ôn tập',
        description: `Đã lâu không học bài này, hãy ôn lại để nhớ lâu hơn.`,
      },
    });
  }

  return items;
}

/**
 * Recommend practice for skill development
 */
export function getPracticeRecommendations(
  student: StudentProfile,
  maxItems: number = 3
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  // Find topics to practice (weak areas first)
  for (const topic of student.weakTopics.slice(0, maxItems)) {
    const topicQuestions = questions.filter(q => 
      q.topic.toLowerCase().includes(topic.toLowerCase())
    );

    if (topicQuestions.length > 0) {
      items.push({
        id: `practice-${topic}`,
        title: `Luyện tập: ${topic}`,
        type: 'quiz',
        reason: `Thực hành để cải thiện: ${topic}`,
        estimatedMinutes: Math.min(15, topicQuestions.length * 2),
        recommendationReason: {
          type: 'weakness',
          label: 'Luyện tập',
          description: `Làm thêm bài tập về "${topic}" để nắm vững kiến thức.`,
        },
      });
    }
  }

  return items;
}

/**
 * Recommend labs for hands-on experience
 */
export function getLabRecommendations(
  student: StudentProfile,
  maxItems: number = 2
): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];
  const completedLabs = new Set(student.completedLabs);

  // Prioritize labs matching track
  const trackLabs = labs.filter(l => {
    if (completedLabs.has(l.id)) return false;
    if (student.track === 'cs' && l.type === 'html-css') return false;
    if (student.track === 'ict' && l.type === 'network') return false;
    return true;
  });

  // Sort by difficulty progression
  const sortedLabs = trackLabs.sort((a, b) => {
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });

  for (const lab of sortedLabs.slice(0, maxItems)) {
    items.push({
      id: lab.id,
      title: lab.title,
      type: 'lab',
      reason: `Lab thực hành: ${lab.type}`,
      estimatedMinutes: lab.estimatedMinutes,
      recommendationReason: {
        type: 'new',
        label: 'Thực hành',
        description: `Hoàn thành lab "${lab.title}" để áp dụng kiến thức đã học.`,
      },
    });
  }

  return items;
}

/**
 * Get streak-based recommendations
 */
export function getStreakRecommendations(student: StudentProfile): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  if (student.streak >= 7) {
    // Great streak - maintain it
    items.push({
      id: 'daily-practice',
      title: 'Luyện tập hàng ngày',
      type: 'quiz',
      reason: 'Duy trì streak',
      estimatedMinutes: 10,
      recommendationReason: {
        type: 'streak',
        label: 'Duy trì Streak',
        description: `Bạn đang có streak ${student.streak} ngày! Tiếp tục duy trì nhé.`,
      },
    });
  } else if (student.streak >= 3) {
    // Good progress
    items.push({
      id: 'keep-going',
      title: 'Tiếp tục nào!',
      type: 'quiz',
      reason: 'Tăng streak',
      estimatedMinutes: 10,
      recommendationReason: {
        type: 'streak',
        label: 'Tăng Streak',
        description: `Streak ${student.streak} ngày rồi! Mỗi ngày học một chút để đạt 7 ngày.`,
      },
    });
  }

  return items;
}

/**
 * Get level-based recommendations
 */
export function getLevelRecommendations(student: StudentProfile): PersonalizedItem[] {
  const items: PersonalizedItem[] = [];

  // Level-based suggestions
  if (student.level < 5) {
    // Beginner - start with basics
    const basicLesson = lessons.find(l => l.difficulty === 'easy' && l.order === 1);
    if (basicLesson) {
      items.push({
        id: basicLesson.id,
        title: basicLesson.title,
        type: 'lesson',
        reason: 'Bắt đầu hành trình',
        estimatedMinutes: basicLesson.estimatedMinutes,
        recommendationReason: {
          type: 'level',
          label: 'Level mới',
          description: 'Hoàn thành bài học để tích lũy XP và lên level.',
        },
      });
    }
  } else if (student.level >= 10) {
    // Advanced - challenge harder content
    const hardLesson = lessons.find(l => l.difficulty === 'hard');
    if (hardLesson && !student.completedLessons.includes(hardLesson.id)) {
      items.push({
        id: hardLesson.id,
        title: hardLesson.title,
        type: 'lesson',
        reason: 'Thử thách nâng cao',
        estimatedMinutes: hardLesson.estimatedMinutes,
        recommendationReason: {
          type: 'level',
          label: 'Thử thách',
          description: 'Bạn đã có kinh nghiệm, hãy thử bài khó để tăng điểm mastery.',
        },
      });
    }
  }

  return items;
}

// ============ TODAY'S PLAN GENERATOR ============

/**
 * Generate today's personalized learning plan
 */
export function generateTodayPlan(student: StudentProfile): TodayPlan {
  const allItems: PersonalizedItem[] = [];

  // Priority 1: Streak maintenance (if active)
  allItems.push(...getStreakRecommendations(student));

  // Priority 2: Address weaknesses
  allItems.push(...getWeakTopicRecommendations(student, 2));

  // Priority 3: New content
  allItems.push(...getNewContentRecommendations(student, 2));

  // Priority 4: Labs
  allItems.push(...getLabRecommendations(student, 1));

  // Priority 5: Practice
  allItems.push(...getPracticeRecommendations(student, 2));

  // Priority 6: Build on strengths
  allItems.push(...getStrengthBuildingRecommendations(student, 1));

  // Priority 7: Level-based
  allItems.push(...getLevelRecommendations(student));

  // Build today's plan structure
  const lessons_ : PersonalizedItem[] = allItems.filter(i => i.type === 'lesson');
  const practice: PersonalizedItem[] = allItems.filter(i => i.type === 'quiz');
  const labs: PersonalizedItem[] = allItems.filter(i => i.type === 'lab');

  // Build reason
  let reason = 'Kế hoạch học tập hôm nay: ';
  if (student.weakTopics.length > 0) {
    reason += `Cải thiện ${student.weakTopics.slice(0, 2).join(', ')}. `;
  }
  if (student.streak > 0) {
    reason += `Duy trì streak ${student.streak} ngày. `;
  }
  reason += 'Hoàn thành các bài được gợi ý để tiến bộ nhanh hơn!';

  return {
    lessons: lessons_,
    practice,
    labs,
    reason,
  };
}

// ============ WEEKLY RECOMMENDATIONS ============

export interface WeeklyRecommendation {
  weekStart: string;
  focus: string;
  activities: {
    type: 'lesson' | 'quiz' | 'lab' | 'exam';
    count: number;
    description: string;
  }[];
  targetMasteryGain: number;
}

/**
 * Generate weekly learning recommendations
 */
export function generateWeeklyPlan(student: StudentProfile): WeeklyRecommendation {
  const activities: WeeklyRecommendation['activities'] = [];

  // Calculate how many of each to recommend per week
  const targetLessons = Math.min(5, 7 - student.weakTopics.length);
  activities.push({
    type: 'lesson',
    count: targetLessons,
    description: `Hoàn thành ${targetLessons} bài học mới hoặc ôn tập`,
  });

  activities.push({
    type: 'quiz',
    count: 5,
    description: 'Luyện tập 5 bài quiz ngắn (10 câu mỗi bài)',
  });

  activities.push({
    type: 'lab',
    count: 2,
    description: 'Hoàn thành 2 lab thực hành',
  });

  // Add exam recommendation if student is ready
  if (student.examScores.length > 0 && student.examScores[student.examScores.length - 1].score >= 70) {
    activities.push({
      type: 'exam',
      count: 1,
      description: 'Làm một đề thi thử để kiểm tra tiến độ',
    });
  }

  // Estimate mastery gain
  const targetMasteryGain = Math.min(5, student.weakTopics.length * 1.5);

  return {
    weekStart: new Date().toISOString().split('T')[0],
    focus: student.weakTopics.length > 0 
      ? `Cải thiện: ${student.weakTopics.slice(0, 3).join(', ')}`
      : 'Củng cố và mở rộng kiến thức',
    activities,
    targetMasteryGain,
  };
}

// ============ EXAM READINESS ============

export interface ExamReadiness {
  readinessScore: number; // 0-100
  status: 'not-ready' | 'needs-review' | 'almost-ready' | 'ready';
  recommendedTopics: string[];
  practiceExamCount: number;
  estimatedStudyTime: number; // minutes
}

/**
 * Assess exam readiness
 */
export function assessExamReadiness(student: StudentProfile): ExamReadiness {
  // Count practice exams taken
  const practiceExamCount = student.examScores.length;
  
  // Calculate readiness based on multiple factors
  let readinessScore = 0;

  // Factor 1: Recent exam scores (40%)
  if (student.examScores.length > 0) {
    const recentExams = student.examScores.slice(-3);
    const avgScore = recentExams.reduce((sum, e) => sum + e.score, 0) / recentExams.length;
    readinessScore += (avgScore / 100) * 40;
  }

  // Factor 2: Weak topics addressed (30%)
  const weakTopicCoverage = Math.max(0, 100 - student.weakTopics.length * 15);
  readinessScore += weakTopicCoverage * 0.30;

  // Factor 3: Consistency/practice (20%)
  const practiceScore = Math.min(100, student.quizScores.length * 10);
  readinessScore += practiceScore * 0.20;

  // Factor 4: Lab completion (10%)
  const labCompletionScore = (student.completedLabs.length / 8) * 100; // Assuming 8 total labs
  readinessScore += labCompletionScore * 0.10;

  // Determine status
  let status: ExamReadiness['status'];
  if (readinessScore >= 80) status = 'ready';
  else if (readinessScore >= 60) status = 'almost-ready';
  else if (readinessScore >= 40) status = 'needs-review';
  else status = 'not-ready';

  // Estimate study time to reach "ready" status
  let estimatedStudyTime = 0;
  if (readinessScore < 80) {
    const gap = 80 - readinessScore;
    estimatedStudyTime = Math.round(gap * 3); // ~3 minutes per percentage point
  }

  return {
    readinessScore: Math.round(readinessScore),
    status,
    recommendedTopics: student.weakTopics.slice(0, 3),
    practiceExamCount,
    estimatedStudyTime,
  };
}