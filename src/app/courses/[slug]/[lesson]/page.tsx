// ==========================================
// Lesson Page Template - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SkillBadge } from '@/components/ui/Components';
import { lessons as allLessons } from '@/content/lessons';
import { courses as allCourses } from '@/content/courses';

export default function LessonPage() {
  const params = useParams();
  const lessonSlug = params.lesson as string;
  const lesson = allLessons.find((l) => l.slug === lessonSlug);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'exam'>('theory');

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Bài học không tìm thấy</h1>
          <Link href="/courses"><Button variant="primary">Quay lại</Button></Link>
        </div>
      </div>
    );
  }

  const course = allCourses.find((c) => c.id === lesson.courseId);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/courses/${course?.slug}`} className="p-2 rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">{lesson.title}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>{course?.title}</span>
                <span>•</span>
                <span>{lesson.estimatedMinutes} phút</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SkillBadge variant={lesson.difficulty === 'easy' ? 'mastered' : lesson.difficulty === 'hard' ? 'weak' : 'default'}>
              {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'hard' ? 'Khó' : 'Trung bình'}
            </SkillBadge>
            <Button variant="primary" size="sm">
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(['theory', 'practice', 'exam'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {tab === 'theory' ? '📖 Lý thuyết' : tab === 'practice' ? '✏️ Luyện tập' : '📝 Exam Corner'}
                </button>
              ))}
            </div>

            {/* Theory Tab */}
            {activeTab === 'theory' && (
              <div className="space-y-6 animate-fade-in">
                {/* Learning Objectives */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">🎯 Mục tiêu bài học</h2>
                  <ul className="space-y-2">
                    {lesson.content.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                        <span className="text-slate-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Explain Like New */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">💡 Giải thích đơn giản</h2>
                  <p className="text-slate-300 leading-relaxed">{lesson.content.explainLikeNew}</p>
                </Card>

                {/* Theory */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">📚 Lý thuyết</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{lesson.content.theory}</p>
                  </div>
                </Card>

                {/* Deep Dive */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">🔬 Đi sâu hơn</h2>
                  <p className="text-slate-300 leading-relaxed">{lesson.content.deepDive}</p>
                </Card>

                {/* Real World Examples */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">🌍 Ví dụ thực tế</h2>
                  <ul className="space-y-3">
                    {lesson.content.realWorldExamples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <span className="text-cyan-400">→</span>
                        <span className="text-slate-300">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Visual Summary */}
                <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border-cyan-500/20">
                  <h2 className="text-lg font-semibold text-white mb-4">📊 Tóm tắt trực quan</h2>
                  <p className="text-slate-200 font-medium">{lesson.content.visualSummary}</p>
                </Card>

                {/* Common Mistakes */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">⚠️ Lỗi thường gặp</h2>
                  <ul className="space-y-3">
                    {lesson.content.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400">✗</span>
                        <span className="text-slate-300">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* 60-Second Summary */}
                <Card className="p-6 bg-amber-500/10 border-amber-500/20">
                  <h2 className="text-lg font-semibold text-amber-400 mb-4">⏱️ Tóm tắt 60 giây</h2>
                  <p className="text-slate-200">{lesson.content.sixtySecondSummary}</p>
                </Card>
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <div className="space-y-6 animate-fade-in">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">✏️ Thực hành ngay</h2>
                  <p className="text-slate-300 mb-4">{lesson.content.practice}</p>
                  <Link href="/labs">
                    <Button variant="primary">
                      Đi đến Lab →
                    </Button>
                  </Link>
                </Card>

                {/* Quick Check */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">📝 Quick Check</h2>
                  <div className="space-y-4">
                    {lesson.content.quickCheck.map((qc, qi) => (
                      <div key={qi} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white font-medium mb-3">Câu {qi + 1}: {qc.question}</p>
                        {qc.options && (
                          <div className="space-y-2">
                            {qc.options.map((opt, oi) => (
                              <div key={oi} className="p-2 rounded bg-white/5 text-slate-300">
                                {String.fromCharCode(65 + oi)}. {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 p-3 rounded bg-cyan-500/10 border border-cyan-500/20">
                          <span className="text-xs text-cyan-400 font-medium">Giải thích: </span>
                          <span className="text-sm text-slate-300">{qc.explanation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Exam Corner Tab */}
            {activeTab === 'exam' && (
              <div className="space-y-6 animate-fade-in">
                <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                  <h2 className="text-lg font-semibold text-amber-400 mb-4">📝 Exam Corner</h2>
                  <p className="text-slate-300 leading-relaxed">{lesson.content.examCorner}</p>
                </Card>
                <Link href="/exams">
                  <Button variant="primary" className="w-full">
                    Làm đề thi thử
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Navigation */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-4">Bài học tiếp theo</h3>
              <div className="space-y-2">
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-lg">📖</span>
                  <span className="text-sm text-white">{lesson.content.nextStep || 'Bài tiếp theo'}</span>
                </Link>
              </div>
            </Card>

            {/* Related Flashcards */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-4">📇 Flashcards liên quan</h3>
              <div className="flex flex-wrap gap-2">
                {lesson.content.flashcards.map((fcId) => (
                  <span key={fcId} className="px-3 py-1 rounded-full bg-white/5 text-sm text-slate-300">
                    {fcId}
                  </span>
                ))}
              </div>
              <Link href="/flashcards" className="block mt-4">
                <Button variant="ghost" size="sm" className="w-full">Học flashcards</Button>
              </Link>
            </Card>

            {/* AI Tutor */}
            <Card className="p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
              <h3 className="text-sm font-semibold text-violet-400 mb-3">🤖 Cần giúp?</h3>
              <p className="text-sm text-slate-300 mb-4">Hỏi AI Tutor nếu có thắc mắc</p>
              <Link href="/ai-tutor">
                <Button variant="primary" size="sm" className="w-full">
                  Chat với AI Tutor
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}