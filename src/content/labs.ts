// ==========================================
// Labs Seed Data - Tin12 Pro Cánh Diều
// 8 labs: 5 HTML/CSS, 1 Network, 1 Data, 1 Project
// ==========================================
import { Lab } from '@/lib/types';

export const labs: Lab[] = [
  // ========== HTML/CSS LAB 1 ==========
  {
    id: 'lab-1',
    slug: 'lab-html-intro',
    title: 'Giới thiệu HTML - Tạo trang cá nhân đầu tiên',
    description: 'Học cách tạo cấu trúc HTML cơ bản và các thẻ phổ biến.',
    type: 'html-css',
    difficulty: 'easy',
    estimatedMinutes: 30,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Trang của tôi</title>
</head>
<body>
    <!-- Viết code tại đây -->
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>Trang của tôi</title>
</head>
<body>
    <h1>Xin chào! Tôi là...</h1>
    <h2>Giới thiệu bản thân</h2>
    <p>Tôi đang học lớp 12 và yêu thích môn Tin học.</p>
    <img src="https://via.placeholder.com/300" alt="Hình của tôi">
    <h3>Sở thích</h3>
    <ul>
        <li>Đọc sách công nghệ</li>
        <li>Lập trình Python</li>
        <li>Nghe nhạc</li>
    </ul>
    <p>Liên hệ: <a href="mailto:email@example.com">email@example.com</a></p>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Tạo tiêu đề chính với thẻ <h1>', required: true },
      { step: 2, text: 'Thêm tiêu đề phụ với thẻ <h2>', required: true },
      { step: 3, text: 'Viết một đoạn văn giới thiệu bản thân với thẻ <p>', required: true },
      { step: 4, text: 'Thêm hình ảnh với thẻ <img> (sử dụng placeholder image)', required: true },
      { step: 5, text: 'Tạo danh sách sở thích với thẻ <ul> và <li>', required: true },
      { step: 6, text: 'Thêm liên kết email với thẻ <a>', required: false }
    ],
    hints: [
      'Nhớ đặt alt cho thẻ img để tăng accessibility',
      'Thẻ h1 chỉ nên dùng 1 lần trên trang, dùng h2-h6 cho tiêu đề phụ',
      'Dùng placeholder.com để tạo hình ảnh demo'
    ],
    rubric: [
      { criterion: 'Cấu trúc HTML hợp lệ', points: 20, description: 'Có đủ html, head, body' },
      { criterion: 'Tiêu đề h1 và h2', points: 20, description: 'Sử dụng đúng thẻ heading' },
      { criterion: 'Đoạn văn với thẻ p', points: 20, description: 'Có nội dung trong thẻ p' },
      { criterion: 'Hình ảnh với alt', points: 20, description: 'Thẻ img có src và alt' },
      { criterion: 'Danh sách ul/li', points: 20, description: 'Ít nhất 3 mục trong danh sách' }
    ]
  },

  // ========== HTML/CSS LAB 2 ==========
  {
    id: 'lab-2',
    slug: 'lab-css-basics',
    title: 'CSS cơ bản - Tạo kiểu cho trang web',
    description: 'Học cách thêm CSS và tạo kiểu cho các phần tử HTML.',
    type: 'html-css',
    difficulty: 'easy',
    estimatedMinutes: 35,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Basics</title>
    <style>
        /* Viết CSS tại đây */
    </style>
</head>
<body>
    <h1>Tiêu đề chính</h1>
    <p>Đây là đoạn văn thứ nhất với nội dung về HTML.</p>
    <p>Đây là đoạn văn thứ hai với nội dung về CSS.</p>
    <div class="card">
        <h2>Thẻ div với class card</h2>
        <p>Nội dung bên trong card</p>
    </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Basics</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 20px;
        }
        h1 {
            color: #2563EB;
            text-align: center;
        }
        p {
            color: #333;
            line-height: 1.6;
        }
        .card {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>Tiêu đề chính</h1>
    <p>Đây là đoạn văn thứ nhất với nội dung về HTML.</p>
    <p>Đây là đoạn văn thứ hai với nội dung về CSS.</p>
    <div class="card">
        <h2>Thẻ div với class card</h2>
        <p>Nội dung bên trong card</p>
    </div>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Thêm font-family cho body', required: true },
      { step: 2, text: 'Đổi màu tiêu đề h1 thành màu xanh dương (#2563EB)', required: true },
      { step: 3, text: 'Thêm margin cho body', required: true },
      { step: 4, text: 'Tạo style cho class .card với background trắng, padding, border-radius, shadow', required: true },
      { step: 5, text: 'Thêm line-height cho đoạn văn', required: false }
    ],
    hints: [
      'Sử dụng Google Fonts nếu muốn font đẹp hơn',
      'Box-shadow: 0 2px 4px rgba(0,0,0,0.1) tạo bóng nhẹ',
      'Border-radius tạo góc tròn cho element'
    ],
    rubric: [
      { criterion: 'Font family cho body', points: 20, description: 'Áp dụng được font Arial hoặc sans-serif' },
      { criterion: 'Màu tiêu đề h1', points: 20, description: 'Đổi được màu chữ h1' },
      { criterion: 'Margin body', points: 20, description: 'Thêm margin 20px' },
      { criterion: 'Style .card hoàn chỉnh', points: 40, description: 'Có background, padding, border-radius, box-shadow' }
    ]
  },

  // ========== HTML/CSS LAB 3 ==========
  {
    id: 'lab-3',
    slug: 'lab-box-model',
    title: 'Box Model trong CSS',
    description: 'Hiểu và thực hành Box Model: content, padding, border, margin.',
    type: 'html-css',
    difficulty: 'medium',
    estimatedMinutes: 40,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model Practice</title>
    <style>
        .box {
            /* Thêm CSS box model tại đây */
            background-color: #e0e0e0;
            width: 200px;
        }
        .inner {
            /* Style bên trong */
        }
    </style>
</head>
<body>
    <h1>Box Model Demo</h1>
    <div class="box">
        <p>Box này cần có padding, border, margin rõ ràng.</p>
    </div>
    <div class="inner">
        <p>Inner content với background riêng</p>
    </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model Practice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        h1 {
            color: #1E40AF;
        }
        .box {
            background-color: #e0e0e0;
            width: 200px;
            padding: 20px;
            border: 5px solid #2563EB;
            margin: 30px;
        }
        .inner {
            background-color: #93C5FD;
            padding: 15px;
            margin-top: 10px;
            border: 2px dashed #1E40AF;
        }
    </style>
</head>
<body>
    <h1>Box Model Demo</h1>
    <div class="box">
        <p>Box này cần có padding, border, margin rõ ràng.</p>
    </div>
    <div class="inner">
        <p>Inner content với background riêng</p>
    </div>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Thêm padding: 20px cho .box', required: true },
      { step: 2, text: 'Thêm border: 5px solid blue cho .box', required: true },
      { step: 3, text: 'Thêm margin: 30px cho .box', required: true },
      { step: 4, text: 'Tạo style cho .inner với background, padding, border dashed', required: true },
      { step: 5, text: 'Thêm margin-top cho .inner để tạo khoảng cách', required: false }
    ],
    hints: [
      'Padding trong border, margin ngoài border',
      'border-style có thể là solid, dashed, dotted',
      'Dùng DevTools (F12) để inspect và hiểu box model trực quan'
    ],
    rubric: [
      { criterion: 'Padding cho .box', points: 25, description: 'padding: 20px' },
      { criterion: 'Border cho .box', points: 25, description: 'border: 5px solid' },
      { criterion: 'Margin cho .box', points: 25, description: 'margin: 30px' },
      { criterion: 'Style .inner', points: 25, description: 'Có background, padding, border dashed' }
    ]
  },

  // ========== HTML/CSS LAB 4 ==========
  {
    id: 'lab-4',
    slug: 'lab-flexbox',
    title: 'Flexbox Layout - Navigation Bar',
    description: 'Sử dụng Flexbox để tạo navigation bar responsive.',
    type: 'html-css',
    difficulty: 'medium',
    estimatedMinutes: 45,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Navbar</title>
    <style>
        /* Tạo navbar với Flexbox */
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Tin12 Pro</div>
        <ul class="nav-links">
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Khóa học</a></li>
            <li><a href="#">Luyện thi</a></li>
            <li><a href="#">Liên hệ</a></li>
        </ul>
        <button class="btn-login">Đăng nhập</button>
    </nav>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Navbar</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #0F172A;
            padding: 15px 30px;
            color: white;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #06B6D4;
        }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 20px;
        }
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: #06B6D4;
        }
        .btn-login {
            background-color: #2563EB;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
        }
        .btn-login:hover {
            background-color: #1E40AF;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Tin12 Pro</div>
        <ul class="nav-links">
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Khóa học</a></li>
            <li><a href="#">Luyện thi</a></li>
            <li><a href="#">Liên hệ</a></li>
        </ul>
        <button class="btn-login">Đăng nhập</button>
    </nav>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Reset CSS với * { margin: 0; padding: 0; box-sizing: border-box; }', required: true },
      { step: 2, text: 'Tạo .navbar với display: flex, justify-content: space-between', required: true },
      { step: 3, text: 'Tạo .nav-links với display: flex, list-style: none, gap: 20px', required: true },
      { step: 4, text: 'Style logo với font-size lớn và màu cyan', required: true },
      { step: 5, text: 'Style button đăng nhập với background blue, border-radius', required: true },
      { step: 6, text: 'Thêm hover effect cho link và button', required: false }
    ],
    hints: [
      'Flexbox mặc định flex-direction: row',
      'justify-content: space-between đẩy items ra hai đầu',
      'gap tạo khoảng cách giữa các flex items'
    ],
    rubric: [
      { criterion: 'Reset CSS và box-sizing', points: 15, description: 'Reset margin/padding, dùng border-box' },
      { criterion: 'Navbar flex container', points: 20, description: 'display: flex, space-between' },
      { criterion: 'Nav-links horizontal', points: 20, description: 'display: flex, list-style: none, gap' },
      { criterion: 'Style logo', points: 15, description: 'Font lớn, màu cyan' },
      { criterion: 'Style button', points: 15, description: 'Background blue, padding, border-radius' },
      { criterion: 'Hover effects', points: 15, description: 'Color change on hover' }
    ]
  },

  // ========== HTML/CSS LAB 5 ==========
  {
    id: 'lab-5',
    slug: 'lab-form',
    title: 'Tạo Form đăng ký với CSS',
    description: 'Xây dựng form đăng ký với các loại input và validation.',
    type: 'html-css',
    difficulty: 'medium',
    estimatedMinutes: 50,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        /* Thêm CSS form tại đây */
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Đăng ký tài khoản</h1>
        <form>
            <!-- Thêm các input fields tại đây -->
        </form>
    </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form-container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #667eea;
        }
        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Đăng ký tài khoản</h1>
        <form>
            <div class="form-group">
                <label for="name">Họ và tên</label>
                <input type="text" id="name" name="name" required placeholder="Nhập họ tên">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Nhập email">
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password" required minlength="8" placeholder="Ít nhất 8 ký tự">
            </div>
            <div class="form-group">
                <label for="dob">Ngày sinh</label>
                <input type="date" id="dob" name="dob">
            </div>
            <button type="submit">Đăng ký</button>
        </form>
    </div>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Tạo form-container với background trắng, padding, border-radius, shadow', required: true },
      { step: 2, text: 'Tạo form-group cho mỗi input với margin-bottom', required: true },
      { step: 3, text: 'Style label với display: block và font-weight', required: true },
      { step: 4, text: 'Style input với width: 100%, padding, border, border-radius', required: true },
      { step: 5, text: 'Thêm input:focus với border-color thay đổi', required: true },
      { step: 6, text: 'Style button submit với gradient background', required: true },
      { step: 7, text: 'Thêm hover effect cho button', required: false }
    ],
    hints: [
      'box-shadow: 0 10px 30px rgba(0,0,0,0.2) tạo bóng đẹp',
      'Dùng linear-gradient cho button đẹp hơn',
      'transform: translateY(-2px) tạo hiệu ứng nổi khi hover'
    ],
    rubric: [
      { criterion: 'Form container style', points: 20, description: 'Background, padding, border-radius, shadow' },
      { criterion: 'Form group layout', points: 15, description: 'Margin-bottom cho mỗi group' },
      { criterion: 'Label styling', points: 15, description: 'Block display, font-weight' },
      { criterion: 'Input styling', points: 20, description: 'Width 100%, padding, border, border-radius' },
      { criterion: 'Focus state', points: 15, description: 'Border-color thay đổi khi focus' },
      { criterion: 'Button styling', points: 15, description: 'Gradient, padding, border-radius' }
    ]
  },

  // ========== NETWORK LAB ==========
  {
    id: 'lab-6',
    slug: 'lab-network-basic',
    title: 'Khám phá mạng - Từ ping đến tracert',
    description: 'Sử dụng các lệnh network cơ bản để kiểm tra kết nối và định tuyến.',
    type: 'network',
    difficulty: 'easy',
    estimatedMinutes: 30,
    starterCode: `<!-- Lab này là phần thực hành command line, không cần code HTML -->
# Network Lab - Command Line Practice
# Làm theo hướng dẫn bên dưới trong Command Prompt hoặc Terminal

## Bài 1: Kiểm tra cấu hình mạng
1. Mở Command Prompt (Windows: Win+R → cmd)
2. Gõ lệnh: ipconfig /all (Windows) hoặc ifconfig (Mac/Linux)
3. Ghi lại:
   - Địa chỉ IP của máy bạn: __________
   - Subnet Mask: __________
   - Default Gateway: __________

## Bài 2: Ping test
1. Ping Google: ping google.com
2. Ping Cloudflare: ping 1.1.1.1
3. Ghi lại thời gian phản hồi trung bình: __________ ms

## Bài 3: Trace route
1. Gõ: tracert google.com (Windows) hoặc traceroute google.com (Mac/Linux)
2. Đếm số router trung gian: __________
3. Router nào có độ trễ cao nhất? __________`,
    solutionCode: undefined,
    instructions: [
      { step: 1, text: 'Mở Command Prompt và chạy ipconfig /all', required: true },
      { step: 2, text: 'Ghi lại IP address, Subnet Mask, Default Gateway', required: true },
      { step: 3, text: 'Ping google.com và ghi thời gian phản hồi', required: true },
      { step: 4, text: 'Ping 1.1.1.1 (Cloudflare DNS)', required: true },
      { step: 5, text: 'Chạy tracert google.com và phân tích đường đi', required: true }
    ],
    hints: [
      'Nếu ping timeout, thử ping khác hoặc kiểm tra kết nối internet',
      'Độ trễ < 50ms là tốt, 50-100ms là bình thường, >100ms là chậm',
      'Tracert có thể mất 1-2 phút để hoàn thành, kiên nhẫn đợi'
    ],
    rubric: [
      { criterion: 'Chạy ipconfig thành công', points: 20, description: 'Mở được CMD và chạy lệnh' },
      { criterion: 'Ghi đúng IP address', points: 20, description: 'IP nằm trong range 192.168.x.x hoặc 10.x.x.x' },
      { criterion: 'Ping google thành công', points: 20, description: 'Nhận được reply từ google.com' },
      { criterion: 'Ghi thời gian phản hồi', points: 20, description: 'Ghi được giá trị ms' },
      { criterion: 'Phân tích tracert', points: 20, description: 'Liệt kê được ít nhất 3 router trung gian' }
    ]
  },

  // ========== DATA LAB ==========
  {
    id: 'lab-7',
    slug: 'lab-data-analysis',
    title: 'Phân tích dữ liệu đơn giản với Google Sheets',
    description: 'Học cách làm sạch dữ liệu, tính thống kê và vẽ biểu đồ.',
    type: 'data',
    difficulty: 'medium',
    estimatedMinutes: 45,
    starterCode: `# Data Analysis Lab - Google Sheets Practice

## Dataset: Điểm thi của 20 học sinh

| STT | Họ tên | Toán | Lý | Hóa | Tin |
|-----|--------|------|-----|-----|-----|
| 1 | Nguyễn Văn A | 7.5 | 8.0 | 7.0 | 9.0 |
| 2 | Trần Thị B | 8.0 | 7.5 | 8.5 | 8.0 |
| 3 | Lê Văn C | 6.0 | 5.5 | 6.5 | 7.0 |
... (xem file data đính kèm)

## Bài 1: Làm sạch dữ liệu
1. Copy dataset vào Google Sheets
2. Kiểm tra và xóa dòng trùng lặp (nếu có)
3. Điền giá trị thiếu (nếu có)

## Bài 2: Tính thống kê
1. Tính điểm trung bình mỗi môn
2. Tính điểm trung bình mỗi học sinh
3. Tìm điểm cao nhất, thấp nhất

## Bài 3: Vẽ biểu đồ
1. Vẽ histogram điểm Toán
2. Vẽ bar chart so sánh điểm các môn
3. Vẽ scatter plot giữa Toán và Lý`,
    solutionCode: undefined,
    instructions: [
      { step: 1, text: 'Import dataset vào Google Sheets mới', required: true },
      { step: 2, text: 'Kiểm tra duplicates và xóa nếu có', required: true },
      { step: 3, text: 'Tính điểm trung bình mỗi môn (dùng AVERAGE)', required: true },
      { step: 4, text: 'Tính điểm trung bình mỗi học sinh (dùng AVERAGE hoặc SUM/4)', required: true },
      { step: 5, text: 'Dùng MAX/MIN tìm điểm cao nhất/thấp nhất', required: true },
      { step: 6, text: 'Vẽ histogram điểm Toán', required: true },
      { step: 7, text: 'Vẽ bar chart so sánh 4 môn', required: false }
    ],
    hints: [
      'AVERAGE(range) tính trung bình',
      'COUNTIF(range, ">7") đếm số học sinh điểm >7',
      'Insert → Chart để tạo biểu đồ'
    ],
    rubric: [
      { criterion: 'Import data thành công', points: 15, description: 'Dataset vào đúng columns và rows' },
      { criterion: 'Kiểm tra duplicates', points: 15, description: 'Dùng Remove duplicates hoặc COUNTIF' },
      { criterion: 'Tính average mỗi môn', points: 20, description: '4 công thức AVERAGE đúng' },
      { criterion: 'Tính average mỗi học sinh', points: 20, description: '20 công thức average đúng' },
      { criterion: 'Tìm max/min', points: 15, description: 'Dùng MAX/MIN cho từng môn' },
      { criterion: 'Vẽ biểu đồ', points: 15, description: 'Ít nhất 1 chart hoàn chỉnh' }
    ]
  },

  // ========== PROJECT LAB ==========
  {
    id: 'lab-8',
    slug: 'lab-portfolio-page',
    title: 'Project cuối khóa - Tạo Portfolio cá nhân',
    description: 'Tạo một trang portfolio hoàn chỉnh sử dụng tất cả kiến thức đã học.',
    type: 'project',
    difficulty: 'hard',
    estimatedMinutes: 90,
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Portfolio của tôi</title>
    <style>
        /* Xây dựng portfolio hoàn chỉnh tại đây */
    </style>
</head>
<body>
    <!-- Portfolio structure:
    1. Header với navigation
    2. Hero section giới thiệu
    3. About section
    4. Skills section
    5. Projects section
    6. Contact section
    7. Footer
    -->
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
    <title>Portfolio - Nguyễn Văn A</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        /* Header & Nav */
        header {
            background: #0F172A;
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        .logo {
            color: #06B6D4;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: #06B6D4;
        }
        /* Hero */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6rem 2rem;
            text-align: center;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        /* About */
        .about {
            padding: 4rem 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .about h2 {
            color: #0F172A;
            margin-bottom: 1.5rem;
            font-size: 2rem;
        }
        /* Skills */
        .skills {
            background: #f8fafc;
            padding: 4rem 2rem;
        }
        .skills-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .skills h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #0F172A;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        .skill-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .skill-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        /* Projects */
        .projects {
            padding: 4rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .projects h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #0F172A;
        }
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .project-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s;
        }
        .project-card:hover {
            transform: translateY(-5px);
        }
        .project-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
        .project-content {
            padding: 1.5rem;
        }
        .project-content h3 {
            margin-bottom: 0.5rem;
        }
        .project-tags {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .tag {
            background: #e0e0e0;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
        }
        /* Contact */
        .contact {
            background: #0F172A;
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        .contact h2 {
            margin-bottom: 1rem;
        }
        .contact-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 2rem;
        }
        .contact-links a {
            color: #06B6D4;
            text-decoration: none;
            font-size: 1.1rem;
        }
        /* Footer */
        footer {
            background: #1E293B;
            color: #94a3b8;
            padding: 1.5rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Portfolio</div>
            <ul class="nav-links">
                <li><a href="#about">Giới thiệu</a></li>
                <li><a href="#skills">Kỹ năng</a></li>
                <li><a href="#projects">Dự án</a></li>
                <li><a href="#contact">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <h1>Xin chào! Tôi là Nguyễn Văn A</h1>
        <p>Học sinh lớp 12 | Yêu thích lập trình và công nghệ</p>
    </section>

    <section class="about" id="about">
        <h2>Về tôi</h2>
        <p>Tôi là học sinh lớp 12, đam mê công nghệ thông tin và lập trình. Tôi đã học được các ngôn ngữ như HTML, CSS, Python và có kiến thức nền tảng về AI và khoa học dữ liệu. Mục tiêu của tôi là trở thành một kỹ sư phần mềm.</p>
    </section>

    <section class="skills" id="skills">
        <div class="skills-container">
            <h2>Kỹ năng</h2>
            <div class="skills-grid">
                <div class="skill-card">
                    <div class="skill-icon">WEB</div>
                    <h3>HTML/CSS</h3>
                    <p>Xây dựng giao diện web</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">PY</div>
                    <h3>Python</h3>
                    <p>Lập trình cơ bản & Data</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">AI</div>
                    <h3>AI Basics</h3>
                    <p>Machine Learning cơ bản</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">DATA</div>
                    <h3>Data Analysis</h3>
                    <p>Phân tích dữ liệu</p>
                </div>
            </div>
        </div>
    </section>

    <section class="projects" id="projects">
        <h2>Dự án của tôi</h2>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-image">WEB</div>
                <div class="project-content">
                    <h3>Website cá nhân</h3>
                    <p>Trang web giới thiệu bản thân sử dụng HTML, CSS</p>
                    <div class="project-tags">
                        <span class="tag">HTML</span>
                        <span class="tag">CSS</span>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <div class="project-image">DATA</div>
                <div class="project-content">
                    <h3>Phân tích điểm thi</h3>
                    <p>Dự án phân tích điểm thi với Google Sheets</p>
                    <div class="project-tags">
                        <span class="tag">Data</span>
                        <span class="tag">Analysis</span>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <div class="project-image">GAME</div>
                <div class="project-content">
                    <h3>Game đơn giản</h3>
                    <p>Trò chơi đoán số với Python</p>
                    <div class="project-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Game</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact" id="contact">
        <h2>Liên hệ</h2>
        <p>Bạn có thể liên hệ với tôi qua:</p>
        <div class="contact-links">
            <a href="mailto:email@example.com">Email</a>
            <a href="#">GitHub</a>
            <a href="#">Facebook</a>
        </div>
    </section>

    <footer>
        <p>&copy; 2026 Nguyễn Văn A. All rights reserved.</p>
    </footer>
</body>
</html>`,
    instructions: [
      { step: 1, text: 'Tạo cấu trúc HTML với header, nav, các sections', required: true },
      { step: 2, text: 'Style navigation với Flexbox (logo trái, links phải)', required: true },
      { step: 3, text: 'Tạo Hero section với gradient background', required: true },
      { step: 4, text: 'Xây dựng About section với padding và max-width', required: true },
      { step: 5, text: 'Tạo Skills grid với CSS Grid (responsive)', required: true },
      { step: 6, text: 'Xây dựng Projects section với card layout', required: true },
      { step: 7, text: 'Tạo Contact section và Footer', required: true },
      { step: 8, text: 'Đảm bảo responsive trên mobile', required: true }
    ],
    hints: [
      'Dùng CSS Grid với minmax(300px, 1fr) để tự động responsive',
      'Sticky header với position: sticky và z-index',
      'Thêm hover effects để tăng trải nghiệm người dùng'
    ],
    rubric: [
      { criterion: 'Cấu trúc HTML đầy đủ', points: 10, description: 'Header, nav, hero, about, skills, projects, contact, footer' },
      { criterion: 'Navigation Flexbox', points: 15, description: 'Logo trái, links phải, hover effects' },
      { criterion: 'Hero section', points: 15, description: 'Gradient, text lớn, centering' },
      { criterion: 'Skills Grid responsive', points: 20, description: 'CSS Grid, cards đẹp, responsive' },
      { criterion: 'Project cards', points: 20, description: 'Image, content, tags, hover effects' },
      { criterion: 'Contact & Footer', points: 10, description: 'Background khác, links hoạt động' },
      { criterion: 'Mobile responsive', points: 10, description: 'Nav links, grid, typography co dãn' }
    ]
  }
];

export function getLabBySlug(slug: string): Lab | undefined {
  return labs.find(l => l.slug === slug);
}

export function getLabsByType(type: string): Lab[] {
  return labs.filter(l => l.type === type);
}
