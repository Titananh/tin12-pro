// ==========================================
// Labs Page (Index) - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
  'network': 'Mạng',
  'data': 'Dữ liệu',
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
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">💻 Labs</h1>
            <p className="text-slate-400">Thực hành lập trình trực tiếp trên trình duyệt</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as LabType | 'all')}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">Tất cả loại</option>
            <option value="html-css">HTML/CSS</option>
            <option value="network">Mạng</option>
            <option value="data">Dữ liệu</option>
            <option value="project">Project</option>
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">Tất cả độ khó</option>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
        </div>

        {/* Labs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => {
            const color = labTypeColors[lab.type];
            return (
              <Card key={lab.id} hover className="p-0 overflow-hidden">
                <div 
                  className="h-24 relative flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)` }}
                >
                  <span className="text-4xl opacity-50">💻</span>
                  <div className="absolute top-3 right-3">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: `${color}30`, color }}
                    >
                      {labTypeLabels[lab.type]}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      lab.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                      lab.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lab.difficulty === 'easy' ? 'Dễ' : lab.difficulty === 'hard' ? 'Khó' : 'TB'}
                    </span>
                    <span className="text-xs text-slate-500">{lab.estimatedMinutes} phút</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{lab.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{lab.description}</p>
                  <Link href={`/labs/${lab.slug}`}>
                    <Button variant="primary" className="w-full">Làm lab</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredLabs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy lab</h3>
            <p className="text-slate-400">Thử thay đổi bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
}