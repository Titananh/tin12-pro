// ==========================================
// Exams Page - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { exams as allExams } from '@/content/exams';

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📝 Thi thử</h1>
            <p className="text-slate-400">Mô phỏng cấu trúc đề thi tốt nghiệp THPT 2026</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExams.map((exam) => (
            <Card key={exam.id} hover className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-xl">📝</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{exam.title}</h3>
                  <p className="text-xs text-slate-500">50 phút • 30 câu</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-4">{exam.description}</p>
              <Link href={`/exams/${exam.id}`}>
                <Button variant="primary" className="w-full">Bắt đầu thi</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}