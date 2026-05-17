// ==========================================
// Lessons Seed Data - Tin12 Pro Cánh Diều
// ==========================================
import { Lesson } from '@/lib/types';

export const lessons: Lesson[] = [
  // ========== COURSE 1: Nền tảng chung ==========
  {
    id: 'lesson-1-1',
    slug: 'kien-truc-may-tinh',
    moduleId: 'mod-1-1',
    courseId: 'course-1',
    title: 'Kiến trúc máy tính và các thành phần',
    description: 'Tìm hiểu về cấu trúc tổng quan của máy tính, các thành phần chính và nguyên lý hoạt động.',
    estimatedMinutes: 45,
    difficulty: 'medium',
    track: 'general',
    order: 1,
    content: {
      learningObjectives: [
        'Mô tả được các thành phần chính của máy tính',
        'Phân biệt được hardware và software',
        'Hiểu được nguyên lý hoạt động cơ bản của CPU, RAM, ROM',
        'Giải thích được chu trình xử lý thông tin'
      ],
      explainLikeNew: 'Máy tính giống như một đội nhóm làm việc cùng nhau: CPU là "bộ não" điều khiển, RAM là "bàn làm việc" chứa dữ liệu đang dùng, ổ cứng là "kho lưu trữ" giữ mọi thứ lâu dài. Tất cả phối hợp để biến điện năng thành công việc.',
      theory: 'Máy tính gồm 4 thành phần chính: (1) Thiết bị nhập - chuột, bàn phím để đưa dữ liệu vào; (2) Thiết bị xuất - màn hình, máy in để hiển thị kết quả; (3) Bộ xử lý trung tâm (CPU) - "bộ não" tính toán và điều khiển; (4) Bộ nhớ - ROM (chỉ đọc) lưu trữ cố định, RAM (đọc/ghi) lưu trữ tạm thời đang làm việc.',
      deepDive: 'CPU hiện đại có nhiều core, mỗi core có thể xử lý song song. Tốc độ CPU được đo bằng Hz (VD: 3.5 GHz = 3.5 tỷ chu kỳ/giây). Bus hệ thống kết nối các thành phần với tốc độ truyền dữ liệu khác nhau. Cache L1/L2/L3 giúp CPU truy xuất nhanh dữ liệu hay dùng.',
      realWorldExamples: [
        'Khi mở Photoshop, dữ liệu từ ổ cứng được nạp vào RAM để CPU xử lý, kết quả hiển thị trên màn hình',
        'RAM 8GB có thể lưu khoảng 8 tỷ bytes = 64 tỷ bits thông tin đang làm việc',
        'SSD tốc độ đọc 500MB/s nhanh gấp 10 lần HDD 5400rpm'
      ],
      visualSummary: 'Nhập (Input) → Xử lý (Process) → Xuất (Output). CPU ↔ RAM ↔ ROM. Mọi thành phần nối qua Bus.',
      commonMistakes: [
        'Nhầm lẫn RAM và ổ cứng - RAM mất điện thì mất hết, ổ cứng vẫn giữ',
        'Tưởng CPU càng GHz càng nhanh - thực ra còn phụ thuộc kiến trúc và số core',
        'Bỏ qua vai trò của ROM trong khởi động máy'
      ],
      quickCheck: [
        {
          question: 'Thành phần nào lưu trữ dữ liệu tạm thời khi máy tính đang chạy?',
          options: ['ROM', 'RAM', 'CPU', 'Ổ cứng'],
          correctAnswer: 1,
          explanation: 'RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên, lưu dữ liệu tạm thời khi máy hoạt động. Mất điện thì RAM mất hết dữ liệu.'
        },
        {
          question: 'CPU có chức năng gì?',
          options: ['Lưu trữ dữ liệu', 'Xử lý tính toán và điều khiển', 'Hiển thị kết quả', 'Nhận dữ liệu từ bàn phím'],
          correctAnswer: 1,
          explanation: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, thực hiện tính toán và điều khiển mọi hoạt động của máy tính.'
        }
      ],
      practice: 'Mở Task Manager (Ctrl+Shift+Esc), quan sát tab Performance để xem CPU, RAM, Disk đang hoạt động. Đếm xem máy bạn có bao nhiêu core, tốc độ bao nhiêu GHz, RAM bao nhiêu GB.',
      examCorner: 'Câu hỏi thi thường hỏi: (1) Phân biệt RAM/ROM, (2) Chức năng CPU, (3) Chu trình xử lý thông tin. Đề thi thường cho hình vẽ mô tả luồng dữ liệu và hỏi thành phần tương ứng.',
      sixtySecondSummary: 'Máy tính gồm 4 phần: nhập, xuất, xử lý (CPU), nhớ (RAM/ROM). CPU là "bộ não" tính toán. RAM lưu tạm, ROM lưu cố định. Chu trình: nhập → xử lý → xuất.',
      flashcards: ['fc-1', 'fc-2', 'fc-3'],
      nextStep: 'Bài tiếp theo sẽ tìm hiểu về phần mềm hệ thống và phân loại phần mềm.'
    }
  },
  {
    id: 'lesson-1-2',
    slug: 'phan-mem-he-thong',
    moduleId: 'mod-1-1',
    courseId: 'course-1',
    title: 'Phần mềm hệ thống và phân loại phần mềm',
    description: 'Hiểu về các loại phần mềm: hệ thống, ứng dụng, tiện ích. Vai trò của hệ điều hành.',
    estimatedMinutes: 35,
    difficulty: 'easy',
    track: 'general',
    order: 2,
    content: {
      learningObjectives: [
        'Phân biệt được phần mềm hệ thống, phần mềm ứng dụng',
        'Hiểu vai trò của hệ điều hành',
        'Liệt kê được một số hệ điều hành phổ biến',
        'Kể tên các loại phần mềm ứng dụng thông dụng'
      ],
      explainLikeNew: 'Phần mềm như "linh hồn" của máy tính. Không có phần mềm, máy tính chỉ là đống phần cứng vô tri. Hệ điều hành như "người quản gia" điều phối mọi hoạt động, giúp phần cứng và phần mềm ứng dụng nói chuyện được với nhau.',
      theory: 'Phần mềm chia làm 2 loại chính: (1) Phần mềm hệ thống - gồm hệ điều hành (Windows, macOS, Linux) và chương trình tiện ích (driver, trình diệt virus); (2) Phần mềm ứng dụng - Word, Excel, Chrome, game... phục vụ nhu cầu cụ thể của người dùng.',
      deepDive: 'Hệ điều hành thực hiện 5 chức năng: (1) Quản lý tài nguyên - phân chia CPU, RAM cho các chương trình; (2) Quản lý file - tổ chức lưu trữ trên đĩa; (3) Giao tiếp người-máy - cửa sổ, icon, menu; (4) Cung cấp môi trường chạy ứng dụng; (5) Bảo mật và quản lý người dùng.',
      realWorldExamples: [
        'Windows 11 là hệ điều hành phổ biến nhất trên PC',
        'Android là hệ điều hành phổ biến nhất trên điện thoại',
        'Microsoft Word là phần mềm ứng dụng dùng để soạn thảo văn bản'
      ],
      visualSummary: 'Phần mềm = Hệ thống (OS: Windows/Linux) + Ứng dụng (Word/Chrome/Games). OS nằm giữa hardware và apps.',
      commonMistakes: [
        'Nhầm lẫn hệ điều hành với phần mềm ứng dụng',
        'Tưởng điện thoại không có hệ điều hành',
        'Không phân biệt được driver thuộc phần mềm hệ thống'
      ],
      quickCheck: [
        {
          question: 'Windows 11 là loại phần mềm nào?',
          options: ['Phần mềm ứng dụng', 'Phần mềm hệ thống', 'Phần cứng', 'Thiết bị ngoại vi'],
          correctAnswer: 1,
          explanation: 'Windows 11 là hệ điều hành, thuộc phần mềm hệ thống, dùng để quản lý và điều khiển máy tính.'
        }
      ],
      practice: 'Mở Control Panel (Windows) hoặc System Preferences (Mac), tìm hiểu các thông tin: phiên bản OS, RAM, CPU. Liệt kê 5 phần mềm ứng dụng đang có trên máy.',
      examCorner: 'Câu hỏi hay gặp: (1) Phân biệt phần mềm hệ thống và ứng dụng, (2) Chức năng hệ điều hành, (3) Ví dụ về các loại phần mềm.',
      sixtySecondSummary: 'Phần mềm chia: hệ thống (OS) và ứng dụng. Hệ điều hành quản lý tài nguyên, giao tiếp người-máy, chạy ứng dụng. Ví dụ: Windows, macOS, Android.',
      flashcards: ['fc-4', 'fc-5'],
      nextStep: 'Tìm hiểu về mạng máy tính và Internet.'
    }
  },

  // ========== COURSE 2: AI và Xã hội Tri thức ==========
  {
    id: 'lesson-2-1',
    slug: 'gioi-thieu-tritue-nhantao',
    moduleId: 'mod-2-1',
    courseId: 'course-2',
    title: 'Giới thiệu Trí tuệ Nhân tạo (AI)',
    description: 'Tổng quan về AI, lịch sử phát triển, các loại AI và ứng dụng trong đời sống.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'cs',
    order: 1,
    content: {
      learningObjectives: [
        'Định nghĩa được Trí tuệ Nhân tạo (AI)',
        'Kể được các mốc quan trọng trong lịch sử AI',
        'Phân biệt được AI hẹp và AI tổng quát',
        'Liệt kê được ứng dụng AI trong đời sống'
      ],
      explainLikeNew: 'AI là cách máy tính bắt chước trí thông minh của con người. Giống như dạy một con robot học cách nhận biết khuôn mặt, hiểu lời nói, hoặc chơi cờ vây. Máy không "nghĩ" như người, nhưng nó học từ dữ liệu để đưa ra quyết định.',
      theory: 'AI (Artificial Intelligence) là ngành khoa học máy tính tập trung xây dựng hệ thống có khả năng thực hiện các tác vụ đòi hỏi trí thông minh con người: nhận dạng, suy luận, học hỏi, ngôn ngữ. AI được chia thành: (1) AI hẹp (Narrow AI) - làm tốt một việc cụ thể; (2) AI tổng quát (AGI) - làm được mọi việc như con người (chưa đạt được).',
      deepDive: 'Các kỹ thuật AI chính: (1) Machine Learning - cho máy học từ dữ liệu; (2) Deep Learning - dùng mạng neural nhiều lớp; (3) NLP - xử lý ngôn ngữ tự nhiên; (4) Computer Vision - nhận dạng hình ảnh. AI còn được phân theo cách học: Học có giám sát (supervised), học không giám sát (unsupervised), học tăng cường (reinforcement).',
      realWorldExamples: [
        'ChatGPT, Gemini là AI xử lý ngôn ngữ',
        'Nhận dạng khuôn mặt trên điện thoại iPhone',
        'Gợi ý sản phẩm trên Shopee, TikTok dựa trên AI',
        'Xe tự lái của Tesla dùng AI nhận diện đối tượng'
      ],
      visualSummary: 'AI = Máy học (ML) + Mạng Neural (Deep Learning) + NLP + Computer Vision. Ứng dụng: chatbot, xe tự lái, gợi ý, nhận dạng.',
      commonMistakes: [
        'Tưởng AI đã thông minh như con người - thực ra AI hẹp chỉ giỏi một việc',
        'Nhầm AI với robot - robot là vật lý, AI là "bộ não"',
        'Nghĩ AI có ý thức - AI chỉ xử lý theo thuật toán'
      ],
      quickCheck: [
        {
          question: 'AI hẹp (Narrow AI) là gì?',
          options: ['AI làm được mọi việc như con người', 'AI chỉ giỏi một việc cụ thể', 'AI có ý thức', 'Robot AI'],
          correctAnswer: 1,
          explanation: 'AI hẹp là hệ thống AI chỉ được thiết kế để làm tốt một tác vụ cụ thể, như nhận dạng khuôn mặt hoặc dịch thuật. Chưa có AI nào đạt mức AI tổng quát (AGI).'
        },
        {
          question: 'Ví dụ nào KHÔNG phải ứng dụng AI?',
          options: ['Chatbot tư vấn', 'Máy tính cầm tay', 'Nhận dạng giọng nói', 'Gợi ý phim Netflix'],
          correctAnswer: 1,
          explanation: 'Máy tính cầm tay tính theo quy tắc cố định, không học từ dữ liệu như AI. Các ví dụ còn lại đều dùng machine learning để cải thiện theo thời gian.'
        }
      ],
      practice: 'Trải nghiệm AI: (1) Dùng Google Lens nhận dạng vật thể, (2) Thử ChatGPT hỏi về chủ đề bất kỳ, (3) Quan sát gợi ý sản phẩm trên marketplace. Ghi lại cách AI "học" từ hành vi của bạn.',
      examCorner: 'Câu hỏi thi thường hỏi: (1) Định nghĩa AI, (2) Phân biệt AI hẹp/tổng quát, (3) Ví dụ ứng dụng AI, (4) Các kỹ thuật ML/DL/NLP. Đề thi thường cho tình huống và hỏi đó có phải AI không, loại AI nào.',
      sixtySecondSummary: 'AI là trí thông minh nhân tạo trên máy tính. AI hẹp giỏi một việc (chatbot, nhận dạng). AI tổng quát làm mọi việc như người - chưa đạt được. Các kỹ thuật: ML, Deep Learning, NLP.',
      flashcards: ['fc-10', 'fc-11', 'fc-12'],
      nextStep: 'Tìm hiểu về Học máy (Machine Learning) - cách máy học từ dữ liệu.'
    }
  },
  {
    id: 'lesson-2-2',
    slug: 'hoc-may-machine-learning',
    moduleId: 'mod-2-1',
    courseId: 'course-2',
    title: 'Học máy (Machine Learning)',
    description: 'Các loại học máy: học có giám sát, học không giám sát, học tăng cường. Ví dụ và ứng dụng.',
    estimatedMinutes: 45,
    difficulty: 'hard',
    track: 'cs',
    order: 2,
    content: {
      learningObjectives: [
        'Giải thích được nguyên lý hoạt động của Machine Learning',
        'Phân biệt được 3 loại học máy',
        'Kể được ví dụ ứng dụng của từng loại',
        'Hiểu khái niệm training data và model'
      ],
      explainLikeNew: 'Học máy giống như dạy một đứa trẻ nhận biết con mèo: cho xem 1000 bức hình mèo, nó sẽ tự tìm ra đặc điểm chung (tai nhọn, râu, 4 chân) để nhận biết mèo mới. Máy không được "dạy" theo kiểu quy tắc, mà tự học từ dữ liệu.',
      theory: 'Machine Learning (ML) là tập con của AI, cho phép máy tự động cải thiện từ kinh nghiệm. 3 loại học chính: (1) Học có giám sát (Supervised) - có dữ liệu label (đáp án), VD: phân loại email spam/not spam; (2) Học không giám sát (Unsupervised) - không có label, máy tự tìm pattern, VD: phân nhóm khách hàng; (3) Học tăng cường (Reinforcement) - học qua thử và sai với reward/penalty, VD: AlphaGo chơi cờ.',
      deepDive: 'Quy trình ML: (1) Thu thập dữ liệu → (2) Tiền xử lý (làm sạch, chuẩn hóa) → (3) Chia train/test → (4) Huấn luyện model → (5) Đánh giá → (6) Cải thiện. Các thuật toán phổ biến: Linear Regression, Decision Tree, Random Forest, Neural Network. Overfitting = model "học vẹt" dữ liệu train, không generalize được.',
      realWorldExamples: [
        'Gmail tự động phân loại email spam = Supervised Learning',
        'Spotify gợi ý nhạc dựa trên sở thích = Collaborative Filtering (Unsupervised)',
        'AlphaGo học chơi cờ bằng cách chơi triệu ván với chính nó = Reinforcement Learning'
      ],
      visualSummary: 'ML = Supervised (có label) + Unsupervised (không label) + Reinforcement (thử-sai). Quy trình: Data → Train → Model → Predict.',
      commonMistakes: [
        'Tưởng ML cần ít dữ liệu - thực ra càng nhiều dữ liệu chất lượng càng tốt',
        'Nhầm lẫn supervised và unsupervised - có/không có label',
        'Không hiểu overfitting - model "nhớ" thay vì "học"'
      ],
      quickCheck: [
        {
          question: 'Phân loại email spam là loại học máy nào?',
          options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Deep Learning'],
          correctAnswer: 0,
          explanation: 'Supervised Learning vì có dữ liệu label (spam/not spam) để train model phân loại.'
        },
        {
          question: 'Thuật toán nào dùng để phân nhóm khách hàng theo hành vi?',
          options: ['Spam detection', 'Customer clustering', 'Speech recognition', 'Face ID'],
          correctAnswer: 1,
          explanation: 'Customer clustering là Unsupervised Learning - máy tự tìm nhóm dựa trên đặc điểm mà không có label sẵn.'
        }
      ],
      practice: 'Dùng Google Teachable Machine (teachablemachine.withgoogle.com) tạo model nhận diện hình ảnh đơn giản. Train với dữ liệu của bạn và test kết quả.',
      examCorner: 'Câu hỏi hay gặp: (1) Định nghĩa và ví dụ từng loại ML, (2) Quy trình huấn luyện model, (3) Phân biệt overfitting/underfitting. Đề thi thường cho tình huống và hỏi nên dùng loại ML nào.',
      sixtySecondSummary: 'ML cho máy tự học từ dữ liệu. Supervised = có label (phân loại). Unsupervised = không label (phân nhóm). Reinforcement = thử-sai (reward). Càng nhiều data càng tốt.',
      flashcards: ['fc-13', 'fc-14', 'fc-15'],
      nextStep: 'Tìm hiểu về Khoa học dữ liệu và vai trò của dữ liệu trong AI.'
    }
  },

  // ========== COURSE 3: Mạng máy tính ==========
  {
    id: 'lesson-3-1',
    slug: 'tong-quan-mang-may-tinh',
    moduleId: 'mod-3-1',
    courseId: 'course-3',
    title: 'Tổng quan về Mạng máy tính',
    description: 'Khái niệm mạng máy tính, phân loại mạng, các thành phần và topology.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'cs',
    order: 1,
    content: {
      learningObjectives: [
        'Định nghĩa được mạng máy tính',
        'Phân biệt được các loại mạng theo phạm vi',
        'Kể được các thành phần của mạng',
        'Mô tả được các topology phổ biến'
      ],
      explainLikeNew: 'Mạng máy tính giống như hệ thống đường giao thông nối các thành phố. Mỗi máy tính là một "thành phố", đường truyền là "đường cao tốc", router là "ngã tư" điều hướng. Nhờ mạng mà máy tính có thể chia sẻ tài nguyên và giao tiếp.',
      theory: 'Mạng máy tính (Computer Network) là hệ thống kết nối các máy tính để chia sẻ tài nguyên và truyền thông. Phân loại theo phạm vi: (1) PAN (Personal) - vài mét, kết nối thiết bị cá nhân; (2) LAN (Local) - vài trăm mét, trong một tòa nhà; (3) MAN (Metropolitan) - vài km, một thành phố; (4) WAN (Wide) - toàn cầu, Internet.',
      deepDive: 'Các thành phần mạng: (1) NIC (Network Interface Card) - card mạng trên máy; (2) Router - định tuyến giữa các mạng; (3) Switch - kết nối các máy trong LAN; (4) Access Point - phát WiFi; (5) Cable/Fiber - đường truyền vật lý. Topology: Bus (chung 1 dây), Star (hub trung tâm), Ring (vòng), Mesh (lưới).',
      realWorldExamples: [
        'WiFi trong nhà là LAN không dây',
        'Internet là WAN toàn cầu',
        'Mạng trường học kết nối các phòng máy là LAN'
      ],
      visualSummary: 'PAN < LAN < MAN < WAN (theo phạm vi). Topology: Bus (1 dây), Star (hub), Ring (vòng), Mesh (lưới). Thiết bị: NIC, Router, Switch.',
      commonMistakes: [
        'Nhầm lẫn router và switch - router nối mạng khác nhau, switch nối máy trong cùng mạng',
        'Tưởng WiFi là mạng không cần thiết bị - Access Point cũng là thiết bị mạng',
        'Không phân biệt được WAN và LAN'
      ],
      quickCheck: [
        {
          question: 'Mạng LAN có đặc điểm gì?',
          options: ['Phạm vi toàn cầu', 'Trong một tòa nhà hoặc khuôn viên', 'Kết nối thiết bị cá nhân', 'Cần satellite'],
          correctAnswer: 1,
          explanation: 'LAN (Local Area Network) có phạm vi nhỏ, thường trong một tòa nhà hoặc khuôn viên trường học, tốc độ cao, chi phí thấp.'
        },
        {
          question: 'Thiết bị nào dùng để kết nối các máy trong cùng một mạng LAN?',
          options: ['Satellite', 'Router', 'Switch', 'Modem'],
          correctAnswer: 2,
          explanation: 'Switch (bộ chuyển mạch) kết nối các máy tính trong cùng một mạng LAN để chúng giao tiếp với nhau. Router kết nối các mạng khác nhau.'
        }
      ],
      practice: 'Mở Command Prompt, gõ "ipconfig" (Windows) hoặc "ifconfig" (Mac/Linux) để xem địa chỉ IP, subnet mask, gateway của máy bạn. Ghi lại và phân tích.',
      examCorner: 'Câu hỏi hay gặy: (1) Phân biệt LAN/WAN/MAN, (2) Chức năng router/switch, (3) Đặc điểm topology. Đề thi thường cho sơ đồ mạng và hỏi thiết bị cần dùng.',
      sixtySecondSummary: 'Mạng kết nối máy tính để chia sẻ tài nguyên. LAN (nhỏ) < MAN (thành phố) < WAN (toàn cầu). Router nối mạng, switch nối máy.',
      flashcards: ['fc-20', 'fc-21', 'fc-22'],
      nextStep: 'Tìm hiểu về giao thức TCP/IP và Internet.'
    }
  },
  {
    id: 'lesson-3-2',
    slug: 'tcp-ip-va-internet',
    moduleId: 'mod-3-1',
    courseId: 'course-3',
    title: 'Giao thức TCP/IP và Internet',
    description: 'Mô hình TCP/IP 4 lớp, địa chỉ IP, DNS, HTTP, cách hoạt động của Internet.',
    estimatedMinutes: 50,
    difficulty: 'hard',
    track: 'cs',
    order: 2,
    content: {
      learningObjectives: [
        'Mô tả được mô hình TCP/IP 4 lớp',
        'Giải thích được cách địa chỉ IP hoạt động',
        'Hiểu được vai trò của DNS, HTTP',
        'Mô tả được quy trình truy cập website'
      ],
      explainLikeNew: 'Khi bạn gõ "google.com", máy tính cần biết địa chỉ IP của Google (VD: 142.250.xx.xx) để gửi gói tin đến. DNS giống như danh bạ điện thoại, chuyển tên miền thành IP. TCP/IP là "ngôn ngữ" máy tính dùng để giao tiếp qua mạng.',
      theory: 'Mô hình TCP/IP gồm 4 lớp: (1) Link (vật lý) - gửi bits qua cable/WiFi; (2) Internet - định tuyến IP; (3) Transport - TCP (tin cậy) / UDP (nhanh); (4) Application - HTTP, FTP, Email. Địa chỉ IP (IPv4) gồm 4 số 0-255, VD: 192.168.1.1. DNS (Domain Name System) chuyển domain → IP.',
      deepDive: 'Quy trình truy cập web: (1) Browser phân giải DNS lấy IP của domain; (2) TCP handshake 3 bước thiết lập kết nối; (3) Gửi HTTP request (GET /page); (4) Server xử lý và trả response; (5) Browser render HTML/CSS/JS. Port phổ biến: HTTP=80, HTTPS=443, FTP=21.',
      realWorldExamples: [
        'Khi gõ "facebook.com", DNS server trả về IP 157.240.xx.xx',
        'HTTPS dùng port 443 với mã hóa SSL/TLS bảo mật dữ liệu',
        'Ping dùng ICMP protocol để kiểm tra kết nối'
      ],
      visualSummary: 'TCP/IP 4 lớp: Link → Internet → Transport (TCP/UDP) → Application (HTTP). DNS chuyển tên → IP. HTTP request/response là cách browser nói chuyện server.',
      commonMistakes: [
        'Nhầm DNS và IP - DNS là "danh bạ", IP là "địa chỉ nhà"',
        'Tưởng HTTP và HTTPS giống nhau - HTTPS có mã hóa',
        'Không hiểu TCP vs UDP - TCP tin cậy nhưng chậm, UDP nhanh nhưng không đảm bảo'
      ],
      quickCheck: [
        {
          question: 'DNS có chức năng gì?',
          options: ['Mã hóa dữ liệu', 'Chuyển tên miền thành địa chỉ IP', 'Kết nối các mạng LAN', 'Tăng tốc độ máy tính'],
          correctAnswer: 1,
          explanation: 'DNS (Domain Name System) hoạt động như "danh bạ điện thoại" của Internet, chuyển đổi tên miền (google.com) thành địa chỉ IP (142.250.xx.xx) để máy tính có thể kết nối.'
        },
        {
          question: 'HTTPS khác HTTP ở điểm nào?',
          options: ['Nhanh hơn', 'Có mã hóa SSL/TLS', 'Chỉ dùng cho trang web', 'Dùng port 80'],
          correctAnswer: 1,
          explanation: 'HTTPS (HyperText Transfer Protocol Secure) sử dụng mã hóa SSL/TLS để bảo mật dữ liệu truyền qua mạng, khác với HTTP không mã hóa.'
        }
      ],
      practice: 'Mở Command Prompt, thực hiện: (1) "ping google.com" xem thời gian phản hồi; (2) "tracert google.com" xem đường đi của gói tin qua các router; (3) "nslookup facebook.com" xem IP của Facebook.',
      examCorner: 'Câu hỏi hay gặp: (1) Mô tả 4 lớp TCP/IP, (2) Vai trò DNS, (3) So sánh TCP/UDP, HTTP/HTTPS, (4) Quy trình truy cập website. Đề thi thường cho tình huống và hỏi giao thức nào được dùng.',
      sixtySecondSummary: 'TCP/IP 4 lớp: Link - Internet - Transport - Application. DNS chuyển tên miền → IP. HTTP/HTTPS là giao thức web, HTTPS có mã hóa. TCP đảm bảo, UDP nhanh.',
      flashcards: ['fc-23', 'fc-24', 'fc-25'],
      nextStep: 'Tìm hiểu về an toàn mạng và đạo đức số.'
    }
  },

  // ========== COURSE 4: HTML/CSS ==========
  {
    id: 'lesson-4-1',
    slug: 'html-co-ban',
    moduleId: 'mod-4-1',
    courseId: 'course-4',
    title: 'HTML cơ bản: Cấu trúc và thẻ',
    description: 'Giới thiệu HTML, cấu trúc trang web, các thẻ HTML phổ biến.',
    estimatedMinutes: 40,
    difficulty: 'easy',
    track: 'ict',
    order: 1,
    content: {
      learningObjectives: [
        'Hiểu được HTML là gì và vai trò của nó',
        'Viết được cấu trúc cơ bản của trang HTML',
        'Sử dụng được các thẻ phổ biến: h1-h6, p, a, img, div',
        'Phân biệt được thẻ block và inline'
      ],
      explainLikeNew: 'HTML giống như bộ xương của trang web. Nó không tạo hình đẹp mà chỉ định nghĩa "đây là tiêu đề", "đây là đoạn văn", "đây là hình ảnh". Trình duyệt đọc HTML rồi vẽ giao diện tương ứng.',
      theory: 'HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản. Cấu trúc cơ bản: <!DOCTYPE html> <html> <head> (metadata) </head> <body> (nội dung) </body> </html>. Các thẻ phổ biến: <h1>-<h6> (tiêu đề), <p> (đoạn văn), <a href=""> (liên kết), <img src=""> (hình ảnh), <div> (khối), <span> (nội dung inline), <ul>/<ol> (danh sách).',
      deepDive: 'HTML5 còn có: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> cho cấu trúc ngữ nghĩa (semantic). Thuộc tính: id, class, style, src, href, alt. Inline elements: span, a, img, strong, em. Block elements: div, p, h1, ul.',
      realWorldExamples: [
        'Mỗi trang web đều bắt đầu bằng <!DOCTYPE html>',
        'Hình ảnh cần alt text để mô tả cho người khuyết tật hoặc khi ảnh không load',
        'Thẻ div thường dùng để chia bố cục trang'
      ],
      visualSummary: '<html> = <head> (meta, title) + <body> (nội dung). Thẻ: h1-h6 (tiêu đề), p (văn), a (link), img (ảnh), div (khối). Block vs inline.',
      commonMistakes: [
        'Quên đóng thẻ - mỗi thẻ mở cần thẻ đóng tương ứng (</p>, </div>)',
        'Nhầm thẻ block và inline - block chiếm full width, inline chỉ chiếm phần cần',
        'Không dùng semantic tags - nên dùng <nav>, <main> thay vì toàn <div>'
      ],
      quickCheck: [
        {
          question: 'Thẻ nào dùng để tạo tiêu đề lớn nhất?',
          options: ['<h6>', '<h1>', '<title>', '<header>'],
          correctAnswer: 1,
          explanation: '<h1> là thẻ tiêu đề lớn nhất trong HTML, thường dùng cho tiêu đề chính của trang. h1→h6 giảm dần độ quan trọng.'
        },
        {
          question: 'Thuộc tính nào cần có trong thẻ img để tăng accessibility?',
          options: ['src', 'href', 'alt', 'class'],
          correctAnswer: 2,
          explanation: 'Thuộc tính alt (alternative text) mô tả nội dung hình ảnh, giúp người dùng đọc màn hình hiểu được ảnh và khi ảnh không load được.'
        }
      ],
      practice: 'Tạo file index.html với: tiêu đề, 2 đoạn văn, 1 hình ảnh (dùng link từ unsplash.com), 1 liên kết đến trang khác, 1 danh sách. Mở bằng trình duyệt để xem kết quả.',
      examCorner: 'Câu hỏi hay gặp: (1) Cấu trúc HTML cơ bản, (2) Phân biệt thẻ block/inline, (3) Thuộc tính thẻ. Đề thi thường cho đoạn code HTML và hỏi sửa lỗi hoặc dự đoán kết quả hiển thị.',
      sixtySecondSummary: 'HTML là ngôn ngữ đánh dấu trang web. Cấu trúc: html > head + body. Thẻ phổ biến: h1-h6, p, a, img, div. Alt text cho hình ảnh.',
      flashcards: ['fc-30', 'fc-31'],
      nextStep: 'Tìm hiểu về CSS và cách tạo kiểu cho trang web.'
    }
  },
  {
    id: 'lesson-4-2',
    slug: 'css-co-ban',
    moduleId: 'mod-4-1',
    courseId: 'course-4',
    title: 'CSS cơ bản: Tạo kiểu cho trang web',
    description: 'Giới thiệu CSS, cách chọn phần tử, thuộc tính phổ biến, box model.',
    estimatedMinutes: 45,
    difficulty: 'easy',
    track: 'ict',
    order: 2,
    content: {
      learningObjectives: [
        'Hiểu được CSS là gì và tại sao cần CSS',
        'Viết được CSS inline, internal và external',
        'Sử dụng được bộ chọn (selector) phổ biến',
        'Áp dụng được box model trong thiết kế'
      ],
      explainLikeNew: 'HTML là xương, CSS là da và quần áo. HTML cho biết "đây là tiêu đề", CSS cho biết "tiêu đề to, màu xanh, font Arial". Không có CSS, trang web chỉ là chữ đen trên nền trắng.',
      theory: 'CSS (Cascading Style Sheets) dùng để tạo kiểu cho HTML. 3 cách thêm CSS: (1) Inline - trong thuộc tính style của thẻ; (2) Internal - trong <style> trong <head>; (3) External - file .css riêng link vào. Selector: element (p {}), class (.name {}), id (#name {}), attribute ([type="text"] {}).',
      deepDive: 'Box model: mỗi phần tử gồm content → padding → border → margin. Thuộc tính phổ biến: color, background, font-size, margin, padding, border, width, height, display. Flexbox và Grid giúp bố cục phức tạp. Responsive với @media queries.',
      realWorldExamples: [
        'Google.com dùng CSS cho header xanh, text rõ ràng, responsive trên điện thoại',
        'Bootstrap là framework CSS phổ biến cung cấp component sẵn',
        'Dark mode thực hiện bằng CSS thay đổi màu nền và text'
      ],
      visualSummary: 'HTML + CSS: element { property: value; }. Box model: content → padding → border → margin. Selector: tag, .class, #id.',
      commonMistakes: [
        'Nhầm padding và margin - padding là khoảng cách trong border, margin là khoảng cách ngoài border',
        'Dùng px cho font-size thay vì rem/em để responsive tốt hơn',
        'Quên reset browser default bằng * { margin: 0; padding: 0; }'
      ],
      quickCheck: [
        {
          question: 'Làm sao chọn tất cả thẻ p có class "text"?',
          options: ['p.text', 'p #text', '.text p', 'p, .text'],
          correctAnswer: 0,
          explanation: 'p.text là class selector, chọn thẻ p có class="text". Không có khoảng trắng giữa p và .text.'
        },
        {
          question: 'Padding khác margin chỗ nào?',
          options: ['Padding ngoài border, margin trong', 'Padding trong border, margin ngoài', 'Không khác nhau', 'Chỉ margin dùng cho flex'],
          correctAnswer: 1,
          explanation: 'Padding là khoảng cách từ content đến border (trong). Margin là khoảng cách từ border ra ngoài (ngoài).'
        }
      ],
      practice: 'Tạo file style.css cho trang index.html: đổi màu tiêu đề, thêm border cho ảnh, căn giữa text, thêm padding cho đoạn văn. Dùng DevTools (F12) inspect và thay đổi CSS để xem kết quả real-time.',
      examCorner: 'Câu hỏi hay gặp: (1) Phân biệt inline/internal/external CSS, (2) Selector và specificity, (3) Box model. Đề thi thường cho đoạn code CSS và hỏi element sẽ hiển thị thế nào.',
      sixtySecondSummary: 'CSS tạo kiểu cho HTML. 3 cách: inline, internal, external. Selector: tag, .class, #id. Box model: content → padding → border → margin.',
      flashcards: ['fc-32', 'fc-33', 'fc-34'],
      nextStep: 'Tìm hiểu về Flexbox và Grid layout.'
    }
  },

  // ========== COURSE 5: Luyện thi THPT ==========
  {
    id: 'lesson-5-1',
    slug: 'cau-truc-de-thi-tn',
    moduleId: 'mod-5-1',
    courseId: 'course-5',
    title: 'Cấu trúc đề thi Tốt nghiệp THPT môn Tin học',
    description: 'Phân tích cấu trúc đề thi, phân bổ điểm, chiến lược làm bài.',
    estimatedMinutes: 35,
    difficulty: 'medium',
    track: 'general',
    order: 1,
    content: {
      learningObjectives: [
        'Nắm vững cấu trúc đề thi tốt nghiệp THPT',
        'Hiểu phân bổ điểm theo phần và chủ đề',
        'Áp dụng chiến lược làm bài hiệu quả',
        'Phân bổ thời gian cho từng phần'
      ],
      explainLikeNew: 'Đề thi như một bản đồ kho báu. Biết trước cấu trúc giúp bạn không mất phương hướng. Phần 1 có 24 câu trắc nghiệm dễ lấy điểm. Phần 2 có 6 câu đúng/sai đòi hỏi suy nghĩ kỹ hơn. 50 phút để hoàn thành, không nên dồn cuối.',
      theory: 'Đề thi TN THPT Tin học gồm 2 phần: (1) Part 1: 24 câu trắc nghiệm (mỗi câu 0.25 điểm = 6 điểm) - kiểm tra kiến thức tổng hợp; (2) Part 2: 6 câu đúng/sai, mỗi câu 4 mệnh đề (mỗi mệnh đề 0.125 điểm, mỗi câu 0.5 điểm = 3 điểm). Tổng 9 điểm, quy đổi 10 điểm.',
      deepDive: 'Chủ đề phân bổ đều: AI/Machine Learning (~3 câu), Mạng máy tính (~3 câu), Đạo đức số (~2 câu), HTML/CSS (~3 câu), Kiến trúc máy tính (~2 câu), Phần mềm (~2 câu), Khoa học dữ liệu (~2 câu), và các chủ đề khác. Độ khó: 40% easy (nhớ hiểu), 40% medium (vận dụng), 20% hard (phân tích).',
      realWorldExamples: [
        'Học sinh làm Part 1 trước để lấy điểm "chắc", Part 2 cần thời gian hơn',
        'Đánh dấu câu khó để quay lại nếu còn thừa thời gian',
        'Không nên bỏ trống câu nào - đánh bừa cũng có cơ hội 25% đúng'
      ],
      visualSummary: 'Part 1: 24 MCQ × 0.25 = 6 điểm. Part 2: 6 câu T/F × 4 mệnh đề × 0.125 = 3 điểm. Tổng 9 điểm (10). Thời gian: 50 phút.',
      commonMistakes: [
        'Bỏ trống câu nào đó vì không biết - nên đoán nếu hết thời gian',
        'Dành quá nhiều thời gian cho 1 câu khó',
        'Đọc không kỹ đề, chọn nhầm đáp án gần giống'
      ],
      quickCheck: [
        {
          question: 'Part 2 gồm bao nhiêu câu và mỗi câu có mấy mệnh đề?',
          options: ['6 câu, 4 mệnh đề', '24 câu, 4 mệnh đề', '30 câu, 1 mệnh đề', '6 câu, 1 mệnh đề'],
          correctAnswer: 0,
          explanation: 'Part 2 có 6 câu đúng/sai, mỗi câu gồm 4 mệnh đề. Thí sinh phải xác định từng mệnh đề đúng hay sai.'
        },
        {
          question: 'Thời gian làm bài thi Tin học TN THPT là bao lâu?',
          options: ['45 phút', '50 phút', '60 phút', '90 phút'],
          correctAnswer: 1,
          explanation: 'Thời gian làm bài là 50 phút cho cả 2 phần. Nên phân bổ khoảng 25-30 phút cho Part 1, 15-20 phút cho Part 2.'
        }
      ],
      practice: 'Làm đề thi thử trong 50 phút. Ghi lại thời gian mỗi phần. Sau khi chấm, phân tích các câu sai và tìm hiểu lại kiến thức.',
      examCorner: 'Câu hỏi thi thường hỏi: (1) Cấu trúc đề, (2) Phân bổ điểm, (3) Độ khó. Phần T/F đòi hỏi hiểu kỹ từng mệnh đề, không nhầm lẫn giữa các mệnh đề trong cùng câu.',
      sixtySecondSummary: 'Đề thi gồm Part 1 (24 MCQ, 6 điểm) và Part 2 (6 câu T/F, 3 điểm). Tổng 50 phút. 40% easy, 40% medium, 20% hard. Đọc kỹ từng mệnh đề.',
      flashcards: ['fc-40', 'fc-41'],
      nextStep: 'Chiến lược làm bài và luyện đề.'
    }
  },

  // Additional lessons for courses
  {
    id: 'lesson-2-3',
    slug: 'hoc-sau-sau-deep-learning',
    moduleId: 'mod-2-1',
    courseId: 'course-2',
    title: 'Học sâu (Deep Learning)',
    description: 'Giới thiệu về Deep Learning, mạng neural, và ứng dụng nhận dạng.',
    estimatedMinutes: 45,
    difficulty: 'hard',
    track: 'cs',
    order: 3,
    content: {
      learningObjectives: [
        'Hiểu khái niệm Deep Learning và mạng neural',
        'Phân biệt được ML và Deep Learning',
        'Kể được ứng dụng của Deep Learning',
        'Hiểu cách mạng neural học từ dữ liệu'
      ],
      explainLikeNew: 'Deep Learning là "học sâu" - dùng nhiều lớp mạng neural xếp chồng để học pattern phức tạp. Giống như não người có nhiều tầng neuron xử lý thông tin, Deep Learning cũng có nhiều "lớp" học dần từ dữ liệu thô đến concepts trừu tượng.',
      theory: 'Deep Learning dùng Neural Network nhiều lớp (deep = nhiều hidden layers). Mỗi layer trích xuất features cao cấp hơn. Input → Hidden Layer 1 → Hidden Layer 2 → ... → Output. CNN (Convolutional NN) cho hình ảnh. RNN cho chuỗi (text, audio). Transformer cho NLP (ChatGPT dùng kiến trúc này).',
      deepDive: 'Training: Forward pass (tính output) → Tính loss (sai số) → Backpropagation (lan truyền ngược, cập nhật weights) → Repeat. Loss function đo sai số. Optimizer (Adam, SGD) cập nhật weights. Overfitting xảy ra khi model "học vẹt" thay vì generalize. Regularization (dropout, L2) giúp giảm overfitting.',
      realWorldExamples: [
        'Face ID trên iPhone dùng CNN nhận dạng khuôn mặt',
        'ChatGPT dùng Transformer với billions parameters',
        'Dịch thuật tự động Google Translate dùng Neural Machine Translation',
        'Xe tự lái dùng Deep Learning nhận diện vật thể'
      ],
      visualSummary: 'Neural Network: Input → [Hidden Layers] → Output. Mỗi node có weight. Training = Adjust weights qua backprop để minimize loss.',
      commonMistakes: [
        'Tưởng Deep Learning luôn tốt hơn ML - cần nhiều data và compute hơn',
        'Không hiểu backprop - thuật toán cập nhật weights',
        'Overfitting - model không generalize được với data mới'
      ],
      quickCheck: [
        {
          question: 'Deep Learning khác Machine Learning ở điểm nào?',
          options: ['Dùng ít dữ liệu hơn', 'Cần ít compute hơn', 'Dùng nhiều lớp mạng neural', 'Không cần training data'],
          correctAnswer: 2,
          explanation: 'Deep Learning dùng nhiều hidden layers (deep) để học features từ thấp đến cao. ML truyền thống thường chỉ có 1-2 layers hoặc dùng features được design thủ công.'
        },
        {
          question: 'CNN thường dùng cho loại dữ liệu nào?',
          options: ['Văn bản', 'Âm thanh', 'Hình ảnh', 'Số liệu bảng'],
          correctAnswer: 2,
          explanation: 'CNN (Convolutional Neural Network) đặc biệt hiệu quả với dữ liệu có spatial structure như hình ảnh, video. Convolution layer tìm features như edges, textures.'
        }
      ],
      practice: 'Dùng Teachable Machine (teachablemachine.withgoogle.com) tạo model image classification. Train với 2-3 classes và test. Quan sát accuracy thay đổi khi thêm training data.',
      examCorner: 'Câu hỏi hay gặp: (1) Định nghĩa Deep Learning, (2) So sánh ML và DL, (3) Ứng dụng CNN/RNN/Transformer, (4) Overfitting và cách xử lý.',
      sixtySecondSummary: 'Deep Learning dùng nhiều lớp neural network. CNN cho ảnh, RNN cho chuỗi, Transformer cho text. Training = forward + loss + backprop. Cần nhiều data và compute.',
      flashcards: ['fc-16', 'fc-17', 'fc-18'],
      nextStep: 'Tìm hiểu về Đạo đức số và an toàn thông tin.'
    }
  },

  {
    id: 'lesson-3-3',
    slug: 'an-toan-mang',
    moduleId: 'mod-3-1',
    courseId: 'course-3',
    title: 'An toàn mạng và bảo mật thông tin',
    description: 'Các mối đe dọa an toàn mạng, cách bảo vệ dữ liệu, mã hóa cơ bản.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'cs',
    order: 3,
    content: {
      learningObjectives: [
        'Nhận biết được các mối đe dọa an toàn mạng',
        'Áp dụng được các biện pháp bảo mật cơ bản',
        'Hiểu khái niệm mã hóa và tầm quan trọng',
        'Kể được các nguyên tắc đạo đức số'
      ],
      explainLikeNew: 'An toàn mạng giống như khóa cửa nhà - không có thì ai cũng có thể vào. Hacker tìm cách đột nhập, lấy cắp dữ liệu, hoặc phá hoại. Mã hóa giống như viết thư bằng mật mã - chỉ người có chìa khóa mới đọc được.',
      theory: 'Các mối đe dọa: (1) Malware - virus, worm, trojan, ransomware; (2) Phishing - lừa đảo qua email/website giả; (3) Man-in-the-middle - chặn thông tin giữa đường; (4) DDoS - tấn công làm quá tải server. Biện pháp: firewall, antivirus, mã hóa, 2FA, backup.',
      deepDive: 'Mã hóa: (1) Symmetric (AES) - cùng 1 key mã hóa và giải mã; (2) Asymmetric (RSA) - public key mã hóa, private key giải mã. HTTPS dùng TLS với certificate authority. Hash (SHA-256) tạo fingerprint dữ liệu không thể đảo ngược. Salt random ngăn rainbow table attack.',
      realWorldExamples: [
        'Ransomware WannaCry mã hóa file và đòi tiền chuộc',
        'Phishing email giả ngân hàng lừa đăng nhập',
        'HTTPS với padlock icon bảo mật kết nối',
        '2FA (2-Factor Authentication) yêu cầu thêm mã từ điện thoại'
      ],
      visualSummary: 'Mối đe dọa: Malware, Phishing, MITM, DDoS. Bảo vệ: Firewall, AV, Encryption, 2FA, Backup. Mã hóa: AES (symmetric), RSA (asymmetric).',
      commonMistakes: [
        'Dùng password yếu hoặc reuse password',
        'Click link lạ trong email - đây là cách phishing phổ biến',
        'Không backup dữ liệu quan trọng',
        'Tin tưởng WiFi công cộng không qua VPN'
      ],
      quickCheck: [
        {
          question: 'Ransomware là gì?',
          options: ['Virus thu thập password', 'Mã độc mã hóa file và đòi tiền', 'Tool hack WiFi', 'Email lừa đảo'],
          correctAnswer: 1,
          explanation: 'Ransomware (mã đòi tiền chuộc) mã hóa toàn bộ file trên máy nạn nhân và yêu cầu trả tiền để lấy lại. Đây là loại malware nguy hiểm nhất gần đây.'
        },
        {
          question: 'HTTPS bảo mật bằng cách nào?',
          options: ['Ẩn địa chỉ IP', 'Mã hóa dữ liệu với TLS/SSL', 'Ngăn chặn virus', 'Tăng tốc độ tải'],
          correctAnswer: 1,
          explanation: 'HTTPS dùng TLS (Transport Layer Security) để mã hóa dữ liệu truyền giữa browser và server, ngăn kẻ tấn công chặn và đọc thông tin.'
        }
      ],
      practice: 'Kiểm tra password strength tại haveibeenpwned.com. Tạo password mới mạnh (>12 ký tự, mix chữ+số+symbol) và lưu trong trình quản lý password. Bật 2FA cho email quan trọng.',
      examCorner: 'Câu hỏi hay gặp: (1) Phân biệt các loại malware, (2) Biện pháp bảo mật, (3) Nguyên lý mã hóa, (4) Đạo đức số - không vi phạm bản quyền, không hack.',
      sixtySecondSummary: 'Mối đe dọa: Malware, Phishing, MITM, DDoS. Bảo vệ: Firewall, AV, Encryption, 2FA, Backup. Mã hóa bảo mật dữ liệu. Đạo đức số: tôn trọng bản quyền, không xâm nhập trái phép.',
      flashcards: ['fc-26', 'fc-27', 'fc-28'],
      nextStep: 'Tìm hiểu về Đạo đức số và các quy định pháp luật.'
    }
  },

  {
    id: 'lesson-4-3',
    slug: 'flexbox-grid-layout',
    moduleId: 'mod-4-1',
    courseId: 'course-4',
    title: 'Flexbox và Grid Layout trong CSS',
    description: 'Học cách bố cục trang web hiện đại với Flexbox và CSS Grid.',
    estimatedMinutes: 50,
    difficulty: 'medium',
    track: 'ict',
    order: 3,
    content: {
      learningObjectives: [
        'Sử dụng được Flexbox để bố cục 1 chiều',
        'Áp dụng được CSS Grid cho bố cục 2 chiều',
        'Kết hợp được Flexbox và Grid trong thiết kế',
        'Tạo được layout responsive không cần media query nhiều'
      ],
      explainLikeNew: 'Trước đây bố cục web phải dùng float và position - như xếp đồ vật bằng tay. Flexbox và Grid giống như có robot sắp xếp tự động - chỉ cần khai báo "đặt đồ bên trái", "chia đều 3 cột" và trình duyệt tự làm.',
      theory: 'Flexbox (display: flex) bố cục 1 chiều (row hoặc column). Thuộc tính: flex-direction, justify-content (trục chính), align-items (trục vuông góc), flex-wrap. Grid (display: grid) bố cục 2 chiều (rows + columns). Thuộc tính: grid-template-columns, grid-template-rows, gap, grid-area.',
      deepDive: 'Flexbox: justify-content: space-between (phân bổ đều), align-items: center (căn giữa cross axis). flex: 1 cho các item chiếm đều không gian. Grid: repeat(3, 1fr) tạo 3 cột bằng nhau. grid-template-areas đặt tên vùng layout. minmax() và auto-fill/auto-fit cho responsive.',
      realWorldExamples: [
        'Navigation bar dùng Flexbox: logo trái, menu phải',
        'Card grid dùng Grid: 3 cards trên 1 row, tự xuống hàng mới',
        'Dashboard layout dùng Grid với header, sidebar, main content'
      ],
      visualSummary: 'Flexbox = 1 chiều (row HOẶC column). justify-content + align-items. Grid = 2 chiều (rows VÀ columns). grid-template-columns/rows.',
      commonMistakes: [
        'Nhầm lẫn justify-content và align-items - JF theo trục main, AI theo cross axis',
        'Dùng Flexbox cho layout phức tạp 2D - nên dùng Grid',
        'Không set flex-wrap cho content dài có thể tràn'
      ],
      quickCheck: [
        {
          question: 'Thuộc tính nào căn giữa phần tử theo chiều ngang trong Flexbox?',
          options: ['align-items: center', 'justify-content: center', 'flex-direction: row', 'flex-wrap: wrap'],
          correctAnswer: 1,
          explanation: 'justify-content căn theo trục chính (main axis). Mặc định main axis là horizontal (row), nên justify-content: center sẽ căn giữa ngang.'
        },
        {
          question: 'Khi nào nên dùng Grid thay vì Flexbox?',
          options: ['Menu ngang đơn giản', 'Layout 2D nhiều hàng và cột', 'Card đơn lẻ', 'Chỉ cần 1 hàng'],
          correctAnswer: 1,
          explanation: 'Grid dùng cho bố cục 2 chiều - khi cần nhiều hàng và nhiều cột. Flexbox tốt cho bố cục 1 chiều như navigation, card list.'
        }
      ],
      practice: 'Tạo layout với: (1) Header dùng Flexbox (logo trái, nav phải); (2) 3-column card grid dùng Grid; (3) Footer đơn giản. Thử resize trình duyệt xem responsive behavior.',
      examCorner: 'Câu hỏi hay gặp: (1) Flexbox vs Grid khi nào dùng, (2) Thuộc tính Flexbox, (3) Tạo layout với Grid. Đề thi thường cho code CSS và hỏi kết quả bố cục.',
      sixtySecondSummary: 'Flexbox cho 1 chiều (row/col). Grid cho 2 chiều (rows+cols). Kết hợp: Grid layout + Flex items bên trong.',
      flashcards: ['fc-35', 'fc-36'],
      nextStep: 'Tìm hiểu về Responsive Design và Media Queries.'
    }
  },

  {
    id: 'lesson-1-3',
    slug: 'he-thong-so-va-ma-hoa',
    moduleId: 'mod-1-1',
    courseId: 'course-1',
    title: 'Hệ thống số và mã hóa thông tin',
    description: 'Hệ nhị phân, thập lục phân, cách máy tính biểu diễn dữ liệu.',
    estimatedMinutes: 45,
    difficulty: 'hard',
    track: 'general',
    order: 3,
    content: {
      learningObjectives: [
        'Chuyển đổi được giữa hệ nhị phân và thập phân',
        'Hiểu được cách máy tính biểu diễn ký tự (ASCII, Unicode)',
        'Giải thích được đơn vị đo thông tin',
        'Phân biệt được các loại mã hóa'
      ],
      explainLikeNew: 'Máy tính chỉ hiểu 2 trạng thái: bật (1) và tắt (0). Hệ nhị phân giống như công tắc đèn - mỗi công tắc là 1 bit. 8 bits = 1 byte. Máy dùng nhị phân để biểu diễn mọi thứ: số, chữ, hình ảnh.',
      theory: 'Hệ nhị phân (base 2): chỉ có 0 và 1. Mỗi số gọi là bit. 8 bits = 1 byte. 1024 bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB. Hệ thập lục phân (base 16): 0-9, A-F. Dùng cho địa chỉ bộ nhớ, màu sắc (#RRGGBB). ASCII 8-bit cho ký tự tiếng Anh. Unicode 16/32-bit cho ký tự quốc tế.',
      deepDive: 'Chuyển đổi: Thập phân → Nhị phân: chia 2 lấy dư. VD: 13 → 1101 (13 = 8+4+1 = 1×8 + 1×4 + 0×2 + 1×1). Nhị phân → Thập phân: cộng 2^n × bit. ASCII: A=65, a=97, 0=48. UTF-8 dùng 1-4 bytes cho ký tự Unicode.',
      realWorldExamples: [
        'Màu #FF0000 là đỏ trong hex (R=FF, G=00, B=00)',
        'Ký tự "A" trong máy tính là 01000001 (65 thập phân)',
        'File ảnh 5MB = 5 × 1024 × 1024 bytes ≈ 5.2 triệu bytes'
      ],
      visualSummary: 'Bit (0/1) → Byte (8 bits) → KB → MB → GB. Nhị phân: 1010 = 10 thập phân. ASCII/Unicode: ký tự → số.',
      commonMistakes: [
        'Nhầm 1KB = 1000 bytes - thực ra 1KB = 1024 bytes (2^10)',
        'Quên rằng hex dùng chữ A-F cho 10-15',
        'Không hiểu tại sao cần Unicode thay vì ASCII'
      ],
      quickCheck: [
        {
          question: 'Số 25 trong hệ nhị phân là gì?',
          options: ['11001', '10011', '11101', '11010'],
          correctAnswer: 0,
          explanation: '25 = 16 + 8 + 1 = 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 11001 (nhị phân). Cách tính: 25/2=12 dư 1, 12/2=6 dư 0, 6/2=3 dư 0, 3/2=1 dư 1, 1/2=0 dư 1 → đọc ngược: 11001.'
        },
        {
          question: '1 byte bằng bao nhiêu bit?',
          options: ['4', '8', '16', '1024'],
          correctAnswer: 1,
          explanation: '1 byte = 8 bits. Mỗi bit là 0 hoặc 1. 8 bits có thể biểu diễn 256 giá trị (2^8).'
        }
      ],
      practice: 'Dùng calculator hoặc viết code chuyển đổi: (1) 172 → nhị phân; (2) 11101101 → thập phân; (3) Tra cứu mã ASCII của ký tự tên bạn.',
      examCorner: 'Câu hỏi hay gặp: (1) Chuyển đổi nhị phân/thập phân, (2) Tính kích thước file, (3) Mã ASCII/Unicode. Đề thi thường cho số nhị phân và hỏi giá trị thập phân.',
      sixtySecondSummary: 'Máy tính dùng nhị phân (0/1). 8 bits = 1 byte. 1024 bytes = 1KB. Chuyển đổi: chia 2 lấy dư (thập phân→nhị phân). ASCII/Unicode: ký tự thành số.',
      flashcards: ['fc-6', 'fc-7', 'fc-8'],
      nextStep: 'Tìm hiểu về thuật toán và lập trình cơ bản.'
    }
  },

  {
    id: 'lesson-2-4',
    slug: 'ky-thuat-so-va-xu-ly-du-lieu',
    moduleId: 'mod-2-2',
    courseId: 'course-2',
    title: 'Kỹ thuật số và xử lý dữ liệu',
    description: 'Cách thu thập, làm sạch, phân tích dữ liệu. Giới thiệu Data Science.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'cs',
    order: 4,
    content: {
      learningObjectives: [
        'Hiểu quy trình xử lý dữ liệu',
        'Nhận biết được dữ liệu chất lượng vs không chất lượng',
        'Áp dụng được các bước làm sạch dữ liệu',
        'Kể được ứng dụng của Data Science'
      ],
      explainLikeNew: 'Dữ liệu thô giống như quặng vàng - cần khai thác và tinh luyện mới có giá trị. Data Science là "nghề" tìm pattern có ý nghĩa trong dữ liệu. VD: phân tích hành vi mua hàng để đề xuất sản phẩm.',
      theory: 'Quy trình Data Science: (1) Thu thập (web scraping, sensor, survey); (2) Làm sạch (remove duplicates, handle missing values, outliers); (3) Phân tích (thống kê, visualization); (4) Model (ML để predict); (5) Insight (kết luận, recommendations). Dữ liệu có 3 loại: có cấu trúc (database), bán cấu trúc (JSON), không cấu trúc (text, image).',
      deepDive: 'Data quality: Accuracy (đúng), Completeness (đủ), Consistency (nhất quán), Timeliness (cập nhật). Làm sạch: drop duplicates, fillNA, normalize, encode categorical. Visualization: bar chart, histogram, scatter plot, heatmap. Metrics: mean, median, std, correlation.',
      realWorldExamples: [
        'Shopee phân tích lịch sử mua hàng để gợi ý sản phẩm',
        'Bệnh viện dùng data để dự đoán bệnh nhân có nguy cơ tái nhập',
        'Thành phố thông minh dùng sensor data để điều chỉnh giao thông'
      ],
      visualSummary: 'Thu thập → Làm sạch → Phân tích → Model → Insight. Data: structured (bảng), semi-structured (JSON), unstructured (văn bản).',
      commonMistakes: [
        'Bỏ qua bước làm sạch - dữ liệu bẩn cho kết quả sai',
        'Nhầm mean và median - median không bị ảnh hưởng bởi outlier',
        'Overfitting model - đánh giá trên data mới'
      ],
      quickCheck: [
        {
          question: 'Bước nào quan trọng nhất trong Data Science?',
          options: ['Visualization đẹp', 'Thu thật nhiều data', 'Làm sạch dữ liệu', 'Train model phức tạp'],
          correctAnswer: 2,
          explanation: 'Làm sạch dữ liệu (data cleaning) là bước quan trọng nhất. Dữ liệu bẩn (trùng, thiếu, sai) dẫn đến kết quả phân tích và model sai lệch, dù có thuật toán tốt đến đâu.'
        },
        {
          question: 'Mean và median khác nhau khi nào?',
          options: ['Luôn giống nhau', 'Khi có outlier (giá trị cực đoan)', 'Khi data đều', 'Khi không có missing'],
          correctAnswer: 1,
          explanation: 'Mean (trung bình) bị ảnh hưởng mạnh bởi outlier, median (giá trị giữa) thì không. VD: [1,2,3,4,100] → mean=22, median=3.'
        }
      ],
      practice: 'Dùng Google Sheets hoặc Excel: (1) Tạo dataset 100 rows (VD: điểm thi); (2) Thêm duplicates và missing values; (3) Làm sạch và tính thống kê; (4) Vẽ biểu đồ histogram.',
      examCorner: 'Câu hỏi hay gặp: (1) Quy trình Data Science, (2) Phân biệt data types, (3) Data quality. Đề thi thường cho tình huống phân tích data và hỏi bước tiếp theo.',
      sixtySecondSummary: 'Data Science: thu thập → làm sạch → phân tích → model → insight. Làm sạch là bước quan trọng nhất. Mean bị outlier ảnh hưởng, median thì không.',
      flashcards: ['fc-19'],
      nextStep: 'Học cách trình bày dữ liệu và trực quan hóa.'
    }
  },

  {
    id: 'lesson-3-4',
    slug: 'mang-xa-hoi-va-cong-nghe',
    moduleId: 'mod-3-2',
    courseId: 'course-3',
    title: 'Mạng xã hội và Công nghệ trong đời sống',
    description: 'Tác động của mạng xã hội, social media, và công nghệ số.',
    estimatedMinutes: 35,
    difficulty: 'easy',
    track: 'general',
    order: 4,
    content: {
      learningObjectives: [
        'Phân tích được tác động tích cực và tiêu cực của mạng xã hội',
        'Nhận biết được các vấn đề đạo đức số',
        'Áp dụng được nguyên tắc sử dụng mạng xã hội an toàn',
        'Hiểu khái niệm digital citizenship'
      ],
      explainLikeNew: 'Mạng xã hội như con dao - có thể dùng nấu ăn ngon hoặc gây thương tích. Facebook, TikTok, YouTube kết nối người nhưng cũng gây nghiện, tin giả, và bắt nạt. Biết cách dùng là chìa khóa.',
      theory: 'Mạng xã hội (Social Media) là nền tảng cho phép người dùng tạo, chia sẻ nội dung và tương tác. Tác động tích cực: kết nối, học hỏi, tiếp cận thông tin. Tác động tiêu cực: nghiện internet, tin giả (fake news), cyberbullying, privacy breach. Digital Citizenship = cách sử dụng công nghệ có trách nhiệm.',
      deepDive: 'Thuật toán social media: content được prioritize dựa trên engagement (likes, shares, comments). Echo chamber effect: người dùng chỉ thấy nội dung đồng ý kiến. Filter bubble: cá nhân hóa feed tạo "bong bóng" thông tin. Doomscrolling: cuộn vô tận gây nghiện.',
      realWorldExamples: [
        'TikTok algorithm gây nghiện với video ngắn',
        'Facebook bị phạt vì scandal Cambridge Analytica (privacy)',
        'YouTube khuyến khích xem liên tục với autoplay',
        'Twitter spread tin giả trong các cuộc bầu cử'
      ],
      visualSummary: 'Social media: kết nối + thông tin - nhưng có nghiện + tin giả + privacy. Digital citizenship = sử dụng có trách nhiệm.',
      commonMistakes: [
        'Đăng thông tin cá nhân công khai (địa chỉ, số điện thoại)',
        'Chia sẻ tin tức chưa kiểm chứng',
        'Like/comment khi chưa suy nghĩ kỹ',
        'So sánh cuộc sống thật với "showreel" trên mạng'
      ],
      quickCheck: [
        {
          question: 'Thuật toán mạng xã hội ưu tiên nội dung nào?',
          options: ['Nội dung mới nhất', 'Nội dung được nhiều tương tác', 'Nội dung từ bạn bè thân', 'Nội dung ngẫu nhiên'],
          correctAnswer: 1,
          explanation: 'Thuật toán social media ưu tiên nội dung có nhiều engagement (likes, shares, comments, watch time) vì điều này giữ người dùng online lâu hơn, tạo more ad revenue.'
        },
        {
          question: 'Digital citizenship nghĩa là gì?',
          options: ['Có nhiều bạn online', 'Sử dụng công nghệ có trách nhiệm và an toàn', 'Có nhiều tài khoản mạng xã hội', 'Biết lập trình'],
          correctAnswer: 1,
          explanation: 'Digital citizenship (công dân số) là cách sử dụng công nghệ và internet một cách có trách nhiệm, đạo đức và an toàn. Bao gồm: bảo vệ privacy, không gây hại, kiểm chứng thông tin.'
        }
      ],
      practice: 'Kiểm tra privacy settings trên Facebook/TikTok. Tắt personalized ads. Xóa các app không dùng. Kiểm tra xem thông tin cá nhân đã bị leak trên haveibeenpwned.com chưa.',
      examCorner: 'Câu hỏi hay gặp: (1) Tác động tích cực/tiêu cực của social media, (2) Nguyên tắc đạo đức số, (3) Digital citizenship. Đề thi thường cho tình huống và hỏi nên làm gì.',
      sixtySecondSummary: 'Social media: kết nối nhưng có nghiện, tin giả, privacy. Digital citizenship = sử dụng có trách nhiệm. Kiểm chứng thông tin, bảo vệ privacy.',
      flashcards: ['fc-29'],
      nextStep: 'Học về HTML/CSS nâng cao và Responsive Design.'
    }
  },

  {
    id: 'lesson-4-4',
    slug: 'responsive-design',
    moduleId: 'mod-4-1',
    courseId: 'course-4',
    title: 'Responsive Design và Media Queries',
    description: 'Thiết kế web hiển thị tốt trên mọi thiết bị: desktop, tablet, mobile.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'ict',
    order: 4,
    content: {
      learningObjectives: [
        'Hiểu khái niệm Responsive Design',
        'Viết được Media Queries cho các breakpoint',
        'Sử dụng được đơn vị tương đối (rem, %, vw/vh)',
        'Apply được mobile-first approach'
      ],
      explainLikeNew: 'Trang web cần "biết变形" - trên máy tính thì 3 cột, trên điện thoại thì 1 cột. Responsive giống như nước - tự đổ vào bình nào thì có hình dạng đó. CSS giúp trang web thích ứng với kích thước màn hình.',
      theory: 'Responsive Design = thiết kế web tự thích ứng với kích thước màn hình. Mobile-first = thiết kế cho mobile trước, rồi scale up cho tablet/desktop. Media queries: @media (max-width: 768px) { ... }. Breakpoints phổ biến: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).',
      deepDive: 'Viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">. Đơn vị tương đối: rem (theo root font-size), em (theo parent), % (theo parent), vw/vh (viewport). Container queries: @container (max-width: 500px). Flexible images: max-width: 100%.',
      realWorldExamples: [
        'Google.com tự động chuyển sang giao diện mobile khi thu nhỏ',
        'Airbnb responsive: menu hamburger trên mobile, navbar đầy đủ trên desktop',
        'Bootstrap grid: col-12 trên mobile, col-4 trên desktop'
      ],
      visualSummary: 'Mobile-first: CSS cho mobile trước, dùng min-width để scale up. @media (min-width: 768px) { tablet+ }. @media (min-width: 1024px) { desktop+ }.',
      commonMistakes: [
        'Dùng px cố định thay vì rem/% cho responsive',
        'Quên viewport meta tag gây mobile không zoom được',
        'Chỉ test trên desktop mà không test mobile thực'
      ],
      quickCheck: [
        {
          question: 'Viewport meta tag có tác dụng gì?',
          options: ['Tăng tốc độ tải', 'Cho phép zoom và responsive trên mobile', 'Cải thiện SEO', 'Bảo mật hơn'],
          correctAnswer: 1,
          explanation: 'Viewport meta tag báo cho browser biết trang cần responsive. Không có nó, mobile sẽ hiển thị desktop version và zoom out rất nhỏ.'
        },
        {
          question: 'Khi nào nên dùng @media (max-width)?',
          options: ['Khi muốn áp dụng style cho màn hình NHỎ HƠN breakpoint', 'Khi muốn áp dụng cho màn hình lớn', 'Chỉ dùng cho print', 'Không bao giờ dùng'],
          correctAnswer: 0,
          explanation: 'max-width breakpoint áp dụng style khi màn hình nhỏ hơn hoặc bằng giá trị đó. VD: @media (max-width: 768px) { ... } = áp dụng cho mobile và tablet.'
        }
      ],
      practice: 'Tạo trang với: (1) Desktop: 3 columns; (2) Tablet: 2 columns; (3) Mobile: 1 column. Dùng DevTools toggle device toolbar (Ctrl+Shift+M) để test.',
      examCorner: 'Câu hỏi hay gặp: (1) Khái niệm responsive, (2) Viết media query, (3) Đơn vị rem/%. Đề thi thường cho code và hỏi breakpoint nào áp dụng.',
      sixtySecondSummary: 'Responsive = web tự thích ứng mọi màn hình. Mobile-first: thiết kế mobile trước, dùng min-width scale up. Viewport meta tag bắt buộc.',
      flashcards: ['fc-37', 'fc-38'],
      nextStep: 'Học về JavaScript cơ bản và tạo tương tác cho web.'
    }
  },

  {
    id: 'lesson-1-4',
    slug: 'thuat-toan-va-su-phan-biet',
    moduleId: 'mod-1-2',
    courseId: 'course-1',
    title: 'Thuật toán và Sự phân loại phần mềm',
    description: 'Khái niệm thuật toán, các bước giải quyết vấn đề, phân loại phần mềm.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'general',
    order: 4,
    content: {
      learningObjectives: [
        'Định nghĩa được thuật toán và vai trò',
        'Mô tả được các bước giải quyết vấn đề',
        'Phân biệt được các loại phần mềm',
        'Áp dụng tư duy thuật toán vào bài toán thực tế'
      ],
      explainLikeNew: 'Thuật toán là "công thức nấu ăn" cho máy tính. VD: công thức làm trứng chiên: (1) Đập trứng, (2) Đánh trứng, (3) Chiên. Tương tự, thuật toán là các bước tuần tự để giải quyết vấn đề.',
      theory: 'Thuật toán là dãy các bước tuần tự để giải quyết vấn đề. Tính chất: (1) Xác định - mỗi bước rõ ràng; (2) Hữu hạn - có điểm kết thúc; (3) Đúng đắn - cho kết quả đúng. Các cấu trúc: tuần tự (sequential), rẽ nhánh (if/else), lặp (loop). Phân loại phần mềm: theo chức năng (ứng dụng, hệ thống), theo giấy phép (proprietary, open source).',
      deepDive: 'Độ phức tạp thuật toán: O(1) < O(log n) < O(n) < O(n log n) < O(n²). Tìm kiếm tuyến tính O(n), tìm kiếm nhị phân O(log n) trên mảng đã sắp xếp. Sắp xếp: bubble sort O(n²), quicksort O(n log n). Thuật toán heuristic giải bài toán NP-khó trong thời gian chấp nhận được.',
      realWorldExamples: [
        'Google Maps tìm đường ngắn nhất dùng thuật toán Dijkstra',
        'Sort trong Excel dùng quicksort/mergesort',
        'Recommender system dùng collaborative filtering algorithm'
      ],
      visualSummary: 'Thuật toán: Input → [Bước 1] → [Bước 2] → ... → Output. Cấu trúc: tuần tự, rẽ nhánh (if), lặp (for/while). Độ phức tạp: O(1) đến O(n²).',
      commonMistakes: [
        'Nhầm thuật toán với code - thuật toán là ý tưởng, code là hiện thực',
        'Tưởng thuật toán luôn phải tối ưu - đôi khi heuristic đủ tốt',
        'Không hiểu tại sao binary search cần mảng đã sắp xếp'
      ],
      quickCheck: [
        {
          question: 'Thuật toán có đặc điểm gì?',
          options: ['Không có điểm kết thúc', 'Không cần input', 'Có thể diễn tả bằng ngôn ngữ tự nhiên', 'Chỉ chạy trên máy tính'],
          correctAnswer: 2,
          explanation: 'Thuật toán có thể diễn tả bằng ngôn ngữ tự nhiên, sơ đồ khối, hoặc code. Nó cần input, có điểm kết thúc, và cho output đúng.'
        },
        {
          question: 'Tìm kiếm nhị phân (binary search) cần điều kiện gì?',
          options: ['Mảng có thứ tự', 'Mảng ngẫu nhiên', 'Không cần điều kiện', 'Mảng có nhiều phần tử trùng lặp'],
          correctAnswer: 0,
          explanation: 'Binary search chỉ hoạt động trên mảng đã sắp xếp. Nó liên tục chia đôi phạm vi tìm kiếm, giảm độ phức tạp từ O(n) xuống O(log n).'
        }
      ],
      practice: 'Viết thuật toán bằng lời cho: (1) Tìm số lớn nhất trong 10 số; (2) Kiểm tra password mạnh; (3) Tính điểm trung bình và xếp loại. Dùng sơ đồ khối (flowchart) minh họa.',
      examCorner: 'Câu hỏi hay gặp: (1) Định nghĩa thuật toán, (2) Phân biệt cấu trúc tuần tự/rẽ nhánh/lặp, (3) Độ phức tạp. Đề thi thường cho tình huống và yêu cầu mô tả thuật toán.',
      sixtySecondSummary: 'Thuật toán = các bước giải quyết vấn đề. Cấu trúc: tuần tự, rẽ nhánh, lặp. Binary search O(log n) trên mảng đã sắp. Thuật toán có thể diễn tả = ngôn ngữ tự nhiên.',
      flashcards: ['fc-9'],
      nextStep: 'Học về cơ sở dữ liệu và hệ quản trị CSDL.'
    }
  },

  {
    id: 'lesson-1-5',
    slug: 'co-so-du-lieu-va-he-quan-tri',
    moduleId: 'mod-1-2',
    courseId: 'course-1',
    title: 'Cơ sở dữ liệu và Hệ quản trị CSDL',
    description: 'Khái niệm CSDL, hệ quản trị, mô hình dữ liệu quan hệ.',
    estimatedMinutes: 45,
    difficulty: 'hard',
    track: 'general',
    order: 5,
    content: {
      learningObjectives: [
        'Hiểu khái niệm CSDL và vai trò',
        'Phân biệt được DBMS và database',
        'Mô tả được mô hình dữ liệu quan hệ',
        'Viết được câu truy vấn SQL đơn giản'
      ],
      explainLikeNew: 'CSDL như tủ hồ sơ có tổ chức - thay vì đống giấy lộn, có ngăn, nhãn, và quy tắc tìm kiếm. Hệ quản trị CSDL (DBMS) như phần mềm quản lý tủ đó, giúp thêm/sửa/xóa/tìm kiếm nhanh chóng.',
      theory: 'Cơ sở dữ liệu (Database) là tập hợp dữ liệu có tổ chức. DBMS (Database Management System) là phần mềm quản lý: MySQL, PostgreSQL, SQL Server. Mô hình quan hệ (Relational): dữ liệu trong bảng (table) có hàng (row/record) và cột (column/field). Khóa chính (Primary Key) xác định duy nhất mỗi hàng.',
      deepDive: 'SQL (Structured Query Language): SELECT * FROM table WHERE condition; INSERT INTO table VALUES ...; UPDATE table SET ... WHERE ...; DELETE FROM table WHERE .... Relationship: One-to-One (1-1), One-to-Many (1-N), Many-to-Many (N-N) qua bảng trung gian. Normalization giảm redundancy.',
      realWorldExamples: [
        'Facebook lưu thông tin user, post, comment trong database',
        'Ngân hàng lưu tài khoản, giao dịch trong database',
        'School management system lưu điểm, lịch, học sinh'
      ],
      visualSummary: 'Database = Tables (hàng + cột). DBMS = phần mềm quản lý. SQL = ngôn ngữ truy vấn. Primary Key = ID duy nhất.',
      commonMistakes: [
        'Nhầm database và DBMS - database là dữ liệu, DBMS là phần mềm',
        'Quên đặt Primary Key - dẫn đến trùng lặp dữ liệu',
        'Dùng SELECT * thay vì chỉ định cột cần - chậm performance'
      ],
      quickCheck: [
        {
          question: 'Primary Key có đặc điểm gì?',
          options: ['Có thể trùng lặp', 'Giá trị duy nhất cho mỗi hàng', 'Có thể NULL', 'Chỉ là số'],
          correctAnswer: 1,
          explanation: 'Primary Key là trường (column) có giá trị DUY NHẤT cho mỗi record, không được NULL. VD: Mã học sinh, CCCD. Giúp phân biệt các hàng và xây dựng relationship.'
        },
        {
          question: 'Câu lệnh SQL nào dùng để lấy dữ liệu?',
          options: ['INSERT', 'SELECT', 'DELETE', 'UPDATE'],
          correctAnswer: 1,
          explanation: 'SELECT dùng để truy vấn và lấy dữ liệu từ bảng. VD: SELECT ten, diem FROM hoc_sinh WHERE diem > 8; lấy tên và điểm của học sinh có điểm > 8.'
        }
      ],
      practice: 'Dùng SQLite Browser hoặc sqlfiddle.com: (1) Tạo bảng hoc_sinh (id, ten, diem); (2) Thêm 5 records; (3) Viết SELECT lấy điểm > 7; (4) Viết UPDATE đổi điểm một học sinh.',
      examCorner: 'Câu hỏi hay gặp: (1) Khái niệm CSDL, DBMS, (2) Viết SELECT WHERE, (3) Relationship. Đề thi thường cho bảng và hỏi kết quả truy vấn.',
      sixtySecondSummary: 'CSDL lưu dữ liệu có tổ chức. DBMS quản lý CSDL. Bảng có hàng và cột. Primary Key = ID duy nhất. SQL SELECT lấy dữ liệu.',
      flashcards: ['fc-9'],
      nextStep: 'Ôn tập và luyện đề tổng hợp.'
    }
  },

  {
    id: 'lesson-5-2',
    slug: 'luyen-de-tn-phan-1',
    moduleId: 'mod-5-1',
    courseId: 'course-5',
    title: 'Luyện đề - Phần 1: Kiến thức tổng hợp',
    description: 'Giải đề thi mẫu phần kiến thức tổng hợp, phân tích các câu hay gặp.',
    estimatedMinutes: 60,
    difficulty: 'hard',
    track: 'general',
    order: 2,
    content: {
      learningObjectives: [
        'Làm quen với format đề thi',
        'Phân tích các dạng câu hỏi hay gặp',
        'Áp dụng chiến lược làm bài hiệu quả',
        'Cải thiện tốc độ và độ chính xác'
      ],
      explainLikeNew: 'Luyện đề như tập thể dục - càng chạy nhiều càng quen thở. Làm đề giúp bạn: (1) Biết mình yếu chỗ nào; (2) Quen format; (3) Tăng tốc; (4) Giảm căng thẳng ngày thi thật.',
      theory: 'Phần 1 gồm 24 câu trắc nghiệm kiến thức tổng hợp. Thời gian khuyến nghị: 25-30 phút. Các chủ đề phân bổ đều: AI, Mạng, HTML/CSS, Kiến trúc, Phần mềm. Độ khó: 40% easy, 40% medium, 20% hard. Đọc kỹ đề, loại trừ đáp án sai.',
      deepDive: 'Chiến lược làm bài: (1) Đọc lướt đề - xác định chủ đề; (2) Làm câu easy trước - lấy điểm chắc; (3) Câu khó đánh dấu, quay lại sau; (4) Không để trống - đoán nếu không biết. Loại trừ: loại 2 đáp án sai, còn 2 chọn 1.',
      realWorldExamples: [
        'Câu AI hỏi về ML/DL - thường là easy, chỉ cần nhớ định nghĩa',
        'Câu HTML/CSS hỏi tag/selector - medium, cần hiểu cách hoạt động',
        'Câu phức tạp hỏi thuật toán - hard, cần suy luận nhiều bước'
      ],
      visualSummary: '24 MCQ = 6 điểm. Thời gian: 25-30 phút. Easy (9-10 câu) → Medium (9-10 câu) → Hard (4-5 câu). Chiến lược: easy trước, đánh dấu khó.',
      commonMistakes: [
        'Đọc không kỹ - chọn đáp án gần đúng thay vì đúng',
        'Bị stuck ở câu khó - tốn thời gian không có kết quả',
        'Không kiểm tra lại - đáng ra đúng nhưng nhầm đáp án'
      ],
      quickCheck: [
        {
          question: 'Nên làm câu nào trước trong Part 1?',
          options: ['Câu khó trước để lấy điểm cao', 'Câu easy trước để lấy điểm chắc', 'Câu nào cũng được', 'Câu cuối trước'],
          correctAnswer: 1,
          explanation: 'Nên làm câu easy trước để lấy điểm chắc, không bị stuck. Câu khó đánh dấu, quay lại nếu còn thừa thời gian.'
        },
        {
          question: 'Khi không biết đáp án, nên làm gì?',
          options: ['Bỏ trống', 'Đoán ngẫu nhiên', 'Loại trừ và đoán có cơ sở', 'Chọn đáp án đầu tiên'],
          correctAnswer: 2,
          explanation: 'Luôn loại trừ 2 đáp án sai nếu có thể, sau đó đoán có cơ sở giữa 2 đáp án còn lại. Xác suất đúng tăng từ 25% lên 50%.'
        }
      ],
      practice: 'Làm đề thi thử 50 phút. Chấm điểm. Phân tích câu sai: (1) Sai vì không biết? (2) Sai vì nhầm? (3) Sai vì đọc lướt? Ghi lại và ôn lại kiến thức yếu.',
      examCorner: 'Câu hay gặp: (1) Định nghĩa AI/ML, (2) TCP/IP layer, (3) HTML tag, (4) Box model. Đề thi thường có 40% câu nhớ hiểu, 40% vận dụng, 20% phân tích.',
      sixtySecondSummary: 'Part 1: 24 MCQ = 6 điểm, 25-30 phút. Làm easy trước, đánh dấu khó. Loại trừ 2 đáp án sai rồi đoán. Không để trống.',
      flashcards: ['fc-42', 'fc-43'],
      nextStep: 'Luyện đề Part 2: Câu đúng/sai.'
    }
  },

  {
    id: 'lesson-5-3',
    slug: 'luyen-de-tn-phan-2',
    moduleId: 'mod-5-1',
    courseId: 'course-5',
    title: 'Luyện đề - Phần 2: Câu đúng/sai (T/F)',
    description: 'Chiến lược làm Part 2, phân tích từng mệnh đề, tránh bẫy.',
    estimatedMinutes: 60,
    difficulty: 'hard',
    track: 'general',
    order: 3,
    content: {
      learningObjectives: [
        'Hiểu cấu trúc Part 2 với 6 câu đúng/sai',
        'Phân tích từng mệnh đề trong câu T/F',
        'Áp dụng chiến lược tránh bẫy',
        'Tính điểm và đánh giá kết quả'
      ],
      explainLikeNew: 'Part 2 khó hơn Part 1 vì mỗi câu có 4 mệnh đề - tưởng 1 câu nhưng thực ra là 4 câu nhỏ. Đánh giá sai 1 mệnh đề = sai cả câu. Cần đọc từng mệnh đề thật kỹ, không chủ quan.',
      theory: 'Part 2 gồm 6 câu đúng/sai, mỗi câu có 4 mệnh đề (A, B, C, D). Mỗi mệnh đề đúng/sai = 0.125 điểm. Câu đúng hoàn toàn (4/4) = 0.5 điểm. Điểm Part 2 = tổng mệnh đề đúng × 0.125. Sai 1 mệnh đề trong 4 → câu không được điểm tối đa.',
      deepDive: 'Bẫy thường gặp: (1) "luôn luôn" / "không bao giờ" → thường sai; (2) Mệnh đề đầu đúng nhưng mệnh đề sau sai → cả mệnh đề sai; (3) 2 mệnh đề đúng rồi chủ quan mệnh đề 3,4. Chiến lược: đọc từng mệnh đề, tự quyết định đúng/sai, không dựa vào mệnh đề khác.',
      realWorldExamples: [
        'Câu về AI: "AI có thể thay thế hoàn toàn con người" → Sai (AI hẹp)',
        'Câu về mạng: "TCP đảm bảo dữ liệu đến đích" → Đúng (TCP reliable)',
        'Câu về HTML: "<img> là thẻ inline" → Đúng (img inline mặc định)'
      ],
      visualSummary: '6 câu × 4 mệnh đề = 24 mệnh đề = 3 điểm. Mỗi mệnh đề đúng/sai = 0.125 đ. Chiến lược: đọc từng mệnh đề độc lập.',
      commonMistakes: [
        'Tự động suy ra mệnh đề sau từ mệnh đề trước - sai lệch logic',
        'Dùng cảm tính thay vì kiến thức - "nghe có vẻ đúng"',
        'Sai 1 trong 4 mệnh đề mất cả 0.5 điểm câu đó'
      ],
      quickCheck: [
        {
          question: 'Part 2 có bao nhiêu mệnh đề cần đánh giá?',
          options: ['6', '24', '4', '30'],
          correctAnswer: 1,
          explanation: '6 câu × 4 mệnh đề = 24 mệnh đề cần xác định đúng/sai. Mỗi mệnh đề = 0.125 điểm, tổng Part 2 = 3 điểm.'
        },
        {
          question: 'Câu nào sai 2 trong 4 mệnh đề thì được bao nhiêu điểm?',
          options: ['0.5', '0.25', '0.125', '0'],
          correctAnswer: 4,
          explanation: 'Điểm tính theo từng mệnh đề: đúng 2/4 = 2 × 0.125 = 0.25 điểm. Không có điểm câu (0.5) nếu không đúng hoàn toàn 4/4.'
        }
      ],
      practice: 'Làm 6 câu T/F, đánh giá từng mệnh đề. Chấm điểm: mỗi mệnh đề đúng = 0.125. Tính tổng. So sánh với Part 1. Xác định chủ đề cần ôn thêm.',
      examCorner: 'Câu hay gặy: (1) Mệnh đề về AI/ML với từ khóa "luôn/nào", (2) Mệnh đề về mạng TCP/UDP, (3) Mệnh đề HTML/CSS đúng/sai. Đọc kỹ, đừng suy đoán.',
      sixtySecondSummary: 'Part 2: 6 câu × 4 mệnh đề = 24 mệnh đề = 3 điểm. Đọc từng mệnh đề ĐỘC LẬP. Cẩn thận với "luôn/nào". Mỗi mệnh đề đúng/sai = 0.125 đ.',
      flashcards: ['fc-44', 'fc-45'],
      nextStep: 'Thi thử tổng hợp 50 phút.'
    }
  },

  {
    id: 'lesson-4-5',
    slug: 'form-va-input-trong-html',
    moduleId: 'mod-4-2',
    courseId: 'course-4',
    title: 'Form và Input trong HTML',
    description: 'Tạo biểu mẫu nhập liệu, các loại input, validation cơ bản.',
    estimatedMinutes: 40,
    difficulty: 'medium',
    track: 'ict',
    order: 5,
    content: {
      learningObjectives: [
        'Tạo được form với các loại input phổ biến',
        'Sử dụng được các thuộc tính validation',
        'Hiểu cách form gửi dữ liệu',
        'Áp dụng được CSS cho form đẹp'
      ],
      explainLikeNew: 'Form giống như phiếu khảo sát - có ô điền tên, ô chọn, ô đánh dấu. HTML form cho phép người dùng nhập và gửi dữ liệu lên server. VD: đăng ký tài khoản, đăng nhập, form liên hệ.',
      theory: 'Form HTML: <form action="" method="">. Input types: text, password, email, number, date, checkbox, radio, file. Attributes: name (gửi server), required, placeholder, value. Label dùng for để click chọn input tương ứng. Submit button gửi form.',
      deepDive: 'Method: GET (gửi qua URL, giới hạn size) vs POST (gửi trong body, bảo mật hơn). HTML5 validation: required, minlength, pattern (regex), type. CSS pseudo-class: :valid, :invalid, :focus để style. Accessibility: dùng <label> và aria-* attributes.',
      realWorldExamples: [
        'Form đăng ký Google: name, email, password, birthday',
        'Form thanh toán: số thẻ, expiry, CVV',
        'Search box trên Google là form với input text và submit'
      ],
      visualSummary: '<form> = inputs + labels + submit. Input types: text, email, password, number, date, checkbox, radio. Validation: required, pattern.',
      commonMistakes: [
        'Quên name attribute - server không nhận được dữ liệu',
        'Không dùng label - accessibility kém, khó click trên mobile',
        'Dùng GET cho form chứa password - exposed trong URL'
      ],
      quickCheck: [
        {
          question: 'Thuộc tính nào bắt buộc nhập liệu?',
          options: ['placeholder', 'type', 'required', 'name'],
          correctAnswer: 2,
          explanation: 'Thuộc tính required bắt buộc người dùng nhập trước khi submit. Nếu bỏ trống, trình duyệt sẽ báo lỗi và không gửi form.'
        },
        {
          question: 'Khác nhau giữa GET và POST method?',
          options: ['Không khác', 'GET qua URL (không bảo mật), POST trong body (bảo mật)', 'POST nhanh hơn', 'GET dùng cho login'],
          correctAnswer: 1,
          explanation: 'GET gửi dữ liệu qua URL (nhìn thấy trong address bar), giới hạn kích thước. POST gửi trong HTTP body, bảo mật hơn, không giới hạn size. Dùng POST cho login, register, data nhạy cảm.'
        }
      ],
      practice: 'Tạo form đăng ký: (1) Họ tên (text, required); (2) Email (email, required); (3) Password (password, min 8 chars); (4) Ngày sinh (date); (5) Giới tính (radio); (6) Sở thích (checkbox); (7) Nút Submit. Thêm CSS cho đẹp.',
      examCorner: 'Câu hỏi hay gặp: (1) Cấu trúc form, (2) Input types, (3) Validation attributes. Đề thi thường cho code form và hỏi thuộc tính/giá trị.',
      sixtySecondSummary: 'Form nhập liệu: <form> với inputs. GET/POST method. Validation: required, pattern. Label for accessibility.',
      flashcards: ['fc-39'],
      nextStep: 'Học về JavaScript cơ bản để thêm tương tác.'
    }
  }
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find(l => l.slug === slug);
}

export function getLessonsByCourse(courseId: string): Lesson[] {
  return lessons.filter(l => l.courseId === courseId);
}

export function getLessonsByModule(moduleId: string): Lesson[] {
  return lessons.filter(l => l.moduleId === moduleId);
}

export const modules = [
  { id: 'mod-1-1', courseId: 'course-1', title: 'Nền tảng máy tính và phần mềm', order: 1 },
  { id: 'mod-1-2', courseId: 'course-1', title: 'Thuật toán và CSDL', order: 2 },
  { id: 'mod-2-1', courseId: 'course-2', title: 'Trí tuệ Nhân tạo', order: 1 },
  { id: 'mod-2-2', courseId: 'course-2', title: 'Khoa học dữ liệu', order: 2 },
  { id: 'mod-3-1', courseId: 'course-3', title: 'Mạng máy tính', order: 1 },
  { id: 'mod-3-2', courseId: 'course-3', title: 'Mạng xã hội', order: 2 },
  { id: 'mod-4-1', courseId: 'course-4', title: 'HTML/CSS cơ bản', order: 1 },
  { id: 'mod-4-2', courseId: 'course-4', title: 'Form và nội dung web', order: 2 },
  { id: 'mod-5-1', courseId: 'course-5', title: 'Luyện thi TN', order: 1 },
];