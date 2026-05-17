'use client';

// ==========================================
// Exam Detail/Simulation Page - Tin12 Pro Cánh Diều
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { exams } from '@/content/exams';

interface Answer {
  part1: Record<number, number>;
  part2: Record<number, boolean[]>;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
  const [timeLeft, setTimeLeft] = useState(50 * 60);

  useEffect(() => {
    if (showResult) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult]);

  const handleAnswer = useCallback((questionIndex: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      part1: { ...prev.part1, [questionIndex]: answer },
    }));
  }, []);

  const handleTFAnswer = useCallback((groupIndex: number, statementIndex: number, value: boolean) => {
    setAnswers(prev => {
      const currentGroup = prev.part2[groupIndex] || [false, false, false, false];
      const newGroup = [...currentGroup];
      newGroup[statementIndex] = value;
      return {
        ...prev,
        part2: { ...prev.part2, [groupIndex]: newGroup },
      };
    });
  }, []);

  const toggleMarkForReview = useCallback((index: number) => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  }, []);

  const calculateScore = useCallback(() => {
    if (!exam) return { part1Score: 0, part2Score: 0, total: 0 };
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
  }, [exam, answers]);

  if (!exam) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">De thi khong tim thay</h1>
          <Link href="/exams"><Button variant="primary">Quay lai</Button></Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const scores = calculateScore();
    const passThreshold = 5.0;
    const isPass = scores.total >= passThreshold;

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center bg-slate-900 border-slate-800">
          <div className="mb-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isPass ? 'bg-emerald-500/20' : 'bg-red-500/20'
            }`}>
              {isPass ? (
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ket qua thi</h1>
            <p className="text-slate-400">{exam.title}</p>
          </div>
          
          <div className={`text-6xl font-bold mb-6 ${isPass ? 'text-emerald-400' : 'text-red-400'}`}>
            {scores.total.toFixed(2)}/10
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Part 1 (Trac nghiem)</div>
              <div className="text-2xl font-bold text-white">{scores.part1Score.toFixed(2)}/6</div>
              <div className="text-xs text-slate-500 mt-1">24 cau x 0.25</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Part 2 (Dung/Sai)</div>
              <div className="text-2xl font-bold text-white">{scores.part2Score.toFixed(2)}/4</div>
              <div className="text-xs text-slate-500 mt-1">6 nhom x 0.5</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/exams">
              <Button variant="outline">Quay lai danh sach</Button>
            </Link>
            <Button variant="primary" onClick={() => window.location.reload()}>Lam lai</Button>
          </div>
        </Card>
      </div>
    );
  }

  const isPart1 = part === 'part1';
  const totalPart1 = exam.part1.totalQuestions;
  const totalPart2 = exam.part2.totalQuestions;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/exams" className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-base font-semibold text-white">{exam.title}</h1>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Part {isPart1 ? '1' : '2'}: {isPart1 ? '24 cau' : '6 cau T/F'}</span>
                <span className="text-slate-600">|</span>
                <span>50 phut</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className={`px-4 py-2 rounded-lg font-mono font-bold ${
              timeLeft < 300 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-white'
            }`}>
              <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(timeLeft)}
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowResult(true)}>Nop bai</Button>
          </div>
        </div>
      </div>

      {/* Part Navigation */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex gap-2 max-w-7xl mx-auto">
          <button
            onClick={() => { setPart('part1'); setCurrentQuestion(0); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isPart1 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Part 1: Trac nghiem ({totalPart1} cau)
          </button>
          <button
            onClick={() => { setPart('part2'); setCurrentQuestion(0); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              !isPart1 
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Part 2: Dung/Sai ({totalPart2} cau)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          {isPart1 ? (
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-400">Cau {currentQuestion + 1}/{totalPart1}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-sm text-slate-500">Part 1 - Trac nghiem</span>
                </div>
                <button
                  onClick={() => toggleMarkForReview(currentQuestion)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors ${
                    markedForReview.has(currentQuestion) 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill={markedForReview.has(currentQuestion) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {markedForReview.has(currentQuestion) ? 'Da danh dau' : 'Danh dau'}
                </button>
              </div>

              <h2 className="text-lg font-medium text-white mb-6">
                {exam.part1.questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {exam.part1.questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(currentQuestion, i)}
                    className={`w-full p-4 text-left rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                      answers.part1[currentQuestion] === i
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        answers.part1[currentQuestion] === i
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-slate-700">
                <Button
                  variant="ghost"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(p => p - 1)}
                  className="text-slate-400"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Cau truoc
                </Button>
                <Button
                  variant="ghost"
                  disabled={currentQuestion === totalPart1 - 1}
                  onClick={() => setCurrentQuestion(p => p + 1)}
                  className="text-slate-400"
                >
                  Cau tiep
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-violet-400">Cau {currentQuestion + 1}/{totalPart2}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-sm text-slate-500">Part 2 - Dung/Sai</span>
                </div>
                <button
                  onClick={() => toggleMarkForReview(currentQuestion + 100)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors ${
                    markedForReview.has(currentQuestion + 100) 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill={markedForReview.has(currentQuestion + 100) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {markedForReview.has(currentQuestion + 100) ? 'Da danh dau' : 'Danh dau'}
                </button>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-6">
                <h2 className="text-base font-medium text-slate-200">
                  {exam.part2.groups[currentQuestion].context}
                </h2>
              </div>

              <div className="space-y-3">
                {exam.part2.groups[currentQuestion].statements.map((stmt, si) => (
                  <div key={stmt.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-slate-200 pr-4">{stmt.text}</span>
                    <div className="flex gap-2 flex-shrink-0" role="group" aria-label={`Statement ${si + 1} answer options`}>
                      <button
                        onClick={() => handleTFAnswer(currentQuestion, si, true)}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                          answers.part2[currentQuestion]?.[si] === true 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                            : 'text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                        }`}
                        aria-pressed={answers.part2[currentQuestion]?.[si] === true}
                      >
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Dung
                        </span>
                      </button>
                      <button
                        onClick={() => handleTFAnswer(currentQuestion, si, false)}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                          answers.part2[currentQuestion]?.[si] === false 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                            : 'text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                        }`}
                        aria-pressed={answers.part2[currentQuestion]?.[si] === false}
                      >
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          Sai
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-slate-700">
                <Button
                  variant="ghost"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(p => p - 1)}
                  className="text-slate-400"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Cau truoc
                </Button>
                <Button
                  variant="ghost"
                  disabled={currentQuestion === totalPart2 - 1}
                  onClick={() => setCurrentQuestion(p => p + 1)}
                  className="text-slate-400"
                >
                  Cau tiep
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <div className="px-4 py-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400">Dieu huong nhanh</span>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-500"></span> Hien tai
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-emerald-500/50"></span> Da tra loi
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-amber-500/50"></span> Danh dau
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: totalPart1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPart('part1'); setCurrentQuestion(i); }}
                className={`w-9 h-9 rounded text-sm font-medium transition-all ${
                  !isPart1 
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                    : currentQuestion === i 
                      ? 'bg-blue-500 text-white' 
                      : answers.part1[i] !== undefined 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
                        : markedForReview.has(i) 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
                disabled={!isPart1}
              >
                {i + 1}
              </button>
            ))}
            {Array.from({ length: totalPart2 }).map((_, i) => (
              <button
                key={i + 100}
                onClick={() => { setPart('part2'); setCurrentQuestion(i); }}
                className={`w-9 h-9 rounded text-sm font-medium transition-all ${
                  isPart1 
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
                    : currentQuestion === i && !isPart1
                      ? 'bg-violet-500 text-white' 
                      : answers.part2[i] !== undefined 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
                        : markedForReview.has(i + 100) 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
                disabled={isPart1}
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