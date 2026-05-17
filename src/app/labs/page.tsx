// ==========================================
// Labs Page (Index) - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { labs as allLabs } from '@/content/labs';
import { LabType } from '@/lib/types';

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

export default function LabsIndexPage() {
  const [selectedType, setSelectedType] = useState<LabType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredLabs = allLabs.filter((lab) => {
    const matchesType = selectedType === 'all' || lab.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty;
    return matchesType && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Labs</h1>
            <p className="text-slate-400">Thuc hanh lap trinh truc tiep tren trinh duyet</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as LabType | 'all')}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
          >
            <option value="all">Tat ca loai</option>
            <option value="html-css">HTML/CSS</option>
            <option value="network">Mang</option>
            <option value="data">Du lieu</option>
            <option value="project">Project</option>
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
          >
            <option value="all">Tat ca do kho</option>
            <option value="easy">De</option>
            <option value="medium">Trung binh</option>
            <option value="hard">Kho</option>
          </select>
        </div>

        {/* Labs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => {
            const color = labTypeColors[lab.type];
            return (
              <Card key={lab.id} hover className="p-0 overflow-hidden bg-slate-900 border-slate-800">
                <div 
                  className="h-24 relative flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    <LabTypeIcon type={lab.type} color={color} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span 
                      className="px-2.5 py-1 rounded text-xs font-medium border"
                      style={{ backgroundColor: `${color}15`, color, borderColor: `${color}30` }}
                    >
                      {labTypeLabels[lab.type]}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      lab.difficulty === 'easy' ? 'bg-emerald-500/15 text-emerald-400' :
                      lab.difficulty === 'hard' ? 'bg-red-500/15 text-red-400' :
                      'bg-amber-500/15 text-amber-400'
                    }`}>
                      {lab.difficulty === 'easy' ? 'De' : lab.difficulty === 'hard' ? 'Kho' : 'TB'}
                    </span>
                    <span className="text-xs text-slate-500">{lab.estimatedMinutes} phut</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{lab.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{lab.description}</p>
                  <Link href={`/labs/${lab.slug}`} className="block">
                    <Button variant="primary" className="w-full">Lam lab</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredLabs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Khong tim thay lab</h3>
            <p className="text-slate-400">Thu thay doi bo loc</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LabTypeIcon({ type, color }: { type: LabType; color: string }) {
  switch (type) {
    case 'html-css':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'network':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'data':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 'project':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
  }
}