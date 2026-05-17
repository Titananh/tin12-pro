// ==========================================
// Exams Page - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { exams as allExams } from '@/content/exams';

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Thi thu</h1>
            <p className="text-slate-400">Mo phong cau truc de thi tot nghiep THPT 2026</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExams.map((exam) => (
            <Card key={exam.id} hover className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{exam.title}</h3>
                  <p className="text-xs text-slate-500">50 phut • 30 cau</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-5">{exam.description}</p>
              <Link href={`/exams/${exam.id}`} className="block">
                <Button variant="primary" className="w-full">Bat dau thi</Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Thu tu thi chinh thuc</h3>
              <p className="text-sm text-slate-400">
                De thi gom 2 phan: Part 1 (24 cau trac nghiem) va Part 2 (6 cau dung/sai). 
                Thoi gian lam bai 50 phut. Diem tot nghiep = Part 1 (6 diem) + Part 2 (4 diem).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}