// ==========================================
// Updated Demo Seed Data - Tin12 Pro Cánh Diều
// Extended with mistakes, reports, projects, learning paths
// ==========================================
import { User, TodayPlan, Badge, Flashcard } from '@/lib/types';
import type { MasteryMap } from '@/lib/types';
export type { MasteryMap };
import { courses } from './courses';
import { lessons } from './lessons';
import { exams } from './exams';
import { labs } from './labs';
import { badges } from './badges';

// ============ USER MOCK ============
export const mockUser: User = {
  id: 'user-1',
  name: 'Nguyễn Văn Minh',
  email: 'minh.nguyen@email.com',
  role: 'student',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh',
  xp: 2450,
  level: 12,
  streak: 7,
  joinedAt: '2025-09-01',
  goals: ['Thi tốt nghiệp THPT', 'Nắm vững Tin học 12', 'Học lập trình web'],
  track: 'cs',
  completedLessons: ['lesson-1-1', 'lesson-1-2', 'lesson-2-1', 'lesson-2-2', 'lesson-3-1'],
  quizScores: [
    { quizId: 'quiz-1', score: 85, totalQuestions: 10, completedAt: '2025-10-15' },
    { quizId: 'quiz-2', score: 92, totalQuestions: 10, completedAt: '2025-10-20' },
    { quizId: 'quiz-3', score: 78, totalQuestions: 10, completedAt: '2025-10-25' },
  ],
  examScores: [
    { examId: 'exam-1', score: 7.5, part1Score: 4.5, part2Score: 3.0, completedAt: '2025-10-25', timeSpent: 48 },
  ],
  badges: ['first-lesson', 'streak-3', 'perfect-quiz', 'early-bird']
};

// ============ TODAY PLAN ============
export const mockTodayPlan: TodayPlan = {
  reason: 'Dựa trên lộ trình học tập và điểm yếu của bạn',
  lessons: [
    { id: 'lesson-2-2', title: 'Học máy (Machine Learning)', type: 'lesson', reason: 'Tiếp theo bài AI đã học', estimatedMinutes: 45 },
    { id: 'lesson-3-1', title: 'Tổng quan về Mạng máy tính', type: 'lesson', reason: 'Cần cải thiện chủ đề mạng', estimatedMinutes: 40 },
  ],
  practice: [
    { id: 'quiz-ai-1', title: 'Quiz AI & Machine Learning', type: 'quiz', reason: 'Củng cố kiến thức đã học', estimatedMinutes: 15 },
  ],
  labs: [
    { id: 'lab-1', title: 'Giới thiệu HTML', type: 'lab', reason: 'Thực hành tạo trang cá nhân', estimatedMinutes: 30 },
  ]
};

// ============ MASTERY MAP ============
export const mockMasteryMap: MasteryMap[] = [
  { topic: 'Kiến trúc máy tính', score: 85, weakTopics: ['DMA', 'Interrupt'] },
  { topic: 'Phần mềm hệ thống', score: 90, weakTopics: [] },
  { topic: 'AI & Machine Learning', score: 65, weakTopics: ['Deep Learning', 'Neural Networks'] },
  { topic: 'Mạng máy tính', score: 55, weakTopics: ['TCP/IP', 'DNS', 'Routing'] },
  { topic: 'HTML/CSS', score: 75, weakTopics: ['Flexbox', 'Grid'] },
  { topic: 'Đạo đức số', score: 95, weakTopics: [] },
  { topic: 'Thuật toán', score: 70, weakTopics: ['Big O', 'Sorting'] },
  { topic: 'Cơ sở dữ liệu', score: 60, weakTopics: ['SQL', 'Normalization'] },
];

// ============ BADGES ============
export const mockBadges: Badge[] = [
  { id: 'first-lesson', name: 'Khởi đầu', description: 'Hoàn thành bài học đầu tiên', icon: '🎯', criteria: 'Hoàn thành 1 bài học', xpReward: 50 },
  { id: 'streak-3', name: '3 ngày liên tiếp', description: 'Học liên tục 3 ngày', icon: '🔥', criteria: 'Streak 3 ngày', xpReward: 100 },
  { id: 'perfect-quiz', name: 'Hoàn hảo', description: 'Đạt 100% trong quiz', icon: '💯', criteria: 'Quiz điểm tối đa', xpReward: 150 },
  { id: 'early-bird', name: 'Người đi sớm', description: 'Học trước 7h sáng', icon: '🌅', criteria: 'Học trước 7h', xpReward: 75 },
  { id: 'speed-demon', name: 'Thần tốc', description: 'Hoàn thành bài thi trước 30 phút', icon: '⚡', criteria: 'Nộp sớm trong exam', xpReward: 100 },
  { id: 'bookworm', name: 'Sách vở', description: 'Hoàn thành 10 bài học', icon: '📚', criteria: '10 lessons completed', xpReward: 200 },
  { id: 'lab-star', name: 'Ngôi sao Lab', description: 'Hoàn thành 5 labs', icon: '🔬', criteria: '5 labs completed', xpReward: 250 },
  { id: 'master-mind', name: 'Bậc thầy', description: 'Đạt 90% mastery trong 1 topic', icon: '🧠', criteria: 'Topic mastery 90%+', xpReward: 300 },
];

// ============ FLASHCARDS MOCK ============
export const mockFlashcards: Flashcard[] = [
  { id: 'fc-demo-1', deckId: 'deck-ai', front: 'AI hẹp (Narrow AI) là gì?', back: 'AI chỉ được thiết kế để làm tốt một tác vụ cụ thể, như nhận dạng khuôn mặt hoặc dịch thuật. Khác với AGI (AI tổng quát) làm được mọi việc như con người - vẫn chưa đạt được.', topic: 'ai-ml', difficulty: 'easy' },
  { id: 'fc-demo-2', deckId: 'deck-ai', front: 'Machine Learning khác Deep Learning chỗ nào?', back: 'Deep Learning dùng nhiều hidden layers (deep) để học features từ thấp đến cao. ML truyền thống thường chỉ có 1-2 layers hoặc dùng features được design thủ công.', topic: 'ai-ml', difficulty: 'medium' },
  { id: 'fc-demo-3', deckId: 'deck-ai', front: 'CNN thường dùng cho loại dữ liệu nào?', back: 'CNN (Convolutional Neural Network) đặc biệt hiệu quả với dữ liệu có spatial structure như hình ảnh, video. Convolution layer tìm features như edges, textures.', topic: 'ai-ml', difficulty: 'medium' },
  { id: 'fc-demo-4', deckId: 'deck-network', front: 'DNS có chức năng gì?', back: 'DNS (Domain Name System) hoạt động như "danh bạ điện thoại" của Internet, chuyển đổi tên miền (google.com) thành địa chỉ IP (142.250.xx.xx).', topic: 'mạng-máy-tính', difficulty: 'easy' },
  { id: 'fc-demo-5', deckId: 'deck-network', front: 'HTTPS khác HTTP ở điểm nào?', back: 'HTTPS dùng TLS (Transport Layer Security) để mã hóa dữ liệu truyền giữa browser và server, ngăn kẻ tấn công chặn và đọc thông tin. HTTP không mã hóa.', topic: 'mạng-máy-tính', difficulty: 'easy' },
  { id: 'fc-demo-6', deckId: 'deck-html', front: 'Padding khác margin chỗ nào?', back: 'Padding là khoảng cách từ content đến border (trong). Margin là khoảng cách từ border ra ngoài (ngoài).', topic: 'html-css', difficulty: 'medium' },
  { id: 'fc-demo-7', deckId: 'deck-html', front: 'Flexbox dùng thuộc tính nào để căn giữa ngang?', back: 'justify-content căn theo trục chính (main axis). Mặc định main axis là horizontal (row), nên justify-content: center sẽ căn giữa ngang.', topic: 'html-css', difficulty: 'medium' },
  { id: 'fc-demo-8', deckId: 'deck-arch', front: '1 byte bằng bao nhiêu bit?', back: '1 byte = 8 bits. Mỗi bit là 0 hoặc 1. 8 bits có thể biểu diễn 256 giá trị (2^8).', topic: 'kiến-trúc-máy-tính', difficulty: 'easy' },
];

// ============ COURSE PROGRESS ============
export const mockCourseProgress = [
  { courseId: 'course-1', title: 'Nền tảng Tin học 12', progress: 40, completedLessons: 2, totalLessons: 8 },
  { courseId: 'course-2', title: 'AI và Xã hội Tri thức', progress: 25, completedLessons: 1, totalLessons: 6 },
  { courseId: 'course-3', title: 'Mạng máy tính', progress: 0, completedLessons: 0, totalLessons: 5 },
  { courseId: 'course-4', title: 'HTML/CSS và Web', progress: 15, completedLessons: 1, totalLessons: 8 },
  { courseId: 'course-5', title: 'Luyện thi THPT', progress: 0, completedLessons: 0, totalLessons: 10 },
];

// ============ EXAM HISTORY ============
export const mockExamHistory = [
  { examId: 'exam-1', title: 'Đề thi thử số 1', score: 7.5, maxScore: 10, completedAt: '2025-10-25', timeSpent: 48 },
  { examId: 'exam-2', title: 'Đề thi thử số 2', score: 6.0, maxScore: 10, completedAt: '2025-11-01', timeSpent: 50 },
];

// ============ STATS ============
export const mockStats = {
  totalXP: 2450,
  level: 12,
  streak: 7,
  totalLessonsCompleted: 12,
  totalQuizzesTaken: 8,
  averageQuizScore: 87,
  totalLabsCompleted: 3,
  totalExamsTaken: 2,
  examReadiness: 72,
  timeSpentLearning: 42, // hours
  currentRank: 'Học sinh tiên tiến',
  nextRankXP: 2800,
  flashcardDue: 8,
  weakestTopics: ['TCP/IP', 'DNS', 'Routing'],
  recentMistakesCount: 5,
};

// ============ MISTAKES DATA ============
export interface MistakeEntry {
  id: string;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  topic: string;
  errorType: 'concept' | 'calculation' | 'terminology' | 'application';
  date: string;
  timesWrong: number;
}

export const mockMistakes: MistakeEntry[] = [
  {
    id: 'mistake-1',
    question: 'DNS có chức năng gì?',
    yourAnswer: 'Mã hóa dữ liệu',
    correctAnswer: 'Chuyển tên miền thành địa chỉ IP',
    explanation: 'DNS (Domain Name System) hoạt động như "danh bạ điện thoại" của Internet, chuyển đổi tên miền (google.com) thành địa chỉ IP (142.250.xx.xx) để máy tính có thể kết nối.',
    topic: 'Mạng máy tính',
    errorType: 'terminology',
    date: '2025-10-28',
    timesWrong: 2,
  },
  {
    id: 'mistake-2',
    question: 'Số 25 trong hệ nhị phân là gì?',
    yourAnswer: '10011',
    correctAnswer: '11001',
    explanation: '25 = 16 + 8 + 1 = 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 11001 (nhị phân). Cách tính: 25/2=12 dư 1, 12/2=6 dư 0, 6/2=3 dư 0, 3/2=1 dư 1, 1/2=0 dư 1 → đọc ngược: 11001.',
    topic: 'Kiến trúc máy tính',
    errorType: 'calculation',
    date: '2025-10-27',
    timesWrong: 1,
  },
  {
    id: 'mistake-3',
    question: 'Thuật toán nào dùng để phân nhóm khách hàng theo hành vi?',
    yourAnswer: 'Spam detection',
    correctAnswer: 'Customer clustering',
    explanation: 'Customer clustering là Unsupervised Learning - máy tự tìm nhóm dựa trên đặc điểm mà không có label sẵn.',
    topic: 'AI & Machine Learning',
    errorType: 'concept',
    date: '2025-10-26',
    timesWrong: 3,
  },
  {
    id: 'mistake-4',
    question: 'Padding khác margin chỗ nào?',
    yourAnswer: 'Không khác nhau',
    correctAnswer: 'Padding trong border, margin ngoài border',
    explanation: 'Padding là khoảng cách từ content đến border (trong). Margin là khoảng cách từ border ra ngoài (ngoài).',
    topic: 'HTML/CSS',
    errorType: 'concept',
    date: '2025-10-25',
    timesWrong: 2,
  },
  {
    id: 'mistake-5',
    question: 'Deep Learning khác Machine Learning ở điểm nào?',
    yourAnswer: 'Dùng ít dữ liệu hơn',
    correctAnswer: 'Dùng nhiều lớp mạng neural',
    explanation: 'Deep Learning dùng nhiều hidden layers (deep) để học features từ thấp đến cao. ML truyền thống thường chỉ có 1-2 layers hoặc dùng features được design thủ công.',
    topic: 'AI & Machine Learning',
    errorType: 'concept',
    date: '2025-10-24',
    timesWrong: 1,
  },
];

// ============ REPORTS DATA ============
export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  totalStudyTime: number; // minutes
  lessonsCompleted: number;
  quizzesTaken: number;
  averageQuizScore: number;
  labsCompleted: number;
  examTaken: boolean;
  examScore?: number;
  xpEarned: number;
  streakMaintained: boolean;
  weakestTopics: string[];
  strongestTopics: string[];
  recommendedLessons: string[];
}

export const mockWeeklyReports: WeeklyReport[] = [
  {
    weekStart: '2025-10-20',
    weekEnd: '2025-10-26',
    totalStudyTime: 180,
    lessonsCompleted: 3,
    quizzesTaken: 4,
    averageQuizScore: 85,
    labsCompleted: 1,
    examTaken: false,
    xpEarned: 350,
    streakMaintained: true,
    weakestTopics: ['Mạng máy tính', 'TCP/IP'],
    strongestTopics: ['AI & Machine Learning', 'Đạo đức số'],
    recommendedLessons: ['lesson-3-2', 'lesson-3-3'],
  },
  {
    weekStart: '2025-10-13',
    weekEnd: '2025-10-19',
    totalStudyTime: 150,
    lessonsCompleted: 2,
    quizzesTaken: 3,
    averageQuizScore: 78,
    labsCompleted: 1,
    examTaken: true,
    examScore: 7.5,
    xpEarned: 420,
    streakMaintained: true,
    weakestTopics: ['HTML/CSS', 'CSS Flexbox'],
    strongestTopics: ['Kiến trúc máy tính'],
    recommendedLessons: ['lesson-4-2', 'lesson-4-3'],
  },
  {
    weekStart: '2025-10-06',
    weekEnd: '2025-10-12',
    totalStudyTime: 120,
    lessonsCompleted: 2,
    quizzesTaken: 2,
    averageQuizScore: 82,
    labsCompleted: 0,
    examTaken: false,
    xpEarned: 200,
    streakMaintained: false,
    weakestTopics: ['Phần mềm hệ thống'],
    strongestTopics: ['AI & Machine Learning'],
    recommendedLessons: ['lesson-1-2'],
  },
];

// ============ PROJECTS DATA ============
export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'web' | 'data' | 'network' | 'ai';
  status: 'draft' | 'submitted' | 'graded';
  grade?: number;
  submittedAt?: string;
  skills: string[];
  tags: string[];
  thumbnail?: string;
}

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Trang cá nhân HTML/CSS',
    description: 'Tạo trang web giới thiệu bản thân với HTML5 và CSS3, sử dụng Flexbox và Grid layout.',
    type: 'web',
    status: 'submitted',
    grade: 8.5,
    submittedAt: '2025-10-20',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
    tags: ['web', 'html', 'css', 'beginner'],
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
  },
  {
    id: 'project-2',
    title: 'Phân tích dữ liệu với Python',
    description: 'Phân tích dataset và trực quan hóa dữ liệu sử dụng Pandas và Matplotlib.',
    type: 'data',
    status: 'draft',
    skills: ['Python', 'Pandas', 'Data Analysis', 'Visualization'],
    tags: ['data', 'python', 'analysis'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    id: 'project-3',
    title: 'Mô phỏng mạng LAN',
    description: 'Thiết kế và mô phỏng mạng LAN cho một văn phòng nhỏ sử dụng Cisco Packet Tracer.',
    type: 'network',
    status: 'submitted',
    grade: 9.0,
    submittedAt: '2025-10-15',
    skills: ['Networking', 'LAN', 'Cisco', 'Routing', 'Switching'],
    tags: ['network', 'lan', 'cisco'],
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
  },
];

// ============ LEARNING PATH DATA ============
export type LearningPathGoal = 'recover' | 'exam' | 'cs';

export interface LearningPathMilestone {
  week: number;
  focus: string;
  lessons: string[];
  practice: string[];
  labs?: string;
  exam?: string;
  targetMastery: number;
}

export interface LearningPath {
  goal: LearningPathGoal;
  duration: 30 | 60 | 90;
  milestones: LearningPathMilestone[];
  currentWeek: number;
  progress: number;
}

export const mockLearningPaths: Record<LearningPathGoal, LearningPath[]> = {
  recover: [
    // 30-day path for students who need to recover basics
    {
      goal: 'recover',
      duration: 30,
      currentWeek: 2,
      progress: 35,
      milestones: [
        {
          week: 1,
          focus: 'Nền tảng kiến thức',
          lessons: ['lesson-1-1', 'lesson-1-2', 'lesson-1-3'],
          practice: ['q-kt-1', 'q-kt-2', 'q-kt-3'],
          labs: 'lab-1',
          targetMastery: 60,
        },
        {
          week: 2,
          focus: 'Mạng máy tính cơ bản',
          lessons: ['lesson-3-1', 'lesson-3-2'],
          practice: ['q-kt-10', 'q-kt-11'],
          targetMastery: 65,
        },
        {
          week: 3,
          focus: 'HTML/CSS cơ bản',
          lessons: ['lesson-4-1', 'lesson-4-2'],
          practice: ['q-html-1', 'q-html-2'],
          labs: 'lab-2',
          targetMastery: 70,
        },
        {
          week: 4,
          focus: 'Ôn tập và kiểm tra',
          lessons: [],
          practice: [],
          exam: 'exam-review-1',
          targetMastery: 75,
        },
      ],
    },
    // 60-day path
    {
      goal: 'recover',
      duration: 60,
      currentWeek: 4,
      progress: 20,
      milestones: Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        focus: ['Nền tảng', 'Mạng cơ bản', 'Web cơ bản', 'AIIntro', 'ML cơ bản', 'Web nâng cao', 'Mạng nâng cao', 'Ôn tập'][i],
        lessons: [],
        practice: [],
        targetMastery: 50 + i * 5,
      })),
    },
    // 90-day path
    {
      goal: 'recover',
      duration: 90,
      currentWeek: 6,
      progress: 15,
      milestones: Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        focus: `Tuần ${i + 1}`,
        lessons: [],
        practice: [],
        targetMastery: 40 + i * 4,
      })),
    },
  ],
  exam: [
    // 30-day exam prep
    {
      goal: 'exam',
      duration: 30,
      currentWeek: 1,
      progress: 40,
      milestones: [
        {
          week: 1,
          focus: 'Kiến trúc & Phần mềm',
          lessons: ['lesson-1-1', 'lesson-1-2', 'lesson-1-3'],
          practice: ['q-kt-full'],
          targetMastery: 70,
        },
        {
          week: 2,
          focus: 'Mạng & An toàn',
          lessons: ['lesson-3-1', 'lesson-3-2', 'lesson-3-3'],
          practice: ['q-network-full'],
          targetMastery: 75,
        },
        {
          week: 3,
          focus: 'AI & Khoa học dữ liệu',
          lessons: ['lesson-2-1', 'lesson-2-2', 'lesson-2-3'],
          practice: ['q-ai-full'],
          targetMastery: 80,
        },
        {
          week: 4,
          focus: 'Luyện đề',
          lessons: [],
          practice: [],
          exam: 'exam-final',
          targetMastery: 85,
        },
      ],
    },
    // 60-day exam prep
    {
      goal: 'exam',
      duration: 60,
      currentWeek: 3,
      progress: 25,
      milestones: Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        focus: ['KT&PM', 'Mạng', 'AI cơ bản', 'ML', 'Web', 'Ôn tổng', 'Luyện đề', 'Chiến thuật'][i],
        lessons: [],
        practice: [],
        exam: i === 7 ? 'exam-final' : undefined,
        targetMastery: 60 + i * 4,
      })),
    },
    // 90-day exam prep
    {
      goal: 'exam',
      duration: 90,
      currentWeek: 4,
      progress: 18,
      milestones: Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        focus: `Tuần luyện ${i + 1}`,
        lessons: [],
        practice: [],
        exam: i === 11 ? 'exam-final' : undefined,
        targetMastery: 50 + i * 4,
      })),
    },
  ],
  cs: [
    // 30-day CS track
    {
      goal: 'cs',
      duration: 30,
      currentWeek: 2,
      progress: 30,
      milestones: [
        {
          week: 1,
          focus: 'AI Foundations',
          lessons: ['lesson-2-1', 'lesson-2-2'],
          practice: ['q-ai-1', 'q-ai-2'],
          targetMastery: 70,
        },
        {
          week: 2,
          focus: 'Deep Learning',
          lessons: ['lesson-2-3'],
          practice: ['q-ai-3', 'q-ai-4'],
          targetMastery: 75,
        },
        {
          week: 3,
          focus: 'Networks',
          lessons: ['lesson-3-1', 'lesson-3-2'],
          practice: ['q-network-1', 'q-network-2'],
          labs: 'lab-network',
          targetMastery: 80,
        },
        {
          week: 4,
          focus: 'Projects',
          lessons: [],
          practice: [],
          labs: 'lab-final',
          targetMastery: 85,
        },
      ],
    },
    // 60-day CS track
    {
      goal: 'cs',
      duration: 60,
      currentWeek: 4,
      progress: 22,
      milestones: Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        focus: ['AI Intro', 'ML', 'Deep Learning', 'NLP', 'Computer Vision', 'Networks', 'Security', 'Project'][i],
        lessons: [],
        practice: [],
        targetMastery: 55 + i * 5,
      })),
    },
    // 90-day CS track
    {
      goal: 'cs',
      duration: 90,
      currentWeek: 6,
      progress: 15,
      milestones: Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        focus: `CS Week ${i + 1}`,
        lessons: [],
        practice: [],
        targetMastery: 45 + i * 4,
      })),
    },
  ],
};

// ============ XP LEVELING INFO ============
export const XP_LEVELS = [
  { level: 1, minXP: 0, title: 'Tân binh', icon: '🎯' },
  { level: 2, minXP: 100, title: 'Người học', icon: '📖' },
  { level: 3, minXP: 250, title: 'Học sinh', icon: '✏️' },
  { level: 4, minXP: 500, title: 'Học sinh chăm chỉ', icon: '📚' },
  { level: 5, minXP: 800, title: 'Học sinh năng động', icon: '⚡' },
  { level: 6, minXP: 1200, title: 'Học sinh tiên tiến', icon: '🚀' },
  { level: 7, minXP: 1700, title: 'Học sinh giỏi', icon: '🌟' },
  { level: 8, minXP: 2300, title: 'Học sinh xuất sắc', icon: '💫' },
  { level: 9, minXP: 3000, title: 'Chuyên gia', icon: '🎓' },
  { level: 10, minXP: 4000, title: 'Bậc thầy', icon: '👑' },
];

export const XP_RULES = {
  lesson: { base: 50, bonuses: [{ threshold: 90, bonus: 50 }, { threshold: 75, bonus: 25 }] },
  quiz: { base: 75, bonuses: [{ threshold: 90, bonus: 50 }, { threshold: 75, bonus: 25 }] },
  exam: { base: 150, bonuses: [{ threshold: 90, bonus: 100 }, { threshold: 75, bonus: 50 }] },
  lab: { base: 100, bonuses: [{ threshold: 90, bonus: 75 }, { threshold: 75, bonus: 35 }] },
  flashcardReview: { base: 10 },
  streakBonus: { threshold: 7, bonus: 20 },
};

// Re-export content for convenience
export { courses, lessons, exams, labs, badges };