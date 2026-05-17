// ==========================================
// Exams Seed Data - Tin12 Pro Cánh Diều
// 3 exams following TN THPT format
// ==========================================
import { Exam } from '@/lib/types';

export const exams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Đề thi thử số 1 - Tốt nghiệp THPT 2026',
    description: 'Đề thi thử theo cấu trúc chính thức: Part 1 (24 MCQ) + Part 2 (6 câu T/F, mỗi câu 4 mệnh đề). Thời gian 50 phút.',
    duration: 50,
    part1: {
      totalQuestions: 24,
      pointsEach: 0.25,
      questions: [
        {
          id: 'ex1-q1',
          question: 'Thành phần nào lưu trữ dữ liệu tạm thời khi máy tính đang chạy?',
          options: ['ROM', 'RAM', 'CPU', 'Ổ cứng'],
          correctAnswer: 1,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q2',
          question: 'CPU có chức năng gì?',
          options: ['Lưu trữ dữ liệu', 'Xử lý tính toán và điều khiển', 'Hiển thị kết quả', 'Nhận dữ liệu từ bàn phím'],
          correctAnswer: 1,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q3',
          question: '1 byte bằng bao nhiêu bit?',
          options: ['4', '8', '16', '1024'],
          correctAnswer: 1,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q4',
          question: 'Windows 11 là loại phần mềm nào?',
          options: ['Phần mềm ứng dụng', 'Phần mềm hệ thống', 'Phần cứng', 'Thiết bị ngoại vi'],
          correctAnswer: 1,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q5',
          question: 'AI hẹp (Narrow AI) là gì?',
          options: ['AI làm được mọi việc như con người', 'AI chỉ giỏi một việc cụ thể', 'AI có ý thức', 'Robot AI'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q6',
          question: 'Phân loại email spam là loại học máy nào?',
          options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Deep Learning'],
          correctAnswer: 0,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q7',
          question: 'Thuật toán nào dùng để phân nhóm khách hàng theo hành vi?',
          options: ['Spam detection', 'Customer clustering', 'Speech recognition', 'Face ID'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q8',
          question: 'Deep Learning khác Machine Learning ở điểm nào?',
          options: ['Dùng ít dữ liệu hơn', 'Cần ít compute hơn', 'Dùng nhiều lớp mạng neural', 'Không cần training data'],
          correctAnswer: 2,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q9',
          question: 'CNN thường dùng cho loại dữ liệu nào?',
          options: ['Văn bản', 'Âm thanh', 'Hình ảnh', 'Số liệu bảng'],
          correctAnswer: 2,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q10',
          question: 'Mạng LAN có đặc điểm gì?',
          options: ['Phạm vi toàn cầu', 'Trong một tòa nhà hoặc khuôn viên', 'Kết nối thiết bị cá nhân', 'Cần satellite'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q11',
          question: 'Thiết bị nào dùng để kết nối các máy trong cùng một mạng LAN?',
          options: ['Satellite', 'Router', 'Switch', 'Modem'],
          correctAnswer: 2,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q12',
          question: 'DNS có chức năng gì?',
          options: ['Mã hóa dữ liệu', 'Chuyển tên miền thành địa chỉ IP', 'Kết nối các mạng LAN', 'Tăng tốc độ máy tính'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q13',
          question: 'HTTPS khác HTTP ở điểm nào?',
          options: ['Nhanh hơn', 'Có mã hóa SSL/TLS', 'Chỉ dùng cho trang web', 'Dùng port 80'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q14',
          question: 'Giao thức TCP đảm bảo điều gì?',
          options: ['Tốc độ nhanh nhất', 'Dữ liệu đến đích đầy đủ và đúng thứ tự', 'Dữ liệu mã hóa', 'Không cần kết nối'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q15',
          question: 'Ransomware là gì?',
          options: ['Virus thu thập password', 'Mã độc mã hóa file và đòi tiền', 'Tool hack WiFi', 'Email lừa đảo'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q16',
          question: 'HTTPS bảo mật bằng cách nào?',
          options: ['Ẩn địa chỉ IP', 'Mã hóa dữ liệu với TLS/SSL', 'Ngăn chặn virus', 'Tăng tốc độ tải'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q17',
          question: 'Digital citizenship nghĩa là gì?',
          options: ['Có nhiều bạn online', 'Sử dụng công nghệ có trách nhiệm và an toàn', 'Có nhiều tài khoản mạng xã hội', 'Biết lập trình'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q18',
          question: 'Thẻ nào dùng để tạo tiêu đề lớn nhất?',
          options: ['<h6>', '<h1>', '<title>', '<header>'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q19',
          question: 'Thuộc tính nào cần có trong thẻ img để tăng accessibility?',
          options: ['src', 'href', 'alt', 'class'],
          correctAnswer: 2,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q20',
          question: 'Làm sao chọn tất cả thẻ p có class "text"?',
          options: ['p.text', 'p #text', '.text p', 'p, .text'],
          correctAnswer: 0,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q21',
          question: 'Padding khác margin chỗ nào?',
          options: ['Padding ngoài border, margin trong', 'Padding trong border, margin ngoài', 'Không khác nhau', 'Chỉ margin dùng cho flex'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q22',
          question: 'Thuật toán có đặc điểm gì?',
          options: ['Không có điểm kết thúc', 'Không cần input', 'Có thể diễn tả bằng ngôn ngữ tự nhiên', 'Chỉ chạy trên máy tính'],
          correctAnswer: 2,
          topic: 'thuật-toán',
          difficulty: 'easy'
        },
        {
          id: 'ex1-q23',
          question: 'Tìm kiếm nhị phân (binary search) cần điều kiện gì?',
          options: ['Mảng có thứ tự', 'Mảng ngẫu nhiên', 'Không cần điều kiện', 'Mảng có nhiều phần tử trùng lặp'],
          correctAnswer: 0,
          topic: 'thuật-toán',
          difficulty: 'medium'
        },
        {
          id: 'ex1-q24',
          question: 'Primary Key có đặc điểm gì?',
          options: ['Có thể trùng lặp', 'Giá trị duy nhất cho mỗi hàng', 'Có thể NULL', 'Chỉ là số'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'easy'
        }
      ]
    },
    part2: {
      totalQuestions: 6,
      pointsEach: 0.5,
      groups: [
        {
          id: 'ex1-tf-1',
          context: 'Về Trí tuệ Nhân tạo (AI)',
          statements: [
            { id: 's1', text: 'AI hiện tại là AI hẹp, chỉ giỏi một việc cụ thể.', isCorrect: true },
            { id: 's2', text: 'AGI (Artificial General Intelligence) vẫn chưa được phát triển thành công.', isCorrect: true },
            { id: 's3', text: 'AI có thể thay thế hoàn toàn con người trong mọi công việc.', isCorrect: false },
            { id: 's4', text: 'Machine Learning là một tập con của AI.', isCorrect: true }
          ]
        },
        {
          id: 'ex1-tf-2',
          context: 'Về mạng máy tính',
          statements: [
            { id: 's1', text: 'DNS chuyển đổi tên miền thành địa chỉ IP.', isCorrect: true },
            { id: 's2', text: 'TCP là giao thức tin cậy, đảm bảo dữ liệu đến đích.', isCorrect: true },
            { id: 's3', text: 'Router dùng để kết nối các máy trong cùng một mạng LAN.', isCorrect: false },
            { id: 's4', text: 'HTTPS sử dụng mã hóa SSL/TLS để bảo mật dữ liệu.', isCorrect: true }
          ]
        },
        {
          id: 'ex1-tf-3',
          context: 'Về đạo đức số',
          statements: [
            { id: 's1', text: 'Sử dụng password mạnh và khác nhau cho mỗi tài khoản là biện pháp bảo mật cơ bản.', isCorrect: true },
            { id: 's2', text: 'Cập nhật phần mềm thường xuyên giúp vá lỗ hổng bảo mật.', isCorrect: true },
            { id: 's3', text: 'Chỉ cần một password mạnh là đủ để bảo vệ mọi tài khoản.', isCorrect: false },
            { id: 's4', text: '2FA (Two-Factor Authentication) giúp tăng cường bảo mật tài khoản.', isCorrect: true }
          ]
        },
        {
          id: 'ex1-tf-4',
          context: 'Về HTML/CSS',
          statements: [
            { id: 's1', text: 'Flexbox dùng cho bố cục 1 chiều (row hoặc column).', isCorrect: true },
            { id: 's2', text: 'Grid dùng cho bố cục 2 chiều (rows và columns).', isCorrect: true },
            { id: 's3', text: 'Padding là khoảng cách từ content đến border (trong).', isCorrect: true },
            { id: 's4', text: 'Thẻ <div> là inline element.', isCorrect: false }
          ]
        },
        {
          id: 'ex1-tf-5',
          context: 'Về kiến trúc máy tính',
          statements: [
            { id: 's1', text: 'Hệ nhị phân chỉ có hai giá trị: 0 và 1.', isCorrect: true },
            { id: 's2', text: '1 byte = 8 bits và có thể biểu diễn 256 giá trị khác nhau.', isCorrect: true },
            { id: 's3', text: 'RAM là bộ nhớ chỉ đọc, không thay đổi được.', isCorrect: false },
            { id: 's4', text: 'CPU là bộ xử lý trung tâm, thực hiện tính toán và điều khiển.', isCorrect: true }
          ]
        },
        {
          id: 'ex1-tf-6',
          context: 'Về thuật toán',
          statements: [
            { id: 's1', text: 'Thuật toán có thể được biểu diễn bằng ngôn ngữ tự nhiên, sơ đồ khối hoặc code.', isCorrect: true },
            { id: 's2', text: 'Một thuật toán phải có điểm kết thúc sau một số hữu hạn bước.', isCorrect: true },
            { id: 's3', text: 'Thuật toán tìm kiếm nhị phân chỉ hoạt động trên mảng đã được sắp xếp.', isCorrect: true },
            { id: 's4', text: 'Bubble Sort có độ phức tạp O(n log n).', isCorrect: false }
          ]
        }
      ]
    }
  },
  {
    id: 'exam-2',
    title: 'Đề thi thử số 2 - Tốt nghiệp THPT 2026',
    description: 'Đề thi thử số 2 với các câu hỏi phân bổ đều theo các chủ đề.',
    duration: 50,
    part1: {
      totalQuestions: 24,
      pointsEach: 0.25,
      questions: [
        {
          id: 'ex2-q1',
          question: 'Thuật toán sắp xếp nào có độ phức tạp O(n²)?',
          options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Binary Search'],
          correctAnswer: 2,
          topic: 'thuật-toán',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q2',
          question: 'Data Science là gì?',
          options: ['Ngành học về dữ liệu cấu trúc', 'Lĩnh vực kết hợp thống kê, phân tích và ML', 'Chỉ liên quan đến việc lưu trữ dữ liệu', 'Chỉ dùng cho doanh nghiệp lớn'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q3',
          question: 'Overfitting trong Machine Learning nghĩa là gì?',
          options: ['Model không đủ phức tạp', 'Model học vẹt dữ liệu train', 'Model quá đơn giản', 'Model không có training data'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'hard'
        },
        {
          id: 'ex2-q4',
          question: 'Firewall có chức năng gì?',
          options: ['Tăng tốc internet', 'Lọc lưu lượng mạng theo quy tắc bảo mật', 'Mã hóa dữ liệu', 'Lưu trữ file'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q5',
          question: 'Thuộc tính src trong thẻ img dùng để làm gì?',
          options: ['Đặt tên cho hình ảnh', 'Chỉ định đường dẫn URL của hình ảnh', 'Thay đổi kích thước hình', 'Tạo alt text'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q6',
          question: 'Thuộc tính href trong thẻ <a> dùng để làm gì?',
          options: ['Hiển thị văn bản', 'Chỉ định đường dẫn liên kết', 'Tạo hình ảnh', 'Định dạng chữ đậm'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q7',
          question: 'Trong CSS, rem và em khác nhau ở điểm nào?',
          options: ['Không khác nhau', 'rem theo root font-size, em theo parent', 'rem cho mobile, em cho desktop', 'rem là cố định, em là tương đối'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q8',
          question: 'Đơn vị nào lớn hơn GB?',
          options: ['MB', 'KB', 'TB', 'Byte'],
          correctAnswer: 2,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q9',
          question: 'Trong mô hình TCP/IP, giao thức HTTP hoạt động ở tầng nào?',
          options: ['Link Layer', 'Internet Layer', 'Transport Layer', 'Application Layer'],
          correctAnswer: 3,
          topic: 'mạng-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q10',
          question: 'Địa chỉ IP version 4 (IPv4) gồm bao nhiêu bit?',
          options: ['16 bit', '32 bit', '64 bit', '128 bit'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q11',
          question: 'Trong mạng LAN, thiết bị nào có chức năng định tuyến giữa các mạng?',
          options: ['Hub', 'Switch', 'Router', 'Access Point'],
          correctAnswer: 2,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q12',
          question: 'Thuộc tính display: flex trong CSS dùng để làm gì?',
          options: ['Tạo hiệu ứng fade', 'Bật chế độ flexible box layout', 'Đổi màu nền', 'Tạo animation'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q13',
          question: 'Thuộc tính nào bắt buộc nhập liệu trong form?',
          options: ['placeholder', 'type', 'required', 'name'],
          correctAnswer: 2,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q14',
          question: 'Flexbox dùng thuộc tính nào để căn giữa ngang?',
          options: ['align-items: center', 'justify-content: center', 'flex-direction: row', 'flex-wrap: wrap'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q15',
          question: 'Khi nào nên dùng Grid thay vì Flexbox?',
          options: ['Menu ngang đơn giản', 'Layout 2D nhiều hàng và cột', 'Card đơn lẻ', 'Chỉ cần 1 hàng'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q16',
          question: 'Viewport meta tag có tác dụng gì?',
          options: ['Tăng tốc độ tải', 'Cho phép zoom và responsive trên mobile', 'Cải thiện SEO', 'Bảo mật hơn'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q17',
          question: 'Khi nào nên dùng @media (max-width)?',
          options: ['Cho màn hình NHỎ HƠN breakpoint', 'Cho màn hình lớn', 'Chỉ dùng cho print', 'Không bao giờ dùng'],
          correctAnswer: 0,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q18',
          question: 'Số 25 trong hệ nhị phân là gì?',
          options: ['11001', '10011', '11101', '11010'],
          correctAnswer: 0,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex2-q19',
          question: 'Hàm băm (Hash function) dùng để làm gì?',
          options: ['Mã hóa để giải mã được', 'Tạo fingerprint không thể đảo ngược', 'Nén dữ liệu', 'Tăng tốc internet'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'hard'
        },
        {
          id: 'ex2-q20',
          question: 'Câu lệnh SQL nào dùng để lấy dữ liệu?',
          options: ['INSERT', 'SELECT', 'DELETE', 'UPDATE'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q21',
          question: 'Câu lệnh SQL nào dùng để cập nhật dữ liệu?',
          options: ['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE'],
          correctAnswer: 2,
          topic: 'thuật-toán',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q22',
          question: 'Thuật toán nào dùng để tìm đường đi ngắn nhất trên đồ thị?',
          options: ['Bubble Sort', 'Binary Search', 'Dijkstra', 'Insertion Sort'],
          correctAnswer: 2,
          topic: 'thuật-toán',
          difficulty: 'hard'
        },
        {
          id: 'ex2-q23',
          question: 'Mô hình Client-Server hoạt động như thế nào?',
          options: ['Mỗi client là một server', 'Client gửi yêu cầu, server xử lý và trả kết quả', 'Server gửi yêu cầu đến client', 'Không có sự khác biệt'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        },
        {
          id: 'ex2-q24',
          question: 'Thuật toán mạng xã hội ưu tiên nội dung nào?',
          options: ['Nội dung mới nhất', 'Nội dung được nhiều tương tác', 'Nội dung từ bạn bè thân', 'Nội dung ngẫu nhiên'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'easy'
        }
      ]
    },
    part2: {
      totalQuestions: 6,
      pointsEach: 0.5,
      groups: [
        {
          id: 'ex2-tf-1',
          context: 'Về AI và Machine Learning',
          statements: [
            { id: 's1', text: 'Machine Learning cho phép máy học từ dữ liệu thay vì được lập trình rõ ràng.', isCorrect: true },
            { id: 's2', text: 'Deep Learning là một loại Machine Learning sử dụng mạng neural nhiều lớp.', isCorrect: true },
            { id: 's3', text: 'Machine Learning luôn cần nhiều dữ liệu để hoạt động hiệu quả.', isCorrect: true },
            { id: 's4', text: 'Tất cả các ứng dụng AI đều sử dụng Machine Learning.', isCorrect: false }
          ]
        },
        {
          id: 'ex2-tf-2',
          context: 'Về mạng máy tính',
          statements: [
            { id: 's1', text: 'TCP sử dụng cơ chế handshake 3 bước để thiết lập kết nối.', isCorrect: true },
            { id: 's2', text: 'UDP nhanh hơn TCP nhưng không đảm bảo dữ liệu đến đích.', isCorrect: true },
            { id: 's3', text: 'Giao thức HTTP chỉ sử dụng UDP để truyền dữ liệu web.', isCorrect: false },
            { id: 's4', text: 'DHCP tự động cấp phát địa chỉ IP cho các thiết bị trong mạng.', isCorrect: true }
          ]
        },
        {
          id: 'ex2-tf-3',
          context: 'Về đạo đức số và an toàn thông tin',
          statements: [
            { id: 's1', text: 'Email phishing thường giả mạo ngân hàng hoặc dịch vụ quen thuộc.', isCorrect: true },
            { id: 's2', text: 'Kiểm tra URL trước khi nhấp vào link là cách phòng tránh hiệu quả.', isCorrect: true },
            { id: 's3', text: 'Chỉ email từ người quen mới an toàn để mở.', isCorrect: false },
            { id: 's4', text: 'Anti-phishing tool trên trình duyệt có thể giúp phát hiện website giả.', isCorrect: true }
          ]
        },
        {
          id: 'ex2-tf-4',
          context: 'Về HTML5 và CSS3',
          statements: [
            { id: 's1', text: 'Thẻ <header> dùng cho phần đầu trang hoặc phần giới thiệu.', isCorrect: true },
            { id: 's2', text: 'Thẻ <nav> dùng cho phần điều hướng chính.', isCorrect: true },
            { id: 's3', text: 'Thẻ <article> chỉ dùng cho nội dung bài viết tin tức.', isCorrect: false },
            { id: 's4', text: 'Thẻ <section> có thể dùng để nhóm nội dung liên quan.', isCorrect: true }
          ]
        },
        {
          id: 'ex2-tf-5',
          context: 'Về kiến trúc máy tính và hệ điều hành',
          statements: [
            { id: 's1', text: 'Hệ điều hành quản lý tài nguyên phần cứng như CPU, RAM, ổ đĩa.', isCorrect: true },
            { id: 's2', text: 'Hệ điều hành cung cấp giao diện để người dùng tương tác với máy tính.', isCorrect: true },
            { id: 's3', text: 'Windows là hệ điều hành duy nhất được sử dụng hiện nay.', isCorrect: false },
            { id: 's4', text: 'Hệ điều hành có thể chạy nhiều chương trình cùng lúc thông qua đa nhiệm.', isCorrect: true }
          ]
        },
        {
          id: 'ex2-tf-6',
          context: 'Về cơ sở dữ liệu',
          statements: [
            { id: 's1', text: 'Primary Key là trường có giá trị DUY NHẤT cho mỗi record.', isCorrect: true },
            { id: 's2', text: 'SELECT dùng để truy vấn và lấy dữ liệu từ bảng.', isCorrect: true },
            { id: 's3', text: 'Relationship trong CSDL quan hệ có thể là 1-1, 1-N, N-N.', isCorrect: true },
            { id: 's4', text: 'SQL là ngôn ngữ chỉ dùng để xóa dữ liệu.', isCorrect: false }
          ]
        }
      ]
    }
  },
  {
    id: 'exam-3',
    title: 'Đề thi thử số 3 - Tốt nghiệp THPT 2026',
    description: 'Đề thi thử số 3 với độ khó cao hơn, phù hợp để luyện tập.',
    duration: 50,
    part1: {
      totalQuestions: 24,
      pointsEach: 0.25,
      questions: [
        {
          id: 'ex3-q1',
          question: 'ASCII mã hóa ký tự bằng bao nhiêu bit?',
          options: ['7 bit', '8 bit', '16 bit', '32 bit'],
          correctAnswer: 0,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q2',
          question: 'Thuật toán nào có độ phức tạp trung bình O(n log n)?',
          options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q3',
          question: 'Transformer architecture được sử dụng trong mô hình AI nào?',
          options: ['CNN cho hình ảnh', 'RNN cho chuỗi', 'ChatGPT và các LLM', 'Linear Regression'],
          correctAnswer: 2,
          topic: 'ai-ml',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q4',
          question: 'Thuật toán Collaborative Filtering thường dùng trong ứng dụng nào?',
          options: ['Nhận dạng khuôn mặt', 'Gợi ý sản phẩm/phim', 'Dịch thuật', 'Xe tự lái'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q5',
          question: 'IPv6 sử dụng bao nhiêu bit cho địa chỉ?',
          options: ['32 bit', '64 bit', '128 bit', '256 bit'],
          correctAnswer: 2,
          topic: 'mạng-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q6',
          question: 'Giao thức nào được sử dụng cho việc truyền file qua mạng?',
          options: ['HTTP', 'DNS', 'FTP', 'DHCP'],
          correctAnswer: 2,
          topic: 'mạng-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q7',
          question: 'Thuộc tính CSS nào dùng để tạo khoảng cách giữa các flex items?',
          options: ['padding', 'margin', 'gap', 'spacing'],
          correctAnswer: 2,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex3-q8',
          question: 'Trong CSS Grid, repeat(3, 1fr) có nghĩa là gì?',
          options: ['3 cột bằng nhau', '3 hàng bằng nhau', '3 pixels', '3 items'],
          correctAnswer: 0,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q9',
          question: 'Phần mềm mã nguồn mở (Open Source) là gì?',
          options: ['Phần mềm miễn phí', 'Phần mềm có mã nguồn công khai và có thể sửa đổi', 'Phần mềm không có bản quyền', 'Phần mềm chỉ chạy trên Linux'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q10',
          question: 'Cookie trong trình duyệt web được dùng để làm gì?',
          options: ['Lưu trữ file', 'Theo dõi phiên làm việc và preferences', 'Tăng tốc internet', 'Mã hóa dữ liệu'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q11',
          question: 'Thẻ <video> trong HTML5 dùng thuộc tính nào để hiển thị controls?',
          options: ['controls', 'autoplay', 'loop', 'muted'],
          correctAnswer: 0,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex3-q12',
          question: 'Thuộc tính box-sizing: border-box trong CSS có tác dụng gì?',
          options: ['Tăng kích thước element', 'Tính width/height bao gồm padding và border', 'Tạo shadow', 'Tạo animation'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex3-q13',
          question: 'Số 0.625 trong hệ nhị phân là gì?',
          options: ['0.101', '0.111', '0.100', '0.110'],
          correctAnswer: 0,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q14',
          question: 'Thuật toán Backpropagation được sử dụng trong quá trình nào?',
          options: ['Thu thập dữ liệu', 'Huấn luyện mạng neural', 'Làm sạch dữ liệu', 'Đánh giá model'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q15',
          question: 'Webhook là gì?',
          options: ['Móc gắn trên web', 'Cơ chế gửi thông báo khi có sự kiện xảy ra', 'Loại virus', 'Tool SEO'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q16',
          question: 'Thuộc tính position: sticky trong CSS dùng để làm gì?',
          options: ['Tạo animation', 'Cố định element khi scroll', 'Tạo shadow', 'Tạo gradient'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q17',
          question: 'Độ phức tạp O(1) nghĩa là gì?',
          options: ['Thuật toán chạy trong 1 giây', 'Thời gian không đổi bất kể input', 'Thuật toán tốt nhất', 'Thuật toán xấu nhất'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q18',
          question: 'Normalization trong CSDL giúp giảm vấn đề gì?',
          options: ['Tốc độ truy vấn', 'Redundancy (dư thừa dữ liệu)', 'Bảo mật', 'Kích thước file'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q19',
          question: 'Mã hóa bất đối xứng (Asymmetric Encryption) sử dụng bao nhiêu key?',
          options: ['1 key', '2 key (public và private)', '3 key', '4 key'],
          correctAnswer: 1,
          topic: 'đạo-đức-số',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q20',
          question: ' Thuộc tính z-index trong CSS dùng để làm gì?',
          options: ['Tạo animation', 'Kiểm soát thứ tự xếp chồng của elements', 'Tạo shadow', 'Tạo gradient'],
          correctAnswer: 1,
          topic: 'html-css',
          difficulty: 'easy'
        },
        {
          id: 'ex3-q21',
          question: 'Cảm biến (sensor) trong IoT thường dùng để làm gì?',
          options: ['Kết nối internet', 'Thu thập dữ liệu từ môi trường', 'Mã hóa dữ liệu', 'Điều khiển robot'],
          correctAnswer: 1,
          topic: 'kiến-trúc-máy-tính',
          difficulty: 'medium'
        },
        {
          id: 'ex3-q22',
          question: 'Thuật toán PageRank của Google dựa trên nguyên tắc nào?',
          options: ['Đếm số từ khóa', 'Đếm số liên kết trỏ đến trang', 'Phân tích nội dung', 'Đo tốc độ tải trang'],
          correctAnswer: 1,
          topic: 'thuật-toán',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q23',
          question: 'Cross-validation trong ML là kỹ thuật dùng để làm gì?',
          options: ['Tăng tốc training', 'Đánh giá model bằng cách chia data thành nhiều phần', 'Làm sạch dữ liệu', 'Giảm overfitting'],
          correctAnswer: 1,
          topic: 'ai-ml',
          difficulty: 'hard'
        },
        {
          id: 'ex3-q24',
          question: 'Cổng (port) 443 thường được sử dụng cho giao thức nào?',
          options: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
          correctAnswer: 1,
          topic: 'mạng-máy-tính',
          difficulty: 'easy'
        }
      ]
    },
    part2: {
      totalQuestions: 6,
      pointsEach: 0.5,
      groups: [
        {
          id: 'ex3-tf-1',
          context: 'Về thuật toán và độ phức tạp',
          statements: [
            { id: 's1', text: 'Độ phức tạp O(n²) luôn chậm hơn O(n) trong mọi trường hợp.', isCorrect: true },
            { id: 's2', text: 'Binary search có độ phức tạp O(log n) nhưng cần mảng đã sắp xếp.', isCorrect: true },
            { id: 's3', text: 'Thuật toán có độ phức tạp tốt nhất là O(n!) vì nhanh nhất.', isCorrect: false },
            { id: 's4', text: 'Thuật toán Dijkstra tìm đường đi ngắn nhất trên đồ thị có trọng số không âm.', isCorrect: true }
          ]
        },
        {
          id: 'ex3-tf-2',
          context: 'Về cơ sở dữ liệu và SQL',
          statements: [
            { id: 's1', text: 'SELECT * FROM users WHERE age > 18 lấy tất cả users có age > 18.', isCorrect: true },
            { id: 's2', text: 'INSERT INTO users (name, email) VALUES ("An", "an@email.com") thêm 1 user mới.', isCorrect: true },
            { id: 's3', text: 'DELETE FROM users xóa toàn bộ users nhưng không cần WHERE.', isCorrect: true },
            { id: 's4', text: 'UPDATE users SET name = "Bob" sẽ cập nhật tất cả users thành "Bob".', isCorrect: true }
          ]
        },
        {
          id: 'ex3-tf-3',
          context: 'Về bảo mật và đạo đức số',
          statements: [
            { id: 's1', text: 'Phishing có thể xảy ra qua email, SMS, hoặc website giả.', isCorrect: true },
            { id: 's2', text: 'Mật khẩu nên được hash trước khi lưu vào database.', isCorrect: true },
            { id: 's3', text: 'HTTPS có thể đảm bảo 100% trang web là an toàn.', isCorrect: false },
            { id: 's4', text: '2FA (Two-Factor Authentication) giúp bảo vệ tài khoản tốt hơn password thông thường.', isCorrect: true }
          ]
        },
        {
          id: 'ex3-tf-4',
          context: 'Về CSS Flexbox và Grid',
          statements: [
            { id: 's1', text: 'display: flex kích hoạt Flexbox layout cho container.', isCorrect: true },
            { id: 's2', text: 'justify-content căn theo trục main axis (mặc định là horizontal).', isCorrect: true },
            { id: 's3', text: 'align-items căn theo trục cross axis (mặc định là vertical).', isCorrect: true },
            { id: 's4', text: 'Grid và Flexbox không thể sử dụng trong cùng một layout.', isCorrect: false }
          ]
        },
        {
          id: 'ex3-tf-5',
          context: 'Về AI và Deep Learning',
          statements: [
            { id: 's1', text: 'CNN (Convolutional Neural Network) đặc biệt hiệu quả với dữ liệu hình ảnh.', isCorrect: true },
            { id: 's2', text: 'RNN (Recurrent Neural Network) phù hợp với dữ liệu chuỗi như text và time series.', isCorrect: true },
            { id: 's3', text: 'ChatGPT sử dụng kiến trúc Transformer và large language model.', isCorrect: true },
            { id: 's4', text: 'Tất cả các loại AI đều cần GPU để hoạt động.', isCorrect: false }
          ]
        },
        {
          id: 'ex3-tf-6',
          context: 'Về mạng và giao thức',
          statements: [
            { id: 's1', text: 'TCP handshake 3 bước: SYN → SYN-ACK → ACK.', isCorrect: true },
            { id: 's2', text: 'UDP không đảm bảo dữ liệu đến đích và không có handshake.', isCorrect: true },
            { id: 's3', text: 'DHCP server cấp phát IP động cho các thiết bị trong mạng.', isCorrect: true },
            { id: 's4', text: 'DNS chỉ hoạt động khi có kết nối internet.', isCorrect: true }
          ]
        }
      ]
    }
  }
];

export function getExamById(id: string): Exam | undefined {
  return exams.find(e => e.id === id);
}