# Tin12 Pro Cánh Diều

> Từ mất gốc Tin học 12 đến làm chủ lý thuyết, thực hành và luyện thi.

Nền tảng EdTech cao cấp dành cho học sinh Việt Nam lớp 12 theo chương trình Tin học Cánh Diều.

## Overview

**Tin12 Pro** là nền tảng học tập trực tuyến hỗ trợ học sinh:
- Xây dựng nền tảng từ đầu (zero-to-hero)
- Học lý thuyết + thực hành lab
- Luyện thi Tốt nghiệp THPT
- Theo học lộ trình cá nhân hóa

**Current Status:** MVP/Pro demo chạy được với seed data, API scaffold, Prisma schema, localStorage fallbacks và AI Tutor mock có guardrails.

## Features

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page | ✅ Complete | Dark mode, responsive |
| Onboarding flow | ✅ Complete | Goal selection + placement |
| 5 Courses | ✅ Complete | Seed data in TypeScript |
| 20+ Lessons | ✅ Complete | Full content structure |
| 200+ Questions | ✅ Complete | MCQ + T/F groups |
| Quiz system | ✅ Complete | Topic-based, instant feedback |
| Exam simulation | ✅ Complete | 50-min timer, Part 1+2 |
| 8 Labs | ✅ Complete | HTML/CSS, Network, Data |
| Flashcards | ✅ Complete | Spaced repetition |
| AI Tutor | ✅ Complete demo | Mode-aware mock, `/api/ai/chat`, ready for LLM |
| Dashboard | ✅ Complete | Progress, mastery, stats |
| Admin CMS | ✅ Demo CMS | CRUD/import/export via local/demo store |
| Teacher dashboard | ✅ Complete demo | Classes, roster, assignments, reports |
| Pricing/settings/profile/leaderboard | ✅ Complete demo | Premium product shell |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** React Context + localStorage
- **Testing:** Vitest
- **Icons:** Inline SVG

### Design System

| Token | Light | Dark |
|-------|-------|------|
| Primary | #2563EB | #3B82F6 |
| Secondary | #7C3AED | #8B5CF6 |
| Accent Cyan | #06B6D4 | #22D3EE |
| Success | #16A34A | #22C55E |
| Error | #DC2626 | #EF4444 |
| Light BG | #F8FAFC | — |
| Dark BG | — | #0F172A |

## Project Structure

```
tin12-pro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── onboarding/        # Onboarding flow
│   │   ├── dashboard/         # Student dashboard
│   │   ├── courses/          # Course listing + [slug]
│   │   ├── lessons/          # Lesson listing + [slug]
│   │   ├── quiz/             # Quiz practice
│   │   ├── exams/            # Exam listing + [id]
│   │   ├── labs/             # Lab listing + [slug]
│   │   ├── flashcards/       # Flashcard review
│   │   ├── ai-tutor/         # AI Tutor chat
│   │   ├── portfolio/        # Student portfolio
│   │   ├── teacher/          # Teacher dashboard
│   │   ├── pricing/          # Plans
│   │   ├── settings/         # User settings
│   │   ├── profile/          # Student profile
│   │   ├── leaderboard/      # Rankings
│   │   └── admin/            # Admin CMS
│   ├── components/
│   │   ├── ui/               # Shared UI components
│   │   └── layout/           # Navbar, Sidebar, Footer
│   ├── lib/                   # Core libraries
│   │   ├── types.ts         # TypeScript types
│   │   ├── quiz-engine.ts    # Quiz logic + grading
│   │   ├── exam-generator.ts # Exam generation
│   │   ├── mastery.ts        # Mastery calculations
│   │   ├── recommendations.ts # Recommendations
│   │   ├── ai-tutor.ts       # AI Tutor mock
│   │   ├── lab-engine.ts     # Lab validation
│   │   └── security.ts      # Input sanitization
│   └── content/             # Seed data and demo fixtures
│       ├── courses.ts       # 5 courses
│       ├── lessons.ts       # 20+ lessons
│       ├── questions.ts     # 200+ questions
│       ├── labs.ts          # 8 labs
│       ├── exams.ts        # 3 exam blueprints
│       ├── flashcards.ts   # 100+ cards
│       ├── badges.ts        # 20 badges
│       └── demo.ts          # Mock data for UI dev
├── docs/                      # Full documentation
├── public/                    # Static assets
├── .env.example              # Environment template
├── docker-compose.yml        # Optional Postgres for Prisma backend
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev           # Start dev server (http://localhost:3000)
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix

# Build & Production
npm run build         # Production build
npm run start         # Start production server

# Type Checking
npm run typecheck     # TypeScript type check (tsc --noEmit)

# Testing
npm test             # Run tests (watch mode)
npm run test:run      # Run tests once
```

## Seed Data

All content is stored in TypeScript files under `src/content/` — no database required for MVP.

| File | Content | Count |
|------|---------|-------|
| `courses.ts` | 5 courses | 5 |
| `lessons.ts` | Full lesson content | 20+ |
| `questions.ts` | MCQ + T/F groups | 200+ |
| `labs.ts` | Lab assignments | 8 |
| `exams.ts` | Exam blueprints | 3 |
| `flashcards.ts` | Spaced repetition cards | 100+ |
| `badges.ts` | Achievement definitions | 20 |
| `demo.ts` | Mock user, plan, mastery | — |

## Demo Accounts & Flows

### Role Switcher (localStorage-based)

Navigate to any page and switch roles via the user context. Auth API scaffolds exist, but production session/provider hardening is still future work.

| Role | Access | Capabilities |
|------|--------|-------------|
| `student` | Default | All learning features |
| `teacher` | `/teacher` | View classes, assignments, reports |
| `admin` | `/admin` | Demo CMS with CRUD/import/export |

### Student Flow

```
Landing → Onboarding → Dashboard → Courses → Lesson → Quiz/Exam/Lab
                                                        ↓
                                                  Flashcards
                                                        ↓
                                                   AI Tutor
```

### Teacher Flow

```
Teacher → View class analytics → Review student progress → Generate reports
```

### Admin Flow

```
Admin → Manage content → Import/export → Publish/unpublish → View analytics
```

### Quiz Flow

1. Select topic or lesson
2. Answer MCQ / T/F questions
3. Instant feedback + explanations
4. Review wrong answers
5. Mastery score updated

### Exam Flow

1. Select exam (or generate custom)
2. 50-minute timer starts
3. Part 1: 24 MCQ
4. Part 2: 6 T/F groups (4 statements each)
5. Submit → Score + analysis
6. Weak topics added to Daily Plan

### Lab Flow

1. Read instructions + starter code
2. Write HTML/CSS in code editor
3. Live preview in sandboxed iframe
4. Submit → Rubric scoring
5. View hints if stuck

### AI Tutor Flow

1. Select mode: siêu dễ hiểu, chuẩn thi, nâng cao, gợi ý từng bước, tạo bài tương tự, phân tích lỗi sai
2. Select current topic/context
3. Type a question or use a quick prompt
4. Mock engine detects topic and responds with guardrails
5. Copy/save useful responses for review
6. (Future: real LLM integration via `OPENAI_API_KEY`)

## Environment Variables

```bash
# Copy to .env.local
cp .env.example .env.local
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | — | External API (future) |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | — | GA4 or Vercel Analytics |
| `OPENAI_API_KEY` | No | — | For real AI Tutor (future) |
| `AI_TUTOR_MODEL` | No | `gpt-4o-mini` | LLM model for AI Tutor |

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or import on vercel.com. Environment variables configured in Project Settings.

### Local Production

```bash
npm run build
npm start
```

### Docker (Optional)

For future Postgres/Prisma backend:

```bash
docker compose up -d  # Starts Postgres
npx prisma migrate dev
npm run build
```

## Limitations (MVP)

| Limitation | Impact | Workaround |
|------------|--------|------------|
| **Demo persistence** | Some flows still use localStorage/content fallback | Enable Prisma-backed persistence for production |
| **Auth not production-grade** | API scaffold exists, provider/session hardening remains | Add Auth.js/Firebase/Supabase Auth |
| **Database optional in demo** | Seed data is TypeScript-first | Use Postgres + Prisma seed for production |
| **AI Tutor is mock** | Deterministic guardrailed responses | Wire `OPENAI_API_KEY` or another LLM provider |
| **No real-time sync** | No cross-device progress | Future: cloud backend |
| **No payment** | Cannot subscribe | Stripe integration needed |
| **Lab preview sandboxed** | JavaScript disabled | Manual testing required |
| **No proctoring** | Exam is open-book | Browser lockdown for v2.0 |

## Documentation

| Doc | Description |
|-----|-------------|
| [PRODUCT_SPEC](./docs/PRODUCT_SPEC.md) | Product overview, features, design system |
| [ARCHITECTURE](./docs/ARCHITECTURE.md) | System design, directory structure |
| [LEARNING_ARCHITECTURE](./docs/LEARNING_ARCHITECTURE.md) | Learning tracks, mastery system |
| [EXAM_BLUEPRINT](./docs/EXAM_BLUEPRINT.md) | Exam format, scoring, constraints |
| [CONTENT_POLICY](./docs/CONTENT_POLICY.md) | Content creation guidelines |
| [ADMIN_GUIDE](./docs/ADMIN_GUIDE.md) | Admin CMS, content management |
| [DEPLOYMENT](./docs/DEPLOYMENT.md) | Deployment guides, platforms |
| [ASSUMPTIONS](./docs/ASSUMPTIONS.md) | Technical decisions, content specs |
| [QA_REPORT](./docs/QA_REPORT.md) | Build, lint, test verification |

## Roadmap (Future)

- [ ] Real authentication (Auth.js, Firebase)
- [ ] PostgreSQL + Prisma backend hardening
- [ ] AI Tutor with real LLM (OpenAI/Claude)
- [ ] Payment integration (Stripe)
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Browser lockdown for exams
- [ ] Email notifications

## License

Private project — All rights reserved.
