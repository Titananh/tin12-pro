// ==========================================
// Leaderboard Page - Tin12 Pro Cánh Diều
// Student rankings by XP, streak, and exam scores
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { mockUser } from '@/content/demo';

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
  change?: number; // rank change
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', name: 'Nguyễn Minh Tuấn', initials: 'NT', xp: 4850, streak: 45, examScore: 9.2, level: 24, levelTitle: 'Bậc thầy', change: 0 },
  { rank: 2, userId: 'u2', name: 'Trần Thu Hà', initials: 'TH', xp: 4520, streak: 38, examScore: 8.8, level: 22, levelTitle: 'Chuyên gia', change: 2 },
  { rank: 3, userId: 'u3', name: 'Lê Hoàng Nam', initials: 'HN', xp: 4200, streak: 30, examScore: 8.5, level: 21, levelTitle: 'Chuyên gia', change: -1 },
  { rank: 4, userId: 'u4', name: 'Phạm Đức Anh', initials: 'DA', xp: 3980, streak: 28, examScore: 8.2, level: 20, levelTitle: 'Xuất sắc', change: 1 },
  { rank: 5, userId: 'u5', name: 'Hoàng Mai Linh', initials: 'ML', xp: 3750, streak: 22, examScore: 8.0, level: 19, levelTitle: 'Xuất sắc', change: -2 },
  { rank: 6, userId: 'u6', name: 'Đặng Quang Minh', initials: 'QM', xp: 3520, streak: 20, examScore: 7.8, level: 18, levelTitle: 'Giỏi', change: 0 },
  { rank: 7, userId: 'u7', name: 'Vũ Thị Lan Anh', initials: 'LA', xp: 3280, streak: 18, examScore: 7.5, level: 17, levelTitle: 'Giỏi', change: 3 },
  { rank: 8, userId: 'u8', name: 'Bùi Hải Đăng', initials: 'HD', xp: 3050, streak: 15, examScore: 7.2, level: 16, levelTitle: 'Tiên tiến', change: -1 },
  { rank: 9, userId: 'u9', name: 'Ngô Thanh Sơn', initials: 'TS', xp: 2850, streak: 12, examScore: 7.0, level: 15, levelTitle: 'Tiên tiến', change: 0 },
  { rank: 10, userId: 'u10', name: 'Trịnh Minh Châu', initials: 'MC', xp: 2620, streak: 10, examScore: 6.8, level: 14, levelTitle: 'Tiên tiến', change: -3 },
  // Current user
  { rank: 42, userId: mockUser.id, name: mockUser.name, initials: 'MM', xp: mockUser.xp, streak: mockUser.streak, examScore: 7.5, level: mockUser.level, levelTitle: 'Tiên tiến', change: 5 },
];

const RANK_COLORS = [
  'from-amber-400 to-yellow-500', // gold
  'from-slate-300 to-slate-400',  // silver
  'from-amber-600 to-orange-700', // bronze
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<RankingTab>('xp');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const tabs: { id: RankingTab; label: string; icon: string; unit: string }[] = [
    { id: 'xp', label: 'XP', icon: '⚡', unit: 'XP' },
    { id: 'streak', label: 'Streak', icon: '🔥', unit: 'ngày' },
    { id: 'exam', label: 'Điểm thi', icon: '📝', unit: 'điểm' },
  ];

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: 'week', label: 'Tuần này' },
    { id: 'month', label: 'Tháng này' },
    { id: 'all', label: 'Mọi thời gian' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          🏆 Bảng xếp hạng
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Theo dõi thứ hạng và so sánh với các học sinh khác
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
              <span>{tab.icon}</span>
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
            className={`text-center relative overflow-hidden ${
              index === 0 ? 'order-2 col-span-1 md:col-span-1' : index === 1 ? 'order-1' : 'order-3'
            }`}
            padding="lg"
          >
            {/* Podium highlight */}
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
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                {activeTab === 'xp' ? 'XP' : activeTab === 'streak' ? 'ngày' : 'điểm thi'}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Rest of Leaderboard */}
      <Card className="overflow-hidden" padding="none">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">Bảng xếp hạng đầy đủ</h2>
          <Badge variant="blue">{sortedLeaderboard.length} học sinh</Badge>
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
                  entry.rank <= 3
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {entry.rank <= 3 ? '🥇' : entry.rank}
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
                      {isCurrentUser && <span className="ml-2 text-xs text-blue-500">(Bạn)</span>}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Level {entry.level} • {entry.levelTitle}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {entry.xp.toLocaleString()} XP
                    </p>
                    <p className="text-xs text-slate-400">Tổng XP</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      🔥 {entry.streak}
                    </p>
                    <p className="text-xs text-slate-400">Streak</p>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {entry.examScore?.toFixed(1) || '—'}
                    </p>
                    <p className="text-xs text-slate-400">Điểm TB</p>
                  </div>

                  {/* Rank Change */}
                  {entry.change !== undefined && entry.change !== 0 && (
                    <Badge variant={entry.change > 0 ? 'emerald' : 'red'} size="sm" className="hidden sm:flex">
                      {entry.change > 0 ? '↑' : '↓'} {Math.abs(entry.change)}
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
                  Hạng #{currentUserRank.rank} • Level {currentUserRank.level} - {currentUserRank.levelTitle}
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
                <p className="text-xs text-slate-500">Ngày streak</p>
              </div>
              {currentUserRank.examScore && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currentUserRank.examScore.toFixed(1)}</p>
                  <p className="text-xs text-slate-500">Điểm thi</p>
                </div>
              )}
            </div>
          </div>
          {currentUserRank.change && currentUserRank.change > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 flex items-center gap-2">
              <Badge variant="emerald">↑ Tăng {currentUserRank.change} hạng tuần này!</Badge>
              <span className="text-sm text-slate-600 dark:text-slate-400">Giữ vững đà để leo lên top!</span>
            </div>
          )}
        </Card>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Muốn lên top? Hoàn thành bài học và quiz để kiếm thêm XP!
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
        >
          ← Quay lại Dashboard
        </Link>
      </div>
    </div>
  );
}