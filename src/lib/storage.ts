// ==========================================
// Storage Utilities - Tin12 Pro Cánh Diều
// Client-side storage helpers for demo mode
// ==========================================

// ============ LOCAL STORAGE KEYS ============

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'tin12_pro_auth_token',
  USER: 'tin12_pro_user',
  QUIZ_STATE: 'tin12_pro_quiz_state',
  PROGRESS: 'tin12_pro_progress',
  FLASHCARD_PROGRESS: 'tin12_pro_flashcard_progress',
  RECENT_ACTIVITY: 'tin12_pro_recent_activity',
} as const;

// ============ AUTH STORAGE ============

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  track: 'CS' | 'ICT' | 'GENERAL';
  xp: number;
  level: number;
  streak: number;
}

export function saveAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function saveUser(user: StoredUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as StoredUser;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// ============ PROGRESS STORAGE ============

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent?: number;
}

export interface QuizProgress {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface UserProgress {
  completedLessons: Record<string, LessonProgress>;
  quizScores: Record<string, QuizProgress>;
  streak: number;
  lastActivity?: string;
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { completedLessons: {}, quizScores: {}, streak: 0 };
  }
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (!stored) {
    return { completedLessons: {}, quizScores: {}, streak: 0 };
  }
  try {
    return JSON.parse(stored) as UserProgress;
  } catch {
    return { completedLessons: {}, quizScores: {}, streak: 0 };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function updateLessonProgress(lessonId: string, data: Partial<LessonProgress>): void {
  const progress = getProgress();
  progress.completedLessons[lessonId] = {
    ...progress.completedLessons[lessonId],
    ...data,
    completedAt: new Date().toISOString(),
  };
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
}

export function updateQuizScore(quizId: string, score: number, totalQuestions: number): void {
  const progress = getProgress();
  progress.quizScores[quizId] = {
    quizId,
    score,
    totalQuestions,
    completedAt: new Date().toISOString(),
  };
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
}

export function updateStreak(): void {
  const progress = getProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = progress.lastActivity?.split('T')[0];
  
  if (lastActivity === today) {
    // Already active today
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (lastActivity === yesterdayStr) {
    // Continue streak
    progress.streak++;
  } else if (lastActivity !== today) {
    // Reset streak
    progress.streak = 1;
  }
  
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
}

// ============ FLASHCARD PROGRESS STORAGE ============

export interface FlashcardProgressData {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: string;
  lastReviewedAt?: string;
  reviewCount: number;
}

export function getFlashcardProgress(): Record<string, FlashcardProgressData> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function saveFlashcardProgress(cardId: string, data: FlashcardProgressData): void {
  if (typeof window === 'undefined') return;
  const allProgress = getFlashcardProgress();
  allProgress[cardId] = data;
  localStorage.setItem(STORAGE_KEYS.FLASHCARD_PROGRESS, JSON.stringify(allProgress));
}

// ============ SESSION MANAGEMENT ============

export interface RecentActivity {
  id: string;
  type: 'lesson' | 'quiz' | 'exam' | 'lab' | 'flashcard';
  title: string;
  timestamp: string;
}

export function addRecentActivity(activity: Omit<RecentActivity, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITY);
  let activities: RecentActivity[] = stored ? JSON.parse(stored) : [];
  
  activities.unshift({
    id: `activity-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...activity,
  });
  
  // Keep only last 20 activities
  activities = activities.slice(0, 20);
  
  localStorage.setItem(STORAGE_KEYS.RECENT_ACTIVITY, JSON.stringify(activities));
}

export function getRecentActivity(): RecentActivity[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// ============ CLEAR ALL STORAGE ============

export function clearAllStorage(): void {
  if (typeof window === 'undefined') return;
  
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// ============ STORAGE HELPERS ============

export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function getStorageUsage(): { used: number; available: boolean } {
  if (typeof window === 'undefined') {
    return { used: 0, available: false };
  }
  
  let used = 0;
  for (const key of Object.values(STORAGE_KEYS)) {
    const item = localStorage.getItem(key);
    if (item) {
      used += item.length;
    }
  }
  
  return { used, available: isStorageAvailable() };
}