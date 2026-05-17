// ==========================================
// Portfolio Page - Tin12 Pro Cánh Diều
// Enhanced portfolio with projects, badges, skills, and public share mock
// ==========================================

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, Badge, Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockProjects, mockBadges, XP_LEVELS } from '@/content/demo';
import { badges as allBadges } from '@/content/badges';

type PortfolioTab = 'overview' | 'badges' | 'projects' | 'skills';

const PROJECT_TYPE_ICONS: Record<string, string> = {
  web: '🌐',
  data: '📊',
  network: '🌍',
  ai: '🤖',
};

const PROJECT_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  graded: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('overview');

  const user = mockUser;
  const stats = mockStats;
  const projects = mockProjects;
  const earnedBadges = mockBadges;

  // Level info
  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const levelProgress = nextLevel
    ? Math.round(((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)
    : 100;

  // All badge icons
  const badgeIcons: Record<string, string> = {
    'first-lesson': '🎯',
    'streak-3': '🔥',
    'perfect-quiz': '💯',
    'early-bird': '🌅',
  };

  // Skills from completed lessons
  const skills = [
    { name: 'HTML5', level: 75, category: 'Web Development' },
    { name: 'CSS3', level: 70, category: 'Web Development' },
    { name: 'Machine Learning', level: 65, category: 'AI & Data' },
    { name: 'Networking', level: 55, category: 'Infrastructure' },
    { name: 'Python', level: 60, category: 'Programming' },
    { name: 'Data Analysis', level: 58, category: 'AI & Data' },
  ];

  const tabs = [
    { id: 'overview' as PortfolioTab, label: 'Tổng quan', icon: '📊' },
    { id: 'badges' as PortfolioTab, label: 'Huy hiệu', icon: '🏅' },
    { id: 'projects' as PortfolioTab, label: 'Dự án', icon: '💼' },
    { id: 'skills' as PortfolioTab, label: 'Kỹ năng', icon: '📈' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {currentLevel.icon} {currentLevel.title} • {user.xp.toLocaleString()} XP
            </p>
          </div>
        </div>

        {/* Level Progress */}
        {nextLevel && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Level {user.level} → Level {nextLevel.level}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {levelProgress}%
              </span>
            </div>
            <Progress value={levelProgress} size="md" color="blue" />
          </div>
        )}
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalLessonsCompleted}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Bài học</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{stats.totalQuizzesTaken}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Quiz</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalLabsCompleted}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Labs</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.totalExamsTaken}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Kỳ thi</p>
            </Card>
          </div>

          {/* Recent Badges */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Huy hiệu gần đây</h2>
              <button
                onClick={() => setActiveTab('badges')}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Xem tất cả →
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full"
                >
                  <span className="text-xl">{badgeIcons[badge.id] || '🏅'}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{badge.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Projects */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Dự án gần đây</h2>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Xem tất cả →
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((project) => (
                <div key={project.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{PROJECT_TYPE_ICONS[project.type]}</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{project.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={project.status === 'graded' ? 'emerald' : project.status === 'submitted' ? 'blue' : 'default'} size="sm">
                          {project.status === 'draft' ? 'Nháp' : project.status === 'submitted' ? 'Đã nộp' : `Điểm: ${project.grade}`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Share Mock */}
          <Card className="bg-gradient-to-r from-blue-600/10 to-violet-600/10 border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">🔗 Chia sẻ Portfolio</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Tạo link công khai để chia sẻ thành tích học tập của bạn
                </p>
              </div>
              <Button variant="primary" size="sm">
                Tạo link
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Unlocked Badges */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              🏅 Huy hiệu đã đạt ({earnedBadges.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl">
                    {badgeIcons[badge.id] || '🏅'}
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">{badge.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">+{badge.xpReward} XP</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Locked Badges */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              🔒 Huy hiệu cần đạt ({allBadges.length - earnedBadges.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allBadges.slice(earnedBadges.length, earnedBadges.length + 8).map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center opacity-50"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center justify-center text-3xl grayscale">
                    {badgeIcons[badge.id] || '🏅'}
                  </div>
                  <p className="font-semibold text-slate-500 dark:text-slate-400">{badge.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{badge.criteria}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
              Hoàn thành thêm bài học, quiz, và lab để mở khóa huy hiệu mới!
            </p>
          </Card>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Project Templates */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              📝 Mẫu dự án mới
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: 'web', title: 'Trang Web Cá Nhân', icon: '🌐', lessons: 'HTML & CSS' },
                { type: 'data', title: 'Phân Tích Dữ Liệu', icon: '📊', lessons: 'Python & Data' },
                { type: 'network', title: 'Mô phỏng Mạng', icon: '🌍', lessons: 'Networking' },
              ].map((template) => (
                <button
                  key={template.type}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-left"
                >
                  <span className="text-3xl mb-2 block">{template.icon}</span>
                  <p className="font-medium text-slate-900 dark:text-white">{template.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cần: {template.lessons}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Submitted Projects */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              💼 Dự án của bạn ({projects.length})
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-start gap-4">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{project.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{project.description}</p>
                        </div>
                        <Badge className={PROJECT_STATUS_COLORS[project.status]} size="sm">
                          {project.status === 'draft' ? 'Nháp' : project.status === 'submitted' ? 'Đã nộp' : `${project.grade}/10`}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="default" size="sm">{PROJECT_TYPE_ICONS[project.type]} {project.type}</Badge>
                        {project.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" size="sm">{skill}</Badge>
                        ))}
                      </div>
                      {project.submittedAt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          Nộp: {project.submittedAt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Skill Evidence */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              📈 Kỹ năng đã chứng minh
            </h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-white">{skill.name}</span>
                      <Badge variant="default" size="sm">{skill.category}</Badge>
                    </div>
                    <span className={`font-semibold ${
                      skill.level >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      skill.level >= 50 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress
                    value={skill.level}
                    size="md"
                    color={skill.level >= 70 ? 'emerald' : skill.level >= 50 ? 'amber' : 'red'}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {skill.level >= 70 && '✓ Đã nắm vững - Có thể dạy lại cho người khác'}
                    {skill.level >= 50 && skill.level < 70 && '○ Cần thực hành thêm để thành thạo'}
                    {skill.level < 50 && '↑ Nên học thêm để cải thiện'}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Evidence Links */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              📋 Bằng chứng kỹ năng
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Hoàn thành bài học</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stats.totalLessonsCompleted} bài học</p>
                </div>
                <Badge variant="emerald" size="sm">✓ Đã xác minh</Badge>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Quiz đã làm</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stats.totalQuizzesTaken} quiz, TB {stats.averageQuizScore}%</p>
                </div>
                <Badge variant="emerald" size="sm">✓ Đã xác minh</Badge>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Lab đã hoàn thành</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stats.totalLabsCompleted} labs thực hành</p>
                </div>
                <Badge variant="emerald" size="sm">✓ Đã xác minh</Badge>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Điểm thi thử</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stats.totalExamsTaken} kỳ thi</p>
                </div>
                <Badge variant="emerald" size="sm">✓ Đã xác minh</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
