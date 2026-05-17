# ADMIN_GUIDE

## Tin12 Pro Cánh Diều - Admin & Teacher Guide

> This guide is for administrators, teachers, and content managers who manage Tin12 Pro content and user analytics.

---

## 1. Getting Started

### 1.1 Routes

- **Admin CMS**: Navigate to `/admin` route
- **Teacher Dashboard**: Navigate to `/teacher` route
- Both are client-side rendered ('use client')

### 1.2 Role-Based Access

Currently, access is role-based using localStorage:
- Admin access: `/admin` route
- Teacher access: `/teacher` route
- Default roles: `student`, `teacher`, `admin`

### 1.3 Key Files

| File | Purpose |
|------|---------|
| `src/lib/cms-store.ts` | localStorage CRUD for courses, lessons, questions, labs |
| `src/lib/admin-import-export.ts` | CSV/JSON import/export utilities |
| `src/lib/teacher-analytics.ts` | Analytics calculations for teacher dashboard |
| `src/content/teacher-data.ts` | Mock data for teacher dashboard and class management |
| `src/app/admin/page.tsx` | Full CMS interface with tabs |
| `src/app/teacher/page.tsx` | Teacher dashboard with class management |

---

## 2. Admin CMS (`/admin`)

### 2.1 Features

**Tabs:**
- Courses: View/create/edit/delete courses
- Lessons: Manage lesson content
- Questions: CRUD questions with topic/difficulty
- Labs: Manage lab exercises
- Exams: View exam list
- Analytics: Content statistics

**Functionality:**
- Create/edit/delete content items
- Publish/unpublish toggle
- Search across all content types
- Import CSV for questions (format: question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic)
- Import JSON for lessons/labs
- Export to JSON
- Download CSV templates
- Clear all CMS data (with confirmation)

### 2.2 CMS Data Storage

All CMS data is stored in localStorage:
- `cms_courses`: Course array
- `cms_lessons`: Lesson array
- `cms_questions`: Question array
- `cms_labs`: Lab array
- `cms_exams`: Exam array

### 2.3 CSV Import Format

For questions CSV import:
```csv
question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
"Kiến trúc máy tính là gì?","Nghiên cứu phần cứng","Khoa học máy tính","Cả A và B","Không có đáp án đúng","0","Giải thích ở đây","easy","kien-truc-may-tinh"
```

- `correctAnswer`: 0-3 for MCQ (index), or "A","B","C","D"
- `difficulty`: easy, medium, hard
- `topic`: slug format (e.g., "kien-truc-may-tinh", "ai-ml")

### 2.4 Analytics Dashboard

The Analytics tab shows:
- Content counts (courses, lessons, questions, labs)
- Questions by topic (bar chart)
- Questions by difficulty (easy/medium/hard)
- Question type breakdown (MCQ vs T/F)
- Published vs Draft counts

---

## 3. Teacher Dashboard (`/teacher`)

### 3.1 Features

**Overview Tab:**
- Class stats (students, mastery avg, active today, exam readiness)
- Weak topics alert
- Students needing attention list
- Recent assignments

**Students Tab:**
- Student grid with avatar, level, streak
- Progress bar, quiz average, mastery score
- Click to view detailed student report

**Assignments Tab:**
- Assignment list with type, due date, submission rate
- Create new assignment button
- Edit/view actions

**Labs Tab:**
- Lab submissions table
- Student name, lab title, submission date, score, status
- Grade and feedback buttons

**Analytics Tab:**
- Topic mastery chart with distribution (excellent/good/developing/beginning)
- Exam readiness score
- Strong/weak areas
- Recommended actions

**Reports Tab:**
- Export class CSV report
- Individual student reports
- Exam readiness report
- Topic performance report

### 3.2 Class Selection

Use the class selector pills at the top to switch between classes:
- 12A1, 12A2, 11B3 (mock data)

All tabs filter content based on selected class.

### 3.3 Student Detail Modal

Click any student card to view:
- Full stats (XP, level, streak, progress, quiz avg, mastery)
- Topic mastery breakdown
- Recommended actions based on weak areas

### 3.4 Mock Data

Teacher data is in `src/content/teacher-data.ts`:
- `mockTeacher`: Teacher profile
- `mockClasses`: Class information
- `mockStudentRoster`: Student progress data
- `mockAssignments`: Assignment list
- `mockLabSubmissions`: Lab submission data
- `mockTopicAnalytics`: Topic-level analytics
- `mockExamReadiness`: Exam readiness for each class

---

## 4. Content Management

### 4.1 Course Structure

```
Course (course-1, course-2, etc.)
├── Module (grouped lessons)
│   ├── Lesson (individual lesson)
│   ├── Lesson
│   └── Lesson
├── Module
└── Module
```

### 4.2 Course Data Location

**Primary content:** `src/content/courses.ts`

**CMS localStorage:** `cms_courses` key in localStorage

### 4.3 Adding New Content

**Courses:**
```typescript
// Via CMS UI or programmatically
saveCourse({
  id: 'course-new',
  slug: 'course-slug',
  title: 'Course Title',
  description: 'Description',
  icon: '📚',
  track: 'cs' | 'ict' | 'general',
  difficulty: 'easy' | 'medium' | 'hard',
  color: '#2563EB',
  estimatedHours: 30,
  modules: []
});
```

**Questions:**
```typescript
saveQuestion({
  id: 'q-custom-1',
  type: 'mcq',
  question: 'Question text?',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 1,
  explanation: 'Why this answer',
  difficulty: 'medium',
  topic: 'ai-ml'
});
```

### 4.4 Question Types

**MCQ (Multiple Choice):**
```typescript
{
  type: 'mcq',
  question: 'Question text?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 1, // 0-based index
  difficulty: 'medium',
  topic: 'kien-truc-may-tinh'
}
```

**True/False Groups:**
```typescript
{
  type: 'true-false',
  question: 'Context statement about topic',
  statements: [
    'Statement (i) text',
    'Statement (ii) text',
    'Statement (iii) text',
    'Statement (iv) text'
  ],
  correctAnswer: [true, true, false, true],
  difficulty: 'medium',
  topic: 'ai-ml'
}
```

---

## 5. Analytics & Reports

### 5.1 CMS Analytics

`getCMSAnalytics()` returns:
- totalCourses, totalLessons, totalQuestions, totalLabs
- questionsByTopic, questionsByDifficulty, questionTypeBreakdown
- publishedCount, draftCount

### 5.2 Teacher Analytics

`getClassSummary(classId)` returns:
- classId, className, totalStudents
- avgProgress, avgMastery, activeToday
- weakTopics, examReadinessScore

`getStudentAnalytics(studentId)` returns:
- xp, level, streak, progress
- quizAverage, examAverage, masteryScore
- weakTopics, strongTopics
- recommendedActions

### 5.3 Export Functions

- `exportClassReportCSV(classId)`: CSV with student progress data
- `exportQuestionsJSON()`: All questions as JSON
- `exportLessonsJSON()`: All lessons as JSON
- `exportLabsJSON()`: All labs as JSON

---

## 6. Troubleshooting

### 6.1 Common Issues

| Issue | Solution |
|-------|----------|
| Import CSV not working | Check CSV format matches template |
| Students not showing | Verify classId matches in data |
| Analytics showing 0 | Check localStorage has data |
| Student modal blank | Verify studentId exists in mockStudentRoster |

### 6.2 Debug Mode

Add `?debug=true` to any page to see:
- Current localStorage state
- Context values
- Component re-render counts

---

## 7. Future Enhancements (v2.0)

### Admin:
- [ ] Real user authentication (Firebase/Auth0)
- [ ] Database backend (PostgreSQL)
- [ ] Role-based access control
- [ ] Bulk content import/export with validation
- [ ] Automated content quality checks
- [ ] Email notifications for new content

### Teacher:
- [ ] Real class management (add/remove students)
- [ ] Custom assignment creation with topic selection
- [ ] Automated email to parents
- [ ] Parent/guardian dashboard view
- [ ] Real-time class collaboration

---

## 8. API Design (for future backend)

### Content API

```
GET    /api/courses          - List all courses
POST   /api/courses          - Create course
GET    /api/courses/:id      - Get course
PUT    /api/courses/:id      - Update course
DELETE /api/courses/:id      - Delete course

GET    /api/questions        - List questions (with filters)
POST   /api/questions/import - Bulk import questions

GET    /api/analytics/class/:id - Class analytics
GET    /api/analytics/student/:id - Student analytics
```

### Teacher API

```
GET    /api/classes          - List teacher's classes
GET    /api/classes/:id/students - Students in class
POST   /api/assignments      - Create assignment
GET    /api/assignments/:id/submissions - Assignment submissions
PUT    /api/submissions/:id/grade - Grade submission
```

---

_Last updated: May 2026_