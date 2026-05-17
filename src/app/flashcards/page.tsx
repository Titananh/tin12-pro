// ==========================================
// Flashcards Page - Tin12 Pro Cánh Diều
// Spaced repetition flashcard review
// ==========================================

'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { flashcards } from '@/content/flashcards';

interface CardStats {
  cardId: string;
  easeFactor: number;
  interval: number;
  dueDate: Date;
  repetitions: number;
}

const INITIAL_CARDS: CardStats[] = flashcards.map(card => ({
  cardId: card.id,
  easeFactor: 2.5,
  interval: 0,
  dueDate: new Date(),
  repetitions: 0,
}));

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [cardQueue, setCardQueue] = useState<number[]>(() => 
    Array.from({ length: flashcards.length }, (_, i) => i)
  );
  const [, setStats] = useState<CardStats[]>(INITIAL_CARDS);
  const [reviewHistory, setReviewHistory] = useState<{cardId: string; rating: number}[]>([]);

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const updateCardStats = (cardId: string, rating: 'forgot' | 'hard' | 'good') => {
    setStats(prev => prev.map(s => {
      if (s.cardId !== cardId) return s;
      
      let { easeFactor, interval, repetitions } = s;
      
      if (rating === 'forgot') {
        repetitions = 0;
        interval = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
      } else if (rating === 'hard') {
        interval = Math.max(1, Math.ceil(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        repetitions += 1;
      } else {
        repetitions += 1;
        if (repetitions === 1) {
          interval = 1;
        } else if (repetitions === 2) {
          interval = 6;
        } else {
          interval = Math.ceil(interval * easeFactor);
        }
        easeFactor = easeFactor + 0.1;
      }
      
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + interval);
      
      return { ...s, easeFactor, interval, repetitions, dueDate };
    }));
  };

  const handleNext = (remembered: boolean) => {
    if (remembered) setCompleted(prev => prev + 1);
    
    setReviewHistory(prev => [...prev, {
      cardId: currentCard.id,
      rating: remembered ? 2 : 0
    }]);
    
    updateCardStats(currentCard.id, remembered ? 'good' : 'forgot');
    setIsFlipped(false);
    
    const newQueue = cardQueue.filter(i => i !== currentIndex);
    if (newQueue.length > 0) {
      const nextIndex = newQueue[0];
      setTimeout(() => setCurrentIndex(nextIndex), 100);
      setCardQueue(newQueue);
    } else {
      setDeckCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(0);
    setDeckCompleted(false);
    setCardQueue(Array.from({ length: flashcards.length }, (_, i) => i));
    setStats(INITIAL_CARDS);
    setReviewHistory([]);
  };

  const stats_ = useMemo(() => {
    const totalReviews = reviewHistory.length;
    const correctReviews = reviewHistory.filter(r => r.rating >= 2).length;
    const accuracy = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0;
    return { totalReviews, correctReviews, accuracy };
  }, [reviewHistory]);

  if (deckCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="py-12 bg-slate-900 border-slate-800">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Hoan thanh Deck!
          </h2>
          <p className="text-slate-400 mb-6">
            Ban da nho {completed} / {flashcards.length} cards
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-2xl font-bold text-white">{stats_.totalReviews}</div>
              <div className="text-xs text-slate-400">Tong lan review</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-2xl font-bold text-emerald-400">{stats_.correctReviews}</div>
              <div className="text-xs text-slate-400">Dung</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-2xl font-bold text-cyan-400">{stats_.accuracy}%</div>
              <div className="text-xs text-slate-400">Do chinh xac</div>
            </div>
          </div>

          <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700">
            Hoc lai
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Flashcards
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Con lai: {cardQueue.length} cards
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {completed} da nho
          </span>
        </div>
      </div>

      {/* Progress */}
      <Progress 
        value={((flashcards.length - cardQueue.length) / flashcards.length) * 100} 
        className="mb-8"
      />

      {/* Card */}
      <div 
        onClick={handleFlip}
        className="relative cursor-pointer mb-6 group"
      >
        <Card 
          className={`min-h-[320px] flex items-center justify-center transition-all duration-300 ${
            isFlipped ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'hover:shadow-lg'
          }`}
          padding="lg"
        >
          {!isFlipped ? (
            <div className="text-center">
              <Badge variant="info" className="mb-6">{currentCard.topic}</Badge>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
                {currentCard.front}
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Nhan de xem dap an
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Badge variant="success" className="mb-6">Dap an</Badge>
              <p className="text-lg text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {currentCard.back}
              </p>
            </div>
          )}
        </Card>

        {/* Flip indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-slate-400">{isFlipped ? 'Dap an' : 'Nhan de lat card'}</span>
        </div>
      </div>

      {/* Confidence Buttons */}
      {isFlipped && (
        <div className="flex gap-3 animate-in fade-in duration-200">
          <button
            onClick={() => handleNext(false)}
            className="flex-1 p-4 rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-semibold">Quen</span>
            </div>
            <p className="text-xs text-red-500/70">Can xem lai som</p>
          </button>
          <button
            onClick={() => handleNext(true)}
            className="flex-1 p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Nho roi</span>
            </div>
            <p className="text-xs text-emerald-500/70">Se gap lai sau</p>
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="flex justify-center">
          <Button onClick={handleFlip} variant="outline" className="px-8">
            Lat card
          </Button>
        </div>
      )}

      {/* SRS Info */}
      <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-slate-700 dark:text-slate-300">Ve SRS</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          He thong se tu dong sap xep lai cac card ban chua nho tot. 
          Card ban nho tot se duoc gap lai sau khoang thoi gian ngan dan.
        </p>
      </div>
    </div>
  );
}
