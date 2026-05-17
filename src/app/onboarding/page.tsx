// ==========================================
// Onboarding Page - Tin12 Pro Canh Diep
// ==========================================
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Components';

// ============ ICONS (inline SVG) ============
const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6.37-.94C14.343 12.331 13 13 13 15.42m0 3.58l-3.37-.94a48.474 48.474 0 00-6.37-.94C3.343 17.331 2 16.5 2 14.58" />
  </svg>
);

const IconTrophy = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

const IconCode = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const IconRobot = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>
);

const IconGlobe = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const IconBook = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconLightbulb = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
);

// ============ GOALS & LEVELS & TRACKS ============
const goals = [
  { id: 'tn', label: 'THPT Graduation Exam', description: 'Prepare for the national graduation exam', icon: <IconTarget /> },
  { id: 'college', label: 'High University Score', description: 'Study to enter top universities', icon: <IconTrophy /> },
  { id: 'skill', label: 'Learn Programming Skills', description: 'Learn to actually code', icon: <IconCode /> },
  { id: 'explore', label: 'Explore CS Field', description: 'Discover if you like computer science', icon: <IconSearch /> },
];

const levels = [
  { id: 'beginner', label: 'Beginner', description: 'No Informatics 12 foundation' },
  { id: 'intermediate', label: 'Intermediate', description: 'Know basic concepts' },
  { id: 'advanced', label: 'Advanced', description: 'Firm grasp and want exam prep' },
];

const tracks = [
  { id: 'cs', label: 'Computer Science', description: 'AI, Networks, Algorithms', color: '#7C3AED' },
  { id: 'ict', label: 'ICT / Engineering', description: 'HTML/CSS, Web Design', color: '#10B981' },
  { id: 'general', label: 'General', description: 'All topics', color: '#F59E0B' },
];

// ============ TYPES ============
interface OnboardingState {
  step: number;
  goal: string | null;
  level: string | null;
  track: string | null;
  placementScore: number | null;
  showResult: boolean;
}

// ============ COMPONENT ============
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
      const score = Math.floor(Math.random() * 40 + 60);
      setState((prev) => ({ ...prev, placementScore: score, showResult: true }));
    } else {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const getRecommendedPath = () => {
    if (state.placementScore && state.placementScore >= 80) {
      return { path: 'Advanced Track', description: 'You have a strong foundation. You can study advanced topics directly and practice exams.', courses: ['THPT Exam Prep', 'AI & Deep Learning', 'Advanced Networks'] };
    } else if (state.placementScore && state.placementScore >= 60) {
      return { path: 'Standard Track', description: 'You have basic knowledge. You should follow the standard track from the beginning.', courses: ['Informatics 12 Foundation', 'AI & Machine Learning', 'Computer Networks'] };
    } else {
      return { path: 'Beginner Track', description: 'You need to build a solid foundation. Start from the first lessons.', courses: ['Computer Architecture', 'System Software', 'Basic HTML/CSS'] };
    }
  };

  if (state.showResult) {
    const recommended = getRecommendedPath();
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-xl w-full p-8 text-center bg-slate-900 border-slate-800">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mb-6">
            <span className="text-white text-3xl font-bold">{state.placementScore}%</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Assessment Results</h1>
          <p className="text-slate-400 mb-6">You have completed the placement test</p>

          <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
            {state.placementScore}%
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 mb-6 text-left">
            <div className="text-sm text-cyan-400 font-medium mb-2 flex items-center gap-2">
              <IconArrow />
              {recommended.path}
            </div>
            <p className="text-sm text-slate-300 mb-3">{recommended.description}</p>
            <div className="text-sm text-slate-400">Recommended courses:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {recommended.courses.map((course) => (
                <span key={course} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm border border-cyan-500/30">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1">
              Learn More
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => window.location.href = '/dashboard'}>
              Start Learning
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Progress Bar */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Step {state.step + 1} / {totalSteps}</span>
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">What is your goal?</h1>
                <p className="text-slate-400">Choose your main goal so we can personalize your learning path</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    hover
                    className={`p-6 cursor-pointer transition-all bg-slate-900 border-slate-800 ${
                      state.goal === goal.id ? 'border-cyan-500 bg-cyan-500/5' : ''
                    }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 mb-3">
                      {goal.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{goal.label}</h3>
                    <p className="text-sm text-slate-400">{goal.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Level */}
          {state.step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">What is your current level?</h1>
                <p className="text-slate-400">Choose correctly so we can adjust the teaching pace</p>
              </div>
              <div className="space-y-4">
                {levels.map((level) => (
                  <Card
                    key={level.id}
                    hover
                    className={`p-6 cursor-pointer transition-all bg-slate-900 border-slate-800 ${
                      state.level === level.id ? 'border-cyan-500 bg-cyan-500/5' : ''
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
                          <span className="text-white"><IconCheck /></span>
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Which track do you follow?</h1>
                <p className="text-slate-400">According to the 2018 Education Reform Curriculum, which track do you choose?</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {tracks.map((track) => (
                  <Card
                    key={track.id}
                    hover
                    className={`p-6 text-center cursor-pointer transition-all bg-slate-900 border-slate-800 ${
                      state.track === track.id ? 'border-cyan-500 bg-cyan-500/5' : ''
                    }`}
                    onClick={() => handleTrackSelect(track.id)}
                  >
                    <div
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${track.color}20` }}
                    >
                      {track.id === 'cs' && <IconRobot />}
                      {track.id === 'ict' && <IconGlobe />}
                      {track.id === 'general' && <IconBook />}
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">Placement Test</h1>
                <p className="text-slate-400">Quick 5 questions to assess your knowledge</p>
              </div>
              <Card className="p-6 bg-slate-900 border-slate-800">
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-medium mb-3">1. What is the function of CPU?</p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-slate-800 text-slate-300 cursor-pointer hover:bg-slate-700">A. Store data</div>
                      <div className="p-3 rounded-lg bg-slate-800 text-slate-300 cursor-pointer border-l-2 border-cyan-500">B. Process calculations and control</div>
                      <div className="p-3 rounded-lg bg-slate-800 text-slate-300 cursor-pointer hover:bg-slate-700">C. Display results</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-3">2. What is the function of DNS?</p>
                    <div className="p-3 rounded-lg bg-slate-800 text-slate-300 cursor-pointer border-l-2 border-cyan-500">A. Convert domain names to IP addresses</div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400 flex items-center gap-2">
                    <IconLightbulb />
                    Auto-grading in progress...
                  </p>
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
              className="text-slate-400 hover:text-slate-200"
            >
              <IconArrow />
              Back
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
              {state.step === 3 ? 'Complete' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}