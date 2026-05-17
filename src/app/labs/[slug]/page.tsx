'use client';

// ==========================================
// Lab Detail Page - Tin12 Pro Cánh Diều
// Professional code workspace with live preview
// ==========================================

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui';
import { labs as allLabs } from '@/content/labs';
import { Lab, LabType } from '@/lib/types';

const labTypeColors: Record<LabType, string> = {
  'html-css': '#10B981',
  'network': '#06B6D4',
  'data': '#8B5CF6',
  'project': '#F59E0B',
};

const labTypeLabels: Record<LabType, string> = {
  'html-css': 'HTML/CSS',
  'network': 'Mang',
  'data': 'Du lieu',
  'project': 'Project',
};

export default function LabDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lab = allLabs.find((l) => l.slug === slug);

  if (!lab) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lab khong tim thay</h1>
          <Link href="/labs"><Button variant="primary">Quay lai Labs</Button></Link>
        </div>
      </div>
    );
  }

  return <LabDetailClient lab={lab} />;
}

function LabDetailClient({ lab }: { lab: Lab }) {
  const [code, setCode] = useState(lab.starterCode);
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'spec' | 'hints' | 'rubric'>('spec');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRun = () => {
    setIsRunning(true);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
    setTimeout(() => setIsRunning(false), 500);
  };

  const handleReset = () => {
    setCode(lab.starterCode);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = lab.starterCode;
    }
  };

  const color = labTypeColors[lab.type];
  const isNetworkOrData = lab.type === 'network' || lab.type === 'data';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/labs" className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white leading-snug">{lab.title}</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span 
                  className="px-2 py-0.5 rounded text-xs font-medium border"
                  style={{ backgroundColor: `${color}15`, color, borderColor: `${color}30` }}
                >
                  {labTypeLabels[lab.type]}
                </span>
                <span className="text-xs text-slate-500">{lab.estimatedMinutes} phut</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  lab.difficulty === 'easy' ? 'bg-emerald-500/15 text-emerald-400' :
                  lab.difficulty === 'hard' ? 'bg-red-500/15 text-red-400' :
                  'bg-amber-500/15 text-amber-400'
                }`}>
                  {lab.difficulty === 'easy' ? 'De' : lab.difficulty === 'hard' ? 'Kho' : 'TB'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <Button variant="ghost" onClick={() => setShowHints(!showHints)} className="text-slate-400">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Goi y
            </Button>
            <Button variant="secondary" onClick={handleReset} className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Reset
            </Button>
            <Button variant="primary" onClick={handleRun} disabled={isRunning}>
              {isRunning ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              Run
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Spec/Hints/Rubric */}
        <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/50 hidden lg:flex">
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('spec')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'spec' 
                  ? 'text-white border-b-2 border-blue-500 bg-slate-800/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Huong dan
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'rubric' 
                  ? 'text-white border-b-2 border-blue-500 bg-slate-800/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rubric
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'spec' && (
              <div className="space-y-3">
                {lab.instructions.map((inst) => (
                  <div 
                    key={inst.step}
                    className={`flex gap-3 p-3 rounded-lg ${
                      inst.required 
                        ? 'bg-slate-800/50 border border-slate-700' 
                        : 'bg-slate-800/30 border border-slate-800'
                    }`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                      {inst.step}
                    </span>
                    <div className="text-sm text-slate-300 leading-relaxed">{inst.text}</div>
                    {!inst.required && (
                      <span className="text-xs text-amber-400/70 flex-shrink-0">Tuy chon</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rubric' && (
              <div className="space-y-2">
                {lab.rubric.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <span className="text-sm text-slate-300">{item.criterion}</span>
                    <span className="text-sm font-bold text-cyan-400">{item.points}pts</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Goi y
                </h3>
                <ul className="space-y-2">
                  {lab.hints.map((hint, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-amber-400 font-medium">{i + 1}.</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 overflow-auto">
            {isNetworkOrData ? (
              <div className="h-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400 ml-2">Instructions</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[calc(100%-48px)] p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="h-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400">index.html</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[calc(100%-48px)] p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none"
                  spellCheck={false}
                  style={{ tabSize: 2 }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-[42%] border-l border-slate-800 p-4 hidden xl:flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            <span className="ml-2 text-xs text-slate-500 font-medium">Preview</span>
          </div>
          <div className="flex-1 rounded-xl bg-white overflow-hidden shadow-2xl">
            <iframe
              ref={iframeRef}
              sandbox="allow-scripts allow-modals"
              className="w-full h-full"
              title="Preview"
            />
          </div>
        </div>
      </div>

      {/* Mobile Hint Button */}
      {showHints && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setShowHints(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 rounded-t-xl p-6 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Goi y</h3>
              <button onClick={() => setShowHints(false)} className="p-2 text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {lab.hints.map((hint, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
