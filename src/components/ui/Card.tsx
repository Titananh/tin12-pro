// ==========================================
// Card Component - Tin12 Pro Cánh Diều
// ==========================================
'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  hover = false,
  glass = false,
  padding = 'md',
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm';
  
  const hoverStyles = hover ? 'transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:-translate-y-1 hover:shadow-lg' : '';
  
  const glassStyles = glass ? 'bg-white/3 border-white/8 backdrop-blur-xl' : '';
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${hoverStyles} ${glassStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Sub-components
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({
  children,
  className = '',
  ...props
}, ref) => (
  <h3 ref={ref} className={`text-lg font-semibold text-white ${className}`} {...props}>
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({
  children,
  className = '',
  ...props
}, ref) => (
  <p ref={ref} className={`text-sm text-slate-400 mt-1 ${className}`} {...props}>
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => (
  <div ref={ref} className={`mt-4 pt-4 border-t border-white/10 flex items-center gap-3 ${className}`} {...props}>
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Type assertion for compound Card component
type CardCompoundComponent = typeof Card & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

(Card as CardCompoundComponent).Header = CardHeader;
(Card as CardCompoundComponent).Title = CardTitle;
(Card as CardCompoundComponent).Description = CardDescription;
(Card as CardCompoundComponent).Content = CardContent;
(Card as CardCompoundComponent).Footer = CardFooter;