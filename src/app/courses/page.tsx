// ==========================================
// Courses Page - Tin12 Pro Cánh Diều
// Course listing with all available courses
// ==========================================

'use client';

import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { courses } from '@/content/courses';

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Khóa học
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Chọn khóa học phù hợp với mục tiêu của bạn
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link key={course.id} href={`/courses/${course.slug}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
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
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {course.estimatedHours} giờ
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {course.modules.length || 'Nhiều'} bài
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Button variant="ghost" className="w-full justify-center">
                  Xem chi tiết
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}