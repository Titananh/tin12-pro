// ==========================================
// Quiz Page - Tin12 Pro Cánh Diều
// Quiz practice by topic using real seed data
// ==========================================

'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Progress } from '@/components/ui';
import { getQuestionsByTopic } from '@/content/questions';
import { gradeMultipleChoice, gradeTrueFalseGroup, getScoreLabel } from '@/lib/quiz-engine';

const TOPICS = [
  { id: 'kiến-trúc-máy-tính', name: 'Kiến trúc máy tính', color: 'blue', icon: '🔌' },
  { id: 'ai-ml', name: 'AI & Machine Learning', color: 'violet', icon: '🤖' },
  { id: 'mạng-máy-tính', name: 'Mạng máy tính', color: 'cyan', icon: '🌐' },
  { id: 'đạo-đức-số', name: 'Đạo đức số', color: 'emerald', icon: '🔒' },
  { id: 'html-css', name: 'HTML/CSS & Web', color: 'amber', icon: '🎨' },
  { id: 'thuật-toán', name: 'Thuật toán', color: 'pink', icon: '💡' },
  { id: 'data-io', name: 'Data & IoT', color: 'orange', icon: '📊' },
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

  // Get questions for selected topic (max 15 for demo)
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

  // Calculate score
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
        <p className="text-slate-600 dark:text-slate-300 mt-1">
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
                        {count} câu hỏi
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-${topic.color}-100 dark:bg-${topic.color}-900/30 flex items-center justify-center text-xl`}>
                      {topic.icon}
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
              {scoreResult.correct} / {scoreResult.total} câu đúng
            </p>
          </div>

          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h3 className="font-semibold mb-2">Chủ đề cần ôn luyện thêm:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[...new Set(scoreResult.wrongTopics)].map(topic => (
                <span key={topic} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                  {TOPICS.find(t => t.id === topic)?.name || topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6 text-left">
            <h3 className="font-semibold mb-3">Giải thích đáp án:</h3>
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
                    <p className="font-medium text-sm mb-1">
                      Câu {idx + 1}: {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Button onClick={handleExit}>
            ← Quay lại chọn chủ đề
          </Button>
        </Card>
      ) : (
        /* Quiz Interface */
        <Card>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleExit}>
              ← Thoát
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Câu {currentIndex + 1} / {topicQuestions.length}
            </span>
          </div>

          <Progress value={((currentIndex + 1) / topicQuestions.length) * 100} className="mb-6" />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs ${
                currentQuestion.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty === 'easy' ? 'Dễ' :
                 currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
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
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border mr-3 text-sm ${
                      currentAnswer === idx
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
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
                      <p className="mb-3 font-medium">{statement}</p>
                      <div className="flex gap-3" role="group" aria-label={`Statement ${idx + 1} answer options`}>
                        <button
                          onClick={() => {
                            const newAnswers = [...(tfAnswer || Array(currentQuestion.statements!.length).fill(null))];
                            newAnswers[idx] = true;
                            handleSelectAnswer(newAnswers);
                          }}
                          className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            statementAnswer === true
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          aria-pressed={statementAnswer === true}
                        >
                          ✓ True
                        </button>
                        <button
                          onClick={() => {
                            const newAnswers = [...(tfAnswer || Array(currentQuestion.statements!.length).fill(null))];
                            newAnswers[idx] = false;
                            handleSelectAnswer(newAnswers);
                          }}
                          className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            statementAnswer === false
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          aria-pressed={statementAnswer === false}
                        >
                          ✗ False
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous question"
            >
              ← Câu trước
            </Button>
            {currentIndex === topicQuestions.length - 1 ? (
              <Button onClick={handleSubmit} aria-label="Submit quiz">
                Nộp bài
              </Button>
            ) : (
              <Button onClick={handleNext} aria-label="Next question">
                Câu tiếp →
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}