# CONTENT_POLICY

## Tin12 Pro Cánh Diều - Content Policy

> **Note:** This document outlines content creation rules for Tin12 Pro. It is not a legal document and does not constitute a contract.

---

## 1. Content Creation Principles

### 1.1 Originality
All lesson content must be **original** and **not copied** from any copyrighted textbook or exam materials, including (but not limited to):
- Sách giáo khoa Tin học 12 (all publishers)
- Past national exam questions (đề thi THPT quốc gia)
- Any third-party tutoring materials

### 1.2 Accuracy
- Content must align with the Cánh Diều (Vietnamese Ministry of Education) curriculum framework for Informatics Grade 12
- Technical facts must be verified before publishing
- AI tutor responses must include a disclaimer when uncertain about curriculum-specific details

### 1.3 Age-Appropriateness
- Content is designed for students aged 17–19
- No political, religious, or sensitive content
- No content that could harm, deceive, or mislead students

---

## 2. Course Content Structure

### 2.1 Five Course Tracks

| ID | Course Name | Track | Target Students |
|----|-------------|-------|----------------|
| course-1 | Nền tảng Tin học 12 | general | All students (foundation) |
| course-2 | AI và Xã hội Tri thức | cs | CS track, exam prep |
| course-3 | Mạng máy tính và Internet | cs | CS track |
| course-4 | HTML/CSS và Xây dựng Web | ict | ICT track |
| course-5 | Luyện thi Tốt nghiệp THPT | general | Exam preparation |

### 2.2 Lesson Template
Each lesson MUST follow this template structure:

```
1. learningObjectives: 3–5 measurable objectives
2. explainLikeNew: Simple analogy for beginners
3. theory: Core content (2–4 paragraphs)
4. deepDive: Advanced details, edge cases
5. realWorldExamples: 2–3 relatable examples
6. visualSummary: One-paragraph visual description
7. commonMistakes: 3–4 misconceptions with corrections
8. quickCheck: 2–3 questions with answers + explanations
9. practice: Hands-on activity instructions
10. examCorner: Exam-specific tips and common question types
11. sixtySecondSummary: 2–3 sentence quick recap
12. flashcards: Array of related flashcard IDs
13. nextStep: Forward link to next lesson
```

---

## 3. Question Bank Guidelines

### 3.1 MCQ (Multiple Choice Questions)
- 4 options per question (A, B, C, D)
- Only ONE correct answer
- Distractors must be plausible (not obviously wrong)
- No trick questions or multiple "correct" answers
- Difficulty distribution: 40% easy, 40% medium, 20% hard

### 3.2 True/False Groups (Part 2 Exam Questions)
- 6 groups per exam
- Each group contains 4 statements
- Each statement is graded independently (0.125 points each)
- Statements should be phrased clearly to avoid ambiguity
- Context paragraph should frame the topic without adding new information

### 3.3 Topic Coverage
Questions must cover these topics in proportion to the exam blueprint:

| Topic | Approximate % | Key Concepts |
|------|--------------|-------------|
| AI/ML | 12% | Narrow AI, ML types, CNN, ethics |
| Computer Networks | 12% | LAN, TCP/IP, DNS, HTTP(S), routing |
| Digital Ethics | 8% | Phishing, encryption, passwords, licensing |
| HTML/CSS | 12% | Tags, selectors, box model, Flexbox/Grid |
| Computer Architecture | 8% | Binary, CPU, RAM, OS, software types |
| Algorithms | 10% | Sorting, searching, complexity, databases |
| Data Science | 6% | Data analysis, visualization, statistics |
| Other | 32% | Various curriculum topics |

---

## 4. Lab Content Guidelines

### 4.1 Lab Types
- **HTML/CSS Labs (5):** Hands-on web development
- **Network Lab (1):** Command-line networking exercises
- **Data Lab (1):** Spreadsheet/data analysis exercises
- **Project Lab (1):** Capstone portfolio project

### 4.2 Lab Structure
Each lab must include:
- Clear learning objectives
- Step-by-step instructions (required vs optional steps marked)
- Starter code/template
- Rubric with point allocation
- Hints for common mistakes
- Estimated completion time

### 4.3 Sandbox Security
- HTML/CSS labs run in sandboxed iframe with `sandbox="allow-same-origin"`
- No JavaScript execution in lab preview
- User-submitted code is displayed but not executed

---

## 5. AI Tutor Guardrails

### 5.1 System Prompt Principles
```
Bạn là gia sư Tin học 12 Cánh Diều. Hãy giải thích dễ hiểu cho học sinh Việt Nam lớp 12.
- Không sao chép nguyên văn sách giáo khoa
- Không bịa kiến thức
- Nếu không chắc, nói rõ cần kiểm tra nguồn
- Ưu tiên gợi ý từng bước thay vì đưa đáp án ngay
```

### 5.2 Response Format
When a student asks a question, AI tutor should:
1. **Quick Understand (Hiểu nhanh):** Restate the question briefly
2. **Standard Knowledge (Kiến thức chuẩn):** Explain with curriculum-aligned content
3. **Real Example (Ví dụ thực tế):** Provide a relatable example
4. **Exam Tip (Mẹo làm bài):** Add exam-specific tip if relevant
5. **Check Question (Câu hỏi kiểm tra):** End with a quick check question

### 5.3 Prohibited Content
- Direct answers to exam questions
- Reproduction of textbook passages
- Content harmful to minors
- Political or religious content
- Personal data of any individual

---

## 6. Accessibility Requirements

### 6.1 Images
- All `<img>` tags must have `alt` attributes
- Alt text should describe the image content and context

### 6.2 Color Contrast
- Text contrast ratio minimum 4.5:1 for normal text
- Text contrast ratio minimum 3:1 for large text
- Interactive elements must be distinguishable by more than color alone

### 6.3 Keyboard Navigation
- All interactive elements must be focusable via keyboard
- Focus order must be logical
- Visible focus indicator required

### 6.4 Screen Reader
- Semantic HTML elements (nav, main, article, section, header, footer)
- ARIA labels only when semantic HTML is insufficient
- Form inputs must have associated labels

---

## 7. Ongoing Maintenance

### 7.1 Content Review Cycle
- New content: Peer review before publishing
- Existing content: Annual review for accuracy
- Broken links: Monthly check
- Student feedback: Reviewed and addressed within 30 days

### 7.2 Error Reporting
- Students can report content errors via a dedicated form
- Critical errors (e.g., wrong answer keys) trigger immediate review
- Corrections are versioned and documented

---

_Last updated: May 2026_