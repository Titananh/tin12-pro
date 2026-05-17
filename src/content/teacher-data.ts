// ==========================================
// Teacher Data - Tin12 Pro Cánh Diều
// Mock data for teacher dashboard and class management
// ==========================================

// ============ TEACHER PROFILE ============
export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  totalStudents: number;
  xp: number;
  joinedAt: string;
}

export const mockTeacher: TeacherProfile = {
  id: 'teacher-1',
  name: 'Nguyễn Thị Lan Hương',
  email: 'lanhuong@school.edu.vn',
  subjects: ['Tin học 12', 'Tin học 10', 'Tin học 11'],
  classes: ['12A1', '12A2', '11B3'],
  totalStudents: 95,
  xp: 3200,
  joinedAt: '2024-08-15',
};

// ============ CLASS DATA ============
export interface ClassData {
  id: string;
  name: string;
  grade: number;
  studentCount: number;
  averageProgress: number;
  averageMastery: number;
  weakTopics: string[];
  strongTopics: string[];
  recentActivity: number; // days since last activity
}

export const mockClasses: ClassData[] = [
  {
    id: 'class-12a1',
    name: '12A1',
    grade: 12,
    studentCount: 35,
    averageProgress: 68,
    averageMastery: 72,
    weakTopics: ['TCP/IP', 'DNS', 'Deep Learning'],
    strongTopics: ['Kiến trúc máy tính', 'Đạo đức số'],
    recentActivity: 1,
  },
  {
    id: 'class-12a2',
    name: '12A2',
    grade: 12,
    studentCount: 38,
    averageProgress: 55,
    averageMastery: 65,
    weakTopics: ['HTML/CSS', 'Flexbox', 'Machine Learning'],
    strongTopics: ['Phần mềm hệ thống'],
    recentActivity: 2,
  },
  {
    id: 'class-11b3',
    name: '11B3',
    grade: 11,
    studentCount: 42,
    averageProgress: 40,
    averageMastery: 58,
    weakTopics: ['Thuật toán', 'SQL', 'Big O'],
    strongTopics: ['Kiến trúc máy tính'],
    recentActivity: 3,
  },
];

// ============ STUDENT MOCK DATA ============
export interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  classId: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: number;
  totalLessons: number;
  quizAverage: number;
  examScores: number[];
  weakTopics: string[];
  strongTopics: string[];
  lastActive: string;
  mastery: Record<string, number>;
}

export const mockStudentRoster: StudentProgress[] = [
  // Class 12A1 students
  {
    id: 'student-1',
    name: 'Trần Minh Quang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quang',
    classId: 'class-12a1',
    xp: 3200,
    level: 15,
    streak: 12,
    completedLessons: 18,
    totalLessons: 25,
    quizAverage: 88,
    examScores: [8.5, 9.0, 7.5],
    weakTopics: ['DNS', 'Routing'],
    strongTopics: ['AI/ML', 'Kiến trúc máy tính'],
    lastActive: '2026-05-15',
    mastery: {
      'kiến-trúc-máy-tính': 95,
      'ai-ml': 85,
      'mạng-máy-tính': 62,
      'html-css': 90,
      'đạo-đức-số': 88,
      'thuật-toán': 75,
    },
  },
  {
    id: 'student-2',
    name: 'Lê Hoàng Nam',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    classId: 'class-12a1',
    xp: 2100,
    level: 10,
    streak: 5,
    completedLessons: 12,
    totalLessons: 25,
    quizAverage: 76,
    examScores: [6.5, 7.0],
    weakTopics: ['Deep Learning', 'TCP/IP'],
    strongTopics: ['Đạo đức số'],
    lastActive: '2026-05-14',
    mastery: {
      'kiến-trúc-máy-tính': 78,
      'ai-ml': 55,
      'mạng-máy-tính': 45,
      'html-css': 82,
      'đạo-đức-số': 92,
      'thuật-toán': 60,
    },
  },
  {
    id: 'student-3',
    name: 'Phạm Thu Hà',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hà',
    classId: 'class-12a1',
    xp: 4500,
    level: 20,
    streak: 28,
    completedLessons: 22,
    totalLessons: 25,
    quizAverage: 94,
    examScores: [9.5, 9.0, 10.0],
    weakTopics: [],
    strongTopics: ['AI/ML', 'Mạng máy tính', 'Thuật toán'],
    lastActive: '2026-05-16',
    mastery: {
      'kiến-trúc-máy-tính': 98,
      'ai-ml': 95,
      'mạng-máy-tính': 88,
      'html-css': 96,
      'đạo-đức-số': 99,
      'thuật-toán': 90,
    },
  },
  {
    id: 'student-4',
    name: 'Nguyễn Anh Tuấn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuấn',
    classId: 'class-12a1',
    xp: 1500,
    level: 8,
    streak: 0,
    completedLessons: 8,
    totalLessons: 25,
    quizAverage: 62,
    examScores: [5.0],
    weakTopics: ['HTML/CSS', 'Flexbox', 'SQL', 'Machine Learning'],
    strongTopics: ['Kiến trúc máy tính'],
    lastActive: '2026-05-10',
    mastery: {
      'kiến-trúc-máy-tính': 72,
      'ai-ml': 35,
      'mạng-máy-tính': 40,
      'html-css': 30,
      'đạo-đức-số': 65,
      'thuật-toán': 45,
    },
  },
  {
    id: 'student-5',
    name: 'Vũ Thị Mai Phương',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phương',
    classId: 'class-12a1',
    xp: 2800,
    level: 13,
    streak: 8,
    completedLessons: 15,
    totalLessons: 25,
    quizAverage: 82,
    examScores: [7.5, 8.0],
    weakTopics: ['Routing', 'Big O'],
    strongTopics: ['HTML/CSS', 'AI/ML'],
    lastActive: '2026-05-15',
    mastery: {
      'kiến-trúc-máy-tính': 85,
      'ai-ml': 80,
      'mạng-máy-tính': 58,
      'html-css': 88,
      'đạo-đức-số': 82,
      'thuật-toán': 55,
    },
  },
  // Class 12A2 students
  {
    id: 'student-6',
    name: 'Đặng Việt Hoàng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoàng',
    classId: 'class-12a2',
    xp: 1800,
    level: 9,
    streak: 3,
    completedLessons: 10,
    totalLessons: 25,
    quizAverage: 68,
    examScores: [6.0],
    weakTopics: ['HTML/CSS', 'Flexbox', 'Grid'],
    strongTopics: ['Đạo đức số'],
    lastActive: '2026-05-13',
    mastery: {
      'kiến-trúc-máy-tính': 70,
      'ai-ml': 55,
      'mạng-máy-tính': 62,
      'html-css': 35,
      'đạo-đức-số': 85,
      'thuật-toán': 58,
    },
  },
  {
    id: 'student-7',
    name: 'Bùi Thanh Hà',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HàBùi',
    classId: 'class-12a2',
    xp: 3600,
    level: 17,
    streak: 15,
    completedLessons: 20,
    totalLessons: 25,
    quizAverage: 91,
    examScores: [9.0, 8.5],
    weakTopics: ['Deep Learning'],
    strongTopics: ['Thuật toán', 'Mạng máy tính'],
    lastActive: '2026-05-16',
    mastery: {
      'kiến-trúc-máy-tính': 92,
      'ai-ml': 78,
      'mạng-máy-tính': 85,
      'html-css': 90,
      'đạo-đức-số': 88,
      'thuật-toán': 90,
    },
  },
];

// ============ ASSIGNMENT DATA ============
export interface Assignment {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'lab' | 'exam';
  classId: string;
  dueDate: string;
  status: 'active' | 'completed' | 'draft';
  submissions: number;
  totalStudents: number;
}

export const mockAssignments: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Bài tập HTML/CSS - Tạo trang cá nhân',
    type: 'lab',
    classId: 'class-12a1',
    dueDate: '2026-05-20',
    status: 'active',
    submissions: 28,
    totalStudents: 35,
  },
  {
    id: 'assign-2',
    title: 'Quiz Mạng máy tính',
    type: 'quiz',
    classId: 'class-12a1',
    dueDate: '2026-05-18',
    status: 'active',
    submissions: 30,
    totalStudents: 35,
  },
  {
    id: 'assign-3',
    title: 'Ôn tập AI & Machine Learning',
    type: 'lesson',
    classId: 'class-12a2',
    dueDate: '2026-05-22',
    status: 'active',
    submissions: 15,
    totalStudents: 38,
  },
  {
    id: 'assign-4',
    title: 'Đề thi thử số 1',
    type: 'exam',
    classId: 'class-12a1',
    dueDate: '2026-05-25',
    status: 'draft',
    submissions: 0,
    totalStudents: 35,
  },
];

// ============ LAB SUBMISSIONS ============
export interface LabSubmission {
  id: string;
  studentId: string;
  studentName: string;
  labId: string;
  labTitle: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'returned';
  score?: number;
  feedback?: string;
}

export const mockLabSubmissions: LabSubmission[] = [
  {
    id: 'sub-1',
    studentId: 'student-1',
    studentName: 'Trần Minh Quang',
    labId: 'lab-1',
    labTitle: 'Giới thiệu HTML - Tạo trang cá nhân',
    submittedAt: '2026-05-14T10:30:00Z',
    status: 'graded',
    score: 92,
    feedback: 'Tốt lắm! Cấu trúc HTML clean, có sử dụng semantic tags.',
  },
  {
    id: 'sub-2',
    studentId: 'student-2',
    studentName: 'Lê Hoàng Nam',
    labId: 'lab-1',
    labTitle: 'Giới thiệu HTML - Tạo trang cá nhân',
    submittedAt: '2026-05-14T14:20:00Z',
    status: 'graded',
    score: 78,
    feedback: 'Cần cải thiện về semantic HTML. Thêm alt text cho ảnh.',
  },
  {
    id: 'sub-3',
    studentId: 'student-3',
    studentName: 'Phạm Thu Hà',
    labId: 'lab-1',
    labTitle: 'Giới thiệu HTML - Tạo trang cá nhân',
    submittedAt: '2026-05-13T16:45:00Z',
    status: 'graded',
    score: 98,
    feedback: 'Xuất sắc! Giao diện đẹp, code clean, responsive tốt.',
  },
  {
    id: 'sub-4',
    studentId: 'student-4',
    studentName: 'Nguyễn Anh Tuấn',
    labId: 'lab-1',
    labTitle: 'Giới thiệu HTML - Tạo trang cá nhân',
    submittedAt: '2026-05-15T09:15:00Z',
    status: 'pending',
  },
  {
    id: 'sub-5',
    studentId: 'student-5',
    studentName: 'Vũ Thị Mai Phương',
    labId: 'lab-1',
    labTitle: 'Giới thiệu HTML - Tạo trang cá nhân',
    submittedAt: '2026-05-14T11:00:00Z',
    status: 'graded',
    score: 85,
    feedback: 'Tốt, cần chú ý thêm thẻ alt cho hình ảnh.',
  },
];

// ============ TOPIC ANALYTICS ============
export interface TopicAnalytics {
  topic: string;
  classAverage: number;
  studentCount: number;
  masteryDistribution: {
    excellent: number; // 80-100
    good: number;       // 60-79
    developing: number; // 40-59
    beginning: number;  // 0-39
  };
  weakStudentCount: number;
  strongStudentCount: number;
}

export const mockTopicAnalytics: TopicAnalytics[] = [
  {
    topic: 'kiến-trúc-máy-tính',
    classAverage: 82,
    studentCount: 32,
    masteryDistribution: { excellent: 15, good: 12, developing: 4, beginning: 1 },
    weakStudentCount: 5,
    strongStudentCount: 20,
  },
  {
    topic: 'ai-ml',
    classAverage: 68,
    studentCount: 30,
    masteryDistribution: { excellent: 8, good: 12, developing: 7, beginning: 3 },
    weakStudentCount: 10,
    strongStudentCount: 12,
  },
  {
    topic: 'mạng-máy-tính',
    classAverage: 58,
    studentCount: 28,
    masteryDistribution: { excellent: 5, good: 10, developing: 8, beginning: 5 },
    weakStudentCount: 13,
    strongStudentCount: 8,
  },
  {
    topic: 'html-css',
    classAverage: 72,
    studentCount: 30,
    masteryDistribution: { excellent: 12, good: 10, developing: 5, beginning: 3 },
    weakStudentCount: 8,
    strongStudentCount: 15,
  },
  {
    topic: 'đạo-đức-số',
    classAverage: 88,
    studentCount: 33,
    masteryDistribution: { excellent: 22, good: 8, developing: 2, beginning: 1 },
    weakStudentCount: 3,
    strongStudentCount: 25,
  },
  {
    topic: 'thuật-toán',
    classAverage: 65,
    studentCount: 25,
    masteryDistribution: { excellent: 6, good: 11, developing: 5, beginning: 3 },
    weakStudentCount: 8,
    strongStudentCount: 10,
  },
];

// ============ EXAM READINESS ============
export interface ExamReadiness {
  classId: string;
  examDate: string;
  readinessScore: number; // 0-100
  topicsCovered: number;
  totalTopics: number;
  weakAreas: string[];
  strongAreas: string[];
  recommendedActions: string[];
}

export const mockExamReadiness: ExamReadiness[] = [
  {
    classId: 'class-12a1',
    examDate: '2026-06-05',
    readinessScore: 75,
    topicsCovered: 6,
    totalTopics: 8,
    weakAreas: ['TCP/IP Layer 4', 'DNS propagation', 'Deep Learning backpropagation'],
    strongAreas: ['Kiến trúc máy tính', 'Đạo đức số', 'HTML semantics'],
    recommendedActions: [
      'Tổ chức buổi ôn tập về mạng máy tính tuần này',
      'Giao bài tập thêm về TCP vs UDP',
      'Demo DNS resolution process với diagram',
    ],
  },
  {
    classId: 'class-12a2',
    examDate: '2026-06-05',
    readinessScore: 62,
    topicsCovered: 5,
    totalTopics: 8,
    weakAreas: ['Flexbox layout', 'CSS Grid', 'Machine Learning basics'],
    strongAreas: ['Phần mềm hệ thống', 'Đạo đức số'],
    recommendedActions: [
      'Tăng cường thực hành HTML/CSS',
      'Tổ chức workshop về Flexbox và Grid',
      'Giao project nhỏ về responsive layout',
    ],
  },
];

// Helper functions
export function getStudentsByClass(classId: string): StudentProgress[] {
  return mockStudentRoster.filter(s => s.classId === classId);
}

export function getAssignmentsByClass(classId: string): Assignment[] {
  return mockAssignments.filter(a => a.classId === classId);
}

export function getLabSubmissionsByClass(classId: string): LabSubmission[] {
  const classStudents = getStudentsByClass(classId);
  const studentIds = new Set(classStudents.map(s => s.id));
  return mockLabSubmissions.filter(sub => studentIds.has(sub.studentId));
}

export function getClassById(classId: string): ClassData | undefined {
  return mockClasses.find(c => c.id === classId);
}

export function getStudentById(studentId: string): StudentProgress | undefined {
  return mockStudentRoster.find(s => s.id === studentId);
}