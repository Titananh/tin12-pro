// ==========================================
// AI Tutor Page - Tin12 Pro Cánh Diều
// Context-aware mock tutor with learning modes
// ==========================================

'use client';

import { useRef, useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { generateTutorResponse, type TutorMode } from '@/lib/ai-tutor';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: TutorMode;
}

const MODES: { id: TutorMode; label: string; description: string }[] = [
  { id: 'sieu-de-hieu', label: 'Siêu dễ hiểu', description: 'Giải thích từ mất gốc' },
  { id: 'chuan-thi', label: 'Chuẩn thi', description: 'Tập trung mẹo làm bài' },
  { id: 'nang-cao', label: 'Nâng cao', description: 'Liên hệ CS/ICT sâu hơn' },
  { id: 'goi-y-tung-buoc', label: 'Gợi ý từng bước', description: 'Không đưa đáp án ngay' },
  { id: 'tao-bai-tuong-tu', label: 'Tạo bài tương tự', description: 'Sinh câu luyện thêm' },
  { id: 'phan-tich-loi-sai', label: 'Phân tích lỗi sai', description: 'Chỉ ra nguyên nhân sai' },
];

const TOPICS = [
  { id: 'html', label: 'HTML/CSS' },
  { id: 'mang', label: 'Mạng máy tính' },
  { id: 'ai', label: 'AI' },
  { id: 'dao-duc', label: 'Đạo đức số' },
  { id: 'thuat-toan', label: 'Thuật toán' },
];

const QUICK_PROMPTS = [
  'HTML và CSS khác nhau thế nào?',
  'Gợi ý từng bước câu hỏi về mạng LAN',
  'Tạo 3 câu tương tự về AI',
  'Phân tích lỗi sai khi nhầm router và switch',
  'Lập kế hoạch ôn tập 7 ngày cho phần HTML/CSS',
];

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Xin chào! Mình là gia sư Tin học 12 Cánh Diều. Chọn chế độ học, chủ đề hiện tại rồi hỏi mình để được giải thích, gợi ý từng bước hoặc tạo bài luyện tương tự.',
      mode: 'sieu-de-hieu',
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedMode, setSelectedMode] = useState<TutorMode>('sieu-de-hieu');
  const [selectedTopic, setSelectedTopic] = useState('html');
  const [isLoading, setIsLoading] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const messageIdRef = useRef(0);

  const nextMessageId = (prefix: string) => {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  };

  const handleSend = async (promptOverride?: string) => {
    const content = (promptOverride || input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: nextMessageId('user'),
      role: 'user',
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = generateTutorResponse(content, {
        currentTopic: selectedTopic,
        currentLesson: 'Tin học 12 Cánh Diều - bài đang học',
        goal: 'Thi tốt nghiệp THPT và xây portfolio CNTT',
        track: 'UNDECIDED',
        studentLevel: 'beginner',
        masteryByTopic: {
          html: 58,
          mang: 46,
          ai: 62,
          'dao-duc': 71,
        },
        recentWrongAnswers: [
          'Nhầm router với switch trong mạng LAN',
          'Quên thuộc tính alt của ảnh HTML',
        ],
      }, selectedMode);

      const aiMessage: Message = {
        id: nextMessageId('ai'),
        role: 'assistant',
        content: response.message,
        mode: response.mode || selectedMode,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: nextMessageId('ai'),
        role: 'assistant',
        content: 'Xin lỗi, mình chưa xử lý được câu hỏi này. Hãy hỏi cụ thể hơn về một chủ đề Tin học 12 hoặc chọn chế độ gợi ý từng bước.',
        mode: selectedMode,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastAssistantMessage = [...messages].reverse().find(message => message.role === 'assistant');

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-8rem)]">
      <aside className="space-y-4 overflow-y-auto pr-1">
        <Card className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 border-blue-500/20">
          <Badge variant="blue" size="sm">AI Tutor</Badge>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            Gia sư Tin học 12
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Mock tutor có guardrails, dùng context bài học, lỗi sai và mastery để hỗ trợ học sinh mà không chép SGK.
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Chế độ trả lời</h2>
          <div className="space-y-2">
            {MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`w-full text-left rounded-xl border p-3 transition-all ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-500/15 dark:text-blue-100'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <div className="font-medium">{mode.label}</div>
                <div className="text-xs opacity-75">{mode.description}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Context hiện tại</h2>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2" htmlFor="topic-select">
            Chủ đề đang học
          </label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {TOPICS.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            Mục tiêu demo: thi THPT, vá lỗi sai, xây portfolio. Mastery yếu nhất: mạng và HTML/CSS.
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Câu hỏi nhanh</h2>
          <div className="space-y-2">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="w-full rounded-lg bg-slate-100 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-500/15"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-2">Ghi chú đã lưu</h2>
          {savedNotes.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Chưa lưu phản hồi nào.</p>
          ) : (
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {savedNotes.map((note, index) => (
                <li key={`${note}-${index}`} className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900">
                  {note.slice(0, 90)}...
                </li>
              ))}
            </ul>
          )}
        </Card>
      </aside>

      <Card className="flex min-h-0 flex-col overflow-hidden">
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Cuộc trò chuyện học tập</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ưu tiên gợi ý từng bước khi bạn đang làm bài.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => lastAssistantMessage && navigator.clipboard?.writeText(lastAssistantMessage.content)}
                disabled={!lastAssistantMessage}
              >
                Copy phản hồi
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => lastAssistantMessage && setSavedNotes(prev => [...prev, lastAssistantMessage.content])}
                disabled={!lastAssistantMessage}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                }`}
              >
                {msg.mode && msg.role === 'assistant' && (
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
                    {MODES.find(mode => mode.id === msg.mode)?.label}
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                <div className="flex gap-1" aria-label="AI đang trả lời">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 p-4 dark:border-slate-700">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              rows={1}
              aria-label="Nhập câu hỏi cho AI Tutor"
            />
            <Button onClick={() => handleSend()} disabled={!input.trim() || isLoading} aria-label="Gửi tin nhắn">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-7-9 7 9-7zm0 0v-8" />
              </svg>
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            AI Tutor bản demo không thay thế nguồn chính thức. Nếu không chắc phạm vi chương trình, hệ thống sẽ nhắc cần kiểm tra nguồn.
          </p>
        </div>
      </Card>
    </div>
  );
}
