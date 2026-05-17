// ==========================================
// Mastery Score Calculator - Tin12 Pro Cánh Diều
// Calculates mastery level based on multiple factors
// ==========================================

// ============ TYPES ============

export interface MasteryInput {
  // Recent accuracy (last 5 quizzes/exams)
  recentScores: number[]; // 0-100 each
  
  // Practice volume
  totalQuestionsAnswered: number;
  questionsPerWeek: number;
  
  // Difficulty-weighted performance
  difficultyScores: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
  
  // Speed score (average time per question vs benchmark)
  avgTimePerQuestion: number; // seconds
  benchmarkTime: number; // seconds (e.g., 45 for MCQ, 30 for T/F)
  
  // Lab completion
  completedLessons: string[];
  completedLabs: string[];
  totalLessons: number;
  totalLabs: number;
}

export interface MasteryOutput {
  overallScore: number;        // 0-100
  recentAccuracyScore: number;  // 0-100
  practiceVolumeScore: number;  // 0-100
  difficultyWeightedScore: number; // 0-100
  speedScore: number;          // 0-100
  labCompletionScore: number;  // 0-100
  breakdown: {
    component: string;
    score: number;
    weight: number;
    maxScore: number;
  }[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  nextMilestone: {
    target: number;
    focus: string;
  } | null;
}

// ============ SCORE CALCULATIONS ============

/**
 * Calculate recent accuracy score (40% weight)
 * Based on last 5 quiz/exam scores, more recent = more weight
 */
export function calculateRecentAccuracyScore(recentScores: number[]): number {
  if (recentScores.length === 0) return 0;
  
  // Take last 5 scores, most recent weighted more
  const recent = recentScores.slice(-5);
  const weights = recent.map((_, i) => i + 1); // [1, 2, 3, 4, 5] for 5 items
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  
  const weightedSum = recent.reduce((sum, score, i) => {
    return sum + score * weights[i];
  }, 0);
  
  return Math.round(weightedSum / totalWeight);
}

/**
 * Calculate practice volume score (20% weight)
 * Based on consistency and total questions answered
 */
export function calculatePracticeVolumeScore(
  totalQuestionsAnswered: number,
  questionsPerWeek: number
): number {
  // Volume score: log scale, maxes out around 500 questions
  const volumeScore = Math.min(100, Math.round(
    (Math.log(totalQuestionsAnswered + 1) / Math.log(501)) * 100
  ));
  
  // Consistency bonus: steady practice vs sporadic
  // Assume 20 questions/week is "good" pace
  const consistencyMultiplier = questionsPerWeek >= 20 ? 1.0 
    : questionsPerWeek >= 10 ? 0.8 
    : questionsPerWeek >= 5 ? 0.6 
    : 0.4;
  
  return Math.round(volumeScore * consistencyMultiplier);
}

/**
 * Calculate difficulty-weighted score (20% weight)
 * Hard questions worth more than easy ones
 */
export function calculateDifficultyWeightedScore(
  difficultyScores: MasteryInput['difficultyScores']
): number {
  const { easy, medium, hard } = difficultyScores;
  
  // Weighted: hard=3, medium=2, easy=1
  const easyScore = easy.total > 0 ? (easy.correct / easy.total) * 100 * 1 : 0;
  const mediumScore = medium.total > 0 ? (medium.correct / medium.total) * 100 * 2 : 0;
  const hardScore = hard.total > 0 ? (hard.correct / hard.total) * 100 * 3 : 0;
  
  const totalWeight = (easy.total > 0 ? 1 : 0) + (medium.total > 0 ? 2 : 0) + (hard.total > 0 ? 3 : 0);
  
  if (totalWeight === 0) return 0;
  
  return Math.round((easyScore + mediumScore + hardScore) / totalWeight);
}

/**
 * Calculate speed score (10% weight)
 * Based on how close to benchmark time
 */
export function calculateSpeedScore(
  avgTimePerQuestion: number,
  benchmarkTime: number
): number {
  if (benchmarkTime <= 0) return 50; // Default if no benchmark
  
  const ratio = avgTimePerQuestion / benchmarkTime;
  
  // Under benchmark = great, over = penalize
  if (ratio <= 0.8) return 100; // Much faster than benchmark
  if (ratio <= 1.0) return 90;  // At or slightly under benchmark
  if (ratio <= 1.2) return 75;  // Slightly over
  if (ratio <= 1.5) return 50;  // Over
  if (ratio <= 2.0) return 25;  // Way over
  return 10; // Extremely slow
}

/**
 * Calculate lab completion score (10% weight)
 */
export function calculateLabCompletionScore(
  completedLessons: string[],
  completedLabs: string[],
  totalLessons: number,
  totalLabs: number
): number {
  const lessonScore = totalLessons > 0 
    ? (completedLessons.length / totalLessons) * 100 
    : 0;
  
  const labScore = totalLabs > 0 
    ? (completedLabs.length / totalLabs) * 100 
    : 0;
  
  // Labs weighted slightly higher (60%) vs lessons (40%)
  return Math.round(lessonScore * 0.4 + labScore * 0.6);
}

// ============ MAIN CALCULATOR ============

/**
 * Calculate overall mastery score
 * Formula: 40% recent_accuracy + 20% practice_volume + 20% difficulty_weighted 
 *          + 10% speed_score + 10% lesson_lab_completion
 */
export function calculateMastery(input: MasteryInput): MasteryOutput {
  const {
    recentScores,
    totalQuestionsAnswered,
    questionsPerWeek,
    difficultyScores,
    avgTimePerQuestion,
    benchmarkTime,
    completedLessons,
    completedLabs,
    totalLessons,
    totalLabs,
  } = input;

  // Calculate component scores
  const recentAccuracyScore = calculateRecentAccuracyScore(recentScores);
  const practiceVolumeScore = calculatePracticeVolumeScore(totalQuestionsAnswered, questionsPerWeek);
  const difficultyWeightedScore = calculateDifficultyWeightedScore(difficultyScores);
  const speedScore = calculateSpeedScore(avgTimePerQuestion, benchmarkTime);
  const labCompletionScore = calculateLabCompletionScore(
    completedLessons, completedLabs, totalLessons, totalLabs
  );

  // Weighted overall
  const overallScore = Math.round(
    recentAccuracyScore * 0.40 +
    practiceVolumeScore * 0.20 +
    difficultyWeightedScore * 0.20 +
    speedScore * 0.10 +
    labCompletionScore * 0.10
  );

  // Determine level
  let level: MasteryOutput['level'];
  if (overallScore >= 90) level = 'master';
  else if (overallScore >= 75) level = 'advanced';
  else if (overallScore >= 50) level = 'intermediate';
  else level = 'beginner';

  // Next milestone
  let nextMilestone: MasteryOutput['nextMilestone'] = null;
  if (overallScore < 50) {
    nextMilestone = { target: 50, focus: 'Hoàn thành thêm bài tập thực hành' };
  } else if (overallScore < 75) {
    nextMilestone = { target: 75, focus: 'Tăng độ chính xác ở các câu khó' };
  } else if (overallScore < 90) {
    nextMilestone = { target: 90, focus: 'Duy trì và mở rộng kiến thức' };
  }

  return {
    overallScore,
    recentAccuracyScore,
    practiceVolumeScore,
    difficultyWeightedScore,
    speedScore,
    labCompletionScore,
    breakdown: [
      { component: 'Độ chính xác gần đây', score: recentAccuracyScore, weight: 40, maxScore: 100 },
      { component: 'Lượng bài tập', score: practiceVolumeScore, weight: 20, maxScore: 100 },
      { component: 'Kết quả theo độ khó', score: difficultyWeightedScore, weight: 20, maxScore: 100 },
      { component: 'Tốc độ làm bài', score: speedScore, weight: 10, maxScore: 100 },
      { component: 'Hoàn thành bài/lab', score: labCompletionScore, weight: 10, maxScore: 100 },
    ],
    level,
    nextMilestone,
  };
}

// ============ TOPIC MASTERY ============

export interface TopicMastery {
  topic: string;
  score: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  strengths: string[];
  weaknesses: string[];
  recommendedLessons: string[];
}

/**
 * Calculate mastery for a specific topic
 */
export function calculateTopicMastery(
  topic: string,
  topicScores: {
    correct: number;
    total: number;
    difficultyBreakdown: Record<string, { correct: number; total: number }>;
  }
): TopicMastery {
  const { correct, total, difficultyBreakdown } = topicScores;
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  let level: TopicMastery['level'];
  if (percentage >= 90) level = 'master';
  else if (percentage >= 75) level = 'advanced';
  else if (percentage >= 50) level = 'intermediate';
  else level = 'beginner';

  // Identify strengths/weaknesses by difficulty
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  for (const [diff, stats] of Object.entries(difficultyBreakdown)) {
    const pct = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
    if (pct >= 75) {
      strengths.push(`${diff} (${pct}%)`);
    } else if (pct < 50) {
      weaknesses.push(`${diff} (${pct}%)`);
    }
  }

  return {
    topic,
    score: percentage,
    level,
    strengths,
    weaknesses,
    recommendedLessons: [], // Would be populated from lesson content
  };
}

// ============ PROGRESS TRACKING ============

export interface ProgressEntry {
  date: string;
  masteryScore: number;
  questionsAnswered: number;
  accuracy: number;
}

/**
 * Calculate progress trend over time
 */
export function calculateProgressTrend(
  history: ProgressEntry[],
  windowDays: number = 7
): {
  trend: 'improving' | 'stable' | 'declining';
  changeAmount: number;
  projectedScore: number;
} {
  if (history.length < 2) {
    return { trend: 'stable', changeAmount: 0, projectedScore: history[0]?.masteryScore || 0 };
  }

  const now = new Date();
  const recent = history.filter(e => {
    const entryDate = new Date(e.date);
    const daysDiff = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= windowDays;
  });

  if (recent.length < 2) {
    return { trend: 'stable', changeAmount: 0, projectedScore: history[0]?.masteryScore || 0 };
  }

  // Simple linear trend
  const scores = recent.map(e => e.masteryScore);
  const first = scores[0];
  const last = scores[scores.length - 1];
  const changeAmount = last - first;

  let trend: 'improving' | 'stable' | 'declining';
  if (changeAmount > 5) trend = 'improving';
  else if (changeAmount < -5) trend = 'declining';
  else trend = 'stable';

  // Project next score (simple linear extrapolation)
  const projectedScore = Math.max(0, Math.min(100, last + (changeAmount / scores.length)));

  return { trend, changeAmount, projectedScore };
}

// ============ XP AND LEVELING ============

export interface XPReward {
  baseXP: number;
  bonusXP: number;
  totalXP: number;
  breakdown: string[];
}

/**
 * Calculate XP reward for completing activities
 */
export function calculateXPReward(
  activity: 'lesson' | 'quiz' | 'exam' | 'lab',
  score?: number, // 0-100 for graded activities
  completionBonus: boolean = true
): XPReward {
  const baseXPByActivity = {
    lesson: 50,
    quiz: 75,
    exam: 150,
    lab: 100,
  };

  const baseXP = baseXPByActivity[activity];
  const breakdown: string[] = [`Base: ${baseXP} XP`];
  let bonusXP = 0;

  // Score bonus (only for graded activities)
  if (score !== undefined) {
    if (score >= 90) {
      bonusXP += 50;
      breakdown.push('Score 90%+: +50 XP');
    } else if (score >= 75) {
      bonusXP += 25;
      breakdown.push('Score 75%+: +25 XP');
    }
  }

  // Streak bonus
  // TODO: Add streak tracking if available
  // if (streakDays >= 7) { bonusXP += 20; }

  // Completion bonus
  if (completionBonus) {
    bonusXP += Math.round(baseXP * 0.1);
    breakdown.push('Completion: +10% XP');
  }

  return {
    baseXP,
    bonusXP,
    totalXP: baseXP + bonusXP,
    breakdown,
  };
}