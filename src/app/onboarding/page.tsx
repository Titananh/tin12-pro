// ==========================================
// Onboarding Page - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Components';

const goals = [
  { id: 'tn', label: 'Thi tốt nghiệp THPT', icon: '🎯', description: 'Chuẩn bị cho kỳ thi tốt nghiệp' },
  { id: 'college', label: 'Điểm cao đại học', icon: '🏆', description: 'ôn luyện để thi vào các trường top' },
  { id: 'skill', label: 'Học kỹ năng lập trình', icon: '💻', description: 'Học để code thực sự' },
  { id: 'explore', label: 'Khám phá lĩnh vực CS', icon: '🔍', description: 'Tìm hiểu xem có thích không' },
];

const levels = [
  { id: 'beginner', label: 'Mới bắt đầu', description: 'Chưa có nền tảng Tin học 12' },
  { id: 'intermediate', label: 'Trung bình', description: 'Biết kiến thức cơ bản' },
  { id: 'advanced', label: 'Nâng cao', description: 'Đã nắm vững và muốn luyện thi' },
];

const tracks = [
  { id: 'cs', label: 'Computer Science', icon: '🤖', description: 'AI, Mạng, Thuật toán', color: '#7C3AED' },
  { id: 'ict', label: 'ICT / Kỹ thuật', icon: '🌐', description: 'HTML/CSS, Thiết kế web', color: '#10B981' },
  { id: 'general', label: 'General', icon: '📚', description: 'Tất cả các chủ đề', color: '#F59E0B' },
];

interface OnboardingState {
  step: number;
  goal: string | null;
  level: string | null;
  track: string | null;
  placementScore: number | null;
  showResult: boolean;
}

export default function OnboardingPage() {
  const [state, setState] = useState<OnboardingState>({
    step: 0,
    goal: null,
    level: null,
    track: null,
    placementScore: null,
    showResult: false,
  });

  const totalSteps = 4;
  const progress = ((state.step) / totalSteps) * 100;

  const handleGoalSelect = (goalId: string) => {
    setState((prev) => ({ ...prev, goal: goalId }));
  };

  const handleLevelSelect = (levelId: string) => {
    setState((prev) => ({ ...prev, level: levelId }));
  };

  const handleTrackSelect = (trackId: string) => {
    setState((prev) => ({ ...prev, track: trackId }));
  };

  const handleNext = () => {
    if (state.step === 3) {
      // Simulate placement test
      const score = Math.floor(Math.random() * 40 + 60); // 60-100
      setState((prev) => ({ ...prev, placementScore: score, showResult: true }));
    } else {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const getRecommendedPath = () => {
    if (state.placementScore && state.placementScore >= 80) {
      return { path: 'Lộ trình nâng cao', description: 'Bạn có nền tảng tốt, có thể học trực tiếp các bài nâng cao và luyện đề', courses: ['Luyện thi THPT', 'AI & Deep Learning', 'Mạng nâng cao'] };
    } else if (state.placementScore && state.placementScore >= 60) {
      return { path: 'Lộ trình chuẩn', description: 'Bạn có kiến thức cơ bản, nên học theo lộ trình chuẩn từ đầu', courses: ['Nền tảng Tin học 12', 'AI & Machine Learning', 'Mạng máy tính'] };
    } else {
      return { path: 'Lộ trình cơ bản', description: 'Bạn cần xây dựng nền tảng vững, hãy bắt đầu từ những bài đầu tiên', courses: ['Kiến trúc máy tính', 'Phần mềm hệ thống', 'HTML/CSS cơ bản'] };
    }
  };

  if (state.showResult) {
    const recommended = getRecommendedPath();
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <Card className="max-w-xl w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-4xl mb-6">
            🎉
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Kết quả Đánh giá</h1>
          <p className="text-slate-400 mb-6">Bạn đã hoàn thành bài kiểm tra đầu vào</p>
          
          <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
            {state.placementScore}%
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-left">
            <div className="text-sm text-cyan-400 font-medium mb-2">📋 {recommended.path}</div>
            <p className="text-sm text-slate-300 mb-3">{recommended.description}</p>
            <div className="text-sm text-slate-400">Khóa học được đề xuất:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {recommended.courses.map((course) => (
                <span key={course} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1">
              Tìm hiểu thêm
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => window.location.href = '/dashboard'}>
              Bắt đầu học ngay
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Progress Bar */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Bước {state.step + 1} / {totalSteps}</span>
            <span className="text-sm text-cyan-400">{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} size="sm" />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Step 0: Goal */}
          {state.step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Mục tiêu của bạn là gì?</h1>
                <p className="text-slate-400">Chọn mục tiêu chính để chúng tôi cá nhân hóa lộ trình</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    hover
                    className={`p-6 cursor-pointer transition-all ${
                      state.goal === goal.id ? 'border-cyan-500 bg-cyan-500/10' : ''
                    }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <div className="text-3xl mb-3">{goal.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{goal.label}</h3>
                    <p className="text-sm text-slate-400">{goal.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Level */}
          {state.step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Trình độ hiện tại của bạn?</h1>
                <p className="text-slate-400">Chọn đúng để chúng tôi điều chỉnh tốc độ dạy</p>
              </div>
              <div className="space-y-4">
                {levels.map((level) => (
                  <Card
                    key={level.id}
                    hover
                    className={`p-6 cursor-pointer transition-all ${
                      state.level === level.id ? 'border-cyan-500 bg-cyan-500/10' : ''
                    }`}
                    onClick={() => handleLevelSelect(level.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{level.label}</h3>
                        <p className="text-sm text-slate-400">{level.description}</p>
                      </div>
                      {state.level === level.id && (
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Track */}
          {state.step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Bạn theo nhánh nào?</h1>
                <p className="text-slate-400">Theo chương trình GDPT 2018, bạn chọn nhánh nào?</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {tracks.map((track) => (
                  <Card
                    key={track.id}
                    hover
                    className={`p-6 text-center cursor-pointer transition-all ${
                      state.track === track.id ? 'border-cyan-500 bg-cyan-500/10' : ''
                    }`}
                    onClick={() => handleTrackSelect(track.id)}
                  >
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4"
                      style={{ backgroundColor: `${track.color}20` }}
                    >
                      {track.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{track.label}</h3>
                    <p className="text-sm text-slate-400">{track.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Placement Test */}
          {state.step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Bài kiểm tra đầu vào</h1>
                <p className="text-slate-400">Làm nhanh 5 câu để chúng tôi đánh giá kiến thức của bạn</p>
              </div>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-medium mb-3">1. CPU có chức năng gì?</p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer text-slate-300">A. Lưu trữ dữ liệu</div>
                      <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer text-slate-300 border-l-2 border-cyan-500">B. Xử lý tính toán và điều khiển ✓</div>
                      <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer text-slate-300">C. Hiển thị kết quả</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-3">2. DNS có chức năng gì?</p>
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer text-slate-300 border-l-2 border-cyan-500">A. Chuyển tên miền thành IP ✓</div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400">⚡ Đang chấm điểm tự động...</p>
                </div>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8" role="navigation" aria-label="Onboarding navigation">
            <Button
              variant="ghost"
              onClick={() => setState((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }))}
              disabled={state.step === 0}
              aria-label="Go back"
            >
              ← Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={
                (state.step === 0 && !state.goal) ||
                (state.step === 1 && !state.level) ||
                (state.step === 2 && !state.track)
              }
            >
              {state.step === 3 ? 'Hoàn thành' : 'Tiếp tục'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}