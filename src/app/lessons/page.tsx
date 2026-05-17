// ==========================================
// Lessons Page - Tin12 Pro Cánh Diều
// Premium lesson listing with hero header
// ==========================================

'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui';
import { lessons } from '@/content/lessons';
import { getCourseById } from '@/content/courses';

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

const IconTarget = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function LessonsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative mb-10 p-8 bg-gradient-to-br from-blue-600/5 via-violet-600/5 to-transparent rounded-3xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <IconBook />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Bài học</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl text-sm sm:text-base">
            Tất cả bài học theo chương trình Tin học 12 Cánh Diều. Mỗi bài có mục tiêu, lý thuyết và kiểm tra nhanh.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <IconBook />
              {lessons.length} bài
            </span>
            <span className="flex items-center gap-1.5">
              <IconClock />
              {Math.round(lessons.reduce((acc, l) => acc + (l.estimatedMinutes || 0), 0) / 60)} giờ học
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
          Nền tảng
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Mạng & Internet
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Cơ sở dữ liệu
        </button>
        <button className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Lập trình Web
        </button>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {lessons.map((lesson, index) => {
          const course = getCourseById(lesson.courseId);
          return (
            <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
              <div className="group h-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <Badge
                        size="sm"
                        variant={
                          lesson.difficulty === 'easy' ? 'emerald' :
                          lesson.difficulty === 'medium' ? 'amber' : 'red'
                        }
                      >
                        {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'medium' ? 'TB' : 'Khó'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <IconClock />
                        {lesson.estimatedMinutes} phút
                      </span>
                      <span className="flex items-center gap-1">
                        <IconTarget />
                        {lesson.content?.learningObjectives?.length || 0} mục tiêu
                      </span>
                      {course && (
                        <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
                          {course.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    Học bài <IconArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
