// ==========================================
// Mistakes Page - Tin12 Pro Cánh Diều
// Mistake bank grouped by topic/error type
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { mockMistakes, type MistakeEntry } from '@/content/demo';

const TOPIC_COLORS: Record<string, string> = {
  'Mạng máy tính': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'Kiến trúc máy tính': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  'AI & Machine Learning': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  'HTML/CSS': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
};

const ERROR_TYPE_LABELS: Record<string, string> = {
  concept: 'Nhầm khái niệm',
  calculation: 'Tính toán',
  terminology: 'Thuật ngữ',
  application: 'Ứng dụng',
};

const ERROR_TYPE_COLORS: Record<string, string> = {
  concept: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  calculation: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  terminology: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  application: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
};

type FilterType = 'all' | 'concept' | 'calculation' | 'terminology' | 'application';
type GroupByType = 'topic' | 'errorType' | 'date';

export default function MistakesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [groupBy, setGroupBy] = useState<GroupByType>('topic');
  const [selectedMistake, setSelectedMistake] = useState<MistakeEntry | null>(null);

  // Filter mistakes
  const filteredMistakes = filter === 'all'
    ? mockMistakes
    : mockMistakes.filter(m => m.errorType === filter);

  // Group mistakes
  const groupedMistakes = filteredMistakes.reduce((acc, mistake) => {
    let key: string;
    if (groupBy === 'topic') key = mistake.topic;
    else if (groupBy === 'errorType') key = mistake.errorType;
    else key = mistake.date;

    if (!acc[key]) acc[key] = [];
    acc[key].push(mistake);
    return acc;
  }, {} as Record<string, MistakeEntry[]>);

  // Stats
  const totalMistakes = mockMistakes.length;
  const conceptMistakes = mockMistakes.filter(m => m.errorType === 'concept').length;
  const repeatMistakes = mockMistakes.filter(m => m.timesWrong > 1).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          📝 Ngân hàng câu sai
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Ôn lại những câu đã sai để không mắc lại. Mỗi câu sai là một cơ hội học hỏi!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tổng câu sai</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{conceptMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Nhầm khái niệm</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{repeatMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sai nhiều lần</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Lọc theo:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Tất cả
              </button>
              {(Object.keys(ERROR_TYPE_LABELS) as FilterType[]).filter(t => t !== 'all').map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {ERROR_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1" />
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Nhóm theo:</label>
            <div className="flex gap-2">
              {(['topic', 'errorType', 'date'] as GroupByType[]).map(gb => (
                <button
                  key={gb}
                  onClick={() => setGroupBy(gb)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    groupBy === gb
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {gb === 'topic' && '📚 Chủ đề'}
                  {gb === 'errorType' && '❌ Loại lỗi'}
                  {gb === 'date' && '📅 Ngày'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Practice Button */}
      <Card className="mb-6 bg-gradient-to-r from-violet-600/10 to-blue-600/10 border-violet-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              📋 Luyện tập với câu sai
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Thực hành lại {filteredMistakes.length} câu đã lọc để củng cố kiến thức
            </p>
          </div>
          <Button variant="primary" size="md">
            Bắt đầu luyện tập
          </Button>
        </div>
      </Card>

      {/* Mistake List */}
      <div className="space-y-4">
        {Object.entries(groupedMistakes).map(([group, mistakes]) => (
          <Card key={group}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                {groupBy === 'topic' && TOPIC_COLORS[group] && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${TOPIC_COLORS[group]}`}>
                    {group}
                  </span>
                )}
                {groupBy === 'topic' && !TOPIC_COLORS[group] && group}
                {groupBy === 'errorType' && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${ERROR_TYPE_COLORS[group]}`}>
                    {ERROR_TYPE_LABELS[group]}
                  </span>
                )}
                {groupBy === 'date' && (
                  <span>{group}</span>
                )}
                <Badge variant="default">{mistakes.length} câu</Badge>
              </h3>
            </div>

            <div className="space-y-3">
              {mistakes.map((mistake) => (
                <div
                  key={mistake.id}
                  onClick={() => setSelectedMistake(mistake)}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-amber-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white mb-1">
                        {mistake.question}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${ERROR_TYPE_COLORS[mistake.errorType]}`}>
                          {ERROR_TYPE_LABELS[mistake.errorType]}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Sai {mistake.timesWrong}x
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium">{mistake.yourAnswer}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{mistake.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMistakes.length === 0 && (
        <Card className="text-center py-12">
          <span className="text-5xl mb-4 block">🎉</span>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Không có câu sai nào!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Bạn đã làm tốt lắm! Tiếp tục học để duy trì thành tích này.
          </p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Quay lại dashboard →
          </Link>
        </Card>
      )}

      {/* Detail Modal */}
      {selectedMistake && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMistake(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Chi tiết câu sai</h3>
                  <button
                    onClick={() => setSelectedMistake(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Question */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Câu hỏi</p>
                    <p className="font-medium text-slate-900 dark:text-white">{selectedMistake.question}</p>
                  </div>

                  {/* Your Answer vs Correct */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-600 dark:text-red-400 mb-1">Đáp án của bạn</p>
                      <p className="font-medium text-red-700 dark:text-red-300">{selectedMistake.yourAnswer}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Đáp án đúng</p>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">{selectedMistake.correctAnswer}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Giải thích</p>
                    <p className="text-slate-700 dark:text-slate-300">{selectedMistake.explanation}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <Badge variant="default" size="sm">{selectedMistake.topic}</Badge>
                    <Badge variant="default" size="sm">{ERROR_TYPE_LABELS[selectedMistake.errorType]}</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                      Ngày: {selectedMistake.date}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedMistake(null)}>
                    Đóng
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Luyện tập lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}