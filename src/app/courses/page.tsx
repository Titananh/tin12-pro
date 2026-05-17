// ==========================================
// Courses Page - Tin12 Pro Cánh Diều
// Premium course listing with hero and track filters
// ==========================================

'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui';
import { courses } from '@/content/courses';

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconClock = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLayers = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative mb-10 p-8 bg-gradient-to-br from-blue-600/5 via-violet-600/5 to-transparent rounded-3xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <IconBook />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Khóa học</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl text-sm sm:text-base">
            Chọn khóa học phù hợp với mục tiêu của bạn. Mỗi khóa được thiết kế bám sát chương trình Tin học 12 Cánh Diều.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <IconLayers />
              {courses.length} khóa
            </span>
            <span className="flex items-center gap-1.5">
              <IconBook />
              {courses.reduce((acc, c) => acc + (c.modules?.length || 0), 0)} bài
            </span>
          </div>
        </div>
      </div>

      {/* Track Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium whitespace-nowrap">
          Tất cả
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Computer Science
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          ICT
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          General
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(course => (
          <Link key={course.id} href={`/courses/${course.slug}`}>
            <div className="group h-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                  style={{ backgroundColor: `${course.color}20` }}
                >
                  {course.icon}
                </div>
                <Badge
                  variant={
                    course.difficulty === 'easy' ? 'emerald' :
                    course.difficulty === 'medium' ? 'amber' :
                    'red'
                  }
                >
                  {course.difficulty === 'easy' ? 'Dễ' :
                   course.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 py-4 border-t border-slate-100 dark:border-slate-700">
                <span className="flex items-center gap-1.5">
                  <IconClock />
                  {course.estimatedHours} giờ
                </span>
                <span className="flex items-center gap-1.5">
                  <IconLayers />
                  {course.modules?.length || 'Nhiều'} bài
                </span>
              </div>

              <div className="mt-1">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
                  Xem chi tiết <IconArrowRight />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
