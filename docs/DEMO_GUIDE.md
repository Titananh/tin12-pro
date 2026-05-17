# DEMO_GUIDE

## Tin12 Pro Cánh Diều - Demo Flows

> Step-by-step walkthroughs for demonstrating Tin12 Pro features.

---

## Demo Setup

### Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Demo Role Switching

1. Open browser DevTools → Application → Local Storage
2. Find `tin12-pro-user` key
3. Change `"role": "student"` to `"role": "admin"` and refresh

---

## Student Flow

### Flow 1: Onboarding → First Lesson

1. **Landing Page** (`/`)
   - Observe hero section, dark/light mode toggle
   - Click "Bắt đầu học"

2. **Onboarding** (`/onboarding`)
   - Step 1: Select goal (radio: Thi tốt nghiệp / Học CNTT / Nâng cao)
   - Step 2: Quick 5-question placement test
   - Step 3: See mastery map + personalized path
   - Click "Khám phá Dashboard"

3. **Dashboard** (`/dashboard`)
   - Show streak counter, XP, level
   - Point out Today's Plan (personalized)
   - Show mastery map with color-coded topics
   - Mention badges earned

4. **Lesson** (`/lessons/kien-truc-may-tinh`)
   - Show lesson structure: objectives, theory, examples
   - Click through sections
   - Show flashcard references at end
   - Mark lesson as complete

### Flow 2: Quiz Practice

1. **Quiz Page** (`/quiz`)
   - Select topic (e.g., "AI & Machine Learning")
   - Show 10 MCQ with 4 options each
   - Answer 3-4 questions
   - Show instant feedback: correct/incorrect + explanation
   - Show final score at end

### Flow 3: Exam Simulation

1. **Exam List** (`/exams`)
   - Show 3 pre-generated exams
   - Click "Làm bài" on Exam 1

2. **Exam** (`/exams/exam-1`)
   - Timer starts at 50:00
   - Show Part 1: 24 MCQ with question navigator
   - Answer 5-6 MCQ
   - Use "Đánh dấu" to flag a question
   - Navigate to Part 2: 6 T/F groups
   - Show per-statement grading (i, ii, iii, iv)
   - Submit early or wait for timer

3. **Results**
   - Show scaled score (X/10)
   - Part 1 / Part 2 breakdown
   - Topic-by-topic analysis
   - Wrong answers with explanations
   - "Học lại" links to weak topics

### Flow 4: Lab System

1. **Lab List** (`/labs`)
   - Show 8 labs: 5 HTML/CSS, 1 Network, 1 Data, 1 Project
   - Click "HTML Lab 1: Giới thiệu HTML"

2. **Lab Page** (`/labs/lab-1`)
   - Show instructions + starter code
   - Live preview pane (sandboxed iframe)
   - Write HTML/CSS in code editor
   - See preview update
   - Submit for rubric scoring

### Flow 5: Flashcards

1. **Flashcard Page** (`/flashcards`)
   - Show deck by topic
   - Click into a card
   - Show front → click to flip → show back
   - Click "Nhớ rồi" (Remembered) or "Chưa nhớ" (Forgot)
   - Show spaced repetition scheduling

### Flow 6: AI Tutor

1. **AI Tutor Page** (`/ai-tutor`)
   - Type: "HTML là gì?"
   - Show mock response (Hiểu nhanh → Kiến thức → Ví dụ → Mẹo)
   - Ask a curriculum question
   - Show pattern-matching response
   - Note: Set `OPENAI_API_KEY` for real LLM

---

## Teacher Flow

### View Class Analytics

1. Switch to `teacher` role in localStorage
2. Navigate to `/admin`
3. Show aggregate class data:
   - Average mastery per topic
   - Quiz completion rates
   - Streak leaders
4. Drill into individual student (read-only)

---

## Admin Flow

### Content Management (Scaffold)

1. Switch to `admin` role in localStorage
2. Navigate to `/admin`
3. Show CMS scaffold:
   - Course list with CRUD placeholders
   - Lesson management interface
   - Question bank view
4. Note: Full CRUD requires backend

### System Analytics

1. Show placeholder analytics dashboard
2. Mention: real admin needs Postgres backend

---

## Demo Scenarios

### Scenario A: New Student (5 min)

```
Onboarding (1 min) → Dashboard (1 min) → Lesson (2 min) → Quiz (1 min)
```

### Scenario B: Exam Prep (7 min)

```
Dashboard (1 min) → Today's Plan review → Exam Simulation (4 min) → Results analysis (2 min)
```

### Scenario C: Full Feature Tour (10 min)

```
Landing → Onboarding → Dashboard → Lesson → Quiz → Exam → Lab → Flashcards → AI Tutor
```

---

## Troubleshooting Demo Issues

| Issue | Solution |
|-------|----------|
| Stuck on onboarding | Clear localStorage, restart |
| Quiz not grading | Check `quiz-engine.ts` exports |
| Lab preview blank | Verify sandbox="allow-same-origin" |
| Timer not starting | Check `exam-generator.ts` |
| Dark mode broken | Check Tailwind v4 config |
| AI Tutor unresponsive | Mock requires no API key |

---

_Last updated: May 2026_