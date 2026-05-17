// ==========================================
// Quiz Page - Tin12 Pro Cánh Diều
// Quiz practice by topic using real seed data
// ==========================================

'use client';

import { useState, useMemo } from 'react';
import { Card, Button } from '@/components/ui';
import { getQuestionsByTopic } from '@/content/questions';
import { gradeMultipleChoice, gradeTrueFalseGroup, getScoreLabel } from '@/lib/quiz-engine';

const TOPICS = [
  { id: 'kiến-trúc-máy-tính', name: 'Kiến trúc máy tính', color: 'blue' },
  { id: 'ai-ml', name: 'AI & Machine Learning', color: 'violet' },
  { id: 'mạng-máy-tính', name: 'Mạng máy tính', color: 'cyan' },
  { id: 'đạo-đức-số', name: 'Đạo đức số', color: 'emerald' },
  { id: 'html-css', name: 'HTML/CSS & Web', color: 'amber' },
  { id: 'thuật-toán', name: 'Thuật toán', color: 'pink' },
  { id: 'data-io', name: 'Data & IoT', color: 'orange' },
];

function getTopicCount(topicId: string): number {
  return getQuestionsByTopic(topicId).length;
}

interface QuizAnswer {
  questionIndex: number;
  answer: number | boolean[] | null;
}

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const topicQuestions = useMemo(() => {
    if (!selectedTopic) return [];
    return getQuestionsByTopic(selectedTopic).slice(0, 15);
  }, [selectedTopic]);

  const currentQuestion = topicQuestions[currentIndex];
  const currentAnswer = answers.find(a => a.questionIndex === currentIndex)?.answer ?? null;

  const handleSelectAnswer = (answer: number | boolean[] | null) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionIndex === currentIndex);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionIndex: currentIndex, answer };
        return updated;
      }
      return [...prev, { questionIndex: currentIndex, answer }];
    });
  };

  const handleNext = () => {
    if (currentIndex < topicQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleExit = () => {
    setSelectedTopic(null);
    setShowQuiz(false);
    setCurrentIndex(0);
    setAnswers([]);
    setSubmitted(false);
  };

  const scoreResult = useMemo(() => {
    if (!submitted || topicQuestions.length === 0) return null;
    let correct = 0;
    const wrongTopics: string[] = [];
    const explanations: Record<string, string> = {};

    topicQuestions.forEach((q, idx) => {
      const userAnswer = answers.find(a => a.questionIndex === idx)?.answer ?? null;
      explanations[q.id] = q.explanation;

      let isCorrect = false;
      if (q.type === 'mcq' && typeof userAnswer === 'number') {
        isCorrect = gradeMultipleChoice(userAnswer, q.correctAnswer as number);
      } else if (q.type === 'true-false' && Array.isArray(userAnswer)) {
        const tfResult = gradeTrueFalseGroup(
          userAnswer as boolean[],
          q.correctAnswer as boolean[]
        );
        isCorrect = tfResult.isFullyCorrect;
      }

      if (isCorrect) {
        correct++;
      } else {
        wrongTopics.push(q.topic);
      }
    });

    const score = Math.round((correct / topicQuestions.length) * 100);
    return { score, correct, total: topicQuestions.length, wrongTopics, explanations };
  }, [submitted, topicQuestions, answers]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Luyện tập
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {showQuiz && submitted ? 'Kết quả luyện tập' : 'Chọn chủ đề để luyện tập'}
        </p>
      </div>

      {!showQuiz ? (
        <>
          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {TOPICS.map(topic => {
              const count = getTopicCount(topic.id);
              return (
                <Card
                  key={topic.id}
                  hover
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setShowQuiz(true);
                    setCurrentIndex(0);
                    setAnswers([]);
                    setSubmitted(false);
                  }}
                  className={`cursor-pointer transition-all ${
                    selectedTopic === topic.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {count} cau hoi
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-${topic.color}-100 dark:bg-${topic.color}-900/30 flex items-center justify-center`}>
                      <TopicIcon type={topic.id} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : submitted && scoreResult ? (
        /* Results View */
        <Card className="text-center">
          <div className="mb-6">
            <div className={`text-6xl font-bold ${
              scoreResult.score >= 80 ? 'text-emerald-500' :
              scoreResult.score >= 60 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {scoreResult.score}%
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 mt-2">
              {getScoreLabel(scoreResult.score)}
            </p>
            <p className="text-slate-500 mt-1">
              {scoreResult.correct} / {scoreResult.total} cau dung
            </p>
          </div>

          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h3 className="font-semibold mb-2">Chu de can on luyen them:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[...new Set(scoreResult.wrongTopics)].map(topic => (
                <span key={topic} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                  {TOPICS.find(t => t.id === topic)?.name || topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6 text-left">
            <h3 className="font-semibold mb-3">Giai thich dap an:</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {topicQuestions.map((q, idx) => {
                const userAnswer = answers.find(a => a.questionIndex === idx)?.answer ?? null;
                let isCorrect = false;
                if (q.type === 'mcq' && typeof userAnswer === 'number') {
                  isCorrect = gradeMultipleChoice(userAnswer, q.correctAnswer as number);
                } else if (q.type === 'true-false' && Array.isArray(userAnswer)) {
                  isCorrect = gradeTrueFalseGroup(userAnswer as boolean[], q.correctAnswer as boolean[]).isFullyCorrect;
                }
                return (
                  <div key={q.id} className={`p-3 rounded-lg border ${
                    isCorrect ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' :
                    'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                        isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </span>
                      <p className="font-medium text-sm text-slate-900 dark:text-white">
                        Cau {idx + 1}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 ml-7">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Button onClick={handleExit}>
            Quay lai chon chu de
          </Button>
        </Card>
      ) : (
        /* Quiz Interface */
        <Card>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleExit} className="text-slate-500">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Thoat
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Cau {currentIndex + 1} / {topicQuestions.length}
            </span>
          </div>

          {/* Progress Rail */}
          <div className="flex gap-1 mb-6">
            {topicQuestions.map((_, idx) => {
              const answer = answers.find(a => a.questionIndex === idx);
              const isAnswered = answer !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    isCurrent ? 'bg-blue-500' : isAnswered ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {currentQuestion.difficulty === 'easy' ? 'De' : currentQuestion.difficulty === 'medium' ? 'Trung binh' : 'Kho'}
              </span>
              <span className="text-xs text-slate-400">
                {TOPICS.find(t => t.id === currentQuestion.topic)?.name || currentQuestion.topic}
              </span>
            </div>

            <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'mcq' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentAnswer === idx
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    aria-pressed={currentAnswer === idx}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border mr-3 text-sm font-medium ${
                      currentAnswer === idx
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-900 dark:text-white">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true-false' && currentQuestion.statements && (
              <div className="space-y-4">
                {currentQuestion.statements.map((statement, idx) => {
                  const tfAnswer = currentAnswer as boolean[] | null;
                  const statementAnswer = tfAnswer?.[idx] ?? null;
                  return (
                    <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <p className="mb-3 font-medium text-slate-900 dark:text-white">{statement}</p>
                      <div className="flex gap-3" role="group" aria-label={`Statement ${idx + 1} answer options`}>
                        <button
                          onClick={() => {
                            const newAnswers = [...(tfAnswer || Array(currentQuestion.statements!.length).fill(null))];
                            newAnswers[idx] = true;
                            handleSelectAnswer(newAnswers);
                          }}
                          className={`flex-1 px-4 py-3 rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            statementAnswer === true
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          aria-pressed={statementAnswer === true}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            True
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            const newAnswers = [...(tfAnswer || Array(currentQuestion.statements!.length).fill(null))];
                            newAnswers[idx] = false;
                            handleSelectAnswer(newAnswers);
                          }}
                          className={`flex-1 px-4 py-3 rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            statementAnswer === false
                              ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          aria-pressed={statementAnswer === false}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            False
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous question"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Cau truoc
            </Button>
            {currentIndex === topicQuestions.length - 1 ? (
              <Button onClick={handleSubmit} aria-label="Submit quiz">
                Nop bai
              </Button>
            ) : (
              <Button onClick={handleNext} aria-label="Next question">
                Cau tiep
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

function TopicIcon({ type }: { type: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    'kiến-trúc-máy-tính': (
      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    'ai-ml': (
      <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    'mạng-máy-tính': (
      <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    'đạo-đức-số': (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    'html-css': (
      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    'thuật-toán': (
      <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'data-io': (
      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  };
  return iconMap[type] || (
    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}
