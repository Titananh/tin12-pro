// ==========================================
// Course Detail Page - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar, SkillBadge } from '@/components/ui/Components';
import { courses as allCourses } from '@/content/courses';
import { lessons as allLessons } from '@/content/lessons';

const moduleColors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = allCourses.find((c) => c.slug === slug);
  const courseLessons = allLessons.filter((l) => l.courseId === course?.id);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Khóa học không tìm thấy</h1>
          <Link href="/courses"><Button variant="primary">Quay lại danh sách</Button></Link>
        </div>
      </div>
    );
  }

  const completedLessons = courseLessons.filter((l) => l.id.startsWith('lesson-1')).length; // Mock
  const progress = courseLessons.length > 0 ? (completedLessons / courseLessons.length) * 100 : 0;

  // Group lessons by moduleId
  const modules = courseLessons.reduce((acc, lesson) => {
    if (!acc[lesson.moduleId]) acc[lesson.moduleId] = [];
    acc[lesson.moduleId].push(lesson);
    return acc;
  }, {} as Record<string, typeof courseLessons>);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Course Header */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${course.color}30 0%, ${course.color}10 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại khóa học
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{course.icon}</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                  {course.track === 'cs' ? 'Computer Science' : course.track === 'ict' ? 'ICT' : 'General'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-lg text-slate-300 mb-6 max-w-2xl">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {courseLessons.length} bài học
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.estimatedHours} giờ
                </div>
                <div className="flex items-center gap-2">
                  <SkillBadge variant={course.difficulty === 'easy' ? 'mastered' : course.difficulty === 'hard' ? 'weak' : 'default'}>
                    {course.difficulty === 'easy' ? 'Dễ' : course.difficulty === 'hard' ? 'Khó' : 'Trung bình'}
                  </SkillBadge>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <Card className="w-full lg:w-80 p-6">
              <div className="text-sm text-slate-400 mb-2">Tiến độ khóa học</div>
              <div className="text-3xl font-bold text-white mb-4">{Math.round(progress)}%</div>
              <ProgressBar value={progress} size="lg" />
              <div className="mt-4 text-sm text-slate-400">
                {completedLessons}/{courseLessons.length} bài đã hoàn thành
              </div>
              <Button variant="primary" className="w-full mt-6">
                {progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white">Nội dung khóa học</h2>
            
            {Object.entries(modules).map(([moduleId, moduleLessons], moduleIndex) => (
              <Card key={moduleId} className="p-0 overflow-hidden">
                <div 
                  className="p-4 flex items-center gap-3"
                  style={{ backgroundColor: `${moduleColors[moduleIndex % moduleColors.length]}10` }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: moduleColors[moduleIndex % moduleColors.length] }}
                  >
                    {moduleIndex + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Module {moduleIndex + 1}</h3>
                    <p className="text-sm text-slate-400">{moduleLessons.length} bài học</p>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {moduleLessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.slug}/${lesson.slug}`}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                        {lessonIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">{lesson.title}</div>
                        <div className="text-sm text-slate-400">{lesson.estimatedMinutes} phút</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <SkillBadge size="sm">
                          {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'hard' ? 'Khó' : 'TB'}
                        </SkillBadge>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What you'll learn */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Bạn sẽ học được gì?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">Kiến thức nền tảng vững chắc</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">Kỹ năng thực hành</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">Luyện thi hiệu quả</span>
                </li>
              </ul>
            </Card>

            {/* Related */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Liên quan</h3>
              <div className="space-y-3">
                <Link href="/quiz" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Làm Quiz</div>
                  <div className="text-xs text-slate-400">Kiểm tra kiến thức đã học</div>
                </Link>
                <Link href="/labs" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Labs</div>
                  <div className="text-xs text-slate-400">Thực hành lập trình</div>
                </Link>
                <Link href="/flashcards" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Flashcards</div>
                  <div className="text-xs text-slate-400">Ôn tập với Spaced Repetition</div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}