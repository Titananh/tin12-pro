# EXAM_BLUEPRINT

## Tin12 Pro Cánh Diều - Exam Blueprint

> This document specifies the structure, scoring, and constraints for all exam content in Tin12 Pro.

---

## 1. Exam Format Specification

### 1.1 Official TN THPT Structure

| Part | Type | Questions | Statements | Points Each | Total Points | Time |
|------|------|-----------|------------|-------------|--------------|------|
| Part 1 | MCQ | 24 | — | 0.25 | 6.0 | 50 min |
| Part 2 | True/False Groups | 6 | 4 per group | 0.125 per stmt | 3.0 | — |
| **Total** | | **30** | **24** | | **9.0** | **50 min** |

**Scoring:** 9 points total → scaled to 10 points

### 1.2 Question Distribution by Topic

| Topic | Part 1 (MCQ) | Part 2 (T/F Groups) | Total Weight |
|-------|:---:|:---:|:---:|
| AI & Machine Learning | 3 | 1 group | ~15% |
| Computer Networks | 3 | 1 group | ~15% |
| Digital Ethics & Security | 2 | 0.5 group | ~10% |
| HTML/CSS & Web | 3 | 0.5 group | ~15% |
| Computer Architecture | 2 | 0.5 group | ~10% |
| Algorithms & Programming | 3 | 1 group | ~15% |
| Data Science | 2 | 0.5 group | ~10% |
| Others (Software, etc.) | 6 | 1 group | ~10% |
| **Total** | **24** | **6 groups** | **100%** |

---

## 2. Question Types

### 2.1 Part 1: Multiple Choice Questions (MCQ)

**Format:**
- 4 options per question (A, B, C, D)
- ONE correct answer
- Question text clearly states the problem
- No "all of the above" or "none of the above" options

**Example:**
```
Câu 1: [Topic: Computer Architecture]
Thành phần nào lưu trữ dữ liệu tạm thời khi máy tính đang chạy?
A. ROM
B. RAM        ← Correct
C. CPU
D. Ổ cứng
```

### 2.2 Part 2: True/False Groups

**Format:**
- 6 groups per exam
- Each group has:
  - Context paragraph (introduces the topic)
  - 4 statements (labeled i, ii, iii, iv)
- Each statement is independently graded as True/False

**Grading:**
- Each statement: 0.125 points
- Each group: 0.5 points (4 × 0.125)
- Part 2 total: 3 points

**Example:**
```
Câu 7: Về Trí tuệ Nhân tạo (AI)

(i) AI hiện tại là AI hẹp, chỉ giỏi một việc cụ thể.           [ĐÚNG]
(ii) AGI (Artificial General Intelligence) vẫn chưa được phát triển. [ĐÚNG]
(iii) AI có thể thay thế hoàn toàn con người trong mọi công việc.  [SAI]
(iv) Machine Learning là một tập con của AI.                   [ĐÚNG]

Thí sinh điền: (i) Đ, (ii) S, (iii) S, (iv) Đ
```

---

## 3. Difficulty Guidelines

### 3.1 Distribution Target

| Difficulty | Percentage | Characteristics |
|------------|:----------:|-----------------|
| Easy | 40% | Recall facts, direct understanding |
| Medium | 40% | Apply concepts, simple analysis |
| Hard | 20% | Synthesis, evaluation, multi-step reasoning |

### 3.2 Easy Questions
- Recall established facts
- Direct application of single concept
- No distractors that require deep analysis
- Clear, unambiguous wording

### 3.3 Medium Questions
- Apply 2–3 concepts together
- Interpret data or diagrams
- Recognize patterns or classifications
- Simple problem-solving (1–2 steps)

### 3.4 Hard Questions
- Multi-step reasoning required
- Analyze trade-offs or design decisions
- Synthesize information from multiple sources
- Edge cases or non-obvious applications

---

## 4. Exam Engine Constraints

### 4.1 Exam Generation Rules

When generating a personalized exam, the system MUST:

1. **Select 24 MCQs** with distribution:
   - 9–10 easy questions
   - 9–10 medium questions
   - 4–6 hard questions

2. **Select 6 T/F Groups** with distribution:
   - At least 1 from each major topic
   - Balance of easy/hard statements within groups

3. **Ensure no duplicate questions** in the same exam session

4. **Track question history** to avoid presenting recently-answered questions

### 4.2 Time Management

| Feature | Specification |
|---------|--------------|
| Total time | 50 minutes |
| Auto-submit | At time limit (with 1-minute warning) |
| Question navigator | Jump to any question |
| Mark for review | Flag questions to revisit |
| Timer display | MM:SS countdown |

### 4.3 Auto-Save

- Save progress every 30 seconds to localStorage
- On page reload, restore last saved state
- Session ID required to resume exam

---

## 5. Scoring & Results

### 5.1 Score Calculation

**Part 1 Score:**
```
part1_score = (correct_MCQs / 24) × 6.0 points
```

**Part 2 Score:**
```
part2_score = (correct_statements / 24) × 3.0 points
```

**Total Score:**
```
total_score = part1_score + part2_score
scaled_score = (total_score / 9.0) × 10.0  // Round to 1 decimal
```

### 5.2 Results Display

After exam completion, show:

| Section | Content |
|---------|---------|
| Total Score | X/10 with percentage |
| Part 1 Score | X/6 with percentage |
| Part 2 Score | X/3 with percentage |
| Time Spent | MM:SS |
| Topic Breakdown | Per-topic correct/total |
| Wrong Answers | List with correct answers + explanations |
| Mastery Impact | Updated mastery scores for affected topics |

### 5.3 Wrong Answer Review

- All wrong answers are tagged by topic
- Corresponding lessons flashcard sets are scheduled for review
- Topics with 2+ wrong answers are prioritized in Daily Plan

---

## 6. Mock Exam Generation

### 6.1 Topic-Based Exam
- Teacher selects specific topics
- System generates exam from question pool filtered by topic
- Maintains difficulty distribution target

### 6.2 Weakness-Focused Exam
- System identifies topics with lowest mastery scores
- Prioritizes questions from weak topics
- 50% questions from weak topics, 50% randomly selected

### 6.3 Full Random Exam
- Random selection maintaining format constraints
- No topic filtering
- Same difficulty distribution target

---

## 7. Question Metadata Schema

Each question in the bank MUST include:

```typescript
interface MCQuestion {
  id: string;
  type: 'mcq';
  question: string;
  options: string[];        // ['A', 'B', 'C', 'D']
  correctAnswer: number;     // 0-based index
  topic: string;            // e.g., 'ai-ml', 'html-css'
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;       // Shown after grading
}

interface TFStatement {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface TFGroup {
  id: string;
  type: 'true-false';
  context: string;           // Topic introduction paragraph
  statements: TFStatement[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

---

## 8. Proctoring Notes (For Future Implementation)

### 8.1 Browser lockdown
- Full-screen mode recommended
- Copy/paste disabled (prevents answer sharing)

### 8.2 Session management
- Single session per exam
- No tab switching alerts
- Automatic submit on time limit

### 8.3 (MVP Note)
Current implementation is open-book for learning purposes. Lockdown features are planned for v2.0.

---

_Last updated: May 2026_