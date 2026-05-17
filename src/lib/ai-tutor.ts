// ==========================================
// AI Tutor Mock - Tin12 Pro Cánh Diều
// Deterministic pattern-based responses with guardrails
// ==========================================

// ============ SYSTEM PROMPT ============

export const AI_TUTOR_SYSTEM_PROMPT = `Bạn là gia sư Tin học 12 Cánh Diều. Hãy giải thích dễ hiểu cho học sinh Việt Nam lớp 12.
Không sao chép nguyên văn sách giáo khoa. Không bịa kiến thức.
Nếu học sinh đang làm bài, ưu tiên gợi ý từng bước thay vì đưa đáp án ngay.
Khi giải thích, chia thành: 1. Hiểu nhanh. 2. Kiến thức chuẩn. 3. Ví dụ thực tế. 4. Mẹo làm bài. 5. Câu hỏi kiểm tra lại.
Nếu không chắc thông tin nào thuộc chương trình hoặc cấu trúc thi, hãy nói rõ cần kiểm tra nguồn.`;

// ============ TYPES ============

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type TutorMode =
  | 'sieu-de-hieu'
  | 'chuan-thi'
  | 'nang-cao'
  | 'goi-y-tung-buoc'
  | 'tao-bai-tuong-tu'
  | 'phan-tich-loi-sai';

export interface TutorContext {
  currentLesson?: string;
  currentTopic?: string;
  recentWrongAnswers?: string[];
  studentLevel?: 'beginner' | 'intermediate' | 'advanced';
  goal?: string;
  track?: 'COMMON' | 'CS' | 'ICT' | 'UNDECIDED' | string;
  masteryByTopic?: Record<string, number>;
  wrongQuestion?: string;
  userAnswer?: string;
  correctAnswer?: string;
  explanation?: string;
}

export interface TutorResponse {
  message: string;
  suggestions: string[];
  relatedLessons: string[];
  isHintOnly: boolean;
  confidence: 'high' | 'medium' | 'low';
  mode?: TutorMode;
  detectedTopic?: string | null;
}

export interface SimilarQuestion {
  type: 'multiple_choice';
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

export interface MistakeInput {
  topic: string;
  prompt: string;
  userAnswer?: string;
  correctAnswer?: string;
  errorType?: string;
}

export interface MistakeAnalysis {
  summary: string;
  weakTopics: string[];
  errorTypes: Record<string, number>;
  recommendations: string[];
  tutorMessage: string;
}

export interface StudyPlanItem {
  day: number;
  title: string;
  type: 'lesson' | 'practice' | 'lab' | 'exam' | 'flashcard';
  reason: string;
}

export interface StudyPlan {
  title: string;
  durationDays: number;
  focusTopics: string[];
  items: StudyPlanItem[];
}

// ============ KNOWLEDGE BASE ============

interface TopicKnowledge {
  keywords: string[];
  explanation: string;
  examples: string[];
  tips: string[];
  commonMistakes: string[];
  relatedLessons: string[];
}

const KNOWLEDGE_BASE: Record<string, TopicKnowledge> = {
  'ai': {
    keywords: ['ai', 'trí tuệ nhân tạo', 'artificial intelligence', 'machine learning', 'ml', 'học máy', 'deep learning', 'học sâu', 'neural network', 'mạng neural'],
    explanation: 'AI (Artificial Intelligence) là ngành khoa học máy tính tập trung xây dựng hệ thống có khả năng thực hiện các tác vụ đòi hỏi trí thông minh con người. AI hẹp chỉ giỏi một việc cụ thể, AI tổng quát (AGI) làm được mọi việc nhưng chưa đạt được.',
    examples: ['ChatGPT', 'Nhận dạng khuôn mặt', 'Xe tự lái Tesla', 'Gợi ý phim Netflix'],
    tips: ['Phân biệt AI hẹp và AGI', 'AI không có ý thức', 'ML là tập con của AI'],
    commonMistakes: ['Tưởng AI đã thông minh như người', 'Nhầm AI với robot'],
    relatedLessons: ['lesson-2-1', 'lesson-2-2', 'lesson-2-3'],
  },
  'mang': {
    keywords: ['mạng', 'network', 'lan', 'wan', 'router', 'switch', 'tcp', 'ip', 'dns', 'http', 'https', 'internet', 'lan'],
    explanation: 'Mạng máy tính kết nối các máy tính để chia sẻ tài nguyên. LAN trong một tòa nhà, WAN toàn cầu. Router định tuyến giữa các mạng, Switch kết nối máy trong LAN. DNS chuyển tên miền thành IP. HTTP/HTTPS là giao thức web.',
    examples: ['WiFi trong nhà (LAN)', 'Internet (WAN)', 'DNS như danh bạ điện thoại'],
    tips: ['Router ≠ Switch', 'HTTP ≠ HTTPS (có mã hóa)', 'TCP đảm bảo, UDP nhanh'],
    commonMistakes: ['Nhầm router và switch', 'Tưởng HTTP và HTTPS giống nhau'],
    relatedLessons: ['lesson-3-1', 'lesson-3-2'],
  },
  'html': {
    keywords: ['html', 'tag', 'thẻ', 'element', 'h1', 'h2', 'p', 'div', 'span', 'img', 'a', 'ul', 'ol', 'li', 'head', 'body', 'semantic'],
    explanation: 'HTML là ngôn ngữ đánh dấu siêu văn bản. Cấu trúc: <html><head></head><body></body></html>. Semantic tags: <header>, <nav>, <main>, <article>, <section>, <footer>. Block elements: div, p, h1. Inline elements: span, a, img.',
    examples: ['<h1>Tiêu đề</h1>', '<img src="photo.jpg" alt="Mô tả">', '<a href="url">Link</a>'],
    tips: ['h1 chỉ dùng 1 lần', 'Luôn có alt cho img', 'Semantic tags cho SEO'],
    commonMistakes: ['Quên đóng thẻ', 'Nhầm block và inline'],
    relatedLessons: ['lesson-4-1', 'lesson-4-2'],
  },
  'css': {
    keywords: ['css', 'style', 'selector', 'class', 'id', 'flexbox', 'grid', 'padding', 'margin', 'border', 'display', 'color', 'background'],
    explanation: 'CSS tạo kiểu cho HTML. 3 cách thêm: inline, internal, external. Box model: content → padding → border → margin. Flexbox cho bố cục 1 chiều. Grid cho bố cục 2 chiều.',
    examples: ['p { color: blue; }', '.class { display: flex; }', '#id { margin: 10px; }'],
    tips: ['Padding trong border, margin ngoài', 'Flexbox: justify-content ngang, align-items dọc', 'Dùng rem thay vì px cho responsive'],
    commonMistakes: ['Nhầm padding và margin', 'Dùng Flexbox cho layout 2D'],
    relatedLessons: ['lesson-4-2', 'lesson-4-3'],
  },
  'dao-duc': {
    keywords: ['đạo đức', ' ethics', 'digital citizenship', 'an toàn', 'security', 'phishing', 'malware', 'virus', 'ransomware', 'firewall', 'mã hóa', 'encryption'],
    explanation: 'Đạo đức số là cách sử dụng công nghệ có trách nhiệm. An toàn mạng gồm: malware, phishing, firewall, mã hóa. 2FA giúp bảo mật tốt hơn password.',
    examples: ['Ransomware mã hóa file đòi tiền', 'Email phishing giả ngân hàng', 'HTTPS mã hóa dữ liệu'],
    tips: ['Dùng password mạnh, khác nhau', 'Không click link lạ', 'Bật 2FA cho tài khoản quan trọng'],
    commonMistakes: ['Dùng chung password', 'Click link không kiểm tra URL'],
    relatedLessons: ['lesson-3-3'],
  },
  'kien-truc': {
    keywords: ['cpu', 'ram', 'rom', 'hardware', 'phần cứng', 'software', 'phần mềm', 'byte', 'bit', 'nhị phân', 'binary', 'hệ điều hành', 'os'],
    explanation: ' Máy tính gồm: CPU (xử lý), RAM (nhớ tạm), ROM (nhớ cố định), ổ cứng (lưu lâu dài). 1 byte = 8 bits. Hệ nhị phân chỉ có 0 và 1. Hệ điều hành quản lý tài nguyên.',
    examples: ['RAM 8GB lưu dữ liệu đang dùng', 'Ổ cứng SSD 256GB lưu file', 'Windows, macOS là hệ điều hành'],
    tips: ['RAM mất điện thì mất hết, ổ cứng vẫn giữ', '1KB = 1024 bytes'],
    commonMistakes: ['Nhầm RAM và ổ cứng', 'Tưởng CPU GHz càng cao càng nhanh'],
    relatedLessons: ['lesson-1-1', 'lesson-1-2'],
  },
  'thuat-toan': {
    keywords: ['thuật toán', 'algorithm', 'sorting', 'sắp xếp', 'search', 'tìm kiếm', 'binary search', 'complexity', 'độ phức tạp', 'o(n)', 'sql', 'database'],
    explanation: 'Thuật toán là dãy bước giải quyết vấn đề. Binary search cần mảng sorted, O(log n). Sorting: Bubble O(n²), Quick O(n log n). SQL: SELECT lấy dữ liệu, INSERT thêm, UPDATE sửa, DELETE xóa.',
    examples: ['Binary search: chia đôi mảng để tìm', 'Quick Sort: chọn pivot, chia nhóm', 'SELECT * FROM users WHERE age > 18'],
    tips: ['Binary search chỉ hoạt động trên mảng sorted', 'O(n²) chậm hơn O(n log n)'],
    commonMistakes: ['Quên mảng cần sorted với binary search', 'Nhầm các lệnh SQL'],
    relatedLessons: ['lesson-5-1'],
  },
};

// ============ RESPONSE TEMPLATES ============

const _EXPLANATION_TEMPLATE = {
  quick: (topic: string) => `## 1. Hiểu nhanh\n${KNOWLEDGE_BASE[topic]?.explanation.split('.')[0] || 'Đây là khái niệm quan trọng trong Tin học 12.'}`,

  full: (topic: string) => {
    const kb = KNOWLEDGE_BASE[topic];
    if (!kb) return null;

    return `## 1. Hiểu nhanh\n${kb.explanation.split('.')[0]}.

## 2. Kiến thức chuẩn\n${kb.explanation}

## 3. Ví dụ thực tế\n${kb.examples.map(e => `- ${e}`).join('\n')}

## 4. Mẹo làm bài\n${kb.tips.map(t => `- ${t}`).join('\n')}

## 5. Câu hỏi kiểm tra lại\n- ${kb.commonMistakes[0] || 'Bạn đã hiểu bài chưa?'}`;
  },
};

const MODE_LABELS: Record<TutorMode, string> = {
  'sieu-de-hieu': 'Siêu dễ hiểu',
  'chuan-thi': 'Chuẩn thi',
  'nang-cao': 'Nâng cao',
  'goi-y-tung-buoc': 'Gợi ý từng bước',
  'tao-bai-tuong-tu': 'Tạo bài tương tự',
  'phan-tich-loi-sai': 'Phân tích lỗi sai',
};

function normalizeMode(mode?: TutorMode): TutorMode {
  return mode || 'sieu-de-hieu';
}

function formatModeIntro(mode: TutorMode, context?: TutorContext): string {
  const goal = context?.goal ? `Mục tiêu: ${context.goal}. ` : '';
  const track = context?.track ? `Track: ${context.track}. ` : '';
  return `**Chế độ: ${MODE_LABELS[mode]}**\n${goal}${track}`.trim();
}

function getTopicFromContextOrMessage(message: string, context?: TutorContext): string | null {
  return detectTopic(message) || context?.currentTopic || null;
}

function buildStructuredExplanation(topic: string, mode: TutorMode, context?: TutorContext): string {
  const kb = KNOWLEDGE_BASE[topic];
  if (!kb) {
    return `${formatModeIntro(mode, context)}\n\nMình chưa đủ chắc để khẳng định phần này thuộc đúng phạm vi Tin học 12 Cánh Diều. Bạn nên kiểm tra lại nguồn học chính thức, rồi mình có thể giúp bạn diễn giải lại bằng ngôn ngữ dễ hiểu.`;
  }

  if (mode === 'chuan-thi') {
    return `${formatModeIntro(mode, context)}\n\n## 1. Hiểu nhanh\n${kb.explanation.split('.')[0]}.\n\n## 2. Kiến thức chuẩn\n${kb.explanation}\n\n## 3. Ví dụ thực tế\n${kb.examples.map(e => `- ${e}`).join('\n')}\n\n## 4. Mẹo làm bài\n${kb.tips.map(t => `- ${t}`).join('\n')}\n\n## 5. Câu hỏi kiểm tra lại\nNếu đề hỏi bẫy về chủ đề này, em cần phân biệt điều gì trước tiên?`;
  }

  if (mode === 'nang-cao') {
    return `${formatModeIntro(mode, context)}\n\n## 1. Hiểu nhanh\n${kb.explanation.split('.')[0]}.\n\n## 2. Kiến thức chuẩn\n${kb.explanation}\n\n## 3. Ví dụ thực tế\n${kb.examples.map(e => `- ${e}`).join('\n')}\n\n## 4. Mở rộng\n- Hãy thử liên hệ chủ đề này với sản phẩm thật hoặc dự án portfolio.\n- Khi gặp câu vận dụng, xác định dữ kiện, ràng buộc và lựa chọn giải pháp ít rủi ro nhất.\n\n## 5. Câu hỏi kiểm tra lại\nEm có thể tạo một ví dụ mới khác ví dụ trong bài không?`;
  }

  return `${formatModeIntro(mode, context)}\n\n## 1. Hiểu nhanh\n${kb.explanation.split('.')[0]}.\n\n## 2. Kiến thức chuẩn\n${kb.explanation}\n\n## 3. Ví dụ thực tế\n${kb.examples.map(e => `- ${e}`).join('\n')}\n\n## 4. Mẹo làm bài\n${kb.tips.map(t => `- ${t}`).join('\n')}\n\n## 5. Câu hỏi kiểm tra lại\n${kb.commonMistakes[0] || 'Em hãy tự nói lại khái niệm này bằng một câu ngắn.'}`;
}

// ============ UTILITY FUNCTIONS ============

/**
 * Detect topic from user message
 */
export function detectTopic(message: string): string | null {
  const lower = message.toLowerCase();
  
  for (const [topic, kb] of Object.entries(KNOWLEDGE_BASE)) {
    if (kb.keywords.some(kw => lower.includes(kw))) {
      return topic;
    }
  }
  
  return null;
}

/**
 * Check if message is asking for help with a specific question
 */
export function isAskingForQuestionHelp(message: string): boolean {
  const patterns = [
    /làm sao/i,
    /câu nào/i,
    /đáp án/i,
    /chọn/i,
    /trả lời/i,
    /thế nào/i,
    /bài này/i,
    /làm bài/i,
  ];
  
  return patterns.some(p => p.test(message));
}

/**
 * Check if message is greeting
 */
function isGreeting(message: string): boolean {
  return /^(xo|a|cf|chào|hi|hello|hey)/i.test(message.trim());
}

/**
 * Generate hint instead of full answer
 */
function generateHint(question: string, topic: string | null): string {
  const kb = topic ? KNOWLEDGE_BASE[topic] : null;
  
  if (kb) {
    return `## Gợi ý từng bước\n\n**Bước 1:** Đọc kỹ câu hỏi, xác định chủ đề: "${topic}"\n\n` +
      `**Bước 2:** Nhớ lại kiến thức cơ bản:\n${kb.tips.map(t => `- ${t}`).join('\n')}\n\n` +
      `**Bước 3:** Loại bỏ đáp án sai:\n` +
      `- Đáp án không liên quan đến ${topic} thường sai\n` +
      `- Đáp án "tất cả" hoặc "không có" cần xem xét kỹ\n\n` +
      `**Bước 4:** Chọn đáp án có liên quan nhất đến ${kb.explanation.split('.')[0]}`;
  }
  
  return `## Gợi ý từng bước\n\n` +
    `**Bước 1:** Đọc kỹ từng đáp án\n\n` +
    `**Bước 2:** Loại bỏ đáp án sai ngay lập tức\n\n` +
    `**Bước 3:** So sánh các đáp án còn lại\n\n` +
    `**Bước 4:** Chọn đáp án đúng nhất`;
}

// ============ MAIN TUTOR FUNCTION ============

/**
 * Generate AI tutor response (mock - deterministic pattern matching)
 */
export function generateTutorResponse(
  userMessage: string,
  context?: TutorContext,
  mode?: TutorMode
): TutorResponse {
  const selectedMode = normalizeMode(mode);
  const { currentTopic } = context || {};

  if (selectedMode === 'tao-bai-tuong-tu') {
    const topic = getTopicFromContextOrMessage(userMessage, context) || 'html';
    const questions = generateSimilarQuestions(topic, 3, context);
    return {
      message: `${formatModeIntro(selectedMode, context)}\n\n${questions.map((q, index) => `### Câu ${index + 1}\n${q.prompt}\n${q.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`).join('\n')}\n\n**Gợi ý sau khi làm:** ${q.explanation}`).join('\n\n')}`,
      suggestions: ['Làm từng câu rồi nhờ AI kiểm tra', 'Tạo thêm câu khó hơn', 'Ôn lại lý thuyết trước khi làm'],
      relatedLessons: KNOWLEDGE_BASE[topic]?.relatedLessons || [],
      isHintOnly: false,
      confidence: 'medium',
      mode: selectedMode,
      detectedTopic: topic,
    };
  }

  if (selectedMode === 'phan-tich-loi-sai') {
    const analysis = analyzeMistakes(context?.recentWrongAnswers?.map((prompt) => ({
      topic: getTopicFromContextOrMessage(prompt, context) || currentTopic || 'html',
      prompt,
    })) || [{
      topic: getTopicFromContextOrMessage(userMessage, context) || 'html',
      prompt: context?.wrongQuestion || userMessage,
      userAnswer: context?.userAnswer,
      correctAnswer: context?.correctAnswer,
    }], context);

    return {
      message: `${formatModeIntro(selectedMode, context)}\n\n${analysis.tutorMessage}`,
      suggestions: analysis.recommendations,
      relatedLessons: analysis.weakTopics.flatMap(topic => KNOWLEDGE_BASE[topic]?.relatedLessons || []),
      isHintOnly: false,
      confidence: 'medium',
      mode: selectedMode,
      detectedTopic: analysis.weakTopics[0] || null,
    };
  }

  // Handle greeting
  if (isGreeting(userMessage)) {
    return {
      message: `Chào bạn! 👋 Mình là gia sư Tin học 12 Cánh Diều.\n\n` +
        `Mình có thể giúp bạn:\n` +
        `- Giải thích khái niệm AI, Mạng, HTML/CSS, Đạo đức số...\n` +
        `- Gợi ý cách làm bài thi\n` +
        `- Giải đáp thắc mắc từ bài học\n\n` +
        `Bạn cần hỗ trợ gì hôm nay?`,
      suggestions: ['Hỏi về AI', 'Hỏi về Mạng máy tính', 'Hỏi về HTML/CSS', 'Hỏi về cấu trúc đề thi'],
      relatedLessons: [],
      isHintOnly: false,
      confidence: 'high',
      mode: selectedMode,
      detectedTopic: null,
    };
  }

  // Detect topic
  const detectedTopic = detectTopic(userMessage) || currentTopic;

  // Handle question help (don't give direct answer)
  if (selectedMode === 'goi-y-tung-buoc' || isAskingForQuestionHelp(userMessage)) {
    return {
      message: `${formatModeIntro('goi-y-tung-buoc', context)}\n\n${generateHint(userMessage, detectedTopic ?? null)}`,
      suggestions: ['Đọc lại bài về ' + (detectedTopic || 'chủ đề này'), 'Làm thử rồi kiểm tra đáp án'],
      relatedLessons: detectedTopic && KNOWLEDGE_BASE[detectedTopic]
        ? KNOWLEDGE_BASE[detectedTopic].relatedLessons
        : [],
      isHintOnly: true,
      confidence: 'high',
      mode: 'goi-y-tung-buoc',
      detectedTopic: detectedTopic ?? null,
    };
  }

  // Handle "I don't understand" type messages
  if (/không hiểu|băn khoăn|rắc rối|lúng túng/i.test(userMessage)) {
    const topic = detectedTopic || 'ai';
    const kb = KNOWLEDGE_BASE[topic];
    
    if (kb) {
      return {
        message: `Không sao! Để mình giải thích lại. ${buildStructuredExplanation(topic, selectedMode, context)}`,
        suggestions: kb.tips,
        relatedLessons: kb.relatedLessons,
        isHintOnly: false,
        confidence: 'high',
        mode: selectedMode,
        detectedTopic: topic,
      };
    }
  }

  // Handle direct topic explanation request
  if (detectedTopic && (
    userMessage.includes('là gì') ||
    userMessage.includes('thế nào') ||
    userMessage.includes('cho biết') ||
    userMessage.includes('giải thích') ||
    userMessage.includes('nói về')
  )) {
    const fullExplanation = buildStructuredExplanation(detectedTopic, selectedMode, context);
    if (fullExplanation) {
      return {
        message: fullExplanation,
        suggestions: KNOWLEDGE_BASE[detectedTopic].tips,
        relatedLessons: KNOWLEDGE_BASE[detectedTopic].relatedLessons,
        isHintOnly: false,
        confidence: 'high',
        mode: selectedMode,
        detectedTopic,
      };
    }
  }

  // Handle "how to" questions
  if (userMessage.includes('làm sao') || userMessage.includes('cách')) {
    if (detectedTopic) {
      const kb = KNOWLEDGE_BASE[detectedTopic];
      return {
        message: `## Cách thực hiện\n\n${kb ? kb.explanation : 'Để mình hướng dẫn bạn...'}\n\n**Các bước thực hiện:**\n${kb ? kb.tips.map((t, i) => `${i + 1}. ${t}`).join('\n') : '1. Xác định yêu cầu\n2. Thực hiện theo các bước đã học'}`,
        suggestions: kb?.tips || [],
        relatedLessons: kb?.relatedLessons || [],
        isHintOnly: false,
        confidence: 'medium',
        mode: selectedMode,
        detectedTopic,
      };
    }
  }

  // Default response
  const fallbackTopic = detectedTopic || 'ai';
  const kb = KNOWLEDGE_BASE[fallbackTopic];

  return {
    message: kb ? buildStructuredExplanation(fallbackTopic, selectedMode, context) : 'Mình chưa hiểu rõ ý bạn. Bạn có thể hỏi cụ thể hơn về một chủ đề trong Tin học 12 không?',
    suggestions: ['Hỏi về AI và Machine Learning', 'Hỏi về Mạng máy tính', 'Hỏi về HTML/CSS', 'Hỏi về cấu trúc đề thi TN THPT'],
    relatedLessons: kb?.relatedLessons || [],
    isHintOnly: false,
    confidence: kb ? 'medium' : 'low',
    mode: selectedMode,
    detectedTopic: fallbackTopic,
  };
}

export function explainQuestion(
  question: string,
  userAnswer?: string,
  correctAnswer?: string,
  topic?: string,
  context?: TutorContext
): TutorResponse {
  const detectedTopic = topic || getTopicFromContextOrMessage(question, context) || 'html';
  const kb = KNOWLEDGE_BASE[detectedTopic];
  const comparison = userAnswer && correctAnswer
    ? `\n\n## Vì sao em sai hoặc cần kiểm tra lại\n- Đáp án em chọn: ${userAnswer}\n- Đáp án đúng: ${correctAnswer}\n- Hãy so lại với dấu hiệu nhận biết trong câu hỏi trước khi xem đáp án.`
    : '';

  return {
    message: `${formatModeIntro('chuan-thi', context)}\n\n## 1. Hiểu nhanh\nCâu này thuộc chủ đề **${detectedTopic}**.\n\n## 2. Kiến thức chuẩn\n${kb?.explanation || 'Cần kiểm tra lại nguồn chính thức để xác nhận phạm vi kiến thức.'}${comparison}\n\n## 3. Ví dụ thực tế\n${(kb?.examples || ['Tạo ví dụ tương tự với dữ kiện khác rồi tự giải.']).map(e => `- ${e}`).join('\n')}\n\n## 4. Mẹo làm bài\n${(kb?.tips || ['Gạch chân từ khóa, loại đáp án sai rõ ràng trước.']).map(t => `- ${t}`).join('\n')}\n\n## 5. Câu hỏi kiểm tra lại\nNếu đổi dữ kiện trong câu, đáp án có còn đúng không?`,
    suggestions: kb?.tips || ['Ôn lại lý thuyết nền', 'Làm thêm câu tương tự'],
    relatedLessons: kb?.relatedLessons || [],
    isHintOnly: false,
    confidence: kb ? 'high' : 'low',
    mode: 'chuan-thi',
    detectedTopic,
  };
}

export function generateSimilarQuestions(
  topicOrQuestion: string,
  count: number = 3,
  context?: TutorContext
): SimilarQuestion[] {
  const topic = KNOWLEDGE_BASE[topicOrQuestion]
    ? topicOrQuestion
    : getTopicFromContextOrMessage(topicOrQuestion, context) || context?.currentTopic || 'html';
  const kb = KNOWLEDGE_BASE[topic] || KNOWLEDGE_BASE.html;

  return Array.from({ length: count }, (_, index) => ({
    type: 'multiple_choice' as const,
    topic,
    prompt: `Câu tương tự ${index + 1}: Nhận định nào đúng nhất về ${kb.explanation.split('.')[0].toLowerCase()}?`,
    options: [
      kb.explanation.split('.')[0],
      `Một phát biểu không liên quan trực tiếp đến ${topic}`,
      'Một lựa chọn tuyệt đối hóa và thường là bẫy đề',
      'Một lựa chọn chỉ đúng trong mọi trường hợp nếu có thêm dữ kiện',
    ],
    correctAnswer: kb.explanation.split('.')[0],
    explanation: `Dấu hiệu cần nhớ: ${kb.tips[index % kb.tips.length] || kb.explanation.split('.')[0]}.`,
  }));
}

export function analyzeMistakes(mistakes: MistakeInput[], context?: TutorContext): MistakeAnalysis {
  const topicCounts: Record<string, number> = {};
  const errorTypes: Record<string, number> = {};

  for (const mistake of mistakes) {
    topicCounts[mistake.topic] = (topicCounts[mistake.topic] || 0) + 1;
    const errorType = mistake.errorType || inferErrorType(mistake.prompt, mistake.userAnswer, mistake.correctAnswer);
    errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
  }

  const weakTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic)
    .slice(0, 3);
  const recommendations = weakTopics.flatMap(topic => [
    `Học lại phần ${topic} ở chế độ siêu dễ hiểu`,
    `Làm 10 câu luyện riêng về ${topic}`,
  ]).slice(0, 5);
  const learnerFocus = context?.goal ? `\n\nMục tiêu học hiện tại: ${context.goal}.` : '';

  return {
    summary: `Bạn có ${mistakes.length} lỗi cần xử lý, tập trung nhất ở: ${weakTopics.join(', ') || 'chưa đủ dữ liệu'}.`,
    weakTopics,
    errorTypes,
    recommendations,
    tutorMessage: `## 1. Hiểu nhanh\n${mistakes.length === 0 ? 'Chưa có lỗi sai để phân tích.' : `Bạn đang sai nhiều ở ${weakTopics.join(', ')}.`}${learnerFocus}\n\n## 2. Kiến thức chuẩn\n${weakTopics.map(topic => `- ${topic}: ${KNOWLEDGE_BASE[topic]?.explanation || 'cần ôn lại bài liên quan'}`).join('\n')}\n\n## 3. Ví dụ thực tế\nKhi làm đề, hãy ghi lại vì sao mình chọn đáp án, không chỉ ghi đáp án.\n\n## 4. Mẹo làm bài\n${recommendations.map(r => `- ${r}`).join('\n')}\n\n## 5. Câu hỏi kiểm tra lại\nLỗi của em là do không nhớ lý thuyết, đọc thiếu dữ kiện hay nhầm thuật ngữ?`,
  };
}

function inferErrorType(prompt: string, userAnswer?: string, correctAnswer?: string): string {
  const text = `${prompt} ${userAnswer || ''} ${correctAnswer || ''}`.toLowerCase();
  if (/html|css|tag|selector/.test(text)) return 'Sai HTML/CSS';
  if (/ip|dns|lan|router|switch|mạng/.test(text)) return 'Sai kiến thức mạng';
  if (/đạo đức|bảo mật|phishing|quyền riêng tư/.test(text)) return 'Nhầm đạo đức số';
  if (/không|luôn|tất cả|bắt buộc/.test(text)) return 'Đọc thiếu dữ kiện/bẫy tuyệt đối';
  return 'Không nhớ lý thuyết';
}

export function createStudyPlan(context: TutorContext & { weakTopics?: string[]; durationDays?: number } = {}): StudyPlan {
  const weakTopics = context.weakTopics
    || Object.entries(context.masteryByTopic || {})
      .sort((a, b) => a[1] - b[1])
      .map(([topic]) => topic)
      .slice(0, 3)
    || ['html', 'mang', 'ai'];
  const durationDays = context.durationDays || 7;

  const items: StudyPlanItem[] = [];
  for (let day = 1; day <= durationDays; day++) {
    const topic = weakTopics[(day - 1) % weakTopics.length] || 'html';
    items.push({
      day,
      title: day % 3 === 0 ? `Làm mini quiz ${topic}` : day % 5 === 0 ? `Lab ứng dụng ${topic}` : `Ôn bài ${topic}`,
      type: day % 5 === 0 ? 'lab' : day % 3 === 0 ? 'practice' : 'lesson',
      reason: `Ưu tiên vì mastery hoặc lỗi gần đây cho ${topic} còn cần cải thiện.`,
    });
  }

  return {
    title: `Kế hoạch ${durationDays} ngày cho ${context.goal || 'Tin học 12'}`,
    durationDays,
    focusTopics: weakTopics,
    items,
  };
}

/**
 * Get quick answer for a specific question
 */
export function getQuickAnswer(
  question: string,
  options: string[],
  topic: string
): { hint: string; likelyAnswer: number; confidence: number } {
  const kb = KNOWLEDGE_BASE[topic];
  
  if (!kb) {
    return {
      hint: 'Đọc kỹ câu hỏi và loại bỏ đáp án sai',
      likelyAnswer: -1,
      confidence: 0,
    };
  }

  // Very simple keyword matching for demo
  // In real app, would use proper ML/NLP
  let hintIndex = -1;

  // Try to match keywords from KB to find likely correct answer
  for (const keyword of kb.keywords) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].toLowerCase().includes(keyword.toLowerCase())) {
        hintIndex = i;
        break;
      }
    }
    if (hintIndex >= 0) break;
  }

  return {
    hint: `Gợi ý: Chú ý phần ${kb.explanation.split('.')[0]}`,
    likelyAnswer: hintIndex,
    confidence: hintIndex >= 0 ? 0.6 : 0.3,
  };
}

/**
 * Generate study plan based on weak topics
 */
export function generateStudyPlan(weakTopics: string[]): string {
  if (weakTopics.length === 0) {
    return 'Bạn đã làm tốt lắm! Tiếp tục ôn tập để duy trì và mở rộng kiến thức nhé.';
  }

  let plan = '## Kế hoạch ôn tập\n\n';

  for (let i = 0; i < Math.min(3, weakTopics.length); i++) {
    const topic = weakTopics[i];
    const kb = KNOWLEDGE_BASE[topic];
    plan += `### ${i + 1}. ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n`;
    if (kb) {
      plan += `**Lý thuyết:** ${kb.explanation.split('.')[0]}\n\n`;
      plan += `**Mẹo:** ${kb.tips[0] || 'Ôn kỹ các khái niệm cơ bản'}\n\n`;
      plan += `**Bài học gợi ý:** ${kb.relatedLessons.map(id => id.replace('lesson-', 'Bài ')).join(', ')}\n\n`;
    } else {
      plan += `Ôn lại bài học liên quan đến "${topic}"\n\n`;
    }
  }

  return plan;
}

// ============ CONVERSATION CONTEXT ============

export interface ConversationContext {
  messages: TutorMessage[];
  context: TutorContext;
}

/**
 * Add message to conversation history
 */
export function addMessage(
  conversation: ConversationContext,
  role: 'user' | 'assistant',
  content: string
): ConversationContext {
  const newMessage: TutorMessage = {
    role,
    content,
    timestamp: new Date().toISOString(),
  };

  return {
    messages: [...conversation.messages, newMessage],
    context: conversation.context,
  };
}

/**
 * Get recent context from conversation
 */
export function getRecentContext(conversation: ConversationContext): TutorContext {
  // Extract topic from recent user messages
  const recentUserMessages = conversation.messages
    .filter(m => m.role === 'user')
    .slice(-3)
    .map(m => m.content);

  let currentTopic: string | undefined;
  for (const msg of recentUserMessages) {
    const detected = detectTopic(msg);
    if (detected) {
      currentTopic = detected;
      break;
    }
  }

  return {
    ...conversation.context,
    currentTopic,
  };
}
