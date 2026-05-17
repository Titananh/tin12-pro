// ==========================================
// Academy Cockpit Mockups
// CSS/HTML product mockups for landing page
// No external images - pure CSS/HTML components
// ==========================================

'use client';
import React from 'react';

// ============ DASHBOARD MOCKUP ============
export function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-slate-400">dashboard.tin12.vn</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Điểm trung bình</div>
          <div className="text-xl font-bold text-emerald-400">8.2</div>
          <div className="text-xs text-emerald-400">+0.5 thang này</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Ngày streak</div>
          <div className="text-xl font-bold text-violet-400">14</div>
          <div className="text-xs text-violet-400">Kỷ lục: 21</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">XP</div>
          <div className="text-xl font-bold text-blue-400">2,450</div>
          <div className="text-xs text-blue-400">Cấp 12</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Tiến độ học tập</span>
          <span className="text-blue-400">68%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-[68%] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </div>
      </div>

      {/* Skill badges */}
      <div className="flex flex-wrap gap-2">
        {['Kiến trúc', 'Mạng', 'AI', 'HTML'].map((skill) => (
          <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
            {skill}
          </span>
        ))}
        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">+3</span>
      </div>
    </div>
  );
}

// ============ EXAM READINESS MOCKUP ============
export function ExamReadinessMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Đề thi thử số 3</span>
        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full">45 phút</span>
      </div>

      {/* Question grid */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {Array.from({ length: 20 }, (_, i) => {
          const states = ['bg-emerald-500', 'bg-blue-500', 'bg-slate-600', 'bg-red-500'];
          return (
            <div key={i} className={`aspect-square rounded ${states[i % 4]}`} title={`Câu ${i + 1}`} />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500 rounded" />
          <span className="text-slate-400">Đúng</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-slate-400">Đang xem</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-slate-600 rounded" />
          <span className="text-slate-400">Chưa làm</span>
        </div>
      </div>

      {/* Score preview */}
      <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-white">7.5</div>
          <div className="text-xs text-slate-400">Điểm dự kiến</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-emerald-400">14/20 đúng</div>
          <div className="text-xs text-slate-400">Thời gian: 32p</div>
        </div>
      </div>
    </div>
  );
}

// ============ LAB PREVIEW MOCKUP ============
export function LabPreviewMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 ${className}`}>
      {/* Lab header */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded" />
          <span className="text-sm font-medium text-white">Lab: Tạo trang web Portfolio</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-slate-600 rounded-full" />
          <div className="w-3 h-3 bg-slate-600 rounded-full" />
          <div className="w-3 h-3 bg-slate-600 rounded-full" />
        </div>
      </div>

      {/* Code editor preview */}
      <div className="p-4 font-mono text-sm">
        <div className="text-slate-500">&lt;!DOCTYPE html&gt;</div>
        <div className="text-violet-400">&lt;html&gt;</div>
        <div className="pl-4 text-blue-400">&lt;head&gt;</div>
        <div className="pl-8 text-slate-300">  &lt;title&gt;My Portfolio&lt;/title&gt;</div>
        <div className="pl-8 text-slate-300">  &lt;style&gt;</div>
        <div className="pl-12 text-emerald-400">  body {'{'} background: #0a0a0f; {'}'}</div>
        <div className="pl-8 text-slate-300">  &lt;/style&gt;</div>
        <div className="pl-4 text-blue-400">&lt;/head&gt;</div>
        <div className="pl-4 text-blue-400">&lt;body&gt;</div>
        <div className="pl-8 text-slate-300">  &lt;h1&gt;Xin chào&lt;/h1&gt;</div>
        <div className="pl-4 text-blue-400">&lt;/body&gt;</div>
        <div className="text-violet-400">&lt;/html&gt;</div>
      </div>

      {/* Task list */}
      <div className="px-4 pb-4">
        <div className="text-xs text-slate-400 mb-2">Nhiệm vụ:</div>
        <div className="space-y-1">
          {[
            { done: true, text: 'Tạo cấu trúc HTML' },
            { done: true, text: 'Thêm CSS cơ bản' },
            { done: false, text: 'Hoàn thiện layout' },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className={`w-4 h-4 rounded border ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'} flex items-center justify-center`}>
                {task.done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={task.done ? 'text-slate-400 line-through' : 'text-slate-200'}>{task.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ AI TUTOR MOCKUP ============
export function AITutorMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-white">AI Tutor</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Đang trực tuyến
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="space-y-3 mb-4">
        <div className="bg-slate-700/50 rounded-lg rounded-tl-none p-3">
          <p className="text-sm text-slate-200">Chào em! Mình đang gặp khó về phần kiến trúc máy tính. Phần tính toán địa chỉ bộ nhớ...</p>
        </div>
        <div className="bg-blue-500/20 rounded-lg rounded-tr-none p-3 border border-blue-500/30">
          <p className="text-sm text-slate-200">Để tính địa chỉ ô nhớ, em cần xác định:</p>
          <ol className="mt-2 text-sm text-slate-300 list-decimal list-inside space-y-1">
            <li>Số bit địa chỉ</li>
            <li>Dung lượng mỗi ô nhớ</li>
            <li>Cách chia dải địa chỉ</li>
          </ol>
          <p className="mt-2 text-sm text-blue-300">Ví dụ: với 20 bit địa chỉ và ô nhớ 1 byte, ta có 2²⁰ = 1MB không gian.</p>
        </div>
      </div>

      {/* Input preview */}
      <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-sm text-slate-500">Hỏi AI Tutor...</span>
        <svg className="w-4 h-4 text-blue-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
    </div>
  );
}

// ============ SKILL MAP MOCKUP ============
export function SkillMapMockup({ className = '' }: { className?: string }) {
  const skills = [
    { name: 'Kiến trúc máy tính', progress: 85, color: 'emerald' },
    { name: 'Mạng máy tính', progress: 60, color: 'blue' },
    { name: 'AI & Machine Learning', progress: 35, color: 'violet' },
    { name: 'Đạo đức số', progress: 90, color: 'amber' },
    { name: 'HTML & CSS', progress: 45, color: 'cyan' },
    { name: 'Thuật toán', progress: 20, color: 'pink' },
  ];

  return (
    <div className={`bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white">Bản đồ kỹ năng</span>
        <span className="text-xs text-slate-400">Học kỳ 2</span>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{skill.name}</span>
              <span className={`text-${skill.color}-400`}>{skill.progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${skill.color}-500 rounded-full`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ FLASHCARD MOCKUP ============
export function FlashcardMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white">Flashcards</span>
        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">100 cards</span>
      </div>

      {/* Card preview */}
      <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/30 rounded-xl p-6 mb-4">
        <div className="text-xs text-slate-400 mb-2">Chủ đề: Kiến trúc máy tính</div>
        <div className="text-lg font-medium text-white mb-4">
          Địa chỉ ô nhớ 20 bit có thể truy cập bao nhiêu byte?
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Nhấn để lật</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Deck stats */}
      <div className="flex justify-between text-xs text-slate-400">
        <span>Mới: 12</span>
        <span>Đang học: 28</span>
        <span>Đã thuộc: 60</span>
      </div>
    </div>
  );
}

// ============ COCKPIT GRID MOCKUP ============
export function CockpitGridMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <DashboardMockup />
      <SkillMapMockup />
      <LabPreviewMockup />
      <AITutorMockup />
    </div>
  );
}