// ==========================================
// Flashcard Scheduling - Tin12 Pro Cánh Diều
// Spaced repetition system for optimal memory retention
// ==========================================

// ============ TYPES ============

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardProgress {
  id: string;
  easeFactor: number;     // SM-2 ease factor (default 2.5)
  interval: number;        // Days until next review
  repetitions: number;   // Number of consecutive correct answers
  nextReviewAt: string;  // ISO date string
  lastReviewedAt?: string;
  reviewCount: number;
}

export interface ReviewResult {
  cardId: string;
  quality: 0 | 1 | 2 | 3 | 4 | 5; // SM-2 quality rating
  // 0: complete blackout
  // 1: incorrect, but remembered upon seeing answer
  // 2: incorrect, but answer seemed easy to recall
  // 3: correct with serious difficulty
  // 4: correct with some hesitation
  // 5: perfect recall
  reviewedAt: string;
  timeTaken: number; // milliseconds spent on card
}

export interface SchedulingResult {
  cardId: string;
  newEaseFactor: number;
  newInterval: number;
  newRepetitions: number;
  nextReviewAt: string;
  wasCorrect: boolean;
}

// ============ SM-2 ALGORITHM IMPLEMENTATION ============

/**
 * Calculate next review schedule based on SM-2 algorithm
 * @param currentProgress - current card progress
 * @param reviewResult - result of the review
 * @returns new scheduling parameters
 */
export function calculateNextReview(
  currentProgress: FlashcardProgress,
  reviewResult: ReviewResult
): SchedulingResult {
  const { quality } = reviewResult;
  let { easeFactor, interval, repetitions } = currentProgress;

  // Minimum ease factor
  const MIN_EASE_FACTOR = 1.3;

  // Calculate wasCorrect for simple tracking
  const wasCorrect = quality >= 3;

  if (quality < 3) {
    // Failed - reset repetitions but keep ease factor (degrade slightly)
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
  } else {
    // Passed - update ease factor and interval
    easeFactor = Math.max(
      MIN_EASE_FACTOR,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    cardId: reviewResult.cardId,
    newEaseFactor: Math.round(easeFactor * 100) / 100,
    newInterval: interval,
    newRepetitions: repetitions,
    nextReviewAt: nextReviewDate.toISOString(),
    wasCorrect,
  };
}

// ============ SIMPLIFIED SCHEDULING ============

/**
 * Simplified remember/forgot update
 * For simpler UX - just remembers or forgot
 */
export interface SimpleReviewResult {
  remembered: boolean;
  previousInterval: number;
}

export interface SimpleSchedulingResult {
  cardId: string;
  newEaseFactor: number;
  newInterval: number;
  nextReviewAt: string;
  reviewCount: number;
}

/**
 * Update card after simple remember/forgot
 * This is a simplified SM-2 variant
 */
export function updateCardAfterReview(
  currentProgress: FlashcardProgress,
  remembered: boolean
): SimpleSchedulingResult {
  const MIN_EASE_FACTOR = 1.3;
  const MAX_INTERVAL = 365;

  let { easeFactor, interval, repetitions, reviewCount } = currentProgress;
  reviewCount++;

  if (remembered) {
    // Increase ease factor slightly
    easeFactor = Math.min(3.0, easeFactor + 0.1);

    // Increase interval based on current state
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else if (repetitions === 2) {
      interval = 7;
    } else {
      interval = Math.min(MAX_INTERVAL, Math.round(interval * easeFactor));
    }

    repetitions++;
  } else {
    // Reset - card needs to be studied again soon
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.3);
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    cardId: currentProgress.id,
    newEaseFactor: Math.round(easeFactor * 100) / 100,
    newInterval: interval,
    nextReviewAt: nextReviewDate.toISOString(),
    reviewCount,
  };
}

// ============ DECK MANAGEMENT ============

export interface DeckStats {
  deckId: string;
  totalCards: number;
  dueCards: number;
  newCards: number;
  learningCards: number;
  masteredCards: number;
  averageEaseFactor: number;
  retentionRate: number; // percentage of cards remembered last review
}

/**
 * Get deck statistics
 */
export function getDeckStats(
  deckId: string,
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>
): DeckStats {
  const deckCards = cards.filter(c => c.deckId === deckId);
  const now = new Date();

  let dueCards = 0;
  let newCards = 0;
  let learningCards = 0;
  let masteredCards = 0;
  let totalEaseFactor = 0;
  let easeFactorCount = 0;
  const _remembered = 0;
  const _totalReviewed = 0;

  for (const card of deckCards) {
    const cardProgress = progress[card.id];

    if (!cardProgress) {
      newCards++;
      dueCards++;
    } else {
      const nextReview = new Date(cardProgress.nextReviewAt);
      if (nextReview <= now) {
        dueCards++;
      }

      if (cardProgress.repetitions === 0) {
        learningCards++;
      } else if (cardProgress.interval >= 21) {
        masteredCards++;
      } else {
        learningCards++;
      }

      if (cardProgress.reviewCount > 0) {
        totalEaseFactor += cardProgress.easeFactor;
        easeFactorCount++;
      }
    }
  }

  // Calculate retention rate (simplified)
  // In real app, would track actual review results
  if (_totalReviewed > 0) {
    // Would use actual stored review results
  }

  return {
    deckId,
    totalCards: deckCards.length,
    dueCards,
    newCards,
    learningCards,
    masteredCards,
    averageEaseFactor: easeFactorCount > 0 
      ? Math.round((totalEaseFactor / easeFactorCount) * 100) / 100 
      : 2.5,
    retentionRate: 0, // Would calculate from actual review history
  };
}

/**
 * Get cards due for review today
 */
export function getDueCards(
  deckId: string,
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>,
  limit: number = 20
): Flashcard[] {
  const now = new Date();
  const deckCards = cards.filter(c => c.deckId === deckId);
  
  const dueCards: Flashcard[] = [];

  for (const card of deckCards) {
    const cardProgress = progress[card.id];

    // New card (no progress)
    if (!cardProgress) {
      dueCards.push(card);
      if (dueCards.length >= limit) break;
      continue;
    }

    // Due card
    const nextReview = new Date(cardProgress.nextReviewAt);
    if (nextReview <= now) {
      dueCards.push(card);
      if (dueCards.length >= limit) break;
    }
  }

  return dueCards;
}

/**
 * Get new cards that haven't been studied yet
 */
export function getNewCards(
  deckId: string,
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>,
  limit: number = 5
): Flashcard[] {
  const deckCards = cards.filter(c => c.deckId === deckId);
  const newCards: Flashcard[] = [];

  for (const card of deckCards) {
    if (!progress[card.id]) {
      newCards.push(card);
      if (newCards.length >= limit) break;
    }
  }

  return newCards;
}

// ============ REVIEW SESSION ============

export interface ReviewSession {
  cards: Flashcard[];
  progress: Record<string, FlashcardProgress>;
  currentIndex: number;
  startedAt: string;
  results: ReviewResult[];
}

export interface SessionSummary {
  totalCards: number;
  correctCount: number;
  incorrectCount: number;
  averageTime: number;
  cardsReviewed: number;
  newCardsStudied: number;
  retentionRate: number;
}

/**
 * Calculate review session summary
 */
export function calculateSessionSummary(
  session: ReviewSession
): SessionSummary {
  const { cards, results } = session;
  
  const correctCount = results.filter(r => r.quality >= 3).length;
  const incorrectCount = results.filter(r => r.quality < 3).length;
  
  const totalTime = results.reduce((sum, r) => sum + r.timeTaken, 0);
  const averageTime = results.length > 0 ? Math.round(totalTime / results.length) : 0;

  // Count new cards (first review)
  const newCardsStudied = results.filter((r, i) => {
    const card = cards[i];
    return card && !session.progress[card.id];
  }).length;

  const retentionRate = results.length > 0 
    ? Math.round((correctCount / results.length) * 100) 
    : 0;

  return {
    totalCards: cards.length,
    correctCount,
    incorrectCount,
    averageTime,
    cardsReviewed: results.length,
    newCardsStudied,
    retentionRate,
  };
}

// ============ INITIAL PROGRESS ============

/**
 * Create initial progress for a new card
 */
export function createInitialProgress(cardId: string): FlashcardProgress {
  return {
    id: cardId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewAt: new Date().toISOString(), // Due immediately
    reviewCount: 0,
  };
}

/**
 * Create initial progress for multiple cards
 */
export function createInitialProgressBatch(
  cardIds: string[]
): Record<string, FlashcardProgress> {
  const progress: Record<string, FlashcardProgress> = {};
  
  for (const cardId of cardIds) {
    progress[cardId] = createInitialProgress(cardId);
  }
  
  return progress;
}

// ============ FORECAST ============

export interface ForecastDay {
  date: string;
  dueCount: number;
  newCount: number;
  reviewCount: number;
}

/**
 * Generate review forecast for upcoming days
 */
export function generateForecast(
  deckId: string,
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>,
  days: number = 7
): ForecastDay[] {
  const deckCards = cards.filter(c => c.deckId === deckId);
  const forecast: ForecastDay[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    let dueCount = 0;
    let newCount = 0;
    let reviewCount = 0;

    for (const card of deckCards) {
      const cardProgress = progress[card.id];
      const nextReview = cardProgress 
        ? new Date(cardProgress.nextReviewAt) 
        : null;
      const cardDate = nextReview?.toISOString().split('T')[0];

      if (cardDate === dateStr) {
        dueCount++;
        if (!cardProgress) {
          newCount++;
        } else if (cardProgress.repetitions === 0) {
          reviewCount++; // Learning cards
        } else {
          reviewCount++; // Review cards
        }
      }
    }

    forecast.push({ date: dateStr, dueCount, newCount, reviewCount });
  }

  return forecast;
}

// ============ DIFFICULTY ADJUSTMENT ============

/**
 * Adjust card difficulty based on content
 */
export function adjustCardDifficulty(
  card: Flashcard,
  userPerformance: Record<string, number> // cardId -> success rate
): Flashcard['difficulty'] {
  const performance = userPerformance[card.id];

  if (performance === undefined) {
    return card.difficulty;
  }

  // If user consistently gets a card wrong, mark as harder
  if (performance < 0.3) {
    return 'hard';
  }
  
  // If user consistently gets it right, mark as easier
  if (performance > 0.9) {
    return 'easy';
  }

  return card.difficulty;
}