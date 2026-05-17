// ============================================================
// Academy Cockpit UI Primitives — Tin12 Pro
// Premium EdTech SaaS Component Library
// ============================================================
'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/* ============================================================
   BUTTON
   ============================================================ */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClass: Record<string, string> = {
    primary:  'btn--primary',
    secondary:'btn--secondary',
    ghost:    'btn--ghost',
    danger:   'btn--danger',
    outline:  'btn--secondary', // secondary style as outline substitute
  };

  const sizeClass = {
    sm: 'btn--sm',
    md: 'btn--md',
    lg: 'btn--lg',
  }[size];

  return (
    <button
      className={`btn ${variantClass[variant] ?? 'btn--primary'} ${sizeClass} focus-ring ${className}`}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

/* ============================================================
   CARD
   ============================================================ */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
  ...props
}: CardProps) {
  const padClass = {
    none: '',
    sm:  'card__body--sm',
    md:  'card__body',
    lg:  'card__body--lg',
  }[padding];

  return (
    <div
      className={`card${hover ? ' card--hover' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      <div className={padClass}>{children}</div>
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */
interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  className = '',
}: StatCardProps) {
  const isPos = change !== undefined && change > 0;
  const isNeg = change !== undefined && change < 0;

  return (
    <div className={`premium-card ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="body-xs text-muted">{label}</p>
          <p className="heading-md mt-1">{value}</p>
          {change !== undefined && (
            <p className={`body-xs mt-1.5 ${isPos ? 'text-teal' : isNeg ? 'text-danger' : 'text-faint'}`}>
              {isPos ? '+' : ''}{change}{changeLabel ?? ''}
            </p>
          )}
        </div>
        {icon && (
          <div className="glass-panel p-2 rounded-xl text-teal-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   BADGE
   ============================================================ */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'teal' | 'amber' | 'success' | 'danger' | 'info' | 'emerald' | 'violet' | 'blue' | 'red' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}: BadgeProps) {
  const variantClass: Record<string, string> = {
    default: 'badge--default',
    teal:    'badge--teal',
    amber:   'badge--amber',
    success: 'badge--success',
    danger:  'badge--danger',
    info:    'badge--info',
    emerald: 'badge--teal',
    violet:  'badge--info',
    blue:    'badge--info',
    red:     'badge--red',
    outline: 'badge--default',
  };

  const sizeClass = size === 'sm' ? '' : 'px-3 py-1 text-sm';

  return (
    <span className={`badge ${variantClass[variant] ?? 'badge--default'} ${sizeClass} ${className}`} {...props}>
      {children}
    </span>
  );
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */
interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'teal' | 'amber' | 'green' | 'red' | 'blue' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  color?: 'teal' | 'amber' | 'green' | 'red' | 'blue' | 'emerald'; // alias for variant
  className?: string;
}

export function Progress({
  value,
  max = 100,
  variant = 'teal',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  color,
  className = '',
}: ProgressProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const activeVariant = (color ?? variant) as 'teal' | 'amber' | 'green' | 'red' | 'blue' | 'emerald';
  // Normalise emerald -> teal since the palette uses teal-500
  const fillKey = activeVariant === 'emerald' ? 'teal' : activeVariant;
  const fillClass = `progress__fill--${fillKey}`;
  const heightClass = { sm: 'h-1', md: 'h-2', lg: 'h-3' }[size];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2 body-xs text-muted">
          <span>{label ?? 'Tiến độ'}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`progress ${heightClass}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div
          className={`progress__fill ${fillClass}${animated ? ' animate-pulse' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   METRIC TILE
   ============================================================ */
interface MetricTileProps {
  label: string;
  value: string | number;
  delta?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricTile({ label, value, delta, icon, className = '' }: MetricTileProps) {
  return (
    <div className={`metric-tile ${className}`}>
      <div className="flex items-start justify-between">
        <p className="metric-tile__label">{label}</p>
        {icon && <span className="text-teal-400">{icon}</span>}
      </div>
      <p className="metric-tile__value">{value}</p>
      {delta !== undefined && (
        <p className={`metric-tile__delta ${delta >= 0 ? 'metric-tile__delta--up' : 'metric-tile__delta--down'}`}>
          {delta >= 0 ? '+' : ''}{delta}%
        </p>
      )}
    </div>
  );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`} role="status">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__desc">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ============================================================
   SKELETON
   ============================================================ */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'image' | 'card';
}

export function Skeleton({ variant = 'text', className = '', ...props }: SkeletonProps) {
  const variantClass = {
    text:  'skeleton--text',
    title: 'skeleton--title',
    image: 'skeleton--image',
    card:  'skeleton--card',
  }[variant];

  return (
    <div className={`skeleton ${variantClass} ${className}`} aria-hidden="true" {...props} />
  );
}

/* ============================================================
   QUIZ OPTION
   ============================================================ */
interface QuizOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  index: number;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  showResult?: boolean;
}

const QUIZ_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuizOption({
  label,
  index,
  selected = false,
  correct = false,
  incorrect = false,
  showResult = false,
  className = '',
  ...props
}: QuizOptionProps) {
  let stateClass = '';
  if (showResult && correct)              stateClass = 'quiz-option--correct';
  else if (showResult && incorrect && selected) stateClass = 'quiz-option--incorrect';
  else if (showResult)                     stateClass = 'opacity-50';
  else if (selected)                      stateClass = 'quiz-option--selected';

  return (
    <div
      role="button"
      tabIndex={0}
      className={`quiz-option focus-ring ${stateClass} ${className}`}
      {...props}
    >
      <span className="quiz-option__letter">{QUIZ_LETTERS[index] ?? index + 1}</span>
      <span className="flex-1 text-left body-md">{label}</span>
      {showResult && correct && (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {showResult && incorrect && selected && (
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
}

/* ============================================================
   EXAM TIMER
   ============================================================ */
interface ExamTimerProps {
  duration: number;
  onTimeUp?: () => void;
  warningThreshold?: number;
}

export function ExamTimer({ duration, onTimeUp, warningThreshold = 10 }: ExamTimerProps) {
  const [secs, setSecs] = useState(duration * 60);
  const [phase, setPhase] = useState<'normal' | 'warning' | 'danger'>('normal');

  useEffect(() => {
    const id = setInterval(() => {
      setSecs((prev) => {
        if (prev <= 0) { clearInterval(id); onTimeUp?.(); return 0; }
        const m = prev / 60;
        setPhase(m <= 5 ? 'danger' : m <= warningThreshold ? 'warning' : 'normal');
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onTimeUp, warningThreshold]);

  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div
      className={`exam-timer${phase !== 'normal' ? ` exam-timer--${phase}` : ''}`}
      role="timer"
      aria-live={phase !== 'normal' ? 'polite' : undefined}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{mm}:{ss}</span>
    </div>
  );
}

/* ============================================================
   FLASHCODE
   ============================================================ */
interface FlashcardData { id: string; front: string; back: string; }

interface FlashcardProps {
  card: FlashcardData;
  onRemember?: () => void;
  onForgot?: () => void;
}

export function Flashcard({ card, onRemember, onForgot }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard${flipped ? ' flashcard--flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Lật về câu hỏi' : 'Lật để xem đáp án'}
    >
      <div className="flashcard__inner">
        {/* Front */}
        <div className="flashcard__face flashcard__face--front" aria-hidden={flipped}>
          <span className="flashcard__label flashcard__label--question">Câu hỏi</span>
          <p className="heading-md">{card.front}</p>
          <span className="body-xs text-faint">Tap to flip</span>
        </div>
        {/* Back */}
        <div className="flashcard__face flashcard__face--back" aria-hidden={!flipped}>
          <span className="flashcard__label flashcard__label--answer">Đáp án</span>
          <p className="body-lg">{card.back}</p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onForgot?.(); }}
              className="btn btn--sm btn--danger"
            >
              Quên
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemember?.(); }}
              className="btn btn--sm btn--primary"
            >
              Nhớ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MODAL
   ============================================================ */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const maxW = { sm: '22rem', md: '28rem', lg: '36rem' }[size];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
      <div
        className="modal-box"
        style={{ maxWidth: maxW }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 id="modal-title" className="heading-md">{title}</h2>
            <button onClick={onClose} className="btn btn--sm btn--ghost focus-ring" aria-label="Đóng">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   TOAST PROVIDER
   ============================================================ */
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem { id: string; type: ToastType; message: string; }

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const TOAST_ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

function ToastContainer({ toasts, removeToast }: { toasts: ToastItem[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container" role="region" aria-label="Thông báo">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`} role="alert">
          {TOAST_ICONS[t.type]}
          <span className="body-sm text-slate-100 flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="btn btn--sm btn--ghost" aria-label="Đóng thông báo">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   AVATAR
   ============================================================ */
interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const dim = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }[size];
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  if (src) {
    const px = { sm: 32, md: 40, lg: 48 }[size];
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} width={px} height={px} className={`${dim} rounded-full object-cover ${className}`} />
    );
  }

  return (
    <div className={`${dim} rounded-full bg-teal-700 flex items-center justify-center font-semibold text-porcelain ${className}`}>
      {initials}
    </div>
  );
}

/* ============================================================
   TABS
   ============================================================ */
interface Tab { id: string; label: string; icon?: React.ReactNode; badge?: string | number; }

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-glass-border" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 body-sm font-medium border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap focus-ring ${
            activeTab === tab.id
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-muted hover:text-slate-200'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="badge badge--default px-1.5">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   TOOLTIP
   ============================================================ */
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        role="tooltip"
        className={`absolute px-2 py-1 body-xs font-medium text-porcelain bg-sl-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 ${
          position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'top-full mt-2 left-1/2 -translate-x-1/2'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
