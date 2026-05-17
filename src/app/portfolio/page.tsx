// ==========================================
// Portfolio Page - Tin12 Pro Canh Diep
// Premium portfolio with projects, badges, skills
// ==========================================

'use client';

import { useState } from 'react';
import { Progress, Button } from '@/components/ui';
import { mockUser, mockStats, mockProjects, mockBadges, XP_LEVELS } from '@/content/demo';

type PortfolioTab = 'overview' | 'badges' | 'projects' | 'skills';

const IconChart = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconBadge = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.643.163 1.285.327 1.927.487a1.5 1.5 0 010 2.914c-.642.16-1.284.324-1.927.486-.16.043-.328.083-.49.125m8.734 0a1.5 1.5 0 010 2.914c.643.16 1.285.327 1.927.486.16.043.328.083.49.125M6.633 10.5c.643.163 1.285.327 1.927.487a1.5 1.5 0 010 2.914c-.642.16-1.284.324-1.927.486-.16.043-.328.083-.49.125m8.734 0c.161.043.323.083.49.125M12 18.75h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const IconTrend = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const IconBook = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75c0 .422-.183.81-.477 1.122l-.855.855c-.877.982-1.52 2.11-1.52 3.378v.75c0 1.268.643 2.396 1.52 3.378l.855.855c.3.3.477.7.477 1.122v.75c0 .422.183.81.477 1.122l.855.855c.877.982 1.52 2.11 1.52 3.378v.75c0 1.268-.643 2.396-1.52 3.378l-.855.855c-.3.3-.477.7-.477 1.122v.75a2.25 2.25 0 01-.659 1.591l-4.655 3.385a2.25 2.25 0 01-2.659 0l-4.655-3.385A2.25 2.25 0 013 19.5v-.75c0-.422.183-.81.477-1.122l.855-.855C4.643 16.396 5 15.268 5 14v-.75c0-.422.183-.81.477-1.122l.855-.855C7.357 11.063 8 9.935 8 8.622v-.75c0-.422-.183-.81-.477-1.122l-.855-.855C6.643 5.936 6 4.808 6 3.5v-.75c0-.422.183-.81.477-1.122l.855-.855C8.643 1.004 7.5 1 7.5 1H4.5C3.12 1 2 2.12 2 3.5v.75c0 .422.183.81.477 1.122l.855.855C3.357 6.063 4 7.191 4 8.5v.75c0 .422-.183.81-.477 1.122l-.855.855C2.643 11.396 2 12.524 2 13.875v.75" />
  </svg>
);

const IconLink = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const IconStar = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const TABS_CONFIG = [
  { id: 'overview' as PortfolioTab, label: 'Tong quan', icon: IconChart },
  { id: 'badges' as PortfolioTab, label: 'Hieu hieu', icon: IconBadge },
  { id: 'projects' as PortfolioTab, label: 'Du an', icon: IconBriefcase },
  { id: 'skills' as PortfolioTab, label: 'Ky nang', icon: IconTrend },
];

const TAB_ABBREV: Record<PortfolioTab, string> = {
  overview: 'TG',
  badges: 'HH',
  projects: 'DA',
  skills: 'KN',
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  data: 'Data',
  network: 'Mang',
  ai: 'AI',
};

const PROJECT_STATUS_LABELS: Record<string, string> = {
  draft: 'Nhap',
  submitted: 'Da noi',
  graded: 'Diem',
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('overview');

  const user = mockUser;
  const stats = mockStats;
  const projects = mockProjects;
  const earnedBadges = mockBadges;

  const currentLevel = XP_LEVELS.find(l => l.level === user.level) || XP_LEVELS[XP_LEVELS.length - 1];
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const levelProgress = nextLevel
    ? Math.round(((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)
    : 100;

  const skills = [
    { name: 'HTML5', level: 75, category: 'Web Development' },
    { name: 'CSS3', level: 70, category: 'Web Development' },
    { name: 'Machine Learning', level: 65, category: 'AI & Data' },
    { name: 'Networking', level: 55, category: 'Infrastructure' },
    { name: 'Python', level: 60, category: 'Programming' },
    { name: 'Data Analysis', level: 58, category: 'AI & Data' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-xs font-bold">
                {user.level}
              </span>
              {currentLevel.title} — {user.xp.toLocaleString()} XP
            </p>
          </div>
        </div>

        {nextLevel && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Level {user.level} → Level {nextLevel.level}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} size="md" color="blue" />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1.5 mb-6">
        <div className="flex flex-wrap gap-1">
          {TABS_CONFIG.map(tab => (
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
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bai hoc', value: stats.totalLessonsCompleted, icon: IconBook, color: 'blue' },
              { label: 'Quiz', value: stats.totalQuizzesTaken, icon: IconCheck, color: 'violet' },
              { label: 'Labs', value: stats.totalLabsCompleted, icon: IconTarget, color: 'emerald' },
              { label: 'Ki thi', value: stats.totalExamsTaken, icon: IconStar, color: 'amber' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
                <div className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                  stat.color === 'violet' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' :
                  stat.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                }`}>
                  <stat.icon />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Badges */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Huy hieu gan day</h2>
              <button onClick={() => setActiveTab('badges')} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                Xem tat ca <IconArrowRight />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.slice(0, 4).map((badge) => (
                <div key={badge.id} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {badge.name.charAt(0)}
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Du an gan day</h2>
              <button onClick={() => setActiveTab('projects')} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                Xem tat ca <IconArrowRight />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((project) => (
                <div key={project.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {PROJECT_TYPE_LABELS[project.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{project.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          project.status === 'graded' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          project.status === 'submitted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {PROJECT_STATUS_LABELS[project.status]}{project.status === 'graded' ? `: ${project.grade}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Mock */}
          <div className="bg-gradient-to-r from-blue-600/5 to-violet-600/5 border border-blue-500/20 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <IconLink />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Chia se Portfolio</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tao link cong khai de chia se thanh tich</p>
                </div>
              </div>
              <Button variant="primary" size="sm">
                Tao link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-5">
          {/* Unlocked Badges */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <IconBadge />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Huy hieu da dat ({earnedBadges.length})</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                    {badge.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{badge.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">+{badge.xpReward} XP</p>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-400">
                <IconBadge />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Huy hieu can dat</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center opacity-50">
                  <div className="w-14 h-14 mx-auto mb-3 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-xl font-bold">
                    ?
                  </div>
                  <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Dang khoa</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Hoan thanh bai hoc de mo khoa</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-5">
          {/* Project Templates */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <IconBook />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Mau du an moi</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: 'web', title: 'Trang Web Ca Nhan', lessons: 'HTML & CSS' },
                { type: 'data', title: 'Phan Tich Du Lieu', lessons: 'Python & Data' },
                { type: 'network', title: 'Mo phong Mang', lessons: 'Networking' },
              ].map((template) => (
                <button
                  key={template.type}
                  className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-left"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm mb-3 block">
                    {template.type.toUpperCase()}
                  </span>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{template.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Can: {template.lessons}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submitted Projects */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                <IconBriefcase />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Du an cua ban ({projects.length})</h2>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                      {PROJECT_TYPE_LABELS[project.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{project.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{project.description}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-xs font-medium flex-shrink-0 ${
                          project.status === 'graded' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          project.status === 'submitted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {PROJECT_STATUS_LABELS[project.status]}{project.status === 'graded' ? `: ${project.grade}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                          {project.type}
                        </span>
                        {project.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      {project.submittedAt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          Noi: {project.submittedAt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-5">
          {/* Skills Evidence */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <IconTrend />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Ky nang da chung minh</h2>
            </div>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-white text-sm">{skill.name}</span>
                      <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs">
                        {skill.category}
                      </span>
                    </div>
                    <span className={`font-semibold text-sm ${
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
                    {skill.level >= 70 && 'Da nam vung - Co the day lai cho nguoi khac'}
                    {skill.level >= 50 && skill.level < 70 && 'Can thuc hanh them de thanh thao'}
                    {skill.level < 50 && 'Nen hoc them de cai thien'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Links */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                <IconCheck />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Bang chung ky nang</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Hoan thanh bai hoc', value: `${stats.totalLessonsCompleted} bai hoc`, verified: true },
                { label: 'Quiz da lam', value: `${stats.totalQuizzesTaken} quiz, TB ${stats.averageQuizScore}%`, verified: true },
                { label: 'Lab da hoan thanh', value: `${stats.totalLabsCompleted} labs thuc hanh`, verified: true },
                { label: 'Diem thi thu', value: `${stats.totalExamsTaken} ki thi`, verified: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.value}</p>
                  </div>
                  {item.verified && (
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium flex items-center gap-1">
                      <IconCheck /> Da xac minh
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
