// ==========================================
// Lesson Detail Page - Tin12 Pro Cánh Diều
// Premium readable article experience with side rail
// ==========================================

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { lessons } from '@/content/lessons';
import { getCourseById } from '@/content/courses';

const IconArrowLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLightbulb = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
);

const IconDocument = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconBookmark = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
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

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconSparkle = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a3.375 3.375 0 00-2.455-2.456L12.75 18l1.183-.394a3.375 3.375 0 002.455-2.456L16.5 14.25l.394 1.183a3.375 3.375 0 002.456 2.456L21.75 18l-1.183.394a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

export default function LessonSlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = lessons.find(l => l.slug === slug);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Khong tim thay bai hoc
        </h1>
        <Link href="/lessons" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <IconArrowLeft /> Quay lai danh sach bai hoc
        </Link>
      </div>
    );
  }

  const course = getCourseById(lesson.courseId);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <IconArrowLeft />
          Tat ca bai hoc
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <span>{course?.title}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <Badge
                size="sm"
                variant={
                  lesson.difficulty === 'easy' ? 'emerald' :
                  lesson.difficulty === 'medium' ? 'amber' : 'red'
                }
              >
                {lesson.difficulty}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <IconTarget />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Muc tieu hoc tap</h2>
            </div>
            <ul className="space-y-3">
              {lesson.content?.learningObjectives?.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      <IconCheck />
                    </span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explain Like New */}
          {lesson.content?.explainLikeNew && (
            <div className="bg-gradient-to-br from-violet-50/50 to-blue-50/50 dark:from-violet-900/10 dark:to-blue-900/10 border border-violet-200/50 dark:border-violet-800/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                  <IconLightbulb />
                </div>
                <h2 className="text-lg font-semibold text-violet-900 dark:text-violet-100">Hieu nhanh</h2>
              </div>
              <p className="text-violet-800 dark:text-violet-200 leading-relaxed">
                {lesson.content.explainLikeNew}
              </p>
            </div>
          )}

          {/* Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <IconDocument />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ly thuyet</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-base">
                {lesson.content?.theory}
              </p>
            </div>
          </div>

          {/* Deep Dive */}
          {lesson.content?.deepDive && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <IconBookmark />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sau hon</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-base">
                {lesson.content.deepDive}
              </p>
            </div>
          )}

          {/* Quick Check */}
          {lesson.content?.quickCheck?.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <IconSparkle />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Kiem tra nhanh</h2>
              </div>
              <div className="space-y-4">
                {lesson.content.quickCheck.map((qc, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <p className="font-medium text-slate-900 dark:text-white mb-4 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      {qc.question}
                    </p>
                    {qc.options && (
                      <div className="space-y-2.5 ml-10">
                        {qc.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-300">
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
            </div>
          )}

          {/* 60-Second Summary */}
          {lesson.content?.sixtySecondSummary && (
            <div className="bg-gradient-to-r from-blue-50/50 to-violet-50/50 dark:from-blue-900/10 dark:to-violet-900/10 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <IconBookmark />
                </div>
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Tom tat 60 giay</h2>
              </div>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {lesson.content.sixtySecondSummary}
              </p>
            </div>
          )}

          {/* Next Action */}
          <div className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/10 dark:to-blue-900/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                  <IconPlay />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Buoc tiep theo</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Lam bai quiz de cuong cu kiến thức</p>
                </div>
              </div>
              <Link href="/quiz" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
                Lam quiz <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Side Rail */}
        <div className="lg:col-span-1 space-y-5">
          {/* Key Terms */}
          {lesson.content?.keyTerms && lesson.content.keyTerms.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                  <IconBookmark />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Thuật ngữ</h3>
              </div>
              <div className="space-y-3">
                {lesson.content.keyTerms.map((term: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{term}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Corner */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <IconSparkle />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">De thi</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              On thi tot nghiep voi de thi manh
            </p>
            <Link href="/exams" className="block text-center py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Thi thu ngay
            </Link>
          </div>

          {/* Related Lessons */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <IconBook />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Bai lien quan</h3>
            </div>
            <div className="space-y-2.5">
              {lessons.slice(0, 3).filter(l => l.slug !== slug).map(l => (
                <Link key={l.slug} href={`/lessons/${l.slug}`} className="block p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-1">{l.title}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{l.estimatedMinutes} phut</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
