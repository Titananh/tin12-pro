// ==========================================
// Profile Page - Tin12 Pro Cánh Diều
// Student personal profile view (read-only, public-facing)
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockMasteryMap, mockBadges, XP_LEVELS } from '@/content/demo';

type ProfileTab = 'overview' | 'progress' | 'achievements' | 'activity';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const user = mockUser;
  const stats = mockStats;
  const masteryMap = mockMasteryMap;

  // Level info
  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const levelProgress = nextLevel
    ? Math.round(((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)
    : 100;

  // Badge icons
  const badgeIcons: Record<string, string> = {
    'first-lesson': '🎯',
    'streak-3': '🔥',
    'perfect-quiz': '💯',
    'early-bird': '🌅',
  };

  const tabs: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Tổng quan', icon: '📊' },
    { id: 'progress', label: 'Tiến độ', icon: '📈' },
    { id: 'achievements', label: 'Thành tích', icon: '🏅' },
    { id: 'activity', label: 'Hoạt động', icon: '📝' },
  ];

  const getMasteryColor = (score: number) => {
    if (score >= 70) return 'emerald';
    if (score >= 40) return 'amber';
    return 'red';
  };

  // Mock activity data
  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Hoàn thành bài: Học máy (Machine Learning)', time: '2 giờ trước', xp: 50 },
    { id: 2, type: 'quiz', title: 'Làm quiz AI & Machine Learning - 92%', time: '3 giờ trước', xp: 75 },
    { id: 3, type: 'lab', title: 'Hoàn thành Lab: Giới thiệu HTML', time: '1 ngày trước', xp: 100 },
    { id: 4, type: 'exam', title: 'Thi thử Đề số 1 - 7.5 điểm', time: '2 ngày trước', xp: 150 },
    { id: 5, type: 'flashcard', title: 'Ôn 8 flashcards', time: '2 ngày trước', xp: 30 },
  ];

  const activityIcons: Record<string, string> = {
    lesson: '📖',
    quiz: '✏️',
    lab: '🔬',
    exam: '📝',
    flashcard: '🃏',
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="blue">{currentLevel.icon} {currentLevel.title}</Badge>
                <Badge variant="violet">Level {user.level}</Badge>
                <Badge variant="amber">🔥 {user.streak} ngày streak</Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sm:ml-auto grid grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.xp.toLocaleString()}</p>
              <p className="text-sm text-slate-500">XP tổng</p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{stats.totalLessonsCompleted}</p>
              <p className="text-sm text-slate-500">Bài học</p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{user.badges.length}</p>
              <p className="text-sm text-slate-500">Huy hiệu</p>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        {nextLevel && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentLevel.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Level {user.level} - {currentLevel.title}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Level {nextLevel.level} - {nextLevel.title}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">{user.xp} / {nextLevel.minXP}</p>
                <p className="text-xs text-slate-500">{levelProgress}% hoàn thành</p>
              </div>
            </div>
            <Progress value={levelProgress} size="md" color="blue" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Còn {(nextLevel.minXP - user.xp).toLocaleString()} XP nữa để lên level tiếp theo
            </p>
          </Card>
        )}
      </div>

      {/* Tab Navigation */}
      <Card className="mb-6 p-1">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Quiz đã làm', value: stats.totalQuizzesTaken, color: 'blue' },
              { label: 'Điểm TB Quiz', value: `${stats.averageQuizScore}%`, color: 'violet' },
              { label: 'Labs hoàn thành', value: stats.totalLabsCompleted, color: 'emerald' },
              { label: 'Kỳ thi đã thi', value: stats.totalExamsTaken, color: 'amber' },
            ].map((stat, i) => (
              <Card key={i} className="text-center p-4">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Mastery Overview */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              🗺️ Bản đồ kiến thức
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {masteryMap.map((topic, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-2">
                      {topic.topic}
                    </span>
                    <span className={`text-sm font-bold ${
                      topic.score >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      topic.score >= 40 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {topic.score}%
                    </span>
                  </div>
                  <Progress
                    value={topic.score}
                    size="sm"
                    color={getMasteryColor(topic.score)}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                💪 Điểm mạnh
              </h3>
              <div className="space-y-3">
                {masteryMap.filter(m => m.score >= 70).slice(0, 3).map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{topic.topic}</p>
                      <p className="text-sm text-slate-500">{topic.score}% mastery</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                📚 Cần cải thiện
              </h3>
              <div className="space-y-3">
                {masteryMap.filter(m => m.score < 65).slice(0, 3).map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{topic.topic}</p>
                      <p className="text-sm text-slate-500">Yếu: {topic.weakTopics.slice(0, 2).join(', ')}</p>
                    </div>
                    <Link
                      href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Học
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Course Progress */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              📚 Tiến độ khóa học
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Nền tảng Tin học 12', progress: 40, color: '#2563EB' },
                { title: 'AI và Xã hội Tri thức', progress: 25, color: '#7C3AED' },
                { title: 'Mạng máy tính', progress: 0, color: '#06B6D4' },
                { title: 'HTML/CSS và Web', progress: 15, color: '#10B981' },
                { title: 'Luyện thi THPT', progress: 0, color: '#F59E0B' },
              ].map((course, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">{course.title}</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} size="md" color="blue" />
                </div>
              ))}
            </div>
          </Card>

          {/* XP Progress */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              ⚡ Tổng quan XP
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tổng XP', value: stats.totalXP.toLocaleString(), icon: '⚡' },
                { label: 'Học tập', value: '~1200', icon: '📖' },
                { label: 'Quiz', value: '~600', icon: '✏️' },
                { label: 'Thi & Lab', value: '~650', icon: '🔬' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {/* Earned Badges */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              🏅 Huy hiệu đã đạt ({user.badges.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl">
                    {badgeIcons[badge.id] || '🏅'}
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">{badge.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">+{badge.xpReward} XP</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Badges */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              📅 Lịch sử đạt huy hiệu
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Hoàn hảo', icon: '💯', date: 'Hôm nay', xp: 150 },
                { name: '3 ngày liên tiếp', icon: '🔥', date: '2 ngày trước', xp: 100 },
                { name: 'Người đi sớm', icon: '🌅', date: '3 ngày trước', xp: 75 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  <Badge variant="emerald" size="sm">+{item.xp} XP</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            📝 Hoạt động gần đây
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl"
              >
                <span className="text-2xl">{activityIcons[activity.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
                <Badge variant="violet" size="sm">+{activity.xp} XP</Badge>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Xem thêm hoạt động</Button>
          </div>
        </Card>
      )}
    </div>
  );
}