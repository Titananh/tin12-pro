// ==========================================
// Teacher Analytics - Tin12 Pro Cánh Diều
// Analytics utilities for teacher dashboard
// ==========================================

import {
  mockClasses,
  mockStudentRoster,
  mockTopicAnalytics,
  mockExamReadiness,
  StudentProgress,
  TopicAnalytics,
  ExamReadiness,
} from '@/content/teacher-data';

// ============ CLASS ANALYTICS ============

export interface ClassSummary {
  classId: string;
  className: string;
  totalStudents: number;
  avgProgress: number;
  avgMastery: number;
  activeToday: number;
  weakTopics: string[];
  examReadinessScore: number;
}

export function getClassSummary(classId: string): ClassSummary | null {
  const classData = mockClasses.find(c => c.id === classId);
  if (!classData) return null;
  
  const students = mockStudentRoster.filter(s => s.classId === classId);
  const today = new Date().toISOString().split('T')[0];
  const activeToday = students.filter(s => s.lastActive === today).length;
  
  const examData = mockExamReadiness.find(e => e.classId === classId);
  
  return {
    classId: classData.id,
    className: classData.name,
    totalStudents: classData.studentCount,
    avgProgress: classData.averageProgress,
    avgMastery: classData.averageMastery,
    activeToday,
    weakTopics: classData.weakTopics,
    examReadinessScore: examData?.readinessScore || 0,
  };
}

export function getAllClassSummaries(): ClassSummary[] {
  return mockClasses.map(c => getClassSummary(c.id)).filter(Boolean) as ClassSummary[];
}

// ============ STUDENT ANALYTICS ============

export interface StudentAnalytics {
  studentId: string;
  xp: number;
  level: number;
  streak: number;
  progress: number; // percentage
  quizAverage: number;
  examAverage: number;
  masteryScore: number;
  weakTopics: string[];
  strongTopics: string[];
  recommendedActions: string[];
}

export function getStudentAnalytics(studentId: string): StudentAnalytics | null {
  const student = mockStudentRoster.find(s => s.id === studentId);
  if (!student) return null;
  
  const examAverage = student.examScores.length > 0
    ? student.examScores.reduce((a, b) => a + b, 0) / student.examScores.length
    : 0;
  
  const progress = Math.round((student.completedLessons / student.totalLessons) * 100);
  const masteryScore = Math.round(
    Object.values(student.mastery).reduce((a, b) => a + b, 0) / Object.values(student.mastery).length
  );
  
  const recommendedActions: string[] = [];
  if (student.weakTopics.length > 0) {
    recommendedActions.push(`Ôn luyện: ${student.weakTopics.join(', ')}`);
  }
  if (student.streak < 3) {
    recommendedActions.push('Tăng cường học đều mỗi ngày');
  }
  if (masteryScore < 60) {
    recommendedActions.push('Thực hành nhiều hơn với quiz và lab');
  }
  
  return {
    studentId: student.id,
    xp: student.xp,
    level: student.level,
    streak: student.streak,
    progress,
    quizAverage: student.quizAverage,
    examAverage: Math.round(examAverage * 10) / 10,
    masteryScore,
    weakTopics: student.weakTopics,
    strongTopics: student.strongTopics,
    recommendedActions,
  };
}

export function getStudentsNeedingAttention(classId?: string): StudentProgress[] {
  let students = mockStudentRoster;
  
  if (classId) {
    students = students.filter(s => s.classId === classId);
  }
  
  return students.filter(s => {
    // No activity in 3+ days
    const lastActive = new Date(s.lastActive);
    const daysSince = Math.floor((Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince > 3) return true;
    
    // Streak broken
    if (s.streak === 0 && s.completedLessons < 10) return true;
    
    // Low mastery
    const avgMastery = Object.values(s.mastery).reduce((a, b) => a + b, 0) / Object.values(s.mastery).length;
    if (avgMastery < 50) return true;
    
    return false;
  });
}

// ============ TOPIC ANALYTICS ============

export function getTopicAnalyticsForClass(_classId: string): TopicAnalytics[] {
  // In a real app, this would calculate from actual student data
  // For demo, return mock data with class-specific adjustments
  return mockTopicAnalytics.map(topic => ({
    ...topic,
    classAverage: topic.classAverage + Math.floor(Math.random() * 10) - 5,
  }));
}

export function getWeakTopicsForClass(classId: string): string[] {
  const classData = mockClasses.find(c => c.id === classId);
  return classData?.weakTopics || [];
}

export function getStrongTopicsForClass(classId: string): string[] {
  const classData = mockClasses.find(c => c.id === classId);
  return classData?.strongTopics || [];
}

// ============ EXAM READINESS ============

export function getExamReadinessForClass(classId: string): ExamReadiness | null {
  return mockExamReadiness.find(e => e.classId === classId) || null;
}

export function getOverallExamReadiness(): number {
  if (mockExamReadiness.length === 0) return 0;
  const sum = mockExamReadiness.reduce((a, b) => a + b.readinessScore, 0);
  return Math.round(sum / mockExamReadiness.length);
}

// ============ ASSIGNMENT ANALYTICS ============

export interface AssignmentAnalytics {
  assignmentId: string;
  totalStudents: number;
  submittedCount: number;
  pendingCount: number;
  completionRate: number;
  avgScore?: number;
  scoreDistribution: {
    excellent: number; // 90-100
    good: number;      // 70-89
    pass: number;       // 50-69
    fail: number;       // 0-49
  };
}

export function getAssignmentAnalytics(assignmentId: string): AssignmentAnalytics | null {
  // Mock implementation
  return {
    assignmentId,
    totalStudents: 35,
    submittedCount: 28,
    pendingCount: 7,
    completionRate: 80,
    avgScore: 82,
    scoreDistribution: {
      excellent: 8,
      good: 15,
      pass: 4,
      fail: 1,
    },
  };
}

// ============ CLASS COMPARISON ============

export interface ClassComparison {
  classId: string;
  className: string;
  metrics: {
    avgProgress: number;
    avgMastery: number;
    avgQuizScore: number;
    avgExamScore: number;
    activeStudents: number;
  };
  rank: number;
  improvementTrend: 'up' | 'down' | 'stable';
}

export function compareClasses(): ClassComparison[] {
  return mockClasses.map((classData, index) => {
    const students = mockStudentRoster.filter(s => s.classId === classData.id);
    const avgQuizScore = Math.round(
      students.reduce((sum, s) => sum + s.quizAverage, 0) / students.length
    );
    const avgExamScore = Math.round(
      students.reduce((sum, s) => {
        const avg = s.examScores.length > 0
          ? s.examScores.reduce((a, b) => a + b, 0) / s.examScores.length
          : 0;
        return sum + avg;
      }, 0) / students.length
    );
    
    return {
      classId: classData.id,
      className: classData.name,
      metrics: {
        avgProgress: classData.averageProgress,
        avgMastery: classData.averageMastery,
        avgQuizScore,
        avgExamScore,
        activeStudents: students.filter(s => {
          const lastActive = new Date(s.lastActive);
          const daysSince = Math.floor((Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
          return daysSince <= 3;
        }).length,
      },
      rank: index + 1,
      improvementTrend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
    };
  });
}

// ============ REPORT GENERATION ============

export interface StudentReportCard {
  student: StudentProgress;
  analytics: StudentAnalytics;
  examHistory: { date: string; score: number }[];
  topicMastery: { topic: string; score: number }[];
  badges: string[];
  recommendations: string[];
}

export function generateStudentReportCard(studentId: string): StudentReportCard | null {
  const student = mockStudentRoster.find(s => s.id === studentId);
  const analytics = getStudentAnalytics(studentId);
  
  if (!student || !analytics) return null;
  
  const topicMastery = Object.entries(student.mastery).map(([topic, score]) => ({
    topic,
    score,
  }));
  
  const examHistory = student.examScores.map((score, idx) => ({
    date: `2026-05-${10 + idx * 5}`,
    score,
  }));
  
  const recommendations: string[] = [];
  if (analytics.masteryScore < 70) {
    recommendations.push('Cần tập trung vào các chủ đề yếu');
  }
  if (analytics.streak < 7) {
    recommendations.push('Duy trì streak bằng cách học đều mỗi ngày');
  }
  if (analytics.examAverage < 7) {
    recommendations.push('Luyện thêm đề thi thử để cải thiện điểm thi');
  }
  
  return {
    student,
    analytics,
    examHistory,
    topicMastery,
    badges: ['streak-3', 'bookworm'], // Mock badges
    recommendations,
  };
}

// ============ EXPORT DATA ============

export function exportClassReportCSV(classId: string): string {
  const classData = mockClasses.find(c => c.id === classId);
  if (!classData) return '';
  
  const students = mockStudentRoster.filter(s => s.classId === classId);
  
  const headers = ['STT', 'Họ tên', 'XP', 'Level', 'Streak', 'Bài hoàn thành', 'Quiz TB', 'Mastery', 'Chủ đề yếu'];
  const rows = students.map((s, idx) => [
    idx + 1,
    s.name,
    s.xp,
    s.level,
    s.streak,
    `${s.completedLessons}/${s.totalLessons}`,
    s.quizAverage,
    Math.round(Object.values(s.mastery).reduce((a, b) => a + b, 0) / Object.values(s.mastery).length),
    s.weakTopics.join('; '),
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}