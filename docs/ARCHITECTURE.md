# Architecture

## Overview
Next.js 14 App Router with TypeScript and Tailwind CSS. Client-side state management with React Context + localStorage for demo purposes.

## Directory Structure

```
tin12-pro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── onboarding/        # Onboarding flow
│   │   ├── dashboard/        # Student dashboard
│   │   ├── courses/          # Course listing
│   │   ├── lessons/          # Lesson viewing
│   │   ├── quiz/             # Quiz engine
│   │   ├── exams/            # Exam simulation
│   │   ├── labs/             # Lab listing
│   │   ├── flashcards/       # Flashcard review
│   │   ├── ai-tutor/         # AI Tutor chat
│   │   ├── portfolio/         # Student portfolio
│   │   └── admin/            # Admin CMS
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components (Navbar, Footer)
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── lesson/            # Lesson components
│   │   ├── quiz/              # Quiz components
│   │   ├── exam/              # Exam components
│   │   ├── lab/               # Lab components
│   │   ├── flashcard/         # Flashcard components
│   │   ├── ai-tutor/          # AI Tutor components
│   │   └── admin/             # Admin components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Authentication helpers
│   │   ├── quiz-engine.ts    # Quiz logic
│   │   ├── exam-generator.ts # Exam generation
│   │   ├── mastery.ts        # Mastery calculation
│   │   ├── recommendations.ts # Recommendation engine
│   │   ├── ai-tutor.ts       # AI Tutor mock
│   │   └── types.ts          # Shared TypeScript types
│   └── content/              # Seed data
│       ├── courses.ts        # Course data
│       ├── lessons.ts         # Lesson content
│       ├── questions.ts      # Question bank
│       ├── labs.ts           # Lab assignments
│       ├── exams.ts          # Exam blueprints
│       ├── flashcards.ts     # Flashcard decks
│       └── badges.ts         # Badge definitions
├── docs/                     # Documentation
├── public/                   # Static assets
└── package.json
```

## Key Design Decisions

### 1. App Router
Using Next.js 14 App Router for modern React patterns and improved performance.

### 2. Seed Data Pattern
All content (courses, lessons, questions, labs, exams, flashcards) stored in TypeScript files under `/content`. This allows:
- Easy content management
- Type checking for content structure
- No external database dependency for MVP

### 3. State Management
- **UserContext**: User authentication state, preferences, role
- **ProgressContext**: Lesson progress, quiz scores, mastery levels
- **Storage**: localStorage for persistence between sessions

### 4. Quiz/Exam Engine
Core logic in `/lib/quiz-engine.ts`:
- MCQ: Direct answer comparison
- T/F Group: Per-statement grading with `isFullyCorrect` flag
- Auto-save: Save progress to localStorage every 30 seconds

### 5. Lab Sandbox
- Preview rendered in sandboxed iframe
- `sandbox="allow-same-origin"` for styling
- Starter code provided per lab
- Submit triggers rubric-based scoring

### 6. AI Tutor
Mock implementation in `/lib/ai-tutor.ts`:
- Pattern-matching responses based on keywords
- Lesson context injection
- System prompt enforcement
- Future: Replace with real LLM API

## API Design (Future)

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses (admin)
PUT    /api/courses/:id (admin)
DELETE /api/courses/:id (admin)
```

### Progress
```
GET  /api/progress
POST /api/progress/lesson
POST /api/progress/quiz
POST /api/progress/exam
```

### AI Tutor
```
POST /api/ai-tutor/chat
```

## Security Considerations

1. **Lab Preview**: Sandboxed iframe, no external script execution
2. **User Input**: Sanitize HTML in lab submissions
3. **localStorage**: No sensitive data (passwords) stored
4. **API Keys**: Use environment variables, never expose in client

## Performance

1. **Code Splitting**: Next.js automatic per route
2. **Lazy Loading**: Heavy components (code editor) lazy-loaded
3. **Image Optimization**: Next.js Image component
4. **Font Optimization**: Google Fonts via next/font