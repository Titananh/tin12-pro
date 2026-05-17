// ==========================================
// Quiz Engine Unit Tests - Tin12 Pro Cánh Diều
// Tests for gradeMultipleChoice, gradeTrueFalseGroup, mastery score
// ==========================================

import { describe, it, expect } from 'vitest';
import {
  gradeMultipleChoice,
  gradeTrueFalseGroup,
  analyzeQuizSubmission,
  calculatePart1Score,
  calculatePart2Score,
  shuffleArray,
  getRandomItems,
  calculateAvgTimePerQuestion,
} from '../lib/quiz-engine';
import type { Question } from '../lib/types';

describe('gradeMultipleChoice', () => {
  it('returns true when userAnswer equals correctAnswer', () => {
    expect(gradeMultipleChoice(1, 1)).toBe(true);
    expect(gradeMultipleChoice(0, 0)).toBe(true);
  });

  it('returns false when userAnswer differs from correctAnswer', () => {
    expect(gradeMultipleChoice(0, 1)).toBe(false);
    expect(gradeMultipleChoice(2, 0)).toBe(false);
    expect(gradeMultipleChoice(3, 2)).toBe(false);
  });

  it('handles edge cases with index 0', () => {
    expect(gradeMultipleChoice(0, 0)).toBe(true);
    expect(gradeMultipleChoice(1, 0)).toBe(false);
  });
});

describe('gradeTrueFalseGroup', () => {
  it('returns isFullyCorrect true when all answers match', () => {
    const userAnswers = [true, true, false, true];
    const correctAnswers = [true, true, false, true];
    const result = gradeTrueFalseGroup(userAnswers, correctAnswers);

    expect(result.isFullyCorrect).toBe(true);
    expect(result.correctCount).toBe(4);
    expect(result.results.every(r => r.isCorrect)).toBe(true);
  });

  it('returns isFullyCorrect false when any answer differs', () => {
    const userAnswers = [true, true, true, true];
    const correctAnswers = [true, true, false, true];
    const result = gradeTrueFalseGroup(userAnswers, correctAnswers);

    expect(result.isFullyCorrect).toBe(false);
    expect(result.correctCount).toBe(3);
  });

  it('returns correct per-statement results', () => {
    const userAnswers = [true, false, true, false];
    const correctAnswers = [true, true, true, false];
    const result = gradeTrueFalseGroup(userAnswers, correctAnswers);

    expect(result.results[0]).toEqual({
      statementIndex: 0,
      userAnswer: true,
      correctAnswer: true,
      isCorrect: true,
    });
    expect(result.results[1]).toEqual({
      statementIndex: 1,
      userAnswer: false,
      correctAnswer: true,
      isCorrect: false,
    });
    expect(result.results[2]).toEqual({
      statementIndex: 2,
      userAnswer: true,
      correctAnswer: true,
      isCorrect: true,
    });
    expect(result.results[3]).toEqual({
      statementIndex: 3,
      userAnswer: false,
      correctAnswer: false,
      isCorrect: true,
    });
  });

  it('handles empty arrays', () => {
    const result = gradeTrueFalseGroup([], []);
    expect(result.isFullyCorrect).toBe(true);
    expect(result.correctCount).toBe(0);
  });
});

describe('analyzeQuizSubmission', () => {
  const mockQuestions: Question[] = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Sample MCQ 1',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 1,
      explanation: 'Explanation 1',
      difficulty: 'easy',
      topic: 'ai-ml',
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Sample MCQ 2',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Explanation 2',
      difficulty: 'medium',
      topic: 'html-css',
    },
    {
      id: 'q3',
      type: 'true-false',
      question: 'Sample TF',
      statements: ['S1', 'S2', 'S3', 'S4'],
      correctAnswer: [true, true, false, true],
      explanation: 'Explanation 3',
      difficulty: 'easy',
      topic: 'mạng-máy-tính',
    },
  ];

  it('calculates score correctly for all correct answers', () => {
    const submission = {
      quizId: 'quiz-1',
      answers: {
        q1: 1, // correct
        q2: 0, // correct
        q3: [true, true, false, true], // all correct
      },
    };

    const result = analyzeQuizSubmission(submission, mockQuestions);

    expect(result.score).toBe(100);
    expect(result.correctCount).toBe(3);
    expect(result.wrongCount).toBe(0);
    expect(result.part1Score).toBe(100);
    expect(result.part2Score).toBe(100);
  });

  it('calculates score correctly for partial correct answers', () => {
    const submission = {
      quizId: 'quiz-1',
      answers: {
        q1: 1, // correct
        q2: 2, // wrong
        q3: [true, true, false, true], // all correct
      },
    };

    const result = analyzeQuizSubmission(submission, mockQuestions);

    expect(result.score).toBeCloseTo(67, 0); // 2/3 ≈ 67%
    expect(result.correctCount).toBe(2);
    expect(result.wrongCount).toBe(1);
    expect(result.wrongTopics).toContain('html-css');
  });

  it('identifies wrong topics correctly', () => {
    const submission = {
      quizId: 'quiz-1',
      answers: {
        q1: 0, // wrong
        q2: 2, // wrong
        q3: [true, true, false, true], // correct
      },
    };

    const result = analyzeQuizSubmission(submission, mockQuestions);

    expect(result.wrongTopics).toContain('ai-ml');
    expect(result.wrongTopics).toContain('html-css');
  });

  it('handles missing answers gracefully', () => {
    const submission = {
      quizId: 'quiz-1',
      answers: {},
    };

    const result = analyzeQuizSubmission(submission, mockQuestions);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.wrongCount).toBe(3);
  });

  it('includes explanations in results', () => {
    const submission = {
      quizId: 'quiz-1',
      answers: { q1: 1 },
    };

    const result = analyzeQuizSubmission(submission, mockQuestions);

    expect(result.explanations.q1).toBe('Explanation 1');
    expect(result.explanations.q2).toBe('Explanation 2');
  });
});

describe('calculatePart1Score', () => {
  it('calculates score for MCQ exam part', () => {
    const questions = [
      { id: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctAnswer: 1, topic: 'ai-ml', difficulty: 'easy' as const },
      { id: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, topic: 'ai-ml', difficulty: 'easy' as const },
      { id: 'q3', question: 'Q3', options: ['A', 'B', 'C', 'D'], correctAnswer: 2, topic: 'ai-ml', difficulty: 'easy' as const },
      { id: 'q4', question: 'Q4', options: ['A', 'B', 'C', 'D'], correctAnswer: 1, topic: 'ai-ml', difficulty: 'easy' as const },
    ];

    const userAnswers = {
      q1: 1, // correct
      q2: 0, // correct
      q3: 2, // correct
      q4: 3, // wrong
    };

    const result = calculatePart1Score(userAnswers, questions);

    expect(result.correctCount).toBe(3);
    expect(result.totalCount).toBe(4);
    expect(result.score).toBe(75);
  });

  it('handles empty question set', () => {
    const result = calculatePart1Score({}, []);
    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.totalCount).toBe(0);
  });
});

describe('calculatePart2Score', () => {
  it('calculates score for T/F exam part', () => {
    const groups = [
      {
        id: 'tf1',
        context: 'About AI',
        statements: [
          { id: 's1', text: 'S1', isCorrect: true },
          { id: 's2', text: 'S2', isCorrect: true },
          { id: 's3', text: 'S3', isCorrect: false },
          { id: 's4', text: 'S4', isCorrect: true },
        ],
      },
    ];

    const userAnswers = {
      tf1: [true, true, false, true], // all correct
    };

    const result = calculatePart2Score(userAnswers, groups);

    expect(result.correctCount).toBe(4);
    expect(result.totalCount).toBe(4);
    expect(result.score).toBe(100);
  });

  it('handles partial correct answers per group', () => {
    const groups = [
      {
        id: 'tf1',
        context: 'About AI',
        statements: [
          { id: 's1', text: 'S1', isCorrect: true },
          { id: 's2', text: 'S2', isCorrect: true },
          { id: 's3', text: 'S3', isCorrect: false },
          { id: 's4', text: 'S4', isCorrect: true },
        ],
      },
    ];

    const userAnswers = {
      tf1: [true, false, false, true], // 3 correct: s1, s3, s4 match
    };

    const result = calculatePart2Score(userAnswers, groups);

    expect(result.correctCount).toBe(3);
    expect(result.totalCount).toBe(4);
    expect(result.score).toBe(75);
  });
});

describe('shuffleArray', () => {
  it('returns array with same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    expect(result.length).toBe(arr.length);
  });

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    arr.forEach(item => {
      expect(result).toContain(item);
    });
  });

  it('does not modify original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(original);
  });
});

describe('getRandomItems', () => {
  it('returns requested count items', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = getRandomItems(arr, 3);
    expect(result.length).toBe(3);
  });

  it('returns all items if count exceeds length', () => {
    const arr = [1, 2, 3];
    const result = getRandomItems(arr, 10);
    expect(result.length).toBe(3);
  });

  it('handles zero count', () => {
    const arr = [1, 2, 3];
    const result = getRandomItems(arr, 0);
    expect(result.length).toBe(0);
  });
});

describe('calculateAvgTimePerQuestion', () => {
  it('calculates average time correctly', () => {
    expect(calculateAvgTimePerQuestion(600, 10)).toBe(60);
    expect(calculateAvgTimePerQuestion(300, 30)).toBe(10);
  });

  it('handles zero question count', () => {
    expect(calculateAvgTimePerQuestion(100, 0)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calculateAvgTimePerQuestion(100, 3)).toBe(33); // 33.33 rounds to 33
  });
});