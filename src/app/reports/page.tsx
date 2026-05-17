// ==========================================
// Reports Page - Tin12 Pro Canh Diep
// Premium study reports with analytics
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockMasteryMap, mockWeeklyReports, mockExamHistory, XP_LEVELS, XP_RULES, type WeeklyReport } from '@/content/demo';

type ReportTab = 'summary' | 'weekly' | 'topics' | 'xp';

const IconChart = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconBolt = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconStar = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const IconFire = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75c0 .422-.183.81-.477 1.122l-.855.855c-.877.982-1.52 2.11-1.52 3.378v.75c0 1.268.643 2.396 1.52 3.378l.855.855c.3.3.477.7.477 1.122v.75c0 .422.183.81.477 1.122l.855.855c.877.982 1.52 2.11 1.52 3.378v.75c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75a2.25 2.25 0 01-.659 1.591l-4.655 3.385a2.25 2.25 0 01-2.659 0l-4.655-3.385A2.25 2.25 0 013 19.5v-.75c0-.422.183-.81.477-1.122l.855-.855C4.643 16.396 5 15.268 5 14v-.75c0-.422.183-.81.477-1.122l.855-.855C7.357 11.063 8 9.935 8 8.622v-.75c0-.422-.183-.81-.477-1.122l-.855-.855C6.643 5.936 6 4.808 6 3.5v-.75c0-.422.183-.81.477-1.122l.855-.855C8.643 1.004 7.5 1 7.5 1H4.5C3.12 1 2 2.12 2 3.5v.75c0 .422.183.81.477 1.122l.855.855C3.357 6.063 4 7.191 4 8.5v.75c0 .422-.183.81-.477 1.122l-.855.855C2.643 11.396 2 12.524 2 13.875v.75" />
  </svg>
);

const IconPrint = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.06-.72.06-.72 0-1.344-.384-1.728-.936a1.94 1.94 0 01-.072-2.424c.12-.192.312-.36.552-.468.24-.108.504-.12.756-.036.252.084.48.252.66.48.18.228.276.516.276.852 0 .336-.096.624-.276.852-.18.228-.408.396-.66.48a1 1 0 01-.756.036 1.94 1.94 0 01-2.052-.312 2.94 2.94 0 01-.12-2.76c.096-.576.36-1.104.732-1.536.372-.432.84-.72 1.38-.828a1.94 1.94 0 012.04.36c.132.132.252.288.348.468.096.18.12.384.084.6a1.94 1.94 0 01-.708 1.908c-.108.048-.24.072-.372.072a2.5 2.5 0 01-1.572-.66 2.5 2.5 0 01-.564-2.508c.024-.864.288-1.656.732-2.232a2.94 2.94 0 011.74-1.104c.864 0 1.62.336 2.16.936a2.94 2.94 0 01.708 2.22c-.024.432-.156.84-.372 1.164-.216.324-.516.564-.864.696a2 2 0 01-1.32 0c-.348-.132-.648-.372-.864-.696a2.82 2.82 0 01-.372-1.164c0-.864.348-1.62.864-2.184.516-.564 1.14-.936 1.836-.936a2.94 2.94 0 011.752.636c.252.252.42.576.48.936.06.36.024.732-.084 1.08-.108.348-.312.66-.6.864-.288.204-.648.288-1.008.204a2 2 0 01-.78-.264 2 2 0 01-.576-.972z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-5.25c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v5.25m0-7.5H5.25C4.629 7.5 4.125 8.004 4.125 8.625v7.5c0 .621.504 1.125 1.125 1.125h6c.621 0 1.125-.504 1.125-1.125v-7.5c0-.621-.504-1.125-1.125-1.125h-1.5" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const TABS_CONFIG = [
  { id: 'summary' as ReportTab, label: 'Tong quan', icon: IconChart },
  { id: 'weekly' as ReportTab, label: 'Bao cao tuan', icon: IconCalendar },
  { id: 'topics' as ReportTab, label: 'Theo chu de', icon: IconBook },
  { id: 'xp' as ReportTab, label: 'XP & Level', icon: IconBolt },
];

const TAB_ABBREV: Record<ReportTab, string> = {
  summary: 'TG',
  weekly: 'TU',
  topics: 'CD',
  xp: 'XP',
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('summary');

  const user = mockUser;
  const stats = mockStats;
  const masteryMap = mockMasteryMap;

  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);

  const sortedByScore = [...masteryMap].sort((a, b) => a.score - b.score);
  const weakestTopics = sortedByScore.slice(0, 3);
  const strongestTopics = sortedByScore.reverse().slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <IconChart />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Bao cao hoc tap</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                Theo doi tien do va hieu suat hoc tap cua ban
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <IconPrint /> In bao cao
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1.5 mb-6">
        <div className="flex flex-wrap gap-1">
          {TABS_CONFIG.map(tab => {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold">
                  {TAB_ABBREV[tab.id]}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="space-y-5">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bai hoc', value: stats.totalLessonsCompleted, icon: IconBook, color: 'blue' },
              { label: 'Quiz', value: stats.totalQuizzesTaken, icon: IconCheck, color: 'violet' },
              { label: 'Labs', value: stats.totalLabsCompleted, icon: IconTarget, color: 'emerald' },
              { label: 'Gio hoc', value: `${stats.timeSpentLearning}h`, icon: IconFire, color: 'amber' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3 text-blue-600">
                  <stat.icon />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Tong quan hieu suat</h2>
            <div className="space-y-3">
              {[
                { label: 'Diem TB Quiz', value: `${stats.averageQuizScore}%`, icon: IconCheck },
                { label: 'San sang thi', value: `${stats.examReadiness}%`, icon: IconTarget },
                { label: 'Streak hien tai', value: `${stats.streak} ngay`, icon: IconFire },
                { label: 'Cap do hien tai', value: currentLevel.title, icon: IconStar },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <item.icon />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{item.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exam History */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Lich su thi thu</h2>
              <Link href="/exams" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                Them <IconArrowRight />
              </Link>
            </div>
            <div className="space-y-3">
              {mockExamHistory.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{exam.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{exam.completedAt} — {exam.timeSpent} phut</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      exam.score >= 8 ? 'text-emerald-600 dark:text-emerald-400' :
                      exam.score >= 6 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {exam.score.toFixed(1)}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Weekly Tab */}
      {activeTab === 'weekly' && (
        <div className="space-y-5">
          {mockWeeklyReports.map((report: WeeklyReport, index: number) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Tuan: {report.weekStart} → {report.weekEnd}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{report.totalStudyTime} phut hoc</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className={report.streakMaintained ? 'text-emerald-600' : 'text-slate-400'}>
                      {report.streakMaintained ? 'Streak duy tri' : 'Streak break'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">+{report.xpEarned} XP</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                {[
                  { label: 'Bai', value: report.lessonsCompleted },
                  { label: 'Quiz', value: report.quizzesTaken },
                  { label: 'Diem TB', value: `${report.averageQuizScore}%` },
                  { label: 'Labs', value: report.labsCompleted },
                  { label: 'Diem thi', value: report.examTaken ? `${report.examScore}/10` : '-' },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Can cai thien</p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.weakestTopics.map((topic, i) => (
                      <span key={i} className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Diem manh</p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.strongestTopics.map((topic, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topics Tab */}
      {activeTab === 'topics' && (
        <div className="space-y-5">
          {/* Weakest Topics */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                <IconTarget />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Chu de can cai thien</h2>
            </div>
            <div className="space-y-4">
              {weakestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{topic.topic}</span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                  </div>
                  <Progress value={topic.score} size="sm" color="red" className="mb-2" />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Yeu: {topic.weakTopics.join(', ')}
                  </p>
                  <Link
                    href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1"
                  >
                    Hoc bai lien quan <IconArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Strongest Topics */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <IconCheck />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Chu de nam vung</h2>
            </div>
            <div className="space-y-4">
              {strongestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{topic.topic}</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{topic.score}%</span>
                  </div>
                  <Progress value={topic.score} size="sm" color="emerald" />
                </div>
              ))}
            </div>
          </div>

          {/* All Topics */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Tat ca chu de</h2>
            <div className="space-y-2.5">
              {masteryMap.map((topic, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex-1">
                    <span className="font-medium text-slate-900 dark:text-white text-sm">{topic.topic}</span>
                  </div>
                  <div className="w-32">
                    <Progress
                      value={topic.score}
                      size="sm"
                      color={topic.score >= 70 ? 'emerald' : topic.score >= 40 ? 'amber' : 'red'}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-12 text-right ${
                    topic.score >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                    topic.score >= 40 ? 'text-amber-600 dark:text-amber-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {topic.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* XP Tab */}
      {activeTab === 'xp' && (
        <div className="space-y-5">
          {/* Current Level */}
          <div className="bg-gradient-to-r from-blue-600/5 to-violet-600/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {user.level}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentLevel.icon} {currentLevel.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
                  Level {user.level} — {user.xp.toLocaleString()} XP
                </p>
                {nextLevel && (
                  <>
                    <Progress value={((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100} size="md" color="blue" className="mt-3" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Con {(nextLevel.minXP - user.xp).toLocaleString()} XP den Level {nextLevel.level} — {nextLevel.title}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* XP Rules */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <IconBolt />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quy tac tich XP</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(XP_RULES).map(([activity, rules]) => (
                <div key={activity} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm capitalize">{activity}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {'base' in rules && `Base: ${(rules as { base: number }).base} XP`}
                      {'bonuses' in rules && Array.isArray((rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses) && (rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses.length > 0 && (
                        <span> — Bonus: {(rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses.map((b) => `${b.threshold}%+ → +${b.bonus} XP`).join(', ')}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <IconFire /> Bonus Streak
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Streak {XP_RULES.streakBonus.threshold}+ ngay → +{XP_RULES.streakBonus.bonus} XP moi ngay
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* XP History */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <IconChart />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Lich su XP gan day</h2>
            </div>
            <div className="space-y-2.5">
              {[
                { action: 'Hoan thanh bai: Kien truc may tinh', xp: 85, date: 'Hom nay' },
                { action: 'Lam quiz: AI & Machine Learning', xp: 120, date: 'Hom nay' },
                { action: 'Hoan thanh lab: HTML co ban', xp: 150, date: 'Hom qua' },
                { action: 'Streak bonus', xp: 20, date: 'Hom qua' },
                { action: 'Hoan thanh bai: Mang may tinh', xp: 75, date: '2 ngay truoc' },
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div>
                    <p className="text-slate-900 dark:text-white text-sm">{entry.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{entry.date}</p>
                  </div>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Print-only content */}
      <div className="hidden print:block mt-8 p-4 border-t border-slate-300">
        <p className="text-sm text-slate-500">Bao cao duoc tao ngay {new Date().toLocaleDateString('vi-VN')} — Tin12 Pro Canh Diep</p>
      </div>
    </div>
  );
}
