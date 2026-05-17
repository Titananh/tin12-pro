// ==========================================
// Flashcards Page - Tin12 Pro Cánh Diều
// Spaced repetition flashcard review
// ==========================================

'use client';

import { useState } from 'react';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { flashcards } from '@/content/flashcards';

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (remembered: boolean) => {
    if (remembered) setCompleted(prev => prev + 1);
    
    setIsFlipped(false);
    
    if (currentIndex < flashcards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
    } else {
      setDeckCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(0);
    setDeckCompleted(false);
  };

  if (deckCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="py-12">
          <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Hoàn thành Deck!
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Bạn đã nhớ {completed} / {flashcards.length} cards
          </p>
          <Button onClick={handleRestart}>
            Học lại
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Flashcards
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          {currentIndex + 1} / {flashcards.length} cards
        </p>
      </div>

      {/* Progress */}
      <Progress 
        value={(currentIndex / flashcards.length) * 100} 
        className="mb-8"
        showLabel
      />

      {/* Card */}
      <div 
        onClick={handleFlip}
        className="relative cursor-pointer mb-8"
      >
        <Card 
          className={`min-h-[300px] flex items-center justify-center transition-all duration-300 ${
            isFlipped ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
          padding="lg"
        >
          {!isFlipped ? (
            <div className="text-center">
              <Badge variant="blue" className="mb-4">{currentCard.topic}</Badge>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {currentCard.front}
              </h2>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                Nhấn để xem đáp án
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Badge variant="emerald" className="mb-4">Đáp án</Badge>
              <p className="text-lg text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                {currentCard.back}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          variant="danger"
          className="flex-1"
          onClick={() => handleNext(false)}
        >
          Quên 😔
        </Button>
        <Button
          className="flex-1"
          onClick={() => handleNext(true)}
        >
          Nhớ rồi! 🎉
        </Button>
      </div>
    </div>
  );
}