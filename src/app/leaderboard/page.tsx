// ==========================================
// Leaderboard Page - Tin12 Pro Canh Diep
// Student rankings by XP, streak, and exam scores
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { mockUser } from '@/content/demo';

// ============ ICONS (inline SVG) ============
const IconTrophy = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

const IconBolt = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const IconFire = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
);

const IconDocument = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconTrendingUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const IconTrendingDown = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l2.74 1.22m0 0L5.94 19.28m0 0a11.945 11.945 0 01-5.814-5.519l-2.74-1.22" />
  </svg>
);

// ============ TYPES ============
type RankingTab = 'xp' | 'streak' | 'exam';
type TimeRange = 'week' | 'month' | 'all';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  initials: string;
  xp: number;
  streak: number;
  examScore?: number;
  level: number;
  levelTitle: string;
  change?: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', name: 'Nguyen Minh Tuan', initials: 'NT', xp: 4850, streak: 45, examScore: 9.2, level: 24, levelTitle: 'Master', change: 0 },
  { rank: 2, userId: 'u2', name: 'Tran Thu Ha', initials: 'TH', xp: 4520, streak: 38, examScore: 8.8, level: 22, levelTitle: 'Expert', change: 2 },
  { rank: 3, userId: 'u3', name: 'Le Hoang Nam', initials: 'HN', xp: 4200, streak: 30, examScore: 8.5, level: 21, levelTitle: 'Expert', change: -1 },
  { rank: 4, userId: 'u4', name: 'Pham Duc Anh', initials: 'DA', xp: 3980, streak: 28, examScore: 8.2, level: 20, levelTitle: 'Excellent', change: 1 },
  { rank: 5, userId: 'u5', name: 'Hoang Mai Linh', initials: 'ML', xp: 3750, streak: 22, examScore: 8.0, level: 19, levelTitle: 'Excellent', change: -2 },
  { rank: 6, userId: 'u6', name: 'Dang Quang Minh', initials: 'QM', xp: 3520, streak: 20, examScore: 7.8, level: 18, levelTitle: 'Good', change: 0 },
  { rank: 7, userId: 'u7', name: 'Vu Thi Lan Anh', initials: 'LA', xp: 3280, streak: 18, examScore: 7.5, level: 17, levelTitle: 'Good', change: 3 },
  { rank: 8, userId: 'u8', name: 'Bui Hai Dang', initials: 'HD', xp: 3050, streak: 15, examScore: 7.2, level: 16, levelTitle: 'Advanced', change: -1 },
  { rank: 9, userId: 'u9', name: 'Ngo Thanh Son', initials: 'TS', xp: 2850, streak: 12, examScore: 7.0, level: 15, levelTitle: 'Advanced', change: 0 },
  { rank: 10, userId: 'u10', name: 'Trinh Minh Chau', initials: 'MC', xp: 2620, streak: 10, examScore: 6.8, level: 14, levelTitle: 'Advanced', change: -3 },
  { rank: 42, userId: mockUser.id, name: mockUser.name, initials: 'MM', xp: mockUser.xp, streak: mockUser.streak, examScore: 7.5, level: mockUser.level, levelTitle: 'Advanced', change: 5 },
];

const RANK_COLORS = [
  'from-amber-400 to-yellow-500',
  'from-slate-300 to-slate-400',
  'from-amber-600 to-orange-700',
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<RankingTab>('xp');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const tabs: { id: RankingTab; label: string; icon: React.ReactNode; unit: string }[] = [
    { id: 'xp', label: 'XP', icon: <IconBolt />, unit: 'XP' },
    { id: 'streak', label: 'Streak', icon: <IconFire />, unit: 'days' },
    { id: 'exam', label: 'Exam Score', icon: <IconDocument />, unit: 'points' },
  ];

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const getRankingValue = (entry: LeaderboardEntry): number => {
    switch (activeTab) {
      case 'streak': return entry.streak;
      case 'exam': return entry.examScore || 0;
      default: return entry.xp;
    }
  };

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    return getRankingValue(b) - getRankingValue(a);
  }).map((entry, i) => ({ ...entry, rank: i + 1 }));

  const currentUserRank = sortedLeaderboard.find(e => e.userId === mockUser.id);
  const topThree = sortedLeaderboard.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <IconTrophy />
          </div>
          Leaderboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track rankings and compare with other students
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="sm:ml-auto flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {timeRanges.map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                timeRange === range.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {topThree.map((entry, index) => (
          <Card
            key={entry.userId}
            className={`text-center relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${
              index === 0 ? 'order-2 col-span-1 md:col-span-1' : index === 1 ? 'order-1' : 'order-3'
            }`}
            padding="lg"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${RANK_COLORS[index]}`} />

            {/* Rank Badge */}
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
              index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
              'bg-gradient-to-br from-amber-600 to-orange-700'
            }`}>
              {entry.rank}
            </div>

            {/* Avatar */}
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white font-bold text-xl ${
              index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
              index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
              'bg-gradient-to-br from-amber-600 to-orange-700'
            }`}>
              {entry.initials}
            </div>

            {/* Name & Level */}
            <p className="font-semibold text-slate-900 dark:text-white truncate">{entry.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{entry.levelTitle}</p>

            {/* Value */}
            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {activeTab === 'xp' ? entry.xp.toLocaleString() :
                 activeTab === 'streak' ? entry.streak :
                 entry.examScore?.toFixed(1)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeTab === 'xp' ? 'XP' : activeTab === 'streak' ? 'days' : 'exam score'}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Rest of Leaderboard */}
      <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" padding="none">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">Full Rankings</h2>
          <Badge variant="blue">{sortedLeaderboard.length} students</Badge>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {sortedLeaderboard.map((entry) => {
            const isCurrentUser = entry.userId === mockUser.id;

            return (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 p-4 ${
                  isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                } transition-colors`}
              >
                {/* Rank */}
                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm ${
                  entry.rank === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  entry.rank === 2 ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
                  entry.rank === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {entry.rank <= 3 ? (
                    <span className="text-xs">{entry.rank}</span>
                  ) : entry.rank}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                    isCurrentUser
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                      : 'bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700'
                  }`}>
                    {entry.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium truncate ${isCurrentUser ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
                      {entry.name}
                      {isCurrentUser && <span className="ml-2 text-xs text-blue-500">(You)</span>}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Level {entry.level} - {entry.levelTitle}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {entry.xp.toLocaleString()} XP
                    </p>
                    <p className="text-xs text-slate-400">Total XP</p>
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      <IconFire />
                    </span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{entry.streak}</span>
                    <span className="text-xs text-slate-400 ml-1">streak</span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {entry.examScore?.toFixed(1) || '--'}
                    </p>
                    <p className="text-xs text-slate-400">Avg Score</p>
                  </div>

                  {/* Rank Change */}
                  {entry.change !== undefined && entry.change !== 0 && (
                    <Badge variant={entry.change > 0 ? 'emerald' : 'red'} size="sm" className="hidden sm:flex items-center gap-1">
                      {entry.change > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                      {Math.abs(entry.change)}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Current User Card */}
      {currentUserRank && (
        <Card className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {currentUserRank.initials}
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{currentUserRank.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Rank #{currentUserRank.rank} - Level {currentUserRank.level} - {currentUserRank.levelTitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentUserRank.xp.toLocaleString()}</p>
                <p className="text-xs text-slate-500">XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{currentUserRank.streak}</p>
                <p className="text-xs text-slate-500">Day Streak</p>
              </div>
              {currentUserRank.examScore && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currentUserRank.examScore.toFixed(1)}</p>
                  <p className="text-xs text-slate-500">Exam Score</p>
                </div>
              )}
            </div>
          </div>
          {currentUserRank.change && currentUserRank.change > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 flex items-center gap-2">
              <Badge variant="emerald">
                <IconTrendingUp />
                +{currentUserRank.change} ranks this week!
              </Badge>
              <span className="text-sm text-slate-600 dark:text-slate-400">Keep it up to climb higher!</span>
            </div>
          )}
        </Card>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Want to reach the top? Complete lessons and quizzes to earn more XP!
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
        >
          <IconArrow />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);