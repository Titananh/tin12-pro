'use client';

// ==========================================
// Exam Detail/Simulation Page - Tin12 Pro Cánh Diều
// ==========================================

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuizOption, ExamTimer } from '@/components/ui/Components';
import { exams } from '@/content/exams';

interface Answer {
  part1: Record<number, number>;
  part2: Record<number, boolean[]>;
}

export default function ExamSimulationPage() {
  const params = useParams();
  const examId = params.id as string;
  const exam = exams.find((e) => e.id === examId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer>({ part1: {}, part2: {} });
  const [showResult, setShowResult] = useState(false);
  const [part, setPart] = useState<'part1' | 'part2'>('part1');
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Đề thi không tìm thấy</h1>
          <Link href="/exams"><Button variant="primary">Quay lại</Button></Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionIndex: number, answer: number) => {
    setAnswers((prev) => ({
      ...prev,
      part1: { ...prev.part1, [questionIndex]: answer },
    }));
  };

  const handleTFAnswer = (groupIndex: number, statementIndex: number, value: boolean) => {
    setAnswers((prev) => {
      const currentGroup = prev.part2[groupIndex] || [false, false, false, false];
      const newGroup = [...currentGroup];
      newGroup[statementIndex] = value;
      return {
        ...prev,
        part2: { ...prev.part2, [groupIndex]: newGroup },
      };
    });
  };

  const toggleMarkForReview = (index: number) => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const calculateScore = () => {
    let part1Score = 0;
    let part2Score = 0;
    
    exam.part1.questions.forEach((q, i) => {
      if (answers.part1[i] === q.correctAnswer) part1Score += 0.25;
    });

    exam.part2.groups.forEach((group, gi) => {
      const answersForGroup = answers.part2[gi] || [false, false, false, false];
      group.statements.forEach((stmt, si) => {
        if (answersForGroup[si] === stmt.isCorrect) part2Score += 0.125;
      });
    });

    return { part1Score, part2Score, total: part1Score + part2Score };
  };

  if (showResult) {
    const scores = calculateScore();
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-2">Kết quả thi</h1>
          <p className="text-xl text-slate-400 mb-6">{exam.title}</p>
          
          <div className="text-6xl font-bold text-cyan-400 mb-6">{scores.total.toFixed(2)}/10</div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-slate-400 mb-1">Part 1 (Trắc nghiệm)</div>
              <div className="text-2xl font-bold text-white">{scores.part1Score.toFixed(2)}/6</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-slate-400 mb-1">Part 2 (Đúng/Sai)</div>
              <div className="text-2xl font-bold text-white">{scores.part2Score.toFixed(2)}/3</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/exams">
              <Button variant="secondary">Quay lại danh sách</Button>
            </Link>
            <Button variant="primary" onClick={() => window.location.reload()}>Làm lại</Button>
          </div>
        </Card>
      </div>
    );
  }

  const isPart1 = part === 'part1';
  const totalPart1 = exam.part1.totalQuestions;
  const totalPart2 = exam.part2.totalQuestions;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10 bg-slate-950/50 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/exams" className="p-2 rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">{exam.title}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>Part {isPart1 ? '1' : '2'}: {isPart1 ? '24 câu' : '6 câu T/F'}</span>
                <span>•</span>
                <span>50 phút</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ExamTimer duration={50} onTimeUp={() => setShowResult(true)} />
            <Button variant="primary" size="sm" onClick={() => setShowResult(true)}>Nộp bài</Button>
          </div>
        </div>
      </div>

      {/* Part Navigation */}
      <div className="px-4 py-3 border-b border-white/10 bg-slate-900/50">
        <div className="flex gap-4 max-w-7xl mx-auto">
          <button
            onClick={() => setPart('part1')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isPart1 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Part 1: Trắc nghiệm ({totalPart1} câu)
          </button>
          <button
            onClick={() => setPart('part2')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !isPart1 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Part 2: Đúng/Sai ({totalPart2} câu)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {isPart1 ? (
            // Part 1: MCQ
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-cyan-400">Câu {currentQuestion + 1}/{totalPart1}</span>
                <button
                  onClick={() => toggleMarkForReview(currentQuestion)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    markedForReview.has(currentQuestion) ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {markedForReview.has(currentQuestion) ? '★ Đánh dấu' : '☆ Đánh dấu'}
                </button>
              </div>

              <h2 className="text-xl font-medium text-white mb-6">
                {exam.part1.questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {exam.part1.questions[currentQuestion].options.map((opt, i) => (
                  <QuizOption
                    key={i}
                    label={opt}
                    index={i}
                    selected={answers.part1[currentQuestion] === i}
                    onClick={() => handleAnswer(currentQuestion, i)}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((p) => p - 1)}
                >
                  ← Câu trước
                </Button>
                <Button
                  variant="ghost"
                  disabled={currentQuestion === totalPart1 - 1}
                  onClick={() => setCurrentQuestion((p) => p + 1)}
                >
                  Câu sau →
                </Button>
              </div>
            </Card>
          ) : (
            // Part 2: True/False
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-cyan-400">Câu {currentQuestion + 1}/{totalPart2} (Part 2)</span>
                <button
                  onClick={() => toggleMarkForReview(currentQuestion + 100)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    markedForReview.has(currentQuestion + 100) ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {markedForReview.has(currentQuestion + 100) ? '★ Đánh dấu' : '☆ Đánh dấu'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-6">
                <h2 className="text-lg font-medium text-white">
                  {exam.part2.groups[currentQuestion].context}
                </h2>
              </div>

              <div className="space-y-4">
                {exam.part2.groups[currentQuestion].statements.map((stmt, si) => (
                  <div key={stmt.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">{stmt.text}</span>
                    <div className="flex gap-3" role="group" aria-label={`Statement ${si + 1} answer options`}>
                      <button
                        onClick={() => handleTFAnswer(currentQuestion, si, true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          answers.part2[currentQuestion]?.[si] === true ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        aria-pressed={answers.part2[currentQuestion]?.[si] === true}
                      >
                        ✓ Đúng
                      </button>
                      <button
                        onClick={() => handleTFAnswer(currentQuestion, si, false)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          answers.part2[currentQuestion]?.[si] === false ? 'bg-red-500/30 text-red-400 border border-red-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        aria-pressed={answers.part2[currentQuestion]?.[si] === false}
                      >
                        ✗ Sai
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((p) => p - 1)}
                  aria-label="Previous question"
                >
                  ← Câu trước
                </Button>
                <Button
                  variant="ghost"
                  disabled={currentQuestion === totalPart2 - 1}
                  onClick={() => setCurrentQuestion((p) => p + 1)}
                  aria-label="Next question"
                >
                  Câu sau →
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Navigator */}
      <div className="px-4 py-4 border-t border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-slate-400 mb-3">Điều hướng nhanh</div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPart1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPart('part1'); setCurrentQuestion(i); }}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                  !isPart1 ? 'bg-white/5 text-slate-500' :
                  currentQuestion === i ? 'bg-cyan-500 text-white' :
                  answers.part1[i] !== undefined ? 'bg-emerald-500/30 text-emerald-400' :
                  markedForReview.has(i) ? 'bg-amber-500/30 text-amber-400' :
                  'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}