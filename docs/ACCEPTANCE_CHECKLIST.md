# ACCEPTANCE_CHECKLIST

## Tin12 Pro Cánh Diều - MVP Acceptance Checklist

> Verification against PRODUCT_SPEC.md, EXAM_BLUEPRINT.md, and original requirements.
> Generated: 2026-05-16

---

## Feature Checklist

### Landing Page
- [x] Hero section with tagline and CTA
- [x] Feature cards overview
- [x] Responsive design (mobile-friendly)
- [x] Dark/Light mode toggle
- [x] All navigation links functional

### Pricing Page
- [x] Free/Pro/Premium tier cards
- [x] Monthly/yearly billing toggle with discount
- [x] Feature comparison table
- [x] FAQ accordion
- [x] Current plan indicator (mock)
- [x] CTA section

### Settings Page
- [x] Profile tab (avatar, name, email, class)
- [x] Security tab (password, 2FA, sessions)
- [x] Notifications tab (toggles for email/push/reminder)
- [x] Theme tab (dark/light/auto, accent colors, font size)
- [x] Account tab (plan, billing, export, delete)

### Leaderboard Page
- [x] XP/Streak/Exam score tabs
- [x] Weekly/Monthly/All-time filter
- [x] Top 3 podium display
- [x] Full ranking table with change indicators
- [x] Current user highlight card

### Profile Page
- [x] Overview tab (stats grid, mastery map, strengths/weaknesses)
- [x] Progress tab (course progress, XP breakdown)
- [x] Achievements tab (earned badges, history)
- [x] Activity tab (recent activity feed)

### Onboarding Flow
- [x] Goal selection (3 options)
- [x] Placement test integration
- [x] Mastery map display
- [x] Path recommendation
- [x] First Daily Plan generation

### Dashboard
- [x] Streak counter display
- [x] XP and level system
- [x] Today's Plan section
- [x] Mastery map with topic scores
- [x] Badges display
- [x] Recent activity feed
- [x] Stats overview

### Course System
- [x] 5 courses defined
- [x] Course cards with progress
- [x] Course detail page
- [x] Module structure
- [x] Lesson listing per course

### Lesson System
- [x] Lesson template structure (12 sections)
- [x] Learning objectives display
- [x] Theory content display
- [x] Real-world examples
- [x] Common mistakes section
- [x] Quick check questions
- [x] Exam corner section
- [x] Next lesson navigation
- [x] Flashcard references

### Quiz Engine
- [x] MCQ format (4 options)
- [x] T/F group format (4 statements)
- [x] Instant feedback after submission
- [x] Explanation display
- [x] Score calculation
- [x] Topic tagging
- [x] Wrong answer review

### Exam System
- [x] 50-minute timer
- [x] Part 1: 24 MCQ (0.25 pts each = 6 pts)
- [x] Part 2: 6 T/F groups (0.5 pts each = 3 pts)
- [x] Question navigator
- [x] Mark for review
- [x] Auto-save to localStorage (30s interval)
- [x] Session restore on reload
- [x] Score scaling (9 → 10)
- [x] Results breakdown by part
- [x] Topic analysis
- [x] Wrong answer explanations

### Lab System
- [x] 8 labs total (5 HTML/CSS, 1 Network, 1 Data, 1 Project)
- [x] Step-by-step instructions
- [x] Starter code provided
- [x] Live preview in sandboxed iframe
- [x] Rubric-based scoring
- [x] Hints system
- [x] Lab completion tracking

### Flashcard System
- [x] Card flip animation
- [x] Topic-based decks
- [x] Remember/Forgot tracking
- [x] Spaced repetition scheduling
- [x] Progress indicator

### AI Tutor
- [x] Chat interface
- [x] Topic detection
- [x] Pattern-matching responses
- [x] Context-aware replies
- [x] System prompt guardrails
- [x] Disclaimer for uncertain info
- [x] Modes: siêu dễ hiểu, chuẩn thi, nâng cao, gợi ý từng bước, tạo bài tương tự, phân tích lỗi sai
- [x] API endpoint `/api/ai/chat`
- [x] Similar-question generation, mistake analysis, study-plan mock functions

### Admin CMS
- [x] Course management scaffold
- [x] Lesson management scaffold
- [x] Question bank view
- [x] Student analytics (aggregate)
- [x] Individual student drill-down

---

## Technical Checklist

### Build & Quality
- [x] `npm run build` passes
- [x] `npm run lint` passes
- [x] `npm test` passes (194/194)
- [x] TypeScript no errors
- [x] All 40 app/API routes compile

### State Management
- [x] UserContext functional
- [x] ProgressContext functional
- [x] localStorage persistence
- [x] Role switching works

### Security
- [x] HTML sanitization in labs
- [x] URL validation
- [x] Event handler sanitization
- [x] Sandboxed iframe for lab preview

---

## Content Checklist

### Course Data
- [x] 5 courses with full metadata
- [x] 5 tracks represented (general, cs, ict)
- [x] Difficulty distribution (easy/medium/hard)
- [x] Estimated hours per course

### Lesson Content
- [x] 20+ lessons with full content
- [x] All 12 template sections filled
- [x] Learning objectives per lesson
- [x] Common mistakes per lesson
- [x] Quick check Q&A per lesson

### Question Bank
- [x] 200+ questions total
- [x] MCQ format correct (4 options, 1 answer)
- [x] T/F groups with 4 statements each
- [x] Topic distribution per blueprint
- [x] Difficulty distribution (40/40/20)
- [x] Explanation per question

### Exam Blueprints
- [x] 3 pre-generated exams
- [x] 24 MCQ per exam
- [x] 6 T/F groups per exam
- [x] 50-minute duration
- [x] Scaled scoring (9 → 10)

### Labs
- [x] 5 HTML/CSS labs
- [x] 1 Network lab
- [x] 1 Data lab
- [x] 1 Project lab
- [x] Rubrics defined

### Flashcards
- [x] 100+ cards
- [x] Topic coverage
- [x] Difficulty tags
- [x] SRS scheduling

### Badges
- [x] 20 badges defined
- [x] XP rewards assigned
- [x] Icon and name per badge
- [x] Criteria defined

---

## MVP vs Pro vs Premium

| Tier | Feature | Status |
|------|---------|--------|
| **MVP** | Landing page | ✅ |
| **MVP** | Onboarding | ✅ |
| **MVP** | Dashboard | ✅ |
| **MVP** | Course/Lesson viewing | ✅ |
| **MVP** | Quiz engine (localStorage) | ✅ |
| **MVP** | Exam simulation (localStorage) | ✅ |
| **MVP** | Lab system (sandboxed) | ✅ |
| **MVP** | Flashcards (localStorage) | ✅ |
| **MVP** | AI Tutor (mode-aware mock) | ✅ |
| **MVP** | Admin scaffold | ✅ |
| **Pro** | Real auth (Firebase/Auth0) | ⚠️ Partial: demo API/auth scaffold |
| **Pro** | PostgreSQL backend | ⚠️ Partial: Prisma/schema/API scaffold |
| **Pro** | Real AI Tutor (LLM API) | ⚠️ Not yet |
| **Pro** | Cross-device sync | ⚠️ Not yet |
| **Pro** | Payment integration | ⚠️ Not yet |
| **Pro** | Email notifications | ⚠️ Not yet |
| **Premium** | Real-time collaboration | ⚠️ Not yet |
| **Premium** | Mobile app | ⚠️ Not yet |
| **Premium** | Browser lockdown (proctoring) | ⚠️ Not yet |
| **Premium** | Advanced analytics | ⚠️ Not yet |
| **Premium** | White-label | ⚠️ Not yet |

---

## Known Limitations

| Limitation | Severity | Notes |
|------------|----------|-------|
| Demo persistence | High | Some flows use localStorage/content fallback |
| Auth not production-grade | High | API scaffold exists, provider/session hardening remains |
| Mock AI Tutor | Medium | Deterministic guardrailed tutor, not LLM |
| Database not required for demo | Medium | Prisma/schema scaffold exists; seed data still TypeScript-first |
| No cross-device | Medium | Single-browser only |
| Lab JS disabled | Low | Sandbox prevents JS |
| No proctoring | Low | Open-book exam |

---

## How to Run for Acceptance

```bash
# 1. Install dependencies
npm install

# 2. Run build check
npm run build

# 3. Run tests
npm run test:run

# 4. Run linter
npm run lint

# 5. Start dev server
npm run dev
```

---

## Sign-off

| Checkpoint | Status | Notes |
|------------|--------|-------|
| All 40 routes build | ✅ Pass | Verified |
| All 194 tests pass | ✅ Pass | Verified |
| No lint errors/warnings | ✅ Pass | Verified |
| All features implemented | ✅ Pass | Per checklist |
| Demo flows work | ✅ Pass | Manual verification |
| Limitations documented | ✅ Pass | This checklist |

---

_Last updated: May 2026_
