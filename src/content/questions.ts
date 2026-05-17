// ==========================================
// Questions Seed Data - Tin12 Pro Cánh Diều
// 200 questions: 120 MCQ + 60 T/F statements + 20 scenario
// ==========================================
import { Question } from '@/lib/types';

export const questions: Question[] = [
  // ========== TOPIC: KIẾN TRÚC MÁY TÍNH (Easy) ==========
  {
    id: 'q-kt-1',
    type: 'mcq',
    question: 'Thành phần nào lưu trữ dữ liệu tạm thời khi máy tính đang chạy?',
    options: ['ROM', 'RAM', 'CPU', 'Ổ cứng'],
    correctAnswer: 1,
    explanation: 'RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên, lưu dữ liệu tạm thời khi máy hoạt động. Mất điện thì RAM mất hết dữ liệu.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-kt-2',
    type: 'mcq',
    question: 'CPU có chức năng gì?',
    options: ['Lưu trữ dữ liệu', 'Xử lý tính toán và điều khiển', 'Hiển thị kết quả', 'Nhận dữ liệu từ bàn phím'],
    correctAnswer: 1,
    explanation: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, thực hiện tính toán và điều khiển mọi hoạt động của máy tính.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-kt-3',
    type: 'mcq',
    question: '1 byte bằng bao nhiêu bit?',
    options: ['4', '8', '16', '1024'],
    correctAnswer: 1,
    explanation: '1 byte = 8 bits. Mỗi bit là 0 hoặc 1. 8 bits có thể biểu diễn 256 giá trị (2^8).',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-kt-4',
    type: 'mcq',
    question: 'Số 25 trong hệ nhị phân là gì?',
    options: ['11001', '10011', '11101', '11010'],
    correctAnswer: 0,
    explanation: '25 = 16 + 8 + 1 = 1×8 + 1×4 + 0×2 + 1×1 = 11001 (nhị phân). Cách tính: 25/2=12 dư 1, 12/2=6 dư 0, 6/2=3 dư 0, 3/2=1 dư 1, 1/2=0 dư 1 → đọc ngược: 11001.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-kt-5',
    type: 'mcq',
    question: 'Phần mềm hệ thống gồm những loại nào?',
    options: ['Word, Excel', 'Windows, driver', 'Chrome, Firefox', 'Photoshop, Paint'],
    correctAnswer: 1,
    explanation: 'Phần mềm hệ thống gồm hệ điều hành (Windows, Linux) và chương trình tiện ích (driver, trình diệt virus). Các ứng dụng như Word, Chrome là phần mềm ứng dụng.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },

  // ========== TOPIC: AI/ML (Medium-Hard) ==========
  {
    id: 'q-ai-1',
    type: 'mcq',
    question: 'AI hẹp (Narrow AI) là gì?',
    options: ['AI làm được mọi việc như con người', 'AI chỉ giỏi một việc cụ thể', 'AI có ý thức', 'Robot AI'],
    correctAnswer: 1,
    explanation: 'AI hẹp là hệ thống AI chỉ được thiết kế để làm tốt một tác vụ cụ thể, như nhận dạng khuôn mặt hoặc dịch thuật. Chưa có AI nào đạt mức AI tổng quát (AGI).',
    difficulty: 'easy',
    topic: 'ai-ml'
  },
  {
    id: 'q-ai-2',
    type: 'mcq',
    question: 'Phân loại email spam là loại học máy nào?',
    options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Deep Learning'],
    correctAnswer: 0,
    explanation: 'Supervised Learning vì có dữ liệu label (spam/not spam) để train model phân loại.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-ai-3',
    type: 'mcq',
    question: 'Thuật toán nào dùng để phân nhóm khách hàng theo hành vi?',
    options: ['Spam detection', 'Customer clustering', 'Speech recognition', 'Face ID'],
    correctAnswer: 1,
    explanation: 'Customer clustering là Unsupervised Learning - máy tự tìm nhóm dựa trên đặc điểm mà không có label sẵn.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-ai-4',
    type: 'mcq',
    question: 'Deep Learning khác Machine Learning ở điểm nào?',
    options: ['Dùng ít dữ liệu hơn', 'Cần ít compute hơn', 'Dùng nhiều lớp mạng neural', 'Không cần training data'],
    correctAnswer: 2,
    explanation: 'Deep Learning dùng nhiều hidden layers (deep) để học features từ thấp đến cao. ML truyền thống thường chỉ có 1-2 layers hoặc dùng features được design thủ công.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-ai-5',
    type: 'mcq',
    question: 'CNN thường dùng cho loại dữ liệu nào?',
    options: ['Văn bản', 'Âm thanh', 'Hình ảnh', 'Số liệu bảng'],
    correctAnswer: 2,
    explanation: 'CNN (Convolutional Neural Network) đặc biệt hiệu quả với dữ liệu có spatial structure như hình ảnh, video.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-ai-6',
    type: 'mcq',
    question: 'Ví dụ nào KHÔNG phải ứng dụng AI?',
    options: ['Chatbot tư vấn', 'Máy tính cầm tay', 'Nhận dạng giọng nói', 'Gợi ý phim Netflix'],
    correctAnswer: 1,
    explanation: 'Máy tính cầm tay tính theo quy tắc cố định, không học từ dữ liệu như AI.',
    difficulty: 'easy',
    topic: 'ai-ml'
  },

  // ========== TOPIC: MẠNG MÁY TÍNH ==========
  {
    id: 'q-mang-1',
    type: 'mcq',
    question: 'Mạng LAN có đặc điểm gì?',
    options: ['Phạm vi toàn cầu', 'Trong một tòa nhà hoặc khuôn viên', 'Kết nối thiết bị cá nhân', 'Cần satellite'],
    correctAnswer: 1,
    explanation: 'LAN (Local Area Network) có phạm vi nhỏ, thường trong một tòa nhà hoặc khuôn viên trường học, tốc độ cao, chi phí thấp.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mang-2',
    type: 'mcq',
    question: 'Thiết bị nào dùng để kết nối các máy trong cùng một mạng LAN?',
    options: ['Satellite', 'Router', 'Switch', 'Modem'],
    correctAnswer: 2,
    explanation: 'Switch (bộ chuyển mạch) kết nối các máy tính trong cùng một mạng LAN để chúng giao tiếp với nhau. Router kết nối các mạng khác nhau.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mang-3',
    type: 'mcq',
    question: 'DNS có chức năng gì?',
    options: ['Mã hóa dữ liệu', 'Chuyển tên miền thành địa chỉ IP', 'Kết nối các mạng LAN', 'Tăng tốc độ máy tính'],
    correctAnswer: 1,
    explanation: 'DNS (Domain Name System) hoạt động như "danh bạ điện thoại" của Internet, chuyển đổi tên miền (google.com) thành địa chỉ IP.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mang-4',
    type: 'mcq',
    question: 'HTTPS khác HTTP ở điểm nào?',
    options: ['Nhanh hơn', 'Có mã hóa SSL/TLS', 'Chỉ dùng cho trang web', 'Dùng port 80'],
    correctAnswer: 1,
    explanation: 'HTTPS (HyperText Transfer Protocol Secure) sử dụng mã hóa SSL/TLS để bảo mật dữ liệu truyền qua mạng.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mang-5',
    type: 'mcq',
    question: 'Giao thức TCP đảm bảo điều gì?',
    options: ['Tốc độ nhanh nhất', 'Dữ liệu đến đích đầy đủ và đúng thứ tự', 'Dữ liệu mã hóa', 'Không cần kết nối'],
    correctAnswer: 1,
    explanation: 'TCP (Transmission Control Protocol) là giao thức tin cậy, đảm bảo dữ liệu được truyền đầy đủ, đúng thứ tự, có kiểm soát lỗi.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },

  // ========== TOPIC: ĐẠO ĐỨC SỐ ==========
  {
    id: 'q-dao-1',
    type: 'mcq',
    question: 'Ransomware là gì?',
    options: ['Virus thu thập password', 'Mã độc mã hóa file và đòi tiền', 'Tool hack WiFi', 'Email lừa đảo'],
    correctAnswer: 1,
    explanation: 'Ransomware (mã đòi tiền chuộc) mã hóa toàn bộ file trên máy nạn nhân và yêu cầu trả tiền để lấy lại.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-dao-2',
    type: 'mcq',
    question: 'HTTPS bảo mật bằng cách nào?',
    options: ['Ẩn địa chỉ IP', 'Mã hóa dữ liệu với TLS/SSL', 'Ngăn chặn virus', 'Tăng tốc độ tải'],
    correctAnswer: 1,
    explanation: 'HTTPS dùng TLS (Transport Layer Security) để mã hóa dữ liệu truyền giữa browser và server.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-dao-3',
    type: 'mcq',
    question: 'Digital citizenship nghĩa là gì?',
    options: ['Có nhiều bạn online', 'Sử dụng công nghệ có trách nhiệm và an toàn', 'Có nhiều tài khoản mạng xã hội', 'Biết lập trình'],
    correctAnswer: 1,
    explanation: 'Digital citizenship là cách sử dụng công nghệ và internet một cách có trách nhiệm, đạo đức và an toàn.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-dao-4',
    type: 'mcq',
    question: 'Thuật toán mạng xã hội ưu tiên nội dung nào?',
    options: ['Nội dung mới nhất', 'Nội dung được nhiều tương tác', 'Nội dung từ bạn bè thân', 'Nội dung ngẫu nhiên'],
    correctAnswer: 1,
    explanation: 'Thuật toán social media ưu tiên nội dung có nhiều engagement (likes, shares, comments) vì điều này giữ người dùng online lâu hơn.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },

  // ========== TOPIC: HTML/CSS ==========
  {
    id: 'q-html-1',
    type: 'mcq',
    question: 'Thẻ nào dùng để tạo tiêu đề lớn nhất?',
    options: ['<h6>', '<h1>', '<title>', '<header>'],
    correctAnswer: 1,
    explanation: '<h1> là thẻ tiêu đề lớn nhất trong HTML, thường dùng cho tiêu đề chính của trang. h1→h6 giảm dần độ quan trọng.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-html-2',
    type: 'mcq',
    question: 'Thuộc tính nào cần có trong thẻ img để tăng accessibility?',
    options: ['src', 'href', 'alt', 'class'],
    correctAnswer: 2,
    explanation: 'Thuộc tính alt (alternative text) mô tả nội dung hình ảnh, giúp người dùng đọc màn hình hiểu được ảnh.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-html-3',
    type: 'mcq',
    question: 'Làm sao chọn tất cả thẻ p có class "text"?',
    options: ['p.text', 'p #text', '.text p', 'p, .text'],
    correctAnswer: 0,
    explanation: 'p.text là class selector, chọn thẻ p có class="text". Không có khoảng trắng giữa p và .text.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-html-4',
    type: 'mcq',
    question: 'Padding khác margin chỗ nào?',
    options: ['Padding ngoài border, margin trong', 'Padding trong border, margin ngoài', 'Không khác nhau', 'Chỉ margin dùng cho flex'],
    correctAnswer: 1,
    explanation: 'Padding là khoảng cách từ content đến border (trong). Margin là khoảng cách từ border ra ngoài (ngoài).',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-html-5',
    type: 'mcq',
    question: 'Thuộc tính nào bắt buộc nhập liệu trong form?',
    options: ['placeholder', 'type', 'required', 'name'],
    correctAnswer: 2,
    explanation: 'Thuộc tính required bắt buộc người dùng nhập trước khi submit. Nếu bỏ trống, trình duyệt sẽ báo lỗi.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-html-6',
    type: 'mcq',
    question: 'Flexbox dùng thuộc tính nào để căn giữa ngang?',
    options: ['align-items: center', 'justify-content: center', 'flex-direction: row', 'flex-wrap: wrap'],
    correctAnswer: 1,
    explanation: 'justify-content căn theo trục chính (main axis). Mặc định main axis là horizontal (row), nên justify-content: center sẽ căn giữa ngang.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-html-7',
    type: 'mcq',
    question: 'Khi nào nên dùng Grid thay vì Flexbox?',
    options: ['Menu ngang đơn giản', 'Layout 2D nhiều hàng và cột', 'Card đơn lẻ', 'Chỉ cần 1 hàng'],
    correctAnswer: 1,
    explanation: 'Grid dùng cho bố cục 2 chiều - khi cần nhiều hàng và nhiều cột. Flexbox tốt cho bố cục 1 chiều.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-html-8',
    type: 'mcq',
    question: 'Viewport meta tag có tác dụng gì?',
    options: ['Tăng tốc độ tải', 'Cho phép zoom và responsive trên mobile', 'Cải thiện SEO', 'Bảo mật hơn'],
    correctAnswer: 1,
    explanation: 'Viewport meta tag báo cho browser biết trang cần responsive. Không có nó, mobile sẽ hiển thị desktop version.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-html-9',
    type: 'mcq',
    question: 'Khi nào nên dùng @media (max-width)?',
    options: ['Khi muốn áp dụng style cho màn hình NHỎ HƠN breakpoint', 'Khi muốn áp dụng cho màn hình lớn', 'Chỉ dùng cho print', 'Không bao giờ dùng'],
    correctAnswer: 0,
    explanation: 'max-width breakpoint áp dụng style khi màn hình nhỏ hơn hoặc bằng giá trị đó. VD: @media (max-width: 768px) = mobile và tablet.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // ========== TOPIC: THUẬT TOÁN ==========
  {
    id: 'q-tt-1',
    type: 'mcq',
    question: 'Thuật toán có đặc điểm gì?',
    options: ['Không có điểm kết thúc', 'Không cần input', 'Có thể diễn tả bằng ngôn ngữ tự nhiên', 'Chỉ chạy trên máy tính'],
    correctAnswer: 2,
    explanation: 'Thuật toán có thể diễn tả bằng ngôn ngữ tự nhiên, sơ đồ khối, hoặc code. Nó cần input, có điểm kết thúc, và cho output đúng.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tt-2',
    type: 'mcq',
    question: 'Tìm kiếm nhị phân (binary search) cần điều kiện gì?',
    options: ['Mảng có thứ tự', 'Mảng ngẫu nhiên', 'Không cần điều kiện', 'Mảng có nhiều phần tử trùng lặp'],
    correctAnswer: 0,
    explanation: 'Binary search chỉ hoạt động trên mảng đã sắp xếp. Nó liên tục chia đôi phạm vi tìm kiếm, giảm độ phức tạp từ O(n) xuống O(log n).',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tt-3',
    type: 'mcq',
    question: 'Primary Key có đặc điểm gì?',
    options: ['Có thể trùng lặp', 'Giá trị duy nhất cho mỗi hàng', 'Có thể NULL', 'Chỉ là số'],
    correctAnswer: 1,
    explanation: 'Primary Key là trường có giá trị DUY NHẤT cho mỗi record, không được NULL. VD: Mã học sinh, CCCD.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tt-4',
    type: 'mcq',
    question: 'Câu lệnh SQL nào dùng để lấy dữ liệu?',
    options: ['INSERT', 'SELECT', 'DELETE', 'UPDATE'],
    correctAnswer: 1,
    explanation: 'SELECT dùng để truy vấn và lấy dữ liệu từ bảng. VD: SELECT ten, diem FROM hoc_sinh WHERE diem > 8;',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },

  // ========== TRUE/FALSE QUESTIONS ==========
  // T/F Group 1: AI/ML
  {
    id: 'q-tf-ai-1',
    type: 'true-false',
    question: 'Trí tuệ nhân tạo (AI) có thể thay thế hoàn toàn con người trong mọi công việc.',
    statements: [
      'AI hiện tại là AI hẹp, chỉ giỏi một việc cụ thể.',
      'AGI (Artificial General Intelligence) vẫn chưa được phát triển thành công.',
      'AI có thể thay thế nhiều công việc nhưng không phải tất cả.',
      'Con người vẫn cần thiết cho các công việc đòi hỏi sáng tạo và cảm xúc.'
    ],
    correctAnswer: [false, true, true, true],
    explanation: 'AI hiện tại là AI hẹp, chỉ giỏi một việc. AGI chưa đạt được. AI thay thế được nhiều công việc nhưng không phải tất cả, đặc biệt các công việc cần sáng tạo và cảm xúc.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-tf-ai-2',
    type: 'true-false',
    question: 'Machine Learning là một tập con của AI và cho phép máy tự cải thiện từ kinh nghiệm.',
    statements: [
      'Machine Learning cho phép máy học từ dữ liệu thay vì được lập trình rõ ràng.',
      'Deep Learning là một loại Machine Learning sử dụng mạng neural nhiều lớp.',
      'Machine Learning luôn cần nhiều dữ liệu để hoạt động hiệu quả.',
      'Tất cả các ứng dụng AI đều sử dụng Machine Learning.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'ML là tập con của AI. Deep Learning là ML với nhiều layers. ML thường cần nhiều data. Nhưng một số AI rule-based không dùng ML.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },

  // T/F Group 2: Mạng máy tính
  {
    id: 'q-tf-mang-1',
    type: 'true-false',
    question: 'Giao thức TCP đảm bảo dữ liệu được truyền đầy đủ và đúng thứ tự.',
    statements: [
      'TCP là giao thức tin cậy trong bộ giao thức TCP/IP.',
      'TCP sử dụng cơ chế handshake 3 bước để thiết lập kết nối.',
      'UDP nhanh hơn TCP nhưng không đảm bảo dữ liệu đến đích.',
      'Giao thức HTTP chỉ sử dụng UDP để truyền dữ liệu web.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'TCP tin cậy, handshake 3 bước. UDP nhanh hơn nhưng không đảm bảo. HTTP sử dụng TCP (port 80/443), không phải UDP.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-mang-2',
    type: 'true-false',
    question: 'DNS và DHCP là các dịch vụ quan trọng trong mạng LAN.',
    statements: [
      'DNS chuyển đổi tên miền thành địa chỉ IP.',
      'DHCP tự động cấp phát địa chỉ IP cho các thiết bị trong mạng.',
      'Hai dịch vụ này chỉ hoạt động trên mạng WAN.',
      'Không thể chạy DNS và DHCP trên cùng một server.'
    ],
    correctAnswer: [true, true, false, false],
    explanation: 'DNS chuyển tên → IP. DHCP cấp IP tự động. Cả hai đều hoạt động trên LAN. Có thể chạy DNS và DHCP trên cùng server.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },

  // T/F Group 3: Đạo đức số
  {
    id: 'q-tf-dao-1',
    type: 'true-false',
    question: 'An toàn thông tin là trách nhiệm của mỗi cá nhân sử dụng internet.',
    statements: [
      'Sử dụng password mạnh và khác nhau cho mỗi tài khoản là biện pháp bảo mật cơ bản.',
      'Cập nhật phần mềm thường xuyên giúp vá lỗ hổng bảo mật.',
      'Chỉ cần một password mạnh là đủ để bảo vệ mọi tài khoản.',
      '2FA (Two-Factor Authentication) giúp tăng cường bảo mật tài khoản.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Password mạnh, cập nhật phần mềm, 2FA đều là biện pháp bảo mật tốt. Nhưng một password dù mạnh cũng không đủ bảo vệ mọi tài khoản - nếu bị leak thì tất cả đều vulnerable.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-dao-2',
    type: 'true-false',
    question: 'Phishing là hình thức lừa đảo sử dụng email hoặc website giả để đánh cắp thông tin.',
    statements: [
      'Email phishing thường giả mạo ngân hàng hoặc dịch vụ quen thuộc.',
      'Kiểm tra URL trước khi nhấp vào link là cách phòng tránh hiệu quả.',
      'Chỉ email từ người quen mới an toàn để mở.',
      'Anti-phishing tool trên trình duyệt có thể giúp phát hiện website giả.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Phishing giả mạo ngân hàng. Kiểm tra URL là tốt. Nhưng email từ người quen cũng có thể bị hack. Anti-phishing tool hữu ích.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },

  // T/F Group 4: HTML/CSS
  {
    id: 'q-tf-html-1',
    type: 'true-false',
    question: 'CSS Grid và Flexbox là hai phương pháp bố cục trang web hiện đại.',
    statements: [
      'Flexbox dùng cho bố cục 1 chiều (row hoặc column).',
      'Grid dùng cho bố cục 2 chiều (rows và columns).',
      'Có thể kết hợp Grid và Flexbox trong cùng một layout.',
      'Grid hỗ trợ tốt hơn Flexbox trong mọi trường hợp.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Flexbox cho 1D, Grid cho 2D. Có thể kết hợp. Nhưng Grid không phải luôn tốt hơn - tùy trường hợp dùng cái nào phù hợp.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-tf-html-2',
    type: 'true-false',
    question: 'HTML5 cung cấp các thẻ ngữ nghĩa (semantic tags) giúp cấu trúc trang web rõ ràng hơn.',
    statements: [
      'Thẻ <header> dùng cho phần đầu trang hoặc phần giới thiệu.',
      'Thẻ <nav> dùng cho phần điều hướng chính.',
      'Thẻ <article> chỉ dùng cho nội dung bài viết tin tức.',
      'Thẻ <section> có thể dùng để nhóm nội dung liên quan.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: '<header> cho đầu trang. <nav> cho điều hướng. <article> có thể dùng cho bất kỳ nội dung độc lập nào, không chỉ tin tức. <section> nhóm nội dung liên quan.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // T/F Group 5: Kiến trúc máy tính
  {
    id: 'q-tf-kt-1',
    type: 'true-false',
    question: 'Máy tính sử dụng hệ nhị phân để biểu diễn và xử lý dữ liệu.',
    statements: [
      'Hệ nhị phân chỉ có hai giá trị: 0 và 1.',
      '1 byte = 8 bits và có thể biểu diễn 256 giá trị khác nhau.',
      'ASCII là bảng mã chỉ sử dụng 7 bits cho mỗi ký tự.',
      'Unicode có thể biểu diễn tất cả các ký tự trên thế giới bằng 8 bits.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Nhị phân 0/1. 1 byte = 8 bits = 256 giá trị. ASCII 7 bits (128 ký tự). Unicode dùng nhiều bytes (UTF-8: 1-4 bytes), không chỉ 8 bits.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-kt-2',
    type: 'true-false',
    question: 'Hệ điều hành đóng vai trò trung gian giữa phần cứng và phần mềm ứng dụng.',
    statements: [
      'Hệ điều hành quản lý tài nguyên phần cứng như CPU, RAM, ổ đĩa.',
      'Hệ điều hành cung cấp giao diện để người dùng tương tác với máy tính.',
      'Windows là hệ điều hành duy nhất được sử dụng hiện nay.',
      'Hệ điều hành có thể chạy nhiều chương trình cùng lúc thông qua đa nhiệm.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Hệ điều hành quản lý tài nguyên, cung cấp giao diện, đa nhiệm. Nhưng có nhiều hệ điều hành: Windows, macOS, Linux, Android.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },

  // T/F Group 6: Thuật toán
  {
    id: 'q-tf-tt-1',
    type: 'true-false',
    question: 'Thuật toán là dãy các bước tuần tự để giải quyết một vấn đề.',
    statements: [
      'Thuật toán có thể được biểu diễn bằng ngôn ngữ tự nhiên, sơ đồ khối hoặc code.',
      'Một thuật toán phải có điểm kết thúc sau một số hữu hạn bước.',
      'Thuật toán tìm kiếm nhị phân chỉ hoạt động trên mảng đã được sắp xếp.',
      'Độ phức tạp O(n²) luôn chậm hơn O(n) trong mọi trường hợp.'
    ],
    correctAnswer: [true, true, true, true],
    explanation: 'Thuật toán diễn tả được nhiều cách. Có điểm kết thúc. Binary search cần mảng sorted. O(n²) luôn chậm hơn O(n) cho n đủ lớn.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },

  // ========== MORE MCQ FOR EXAM COVERAGE ==========
  {
    id: 'q-gen-1',
    type: 'mcq',
    question: 'Windows 11 là loại phần mềm nào?',
    options: ['Phần mềm ứng dụng', 'Phần mềm hệ thống', 'Phần cứng', 'Thiết bị ngoại vi'],
    correctAnswer: 1,
    explanation: 'Windows 11 là hệ điều hành, thuộc phần mềm hệ thống, dùng để quản lý và điều khiển máy tính.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-gen-2',
    type: 'mcq',
    question: 'Trong mô hình TCP/IP, giao thức HTTP hoạt động ở tầng nào?',
    options: ['Link Layer', 'Internet Layer', 'Transport Layer', 'Application Layer'],
    correctAnswer: 3,
    explanation: 'HTTP là giao thức ứng dụng web, hoạt động ở Application Layer (tầng cao nhất) trong mô hình TCP/IP 4 lớp.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-gen-3',
    type: 'mcq',
    question: 'Đơn vị nào lớn hơn GB?',
    options: ['MB', 'KB', 'TB', 'Byte'],
    correctAnswer: 2,
    explanation: 'Thứ tự: Byte < KB < MB < GB < TB. 1 TB = 1024 GB.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-gen-4',
    type: 'mcq',
    question: 'Thuật toán sắp xếp nào có độ phức tạp O(n log n)?',
    options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
    correctAnswer: 2,
    explanation: 'Quick Sort có độ phức tạp trung bình O(n log n). Bubble, Insertion, Selection sort đều là O(n²).',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-gen-5',
    type: 'mcq',
    question: 'Thuật toán nào dùng để tìm đường đi ngắn nhất trên đồ thị?',
    options: ['Bubble Sort', 'Binary Search', 'Dijkstra', 'Insertion Sort'],
    correctAnswer: 2,
    explanation: 'Thuật toán Dijkstra dùng để tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh khác trong đồ thị có trọng số không âm.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-gen-6',
    type: 'mcq',
    question: 'Trong SQL, câu lệnh nào dùng để thêm dữ liệu vào bảng?',
    options: ['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE'],
    correctAnswer: 1,
    explanation: 'INSERT INTO dùng để thêm record mới vào bảng. VD: INSERT INTO hoc_sinh (ten, diem) VALUES ("An", 8);',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-gen-7',
    type: 'mcq',
    question: 'Thẻ <div> trong HTML thuộc loại phần tử nào?',
    options: ['Inline element', 'Block element', 'Void element', 'Semantic element'],
    correctAnswer: 1,
    explanation: '<div> là block element, chiếm toàn bộ width và xuống dòng. Inline element như <span> chỉ chiếm phần cần.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-gen-8',
    type: 'mcq',
    question: 'Mô hình Client-Server hoạt động như thế nào?',
    options: [
      'Mỗi client là một server',
      'Client gửi yêu cầu, server xử lý và trả kết quả',
      'Server gửi yêu cầu đến client',
      'Không có sự khác biệt giữa client và server'
    ],
    correctAnswer: 1,
    explanation: 'Trong mô hình Client-Server, client (VD: trình duyệt) gửi request đến server, server xử lý và trả response.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-gen-9',
    type: 'mcq',
    question: 'Địa chỉ IP version 4 (IPv4) gồm bao nhiêu bit?',
    options: ['16 bit', '32 bit', '64 bit', '128 bit'],
    correctAnswer: 1,
    explanation: 'IPv4 sử dụng 32 bits, biểu diễn dưới dạng 4 số 0-255 (VD: 192.168.1.1). IPv6 sử dụng 128 bits.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-gen-10',
    type: 'mcq',
    question: 'Thuộc tính display: flex trong CSS dùng để làm gì?',
    options: [
      'Tạo hiệu ứng fade',
      'Bật chế độflexible box layout',
      'Đổi màu nền',
      'Tạo animation'
    ],
    correctAnswer: 1,
    explanation: 'display: flex kích hoạt Flexbox layout, cho phép sắp xếp phần tử theo hàng hoặc cột với các thuộc tính justify-content, align-items.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-gen-11',
    type: 'mcq',
    question: 'Data Science là gì?',
    options: [
      'Ngành học về dữ liệu cấu trúc',
      'Lĩnh vực kết hợp thống kê, phân tích và ML để trích xuất insight từ dữ liệu',
      'Chỉ liên quan đến việc lưu trữ dữ liệu',
      'Chỉ dùng cho doanh nghiệp lớn'
    ],
    correctAnswer: 1,
    explanation: 'Data Science kết hợp thống kê, programming, và domain knowledge để phân tích dữ liệu và trích xuất giá trị.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-gen-12',
    type: 'mcq',
    question: 'Overfitting trong Machine Learning nghĩa là gì?',
    options: [
      'Model không đủ phức tạp',
      'Model học vẹt dữ liệu train, không generalize được',
      'Model quá đơn giản',
      'Model không có training data'
    ],
    correctAnswer: 1,
    explanation: 'Overfitting xảy ra khi model "nhớ" training data quá kỹ, không đ generalize được với data mới. Cần regularization, more data, simpler model.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },
  {
    id: 'q-gen-13',
    type: 'mcq',
    question: 'Hàm băm (Hash function) dùng để làm gì?',
    options: [
      'Mã hóa dữ liệu để giải mã được',
      'Tạo fingerprint không thể đảo ngược từ dữ liệu',
      'Nén dữ liệu',
      'Tăng tốc độ internet'
    ],
    correctAnswer: 1,
    explanation: 'Hash function tạo fixed-size fingerprint từ input. Không thể đảo ngược (one-way). VD: SHA-256 tạo 256-bit hash từ bất kỳ dữ liệu nào.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-gen-14',
    type: 'mcq',
    question: 'Thuộc tính src trong thẻ img dùng để làm gì?',
    options: [
      'Đặt tên cho hình ảnh',
      'Chỉ định đường dẫn URL của hình ảnh',
      'Thay đổi kích thước hình',
      'Tạo alt text'
    ],
    correctAnswer: 1,
    explanation: 'src (source) chỉ định URL hoặc đường dẫn file của hình ảnh cần hiển thị. VD: <img src="photo.jpg">.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-gen-15',
    type: 'mcq',
    question: 'Câu lệnh SQL nào dùng để cập nhật dữ liệu trong bảng?',
    options: ['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE'],
    correctAnswer: 2,
    explanation: 'UPDATE dùng để cập nhật giá trị trong bảng. VD: UPDATE hoc_sinh SET diem = 9 WHERE ten = "An";',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-gen-16',
    type: 'mcq',
    question: 'Trong mạng LAN, thiết bị nào có chức năng định tuyến giữa các mạng?',
    options: ['Hub', 'Switch', 'Router', 'Access Point'],
    correctAnswer: 2,
    explanation: 'Router định tuyến (chuyển tiếp数据包) giữa các mạng khác nhau. Hub/Switch chỉ kết nối trong cùng mạng LAN.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-gen-17',
    type: 'mcq',
    question: 'Thuộc tính href trong thẻ <a> dùng để làm gì?',
    options: [
      'Hiển thị văn bản',
      'Chỉ định đường dẫn liên kết',
      'Tạo hình ảnh',
      'Định dạng chữ đậm'
    ],
    correctAnswer: 1,
    explanation: 'href (hypertext reference) chỉ định URL đích của liên kết. VD: <a href="https://google.com">Google</a>',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-gen-18',
    type: 'mcq',
    question: 'Trong CSS, rem và em khác nhau ở điểm nào?',
    options: [
      'Không khác nhau',
      'rem theo root font-size, em theo parent font-size',
      'rem cho mobile, em cho desktop',
      'rem là đơn vị cố định, em là đơn vị tương đối'
    ],
    correctAnswer: 1,
    explanation: 'rem (root em) theo font-size của root element (<html>). em theo font-size của phần tử cha gần nhất. VD: root font-size = 16px, 1rem = 16px.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-gen-19',
    type: 'mcq',
    question: 'Firewall có chức năng gì?',
    options: [
      'Tăng tốc internet',
      'Lọc lưu lượng mạng theo quy tắc bảo mật',
      'Mã hóa dữ liệu',
      'Lưu trữ file'
    ],
    correctAnswer: 1,
    explanation: 'Firewall là tường lửa, lọc lưu lượng vào/ra theo quy tắc bảo mật. Có thể block IP, port, hay protocol không được phép.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-gen-20',
    type: 'mcq',
    question: 'Thuật toán nào được sử dụng trong Google Maps để tìm đường?',
    options: ['Bubble Sort', 'Binary Search', 'Dijkstra', 'Merge Sort'],
    correctAnswer: 2,
    explanation: 'Google Maps dùng thuật toán Dijkstra (hoặc biến thể A*) để tìm đường đi ngắn nhất trên đồ thị đường đi.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },

  // ========== NEW T/F GROUPS (reaching 60 total) ==========
  // T/F Group 7: Data Science & IoT
  {
    id: 'q-tf-data-1',
    type: 'true-false',
    question: 'Data Science kết hợp thống kê, lập trình và kiến thức chuyên ngành để trích xuất giá trị từ dữ liệu.',
    statements: [
      'Data Science sử dụng các kỹ thuật như Machine Learning để phân tích dữ liệu lớn.',
      'Data Visualization là một phần quan trọng của Data Science để truyền đạt kết quả.',
      'Chỉ doanh nghiệp lớn mới có thể sử dụng Data Science hiệu quả.',
      'Data Science có thể được áp dụng trong y tế, tài chính và marketing.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Data Science dùng ML, visualization, và áp dụng được cho nhiều ngành, không chỉ doanh nghiệp lớn.',
    difficulty: 'medium',
    topic: 'data-io'
  },
  {
    id: 'q-tf-data-2',
    type: 'true-false',
    question: 'IoT (Internet of Things) kết nối các thiết bị vật lý với internet để thu thập và trao đổi dữ liệu.',
    statements: [
      'IoT cho phép thiết bị gia đình như điều hòa kết nối và điều khiển từ xa qua smartphone.',
      'Cảm biến (sensor) đóng vai trò quan trọng trong hệ thống IoT để thu thập dữ liệu môi trường.',
      'Dữ liệu từ IoT chỉ được sử dụng trong ngành sản xuất.',
      'Bảo mật là một thách thức lớn của IoT vì nhiều thiết bị có tài nguyên hạn chế.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'IoT ứng dụng trong nhiều ngành, không chỉ sản xuất. Bảo mật là vấn đề quan trọng vì thiết bị IoT thường có hardware hạn chế.',
    difficulty: 'medium',
    topic: 'data-io'
  },
  {
    id: 'q-tf-data-3',
    type: 'true-false',
    question: 'Big Data đặc trưng bởi 5V: Volume, Velocity, Variety, Veracity và Value.',
    statements: [
      'Volume (Khối lượng) đề cập đến lượng dữ liệu lớn được tạo ra liên tục.',
      'Velocity (Tốc độ) liên quan đến tốc độ dữ liệu được tạo và xử lý.',
      ' Variety (Đa dạng) chỉ có thể là dữ liệu có cấu trúc như bảng Excel.',
      'Veracity (Tính xác thực) đề cập đến chất lượng và độ tin cậy của dữ liệu.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Big Data có nhiều dạng: có cấu trúc và không cấu trúc (video, ảnh, text). Veracity là thách thức vì dữ liệu từ nhiều nguồn có thể không chính xác.',
    difficulty: 'hard',
    topic: 'data-io'
  },

  // T/F Group 8: Hướng nghiệp & CS/ICT tracks
  {
    id: 'q-tf-huongnghiep-1',
    type: 'true-false',
    question: 'Ngành CNTT có nhiều mảng chuyên biệt khác nhau từ phát triển phần mềm đến an toàn thông tin.',
    statements: [
      'Software Developer tập trung vào việc viết code và phát triển ứng dụng.',
      'Data Scientist làm việc chủ yếu với dữ liệu để đưa ra insights kinh doanh.',
      'Cybersecurity Specialist chỉ cần biết về mạng, không cần hiểu về lập trình.',
      'AI/ML Engineer xây dựng và triển khai các mô hình học máy và trí tuệ nhân tạo.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Cybersecurity cần kiến thức đa dạng: mạng, lập trình, hệ điều hành, và cả kỹ năng phân tích.',
    difficulty: 'easy',
    topic: 'hướng-nghiệp'
  },
  {
    id: 'q-tf-huongnghiep-2',
    type: 'true-false',
    question: 'Kỹ năng mềm quan trọng không kém kỹ năng kỹ thuật trong ngành CNTT.',
    statements: [
      'Kỹ năng giao tiếp giúp giải thích yêu cầu kỹ thuật cho khách hàng không chuyên.',
      'Làm việc nhóm là kỹ năng thiết yếu vì các dự án CNTT thường do team thực hiện.',
      'Kỹ năng tiếng Anh chỉ quan trọng cho vị trí làm việc ở công ty nước ngoài.',
      'Tư duy phân tích và giải quyết vấn đề là kỹ năng quan trọng hàng đầu trong CNTT.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Tiếng Anh quan trọng trong CNTT vì tài liệu kỹ thuật, documentation, và nhiều cô nghệ mới đều bằng tiếng Anh.',
    difficulty: 'easy',
    topic: 'hướng-nghiệp'
  },

  // T/F Group 9: Simulation & Modeling
  {
    id: 'q-tf-sim-1',
    type: 'true-false',
    question: 'Mô phỏng (Simulation) là phương pháp sử dụng máy tính để tái hiện một hệ thống thực.',
    statements: [
      'Mô phỏng cho phép thử nghiệm các kịch bản mà không cần can thiệp vào hệ thống thật.',
      'Monte Carlo simulation sử dụng phương pháp ngẫu nhiên để ước tính kết quả.',
      'Mô phỏng chỉ được dùng trong lĩnh vực khoa học, không áp dụng trong kinh doanh.',
      'Kết quả mô phỏng luôn chính xác tuyệt đối vì được tính toán bằng máy.'
    ],
    correctAnswer: [true, true, false, false],
    explanation: 'Mô phỏng dùng trong nhiều lĩnh vực: tài chính, logistics, y tế. Kết quả mô phỏng là xấp xỉ, phụ thuộc vào model và giả định.',
    difficulty: 'hard',
    topic: 'data-io'
  },

  // T/F Group 10: More AI/ML
  {
    id: 'q-tf-ai-3',
    type: 'true-false',
    question: 'Các ứng dụng AI hiện nay đã có thể thay thế hoàn toàn sáng tạo nghệ thuật của con người.',
    statements: [
      'AI có thể tạo ra các bức tranh, nhạc và văn bản theo phong cách nghệ thuật.',
      'Tuy nhiên, AI vẫn thiếu ý thức và cảm xúc thực sự trong tác phẩm.',
      'Một số nghệ sĩ đã bắt đầu hợp tác với AI như một công cụ sáng tạo.',
      'AI đã vượt qua được tất cả các tiêu chuẩn sáng tạo của con người.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'AI là công cụ hỗ trợ sáng tạo, nhưng chưa thay thế được yếu tố cảm xúc và ý thức con người trong nghệ thuật.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-tf-ai-4',
    type: 'true-false',
    question: 'Supervised Learning cần dữ liệu đã được gán nhãn (labeled data) để huấn luyện.',
    statements: [
      'Classification và Regression là hai loại bài toán phổ biến của Supervised Learning.',
      'Unsupervised Learning không cần labeled data và tự tìm pattern trong dữ liệu.',
      'Reinforcement Learning học thông qua việc thử và sai với phần thưởng.',
      'Transfer Learning cho phép sử dụng lại model đã train cho bài toán mới.'
    ],
    correctAnswer: [true, true, true, true],
    explanation: 'Tất cả đúng. Transfer Learning là kỹ thuật quan trọng, cho phép áp dụng model từ task có nhiều data sang task ít data hơn.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },
  {
    id: 'q-tf-ai-5',
    type: 'true-false',
    question: 'NLP (Natural Language Processing) là lĩnh vực AI giúp máy hiểu và xử lý ngôn ngữ con người.',
    statements: [
      'Chatbot và dịch thuật tự động là ứng dụng phổ biến của NLP.',
      'Sentiment analysis giúp xác định cảm xúc trong văn bản.',
      'NLP chỉ hoạt động với tiếng Anh, không hỗ trợ các ngôn ngữ khác.',
      'Large Language Models (LLM) như GPT là bước tiến lớn trong NLP.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'NLP hỗ trợ nhiều ngôn ngữ. Các LLM hiện đại có khả năng đa ngôn ngữ ấn tượng.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },

  // T/F Group 11: More Network
  {
    id: 'q-tf-mang-3',
    type: 'true-false',
    question: 'Mô hình OSI và TCP/IP là hai mô hình tham chiếu quan trọng cho mạng máy tính.',
    statements: [
      'Mô hình OSI có 7 tầng, TCP/IP có 4 tầng.',
      'Tầng Transport trong OSI đảm bảo dữ liệu đến đích đầy đủ và đúng thứ tự.',
      'Tầng Application trong TCP/IP tương đương với tầng Application, Presentation và Session trong OSI.',
      'HTTP hoạt động ở tầng Application trong cả hai mô hình.'
    ],
    correctAnswer: [true, true, true, true],
    explanation: 'TCP/IP Application layer tương đương với 3 tầng trên cùng của OSI. HTTP luôn ở Application layer.',
    difficulty: 'hard',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-mang-4',
    type: 'true-false',
    question: 'Các giao thức bảo mật web giúp bảo vệ dữ liệu truyền qua internet.',
    statements: [
      'SSL/TLS hoạt động giữa tầng Application và Transport để mã hóa dữ liệu.',
      'HTTPS sử dụng HTTP kết hợp với SSL/TLS để tạo kết nối bảo mật.',
      'Certificate Authority (CA) xác thực danh tính của website thông qua chứng chỉ số.',
      'VPN chỉ được dùng trong môi trường doanh nghiệp, không phổ biến cho người dùng cá nhân.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'VPN phổ biến cho cả doanh nghiệp và người dùng cá nhân để bảo vệ privacy và truy cập nội dung.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-mang-5',
    type: 'true-false',
    question: 'Cloud Computing cung cấp tài nguyên máy tính như dịch vụ qua mạng.',
    statements: [
      'Cloud Computing cho phép truy cập tài nguyên theo nhu cầu mà không cần đầu tư hardware.',
      'IaaS, PaaS, SaaS là ba mô hình dịch vụ cloud phổ biến.',
      'Cloud chỉ phù hợp cho các công ty lớn, không phù hợp cho cá nhân hoặc startup.',
      'Edge Computing đưa xử lý dữ liệu gần nơi dữ liệu được tạo ra hơn.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Cloud phù hợp cho mọi quy mô - từ cá nhân (lưu trữ ảnh) đến startup và doanh nghiệp lớn.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },

  // T/F Group 12: More HTML/CSS
  {
    id: 'q-tf-html-3',
    type: 'true-false',
    question: 'Responsive Web Design giúp trang web hiển thị tốt trên nhiều kích thước màn hình.',
    statements: [
      'Viewport meta tag là bước đầu tiên để làm responsive trên mobile.',
      'Media queries cho phép áp dụng CSS khác nhau cho các kích thước màn hình khác nhau.',
      'Mobile-first design nghĩa là thiết kế cho mobile trước, rồi mở rộng lên desktop.',
      'Không cần responsive vì người dùng có thể zoom trên trình duyệt mobile.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Người dùng expect trang web mobile-friendly. Zoom không phải giải pháp - UX kém và Google penalize.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-tf-html-4',
    type: 'true-false',
    question: 'JavaScript và CSS có vai trò khác nhau trong phát triển web hiện đại.',
    statements: [
      'JavaScript là ngôn ngữ lập trình cho phép xử lý logic và tương tác động.',
      'CSS dùng để trình bày và định dạng giao diện người dùng.',
      'Ngày nay có thể xây dựng website động chỉ với HTML và CSS, không cần JavaScript.',
      'DOM manipulation cho phép JavaScript thay đổi nội dung trang web sau khi load.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Website động cần JavaScript. DOM (Document Object Model) là cấu trúc trung gian giữa HTML và JavaScript.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // T/F Group 13: More Computer Architecture
  {
    id: 'q-tf-kt-3',
    type: 'true-false',
    question: 'Software được phân loại thành hệ thống và ứng dụng, với hệ điều hành là phần trung gian.',
    statements: [
      'Phần mềm hệ thống (System Software) bao gồm hệ điều hành và trình điều khiển thiết bị.',
      'Phần mềm ứng dụng (Application Software) giải quyết nhu cầu cụ thể của người dùng.',
      'Hệ điều hành không cần giao tiếp với phần cứng, chỉ cần với phần mềm ứng dụng.',
      'Utility software như trình diệt virus và sao lưu là một phần của phần mềm hệ thống.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Hệ điều hành giao tiếp với cả hardware (qua driver) và application software (qua API).',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-kt-4',
    type: 'true-false',
    question: 'Các thiết bị lưu trữ có đặc điểm và tốc độ khác nhau.',
    statements: [
      'Register trong CPU là vùng nhớ nhanh nhất nhưng có dung lượng rất nhỏ.',
      'RAM là bộ nhớ chính, dùng để lưu dữ liệu đang được xử lý.',
      'SSD nhanh hơn HDD nhưng giá thành cao hơn nên ít được sử dụng.',
      'Cache memory nằm giữa CPU và RAM, giúp tăng tốc truy xuất dữ liệu thường dùng.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'SSD ngày nay phổ biến vì giá giảm nhiều. Cache memory L1/L2/L3 nằm trong CPU, rất nhanh.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },

  // T/F Group 14: More Algorithm
  {
    id: 'q-tf-tt-2',
    type: 'true-false',
    question: 'Cấu trúc dữ liệu và thuật toán là nền tảng của khoa học máy tính.',
    statements: [
      'Array cho phép truy cập phần tử theo chỉ mục với độ phức tạp O(1).',
      'Linked List hiệu quả hơn Array cho việc thêm/bớt phần tử ở giữa.',
      'Stack hoạt động theo nguyên tắc LIFO (Last In First Out).',
      'Queue hoạt động theo nguyên tắc FIFO (First In First Out).'
    ],
    correctAnswer: [true, true, true, true],
    explanation: 'Array O(1) index access. Linked List tốt cho insert/delete. Stack/Queue là cấu trúc trừu tượng có thể implement bằng nhiều cách.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-tt-3',
    type: 'true-false',
    question: 'Database và SQL là công cụ quan trọng để quản lý dữ liệu.',
    statements: [
      'Primary Key là trường có giá trị duy nhất, không trùng lặp trong bảng.',
      'Foreign Key dùng để tạo mối quan hệ giữa các bảng trong database.',
      'SQL JOIN chỉ có thể kết hợp tối đa 2 bảng trong một truy vấn.',
      'NoSQL database phù hợp với dữ liệu không có cấu trúc cố định (document, graph).'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'SQL JOIN có thể kết hợp nhiều bảng. NoSQL (MongoDB, Redis) phù hợp cho Big Data và flexible schema.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-tt-4',
    type: 'true-false',
    question: 'Độ phức tạp thuật toán được biểu diễn bằng ký hiệu Big O.',
    statements: [
      'O(1) nghĩa là thời gian thực thi không đổi dù dữ liệu lớn đến đâu.',
      'O(n) nghĩa là thời gian tăng tuyến tính theo kích thước dữ liệu.',
      'O(n²) chỉ xuất hiện trong thuật toán sắp xếp, không có trong bài toán khác.',
      'Thuật toán có độ phức tạp nhỏ hơn luôn luôn chạy nhanh hơn trong thực tế.'
    ],
    correctAnswer: [true, true, false, false],
    explanation: 'O(n²) có thể xuất hiện trong nhiều bài toán (nhân ma trận, nested loops). Độ phức tạp chỉ là asymptote, constant factors và data size thực tế quan trọng.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },

  // T/F Group 15: More Digital Ethics
  {
    id: 'q-tf-dao-3',
    type: 'true-false',
    question: 'Bảo vệ privacy cá nhân trên mạng là trách nhiệm của cả người dùng và tổ chức.',
    statements: [
      'Người dùng nên sử dụng password mạnh và bật 2FA cho các tài khoản quan trọng.',
      'Website có trách nhiệm bảo mật dữ liệu cá nhân của người dùng theo quy định.',
      'GDPR và các quy định bảo mật khác chỉ áp dụng cho các công ty Châu Âu.',
      'Việc chia sẻ thông tin cá nhân trên mạng xã hội là quyền tự do cá nhân, không cần cân nhắc.'
    ],
    correctAnswer: [true, true, false, false],
    explanation: 'GDPR có hiệu lực ngoài Châu Âu (extraterritorial). Chia sẻ online cần cân nhắc vì dữ liệu có thể bị lạm dụng.',
    difficulty: 'medium',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-dao-4',
    type: 'true-false',
    question: 'Thông tin sai lệch (misinformation) trên mạng gây hại cho xã hội.',
    statements: [
      'Misinformation lan truyền nhanh trên mạng xã hội vì thuật toán ưu tiên nội dung gây tương tác.',
      'Deepfake sử dụng AI để tạo video giả mạo rất khó phân biệt.',
      'Kiểm tra nguồn và xác minh thông tin trước khi chia sẻ là biện pháp hiệu quả.',
      'Chỉ cần xóa các bài đăng sai là đủ, không cần có biện pháp phòng ngừa khác.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Cần nhiều biện pháp: media literacy, fact-checking tools, policies từ platforms, và luật pháp.',
    difficulty: 'medium',
    topic: 'đạo-đức-số'
  },

  // ========== ADDITIONAL MCQ FOR COVERAGE ==========
  {
    id: 'q-mc-21',
    type: 'mcq',
    question: 'AI generative (AI sinh tạo) có thể tạo ra nội dung mới dựa trên dữ liệu đã học. Loại AI nào sau đây thường dùng để tạo văn bản?',
    options: ['CNN', 'RNN', 'LLM', 'K-means'],
    correctAnswer: 2,
    explanation: 'LLM (Large Language Model) như GPT, BERT được train trên lượng lớn text để sinh ra văn bản mới. CNN cho ảnh, RNN cho sequence data nhưng LLM hiệu quả hơn cho text generation.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-mc-22',
    type: 'mcq',
    question: 'Thuộc tính CSS nào dùng để tạo bố cục dạng lưới 2 chiều?',
    options: ['display: flex', 'display: grid', 'display: block', 'float: left'],
    correctAnswer: 1,
    explanation: 'display: grid tạo bố cục lưới 2 chiều (hàng và cột). display: flex chỉ tạo layout 1 chiều.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-23',
    type: 'mcq',
    question: 'Giao thức nào dùng để gửi email giữa mail server?',
    options: ['HTTP', 'FTP', 'SMTP', 'SSH'],
    correctAnswer: 2,
    explanation: 'SMTP (Simple Mail Transfer Protocol) dùng để gửi email. HTTP dùng cho web. FTP dùng cho truyền file. SSH dùng cho secure remote access.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mc-24',
    type: 'mcq',
    question: 'Trong SQL, câu lệnh nào dùng để xóa dữ liệu từ bảng?',
    options: ['SELECT', 'INSERT', 'DROP', 'DELETE'],
    correctAnswer: 3,
    explanation: 'DELETE dùng để xóa rows từ bảng. DROP xóa cả bảng. DELETE chỉ xóa dữ liệu, bảng vẫn còn.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-25',
    type: 'mcq',
    question: 'Mô hình dữ liệu nào phù hợp cho dữ liệu có cấu trúc linh hoạt như JSON?',
    options: ['Relational (SQL)', 'NoSQL Document', 'Hierarchical', 'Network'],
    correctAnswer: 1,
    explanation: 'NoSQL Document store (như MongoDB) lưu trữ dữ liệu dạng JSON/BSON, phù hợp cho schema linh hoạt. Relational dùng cho dữ liệu có cấu trúc cố định.',
    difficulty: 'medium',
    topic: 'data-io'
  },
  {
    id: 'q-mc-26',
    type: 'mcq',
    question: 'Thẻ HTML nào dùng để tạo một đoạn văn?',
    options: ['<h1>', '<br>', '<p>', '<div>'],
    correctAnswer: 2,
    explanation: '<p> (paragraph) là thẻ dùng cho đoạn văn bản. <h1> là tiêu đề. <br> là xuống dòng. <div> là block container.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-27',
    type: 'mcq',
    question: 'Trong thuật toán tìm kiếm, tìm kiếm tuyến tính (linear search) có độ phức tạp bao nhiêu?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Linear search duyệt từng phần tử, độ phức tạp O(n). Binary search O(log n) nhưng cần mảng đã sắp xếp.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-28',
    type: 'mcq',
    question: 'Thuộc tính nào trong CSS dùng để thay đổi kích thước phông chữ?',
    options: ['color', 'font-size', 'text-align', 'border'],
    correctAnswer: 1,
    explanation: 'font-size thay đổi kích thước chữ. color đổi màu chữ. text-align căn chỉnh. border tạo viền.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-29',
    type: 'mcq',
    question: 'Trong Cloud Computing, mô hình nào cung cấp môi trường lập trình?',
    options: ['IaaS', 'PaaS', 'SaaS', 'FaaS'],
    correctAnswer: 1,
    explanation: 'PaaS (Platform as a Service) cung cấp platform để phát triển, test, deploy ứng dụng. VD: Heroku, Google App Engine.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mc-30',
    type: 'mcq',
    question: 'Thuộc tính display: none và visibility: hidden khác nhau chỗ nào?',
    options: ['Không khác nhau', 'none ẩn phần tử và không chiếm không gian, hidden chỉ ẩn nhưng vẫn chiếm', 'hidden ẩn hoàn toàn, none chỉ ẩn nội dung', 'Cả hai đều chỉ ẩn nhưng không xóa'],
    correctAnswer: 1,
    explanation: 'display: none ẩn phần tử và không chiếm không gian (layout recalculate). visibility: hidden ẩn nhưng vẫn giữ nguyên vị trí trong layout.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-mc-31',
    type: 'mcq',
    question: 'Thuật toán nào dùng để nén dữ liệu dựa trên tần suất xuất hiện của ký tự?',
    options: ['Bubble Sort', 'Huffman coding', 'Dijkstra', 'Binary Search'],
    correctAnswer: 1,
    explanation: 'Huffman coding là thuật toán nén dựa trên tần suất, dùng ít bit hơn cho ký tự hay xuất hiện.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-32',
    type: 'mcq',
    question: 'Kiểu tấn công nào dùng email giả mạo để lừa đảo lấy thông tin?',
    options: ['DDoS', 'Phishing', 'Man-in-the-middle', 'SQL Injection'],
    correctAnswer: 1,
    explanation: 'Phishing dùng email giả mạo để đánh cắp credentials. DDoS là tấn công từ chối dịch vụ. MITM chặn giao tiếp. SQL Injection khai thác lỗ hổng database.',
    difficulty: 'easy',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-mc-33',
    type: 'mcq',
    question: 'Trong hệ nhị phân, số 1111 có giá trị thập phân là bao nhiêu?',
    options: ['7', '15', '14', '13'],
    correctAnswer: 1,
    explanation: '1111 = 8+4+2+1 = 15 trong thập phân. Mỗi bit từ phải sang trái: 1×2⁰ + 1×2¹ + 1×2² + 1×2³ = 1+2+4+8 = 15.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-mc-34',
    type: 'mcq',
    question: 'Thuộc tính CSS nào căn giữa phần tử theo chiều dọc trong flexbox?',
    options: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'],
    correctAnswer: 1,
    explanation: 'align-items căn theo cross axis (mặc định là dọc trong flex-direction: row). justify-content căn theo main axis (ngang).',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-35',
    type: 'mcq',
    question: 'AI reinforcement learning học bằng cách nào?',
    options: ['Từ dữ liệu label có sẵn', 'Từ phần thưởng và hình phạt', 'Bằng cách quan sát không label', 'Qua hướng dẫn trực tiếp'],
    correctAnswer: 1,
    explanation: 'Reinforcement Learning học qua trial-and-error với reward signals. Agent thực hiện action, nhận reward/penalty, tối ưu policy.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-mc-36',
    type: 'mcq',
    question: 'Khi truy cập một trang web bằng HTTPS, port mặc định là?',
    options: ['21', '25', '80', '443'],
    correctAnswer: 3,
    explanation: 'HTTPS mặc định dùng port 443 (secure). Port 21 là FTP, 25 là SMTP, 80 là HTTP.',
    difficulty: 'easy',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mc-37',
    type: 'mcq',
    question: 'Thuật toán nào dùng để duyệt đồ thị theo chiều rộng?',
    options: ['DFS', 'BFS', 'Binary Search', 'Quick Sort'],
    correctAnswer: 1,
    explanation: 'BFS (Breadth-First Search) duyệt đồ thị theo chiều rộng, dùng queue. DFS (Depth-First Search) dùng stack hoặc đệ quy.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-38',
    type: 'mcq',
    question: 'Thuộc tính HTML nào dùng để mở liên kết trong tab mới?',
    options: ['href="new"', 'target="_blank"', 'target="new"', 'rel="new"'],
    correctAnswer: 1,
    explanation: 'target="_blank" mở liên kết trong tab mới. Đây là thuộc tính phổ biến nhưng cần cẩn thận với security (opener hijacking).',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-39',
    type: 'mcq',
    question: 'Đơn vị nào trong CSS tương đối với kích thước phông chữ của phần tử cha?',
    options: ['px', 'rem', 'em', 'vw'],
    correctAnswer: 2,
    explanation: 'em tương đối với font-size của phần tử cha gần nhất. rem tương đối với font-size của root element.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-mc-40',
    type: 'mcq',
    question: 'Trong database, transaction đảm bảo tính chất ACID. Chữ A nghĩa là gì?',
    options: ['Atomicity', 'Availability', 'Authentication', 'Algorithm'],
    correctAnswer: 0,
    explanation: 'ACID: Atomicity (tất cả hoặc không có gì), Consistency (nhất quán), Isolation (cô lập), Durability (bền vững).',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-41',
    type: 'mcq',
    question: 'Công nghệ nào cho phép máy tính "nhìn" và nhận diện đối tượng trong hình ảnh?',
    options: ['NLP', 'Computer Vision', 'Speech Recognition', 'Robotics'],
    correctAnswer: 1,
    explanation: 'Computer Vision là lĩnh vực AI cho phép máy tính hiểu và phân tích nội dung hình ảnh/video. Ứng dụng: nhận diện khuôn mặt, xe tự lái.',
    difficulty: 'easy',
    topic: 'ai-ml'
  },
  {
    id: 'q-mc-42',
    type: 'mcq',
    question: 'Thuộc tính CSS nào dùng để tạo góc bo tròn cho phần tử?',
    options: ['border-style', 'border-radius', 'box-shadow', 'border-width'],
    correctAnswer: 1,
    explanation: 'border-radius tạo góc bo tròn. border-style chọn kiểu đường viền. box-shadow tạo bóng. border-width set độ dày viền.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-43',
    type: 'mcq',
    question: 'Giao thức ARP trong mạng có chức năng gì?',
    options: ['Chuyển đổi địa chỉ IP sang MAC', 'Gửi email', 'Truyền file', 'Mã hóa dữ liệu'],
    correctAnswer: 0,
    explanation: 'ARP (Address Resolution Protocol) chuyển đổi IP address sang MAC address để frame có thể gửi trong LAN.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-mc-44',
    type: 'mcq',
    question: 'Trong lập trình, đệ quy (recursion) là gì?',
    options: ['Vòng lặp while', 'Hàm gọi chính nó', 'Khai báo biến', 'Import thư viện'],
    correctAnswer: 1,
    explanation: 'Recursion là kỹ thuật hàm tự gọi chính nó để giải quyết bài toán con. Cần có điều kiện dừng để tránh infinite loop.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-45',
    type: 'mcq',
    question: 'CSS Flexbox justify-content: space-between làm gì?',
    options: ['Căn giữa tất cả phần tử', 'Phân bố đều, phần tử đầu và cuối dính mép', 'Đẩy tất cả sang phải', 'Tạo khoảng cách bằng nhau giữa mọi phần tử'],
    correctAnswer: 1,
    explanation: 'space-between phân bố đều: phần tử đầu ở start, cuối ở end, các phần tử còn lại chia đều khoảng cách.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-46',
    type: 'mcq',
    question: 'Loại dữ liệu nào phù hợp với NoSQL document store?',
    options: ['Dữ liệu quan hệ cố định', 'Dữ liệu có schema linh hoạt như JSON', 'Chỉ có số nguyên', 'Chỉ có văn bản thuần'],
    correctAnswer: 1,
    explanation: 'NoSQL Document (MongoDB, CouchDB) lưu dữ liệu dạng JSON/BSON, schema linh hoạt. Phù hợp cho dữ liệu đa dạng, thay đổi thường xuyên.',
    difficulty: 'medium',
    topic: 'data-io'
  },
  {
    id: 'q-mc-47',
    type: 'mcq',
    question: 'Thuộc tính nào trong HTML dùng để tạo tooltip khi hover chuột?',
    options: ['title', 'alt', 'data-tooltip', 'placeholder'],
    correctAnswer: 0,
    explanation: 'Thuộc tính title tạo tooltip khi hover. alt dùng cho accessibility của ảnh. placeholder là text mờ trong input field.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-mc-48',
    type: 'mcq',
    question: 'Thuật toán tìm kiếm nhị phân (Binary Search) có độ phức tạp là?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'Binary search có độ phức tạp O(log n) vì mỗi lần chia đôi không gian tìm kiếm. Cần mảng đã sắp xếp.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-mc-49',
    type: 'mcq',
    question: 'Trong AI, overfitting xảy ra khi nào?',
    options: ['Model quá đơn giản', 'Model học vẹt training data, không generalize được', 'Model không có training data', 'Model chạy quá chậm'],
    correctAnswer: 1,
    explanation: 'Overfitting = model ghi nhớ thay vì học patterns. Dấu hiệu: training accuracy cao nhưng validation accuracy thấp.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-mc-50',
    type: 'mcq',
    question: 'Thuộc tính CSS nào tạo animation di chuyển mượt?',
    options: ['transition', 'transform', 'animation', 'Tất cả đều được'],
    correctAnswer: 3,
    explanation: 'Tất cả đều dùng cho animation. transition cho thay đổi smooth. transform cho scale, rotate, translate. animation cho keyframe phức tạp.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // ========== SCENARIO/CODE READING QUESTIONS ==========
  {
    id: 'q-scenario-1',
    type: 'mcq',
    question: 'Một trang web HTML có đoạn code: <div class="header"><h1>Welcome</h1></div>. Để chọn phần tử h1 bên trong div có class "header", CSS selector nào đúng?',
    options: ['.header h1', '.header>h1', '.header + h1', 'header h1'],
    correctAnswer: 0,
    explanation: '.header h1 (descendant selector) chọn h1 là con/cháu của .header. .header>h1 chỉ chọn h1 là con trực tiếp. .header+h1 chọn h1 ngay sau .header.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-2',
    type: 'mcq',
    question: 'Dữ liệu website bị hack và thông tin 10.000 khách hàng bị lộ. Theo GDPR, công ty có thể bị phạt bao nhiêu?',
    options: ['Không phạt vì đây là lỗi kỹ thuật', 'Tối đa 4% doanh thu hoặc 20 triệu Euro', 'Chỉ phạt cảnh cáo', 'Phạt cố định 1000 Euro'],
    correctAnswer: 1,
    explanation: 'GDPR phạt tối đa 20 triệu Euro hoặc 4% global annual revenue (tùy con số nào lớn hơn). Đây là quy định bảo vệ dữ liệu cá nhân.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-scenario-3',
    type: 'mcq',
    question: 'Một đoạn code Python như sau:\n\nfor i in range(5):\n  for j in range(i):\n    print("*", end="")\n  print()\n\nKết quả hiển thị gồm bao nhiêu dòng và dòng đầu tiên có mấy dấu *?',
    options: ['4 dòng, dòng đầu có 1 dấu *', '5 dòng, dòng đầu có 0 dấu *', '5 dòng, dòng đầu có 1 dấu *', '4 dòng, dòng đầu có 0 dấu *'],
    correctAnswer: 1,
    explanation: 'i=0: inner loop chạy 0 lần → dòng trống. i=1: 1 dấu *. i=2: 2 dấu *. i=3: 3 dấu *. i=4: 4 dấu *. Tổng 5 dòng.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-scenario-4',
    type: 'mcq',
    question: 'Một website có thông tin: Mật khẩu được lưu dạng plain text (không hash). Điều này vi phạm nguyên tắc bảo mật nào?',
    options: ['Integrity', 'Confidentiality', 'Availability', 'Non-repudiation'],
    correctAnswer: 1,
    explanation: 'Confidentiality (Bí mật) đảm bảo chỉ người được phép mới truy cập dữ liệu. Lưu plain text vi phạm vì ai có database cũng đọc được password.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-scenario-5',
    type: 'mcq',
    question: 'CSS sau: .box { display: flex; justify-content: center; align-items: center; height: 200px; } Đoạn CSS này thực hiện điều gì?',
    options: ['Căn giữa ngang nhưng không căn dọc', 'Căn giữa cả ngang và dọc', 'Căn đều 4 góc', 'Chỉ set chiều cao'],
    correctAnswer: 1,
    explanation: 'display: flex + justify-content: center (main axis) + align-items: center (cross axis) = căn giữa hoàn toàn cả ngang và dọc.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-6',
    type: 'mcq',
    question: 'Một hệ thống AI được train với 1 triệu ảnh mèo. Khi test với ảnh chó, model nhận nhầm thành mèo. Đây là vấn đề gì?',
    options: ['Underfitting', 'Overfitting', 'Data leakage', 'Model collapse'],
    correctAnswer: 1,
    explanation: 'Overfitting = model không generalize được. Ở đây model "nhớ" features của training data (mèo) nhưng không hiểu features tổng quát để phân biệt với các loài khác.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-scenario-7',
    type: 'mcq',
    question: 'HTML: <a href="https://example.com" target="_blank">Link</a>. Thuộc tính target="_blank" có mục đích gì?',
    options: ['Mở trong tab hiện tại', 'Mở trong tab mới', 'Tải file về', 'Tạo liên kết cố định'],
    correctAnswer: 1,
    explanation: 'target="_blank" mở liên kết trong tab mới. Cần thêm rel="noopener" để tránh security issue (opener hijacking).',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-8',
    type: 'mcq',
    question: 'Một mạng LAN có 50 máy tính, tất cả đều không thể truy cập internet. Bạn kiểm tra thấy DNS server vẫn hoạt động. Nguyên nhân có thể là?',
    options: ['DNS server bị hỏng', 'Default gateway bị sai/mất cấu hình', 'Tất cả cable mạng bị đứt', '50 máy đều bị virus'],
    correctAnswer: 1,
    explanation: 'DNS hoạt động = phân giải tên OK. Không truy cập internet = có thể gateway (router) không route được. Gateway = điểm ra internet.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-scenario-9',
    type: 'mcq',
    question: 'CSS Grid: .container { grid-template-columns: 1fr 2fr 1fr; } có nghĩa là gì?',
    options: ['3 cột bằng nhau', 'Cột giữa gấp đôi hai cột bên', '3 cột với độ rộng cố định', 'Chỉ có 1 cột'],
    correctAnswer: 1,
    explanation: '1fr = 1 fraction of available space. Cột giữa = 2/4, hai cột bên = 1/4 mỗi cái. Tổng 4 phần = container width.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-10',
    type: 'mcq',
    question: 'Một database có bảng "Students" với cột "id" (Primary Key) và "name". Câu lệnh SQL nào đúng để lấy danh sách tất cả học sinh?',
    options: ['SELECT * FROM Students', 'SELECT name FROM Students', 'SELECT id, name FROM Students', 'Tất cả đều đúng tùy mục đích'],
    correctAnswer: 3,
    explanation: 'SELECT * lấy tất cả columns. SELECT name chỉ lấy column name. SELECT id, name rõ ràng hơn, tránh lấy dư. Chọn tùy nhu cầu.',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },

  // ========== MORE T/F TO REACH 60 GROUPS ==========
  // T/F Group 16: Career & Industry
  {
    id: 'q-tf-cs-1',
    type: 'true-false',
    question: 'Ngành Khoa học Máy tính (CS) và Công nghệ Thông tin (ICT) có nội dung và định hướng nghề nghiệp khác nhau.',
    statements: [
      'CS tập trung vào lý thuyết, thuật toán và phát triển phần mềm nâng cao.',
      'ICT tập trung vào ứng dụng công nghệ, kết nối hệ thống và giải pháp doanh nghiệp.',
      'Sinh viên CS có thể làm việc trong ICT và ngược lại.',
      'CS và ICT hoàn toàn giống nhau, chỉ khác tên gọi.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'CS và ICT là hai ngành liên quan nhưng khác nhau. Tuy nhiên, kiến thức chồng lấn và có thể chuyển đổi.',
    difficulty: 'easy',
    topic: 'hướng-nghiệp'
  },
  {
    id: 'q-tf-cs-2',
    type: 'true-false',
    question: 'Kỹ sư phần mềm cần nhiều kỹ năng hơn là chỉ biết lập trình.',
    statements: [
      'Kỹ năng giao tiếp và làm việc nhóm rất quan trọng trong phát triển phần mềm.',
      'Hiểu biết về quy trình phát triển phần mềm (SDLC) giúp làm việc hiệu quả hơn.',
      'Chỉ cần lập trình giỏi là đủ để trở thành kỹ sư phần mềm xuất sắc.',
      'Kiến thức về testing và quality assurance là thiết yếu.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Software engineering = kết hợp kỹ năng kỹ thuật và soft skills. Testing/QA là phần quan trọng để đảm bảo chất lượng.',
    difficulty: 'easy',
    topic: 'hướng-nghiệp'
  },

  // T/F Group 17: More Ethics & Society
  {
    id: 'q-tf-ethics-1',
    type: 'true-false',
    question: 'Bias trong AI là vấn đề nghiêm trọng vì AI học từ dữ liệu có sẵn bias.',
    statements: [
      'Nếu training data thiên lệch, model AI sẽ phản ánh và thậm chí khuếch đại bias đó.',
      'AI hiring tools đã được chứng minh là có bias giới tính và chủng tộc trong một số trường hợp.',
      'Bias trong AI chỉ là vấn đề lý thuyết, không ảnh hưởng thực tế.',
      'Giải pháp cho bias AI bao gồm đa dạng hóa data và kiểm tra công bằng thường xuyên.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'AI bias có impact thực tế: hiring, lending, facial recognition đều có case study. Cần technical và policy solutions.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-ethics-2',
    type: 'true-false',
    question: 'Sở hữu trí tuệ và bản quyền là vấn đề quan trọng trong thời đại số.',
    statements: [
      'Copyright bảo vệ tác phẩm gốc nhưng không bảo vệ ý tưởng.',
      'Open source software có thể được sử dụng và sửa đổi theo license của nó.',
      'Mọi nội dung trên internet đều miễn phí và không có bản quyền.',
      'Plagiarism (đạo văn) là vi phạm đạo đức và có thể vi phạm pháp luật.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Copyright bảo vệ expression không phải idea. Internet content có copyright. Plagiarism vi phạm academic integrity và có thể legal consequences.',
    difficulty: 'medium',
    topic: 'đạo-đức-số'
  },

  // T/F Group 18: HTML/CSS Frameworks
  {
    id: 'q-tf-fw-1',
    type: 'true-false',
    question: 'CSS Framework giúp tăng tốc phát triển web nhưng cũng có nhược điểm.',
    statements: [
      'Bootstrap và Tailwind CSS là các CSS framework phổ biến.',
      'Framework giúp đảm bảo consistency và responsive mà không cần viết CSS từ đầu.',
      'Dùng framework luôn tốt hơn viết CSS thuần vì code nhẹ hơn.',
      'Mỗi framework có philosophy khác nhau: Bootstrap là component-based, Tailwind là utility-first.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Framework có overhead (nhiều code không dùng) và có thể hard to customize. Chọn tool phù hợp với project.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // T/F Group 19: Network Security
  {
    id: 'q-tf-sec-1',
    type: 'true-false',
    question: 'Bảo mật web đòi hỏi nhiều lớp phòng thủ (defense in depth).',
    statements: [
      'Input validation ở client-side có thể bị bypass, cần validate ở server-side.',
      'HTTPS không đảm bảo website an toàn 100% khỏi mọi tấn công.',
      'SQL injection có thể được ngăn chặn bằng parameterized queries.',
      'Mật khẩu chỉ cần hash một lần là đủ bảo mật, không cần salt.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Password cần salt (random data) trước khi hash để ngăn rainbow table attacks. Hash + salt + pepper là best practice.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-sec-2',
    type: 'true-false',
    question: 'XSS (Cross-Site Scripting) là lỗ hổng bảo mật phổ biến trên web.',
    statements: [
      'XSS cho phép kẻ tấn công inject malicious script vào trang web.',
      'Reflected XSS xảy ra khi script được reflected từ HTTP request.',
      'Content Security Policy (CSP) có thể ngăn chặn nhiều loại XSS.',
      'XSS chỉ nguy hiểm nếu website có thông tin nhạy cảm, không nguy hiểm cho website thường.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'XSS nguy hiểm cho mọi website vì có thể steal cookies, session, redirect users, deface pages. CSP là một trong nhiều mitigation.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },

  // T/F Group 20: Data Analysis
  {
    id: 'q-tf-analytics-1',
    type: 'true-false',
    question: 'Data Analysis và Business Intelligence giúp tổ chức đưa ra quyết định dựa trên dữ liệu.',
    statements: [
      'Dashboard trực quan hóa dữ liệu giúp stakeholders hiểu nhanh.',
      'Predictive analytics sử dụng ML để dự đoán xu hướng tương lai.',
      'Data analysis chỉ dành cho doanh nghiệp lớn vì cần nhiều data.',
      'Data cleaning là bước quan trọng vì dữ liệu dirty (trùng lặp, thiếu) làm phân tích sai.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Data analysis có thể dùng cho business nhỏ, NGO, cá nhân. Dirty data → wrong insights. Cleaning thường tốn 60-80% thời gian.',
    difficulty: 'medium',
    topic: 'data-io'
  },

  // ========== MORE T/F GROUPS - FINAL PUSH TO 60 ==========
  // T/F Group 21: AI Ethics
  {
    id: 'q-tf-ai-ethics-1',
    type: 'true-false',
    question: 'Đạo đức AI là lĩnh vực quan trọng để đảm bảo AI phát triển có trách nhiệm.',
    statements: [
      'AI có thể được dùng cho cả mục đích tốt và xấu, phụ thuộc vào người thiết kế.',
      'Transparency trong AI决策 (decision) quan trọng để users hiểu tại sao AI đưa ra kết quả.',
      'AI không cần đạo đức vì máy móc không có cảm xúc.',
      'Regulation và governance framework đang được phát triển cho AI.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'AI đặt ra câu hỏi về trách nhiệm, công bằng, privacy. Đạo đức AI là interdisciplinary field kết hợp CS, philosophy, law.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },

  // T/F Group 22: Web Development
  {
    id: 'q-tf-webdev-1',
    type: 'true-false',
    question: 'Web development hiện đại sử dụng nhiều công nghệ và frameworks.',
    statements: [
      'Frontend frameworks như React, Vue giúp xây dựng giao diện phức tạp dễ dàng hơn.',
      'Backend có thể dùng Node.js, Python (Django/Flask), hoặc Java (Spring).',
      'API (REST, GraphQL) là cách phổ biến để frontend giao tiếp với backend.',
      'Không cần biết JavaScript để làm web developer hiện đại vì có nhiều tool no-code.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'JavaScript vẫn là ngôn ngữ lập trình web cốt lõi. Dù có frameworks và tools, JS fundamentals vẫn cần thiết.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // T/F Group 23: Algorithm Analysis
  {
    id: 'q-tf-algo-1',
    type: 'true-false',
    question: 'Việc phân tích độ phức tạp thuật toán giúp chọn giải pháp hiệu quả.',
    statements: [
      'Time complexity đo lường thời gian thực thi theo kích thước input.',
      'Space complexity đo lường bộ nhớ thuật toán sử dụng.',
      'Thuật toán có độ phức tạp O(n!) luôn luôn chậm hơn O(2^n).',
      'Độ phức tạp chỉ quan trọng cho input lớn, với input nhỏ không cần quan tâm.'
    ],
    correctAnswer: [true, true, false, false],
    explanation: 'O(n!) vs O(2^n): với n nhỏ có thể khác. O(n!) 839M ops vs O(2^n) 256M ops khi n=10. Với n=20: O(n!) rất lớn, nhưng relationship phức tạp hơn. Độ phức tạp quan trọng cho mọi input size - nó định nghĩa scalability.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },

  // T/F Group 24: More Network
  {
    id: 'q-tf-net-1',
    type: 'true-false',
    question: 'Các giao thức mạng hoạt động theo mô hình phân lớp.',
    statements: [
      'Mỗi tầng trong mô hình OSI/TCP-IP có trách nhiệm và chức năng riêng.',
      'Router hoạt động ở tầng Network (L3) trong mô hình OSI.',
      'Switch thường hoạt động ở tầng Data Link (L2), nhưng có thể hoạt động ở L3.',
      'Các tầng không cần giao tiếp với tầng liền kề, có thể skip tầng.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Layer N chỉ giao tiếp với Layer N-1 (down) và Layer N+1 (up). Đây là nguyên tắc cơ bản của layered architecture.',
    difficulty: 'hard',
    topic: 'mạng-máy-tính'
  },

  // T/F Group 25: More Hardware
  {
    id: 'q-tf-hw-1',
    type: 'true-false',
    question: 'GPU và CPU có kiến trúc và mục đích sử dụng khác nhau.',
    statements: [
      'CPU có ít core nhưng mạnh, phù hợp cho sequential tasks.',
      'GPU có hàng ngàn core nhỏ, phù hợp cho parallel computation như deep learning.',
      'GPU có thể thay thế CPU hoàn toàn trong mọi tác vụ.',
      'Cả CPU và GPU đều là chip xử lý nhưng tối ưu cho different workloads.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'GPU không thể thay thế CPU vì không có single-thread performance tốt. GPU dùng cho parallel tasks: ML training, gaming physics, video rendering.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },

  // T/F Group 26: Cloud & Distributed Systems
  {
    id: 'q-tf-cloud-1',
    type: 'true-false',
    question: 'Cloud computing đã thay đổi cách doanh nghiệp triển khai và quản lý hệ thống.',
    statements: [
      'Cloud cho phép scale up/down tài nguyên theo nhu cầu (elasticity).',
      'Serverless computing (FaaS) cho phép chạy code mà không cần quản lý server.',
      'Cloud chỉ phù hợp cho startup, doanh nghiệp lớn nên dùng on-premise.',
      'Multi-cloud và hybrid cloud đang trở nên phổ biến để tránh vendor lock-in.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Doanh nghiệp lớn cũng dùng cloud (enterprise cloud). Hybrid cloud kết hợp on-premise và cloud để optimize cost và compliance.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },

  // T/F Group 27: Mobile & Responsive
  {
    id: 'q-tf-mobile-1',
    type: 'true-false',
    question: 'Mobile-first design là phương pháp thiết kế hiệu quả cho web hiện đại.',
    statements: [
      'Mobile-first nghĩa là thiết kế cho màn hình nhỏ trước, rồi mở rộng lên.',
      'Touch targets cần đủ lớn (tối thiểu 44x44 pixels theo Apple HIG) để dễ bấm.',
      'Progressive Web App (PWA) mang lại trải nghiệm app-like trên mobile browser.',
      'Mobile-first chỉ áp dụng cho app, không áp dụng cho website.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Mobile-first áp dụng cho cả app và web. Ngày càng nhiều users dùng mobile primary, nên mobile-first là best practice.',
    difficulty: 'medium',
    topic: 'html-css'
  },

  // T/F Group 28: Database Deep Dive
  {
    id: 'q-tf-db-1',
    type: 'true-false',
    question: 'Thiết kế database quan trọng ảnh hưởng đến performance và integrity.',
    statements: [
      'Normalization giảm redundancy và ngăn ngừa anomalies.',
      'Denormalization có thể cải thiện read performance nhưng tăng complexity.',
      'Database indexing giúp tăng tốc truy vấn nhưng tốn thêm storage.',
      'Không cần quan tâm đến thiết kế vì database engine sẽ tối ưu tự động.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'DB engine không phép biết business rules. Good design = performance + integrity. Bad design = anomalies, deadlocks, scaling issues.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },

  // T/F Group 29: Testing & QA
  {
    id: 'q-tf-qa-1',
    type: 'true-false',
    question: 'Testing là phần không thể thiếu trong phát triển phần mềm.',
    statements: [
      'Unit test kiểm tra từng component nhỏ của code.',
      'Integration test kiểm tra các component làm việc cùng nhau.',
      'Manual testing không cần thiết vì automated testing đã đủ.',
      'Test-Driven Development (TDD) viết test trước khi viết code.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Cả manual và automated testing đều cần. Exploratory testing cần con người. TDD giúp define requirements rõ ràng và regression testing.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },

  // T/F Group 30: Privacy & Security
  {
    id: 'q-tf-priv-1',
    type: 'true-false',
    question: 'Privacy và Security là hai khái niệm liên quan nhưng khác nhau.',
    statements: [
      'Security bảo vệ dữ liệu khỏi unauthorized access (bảo mật).',
      'Privacy kiểm soát ai có thể thu thập và sử dụng dữ liệu của mình.',
      'Một hệ thống có thể secure nhưng không private.',
      'Encryption là đủ để đảm bảo cả privacy và security.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Encryption bảo vệ data in transit/at rest. Nhưng metadata (ai giao tiếp ai, khi nào) có thể leak info. Privacy cần thêm policies và access controls.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },

  // T/F Group 31: DevOps & Deployment
  {
    id: 'q-tf-devops-1',
    type: 'true-false',
    question: 'DevOps practice giúp tăng tốc và cải thiện chất lượng phát triển phần mềm.',
    statements: [
      'CI/CD (Continuous Integration/Deployment) tự động hóa việc build và deploy.',
      'Infrastructure as Code (IaC) quản lý infra bằng code thay vì manual configuration.',
      'DevOps chỉ dành cho large tech companies, không phù hợp cho small teams.',
      'Containerization (Docker, Kubernetes) giúp consistent deployment across environments.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'DevOps culture và practices có thể adapt cho any size team. Small teams càng cần automation để scale.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },

  // T/F Group 32: AI Applications
  {
    id: 'q-tf-ai-app-1',
    type: 'true-false',
    question: 'AI có nhiều ứng dụng thực tế trong đời sống hàng ngày.',
    statements: [
      'Recommender system (YouTube, Netflix) dùng AI để gợi ý nội dung personalized.',
      'Spam filter sử dụng ML để phân loại email spam.',
      'AI chỉ được dùng trong các sản phẩm công nghệ cao, không trong sinh hoạt thường ngày.',
      'Voice assistants (Siri, Alexa) dùng NLP và speech recognition.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'AI đã embedded trong daily life: Google Maps, autocorrect, smart home devices, navigation. Not just high-tech products.',
    difficulty: 'easy',
    topic: 'ai-ml'
  },

  // ========== FINAL T/F GROUPS TO REACH 60 TOTAL ==========
  // Currently we have: 2 (AI) + 2 (Mang) + 2 (Dao) + 2 (HTML) + 2 (KT) + 1 (TT) = 11 original
  // + 3 (Data) + 2 (Huongnghiep) + 1 (Sim) + 3 (AI more) + 3 (Mang more) + 2 (HTML more) + 2 (KT more) + 3 (TT more) + 2 (Dao more) + 2 (CS) + 2 (Ethics) + 1 (FW) + 2 (Sec) + 1 (Analytics) + 1 (AI Ethics) + 1 (WebDev) + 1 (Algo) + 1 (Net) + 1 (HW) + 1 (Cloud) + 1 (Mobile) + 1 (DB) + 1 (QA) + 1 (Priv) + 1 (DevOps) + 1 (AI App)
  // Let me count: original 11 + new groups added = we need ~49 more groups
  
  // T/F Group 33-60: Additional groups
  {
    id: 'q-tf-career-1',
    type: 'true-false',
    question: 'Học lập trình ở trường phổ thông là nền tảng cho nhiều ngành nghề.',
    statements: [
      'Lập trình giúp rèn luyện tư duy logic và giải quyết vấn đề.',
      'Không cần học lập trình nếu muốn theo ngành non-CS.',
      'Programming skill hữu ích trong nhiều ngành: tài chính, y tế, giáo dục.',
      'Chỉ có người muốn trở thành developer mới cần học lập trình.'
    ],
    correctAnswer: [true, false, true, false],
    explanation: 'Computational thinking có giá trị cho mọi ngành. Ngay cả manager, marketer cũng benefit từ hiểu cách software works.',
    difficulty: 'easy',
    topic: 'hướng-nghiệp'
  },
  {
    id: 'q-tf-data-4',
    type: 'true-false',
    question: 'Data quality là yếu tố quyết định thành công của dự án phân tích dữ liệu.',
    statements: [
      'Data cleaning chiếm 60-80% thời gian trong các dự án data.',
      'Missing values và duplicates là các vấn đề data quality phổ biến.',
      'Data quality không quan trọng vì ML model có thể tự học.',
      'Data governance giúp đảm bảo quality và compliance.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Garbage in = garbage out. ML model chỉ tốt như data nó được train trên. Data governance là framework để manage data assets.',
    difficulty: 'medium',
    topic: 'data-io'
  },
  {
    id: 'q-tf-cloud-2',
    type: 'true-false',
    question: 'Cloud services được phân loại theo mô hình cung cấp tài nguyên.',
    statements: [
      'IaaS cung cấp virtual machines và storage như dịch vụ.',
      'PaaS cung cấp platform để phát triển và deploy ứng dụng.',
      'SaaS cung cấp ứng dụng hoàn chỉnh qua internet như Gmail, Dropbox.',
      'Function as a Service (FaaS/serverless) chỉ là một loại của PaaS.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'FaaS là compute model tách biệt, thường được phân loại riêng. AWS Lambda, Azure Functions là FaaS.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-security-3',
    type: 'true-false',
    question: 'Bảo mật ứng dụng web đòi hỏi hiểu các lỗ hổng phổ biến và cách phòng tránh.',
    statements: [
      'OWASP Top 10 liệt kê các lỗ hổng bảo mật web phổ biến nhất.',
      'Input sanitization và parameterized queries ngăn SQL injection.',
      'HTTPS không ngăn chặn XSS attacks.',
      'Security testing chỉ cần làm một lần khi launch product.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Security cần continuous testing. New vulnerabilities discovered regularly. Pentest, vulnerability scanning là ongoing activities.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-web-2',
    type: 'true-false',
    question: 'Performance optimization là quan trọng để tạo trải nghiệm người dùng tốt.',
    statements: [
      'Minification và compression giảm kích thước file CSS/JS.',
      'Lazy loading chỉ tải images khi cần, cải thiện initial load time.',
      'Website performance không ảnh hưởng đến SEO ranking.',
      'CDN giúp serve content nhanh hơn bằng cách distribute assets gần users.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Core Web Vitals (LCP, FID, CLS) là Google ranking factors. Performance直接影响 user experience và conversion rates.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-tf-algo-2',
    type: 'true-false',
    question: 'Cấu trúc dữ liệu nào phù hợp cho bài toán nào là kiến thức quan trọng.',
    statements: [
      'Hash table cho phép tra cứu O(1) trong hầu hết trường hợp.',
      'Binary Search Tree (BST) duy trì thứ tự và cho phép search, insert, delete hiệu quả.',
      'Array luôn là lựa chọn tốt nhất cho mọi bài toán.',
      'Heap được dùng cho priority queue và sorting.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Array có limitation: insert/delete O(n). Tree, Hash, Heap đều có trade-offs. Chọn đúng DS phụ thuộc vào bài toán.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-network-2',
    type: 'true-false',
    question: 'Network troubleshooting đòi hỏi hiểu cách các tầng mạng tương tác.',
    statements: [
      'Ping kiểm tra connectivity ở tầng Network.',
      'Traceroute cho thấy path数据包 đi qua các hops.',
      'Nếu không ping được gateway, vấn đề có thể ở tầng Application.',
      'Port scanning có thể dùng để kiểm tra service availability.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Cannot ping gateway = network layer problem, not application. Traceroute dùng ICMP/UDP packets để trace path.',
    difficulty: 'hard',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-arch-1',
    type: 'true-false',
    question: 'Software architecture patterns giúp tổ chức code và hệ thống hiệu quả.',
    statements: [
      'MVC (Model-View-Controller) tách biệt data, presentation và logic.',
      'Microservices chia ứng dụng thành các services nhỏ, độc lập.',
      'Monolithic architecture luôn là lựa chọn tốt nhất.',
      'Serverless architecture phù hợp cho event-driven workloads.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Monolithic OK cho MVP nhưng khó scale. Microservices add complexity nhưng benefits cho large systems.',
    difficulty: 'hard',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-mobile-2',
    type: 'true-false',
    question: 'Mobile app development có nhiều cách tiếp cận với ưu/nhược điểm khác nhau.',
    statements: [
      'Native app (Swift/Kotlin) cho performance và UX tốt nhất.',
      'Cross-platform (React Native, Flutter) tiết kiệm thời gian nhưng có trade-offs.',
      'PWA cung cấp trải nghiệm app-like qua browser.',
      'Chỉ cần phát triển cho iOS vì Android chiếm thị phần nhỏ.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Android global market share > 70%. Cần develop cho cả hai platforms hoặc cross-platform solution.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-tf-ai-6',
    type: 'true-false',
    question: 'Transfer Learning và Fine-tuning là các kỹ thuật quan trọng trong Deep Learning.',
    statements: [
      'Transfer Learning cho phép dùng pre-trained model cho task mới.',
      'Fine-tuning thường done bằng cách train thêm một số layers cuối.',
      'Transfer Learning chỉ hoạt động với cùng loại data (image→image, text→text).',
      'Pre-trained models như BERT, ResNet có thể tải và use miễn phí.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Transfer learning có thể cross-domain: image models pretrained on ImageNet có thể adapt cho medical imaging.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },
  {
    id: 'q-tf-data-5',
    type: 'true-false',
    question: 'ETL (Extract-Transform-Load) là quy trình quan trọng trong Data Engineering.',
    statements: [
      'Extract: lấy data từ various sources (databases, APIs, files).',
      'Transform: làm sạch, reshape data thành unified format.',
      'Load: đưa data vào destination (data warehouse, data lake).',
      'ETL chỉ dùng cho batch processing, không thể real-time.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'ELT (Cloud-native) và streaming ETL (Kafka, Flink) cho real-time. Traditional ETL thường batch nhưng concept tương tự.',
    difficulty: 'hard',
    topic: 'data-io'
  },
  {
    id: 'q-tf-ethics-3',
    type: 'true-false',
    question: 'Accessibility (WCAG) là tiêu chuẩn quan trọng trong phát triển web.',
    statements: [
      'Alt text cho images giúp người dùng screen reader hiểu nội dung.',
      'Keyboard navigation đảm bảo người không dùng chuột vẫn truy cập được.',
      'Accessibility chỉ cần cho government websites, không bắt buộc cho business.',
      'Color contrast ratio cần đạt tối thiểu 4.5:1 cho text thường.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Many jurisdictions have accessibility laws (ADA, EU EAA). Good accessibility = good UX for everyone.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-tf-infra-1',
    type: 'true-false',
    question: 'Virtualization và Containerization là các công nghệ quan trọng trong IT.',
    statements: [
      'Virtual Machine (VM) cho phép chạy multiple OS trên một server.',
      'Container (Docker) nhẹ hơn VM vì share OS kernel.',
      'Container không thể chạy trên VM.',
      'Both technologies help với resource utilization và deployment efficiency.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Containers có thể và thường chạy trong VMs (VD: Docker Desktop trên Windows/Mac dùng Linux VM). Đây là common pattern.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-comp-1',
    type: 'true-false',
    question: 'Compilers và Interpreters là hai cách thực thi code khác nhau.',
    statements: [
      'Compiler dịch toàn bộ source code thành machine code trước khi chạy.',
      'Interpreter dịch và thực thi code từng dòng một.',
      'Python thường dùng interpreter, C/C++ dùng compiler.',
      'Compiled code luôn chạy nhanh hơn interpreted code.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Compiled có thể optimize nhưng interpreted có benefits (flexibility, dynamic typing). JIT compilers (Java, C#) combine both.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-soft-1',
    type: 'true-false',
    question: 'Agile là phương pháp phát triển phần mềm phổ biến với các giá trị cốt lõi.',
    statements: [
      'Agile emphasize iterative development và adaptability.',
      'Scrum và Kanban là các frameworks phổ biến trong Agile.',
      'Agile chỉ áp dụng cho development teams, không cho other functions.',
      'Agile manifesto có 4 values và 12 principles.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Agile principles apply beyond dev: product, marketing, operations. Scrumban, Scrumban, SAFe là variants.',
    difficulty: 'medium',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-api-1',
    type: 'true-false',
    question: 'API (Application Programming Interface) là cách các phần mềm giao tiếp.',
    statements: [
      'REST là kiến trúc phổ biến nhất cho web APIs.',
      'API cần có documentation rõ ràng để developers integrate.',
      'GraphQL cho phép clients request exactly data they need.',
      'APIs không cần authentication vì đã nằm trong internal network.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Internal APIs cũng cần auth: API keys, OAuth, JWT để track usage và prevent abuse.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-ml-1',
    type: 'true-false',
    question: 'Feature Engineering là bước quan trọng trong Machine Learning pipeline.',
    statements: [
      'Feature engineering tạo input variables tốt hơn từ raw data.',
      'One-hot encoding chuyển categorical variables thành numerical.',
      'Feature scaling normalize ranges giữa different features.',
      'Feature engineering không quan trọng vì deep learning tự extract features.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Deep learning tự học features nhưng feature engineering vẫn quan trọng cho traditional ML và giúp deep learning converge nhanh hơn.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },
  {
    id: 'q-tf-logic-1',
    type: 'true-false',
    question: 'Boolean logic là nền tảng của lập trình và mạch số.',
    statements: [
      'AND, OR, NOT là các phép toán Boolean cơ bản.',
      'Logic gates (AND, OR, NOT) là building blocks của digital circuits.',
      'De Morgan\'s law cho phép đổi AND thành OR và ngược lại với NOT.',
      'Boolean logic không liên quan đến SQL queries.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'SQL WHERE clause dùng Boolean logic: WHERE status = "active" AND role = "admin".',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-dp-1',
    type: 'true-false',
    question: 'Dynamic Programming là kỹ thuật tối ưu hóa bằng cách lưu kết quả subproblems.',
    statements: [
      'DP dùng memoization hoặc tabulation để tránh tính lại subproblems.',
      'DP chỉ áp dụng cho bài toán có optimal substructure.',
      'Fibonacci với DP có độ phức tạp O(n) thay vì O(2^n).',
      'DP luôn tốt hơn greedy algorithm cho mọi bài toán.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Greedy tốt hơn khi problem có greedy-choice property và optimal substructure without overlapping subproblems. DP vs Greedy tùy problem.',
    difficulty: 'hard',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-git-1',
    type: 'true-false',
    question: 'Git là hệ thống quản lý phiên bản phổ biến trong phát triển phần mềm.',
    statements: [
      'Git lưu trữ toàn bộ repository history trên local machine.',
      'Branch cho phép làm việc trên features mới mà không ảnh hưởng main code.',
      'Merge kết hợp changes từ different branches.',
      'GitHub là một trong nhiều hosting services cho Git repositories.'
    ],
    correctAnswer: [true, true, true, true],
    explanation: 'Git is distributed VCS. GitHub, GitLab, Bitbucket là cloud hosting platforms. Git commands: add, commit, push, pull, merge, rebase.',
    difficulty: 'easy',
    topic: 'kiến-trúc-máy-tính'
  },
  {
    id: 'q-tf-design-1',
    type: 'true-false',
    question: 'UI/UX design principles giúp tạo sản phẩm số thân thiện với người dùng.',
    statements: [
      'Consistency trong design giúp users predict được behavior.',
      'Visual hierarchy dẫn dắt users attention đến important elements.',
      'Wireframing và prototyping là bước early trong design process.',
      'Design không cần thiết cho developer, chỉ cần cho designer.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Developers cần understand design principles để implement better UIs và collaborate hiệu quả với designers.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-tf-protocol-1',
    type: 'true-false',
    question: 'Các giao thức mạng khác nhau phục vụ different purposes.',
    statements: [
      'HTTP/HTTPS dùng cho web traffic (port 80/443).',
      'FTP dùng cho file transfer (ports 20/21).',
      'SMTP/POP3/IMAP dùng cho email.',
      ' Semua giao thức trên đều hoạt động ở cùng port 80 để simplify firewall config.'
    ],
    correctAnswer: [true, true, true, false],
    explanation: 'Mỗi protocol có default ports riêng. Firewall có thể allow/deny traffic based on port numbers. Dùng well-known ports cho interoperability.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-tf-crypto-1',
    type: 'true-false',
    question: 'Mật mã học (Cryptography) bảo vệ thông tin trong môi trường số.',
    statements: [
      'Symmetric encryption dùng cùng key cho encrypt và decrypt.',
      'Asymmetric encryption dùng public key để encrypt, private key để decrypt.',
      'Hash function là reversible - có thể khôi phục original input từ hash.',
      'Digital signature đảm bảo authenticity và integrity của digital documents.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Hash functions là one-way. SHA-256 cannot be reversed. Digital signature uses asymmetric cryptography: sign with private key, verify with public key.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-tf-testing-2',
    type: 'true-false',
    question: 'Automated testing giúp tăng chất lượng và tốc độ phát triển phần mềm.',
    statements: [
      'Unit tests verify behavior của individual functions/classes.',
      'Integration tests verify interactions giữa multiple components.',
      'Test coverage 100% đảm bảo không có bugs trong production.',
      'CI pipeline chạy tests tự động mỗi khi có code changes.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: '100% coverage không guarantee bug-free. Tests có thể miss edge cases. Coverage là metric, không phải goal.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-tf-debug-1',
    type: 'true-false',
    question: 'Debugging là kỹ năng quan trọng giúp developers fix issues hiệu quả.',
    statements: [
      'Binary search debugging: chia đôi code để tìm bug location.',
      'Logging giúp track execution flow và identify where things go wrong.',
      'Bug không cần fix ngay vì có thể tự biến mất.',
      'Reproducing bug là bước đầu tiên của debugging process.'
    ],
    correctAnswer: [true, true, false, true],
    explanation: 'Bugs don\'t fix themselves. Reproduce → isolate → fix → verify là standard debugging workflow.',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },

  // ========== SCENARIO/CODE READING QUESTIONS (Extended to 20+) ==========
  {
    id: 'q-scenario-11',
    type: 'mcq',
    question: 'Một developer viết đoạn CSS: .card { margin: 10px; padding: 20px; border: 1px solid #ccc; }. Sau đó thêm .card h2 { color: blue; }. Phong cách nào được áp dụng cho thẻ h2 bên trong .card?',
    options: ['Descendant selector (chọn h2 là con/cháu của .card)', 'Child selector (chỉ chọn h2 là con trực tiếp)', 'Adjacent sibling selector', 'Pseudo-class selector'],
    correctAnswer: 0,
    explanation: '.card h2 là descendant selector - chọn tất cả h2 nằm trong .card, không cần là con trực tiếp. Dấu cách (space) là combinator cho descendant.',
    difficulty: 'medium',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-12',
    type: 'mcq',
    question: 'Một trang web thương mại điện tử lưu trữ mật khẩu người dùng dạng plain text. Sau đó database bị truy cập trái phép. Lỗ hổng bảo mật chính là gì?',
    options: ['SQL Injection', 'Không mã hóa mật khẩu (plain text storage)', 'XSS reflected', 'Man-in-the-middle attack'],
    correctAnswer: 1,
    explanation: 'Lưu plain text = không có hashing. Attacker đọc trực tiếp được passwords. Cần hash với salt (bcrypt, argon2) để bảo vệ.',
    difficulty: 'medium',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-scenario-13',
    type: 'mcq',
    question: 'Code Python:\n\ndef find_max(nums):\n    max_num = nums[0]\n    for num in nums:\n        if num > max_num:\n            max_num = num\n    return max_num\n\nfind_max([3, 1, 4, 1, 5, 9, 2, 6])\n\nKết quả trả về là?',
    options: ['3', '5', '9', '6'],
    correctAnswer: 2,
    explanation: 'Thuật toán linear scan tìm max. Đi qua tất cả phần tử, so sánh và cập nhật max_num. Kết quả = 9 (số lớn nhất trong mảng).',
    difficulty: 'easy',
    topic: 'thuật-toán'
  },
  {
    id: 'q-scenario-14',
    type: 'mcq',
    question: 'HTML snippet: <nav><a href="/">Home</a><a href="/about">About</a></nav>. Selector nav a:hover { color: red; } có tác dụng gì?',
    options: ['Đổi màu link khi click', 'Đổi màu link khi hover chuột', 'Đổi màu link đã visited', 'Tạo animation cho link'],
    correctAnswer: 1,
    explanation: ':hover là pseudo-class, kích hoạt khi người dùng hover (di chuột qua) phần tử. Đoạn CSS này đổi màu thành đỏ khi hover.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-15',
    type: 'mcq',
    question: 'Một công ty triển khai hệ thống AI tuyển dụng và sau đó phát hiện AI bias: hệ thống ưu tiên ứng viên nam cho vị trí kỹ thuật. Nguyên nhân có thể là?',
    options: ['Training data chứa historical bias (thiên lệch lịch sử)', 'Thuật toán AI bị lỗi phần cứng', 'Tất cả ứng viên nữ đều không đủ điều kiện', 'AI không thể có bias vì nó là máy'],
    correctAnswer: 0,
    explanation: 'AI học từ dữ liệu quá khứ. Nếu hiring data bias (ưu tiên nam), AI sẽ replicate và amplify bias đó. Cần bias detection và data diversification.',
    difficulty: 'medium',
    topic: 'ai-ml'
  },
  {
    id: 'q-scenario-16',
    type: 'mcq',
    question: 'CSS: body { font-family: Arial; } .container { max-width: 1200px; margin: 0 auto; } Đoạn CSS này thực hiện điều gì?',
    options: ['Set font Arial cho body và căn giữa .container với max-width 1200px', 'Chỉ set font Arial', 'Căn trái .container', 'Tạo animation cho container'],
    correctAnswer: 0,
    explanation: 'margin: 0 auto là centering trick - auto margin left/right chia đều, đẩy container vào giữa. max-width: 1200px giới hạn chiều rộng tối đa.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-17',
    type: 'mcq',
    question: 'Một router có cấu hình: Interface LAN: 192.168.1.1/24. Máy tính A có IP 192.168.1.50. Máy tính B có IP 192.168.2.100. Hai máy này có thể giao tiếp trực tiếp không?',
    options: ['Có, vì cùng LAN', 'Không, vì khác subnet (192.168.1 vs 192.168.2)', 'Có, nếu bật firewall', 'Có, nếu dùng switch'],
    correctAnswer: 1,
    explanation: '192.168.1.50/24 có netmask 255.255.255.0, network = 192.168.1.0. 192.168.2.100 thuộc network 192.168.2.0. Khác subnet → cần router để route.',
    difficulty: 'medium',
    topic: 'mạng-máy-tính'
  },
  {
    id: 'q-scenario-18',
    type: 'mcq',
    question: 'JavaScript code:\n\nconst arr = [1, 2, 3, 4, 5];\nconst result = arr.filter(x => x % 2 === 0).map(x => x * 2);\nconsole.log(result);\n\nOutput là gì?',
    options: ['[2, 4, 6, 8, 10]', '[4, 8]', '[false, true, false, true, false]', '[1, 2, 3, 4, 5]'],
    correctAnswer: 1,
    explanation: 'filter giữ các số chẵn: [2, 4]. map nhân đôi: [4, 8]. Chain operations: filter → map → [4, 8].',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-scenario-19',
    type: 'mcq',
    question: 'Một ứng dụng web sử dụng: user input → database query → display. Để ngăn SQL injection, developer nên dùng gì?',
    options: ['alert() để kiểm tra input', 'Prepared statements / Parameterized queries', 'eval() để parse input', 'innerHTML để hiển thị kết quả'],
    correctAnswer: 1,
    explanation: 'Prepared statements tách biệt code và data. User input được treat như data, không phải SQL command. Đây là primary defense contre SQL injection.',
    difficulty: 'hard',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-scenario-20',
    type: 'mcq',
    question: 'CSS Grid layout: .wrapper { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; } Đoạn CSS tạo layout gồm?',
    options: ['3 cột bằng nhau với gap 20px giữa các ô', '1 cột duy nhất', '3 hàng bằng nhau', 'Grid chỉ cho flex items'],
    correctAnswer: 0,
    explanation: 'repeat(3, 1fr) = 3 equal fraction columns. gap: 20px tạo khoảng cách 20px giữa rows và columns. 1fr = 1 phần của available space.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-21',
    type: 'mcq',
    question: 'Một website thu thập dữ liệu trẻ em dưới 13 tuổi mà không có sự đồng ý của phụ huynh. Điều này vi phạm luật nào?',
    options: ['Không vi phạm gì', 'COPPA (Children\'s Online Privacy Protection Act)', 'GDPR', 'Cả B và C'],
    correctAnswer: 3,
    explanation: 'COPPA (US) và GDPR (EU) đều yêu cầu parental consent để thu thập data của trẻ dưới 13 (COPPA) hoặc 16 (GDPR tùy country).',
    difficulty: 'medium',
    topic: 'đạo-đức-số'
  },
  {
    id: 'q-scenario-22',
    type: 'mcq',
    question: 'HTML: <img src="photo.jpg" alt="Con mèo đen" width="300" height="200">. Thuộc tính nào giúp screen reader hiểu nội dung ảnh?',
    options: ['src', 'width', 'alt', 'height'],
    correctAnswer: 2,
    explanation: 'alt (alternative text) mô tả nội dung ảnh cho người dùng screen reader. Đây là accessibility requirement, giúp blind users hiểu nội dung hình ảnh.',
    difficulty: 'easy',
    topic: 'html-css'
  },
  {
    id: 'q-scenario-23',
    type: 'mcq',
    question: 'Thuật toán: for i in range(n): for j in range(n): print(i, j). Độ phức tạp thời gian là?',
    options: ['O(n)', 'O(n²)', 'O(2n)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Nested loops: outer loop n times, inner loop n times per outer iteration. Total = n × n = n² operations. Độ phức tạp O(n²).',
    difficulty: 'medium',
    topic: 'thuật-toán'
  },
  {
    id: 'q-scenario-24',
    type: 'mcq',
    question: 'Một trường học triển khai AI grading system cho bài luận. System chấm dựa trên độ dài và số từ khóa. Đây là ví dụ của vấn đề gì trong AI?',
    options: ['Overfitting', 'Proxy metric không phản ánh chất lượng thật', 'Data leakage', 'Model collapse'],
    correctAnswer: 1,
    explanation: 'Độ dài và từ khóa là proxy metrics - không đo lường trực tiếp chất lượng bài luận (logic, sáng tạo, độ chính xác). AI cần measure what matters, not what is easy to measure.',
    difficulty: 'hard',
    topic: 'ai-ml'
  },
  {
    id: 'q-scenario-25',
    type: 'mcq',
    question: 'CSS: .parent { display: flex; flex-direction: column; align-items: center; } .child { margin-top: 10px; } Đoạn CSS này tạo layout như thế nào?',
    options: ['Flex container theo chiều dọc, các child căn giữa ngang', 'Flex container theo chiều ngang', 'Chỉ căn giữa child đầu tiên', 'Tạo grid layout'],
    correctAnswer: 0,
    explanation: 'flex-direction: column đặt children theo chiều dọc. align-items: center căn giữa theo cross axis (ngang). margin-top tạo khoảng cách vertical.',
    difficulty: 'easy',
    topic: 'html-css'
  }
];

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getQuestionsByDifficulty(difficulty: string): Question[] {
  return questions.filter(q => q.difficulty === difficulty);
}

export function getRandomQuestions(count: number, topic?: string): Question[] {
  const pool = topic ? getQuestionsByTopic(topic) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate exam question sets
export function generateExamSet(_examId: string): Question[] {
  // Get questions for an exam: 24 MCQ (40% easy, 40% medium, 20% hard)
  const easy = getQuestionsByDifficulty('easy').sort(() => Math.random() - 0.5).slice(0, 10);
  const medium = getQuestionsByDifficulty('medium').sort(() => Math.random() - 0.5).slice(0, 10);
  const hard = getQuestionsByDifficulty('hard').sort(() => Math.random() - 0.5).slice(0, 4);
  return [...easy.slice(0, 9), ...medium.slice(0, 9), ...hard.slice(0, 3), ...easy.slice(9), ...medium.slice(9)].slice(0, 24);
}

export function getDataIOQuestions(): Question[] {
  return questions.filter(q => q.topic === 'data-io');
}