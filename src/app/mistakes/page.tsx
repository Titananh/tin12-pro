// ==========================================
// Mistakes Page - Tin12 Pro Canh Diep
// Premium mistake bank with analytics
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { mockMistakes, type MistakeEntry } from '@/content/demo';

const TOPIC_COLORS: Record<string, string> = {
  'Mang may tinh': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'Kien truc may tinh': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  'AI & Machine Learning': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  'HTML/CSS': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
};

const ERROR_TYPE_LABELS: Record<string, string> = {
  concept: 'Nham khai niem',
  calculation: 'Tinh toan',
  terminology: 'Thuật ngữ',
  application: 'Ung dung',
};

const ERROR_TYPE_COLORS: Record<string, string> = {
  concept: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  calculation: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  terminology: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  application: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
};

type FilterType = 'all' | 'concept' | 'calculation' | 'terminology' | 'application';
type GroupByType = 'topic' | 'errorType' | 'date';

const IconClose = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconError = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const IconRepeat = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12.75 3a48 48 0 013.374 8.284" />
  </svg>
);

export default function MistakesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [groupBy, setGroupBy] = useState<GroupByType>('topic');
  const [selectedMistake, setSelectedMistake] = useState<MistakeEntry | null>(null);

  const filteredMistakes = filter === 'all'
    ? mockMistakes
    : mockMistakes.filter(m => m.errorType === filter);

  const groupedMistakes = filteredMistakes.reduce((acc, mistake) => {
    let key: string;
    if (groupBy === 'topic') key = mistake.topic;
    else if (groupBy === 'errorType') key = mistake.errorType;
    else key = mistake.date;

    if (!acc[key]) acc[key] = [];
    acc[key].push(mistake);
    return acc;
  }, {} as Record<string, MistakeEntry[]>);

  const totalMistakes = mockMistakes.length;
  const conceptMistakes = mockMistakes.filter(m => m.errorType === 'concept').length;
  const repeatMistakes = mockMistakes.filter(m => m.timesWrong > 1).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
            <IconError />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Ngan hang cau sai</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              On lai nhung cau da sai de khong mac lai
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tong cau sai</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{conceptMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Nham khai niem</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{repeatMistakes}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sai nhieu lan</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wide">Loc theo</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Tat ca
              </button>
              {(Object.keys(ERROR_TYPE_LABELS) as FilterType[]).filter(t => t !== 'all').map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {ERROR_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1" />
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wide">Nhom theo</label>
            <div className="flex gap-2">
              {([
                { id: 'topic' as GroupByType, label: 'Chu de' },
                { id: 'errorType' as GroupByType, label: 'Loai loi' },
                { id: 'date' as GroupByType, label: 'Ngay' },
              ]).map(gb => (
                <button
                  key={gb.id}
                  onClick={() => setGroupBy(gb.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    groupBy === gb.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {gb.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Practice Button */}
      <div className="bg-gradient-to-r from-violet-600/5 to-blue-600/5 border border-violet-500/20 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
              <IconRepeat />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Luyen tap voi cau sai</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Thuc hanh lai {filteredMistakes.length} cau da loc
              </p>
            </div>
          </div>
          <Button variant="primary" size="md">
            Bat dau luyen tap
          </Button>
        </div>
      </div>

      {/* Mistake List */}
      <div className="space-y-4">
        {Object.entries(groupedMistakes).map(([group, mistakes]) => (
          <div key={group} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
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
                {groupBy === 'date' && <span>{group}</span>}
                <Badge variant="default">{mistakes.length} cau</Badge>
              </h3>
            </div>

            <div className="space-y-2.5">
              {mistakes.map((mistake) => (
                <div
                  key={mistake.id}
                  onClick={() => setSelectedMistake(mistake)}
                  className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-l-2 border-amber-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm mb-1.5">
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
                    <div className="text-right flex-shrink-0 space-y-1">
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                        <IconClose />
                        <span className="font-medium">{mistake.yourAnswer}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
                        <IconCheck />
                        <span>{mistake.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMistakes.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Khong co cau sai nao!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Ban da lam tot lắm! Tiep tuc hoc de duy tri thanh tich nay.
          </p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
            Quay lai dashboard
          </Link>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMistake && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMistake(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Chi tiet cau sai</h3>
                  <button
                    onClick={() => setSelectedMistake(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <IconClose />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Question */}
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Cau hoi</p>
                    <p className="font-medium text-slate-900 dark:text-white">{selectedMistake.question}</p>
                  </div>

                  {/* Answers */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/50">
                      <p className="text-xs text-red-600 dark:text-red-400 mb-1 font-medium">Dap an cua ban</p>
                      <p className="font-medium text-red-700 dark:text-red-300">{selectedMistake.yourAnswer}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1 font-medium">Dap an dung</p>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">{selectedMistake.correctAnswer}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Giai thich</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedMistake.explanation}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <Badge variant="default" size="sm">{selectedMistake.topic}</Badge>
                    <Badge variant="default" size="sm">{ERROR_TYPE_LABELS[selectedMistake.errorType]}</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                      Ngay: {selectedMistake.date}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedMistake(null)}>
                    Dong
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Luyen tap lai
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
