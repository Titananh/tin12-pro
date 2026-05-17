# LEARNING_ARCHITECTURE

## Tin12 Pro Cánh Diều - Learning Architecture

---

## 1. Learning Objectives

### 1.1 Terminal Goal
By the end of the course, students will be able to:
- Demonstrate mastery of Tin học 12 Cánh Diều curriculum at exam-ready level
- Apply computer science concepts to real-world problems
- Build functional web projects (HTML/CSS)
- Make informed decisions about technology careers

### 1.2 Scaffolding Path
The platform supports students from **zero knowledge** to **exam mastery** through personalized learning paths.

---

## 2. Learning Tracks

### 2.1 Track Structure

```
Tin12 Pro Learning Architecture
├── [Tier 0] Placement Test (baseline assessment)
├── [Tier 1] Common Foundation
│   ├── Computer Architecture & Software
│   ├── Digital Ethics & Security
│   ├── AI & Society
│   ├── Networking Basics
│   └── HTML/CSS Introduction
├── [Tier 2A] Computer Science Track
│   ├── Network Devices & Routing
│   ├── Machine Learning Deep Dive
│   ├── Data Science Fundamentals
│   └── Simulation & Modeling
├── [Tier 2B] ICT (Applied Informatics) Track
│   ├── Device Connectivity & IoT
│   ├── Smart TV & Digital Content
│   ├── Website Creation
│   └── Digital Media Production
├── [Tier 3] Hands-on Labs
│   ├── HTML/CSS Labs (5)
│   ├── Network Lab (1)
│   ├── Data Lab (1)
│   └── Capstone Project Lab (1)
├── [Tier 4] Exam Preparation
│   ├── Topic-based Practice
│   ├── Error Review (wrong answer drills)
│   ├── Mock Exams (50-minute simulations)
│   └── Personalized Exam Generation
└── [Tier 5] Portfolio
    └── Student showcase and reflection
```

### 2.2 Track Selection

Students choose ONE primary track during onboarding:

| Track | Description | Best For |
|-------|-------------|----------|
| **general** | Balanced focus on all topics | Exam-focused students |
| **cs** | Deep CS concepts, algorithms | CS/STEM university prep |
| **ict** | Applied informatics, web/dev | ICT/vocational paths |

---

## 3. Lesson Progression

### 3.1 Lesson Structure (Per Lesson)
```
Lesson Flow (45–60 min estimated)
│
├── [Pre-Lesson] Quick Check (optional)
│   └── Activates prior knowledge
│
├── [Main Content]
│   ├── Learning Objectives (visible from start)
│   ├── "Explain Like New" analogy
│   ├── Theory section (core knowledge)
│   ├── Deep Dive (advanced learners)
│   ├── Real World Examples (3 examples)
│   └── Visual Summary
│
├── [Practice]
│   ├── Common Mistakes review
│   ├── Quick Check questions (2–3 Q&A)
│   └── Hands-on practice activity
│
├── [Exam Corner]
│   ├── Exam-specific tips
│   └── Past exam question patterns
│
└── [Post-Lesson]
    ├── 60-Second Summary
    ├── Related Flashcards
    └── Next Lesson Preview
```

### 3.2 Spaced Repetition System (SRS)

Flashcards use a spaced repetition algorithm based on SM-2:

| Review Interval | Condition |
|----------------|-----------|
| 1 day | First review |
| 3 days | Second successful review |
| 7 days | Subsequent successful reviews |
| Reset to 1 day | Failed recall (marked "Forgot") |

**Card States:**
- **New:** Never reviewed
- **Learning:** Reviewed but not yet mastered
- **Mastered:** Successfully reviewed 3+ times with intervals ≥ 7 days

---

## 4. Assessment Architecture

### 4.1 Quiz Types

| Quiz Type | Questions | Time | Purpose |
|-----------|-----------|------|---------|
| Lesson Quick Check | 2–3 MCQ | 2 min | formative |
| Topic Quiz | 10–15 questions | 10–15 min | formative |
| Module Exam | 20–30 questions | 20 min | summative |
| Full Course Exam | 50 questions (30 MCQ + 20 T/F) | 50 min | summative |

### 4.2 Exam Structure (TN THPT Format)

**Total Duration:** 50 minutes

**Part 1: Multiple Choice (24 questions × 0.25 pts = 6 pts)**
- Questions 1–24
- One correct answer per question
- Topics distributed proportionally

**Part 2: True/False Groups (6 groups × 0.5 pts = 3 pts)**
- 4 statements per group
- Each statement graded independently (0.125 pts each)
- Total exam: 9 pts (scaled to 10 pts)

### 4.3 Difficulty Distribution

| Level | Distribution | Description |
|-------|--------------|-------------|
| Easy | 40% | Recall and basic understanding |
| Medium | 40% | Application and analysis |
| Hard | 20% | Synthesis and evaluation |

---

## 5. Mastery Score System

### 5.1 Formula

```
mastery_score =
  40% × recent_accuracy         (last 10 submissions)
+ 20% × practice_volume       (questions practiced)
+ 20% × difficulty_weighted   (harder questions weighted higher)
+ 10% × speed_score           (average time vs. benchmark)
+ 10% × lesson_lab_completion (progress through content)
```

### 5.2 Components Explained

**Recent Accuracy (40%)**
- Weighted average of last 10 quiz/exam scores
- Most recent scores weighted more heavily
- Formula: `Σ(score[i] × weight[i]) / Σ(weights)` where weight decreases by 10% per older attempt

**Practice Volume (20%)**
- Percentage of available questions attempted
- Bonus for attempting questions across all topics
- Formula: `(unique_questions_answered / total_available_questions) × 100`

**Difficulty Weighted (20%)**
- Points earned from hard questions count 2×
- Medium questions count 1.5×
- Easy questions count 1×
- Formula: `(easy_pts × 1 + medium_pts × 1.5 + hard_pts × 2) / max_possible × 100`

**Speed Score (10%)**
- Based on average time per question vs. benchmark
- Benchmark: 1 min per MCQ, 2 min per T/F group
- Formula: `max(0, 100 - (avg_time - benchmark) × 5)`

**Lesson/Lab Completion (10%)**
- Lessons completed: 5 pts each
- Labs completed: 10 pts each
- Formula: `(completed_lessons × 5 + completed_labs × 10) / max_possible × 100`

### 5.3 Mastery Levels

| Level | Score Range | Label | Color |
|-------|-------------|-------|-------|
| 1 | 0–20% | Bắt đầu | 🔴 Red |
| 2 | 21–40% | Đang học | 🟠 Orange |
| 3 | 41–60% | Tiến bộ | 🟡 Yellow |
| 4 | 61–80% | Thành thạo | 🟢 Green |
| 5 | 81–100% | Xuất sắc | 🔵 Blue |

---

## 6. Personalization Engine

### 6.1 Recommendation Logic

**Daily Plan Generation:**
1. Identify weakest topic (lowest mastery score)
2. Find lessons/quizzes related to that topic
3. Filter by student's track and goals
4. Prioritize content with due flashcards
5. Package as "Today's Plan" (30–60 min suggested)

**Wrong Answer Review:**
- After each quiz/exam, wrong answers are tagged by topic
- Those topics are prioritized in subsequent practice sessions
- Flashcards for wrong concepts are scheduled for near-term review

### 6.2 Onboarding Flow

```
Step 1: Goal Selection
├── "Thi tốt nghiệp" (Exam-focused)
├── "Học CNTT" (CS/ICT career prep)
└── "Nâng cao" (Advanced self-study)

Step 2: Level Assessment (Placement Test)
├── 10 quick questions across topics
├── Determines baseline mastery
└── Takes ~5 minutes

Step 3: Results & Path Recommendation
├── Show mastery map
├── Recommend starting point
├── Set initial goals
└── Generate first Daily Plan
```

---

## 7. Student Motivation

### 7.1 Gamification Elements

| Element | Description | XP Value |
|---------|-------------|----------|
| Daily Login | Log in each day | 10 XP |
| Lesson Complete | Finish a lesson | 50 XP |
| Quiz Perfect Score | 100% on quiz | 100 XP |
| Lab Submit | Submit a lab | 75 XP |
| Exam Complete | Finish an exam | 150 XP |
| Streak Day | Consecutive daily activity | 20 XP/day bonus |

### 7.2 Badge System (Selected Examples)

| Badge | Name | Criteria |
|-------|------|----------|
| 🌱 | Tân binh | Complete first lesson |
| 📚 | Học sinh chăm chỉ | Complete 10 lessons |
| 🎯 | Mục tiêu chính xác | Score 100% on any quiz |
| 🔥 | 7-day streak | 7 consecutive days |
| 💯 | Kết thúc hoàn hảo | Complete course with 90%+ score |
| 🏆 | Vô địch thi cử | Score 90%+ on mock exam |

---

## 8. Progress Tracking

### 8.1 Student Dashboard Metrics

| Metric | Description | Update Frequency |
|--------|-------------|------------------|
| Current Streak | Consecutive active days | Real-time |
| Total XP | Lifetime experience points | After each action |
| Mastery Map | Per-topic mastery scores | After each quiz |
| Today Plan | Recommended daily activities | Daily (reset at midnight) |
| Recent Activity | Last 5 actions | Real-time |
| Badges | Earned achievements | After milestone |
| Exam History | Past exam scores | After each exam |

### 8.2 Analytics for Teachers (Admin View)

- Class mastery overview (aggregate)
- Per-student progress tracking
- Common wrong-answer topics
- Engagement metrics (login frequency, time spent)
- Export reports (CSV)

---

_Last updated: May 2026_