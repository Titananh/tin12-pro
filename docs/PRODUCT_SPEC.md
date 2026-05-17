# Tin12 Pro Cánh Diều - Product Specification

## 1. Product Overview

### Name
**Tin12 Pro Cánh Diều**

### Tagline
"Từ mất gốc Tin học 12 đến làm chủ lý thuyết, thực hành và luyện thi."

### Type
Premium EdTech SaaS Platform for Vietnamese High School Students (Grade 12)

### Core Value Proposition
- Cá nhân hóa lộ trình học tập theo trình độ và mục tiêu
- Hệ thống học tập toàn diện: lý thuyết, thực hành, luyện thi
- AI Tutor hỗ trợ 24/7
- Dashboard tracking tiến độ và điểm yếu

## 2. User Personas

### Students
- **Mất gốc**: Cần xây dựng nền tảng từ đầu
- **Trung bình**: Cần củng cố và nâng cao
- **Khá**: Cần luyện thi và thực hành nâng cao
- **Giáo viên**: Quản lý khóa học, theo dõi học sinh

## 3. Core Features

### Landing Page
- Hero section với tagline và call-to-action
- Features overview với visual cards
- Social proof: stats, testimonials
- Pricing plans display

### Onboarding Flow
1. Chọn mục tiêu (thi tốt nghiệp / học CNTT / nâng cao)
2. Đánh giá trình độ (placement test)
3. Xem kết quả và lộ trình đề xuất

### Dashboard
- Streak counter và XP/Level
- Today plan cá nhân hóa
- Mastery map theo chủ đề
- Weak topics highlight
- Badges và achievements
- Recent exam results

### Course Engine
- 5 khóa học chính
- Module và lesson structure
- Progress tracking
- Lesson template chuẩn

### Quiz Engine
- Multiple Choice (4 options)
- True/False statements (4 statements per question)
- Instant scoring và explanation
- Wrong answer review

### Exam Simulation
- 50 phút timer
- Part 1: 24 MCQ
- Part 2: 6 câu đúng/sai (4 mệnh đề)
- Question navigator
- Mark for review
- Result analysis

### Lab System
- HTML/CSS Labs (5)
- Network Lab (1)
- Data Lab (1)
- Project Lab (1)
- Code editor + live preview
- Rubric grading

### Flashcards
- 100+ cards
- Spaced repetition review
- Remember/Forgot tracking

### AI Tutor
- Chat interface
- Context-aware responses
- System prompt guardrails
- Mock deterministic responses

### Admin CMS
- Course/Module/Lesson CRUD
- Question management
- Lab management
- Student analytics

## 4. Information Architecture

```
Tin12 Pro
├── Trang chủ (Landing)
├── Lộ trình
│   ├── Từ mất gốc
│   ├── Chuẩn thi
│   ├── Nhánh Khoa học máy tính
│   ├── Nhánh Tin học ứng dụng
│   └── Nâng cao CNTT
├── Khóa học
│   ├── Nền tảng chung
│   ├── AI và xã hội tri thức
│   ├── Mạng máy tính
│   ├── Đạo đức số
│   ├── HTML/CSS và Web
│   └── Khoa học dữ liệu
├── Thực hành
│   ├── HTML/CSS Lab
│   ├── Network Lab
│   ├── Data Lab
│   ├── AI Demo Lab
│   └── Project Lab
├── Luyện thi
│   ├── Luyện theo chủ đề
│   ├── Luyện câu sai
│   ├── Thi thử 50 phút
│   └── Đề cá nhân hóa
├── Flashcards
├── AI Tutor
├── Portfolio
├── Bảng xếp hạng
├── Gói học
└── Admin
```

## 5. Design System

### Colors
- Primary: #2563EB (Blue 600)
- Secondary: #7C3AED (Violet 600)
- Accent: #06B6D4 (Cyan)
- Success: #10B981 (Emerald)
- Warning: #F59E0B (Amber)
- Error: #DC2626 (Red)
- Light BG: #F8FAFC
- Dark BG: #0F172A

### Typography
- Font: Inter (Google Fonts) via Tailwind
- Headings: Bold, tracking-tight
- Body: Regular, leading-relaxed

### Components
- Cards: rounded-xl, shadow-sm, border
- Buttons: rounded-lg, font-medium, transitions
- Inputs: rounded-lg, focus:ring
- Progress: rounded-full, animate-pulse

## 6. Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context + localStorage
- **Icons**: Inline SVG (no external lib)

## 7. Success Metrics

- Landing page conversion rate
- Onboarding completion rate
- Daily active users / streak
- Quiz/exam completion rate
- Score improvement after practice
- Time spent per lesson