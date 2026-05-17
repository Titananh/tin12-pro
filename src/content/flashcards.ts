// ==========================================
// Flashcards Seed Data - Tin12 Pro Cánh Diều
// 100 flashcards covering all topics
// ==========================================
import { Flashcard } from '@/lib/types';

export const flashcards: Flashcard[] = [
  // ========== KIẾN TRÚC MÁY TÍNH (15 cards) ==========
  {
    id: 'fc-1',
    deckId: 'deck-arch',
    front: 'RAM là gì?',
    back: 'Random Access Memory - Bộ nhớ truy cập ngẫu nhiên, lưu dữ liệu tạm thời khi máy hoạt động. Mất điện thì mất hết dữ liệu.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-2',
    deckId: 'deck-arch',
    front: 'CPU có chức năng gì?',
    back: 'Central Processing Unit - Bộ xử lý trung tâm, thực hiện tính toán và điều khiển mọi hoạt động của máy tính.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-3',
    deckId: 'deck-arch',
    front: '1 byte bằng bao nhiêu bit?',
    back: '8 bits. Mỗi bit là 0 hoặc 1. 8 bits có thể biểu diễn 256 giá trị (2^8).',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-4',
    deckId: 'deck-arch',
    front: 'Phần mềm hệ thống gồm những loại nào?',
    back: 'Hệ điều hành (Windows, macOS, Linux) và chương trình tiện ích (driver, trình diệt virus).',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-5',
    deckId: 'deck-arch',
    front: 'ROM là gì?',
    back: 'Read Only Memory - Bộ nhớ chỉ đọc, lưu trữ cố định. Không mất khi mất điện. Chứa firmware khởi động máy.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-6',
    deckId: 'deck-arch',
    front: 'Số 25 trong hệ nhị phân là gì?',
    back: '11001. Cách tính: 25/2=12 dư 1, 12/2=6 dư 0, 6/2=3 dư 0, 3/2=1 dư 1, 1/2=0 dư 1 → đọc ngược: 11001.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-7',
    deckId: 'deck-arch',
    front: 'Hệ nhị phân là gì?',
    back: 'Hệ đếm cơ sở 2, chỉ có 2 ký tự: 0 và 1. Máy tính sử dụng để biểu diễn mọi dữ liệu.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-8',
    deckId: 'deck-arch',
    front: 'Thứ tự đơn vị đo thông tin từ nhỏ đến lớn?',
    back: 'Bit → Byte → KB → MB → GB → TB. Mỗi cấp = 1024 lần cấp trước (trừ bit và byte).',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-9',
    deckId: 'deck-arch',
    front: 'Hệ thập lục phân (Hex) dùng những ký tự nào?',
    back: '0-9 và A-F (tức 0-15). VD: A=10, B=11, ... F=15. Thường dùng cho địa chỉ bộ nhớ và mã màu (#RRGGBB).',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-10',
    deckId: 'deck-arch',
    front: 'ASCII dùng bao nhiêu bit cho mỗi ký tự?',
    back: '7 bits cho mỗi ký tự (128 giá trị). Thường biểu diễn bằng 8 bits (1 byte) với bit parity.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-11',
    deckId: 'deck-arch',
    front: 'Unicode khác ASCII ở điểm nào?',
    back: 'ASCII chỉ 128 ký tự (tiếng Anh). Unicode hỗ trợ tất cả ngôn ngữ trên thế giới, dùng 16 bits hoặc nhiều hơn (UTF-8: 1-4 bytes).',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-12',
    deckId: 'deck-arch',
    front: 'Bus trong máy tính là gì?',
    back: 'Đường truyền dữ liệu nối các thành phần máy tính (CPU, RAM, ROM, thiết bị ngoại vi). Có bus địa chỉ, bus dữ liệu, bus điều khiển.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-13',
    deckId: 'deck-arch',
    front: 'Cache L1, L2, L3 là gì?',
    back: 'Bộ nhớ đệm nằm trong CPU, giúp truy xuất nhanh dữ liệu hay dùng. L1 nhanh nhất nhưng nhỏ nhất, L3 chậm hơn nhưng lớn hơn.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'hard'
  },
  {
    id: 'fc-14',
    deckId: 'deck-arch',
    front: 'SSD khác HDD ở điểm nào?',
    back: 'SSD dùng bộ nhớ flash, không có đĩa quay nên nhanh hơn, bền hơn, ít tiếng ồn. HDD dùng đĩa từ quay, rẻ hơn nhưng chậm hơn.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-15',
    deckId: 'deck-arch',
    front: 'BIOS/UEFI có vai trò gì?',
    back: 'Firmware khởi động máy, kiểm tra phần cứng (POST), và load hệ điều hành từ ổ đĩa vào RAM.',
    topic: 'kiến-trúc-máy-tính',
    difficulty: 'medium'
  },

  // ========== AI & MACHINE LEARNING (20 cards) ==========
  {
    id: 'fc-16',
    deckId: 'deck-ai',
    front: 'AI hẹp (Narrow AI) là gì?',
    back: 'Hệ thống AI chỉ làm tốt một tác vụ cụ thể. VD: nhận dạng khuôn mặt, dịch thuật, chơi cờ. Chưa có AI nào đạt mức AGI.',
    topic: 'ai-ml',
    difficulty: 'easy'
  },
  {
    id: 'fc-17',
    deckId: 'deck-ai',
    front: 'Machine Learning là gì?',
    back: 'Tập con của AI, cho phép máy tự động cải thiện từ kinh nghiệm (dữ liệu) thay vì được lập trình rõ ràng.',
    topic: 'ai-ml',
    difficulty: 'easy'
  },
  {
    id: 'fc-18',
    deckId: 'deck-ai',
    front: '3 loại học máy (Machine Learning)?',
    back: '1. Supervised (có label) - VD: phân loại spam. 2. Unsupervised (không label) - VD: phân nhóm khách hàng. 3. Reinforcement (thử-sai với reward) - VD: AlphaGo.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-19',
    deckId: 'deck-ai',
    front: 'Training data là gì?',
    back: 'Dữ liệu dùng để huấn luyện model ML. Gồm input và output (label) để model học pattern.',
    topic: 'ai-ml',
    difficulty: 'easy'
  },
  {
    id: 'fc-20',
    deckId: 'deck-ai',
    front: 'Overfitting là gì?',
    back: 'Model "học vẹt" dữ liệu train, không generalize được với data mới. Giống như học thuộc lòng đáp án thay vì hiểu cách giải.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-21',
    deckId: 'deck-ai',
    front: 'Deep Learning khác ML ở điểm nào?',
    back: 'Deep Learning dùng nhiều hidden layers (deep) để học features từ thấp đến cao. ML truyền thống thường dùng features được design thủ công.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-22',
    deckId: 'deck-ai',
    front: 'CNN (Convolutional Neural Network) dùng cho loại dữ liệu nào?',
    back: 'Dữ liệu có spatial structure như hình ảnh, video. Convolution layer tìm features như edges, textures, shapes.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-23',
    deckId: 'deck-ai',
    front: 'RNN (Recurrent Neural Network) phù hợp với loại dữ liệu nào?',
    back: 'Dữ liệu chuỗi (sequence): văn bản, âm thanh, time series. Có "memory" cho các step trước đó.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-24',
    deckId: 'deck-ai',
    front: 'Transformer trong AI là gì?',
    back: 'Kiến trúc mạng neural dùng trong Large Language Models (ChatGPT, BERT). Dùng self-attention để xử lý toàn bộ chuỗi song song.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-25',
    deckId: 'deck-ai',
    front: 'Backpropagation là gì?',
    back: 'Thuật toán cập nhật weights trong mạng neural. Tính gradient của loss và lan truyền ngược để adjust weights giảm sai số.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-26',
    deckId: 'deck-ai',
    front: 'Feature engineering là gì?',
    back: 'Quá trình chọn và biến đổi features (đặc trưng) từ raw data để model ML hiểu được. VD: trích xuất màu, kích thước từ ảnh.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-27',
    deckId: 'deck-ai',
    front: 'Natural Language Processing (NLP) là gì?',
    back: 'Lĩnh vực AI xử lý ngôn ngữ tự nhiên: phân tích văn bản, dịch thuật, chatbot, tóm tắt văn bản.',
    topic: 'ai-ml',
    difficulty: 'easy'
  },
  {
    id: 'fc-28',
    deckId: 'deck-ai',
    front: 'Reinforcement Learning hoạt động như thế nào?',
    back: 'Agent học qua thử và sai với reward/penalty. VD: AlphaGo chơi triệu ván với chính nó, được thưởng khi thắng, phạt khi thua.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-29',
    deckId: 'deck-ai',
    front: 'Data Science là gì?',
    back: 'Lĩnh vực kết hợp thống kê, phân tích, và ML để trích xuất insight từ dữ liệu. Gồm: thu thập, làm sạch, phân tích, trực quan hóa.',
    topic: 'ai-ml',
    difficulty: 'easy'
  },
  {
    id: 'fc-30',
    deckId: 'deck-ai',
    front: 'Cross-validation trong ML là gì?',
    back: 'Kỹ thuật đánh giá model bằng cách chia data thành k phần, train k-1 phần và test 1 phần, lặp k lần.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-31',
    deckId: 'deck-ai',
    front: 'Bias trong ML nghĩa là gì?',
    back: 'Sai số do giả định của model quá đơn giản, không capture được pattern phức tạp. High bias = underfitting.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-32',
    deckId: 'deck-ai',
    front: 'Collaborative Filtering là gì?',
    back: 'Thuật toán gợi ý dựa trên sự tương đồng giữa người dùng hoặc items. VD: Netflix gợi ý phim dựa trên phim bạn đã xem.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-33',
    deckId: 'deck-ai',
    front: 'Gradient Descent là gì?',
    back: 'Thuật toán tối ưu để tìm minimum của loss function bằng cách đi ngược gradient. Learning rate quyết định bước đi.',
    topic: 'ai-ml',
    difficulty: 'hard'
  },
  {
    id: 'fc-34',
    deckId: 'deck-ai',
    front: 'Token trong NLP là gì?',
    back: 'Đơn vị nhỏ nhất của văn bản mà model xử lý. Có thể là từ (word), subword, hoặc ký tự tùy cách tokenize.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },
  {
    id: 'fc-35',
    deckId: 'deck-ai',
    front: 'Prompt engineering là gì?',
    back: 'Kỹ năng thiết kế input (prompt) để AI (LLM) trả về kết quả tốt nhất. Bao gồm: context, examples, constraints.',
    topic: 'ai-ml',
    difficulty: 'medium'
  },

  // ========== MẠNG MÁY TÍNH (15 cards) ==========
  {
    id: 'fc-36',
    deckId: 'deck-network',
    front: 'DNS là gì và hoạt động như thế nào?',
    back: 'Domain Name System - "Danh bạ điện thoại" của Internet. Chuyển đổi tên miền (google.com) thành địa chỉ IP (142.250.xx.xx).',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-37',
    deckId: 'deck-network',
    front: 'Sự khác nhau giữa HTTP và HTTPS?',
    back: 'HTTPS có mã hóa SSL/TLS bảo mật dữ liệu truyền qua mạng. HTTP không mã hóa, dữ liệu có thể bị chặn.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-38',
    deckId: 'deck-network',
    front: 'Router và Switch khác nhau thế nào?',
    back: 'Router kết nối các mạng khác nhau (VD: LAN ↔ Internet) và định tuyến gói tin. Switch kết nối các máy trong cùng một mạng LAN.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-39',
    deckId: 'deck-network',
    front: 'TCP handshake 3 bước là gì?',
    back: '1. Client gửi SYN đến server. 2. Server trả SYN-ACK. 3. Client gửi ACK. Sau đó data truyền tin cậy.',
    topic: 'mạng-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-40',
    deckId: 'deck-network',
    front: 'UDP khác TCP ở điểm nào?',
    back: 'UDP không đảm bảo dữ liệu đến đích (best effort), không handshake, không kiểm soát lỗi. Nhanh hơn TCP. Dùng cho video call, game online.',
    topic: 'mạng-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-41',
    deckId: 'deck-network',
    front: 'Địa chỉ IPv4 gồm bao nhiêu bit?',
    back: '32 bits, biểu diễn dưới dạng 4 số 0-255 (VD: 192.168.1.1). Tổng cộng ~4 tỷ địa chỉ. IPv6 dùng 128 bits.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-42',
    deckId: 'deck-network',
    front: 'LAN, MAN, WAN khác nhau thế nào?',
    back: 'LAN (Local) - vài trăm mét, trong tòa nhà. MAN (Metropolitan) - vài km, thành phố. WAN (Wide) - toàn cầu, Internet.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-43',
    deckId: 'deck-network',
    front: 'Port 80 và 443 được dùng cho gì?',
    back: 'Port 80: HTTP (web không mã hóa). Port 443: HTTPS (web có mã hóa SSL/TLS).',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-44',
    deckId: 'deck-network',
    front: 'DHCP là gì?',
    back: 'Dynamic Host Configuration Protocol - Tự động cấp phát địa chỉ IP cho các thiết bị trong mạng. VD: khi bạn kết nối WiFi, router tự cấp IP.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-45',
    deckId: 'deck-network',
    front: 'Firewall là gì?',
    back: 'Tường lửa - lọc lưu lượng mạng vào/ra theo quy tắc bảo mật. Có thể block IP, port, hay protocol không được phép.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-46',
    deckId: 'deck-network',
    front: 'Ping và tracert dùng giao thức nào?',
    back: 'Ping dùng ICMP (Internet Control Message Protocol) để kiểm tra kết nối và đo thời gian phản hồi. Tracert dùng TTL field trong IP header.',
    topic: 'mạng-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-47',
    deckId: 'deck-network',
    front: 'Cookie trong trình duyệt là gì?',
    back: 'File text nhỏ được lưu trên máy tính, chứa thông tin phiên làm việc (session), preferences, và tracking người dùng.',
    topic: 'mạng-máy-tính',
    difficulty: 'easy'
  },
  {
    id: 'fc-48',
    deckId: 'deck-network',
    front: 'API là gì?',
    back: 'Application Programming Interface - Cách các ứng dụng giao tiếp với nhau. VD: API của Google Maps cho phép website nhúng bản đồ.',
    topic: 'mạng-máy-tính',
    difficulty: 'medium'
  },
  {
    id: 'fc-49',
    deckId: 'deck-network',
    front: 'Webhook là gì?',
    back: 'Cơ chế gửi thông báo (HTTP POST) đến một URL khi có sự kiện xảy ra. VD: GitHub webhook gửi thông báo khi có commit mới.',
    topic: 'mạng-máy-tính',
    difficulty: 'hard'
  },
  {
    id: 'fc-50',
    deckId: 'deck-network',
    front: 'Load Balancer là gì?',
    back: 'Thiết bị/phần mềm phân phối traffic đến nhiều servers để không có server nào bị quá tải. Tăng availability và performance.',
    topic: 'mạng-máy-tính',
    difficulty: 'hard'
  },

  // ========== ĐẠO ĐỨC SỐ (15 cards) ==========
  {
    id: 'fc-51',
    deckId: 'deck-ethics',
    front: 'Ransomware là gì?',
    back: 'Mã độc mã hóa toàn bộ file trên máy nạn nhân và đòi tiền chuộc (thường bằng Bitcoin). WannaCry là ví dụ nổi tiếng.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-52',
    deckId: 'deck-ethics',
    front: 'Phishing là gì và cách nhận biết?',
    back: 'Hình thức lừa đảo qua email/website giả mạo (VD: ngân hàng). Cách nhận biết: kiểm tra URL, không click link lạ, không cung cấp password.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-53',
    deckId: 'deck-ethics',
    front: '2FA (Two-Factor Authentication) là gì?',
    back: 'Xác thực hai yếu tố - yêu cầu thêm mã từ điện thoại hoặc app sau khi nhập password. Tăng bảo mật tài khoản đáng kể.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-54',
    deckId: 'deck-ethics',
    front: 'Digital citizenship là gì?',
    back: 'Cách sử dụng công nghệ và internet một cách có trách nhiệm, đạo đức và an toàn. Bao gồm: tôn trọng bản quyền, bảo mật thông tin, không cyberbullying.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-55',
    deckId: 'deck-ethics',
    front: 'Mã hóa (Encryption) là gì?',
    back: 'Quá trình chuyển đổi dữ liệu thành dạng không đọc được (ciphertext) với key. Chỉ người có key mới giải mã được.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-56',
    deckId: 'deck-ethics',
    front: 'AES và RSA khác nhau thế nào?',
    back: 'AES (Symmetric) - cùng 1 key mã hóa và giải mã, nhanh, dùng cho data. RSA (Asymmetric) - public key mã hóa, private key giải mã, dùng cho secure communication.',
    topic: 'đạo-đức-số',
    difficulty: 'hard'
  },
  {
    id: 'fc-57',
    deckId: 'deck-ethics',
    front: 'Hash function (hàm băm) dùng để làm gì?',
    back: 'Tạo fingerprint cố định (hash) từ dữ liệu. Không thể đảo ngược (one-way). VD: SHA-256 tạo 256-bit hash, dùng để lưu password.',
    topic: 'đạo-đức-số',
    difficulty: 'hard'
  },
  {
    id: 'fc-58',
    deckId: 'deck-ethics',
    front: 'GDPR là gì?',
    back: 'General Data Protection Regulation - Quy định bảo vệ dữ liệu cá nhân của EU. Yêu cầu doanh nghiệp phải xin phép thu thập và cho phép xóa dữ liệu.',
    topic: 'đạo-đức-số',
    difficulty: 'medium'
  },
  {
    id: 'fc-59',
    deckId: 'deck-ethics',
    front: 'Bản quyền phần mềm (Software License) là gì?',
    back: 'Thỏa thuận pháp lý quy định quyền sử dụng phần mềm. VD: Open Source = mã nguồn công khai, có thể sửa đổi. Proprietary = đóng, phải trả tiền.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-60',
    deckId: 'deck-ethics',
    front: 'Cyberbullying là gì?',
    back: 'Bắt nạt trên mạng: quấy rối, đe dọa, phát tán thông tin tiêu cực qua mạng xã hội. Có thể gây hậu quả nghiêm trọng cho nạn nhân.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-61',
    deckId: 'deck-ethics',
    front: 'VPN dùng để làm gì?',
    back: 'Virtual Private Network - Tạo "đường hầm" mã hóa kết nối internet, ẩn địa chỉ IP thật, bảo vệ privacy khi dùng WiFi công cộng.',
    topic: 'đạo-đức-số',
    difficulty: 'medium'
  },
  {
    id: 'fc-62',
    deckId: 'deck-ethics',
    front: 'Social media algorithm ưu tiên nội dung gì?',
    back: 'Nội dung có nhiều engagement (likes, shares, comments) vì giữ người dùng online lâu hơn → tăng doanh thu quảng cáo.',
    topic: 'đạo-đức-số',
    difficulty: 'easy'
  },
  {
    id: 'fc-63',
    deckId: 'deck-ethics',
    front: 'Intellectual Property trong CNTT là gì?',
    back: 'Quyền sở hữu trí tuệ - bảo vệ ý tưởng, code, thiết kế. Bao gồm: copyright (tự động), patent (đăng ký), trademark (nhãn hiệu).',
    topic: 'đạo-đức-số',
    difficulty: 'medium'
  },
  {
    id: 'fc-64',
    deckId: 'deck-ethics',
    front: 'SQL Injection là gì?',
    back: 'Kỹ thuật tấn công chèn malicious SQL code vào input của ứng dụng web để truy cập hoặc thao túng database bất hợp pháp.',
    topic: 'đạo-đức-số',
    difficulty: 'hard'
  },
  {
    id: 'fc-65',
    deckId: 'deck-ethics',
    front: 'Social engineering trong bảo mật là gì?',
    back: 'Thao túng tâm lý con người để lấy thông tin hoặc quyền truy cập. VD: giả làm kỹ thuật viên, gọi điện hỏi password.',
    topic: 'đạo-đức-số',
    difficulty: 'medium'
  },

  // ========== HTML/CSS (15 cards) ==========
  {
    id: 'fc-66',
    deckId: 'deck-html',
    front: '<h1> và <h6> khác nhau thế nào?',
    back: 'h1 là tiêu đề lớn nhất (quan trọng nhất), h6 là nhỏ nhất. H1→H6 giảm dần về kích thước và độ quan trọng. Dùng đúng thứ tự cho SEO.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-67',
    deckId: 'deck-html',
    front: 'Thuộc tính alt trong thẻ img có tác dụng gì?',
    back: 'Alternative text - mô tả nội dung hình ảnh. Giúp người dùng đọc màn hình hiểu được ảnh, và hiển thị khi ảnh không load được.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-68',
    deckId: 'deck-html',
    front: 'Block element và Inline element khác nhau thế nào?',
    back: 'Block (div, p, h1) chiếm full width và xuống dòng. Inline (span, a, strong) chỉ chiếm phần nội dung, không xuống dòng.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-69',
    deckId: 'deck-html',
    front: 'CSS Box Model gồm những thành phần nào?',
    back: 'Content → Padding (trong border) → Border → Margin (ngoài border). Tổng kích thước = content + padding + border.',
    topic: 'html-css',
    difficulty: 'medium'
  },
  {
    id: 'fc-70',
    deckId: 'deck-html',
    front: 'Flexbox dùng justify-content để làm gì?',
    back: 'Căn theo trục chính (main axis). VD: space-between = phân bổ đều, center = căn giữa, flex-start = gốc trái.',
    topic: 'html-css',
    difficulty: 'medium'
  },
  {
    id: 'fc-71',
    deckId: 'deck-html',
    front: 'CSS Grid và Flexbox dùng khi nào?',
    back: 'Flexbox cho bố cục 1 chiều (row HOẶC column). Grid cho bố cục 2 chiều (rows VÀ columns). Có thể kết hợp cả hai.',
    topic: 'html-css',
    difficulty: 'medium'
  },
  {
    id: 'fc-72',
    deckId: 'deck-html',
    front: 'box-sizing: border-box có tác dụng gì?',
    back: 'Khi set width/height, tính luôn cả padding và border. VD: width: 200px với border-box = content + padding + border = 200px. Mặc định là content-box (chỉ tính content).',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-73',
    deckId: 'deck-html',
    front: 'rem và em trong CSS khác nhau thế nào?',
    back: 'rem (root em) theo font-size của root element (<html>). em theo font-size của phần tử cha gần nhất. VD: root = 16px, 1rem = 16px always.',
    topic: 'html-css',
    difficulty: 'medium'
  },
  {
    id: 'fc-74',
    deckId: 'deck-html',
    front: 'Semantic HTML tags là gì?',
    back: 'Thẻ có ý nghĩa ngữ nghĩa: <header>, <nav>, <main>, <article>, <section>, <footer>. Giúp browser hiểu cấu trúc trang, tốt cho SEO và accessibility.',
    topic: 'html-css',
    difficulty: 'medium'
  },
  {
    id: 'fc-75',
    deckId: 'deck-html',
    front: 'Viewport meta tag có tác dụng gì?',
    back: '<meta name="viewport" content="width=device-width, initial-scale=1.0"> Cho phép trang responsive trên mobile. Không có nó, mobile hiển thị desktop version.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-76',
    deckId: 'deck-html',
    front: 'Z-index trong CSS dùng để làm gì?',
    back: 'Kiểm soát thứ tự xếp chồng (stacking order) của elements. Element có z-index cao hơn sẽ nằm trên. Chỉ hoạt động với position: relative/absolute/fixed.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-77',
    deckId: 'deck-html',
    front: 'Media query (max-width) dùng để làm gì?',
    back: '@media (max-width: 768px) { ... } - Áp dụng CSS khi màn hình nhỏ hơn hoặc bằng 768px. Dùng cho responsive design.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-78',
    deckId: 'deck-html',
    front: 'Thuộc tính required trong form là gì?',
    back: 'Bắt buộc người dùng nhập liệu trước khi submit. Nếu bỏ trống, trình duyệt sẽ báo lỗi và không gửi form.',
    topic: 'html-css',
    difficulty: 'easy'
  },
  {
    id: 'fc-79',
    deckId: 'deck-html',
    front: 'CSS specificity là gì và hoạt động thế nào?',
    back: 'Thứ tự ưu tiên khi nhiều rule cùng áp dụng: inline > id (#) > class (.) > element (tag). VD: #id có priority cao hơn .class.',
    topic: 'html-css',
    difficulty: 'hard'
  },
  {
    id: 'fc-80',
    deckId: 'deck-html',
    front: 'Transform trong CSS dùng để làm gì?',
    back: 'Thay đổi hình dạng, kích thước, vị trí element. VD: transform: rotate(45deg), scale(1.2), translateY(-5px). Dùng cho hover effects và animations.',
    topic: 'html-css',
    difficulty: 'medium'
  },

  // ========== THUẬT TOÁN (15 cards) ==========
  {
    id: 'fc-81',
    deckId: 'deck-algo',
    front: 'Thuật toán là gì?',
    back: 'Dãy các bước tuần tự để giải quyết một vấn đề. Có điểm kết thúc, có input và output. Có thể diễn tả bằng ngôn ngữ tự nhiên, sơ đồ khối, hoặc code.',
    topic: 'thuật-toán',
    difficulty: 'easy'
  },
  {
    id: 'fc-82',
    deckId: 'deck-algo',
    front: 'Độ phức tạp O(1) và O(n) khác nhau thế nào?',
    back: 'O(1) = thời gian không đổi bất kể input (VD: array access). O(n) = thời gian tăng tuyến tính với input (VD: linear search).',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-83',
    deckId: 'deck-algo',
    front: 'Binary Search cần điều kiện gì và hoạt động thế nào?',
    back: 'Cần mảng đã sắp xếp. Liên tục chia đôi phạm vi tìm kiếm: so sánh với phần tử giữa → loại bỏ nửa không chứa → lặp lại. Độ phức tạp O(log n).',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-84',
    deckId: 'deck-algo',
    front: 'Bubble Sort và Quick Sort khác nhau thế nào?',
    back: 'Bubble Sort: so sánh và đổi chỗ adjacent elements, O(n²). Quick Sort: chia mảng theo pivot, đệ quy, O(n log n) trung bình.',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-85',
    deckId: 'deck-algo',
    front: 'Primary Key trong CSDL là gì?',
    back: 'Trường có giá trị DUY NHẤT cho mỗi record, không được NULL. VD: Mã học sinh, CCCD. Dùng để phân biệt các records.',
    topic: 'thuật-toán',
    difficulty: 'easy'
  },
  {
    id: 'fc-86',
    deckId: 'deck-algo',
    front: 'SQL: SELECT, INSERT, UPDATE, DELETE dùng để làm gì?',
    back: 'SELECT = lấy dữ liệu. INSERT = thêm record mới. UPDATE = cập nhật dữ liệu. DELETE = xóa record.',
    topic: 'thuật-toán',
    difficulty: 'easy'
  },
  {
    id: 'fc-87',
    deckId: 'deck-algo',
    front: 'Thuật toán Dijkstra dùng để làm gì?',
    back: 'Tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh khác trong đồ thị có trọng số không âm. Dùng trong GPS, routing.',
    topic: 'thuật-toán',
    difficulty: 'hard'
  },
  {
    id: 'fc-88',
    deckId: 'deck-algo',
    front: 'Relationship 1-1, 1-N, N-N trong CSDL là gì?',
    back: '1-1: Một record liên kết một record (VD: User ↔ Profile). 1-N: Một record liên kết nhiều records (VD: Category ↔ Products). N-N: Nhiều ↔ Nhiều (VD: Students ↔ Courses).',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-89',
    deckId: 'deck-algo',
    front: 'Normalization trong CSDL giúp gì?',
    back: 'Giảm redundancy (dư thừa dữ liệu) và tránh anomalies khi insert/update/delete. Tổ chức data thành các bảng quan hệ có cấu trúc tối ưu.',
    topic: 'thuật-toán',
    difficulty: 'hard'
  },
  {
    id: 'fc-90',
    deckId: 'deck-algo',
    front: 'Hash table hoạt động thế nào?',
    back: 'Dùng hash function để map key → index trong array. Cho phép tra cứu O(1) trung bình. VD: lưu password với salt, tra cứu dictionary.',
    topic: 'thuật-toán',
    difficulty: 'hard'
  },
  {
    id: 'fc-91',
    deckId: 'deck-algo',
    front: 'Recursion trong lập trình là gì?',
    back: 'Hàm tự gọi chính nó để giải quyết bài toán con. Phải có điều kiện dừng (base case) để tránh infinite loop. VD: tính giai thừa, Fibonacci.',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-92',
    deckId: 'deck-algo',
    front: 'Stack và Queue khác nhau thế nào?',
    back: 'Stack (LIFO): vào sau ra trước. Queue (FIFO): vào trước ra trước. Stack dùng cho undo, call stack. Queue dùng cho print queue, task scheduling.',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-93',
    deckId: 'deck-algo',
    front: 'Graph và Tree khác nhau thế nào?',
    back: 'Tree là graph có hướng, không có chu trình (acyclic), có root duy nhất. Graph có thể có chu trình, không一定有 root.',
    topic: 'thuật-toán',
    difficulty: 'medium'
  },
  {
    id: 'fc-94',
    deckId: 'deck-algo',
    front: 'Big O notation dùng để làm gì?',
    back: 'Đo độ phức tạp thuật toán theo thời gian/space khi input lớn. O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n).',
    topic: 'thuật-toán',
    difficulty: 'hard'
  },
  {
    id: 'fc-95',
    deckId: 'deck-algo',
    front: 'PageRank algorithm của Google hoạt động thế nào?',
    back: 'Đánh giá importance của trang web dựa trên số và chất lượng links trỏ đến nó. Trang có nhiều link từ trang quan trọng sẽ có rank cao hơn.',
    topic: 'thuật-toán',
    difficulty: 'hard'
  },

  // ========== DỮ LIỆU & IO (5 cards) ==========
  {
    id: 'fc-96',
    deckId: 'deck-data',
    front: 'IoT (Internet of Things) là gì?',
    back: 'Mạng lưới các thiết bị vật lý có cảm biến, phần mềm kết nối internet để thu thập và trao đổi dữ liệu. VD: đồng hồ thông minh, nhà thông minh.',
    topic: 'data-io',
    difficulty: 'easy'
  },
  {
    id: 'fc-97',
    deckId: 'deck-data',
    front: 'Cloud Computing là gì?',
    back: 'Dịch vụ máy tính qua internet: server, storage, database, software. VD: Google Drive, AWS, Microsoft Azure. Cho phép truy cập tài nguyên từ xa.',
    topic: 'data-io',
    difficulty: 'easy'
  },
  {
    id: 'fc-98',
    deckId: 'deck-data',
    front: 'Big Data có đặc điểm gì?',
    back: '5V: Volume (lớn), Velocity (nhanh), Variety (đa dạng), Veracity (tin cậy), Value (giá trị). Dữ liệu lớn đến mức công cụ truyền thống không xử lý được.',
    topic: 'data-io',
    difficulty: 'medium'
  },
  {
    id: 'fc-99',
    deckId: 'deck-data',
    front: 'Data pipeline là gì?',
    back: 'Quy trình di chuyển data từ nguồn đến đích: thu thập → làm sạch → biến đổi → lưu trữ → phân tích. Dùng cho ETL, real-time processing.',
    topic: 'data-io',
    difficulty: 'hard'
  },
  {
    id: 'fc-100',
    deckId: 'deck-data',
    front: 'CSV và JSON khác nhau thế nào?',
    back: 'CSV (Comma Separated Values) - dữ liệu dạng bảng, đơn giản, đọc được bằng Excel. JSON (JavaScript Object Notation) - dữ liệu phân cấp, linh hoạt, phổ biến trong API.',
    topic: 'data-io',
    difficulty: 'easy'
  }
];

export function getFlashcardsByDeck(deckId: string): Flashcard[] {
  return flashcards.filter(f => f.deckId === deckId);
}

export function getFlashcardsByTopic(topic: string): Flashcard[] {
  return flashcards.filter(f => f.topic === topic);
}

export function getFlashcardById(id: string): Flashcard | undefined {
  return flashcards.find(f => f.id === id);
}

export const decks = [
  { id: 'deck-arch', name: 'Kiến trúc máy tính', count: 15 },
  { id: 'deck-ai', name: 'AI & Machine Learning', count: 20 },
  { id: 'deck-network', name: 'Mạng máy tính', count: 15 },
  { id: 'deck-ethics', name: 'Đạo đức số', count: 15 },
  { id: 'deck-html', name: 'HTML & CSS', count: 15 },
  { id: 'deck-algo', name: 'Thuật toán', count: 15 },
  { id: 'deck-data', name: 'Dữ liệu & IoT', count: 5 }
];