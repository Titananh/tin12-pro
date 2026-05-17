// ==========================================
// Course Detail Page - Tin12 Pro Cánh Diều
// Premium course page with module timeline
// ==========================================

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ProgressBar, SkillBadge } from '@/components/ui/Components';
import { courses as allCourses } from '@/content/courses';
import { lessons as allLessons } from '@/content/lessons';

const moduleColors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

const IconArrowLeft = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconClock = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconPlay = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

const IconChevronRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

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

  const completedLessons = courseLessons.filter((l) => l.id.startsWith('lesson-1')).length;
  const progress = courseLessons.length > 0 ? (completedLessons / courseLessons.length) * 100 : 0;

  const modules = courseLessons.reduce((acc, lesson) => {
    if (!acc[lesson.moduleId]) acc[lesson.moduleId] = [];
    acc[lesson.moduleId].push(lesson);
    return acc;
  }, {} as Record<string, typeof courseLessons>);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Course Header */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${course.color}20 0%, ${course.color}08 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <IconArrowLeft />
            Quay lại khóa học
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl">{course.icon}</span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                  {course.track === 'cs' ? 'Computer Science' : course.track === 'ict' ? 'ICT' : 'General'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-base text-slate-300 mb-8 max-w-2xl leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <IconBook />
                  </div>
                  <span>{courseLessons.length} bài học</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <IconClock />
                  </div>
                  <span>{course.estimatedHours} giờ</span>
                </div>
                <div className="flex items-center gap-2">
                  <SkillBadge variant={course.difficulty === 'easy' ? 'mastered' : course.difficulty === 'hard' ? 'weak' : 'default'}>
                    {course.difficulty === 'easy' ? 'Dễ' : course.difficulty === 'hard' ? 'Khó' : 'Trung bình'}
                  </SkillBadge>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="w-full lg:w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-sm text-slate-400 mb-2">Tiến độ khóa học</div>
              <div className="text-4xl font-bold text-white mb-4">{Math.round(progress)}%</div>
              <ProgressBar value={progress} size="lg" />
              <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                <span>{completedLessons}/{courseLessons.length} bài đã hoàn thành</span>
              </div>
              <Button variant="primary" className="w-full mt-6">
                {progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-xl font-bold text-white">Nội dung khóa học</h2>

            {Object.entries(modules).map(([moduleId, moduleLessons], moduleIndex) => (
              <div key={moduleId} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div
                  className="p-5 flex items-center gap-4"
                  style={{ backgroundColor: `${moduleColors[moduleIndex % moduleColors.length]}15` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: moduleColors[moduleIndex % moduleColors.length] }}
                  >
                    {moduleIndex + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Module {moduleIndex + 1}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{moduleLessons.length} bài học</p>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {moduleLessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.slug}/${lesson.slug}`}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors font-medium">
                        {lessonIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">{lesson.title}</div>
                        <div className="text-sm text-slate-400 mt-0.5 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <IconClock />
                            {lesson.estimatedMinutes} phút
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span>{lesson.content.learningObjectives?.length || 0} mục tiêu</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <SkillBadge size="sm">
                          {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'hard' ? 'Khó' : 'TB'}
                        </SkillBadge>
                        <IconChevronRight />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* What you'll learn */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-5">Bạn sẽ học được gì?</h3>
              <ul className="space-y-3.5">
                {[
                  'Kiến thức nền tảng vững chắc',
                  'Kỹ năng thực hành',
                  'Luyện thi hiệu quả',
                  'Project thực tế',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconCheck />
                    </div>
                    <span className="text-sm text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Liên quan</h3>
              <div className="space-y-2.5">
                <Link href="/quiz" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <IconPlay />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">Làm Quiz</div>
                    <div className="text-xs text-slate-400">Kiểm tra kiến thức</div>
                  </div>
                </Link>
                <Link href="/labs" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <IconPlay />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">Labs</div>
                    <div className="text-xs text-slate-400">Thực hành lập trình</div>
                  </div>
                </Link>
                <Link href="/flashcards" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
                    <IconPlay />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">Flashcards</div>
                    <div className="text-xs text-slate-400">Spaced Repetition</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
