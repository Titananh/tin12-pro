// ==========================================
// Unit Tests - Tin12 Pro Engine Libs
// Quick verification of core logic functions
// ==========================================

import { describe, it, expect } from 'vitest';

// ============ QUIZ ENGINE TESTS ============

import {
  gradeMultipleChoice,
  gradeTrueFalseGroup,
  analyzeQuizSubmission,
  shuffleArray,
} from '../../src/lib/quiz-engine';

describe('quiz-engine', () => {
  describe('gradeMultipleChoice', () => {
    it('should return true when user answer matches correct answer', () => {
      expect(gradeMultipleChoice(1, 1)).toBe(true);
      expect(gradeMultipleChoice(0, 0)).toBe(true);
      expect(gradeMultipleChoice(3, 3)).toBe(true);
    });

    it('should return false when user answer does not match', () => {
      expect(gradeMultipleChoice(0, 1)).toBe(false);
      expect(gradeMultipleChoice(2, 3)).toBe(false);
      expect(gradeMultipleChoice(1, 0)).toBe(false);
    });
  });

  describe('gradeTrueFalseGroup', () => {
    it('should grade all correct answers', () => {
      const result = gradeTrueFalseGroup([true, true, false, true], [true, true, false, true]);
      expect(result.correctCount).toBe(4);
      expect(result.isFullyCorrect).toBe(true);
    });

    it('should grade partial correct answers', () => {
      const result = gradeTrueFalseGroup([true, false, false, true], [true, true, false, true]);
      expect(result.correctCount).toBe(3);
      expect(result.isFullyCorrect).toBe(false);
    });

    it('should grade all wrong answers', () => {
      const result = gradeTrueFalseGroup([false, false, true, false], [true, true, false, true]);
      expect(result.correctCount).toBe(0);
      expect(result.isFullyCorrect).toBe(false);
    });

    it('should track individual statement results', () => {
      const result = gradeTrueFalseGroup([true, false, false, true], [true, true, false, true]);
      expect(result.results[0].isCorrect).toBe(true);
      expect(result.results[1].isCorrect).toBe(false);
      expect(result.results[2].isCorrect).toBe(true);
      expect(result.results[3].isCorrect).toBe(true);
    });
  });

  describe('shuffleArray', () => {
    it('should return array of same length', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(arr.length);
    });

    it('should contain all original elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should not mutate original array', () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [...arr];
      shuffleArray(arr);
      expect(arr).toEqual(original);
    });
  });

  describe('analyzeQuizSubmission', () => {
    it('should calculate correct score for all correct', () => {
      const submission = {
        quizId: 'test-quiz',
        answers: {
          'q1': 1,
          'q2': 2,
        },
      };

      const questions = [
        {
          id: 'q1',
          type: 'mcq' as const,
          question: 'Q1',
          correctAnswer: 1,
          explanation: 'E1',
          difficulty: 'easy' as const,
          topic: 'ai',
        },
        {
          id: 'q2',
          type: 'mcq' as const,
          question: 'Q2',
          correctAnswer: 2,
          explanation: 'E2',
          difficulty: 'easy' as const,
          topic: 'ai',
        },
      ];

      const result = analyzeQuizSubmission(submission, questions);
      expect(result.score).toBe(100);
      expect(result.correctCount).toBe(2);
      expect(result.wrongCount).toBe(0);
    });

    it('should calculate correct score for partial correct', () => {
      const submission = {
        quizId: 'test-quiz',
        answers: {
          'q1': 1,
          'q2': 0, // wrong
        },
      };

      const questions = [
        {
          id: 'q1',
          type: 'mcq' as const,
          question: 'Q1',
          correctAnswer: 1,
          explanation: 'E1',
          difficulty: 'easy' as const,
          topic: 'ai',
        },
        {
          id: 'q2',
          type: 'mcq' as const,
          question: 'Q2',
          correctAnswer: 2,
          explanation: 'E2',
          difficulty: 'easy' as const,
          topic: 'ai',
        },
      ];

      const result = analyzeQuizSubmission(submission, questions);
      expect(result.score).toBe(50);
      expect(result.correctCount).toBe(1);
      expect(result.wrongCount).toBe(1);
      expect(result.wrongTopics).toContain('ai');
    });
  });
});

// ============ EXAM GENERATOR TESTS ============

import {
  getTopicsForTrack,
  topicMatchesCategory,
  selectPracticeQuestions,
} from '../../src/lib/exam-generator';

describe('exam-generator', () => {
  describe('getTopicsForTrack', () => {
    it('should return CS topics for cs track', () => {
      const topics = getTopicsForTrack('cs');
      expect(topics).toContain('AI');
      expect(topics).toContain('MANG');
      expect(topics).toContain('THUAT_TOAN');
    });

    it('should return ICT topics for ict track', () => {
      const topics = getTopicsForTrack('ict');
      expect(topics).toContain('HTML_CSS');
      expect(topics).toContain('MANG');
    });

    it('should return all topics for general track', () => {
      const topics = getTopicsForTrack('general');
      expect(topics.length).toBeGreaterThan(5);
    });
  });

  describe('topicMatchesCategory', () => {
    it('should match AI topics to AI category', () => {
      expect(topicMatchesCategory('ai-ml', 'AI')).toBe(true);
      expect(topicMatchesCategory('machine-learning', 'AI')).toBe(true);
      expect(topicMatchesCategory('deep-learning', 'AI')).toBe(true);
    });

    it('should not match HTML to AI category', () => {
      expect(topicMatchesCategory('html-css', 'AI')).toBe(false);
      expect(topicMatchesCategory('css', 'AI')).toBe(false);
    });
  });

  describe('selectPracticeQuestions', () => {
    it('should return requested number of questions', () => {
      const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
        id: `q${i}`,
        type: 'mcq' as const,
        question: `Q${i}`,
        correctAnswer: 0,
        explanation: 'E',
        difficulty: 'medium' as const,
        topic: 'ai',
      }));

      const result = selectPracticeQuestions(mockQuestions, [], ['ai'], 10);
      expect(result.length).toBe(10);
    });
  });
});

// ============ MASTERY TESTS ============

import {
  calculateRecentAccuracyScore,
  calculatePracticeVolumeScore,
  calculateMastery,
} from '../../src/lib/mastery';

describe('mastery', () => {
  describe('calculateRecentAccuracyScore', () => {
    it('should return 0 for empty scores', () => {
      expect(calculateRecentAccuracyScore([])).toBe(0);
    });

    it('should return single score as-is', () => {
      expect(calculateRecentAccuracyScore([80])).toBe(80);
    });

    it('should weight recent scores higher', () => {
      const scores = [60, 80]; // older=60, newer=80
      const result = calculateRecentAccuracyScore(scores);
      // Weighted: (60*1 + 80*2) / 3 = ~73
      expect(result).toBeGreaterThan(70);
      expect(result).toBeLessThan(80);
    });
  });

  describe('calculatePracticeVolumeScore', () => {
    it('should return low score for low volume', () => {
      const result = calculatePracticeVolumeScore(10, 2);
      expect(result).toBeLessThan(50);
    });

    it('should return higher score for consistent practice', () => {
      const result = calculatePracticeVolumeScore(200, 20);
      expect(result).toBeGreaterThan(60);
    });
  });

  describe('calculateMastery', () => {
    it('should calculate combined score with weights', () => {
      const input = {
        recentScores: [80, 85, 90],
        totalQuestionsAnswered: 100,
        questionsPerWeek: 10,
        difficultyScores: {
          easy: { correct: 8, total: 10 },
          medium: { correct: 6, total: 10 },
          hard: { correct: 2, total: 5 },
        },
        avgTimePerQuestion: 30,
        benchmarkTime: 45,
        completedLessons: ['lesson-1', 'lesson-2'],
        completedLabs: ['lab-1'],
        totalLessons: 10,
        totalLabs: 5,
      };

      const result = calculateMastery(input);
      expect(result.overallScore).toBeGreaterThan(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(result.level).toBeDefined();
      expect(result.breakdown).toHaveLength(5);
    });
  });
});

// ============ FLASHCARD TESTS ============

import {
  updateCardAfterReview,
  createInitialProgress,
} from '../../src/lib/flashcards';

describe('flashcards', () => {
  describe('updateCardAfterReview', () => {
    it('should increase interval on remember', () => {
      const progress = createInitialProgress('card-1');
      progress.interval = 0;
      progress.repetitions = 0;

      const result = updateCardAfterReview(progress, true);

      expect(result.newInterval).toBeGreaterThan(0);
      expect(result.reviewCount).toBe(1);
    });

    it('should reset interval on forgot', () => {
      const progress = createInitialProgress('card-1');
      progress.interval = 7;
      progress.repetitions = 3;

      const result = updateCardAfterReview(progress, false);

      expect(result.newInterval).toBe(1);
      expect(result.reviewCount).toBe(1);
    });

    it('should decrease ease factor on forgot', () => {
      const progress = createInitialProgress('card-1');
      progress.easeFactor = 2.5;

      const result = updateCardAfterReview(progress, false);

      expect(result.newEaseFactor).toBeLessThan(2.5);
    });
  });

  describe('createInitialProgress', () => {
    it('should create progress with default values', () => {
      const progress = createInitialProgress('card-123');
      expect(progress.id).toBe('card-123');
      expect(progress.easeFactor).toBe(2.5);
      expect(progress.interval).toBe(0);
      expect(progress.repetitions).toBe(0);
      expect(progress.reviewCount).toBe(0);
    });
  });
});

// ============ LAB ENGINE TESTS ============

import {
  checkHTML,
  checkCSS,
  checkAccessibility,
  quickValidate,
} from '../../src/lib/lab-engine';

describe('lab-engine', () => {
  describe('checkHTML', () => {
    it('should detect DOCTYPE', () => {
      const result = checkHTML('<!DOCTYPE html><html><head></head><body></body></html>');
      expect(result.checks.find(c => c.criterion.includes('DOCTYPE'))?.passed).toBe(true);
    });

    it('should detect h1 tag', () => {
      const result = checkHTML('<html><body><h1>Title</h1></body></html>');
      expect(result.checks.find(c => c.criterion.includes('h1'))?.passed).toBe(true);
    });

    it('should detect img with alt', () => {
      const result = checkHTML('<img src="test.jpg" alt="test">');
      expect(result.checks.find(c => c.criterion.includes('alt'))?.passed).toBe(true);
    });

    it('should fail on missing required elements', () => {
      const result = checkHTML('<div>Content</div>');
      expect(result.score).toBeLessThan(result.maxScore);
    });
  });

  describe('checkCSS', () => {
    it('should detect style tag', () => {
      const result = checkCSS('<style>.test { color: red; }</style>');
      expect(result.checks.find(c => c.criterion.includes('style'))?.passed).toBe(true);
    });

    it('should detect CSS properties', () => {
      const result = checkCSS('<style>body { color: blue; padding: 10px; }</style>');
      expect(result.checks.find(c => c.criterion.includes('font-family'))?.passed).toBe(false);
      expect(result.checks.find(c => c.criterion.includes('color'))?.passed).toBe(true);
    });
  });

  describe('checkAccessibility', () => {
    it('should detect missing alt attribute', () => {
      const result = checkAccessibility('<img src="test.jpg">');
      expect(result.issues).toContain('Thiếu alt attribute cho hình ảnh');
    });

    it('should pass when alt is present', () => {
      const result = checkAccessibility('<img src="test.jpg" alt="description">');
      expect(result.issues).toHaveLength(0);
    });
  });

  describe('quickValidate', () => {
    it('should validate correct HTML structure', () => {
      const result = quickValidate('<html><head></head><body><h1>Title</h1><p>Text</p></body></html>');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail on missing html tag', () => {
      const result = quickValidate('<head></head><body></body>');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Thiếu thẻ <html>');
    });
  });
});

// ============ AI TUTOR TESTS ============

import {
  generateTutorResponse,
  isAskingForQuestionHelp,
} from '../../src/lib/ai-tutor';

describe('ai-tutor', () => {
  describe('generateTutorResponse', () => {
    it('should respond to greeting', () => {
      const response = generateTutorResponse('xo bạn');
      expect(response.message).toContain('Chào');
      expect(response.confidence).toBe('high');
    });

    it('should provide hints for question help', () => {
      const response = generateTutorResponse('câu nào là đáp án?');
      expect(response.isHintOnly).toBe(true);
    });

    it('should explain topics when asked', () => {
      const response = generateTutorResponse('AI là gì?');
      expect(response.message).toContain('AI');
      expect(response.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe('isAskingForQuestionHelp', () => {
    it('should detect question help requests', () => {
      expect(isAskingForQuestionHelp('làm sao trả lời câu này')).toBe(true);
      expect(isAskingForQuestionHelp('đáp án câu này là gì')).toBe(true);
      expect(isAskingForQuestionHelp('chọn thế nào')).toBe(true);
    });

    it('should not match regular questions', () => {
      expect(isAskingForQuestionHelp('giải thích về AI')).toBe(false);
    });
  });
});

// ============ SECURITY TESTS ============

import {
  sanitizeHTML,
  sanitizeInput,
  isValidEmail,
  isValidURL,
  containsCode,
} from '../../src/lib/security';

describe('security', () => {
  describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeHTML(input);
      expect(result).not.toContain('script');
      expect(result).toContain('Hello');
    });

    it('should remove event handlers', () => {
      const input = '<img src=x onerror=alert(1)>';
      const result = sanitizeHTML(input);
      expect(result).not.toContain('onerror');
    });

    it('should remove javascript URLs', () => {
      const input = '<a href="javascript:alert(1)">Click</a>';
      const result = sanitizeHTML(input);
      expect(result).not.toContain('javascript');
    });
  });

  describe('sanitizeInput', () => {
    it('should remove angle brackets', () => {
      const result = sanitizeInput('<script>alert(1)</script>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('should trim and limit length', () => {
      const result = sanitizeInput('  test  ');
      expect(result).toBe('test');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('no@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('ftp://example.com')).toBe(false);
    });
  });

  describe('containsCode', () => {
    it('should detect script tags', () => {
      expect(containsCode('<script>alert(1)</script>')).toBe(true);
    });

    it('should detect javascript URLs', () => {
      expect(containsCode('javascript:alert(1)')).toBe(true);
    });

    it('should detect event handlers', () => {
      expect(containsCode('onclick=alert(1)')).toBe(true);
    });

    it('should not flag normal text', () => {
      expect(containsCode('Hello this is normal text')).toBe(false);
    });
  });
});