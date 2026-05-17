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
  timestamp?: Date;
}

const MODES: { id: TutorMode; label: string; description: string; icon: string }[] = [
  { id: 'sieu-de-hieu', label: 'Sieu de hieu', description: 'Giai thich tu mat goc', icon: 'book-open' },
  { id: 'chuan-thi', label: 'Chuan thi', description: 'Tap trung meo lam bai', icon: 'target' },
  { id: 'nang-cao', label: 'Nang cao', description: 'Lien he CS/ICT sau hon', icon: 'trending-up' },
  { id: 'goi-y-tung-buoc', label: 'Goi y tung buoc', description: 'Khong dua dap an ngay', icon: 'help-circle' },
  { id: 'tao-bai-tuong-tu', label: 'Tao bai tuong tu', description: 'Sinh cau luyen them', icon: 'copy' },
  { id: 'phan-tich-loi-sai', label: 'Phan tich loi sai', description: 'Chi ra nguyen nhan sai', icon: 'alert-triangle' },
];

const TOPICS = [
  { id: 'html', label: 'HTML/CSS' },
  { id: 'mang', label: 'Mang may tinh' },
  { id: 'ai', label: 'AI' },
  { id: 'dao-duc', label: 'Dao duc so' },
  { id: 'thuat-toan', label: 'Thuat toan' },
];

const QUICK_PROMPTS = [
  'HTML va CSS khac nhau the nao?',
  'Goi y tung buoc cau hoi ve mang LAN',
  'Tao 3 cau tuong tu ve AI',
  'Phan tich loi sai khi nhau router va switch',
  'Lap ke hoach on tap 7 ngay cho phan HTML/CSS',
];

function getModeIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    'book-open': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    'target': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    'trending-up': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'help-circle': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    'copy': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    'alert-triangle': <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  };
  return icons[iconName] || icons['book-open'];
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Xin chao! Minh la gia su Tin hoc 12 Canh Dieu. Chon che do hoc, chu de hien tai roi hoi minh de duoc giai thich, goi y tung buoc hoac tao bai luyen tuong tu.',
      mode: 'sieu-de-hieu',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedMode, setSelectedMode] = useState<TutorMode>('sieu-de-hieu');
  const [selectedTopic, setSelectedTopic] = useState('html');
  const [isLoading, setIsLoading] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const messageIdRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const nextMessageId = (prefix: string) => {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (promptOverride?: string) => {
    const content = (promptOverride || input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: nextMessageId('user'),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const response = generateTutorResponse(content, {
        currentTopic: selectedTopic,
        currentLesson: 'Tin hoc 12 Canh Dieu - bai dang hoc',
        goal: 'Thi tot nghiep THPT va xay portfolio CNTT',
        track: 'UNDECIDED',
        studentLevel: 'beginner',
        masteryByTopic: {
          html: 58,
          mang: 46,
          ai: 62,
          'dao-duc': 71,
        },
        recentWrongAnswers: [
          'Nhau router voi switch trong mang LAN',
          'Quen thuoc tinh alt cua anh HTML',
        ],
      }, selectedMode);

      const aiMessage: Message = {
        id: nextMessageId('ai'),
        role: 'assistant',
        content: response.message,
        mode: response.mode || selectedMode,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: nextMessageId('ai'),
        role: 'assistant',
        content: 'Xin loi, minh chua xu ly duoc cau hoi nay. Hay hoi cu the hon ve mot chu de Tin hoc 12 hoac chon che do goi y tung buoc.',
        mode: selectedMode,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastAssistantMessage = [...messages].reverse().find(message => message.role === 'assistant');

  const handleCopyResponse = () => {
    if (lastAssistantMessage) {
      navigator.clipboard?.writeText(lastAssistantMessage.content);
    }
  };

  const handleSaveResponse = () => {
    if (lastAssistantMessage) {
      setSavedNotes(prev => [lastAssistantMessage.content, ...prev].slice(0, 20));
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-8rem)]">
      <aside className="space-y-4 overflow-y-auto pr-1">
        {/* Header Card */}
        <Card className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 border-blue-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <Badge variant="info" size="sm">AI Tutor</Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Gia su Tin hoc 12
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Mock tutor co guardrails, dung context bai hoc, loi sai va mastery de ho tro hoc sinh ma khong chep SGK.
          </p>
        </Card>

        {/* Mode Selector */}
        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Che do tra loi</h3>
          <div className="space-y-2">
            {MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`w-full text-left rounded-lg border p-3 transition-all ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/15 text-blue-900 dark:text-blue-100'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`${selectedMode === mode.id ? 'text-blue-500' : 'text-slate-400'}`}>
                    {getModeIcon(mode.icon)}
                  </span>
                  <div className="font-medium text-sm">{mode.label}</div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-6">{mode.description}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Topic Context */}
        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Context hien tai</h3>
          <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2" htmlFor="topic-select">
            Chu de dang hoc
          </label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {TOPICS.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400 leading-relaxed">
            Muc tieu demo: thi THPT, va loi sai, xay portfolio. Mastery yeu nhat: mang va HTML/CSS.
          </div>
        </Card>

        {/* Quick Prompts */}
        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Cau hoi nhanh</h3>
          <div className="space-y-2">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="w-full rounded-lg bg-slate-100 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-500/15"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        {/* Saved Notes */}
        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Ghi chu da luu</h3>
          {savedNotes.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Chua luu phan hoi nao.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedNotes.map((note, index) => (
                <div key={`${note}-${index}`} className="rounded-lg bg-slate-50 p-2.5 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300 line-clamp-2">
                  {note.slice(0, 80)}...
                </div>
              ))}
            </div>
          )}
        </Card>
      </aside>

      {/* Main Chat Area */}
      <Card className="flex min-h-0 flex-col overflow-hidden bg-slate-900 border-slate-800">
        {/* Chat Header */}
        <div className="border-b border-slate-700 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-white">Cuoc tro chuyen hoc tap</h2>
              <p className="text-sm text-slate-400">
                Uu tien goi y tung buoc khi ban dang lam bai.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyResponse}
                disabled={!lastAssistantMessage}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSaveResponse}
                disabled={!lastAssistantMessage}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Luu
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
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
                    : 'bg-slate-800 text-slate-100 border border-slate-700'
                }`}
              >
                {msg.mode && msg.role === 'assistant' && (
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-400">
                    {getModeIcon(MODES.find(m => m.id === msg.mode)?.icon || 'book-open')}
                    {MODES.find(m => m.id === msg.mode)?.label}
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3">
                <div className="flex gap-1.5" aria-label="AI dang tra loi">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhap cau hoi cua ban..."
              className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              rows={1}
              aria-label="Nhap cau hoi cho AI Tutor"
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isLoading} 
              aria-label="Gui tin nhan"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-7-9 7 9-7zm0 0v-8" />
              </svg>
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">
            AI Tutor ban demo khong thay the nguon chinh thuc. Neu khong chan pham vi chuong trinh, he thong se nhac can kiem tra nguon.
          </p>
        </div>
      </Card>
    </div>
  );
}
