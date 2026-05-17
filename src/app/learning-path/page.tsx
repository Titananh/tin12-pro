// ==========================================
// Learning Path Page - Tin12 Pro Cánh Diều
// Premium personalized learning path with timeline
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge, Progress } from '@/components/ui';
import { mockLearningPaths, type LearningPathGoal, type LearningPath } from '@/content/demo';

const GOAL_LABELS: Record<LearningPathGoal, string> = {
  recover: 'Mat goc - Nen tang lai',
  exam: 'Luyen thi Tot nghiep',
  cs: 'CNTT - Chuyen sau',
};

const DURATION_LABELS = {
  30: '30 ngay',
  60: '60 ngay',
  90: '90 ngay',
};

const WEEK_TYPE_COLORS = {
  lesson: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  practice: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  lab: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  exam: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  review: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
};

const IconBook = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconQuiz = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const IconLab = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.155.659 1.591l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23a2.25 2.25 0 00.659-1.591V3.104m-9 5.714v5.714a2.25 2.25 0 01.659 1.591l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23a2.25 2.25 0 00.659-1.591V3.104a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L5 14.5m9.75-3.104c.251.023.501.05.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597-.237 1.155-.659 1.591l-2.23 2.23a2.25 2.25 0 01-2.659 0l-2.23-2.23a2.25 2.25 0 00-.659-1.591V3.104a24.301 24.301 0 00-4.5 0m0 0l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23" />
  </svg>
);

const IconExam = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75c0 .422-.183.81-.477 1.122l-.855.855c-.877.982-1.52 2.11-1.52 3.378v.75c0 1.268.643 2.396 1.52 3.378l.855.855c.3.3.477.7.477 1.122v.75c0 .422.183.81.477 1.122l.855.855c.877.982 1.52 2.11 1.52 3.378v.75c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75a2.25 2.25 0 01-.659 1.591l-4.655 3.385a2.25 2.25 0 01-2.659 0l-4.655-3.385A2.25 2.25 0 013 19.5v-.75c0-.422.183-.81.477-1.122l.855-.855C4.643 16.396 5 15.268 5 14v-.75c0-.422.183-.81.477-1.122l.855-.855C7.357 11.063 8 9.935 8 8.622v-.75c0-.422-.183-.81-.477-1.122l-.855-.855C6.643 5.936 6 4.808 6 3.5v-.75c0-.422.183-.81.477-1.122l.855-.855C8.643 1.004 7.5 1 7.5 1H4.5C3.12 1 2 2.12 2 3.5v.75c0 .422.183.81.477 1.122l.855.855C3.357 6.063 4 7.191 4 8.5v.75c0 .422-.183.81-.477 1.122l-.855.855C2.643 11.396 2 12.524 2 13.875v.75" />
  </svg>
);

const IconRefresh = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12.75 3a48 48 0 013.374 8.284" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconLightbulb = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
);

const IconMap = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .426.24.817.622 1.006l4.875 2.437c.317.159.69.159 1.006 0l3.869-1.934c.317-.159.69-.159 1.006 0l3.869 1.934c.317.159.69.159 1.006 0l4.875-2.437c.381-.19.622-.58.622-1.006V6.695c0-.426-.24-.817-.622-1.006l-3.869-1.934z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const GOAL_ICONS: Record<LearningPathGoal, string> = {
  recover: 'R',
  exam: 'T',
  cs: 'C',
};

export default function LearningPathPage() {
  const [selectedGoal, setSelectedGoal] = useState<LearningPathGoal>('exam');
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(60);
  const [activePath, setActivePath] = useState<LearningPath | null>(null);

  const paths = mockLearningPaths[selectedGoal];
  const currentPath = paths.find(p => p.duration === selectedDuration) || paths[0];
  const displayPath = activePath || currentPath;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <IconMap />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Lo trinh hoc tap</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              Ca nhan hoa theo muc tieu cua ban
            </p>
          </div>
        </div>
      </div>

      {/* Goal Selection */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Muc tieu cua ban</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(GOAL_LABELS) as LearningPathGoal[]).map((goal) => (
            <button
              key={goal}
              onClick={() => { setSelectedGoal(goal); setActivePath(null); }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedGoal === goal
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                  selectedGoal === goal
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {GOAL_ICONS[goal]}
                </span>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{GOAL_LABELS[goal]}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pl-[3.25rem]">
                {goal === 'recover' && 'Can cua co ban'}
                {goal === 'exam' && 'Thi TN THPT 2026'}
                {goal === 'cs' && 'Khoa hoc may tinh'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Thoi luong:</span>
        <div className="flex gap-2">
          {([30, 60, 90] as const).map((duration) => {
            const hasPath = paths.some(p => p.duration === duration);
            return (
              <button
                key={duration}
                onClick={() => { setSelectedDuration(duration); setActivePath(null); }}
                disabled={!hasPath}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  selectedDuration === duration
                    ? 'bg-blue-600 text-white'
                    : hasPath
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 cursor-not-allowed'
                }`}
              >
                {DURATION_LABELS[duration]}
                {!hasPath && ' (sap ra mat)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Path Overview */}
      <div className="bg-gradient-to-r from-blue-600/5 to-violet-600/5 border border-blue-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                selectedGoal === 'recover' ? 'bg-amber-500 text-white' :
                selectedGoal === 'exam' ? 'bg-blue-600 text-white' :
                'bg-emerald-500 text-white'
              }`}>
                {GOAL_ICONS[selectedGoal]}
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Lo trinh {DURATION_LABELS[displayPath.duration]}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  {displayPath.duration === 30 && 'Tap trung trong tam'}
                  {displayPath.duration === 60 && 'Can bang ly thuyet va thuc hanh'}
                  {displayPath.duration === 90 && 'Chuan bi toan dien'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{displayPath.progress}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Hoan thanh</p>
          </div>
        </div>
        <Progress value={displayPath.progress} size="md" color="blue" className="mt-4" />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Tuan hien tai: <span className="font-semibold text-slate-700 dark:text-slate-200">Tuan {displayPath.currentWeek}</span> / {displayPath.milestones.length} tuan
          </span>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
            Tiep tuc hoc <IconArrowRight />
          </Link>
        </div>
      </div>

      {/* Weekly Milestones */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-600 dark:text-slate-400">
            <IconMap />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Lo trinh theo tuan</h2>
        </div>
        <div className="space-y-4">
          {displayPath.milestones.map((milestone, index) => {
            const isCompleted = index < displayPath.currentWeek - 1;
            const isCurrent = index === displayPath.currentWeek - 1;

            return (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== displayPath.milestones.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                )}

                {/* Content */}
                <div
                  className={`relative flex gap-4 p-4 rounded-xl ${
                    isCurrent
                      ? 'bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800/50'
                      : isCompleted
                      ? 'bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/30'
                      : 'bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-700/50'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 -mt-1 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-800/50'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}>
                    {isCompleted ? <IconCheck /> : <span className="text-xs font-bold">{index + 1}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          Tuan {milestone.week}: {milestone.focus}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Muc tieu: {milestone.targetMastery}%
                        </p>
                      </div>
                      {isCurrent && <Badge variant="blue" size="sm">Hien tai</Badge>}
                      {isCompleted && <Badge variant="emerald" size="sm">Xong</Badge>}
                    </div>

                    {/* Activities */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {milestone.lessons.length > 0 && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.lesson}`}>
                          <IconBook /> {milestone.lessons.length} bai
                        </span>
                      )}
                      {milestone.practice.length > 0 && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.practice}`}>
                          <IconQuiz /> {milestone.practice.length} bai tap
                        </span>
                      )}
                      {milestone.labs && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.lab}`}>
                          <IconLab /> Lab
                        </span>
                      )}
                      {milestone.exam && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.exam}`}>
                          <IconExam /> Thi thu
                        </span>
                      )}
                      {!milestone.lessons.length && !milestone.practice.length && !milestone.labs && !milestone.exam && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.review}`}>
                          <IconRefresh /> On tap
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 flex-shrink-0">
            <IconLightbulb />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Meo hoc hieu qua</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>- Hoc deu deu moi ngay 30-60 phut thay vi hoc don mot lan</li>
              <li>- Sau moi tuan, on lai kien thuc tuan truoc</li>
              <li>- Lam flashcards sau moi bai hoc de ghi nho tot hon</li>
              <li>- Ket hop ly thuyet va thuc hanh (quiz/lab)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
