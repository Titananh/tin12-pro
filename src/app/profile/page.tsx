// ==========================================
// Profile Page - Tin12 Pro Canh Diep
// Student personal profile view (read-only, public-facing)
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockMasteryMap, mockBadges, XP_LEVELS } from '@/content/demo';

// ============ ICONS (inline SVG) ============
const IconChart = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 14.496 6.996 15 6.375 15h-2.25a1.125 1.125 0 01-1.125-1.125v-6.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125v13.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0112 17.25v-13.125h3.75z" />
  </svg>
);

const IconTrendUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const IconTrophy = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

const IconDocument = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconMap = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.875 2.437z" />
  </svg>
);

const IconBolt = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

// ============ TYPES ============
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

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <IconChart /> },
    { id: 'progress', label: 'Progress', icon: <IconTrendUp /> },
    { id: 'achievements', label: 'Achievements', icon: <IconTrophy /> },
    { id: 'activity', label: 'Activity', icon: <IconDocument /> },
  ];

  const getMasteryColor = (score: number) => {
    if (score >= 70) return 'emerald';
    if (score >= 40) return 'amber';
    return 'red';
  };

  // Mock activity data
  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Completed: Machine Learning', time: '2 hours ago', xp: 50 },
    { id: 2, type: 'quiz', title: 'Quiz AI & Machine Learning - 92%', time: '3 hours ago', xp: 75 },
    { id: 3, type: 'lab', title: 'Completed Lab: Introduction to HTML', time: '1 day ago', xp: 100 },
    { id: 4, type: 'exam', title: 'Practice Exam #1 - 7.5 points', time: '2 days ago', xp: 150 },
    { id: 5, type: 'flashcard', title: 'Reviewed 8 flashcards', time: '2 days ago', xp: 30 },
  ];

  const activityIcons: Record<string, React.ReactNode> = {
    lesson: <IconDocument />,
    quiz: <IconChart />,
    lab: <IconMap />,
    exam: <IconDocument />,
    flashcard: <IconBolt />,
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
                <Badge variant="blue">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-1.5" />
                  {currentLevel.title}
                </Badge>
                <Badge variant="violet">Level {user.level}</Badge>
                <Badge variant="amber">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5" />
                  {user.streak} day streak
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sm:ml-auto grid grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.xp.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Total XP</p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{stats.totalLessonsCompleted}</p>
              <p className="text-sm text-slate-500">Lessons</p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{user.badges.length}</p>
              <p className="text-sm text-slate-500">Badges</p>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        {nextLevel && (
          <Card className="p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentLevel.level}</span>
                </div>
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
                <p className="text-xs text-slate-500">{levelProgress}% complete</p>
              </div>
            </div>
            <Progress value={levelProgress} size="md" color="blue" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {(nextLevel.minXP - user.xp).toLocaleString()} XP more to reach next level
            </p>
          </Card>
        )}
      </div>

      {/* Tab Navigation */}
      <Card className="mb-6 p-1 bg-slate-50 dark:bg-slate-900">
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
              {tab.icon}
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
              { label: 'Quizzes Taken', value: stats.totalQuizzesTaken, color: 'blue' },
              { label: 'Avg Quiz Score', value: `${stats.averageQuizScore}%`, color: 'violet' },
              { label: 'Labs Completed', value: stats.totalLabsCompleted, color: 'emerald' },
              { label: 'Exams Taken', value: stats.totalExamsTaken, color: 'amber' },
            ].map((stat, i) => (
              <Card key={i} className="text-center p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Mastery Overview */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <IconMap />
              Knowledge Map
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {masteryMap.map((topic, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-2 capitalize">
                      {topic.topic.replace(/-/g, ' ')}
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
            <Card className="p-5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                <IconTrendUp />
                Strengths
              </h3>
              <div className="space-y-3">
                {masteryMap.filter(m => m.score >= 70).slice(0, 3).map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-400"><IconCheck /></span>
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white capitalize">{topic.topic.replace(/-/g, ' ')}</p>
                      <p className="text-sm text-slate-500">{topic.score}% mastery</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                <IconArrow />
                Need Improvement
              </h3>
              <div className="space-y-3">
                {masteryMap.filter(m => m.score < 65).slice(0, 3).map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">{i + 1}</span>
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white capitalize">{topic.topic.replace(/-/g, ' ')}</p>
                      <p className="text-sm text-slate-500">Weak: {topic.weakTopics.slice(0, 2).join(', ')}</p>
                    </div>
                    <Link
                      href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Learn
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
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <IconChart />
              Course Progress
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Informatics 12 Foundation', progress: 40, color: '#2563EB' },
                { title: 'AI and Knowledge Society', progress: 25, color: '#7C3AED' },
                { title: 'Computer Networks', progress: 0, color: '#06B6D4' },
                { title: 'HTML/CSS and Web', progress: 15, color: '#10B981' },
                { title: 'THPT Exam Prep', progress: 0, color: '#F59E0B' },
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
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <IconBolt />
              XP Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total XP', value: stats.totalXP.toLocaleString() },
                { label: 'Learning', value: '~1200' },
                { label: 'Quizzes', value: '~600' },
                { label: 'Exams & Labs', value: '~650' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
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
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <IconTrophy />
              Earned Badges ({user.badges.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{badge.name.charAt(0)}</span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{badge.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">+{badge.xpReward} XP</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Badges */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Badge History
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Perfect Score', date: 'Today', xp: 150 },
                { name: '3 Day Streak', date: '2 days ago', xp: 100 },
                { name: 'Early Bird', date: '3 days ago', xp: 75 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">{item.name.charAt(0)}</span>
                  </div>
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
        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <IconDocument />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  {activityIcons[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
                <Badge variant="violet" size="sm">+{activity.xp} XP</Badge>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">View More Activity</Button>
          </div>
        </Card>
      )}
    </div>
  );
}