// ==========================================
// Learning Path Page - Tin12 Pro Cánh Diều
// 30/60/90 day personalized learning paths
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Progress } from '@/components/ui';
import { mockLearningPaths, type LearningPathGoal, type LearningPath } from '@/content/demo';

const GOAL_LABELS: Record<LearningPathGoal, string> = {
  recover: '🎯 Mất gốc - Nền tảng lại',
  exam: '📚 Luyện thi Tốt nghiệp',
  cs: '💻 CNTT - Chuyên sâu',
};

const DURATION_LABELS = {
  30: '30 ngày',
  60: '60 ngày',
  90: '90 ngày',
};

const WEEK_TYPE_COLORS = {
  lesson: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  practice: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  lab: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  exam: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  review: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
};

export default function LearningPathPage() {
  const [selectedGoal, setSelectedGoal] = useState<LearningPathGoal>('exam');
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(60);
  const [activePath, setActivePath] = useState<LearningPath | null>(null);

  // Find matching path
  const paths = mockLearningPaths[selectedGoal];
  const currentPath = paths.find(p => p.duration === selectedDuration) || paths[0];
  const displayPath = activePath || currentPath;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          🗺️ Lộ trình học tập cá nhân hóa
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Chọn lộ trình phù hợp với mục tiêu của bạn: lấy lại gốc, luyện thi, hoặc chuyên sâu CNTT
        </p>
      </div>

      {/* Goal Selection */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Mục tiêu của bạn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(GOAL_LABELS) as LearningPathGoal[]).map((goal) => (
            <button
              key={goal}
              onClick={() => {
                setSelectedGoal(goal);
                setActivePath(null);
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedGoal === goal
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <p className="font-semibold text-slate-900 dark:text-white">{GOAL_LABELS[goal]}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {goal === 'recover' && 'Dành cho bạn cần củng cố kiến thức cơ bản'}
                {goal === 'exam' && 'Chuẩn bị cho kỳ thi Tốt nghiệp THPT 2026'}
                {goal === 'cs' && 'Định hướng Khoa học Máy tính và lập trình'}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* Duration Selection */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Thời lượng:</span>
        <div className="flex gap-2">
          {([30, 60, 90] as const).map((duration) => {
            const hasPath = paths.some(p => p.duration === duration);
            return (
              <button
                key={duration}
                onClick={() => {
                  setSelectedDuration(duration);
                  setActivePath(null);
                }}
                disabled={!hasPath}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDuration === duration
                    ? 'bg-blue-600 text-white'
                    : hasPath
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 cursor-not-allowed'
                }`}
              >
                {DURATION_LABELS[duration]}
                {!hasPath && ' (sắp ra mắt)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Path Overview */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600/10 to-violet-600/10 border-blue-500/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {selectedGoal === 'recover' ? '🎯' : selectedGoal === 'exam' ? '📚' : '💻'}
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Lộ trình {DURATION_LABELS[displayPath.duration]} - {GOAL_LABELS[selectedGoal].split(' ')[0]}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {displayPath.duration === 30 && 'Phù hợp khi bạn có thời gian hạn chế và cần tập trung vào trọng tâm'}
                  {displayPath.duration === 60 && 'Cân bằng giữa học lý thuyết và thực hành, ôn tập đều đặn'}
                  {displayPath.duration === 90 && 'Học kỹ từng chủ đề, ôn luyện sâu, chuẩn bị toàn diện cho kỳ thi'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{displayPath.progress}%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Hoàn thành</p>
          </div>
        </div>
        <Progress value={displayPath.progress} size="md" color="blue" className="mt-4" />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Tuần hiện tại: <span className="font-semibold text-slate-700 dark:text-slate-200">Tuần {displayPath.currentWeek}</span> / {displayPath.milestones.length} tuần
          </span>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Tiếp tục học →
          </Link>
        </div>
      </Card>

      {/* Weekly Milestones */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📅 Lộ trình theo tuần
        </h2>
        <div className="space-y-4">
          {displayPath.milestones.map((milestone, index) => {
            const isCompleted = index < displayPath.currentWeek - 1;
            const isCurrent = index === displayPath.currentWeek - 1;

            return (
              <div
                key={index}
                className={`relative pl-8 pb-6 ${
                  index !== displayPath.milestones.length - 1
                    ? 'border-l-2 border-slate-200 dark:border-slate-700'
                    : 'border-l-2 border-transparent'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center -translate-x-[13px] ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-800'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`p-4 rounded-xl ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                      : isCompleted
                      ? 'bg-slate-50 dark:bg-slate-900/50'
                      : 'bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Tuần {milestone.week}: {milestone.focus}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Mục tiêu mastery: {milestone.targetMastery}%
                      </p>
                    </div>
                    {isCurrent && (
                      <Badge variant="blue">Hiện tại</Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="emerald">Hoàn thành</Badge>
                    )}
                  </div>

                  {/* Activities */}
                  <div className="flex flex-wrap gap-2">
                    {milestone.lessons.length > 0 && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.lesson}`}>
                        📖 {milestone.lessons.length} bài học
                      </span>
                    )}
                    {milestone.practice.length > 0 && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.practice}`}>
                        ✏️ {milestone.practice.length} bài tập
                      </span>
                    )}
                    {milestone.labs && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.lab}`}>
                        🔬 Lab
                      </span>
                    )}
                    {milestone.exam && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.exam}`}>
                        📝 Thi thử
                      </span>
                    )}
                    {!milestone.lessons.length && !milestone.practice.length && !milestone.labs && !milestone.exam && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${WEEK_TYPE_COLORS.review}`}>
                        🔄 Ôn tập
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tips */}
      <Card className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Mẹo học hiệu quả</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• Học đều đặn mỗi ngày 30-60 phút thay vì học dồn một lần</li>
              <li>• Sau mỗi tuần, ôn lại kiến thức tuần trước trước khi học tuần mới</li>
              <li>• Làm flashcards sau mỗi bài học để ghi nhớ tốt hơn</li>
              <li>• Kết hợp lý thuyết với thực hành (quiz/lab) để củng cố</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}