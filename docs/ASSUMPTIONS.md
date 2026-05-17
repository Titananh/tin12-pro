# Giả định và Quyết định Kỹ thuật

## Tổng quan
Project **Tin12 Pro Cánh Diều** là nền tảng EdTech cao cấp dành cho học sinh lớp 12 theo chương trình Tin học Cánh Diều.

## Giả định kỹ thuật

1. **Frontend**: Next.js 14+ với App Router, TypeScript, Tailwind CSS
2. **State Management**: React Context + localStorage cho demo; chưa tích hợp Redux/Zustand
3. **Auth**: Demo auth với localStorage role switch (student/teacher/admin), chưa có backend thật
4. **Database**: Không có database thật; dữ liệu seed trong TypeScript files và localStorage
5. **AI Tutor**: Mock deterministic function - trả lời theo pattern, chưa tích hợp API thật
6. **Lab Preview**: Sandboxed iframe với `sandbox="allow-same-origin"` cho HTML/CSS labs
7. **Font/Icon**: Tailwind default fonts + inline SVG icons, chưa cài thêm icon library

## Giả định nội dung

1. **5 khóa học**: Nền tảng chung, Nhánh CS, Nhánh ICT, Luyện thi THPT, Portfolio CNTT
2. **20 bài học**: Viết mới, không sao chép SGK, có cấu trúc lesson template đầy đủ
3. **200 câu hỏi**: 120 MCQ, 60 T/F statements (20 T/F groups × 3 statements avg), 20 scenario/code reading - phân bổ theo topic/difficulty
   - **T/F counting convention**: Mỗi T/F Question object là một "group" chứa 4 statements. Mỗi statement có correctAnswer boolean riêng. Vì exam generator tạo Part 2 từ TFGroup objects (mỗi group = 1 câu đúng/sai với 4 mệnh đề), nên ta count theo Question objects (groups). 21 groups × 4 statements = 84 statement-level items đủ cho exam generation.
4. **8 labs**: 5 HTML/CSS, 1 Network, 1 Data, 1 Project
5. **3 đề thi**: Theo cấu trúc: Part 1 (24 MCQ), Part 2 (6 câu đúng/sai, mỗi câu 4 mệnh đề)
6. **100 flashcards**: Phủ các chủ đề chính
7. **20 badges**: Theo achievement system

## Cấu trúc đề thi THPT

- **Thời gian**: 50 phút
- **Part 1**: 24 câu trắc nghiệm (mỗi câu 0.25 điểm = 6 điểm)
- **Part 2**: 6 câu đúng/sai, mỗi câu gồm 4 mệnh đề (mỗi mệnh đề đúng/sai = 0.125 điểm, mỗi câu 0.5 điểm = 3 điểm)
- **Tổng**: 9 điểm (quy đổi 10 điểm)
- **Độ khó**: 40% easy, 40% medium, 20% hard

## Lộ trình học tập

- **Tầng 0**: Placement test - xác định baseline
- **Tầng 1**: Kiến thức chung (AI, mạng, đạo đức số, HTML/CSS, hướng nghiệp)
- **Tầng 2A (CS)**: Thiết bị mạng, LAN, học máy, khoa học dữ liệu, mô phỏng
- **Tầng 2B (ICT)**: Kết nối thiết bị, TV thông minh, tạo website, nội dung số
- **Tầng 3**: Labs thực hành
- **Tầng 4**: Luyện thi
- **Tầng 5**: Portfolio

## AI Tutor System Prompt

```
Bạn là gia sư Tin học 12 Cánh Diều. Hãy giải thích dễ hiểu cho học sinh Việt Nam lớp 12.
Không sao chép nguyên văn sách giáo khoa. Không bịa kiến thức.
Nếu học sinh đang làm bài, ưu tiên gợi ý từng bước thay vì đưa đáp án ngay.
Khi giải thích, chia thành: 1. Hiểu nhanh. 2. Kiến thức chuẩn. 3. Ví dụ thực tế. 4. Mẹo làm bài. 5. Câu hỏi kiểm tra lại.
Nếu không chắc thông tin nào thuộc chương trình hoặc cấu trúc thi, hãy nói rõ cần kiểm tra nguồn.
```

## Mastery Score Formula

```
mastery_score = 40% recent_accuracy + 20% practice_volume_score + 20% difficulty_weighted_score + 10% speed_score + 10% lesson_lab_completion_score
```

## Giới hạn MVP

- Chưa có backend API thật
- Chưa có real-time collaboration
- Chưa có payment/gateway integration
- AI Tutor là mock, chưa tích hợp LLM thật
- Exam autosave chỉ là demo localStorage

## Màu sắc chủ đạo

- Primary: `#2563EB` (Blue 600)
- Primary Dark: `#1E40AF` (Blue 800)
- Secondary: `#7C3AED` (Violet 600)
- Accent Cyan: `#06B6D4`
- Accent Emerald: `#10B981`
- Light BG: `#F8FAFC`
- Dark BG: `#0F172A`
- Error: `#DC2626`
- Success: `#16A34A`
- Warning: `#F59E0B`