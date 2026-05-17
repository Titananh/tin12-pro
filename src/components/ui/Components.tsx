'use client';

// ==========================================
// UI Components - Tin12 Pro Cánh Diều
// ==========================================

import { HTMLAttributes, forwardRef, createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ==========================================
// Progress Bar Component
// ==========================================

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  label?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  animated = true,
  label,
  className = '',
  ...props
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantStyles = {
    default: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    success: 'bg-gradient-to-r from-cyan-400 to-emerald-500',
    warning: 'bg-gradient-to-r from-amber-400 to-orange-500',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600',
  };

  return (
    <div ref={ref} className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-xs text-slate-400">
          <span>{label || 'Progress'}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantStyles[variant]} ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

// ==========================================
// Skill Badge Component
// ==========================================

interface SkillBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'active' | 'mastered' | 'weak';
  size?: 'sm' | 'md';
}

export const SkillBadge = forwardRef<HTMLSpanElement, SkillBadgeProps>(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const variantStyles = {
    default: 'bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400',
    active: 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-400',
    mastered: 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400',
    weak: 'bg-amber-500/15 border border-amber-500/40 text-amber-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

SkillBadge.displayName = 'SkillBadge';

// ==========================================
// Quiz Option Component
// ==========================================

interface QuizOptionProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  showResult?: boolean;
  label: string;
  index: number;
}

export const QuizOption = forwardRef<HTMLDivElement, QuizOptionProps>(({
  selected = false,
  correct = false,
  incorrect = false,
  showResult = false,
  label,
  index,
  className = '',
  ...props
}, ref) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  let stateStyles = 'border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10 cursor-pointer';
  
  if (showResult) {
    if (correct) stateStyles = 'border-emerald-500 bg-emerald-500/15 text-emerald-400';
    else if (incorrect && selected) stateStyles = 'border-red-500 bg-red-500/15 text-red-400';
    else stateStyles = 'border-white/10 bg-white/5 opacity-50';
  } else if (selected) {
    stateStyles = 'border-cyan-500 bg-cyan-500/15 text-cyan-400';
  }

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-150 ${stateStyles} ${className}`}
      onClick={(e) => props.onClick?.(e)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); props.onClick?.(null as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>); } }}
      {...props}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
        {letters[index]}
      </span>
      <span className="flex-1">{label}</span>
      {showResult && correct && (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {showResult && incorrect && selected && (
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
});

QuizOption.displayName = 'QuizOption';

// ==========================================
// Exam Timer Component
// ==========================================

interface ExamTimerProps {
  duration: number;
  onTimeUp?: () => void;
  warningThreshold?: number;
}

export function ExamTimer({ duration, onTimeUp, warningThreshold = 10 }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isWarning, setIsWarning] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        
        const minutesLeft = prev / 60;
        setIsWarning(minutesLeft <= warningThreshold && minutesLeft > 5);
        setIsDanger(minutesLeft <= 5);
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, warningThreshold]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-all duration-300 ${
      isDanger ? 'bg-red-500/20 text-red-400 animate-pulse' : 
      isWarning ? 'bg-amber-500/20 text-amber-400' : 
      'bg-white/5 text-white'
    }`}>
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formattedTime}</span>
    </div>
  );
}

// ==========================================
// Empty State Component
// ==========================================

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}, ref) => (
  <div
    ref={ref}
    className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    {...props}
  >
    {icon && (
      <div className="w-20 h-20 mb-6 opacity-50 text-slate-500">
        {icon}
      </div>
    )}
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    {description && (
      <p className="text-slate-400 max-w-md mb-6">{description}</p>
    )}
    {action && <div>{action}</div>}
  </div>
));

EmptyState.displayName = 'EmptyState';

// ==========================================
// Skeleton Component
// ==========================================

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'image' | 'card';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  variant = 'text',
  className = '',
  ...props
}, ref) => {
  const variantStyles = {
    text: 'h-4 w-3/4',
    title: 'h-7 w-1/2',
    image: 'h-40 w-full',
    card: 'h-64 w-full',
  };

  return (
    <div
      ref={ref}
      className={`animate-pulse bg-slate-800/60 rounded-lg overflow-hidden relative ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

// ==========================================
// Toast Component
// ==========================================

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  const typeStyles = {
    success: 'border-l-emerald-500 bg-emerald-500/10',
    error: 'border-l-red-500 bg-red-500/10',
    info: 'border-l-blue-500 bg-blue-500/10',
    warning: 'border-l-amber-500 bg-amber-500/10',
  };

  const typeIcons = {
    success: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-l-4 bg-slate-900/90 backdrop-blur-sm shadow-lg animate-[fadeInUp_0.3s_ease-out] ${typeStyles[toast.type]}`}
        >
          {typeIcons[toast.type]}
          <span className="text-sm text-white">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// Flashcard Component
// ==========================================

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

interface FlashcardProps {
  card: FlashcardData;
  onRemember?: () => void;
  onForgot?: () => void;
}

export function Flashcard({ card, onRemember, onForgot }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <div className="w-full max-w-lg h-72 cursor-pointer" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-800/80 border border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Question</div>
          <h3 className="text-xl font-medium text-white text-center">{card.front}</h3>
          <div className="mt-6 text-xs text-slate-500">Tap to flip</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-xs uppercase tracking-widest text-violet-400 mb-4">Answer</div>
          <p className="text-base text-white text-center leading-relaxed">{card.back}</p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); onForgot?.(); }}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
            >
              Forgot
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemember?.(); }}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors"
            >
              Remember
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Card Component
// ==========================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  hover?: boolean;
}

export function Card({ children, variant = 'default', hover = false, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-2xl';
  const variantStyles = {
    default: 'bg-white/5 border border-white/10',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    bordered: 'border border-white/10',
  };
  const hoverStyles = hover ? 'hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300' : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

// ==========================================
// Button Component
// ==========================================

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
    outline: 'border border-white/20 text-white hover:bg-white/5',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ==========================================
// Badge Component
// ==========================================

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/10 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

// ==========================================
// Progress (Circular) Component
// ==========================================

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  color?: string;
}

export function Progress({ 
  value, 
  max = 100, 
  size = 'md', 
  showValue = false,
  color = 'stroke-cyan-400',
  className = '',
  ...props 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizes = {
    sm: 40,
    md: 60,
    lg: 80,
  };
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 5 : 6;
  const radius = (sizes[size] - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} {...props}>
      <svg width={sizes[size]} height={sizes[size]} className="transform -rotate-90">
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-700"
        />
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-500`}
        />
      </svg>
      {showValue && (
        <span className="absolute text-xs font-medium text-white">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}