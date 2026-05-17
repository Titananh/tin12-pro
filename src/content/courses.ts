// ==========================================
// Courses Seed Data - Tin12 Pro Cánh Diều
// ==========================================
import { Course } from '@/lib/types';

export const courses: Course[] = [
  {
    id: 'course-1',
    slug: 'nen-tang-chung',
    title: 'Nền tảng Tin học 12',
    description: 'Khóa học tổng quan giúp học sinh nắm vững kiến thức nền tảng Tin học 12 theo chương trình Cánh Diều. Phù hợp cho học sinh cần xây dựng base vững chắc.',
    icon: 'GEN',
    track: 'general',
    difficulty: 'medium',
    color: '#2563EB',
    estimatedHours: 40,
    modules: []
  },
  {
    id: 'course-2',
    slug: 'ai-va-xa-hoi-tri-thuc',
    title: 'AI và Xã hội Tri thức',
    description: 'Khám phá trí tuệ nhân tạo, học máy, và tác động của công nghệ đến xã hội. Phần quan trọng trong đề thi tốt nghiệp THPT.',
    icon: 'AI',
    track: 'cs',
    difficulty: 'medium',
    color: '#7C3AED',
    estimatedHours: 25,
    modules: []
  },
  {
    id: 'course-3',
    slug: 'mang-may-tinh',
    title: 'Mạng máy tính và Internet',
    description: 'Từ cơ bản đến nâng cao về mạng LAN, WAN, giao thức TCP/IP, và an toàn mạng. Kiến thức thiết yếu cho học sinh theo nhánh CS.',
    icon: 'LAN',
    track: 'cs',
    difficulty: 'medium',
    color: '#06B6D4',
    estimatedHours: 20,
    modules: []
  },
  {
    id: 'course-4',
    slug: 'html-css-web',
    title: 'HTML/CSS và Xây dựng Web',
    description: 'Học cách tạo website từ cơ bản đến nâng cao. Phù hợp cho nhánh ICT và học sinh muốn theo hướng phát triển web.',
    icon: 'WEB',
    track: 'ict',
    difficulty: 'easy',
    color: '#10B981',
    estimatedHours: 30,
    modules: []
  },
  {
    id: 'course-5',
    slug: 'luyen-thi-thpt',
    title: 'Luyện thi Tốt nghiệp THPT',
    description: 'Khóa luyện thi chuyên sâu với đề thi mẫu, phân tích điểm yếu, và chiến lược làm bài. Giúp học sinh tự tin đạt điểm cao.',
    icon: 'TN',
    track: 'general',
    difficulty: 'hard',
    color: '#F59E0B',
    estimatedHours: 50,
    modules: []
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}
