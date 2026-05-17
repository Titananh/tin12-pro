// ==========================================
// Badges Seed Data - Tin12 Pro Cánh Diều
// 20 badges for gamification
// ==========================================
import { Badge } from '@/lib/types';

export const badges: Badge[] = [
  // ========== STREAK & CONSISTENCY BADGES ==========
  {
    id: 'badge-first-login',
    name: 'Xin chào!',
    description: 'Đăng nhập lần đầu tiên vào Tin12 Pro',
    icon: 'HI',
    criteria: 'Hoàn thành đăng nhập đầu tiên',
    xpReward: 10
  },
  {
    id: 'badge-3-day-streak',
    name: 'Khởi đầu',
    description: 'Học liên tiếp 3 ngày',
    icon: 'S3',
    criteria: 'Streak 3 ngày liên tiếp',
    xpReward: 50
  },
  {
    id: 'badge-7-day-streak',
    name: 'Đều đặn',
    description: 'Học liên tiếp 7 ngày',
    icon: 'S7',
    criteria: 'Streak 7 ngày liên tiếp',
    xpReward: 100
  },
  {
    id: 'badge-30-day-streak',
    name: 'Kiên trì',
    description: 'Học liên tiếp 30 ngày',
    icon: 'S30',
    criteria: 'Streak 30 ngày liên tiếp',
    xpReward: 500
  },
  {
    id: 'badge-100-day-streak',
    name: ' Huyền thoại',
    description: 'Học liên tiếp 100 ngày - bạn là người có ý chí phi thường!',
    icon: 'S100',
    criteria: 'Streak 100 ngày liên tiếp',
    xpReward: 2000
  },

  // ========== LESSON COMPLETION BADGES ==========
  {
    id: 'badge-first-lesson',
    name: 'Bài học đầu tiên',
    description: 'Hoàn thành bài học đầu tiên',
    icon: 'L1',
    criteria: 'Hoàn thành 1 bài học',
    xpReward: 20
  },
  {
    id: 'badge-5-lessons',
    name: 'Người học chăm chỉ',
    description: 'Hoàn thành 5 bài học',
    icon: 'L5',
    criteria: 'Hoàn thành 5 bài học',
    xpReward: 75
  },
  {
    id: 'badge-10-lessons',
    name: 'Kiến thức tích lũy',
    description: 'Hoàn thành 10 bài học',
    icon: 'L10',
    criteria: 'Hoàn thành 10 bài học',
    xpReward: 150
  },
  {
    id: 'badge-20-lessons',
    name: 'Học giả',
    description: 'Hoàn thành 20 bài học',
    icon: 'L20',
    criteria: 'Hoàn thành 20 bài học',
    xpReward: 300
  },

  // ========== QUIZ & EXAM BADGES ==========
  {
    id: 'badge-first-quiz',
    name: 'Thi thử',
    description: 'Làm bài quiz đầu tiên',
    icon: 'Q1',
    criteria: 'Hoàn thành 1 quiz',
    xpReward: 25
  },
  {
    id: 'badge-quiz-perfect',
    name: 'Hoàn hảo',
    description: 'Đạt điểm tuyệt đối trong một quiz',
    icon: '100',
    criteria: 'Đạt 100% trong quiz',
    xpReward: 100
  },
  {
    id: 'badge-first-exam',
    name: 'Thi thử sức',
    description: 'Làm bài thi thử đầu tiên',
    icon: 'E1',
    criteria: 'Hoàn thành 1 bài thi thử',
    xpReward: 50
  },
  {
    id: 'badge-exam-8plus',
    name: 'Học sinh giỏi',
    description: 'Đạt điểm thi thử từ 8.0 trở lên',
    icon: '8+',
    criteria: 'Đạt điểm exam >= 8.0',
    xpReward: 200
  },
  {
    id: 'badge-exam-perfect',
    name: 'Siêu sao thi cử',
    description: 'Đạt điểm thi thử tuyệt đối (9-10)',
    icon: '9+',
    criteria: 'Đạt điểm exam >= 9.0',
    xpReward: 500
  },

  // ========== LAB COMPLETION BADGES ==========
  {
    id: 'badge-first-lab',
    name: 'Thực hành',
    description: 'Hoàn thành lab thực hành đầu tiên',
    icon: 'LAB',
    criteria: 'Hoàn thành 1 lab',
    xpReward: 30
  },
  {
    id: 'badge-html-master',
    name: 'HTML Master',
    description: 'Hoàn thành tất cả 5 labs HTML/CSS',
    icon: 'WEB',
    criteria: 'Hoàn thành 5 labs HTML/CSS',
    xpReward: 200
  },
  {
    id: 'badge-network-expert',
    name: 'Network Expert',
    description: 'Hoàn thành lab mạng và hiểu TCP/IP',
    icon: 'LAN',
    criteria: 'Hoàn thành lab network',
    xpReward: 150
  },
  {
    id: 'badge-portfolio-builder',
    name: 'Portfolio Builder',
    description: 'Hoàn thành project portfolio cuối khóa',
    icon: 'PORT',
    criteria: 'Hoàn thành lab project cuối khóa',
    xpReward: 300
  },

  // ========== TRACK & SPECIAL BADGES ==========
  {
    id: 'badge-cs-track',
    name: 'Nhà Khoa học Máy tính',
    description: 'Hoàn thành khóa CS (Khoa học máy tính)',
    icon: 'CS',
    criteria: 'Hoàn thành tất cả bài học trong course CS',
    xpReward: 400
  },
  {
    id: 'badge-ict-track',
    name: 'Web Developer',
    description: 'Hoàn thành khóa ICT (Tin học ứng dụng)',
    icon: 'ICT',
    criteria: 'Hoàn thành tất cả bài học trong course ICT',
    xpReward: 400
  },
  {
    id: 'badge-exam-prep-master',
    name: 'Thi thủ khoa',
    description: 'Luyện thi Tốt nghiệp - Hoàn thành 3 đề thi thử với điểm >= 8',
    icon: 'THPT',
    criteria: 'Hoàn thành 3 exams với điểm >= 8 mỗi exam',
    xpReward: 600
  },
  {
    id: 'badge-all-rounder',
    name: 'Toàn diện',
    description: 'Hoàn thành bài học trong tất cả 5 courses',
    icon: 'ALL',
    criteria: 'Hoàn thành ít nhất 1 bài học trong mỗi course',
    xpReward: 500
  },
  {
    id: 'badge-flashcard-champion',
    name: 'Vua Flashcard',
    description: 'Học và ôn lại 100 flashcards',
    icon: 'FC',
    criteria: 'Review 100 flashcards',
    xpReward: 150
  },
  {
    id: 'badge-explainer',
    name: 'Giảng viên',
    description: 'Sử dụng tính năng "Giải thích như trẻ 5 tuổi" 10 lần',
    icon: 'AI',
    criteria: 'Sử dụng explainLikeNew 10 lần',
    xpReward: 100
  },
  {
    id: 'badge-level-5',
    name: 'Cấp độ 5',
    description: 'Đạt level 5 - đang trên đà phát triển!',
    icon: 'LV5',
    criteria: 'Đạt level 5',
    xpReward: 250
  },
  {
    id: 'badge-level-10',
    name: 'Cấp độ 10',
    description: 'Đạt level 10 - bạn đã rất nỗ lực!',
    icon: 'LV10',
    criteria: 'Đạt level 10',
    xpReward: 500
  },
  {
    id: 'badge-xp-1000',
    name: 'Nghìn điểm XP',
    description: 'Tích lũy 1000 XP - cột mốc đầu tiên!',
    icon: 'XP1K',
    criteria: 'Tổng XP >= 1000',
    xpReward: 100
  },
  {
    id: 'badge-xp-5000',
    name: 'Siêu XP',
    description: 'Tích lũy 5000 XP - bạn là ngôi sao!',
    icon: 'XP5K',
    criteria: 'Tổng XP >= 5000',
    xpReward: 300
  }
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(b => b.id === id);
}

export function getBadgesByCriteria(criteria: string): Badge[] {
  return badges.filter(b => b.criteria.includes(criteria));
}

// Badge categories for display
export const badgeCategories = [
  {
    name: 'Streak & Consistency',
    badges: badges.filter(b => ['streak'].some(c => b.criteria.includes(c)))
  },
  {
    name: 'Lesson Completion',
    badges: badges.filter(b => b.criteria.includes('bài học'))
  },
  {
    name: 'Quiz & Exam',
    badges: badges.filter(b => ['quiz', 'exam'].some(c => b.criteria.includes(c)))
  },
  {
    name: 'Lab & Project',
    badges: badges.filter(b => ['lab', 'project'].some(c => b.criteria.includes(c)))
  },
  {
    name: 'Track Completion',
    badges: badges.filter(b => ['course', 'track'].some(c => b.criteria.includes(c)))
  },
  {
    name: 'Special Achievements',
    badges: badges.filter(b => ['level', 'XP', 'flashcard', 'explain'].some(c => b.criteria.includes(c)))
  }
];
