// ==========================================
// Dashboard Page - Tin12 Pro Cánh Diều
// Premium student command center
// ==========================================

'use client';

import Link from 'next/link';
import { Card, Badge, Progress, StatCard } from '@/components/ui';
import { mockUser, mockMasteryMap, mockTodayPlan, mockStats, mockMistakes, mockFlashcards, XP_LEVELS } from '@/content/demo';

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconQuiz = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const IconLab = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.155.659 1.591l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23a2.25 2.25 0 00.659-1.591V3.104m-9 5.714v5.714a2.25 2.25 0 01.659 1.591l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23a2.25 2.25 0 00.659-1.591V3.104a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L5 14.5m9.75-3.104c.251.023.501.05.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597-.237 1.155-.659 1.591l-2.23 2.23a2.25 2.25 0 01-2.659 0l-2.23-2.23a2.25 2.25 0 00-.659-1.591V3.104a24.301 24.301 0 00-4.5 0m0 0l2.23 2.23a2.25 2.25 0 002.659 0l2.23-2.23" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const IconChart = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconFire = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
);

const IconBolt = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconShield = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75c0 .422-.183.81-.477 1.122l-.855.855c-.877.982-1.52 2.11-1.52 3.378v.75c0 1.268.643 2.396 1.52 3.378l.855.855c.3.3.477.7.477 1.122v.75c0 .422.183.81.477 1.122l.855.855c.877.982 1.52 2.11 1.52 3.378v.75c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75a2.25 2.25 0 01-.659 1.591l-4.655 3.385a2.25 2.25 0 01-2.659 0l-4.655-3.385A2.25 2.25 0 013 19.5v-.75c0-.422.183-.81.477-1.122l.855-.855C4.643 16.396 5 15.268 5 14v-.75c0-.422.183-.81.477-1.122l.855-.855C7.357 11.063 8 9.935 8 8.622v-.75c0-.422.183-.81.477-1.122l.855-.855C10.357 5.936 11 4.808 11 3.5v-.75c0-.422-.183-.81-.477-1.122l-.855-.855C8.643 1.004 7.5 1 7.5 1H4.5C3.12 1 2 2.12 2 3.5v.75c0 .422.183.81.477 1.122l.855.855C3.357 6.063 4 7.191 4 8.5v.75c0 .422-.183.81-.477 1.122l-.855.855C2.643 11.396 2 12.524 2 13.875v.75" />
  </svg>
);

const IconClock = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconBadge = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.643.163 1.285.327 1.927.487a1.5 1.5 0 010 2.914c-.642.16-1.284.324-1.927.486-.16.043-.328.083-.49.125m8.734 0a1.5 1.5 0 010 2.914c.643.16 1.285.327 1.927.486.16.043.328.083.49.125M6.633 10.5c.643.163 1.285.327 1.927.487a1.5 1.5 0 010 2.914c-.642.16-1.284.324-1.927.486-.16.043-.328.083-.49.125m8.734 0c.161.043.323.083.49.125M12 18.75h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008z" />
  </svg>
);

const IconPortfolio = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const IconFlashcard = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const IconSparkle = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a3.375 3.375 0 00-2.455-2.456L12.75 18l1.183-.394a3.375 3.375 0 002.455-2.456L16.5 14.25l.394 1.183a3.375 3.375 0 002.456 2.456L21.75 18l-1.183.394a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const IconMap = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .426.24.817.622 1.006l4.875 2.437c.317.159.69.159 1.006 0l3.869-1.934c.317-.159.69-.159 1.006 0l3.869 1.934c.317.159.69.159 1.006 0l4.875-2.437c.381-.19.622-.58.622-1.006V6.695c0-.426-.24-.817-.622-1.006l-3.869-1.934z" />
  </svg>
);

export default function DashboardPage() {
  const user = mockUser;
  const masteryMap = mockMasteryMap;
  const todayPlan = mockTodayPlan;
  const stats = mockStats;

  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const levelProgress = nextLevel
    ? Math.round(((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)
    : 100;

  const weakestTopics = masteryMap
    .filter(m => m.score < 65)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const flashcardDue = mockFlashcards.length;
  const examReadiness = stats.examReadiness;
  const recentMistakes = mockMistakes.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Xin chào, {user.name.split(' ').pop()}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              {currentLevel.icon} {currentLevel.title} — Streak {user.streak} ngày
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm pl-[4.5rem]">
          {todayPlan.reason}
        </p>
      </div>

      {/* Stats Row - Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <StatCard
          label="Streak"
          value={`${user.streak}`}
          change={1}
          changeLabel="ngày"
          icon={<IconFire />}
        />
        <StatCard
          label="XP"
          value={user.xp.toLocaleString()}
          change={50}
          changeLabel="XP"
          icon={<IconBolt />}
        />
        <StatCard
          label="Cấp"
          value={user.level}
          changeLabel={currentLevel.title}
          icon={<IconStar />}
        />
        <StatCard
          label="Hoàn thành"
          value={stats.totalLessonsCompleted}
          icon={<IconCheck />}
        />
        <StatCard
          label="Sẵn sàng thi"
          value={`${examReadiness}%`}
          change={examReadiness >= 70 ? 5 : -3}
          changeLabel="%"
          icon={<IconShield />}
        />
      </div>

      {/* Level Progress Banner */}
      {nextLevel && (
        <Card className="mb-6 bg-gradient-to-r from-blue-600/5 to-violet-600/5 border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {user.level}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Level {user.level} — {currentLevel.title}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {user.xp.toLocaleString()} / {nextLevel.minXP.toLocaleString()} XP
                </span>
              </div>
              <Progress value={levelProgress} size="md" color="blue" className="mb-1.5" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Còn {(nextLevel.minXP - user.xp).toLocaleString()} XP đến Level {nextLevel.level} — {nextLevel.title}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="min-w-0 space-y-5 lg:col-span-2">
          {/* Today's Plan - Bento Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <IconClock />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Kế hoạch hôm nay</h2>
              </div>
              <Badge variant="blue">{todayPlan.lessons.length + todayPlan.practice.length + todayPlan.labs.length} bài</Badge>
            </div>
            <div className="space-y-2.5">
              {todayPlan.lessons.map((item, index) => (
                <div key={`lesson-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <IconBook />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.estimatedMinutes} phút — {item.reason}</p>
                  </div>
                  <Link href={`/lessons/${item.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap">
                    Học
                  </Link>
                </div>
              ))}
              {todayPlan.practice.map((item, index) => (
                <div key={`practice-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                    <IconQuiz />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.estimatedMinutes} phút — {item.reason}</p>
                  </div>
                  <Link href={`/quiz/${item.id}`} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap">
                    Quiz
                  </Link>
                </div>
              ))}
              {todayPlan.labs.map((item, index) => (
                <div key={`lab-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                    <IconLab />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.estimatedMinutes} phút — {item.reason}</p>
                  </div>
                  <Link href={`/labs/${item.id}`} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap">
                    Lab
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mastery Map */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                  <IconMap />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Bản đồ kiến thức</h2>
              </div>
              <Link href="/learning-path" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                Lộ trình <IconArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {masteryMap.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate pr-2">{item.topic}</span>
                    <span className={`text-sm font-semibold whitespace-nowrap ${
                      item.score >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      item.score >= 40 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>{item.score}%</span>
                  </div>
                  <Progress value={item.score} size="sm" color={item.score >= 70 ? 'emerald' : item.score >= 40 ? 'amber' : 'red'} />
                  {item.weakTopics.length > 0 && item.score < 65 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Yếu: {item.weakTopics.slice(0, 2).join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weakest Topics */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <IconTarget />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Điểm yếu cần cải thiện</h2>
              </div>
              <Link href="/mistakes" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                Chi tiết <IconArrowRight />
              </Link>
            </div>
            <div className="space-y-3">
              {weakestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{topic.topic}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ôn: {topic.weakTopics.slice(0, 2).join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg text-center">
                      Học bài
                    </Link>
                    <Link href="/mistakes" className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg text-center">
                      Luyện sai
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mistakes */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <IconChart />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Câu sai gần đây</h2>
              </div>
              <Badge variant="amber">{mockMistakes.length} câu</Badge>
            </div>
            <div className="space-y-2.5">
              {recentMistakes.map((mistake) => (
                <div key={mistake.id} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-l-2 border-amber-400">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-1.5">{mistake.question}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="default" size="sm">{mistake.topic}</Badge>
                    <span className="text-slate-500 dark:text-slate-400">
                      Sai {mistake.timesWrong}x — {mistake.errorType === 'concept' ? 'Nhầm khái niệm' : mistake.errorType === 'calculation' ? 'Tính toán' : mistake.errorType === 'terminology' ? 'Thuật ngữ' : 'Ứng dụng'}
                    </span>
                  </div>
                </div>
              ))}
              <Link href="/mistakes" className="block text-center py-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                Xem tất cả <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="min-w-0 space-y-5">
          {/* Portfolio Progress */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                <IconPortfolio />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Portfolio</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <IconBook />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{stats.totalLessonsCompleted}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Bài học</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                    <IconCheck />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{stats.totalQuizzesTaken}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quiz — TB {stats.averageQuizScore}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                    <IconLab />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{stats.totalLabsCompleted}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Labs hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/portfolio" className="mt-4 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Xem Portfolio
            </Link>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <IconBadge />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Huy hiệu</h2>
              </div>
              <Badge variant="violet">{user.badges.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badgeId) => {
                const badgeLabels: Record<string, string> = {
                  'first-lesson': 'BT',
                  'streak-3': 'ST',
                  'perfect-quiz': 'PQ',
                  'early-bird': 'EB',
                };
                return (
                  <div key={badgeId} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full" title={badgeId}>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{badgeLabels[badgeId] || 'BD'}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/portfolio" className="mt-3 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
              Tất cả huy hiệu <IconArrowRight />
            </Link>
          </div>

          {/* Flashcards */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                  <IconFlashcard />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">Flashcards</h2>
              </div>
              <Badge variant="amber">{flashcardDue} cần ôn</Badge>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">{flashcardDue}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Thẻ cần ôn hôm nay</p>
            </div>
            <Link href="/flashcards" className="mt-2 block text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Ôn Flashcards
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <IconSparkle />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Hành động nhanh</h2>
            </div>
            <div className="space-y-2">
              <Link href="/ai-tutor" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-blue-600 font-bold text-xs w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">AI</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">AI Tutor</span>
              </Link>
              <Link href="/learning-path" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-violet-600 font-bold text-xs w-6 h-6 rounded bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">30</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Lộ trình 30/60/90</span>
              </Link>
              <Link href="/reports" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-emerald-600 font-bold text-xs w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">R</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Báo cáo học tập</span>
              </Link>
              <Link href="/exams" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-amber-600 font-bold text-xs w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">E</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Thi thử</span>
              </Link>
            </div>
          </div>

          {/* Study Time */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <IconClock />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Thời gian học</h2>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-0.5">{stats.timeSpentLearning} giờ</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tổng thời gian học tập</p>
          </div>
        </div>
      </div>
    </div>
  );
}
