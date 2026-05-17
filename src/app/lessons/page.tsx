// ==========================================
// Lessons Page - Tin12 Pro Cánh Diều
// Lesson listing and detail pages
// ==========================================

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { lessons } from '@/content/lessons';
import { getCourseById } from '@/content/courses';

export default function LessonsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Bài học
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Tất cả bài học theo chương trình Tin học 12 Cánh Diều
        </p>
      </div>

      {/* Lessons List */}
      <div className="grid md:grid-cols-2 gap-4">
        {lessons.map((lesson, index) => (
          <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
            <Card hover className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-900 dark:text-white truncate">
                      {lesson.title}
                    </h3>
                    <Badge size="sm" variant={
                      lesson.difficulty === 'easy' ? 'emerald' :
                      lesson.difficulty === 'medium' ? 'amber' : 'red'
                    }>
                      {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'medium' ? 'TB' : 'Khó'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 dark:text-slate-500">
                    <span>{lesson.estimatedMinutes} phút</span>
                    <span>{lesson.content.learningObjectives.length} mục tiêu</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LessonDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = lessons.find(l => l.slug === slug);
  
  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Không tìm thấy bài học
        </h1>
        <Link href="/lessons" className="text-blue-600 hover:text-blue-700">
          ← Quay lại danh sách bài học
        </Link>
      </div>
    );
  }

  const course = getCourseById(lesson.courseId);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tất cả bài học
      </Link>

      <Card className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <span>{course?.title}</span>
          <span>•</span>
          <Badge size="sm" variant={
            lesson.difficulty === 'easy' ? 'emerald' :
            lesson.difficulty === 'medium' ? 'amber' : 'red'
          }>
            {lesson.difficulty}
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {lesson.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          {lesson.description}
        </p>
      </Card>

      {/* Learning Objectives */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Mục tiêu học tập
        </h2>
        <ul className="space-y-2">
          {lesson.content.learningObjectives.map((obj, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-700 dark:text-slate-200">{obj}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Main Content */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Lý thuyết
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>{lesson.content.theory}</p>
        </div>
      </Card>

      {/* Quick Check */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Kiểm tra nhanh
        </h2>
        <div className="space-y-4">
          {lesson.content.quickCheck.map((qc, index) => (
            <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="font-medium text-slate-900 dark:text-white mb-3">
                {index + 1}. {qc.question}
              </p>
              {qc.options && (
                <div className="space-y-2">
                  {qc.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 60-Second Summary */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          📝 Tóm tắt 60 giây
        </h2>
        <p className="text-blue-800 dark:text-blue-200">
          {lesson.content.sixtySecondSummary}
        </p>
      </Card>
    </div>
  );
}