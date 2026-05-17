'use client';

// ==========================================
// Lab Detail Page - Tin12 Pro Cánh Diều
// ==========================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
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
  'network': 'Mạng',
  'data': 'Dữ liệu',
  'project': 'Project',
};

export default function LabDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lab = allLabs.find((l) => l.slug === slug);

  if (!lab) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lab không tìm thấy</h1>
          <Link href="/labs"><Button variant="primary">Quay lại Labs</Button></Link>
        </div>
      </div>
    );
  }

  return <LabDetailClient lab={lab} />;
}

function LabDetailClient({ lab }: { lab: Lab }) {
  const [code, setCode] = useState(lab.starterCode);
  const [showHints, setShowHints] = useState(false);
  const [output, setOutput] = useState('');

  const handleRun = () => {
    setOutput('Running...');
    setTimeout(() => {
      setOutput('Preview displayed in iframe (sandboxed)');
    }, 1000);
  };

  const handleReset = () => {
    setCode(lab.starterCode);
    setOutput('');
  };

  const color = labTypeColors[lab.type];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/labs" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{lab.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span 
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {labTypeLabels[lab.type]}
                </span>
                <span className="text-xs text-slate-500">{lab.estimatedMinutes} phút</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setShowHints(!showHints)}>
              💡 Gợi ý
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleRun}>
              ▶ Run
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex">
        {/* Left: Instructions */}
        <div className="w-80 border-r border-white/10 p-6 overflow-y-auto hidden lg:block">
          <h2 className="text-lg font-semibold text-white mb-4">📋 Hướng dẫn</h2>
          <div className="space-y-4 mb-8">
            {lab.instructions.map((inst) => (
              <div 
                key={inst.step}
                className={`flex gap-3 p-3 rounded-lg ${
                  inst.required ? 'bg-white/5' : 'bg-white/5 border-l-2 border-amber-500/50'
                }`}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
                  {inst.step}
                </span>
                <div className="text-sm text-slate-300">{inst.text}</div>
                {!inst.required && (
                  <span className="text-xs text-amber-400 ml-auto">Tùy chọn</span>
                )}
              </div>
            ))}
          </div>

          {/* Hints */}
          {showHints && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h3 className="text-sm font-semibold text-amber-400 mb-3">💡 Gợi ý</h3>
              <ul className="space-y-2">
                {lab.hints.map((hint, i) => (
                  <li key={i} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-amber-400">{i + 1}.</span>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rubric */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-white mb-3">📊 Rubric</h3>
            <div className="space-y-2">
              {lab.rubric.map((item, i) => (
                <div key={i} className="flex justify-between text-sm p-2 rounded bg-white/5">
                  <span className="text-slate-300">{item.criterion}</span>
                  <span className="text-cyan-400 font-medium">{item.points}pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="code-editor h-full rounded-xl overflow-hidden">
              <div className="code-editor-header">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-400">index.html</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[calc(100%-48px)] p-4 bg-[#0d1117] text-slate-300 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>
          {output && (
            <div className="px-4 pb-4">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="w-[40%] border-l border-white/10 p-4 hidden xl:block">
          <div className="h-full rounded-xl bg-white overflow-hidden">
            <div className="h-8 bg-slate-100 border-b flex items-center px-3 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-slate-500">Preview</span>
            </div>
            <iframe
              srcDoc={code}
              sandbox="allow-scripts"
              className="w-full h-[calc(100%-32px)]"
              title="Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}