// ==========================================
// Reports Page - Tin12 Pro Cánh Diều
// Study reports with progress visualization
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockMasteryMap, mockWeeklyReports, mockExamHistory, XP_LEVELS, XP_RULES, type WeeklyReport } from '@/content/demo';

type ReportTab = 'summary' | 'weekly' | 'topics' | 'xp';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('summary');

  const user = mockUser;
  const stats = mockStats;
  const masteryMap = mockMasteryMap;

  // Current level info
  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);

  // Weakest/strongest topics
  const sortedByScore = [...masteryMap].sort((a, b) => a.score - b.score);
  const weakestTopics = sortedByScore.slice(0, 3);
  const strongestTopics = sortedByScore.reverse().slice(0, 3);

  const tabs = [
    { id: 'summary' as ReportTab, label: 'Tổng quan', icon: '📊' },
    { id: 'weekly' as ReportTab, label: 'Báo cáo tuần', icon: '📅' },
    { id: 'topics' as ReportTab, label: 'Theo chủ đề', icon: '📚' },
    { id: 'xp' as ReportTab, label: 'XP & Level', icon: '⚡' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              📊 Báo cáo học tập
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Theo dõi tiến độ và hiệu suất học tập của bạn
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            🖨️ In báo cáo
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalLessonsCompleted}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Bài học</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{stats.totalQuizzesTaken}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Quiz đã làm</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalLabsCompleted}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Labs hoàn thành</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.timeSpentLearning}h</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Giờ học</p>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tổng quan hiệu suất</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300">Điểm TB Quiz</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.averageQuizScore}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300">Sẵn sàng thi</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.examReadiness}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300">Streak hiện tại</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.streak} ngày</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300">Cấp độ hiện tại</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {currentLevel.icon} {currentLevel.title}
                </span>
              </div>
            </div>
          </Card>

          {/* Exam History */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Lịch sử thi thử</h2>
            <div className="space-y-3">
              {mockExamHistory.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{exam.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{exam.completedAt} • {exam.timeSpent} phút</p>
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
            <Link href="/exams" className="mt-4 block text-center py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Làm thêm đề thi →
            </Link>
          </Card>
        </div>
      )}

      {/* Weekly Tab */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          {mockWeeklyReports.map((report: WeeklyReport, index: number) => (
            <Card key={index}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Tuần: {report.weekStart} → {report.weekEnd}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {report.totalStudyTime} phút học • {report.streakMaintained ? '🔥 Streak maintained' : 'Streak broken'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">+{report.xpEarned} XP</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{report.lessonsCompleted}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bài học</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{report.quizzesTaken}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quiz</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{report.averageQuizScore}%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Điểm TB</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{report.labsCompleted}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Labs</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  {report.examTaken ? (
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{report.examScore}/10</p>
                  ) : (
                    <p className="text-xl font-bold text-slate-400">-</p>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">Điểm thi</p>
                </div>
              </div>

              {/* Weak/Strong Topics */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Cần cải thiện:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.weakestTopics.map((topic, i) => (
                      <Badge key={i} variant="red" size="sm">{topic}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Điểm mạnh:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.strongestTopics.map((topic, i) => (
                      <Badge key={i} variant="emerald" size="sm">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Topics Tab */}
      {activeTab === 'topics' && (
        <div className="space-y-6">
          {/* Weakest Topics */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-red-500">⚠️</span> Chủ đề cần cải thiện
            </h2>
            <div className="space-y-4">
              {weakestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{topic.topic}</span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                  </div>
                  <Progress value={topic.score} size="sm" color="red" className="mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Yếu: {topic.weakTopics.join(', ')}
                  </p>
                  <Link
                    href={`/lessons/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Học bài liên quan →
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Strongest Topics */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-500">💪</span> Chủ đề nắm vững
            </h2>
            <div className="space-y-4">
              {strongestTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{topic.topic}</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{topic.score}%</span>
                  </div>
                  <Progress value={topic.score} size="sm" color="emerald" />
                </div>
              ))}
            </div>
          </Card>

          {/* All Topics */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tất cả chủ đề</h2>
            <div className="space-y-3">
              {masteryMap.map((topic, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex-1">
                    <span className="font-medium text-slate-900 dark:text-white">{topic.topic}</span>
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
          </Card>
        </div>
      )}

      {/* XP Tab */}
      {activeTab === 'xp' && (
        <div className="space-y-6">
          {/* Current Level */}
          <Card className="bg-gradient-to-r from-blue-600/10 to-violet-600/10 border-blue-500/20">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                {user.level}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentLevel.icon} {currentLevel.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Level {user.level} • {user.xp.toLocaleString()} XP
                </p>
                {nextLevel && (
                  <>
                    <Progress value={((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100} size="md" color="blue" className="mt-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Còn {(nextLevel.minXP - user.xp).toLocaleString()} XP để đạt Level {nextLevel.level} - {nextLevel.title}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* XP Rules */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">⚡ Quy tắc tích XP</h2>
            <div className="space-y-3">
              {Object.entries(XP_RULES).map(([activity, rules]) => (
                <div key={activity} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white capitalize">{activity}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {'base' in rules && `Base: ${(rules as { base: number }).base} XP`}
                      {'bonuses' in rules && Array.isArray((rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses) && (rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses.length > 0 && (
                        <span> • Bonus: {(rules as unknown as { bonuses: { threshold: number; bonus: number }[] }).bonuses.map((b) => `${b.threshold}%+ → +${b.bonus} XP`).join(', ')}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">🔥 Bonus Streak</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Streak {XP_RULES.streakBonus.threshold}+ ngày → +{XP_RULES.streakBonus.bonus} XP mỗi ngày
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* XP History */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">📜 Lịch sử XP gần đây</h2>
            <div className="space-y-2">
              {[
                { action: 'Hoàn thành bài: Kiến trúc máy tính', xp: 85, date: 'Hôm nay' },
                { action: 'Làm quiz: AI & Machine Learning', xp: 120, date: 'Hôm nay' },
                { action: 'Hoàn thành lab: HTML cơ bản', xp: 150, date: 'Hôm qua' },
                { action: 'Streak bonus', xp: 20, date: 'Hôm qua' },
                { action: 'Hoàn thành bài: Mạng máy tính', xp: 75, date: '2 ngày trước' },
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="text-slate-900 dark:text-white">{entry.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{entry.date}</p>
                  </div>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Print-only content */}
      <div className="hidden print:block mt-8 p-4 border-t">
        <p className="text-sm text-slate-500">Báo cáo được tạo ngày {new Date().toLocaleDateString('vi-VN')} - Tin12 Pro Cánh Diều</p>
      </div>
    </div>
  );
}