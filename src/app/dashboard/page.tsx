// ==========================================
// Dashboard Page - Tin12 Pro Cánh Diều
// Enhanced student dashboard with progress, stats, today plan, mastery, gamification
// ==========================================

'use client';

import Link from 'next/link';
import { Card, Badge, Progress, StatCard } from '@/components/ui';
import { mockUser, mockMasteryMap, mockTodayPlan, mockStats, mockMistakes, mockFlashcards, XP_LEVELS } from '@/content/demo';

export default function DashboardPage() {
  const user = mockUser;
  const masteryMap = mockMasteryMap;
  const todayPlan = mockTodayPlan;
  const stats = mockStats;

  // Get current level info
  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const levelProgress = nextLevel
    ? Math.round(((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)
    : 100;

  // Get weakest topics
  const weakestTopics = masteryMap
    .filter(m => m.score < 65)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Get flashcard due count
  const flashcardDue = mockFlashcards.length;

  // Get exam readiness
  const examReadiness = stats.examReadiness;

  // Get recent mistakes
  const recentMistakes = mockMistakes.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Chào buổi sáng, {user.name.split(' ').pop()}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {currentLevel.icon} {currentLevel.title} • Streak {user.streak} ngày
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {todayPlan.reason}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Streak"
          value={`${user.streak} ngày`}
          change={1}
          changeLabel="/ngày"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          }
        />
        <StatCard
          label="XP"
          value={user.xp.toLocaleString()}
          change={50}
          changeLabel="XP"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          label="Cấp độ"
          value={user.level}
          changeLabel={currentLevel.title}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674a1 1 0 001.465 0l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
        <StatCard
          label="Bài hoàn thành"
          value={stats.totalLessonsCompleted}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Sẵn sàng thi"
          value={`${examReadiness}%`}
          change={examReadiness >= 70 ? 5 : -3}
          changeLabel="%"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
      </div>

      {/* Level Progress Banner */}
      {nextLevel && (
        <Card className="mb-6 bg-gradient-to-r from-blue-600/10 to-violet-600/10 border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              {user.level}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Level {user.level} - {currentLevel.title}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {user.xp} / {nextLevel.minXP} XP
                </span>
              </div>
              <Progress value={levelProgress} size="md" color="blue" className="mb-1" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Còn {(nextLevel.minXP - user.xp).toLocaleString()} XP để đạt Level {nextLevel.level} - {nextLevel.title}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Plan */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📅</span> Kế hoạch hôm nay
              </h2>
              <Badge variant="blue">{todayPlan.lessons.length + todayPlan.practice.length + todayPlan.labs.length} bài</Badge>
            </div>
            <div className="space-y-3">
              {todayPlan.lessons.map((item, index) => (
                <div key={`lesson-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-lg">📖</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.estimatedMinutes} phút • {item.reason}
                    </p>
                  </div>
                  <Link
                    href={`/lessons/${item.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    Học ngay
                  </Link>
                </div>
              ))}
              {todayPlan.practice.map((item, index) => (
                <div key={`practice-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-violet-100 dark:bg-violet-900/30">
                    <span className="text-lg">✏️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.estimatedMinutes} phút • {item.reason}
                    </p>
                  </div>
                  <Link
                    href={`/quiz/${item.id}`}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    Làm quiz
                  </Link>
                </div>
              ))}
              {todayPlan.labs.map((item, index) => (
                <div key={`lab-${index}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                    <span className="text-lg">🛠️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.estimatedMinutes} phút • {item.reason}
                    </p>
                  </div>
                  <Link
                    href={`/labs/${item.id}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    Thực hành
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Mastery Map */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🗺️</span> Bản đồ kiến thức
              </h2>
              <Link href="/learning-path" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Xem lộ trình →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {masteryMap.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-2">
                      {item.topic}
                    </span>
                    <span className={`text-sm font-semibold whitespace-nowrap ${
                      item.score >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      item.score >= 40 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {item.score}%
                    </span>
                  </div>
                  <Progress
                    value={item.score}
                    size="sm"
                    color={
                      item.score >= 70 ? 'emerald' :
                      item.score >= 40 ? 'amber' :
                      'red'
                    }
                  />
                  {item.weakTopics.length > 0 && item.score < 65 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      Yếu: {item.weakTopics.slice(0, 2).join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Weakest Topics & Recommendations */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚠️</span> Điểm yếu cần cải thiện
              </h2>
              <Link href="/mistakes" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Xem chi tiết →
              </Link>
            </div>
            <div className="space-y-3">
              {weakestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{topic.topic}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Cần ôn: {topic.weakTopics.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Mastery</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg text-center"
                    >
                      Học bài
                    </Link>
                    <Link
                      href="/mistakes"
                      className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg text-center"
                    >
                      Luyện câu sai
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Mistakes */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📝</span> Câu sai gần đây
              </h2>
              <Badge variant="amber">{mockMistakes.length} câu</Badge>
            </div>
            <div className="space-y-3">
              {recentMistakes.map((mistake) => (
                <div key={mistake.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-amber-400">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{mistake.question}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="default" size="sm">{mistake.topic}</Badge>
                    <span className="text-slate-500 dark:text-slate-400">
                      Sai {mistake.timesWrong}x • {mistake.errorType === 'concept' ? 'Nhầm khái niệm' : mistake.errorType === 'calculation' ? 'Tính toán' : mistake.errorType === 'terminology' ? 'Thuật ngữ' : 'Ứng dụng'}
                    </span>
                  </div>
                </div>
              ))}
              <Link
                href="/mistakes"
                className="block text-center py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Xem tất cả câu sai →
              </Link>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Portfolio Progress */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>💼</span> Portfolio
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{stats.totalLessonsCompleted} Bài học</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hoàn thành</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{stats.totalQuizzesTaken} Quiz</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Điểm TB: {stats.averageQuizScore}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔬</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{stats.totalLabsCompleted} Labs</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/portfolio" className="mt-4 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              Xem Portfolio
            </Link>
          </Card>

          {/* Recent Badges */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🏅</span> Huy hiệu
              </h2>
              <Badge variant="violet">{user.badges.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badgeId) => {
                const badgeIcons: Record<string, string> = {
                  'first-lesson': '🎯',
                  'streak-3': '🔥',
                  'perfect-quiz': '💯',
                  'early-bird': '🌅',
                };
                return (
                  <div
                    key={badgeId}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-full"
                    title={badgeId}
                  >
                    <span>{badgeIcons[badgeId] || '🏅'}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 capitalize">
                      {badgeId.replace(/-/g, ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link href="/portfolio" className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Xem tất cả huy hiệu →
            </Link>
          </Card>

          {/* Flashcards Due */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🃏</span> Flashcards
              </h2>
              <Badge variant="amber">{flashcardDue} cần ôn</Badge>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{flashcardDue}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Thẻ cần ôn tập hôm nay</p>
            </div>
            <Link
              href="/flashcards"
              className="mt-2 block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Ôn Flashcards ngay
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>⚡</span> Hành động nhanh
            </h2>
            <div className="space-y-2">
              <Link href="/ai-tutor" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">🤖</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Hỏi AI Tutor</span>
              </Link>
              <Link href="/learning-path" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">🗺️</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Xem lộ trình 30/60/90</span>
              </Link>
              <Link href="/reports" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">📊</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Báo cáo học tập</span>
              </Link>
              <Link href="/exams" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">📝</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Thi thử</span>
              </Link>
            </div>
          </Card>

          {/* Study Time */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span>⏱️</span> Thời gian học
            </h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.timeSpentLearning} giờ</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tổng thời gian học tập</p>
          </Card>
        </div>
      </div>
    </div>
  );
}