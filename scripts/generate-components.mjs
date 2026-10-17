import fs from 'fs';
import path from 'path';

// --- 1. button.tsx ---
const buttonContent = `'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-rose)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-rose)] text-white hover:bg-[var(--color-rose-dark)] shadow-sm',
        secondary: 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] hover:bg-[#DDD0F0]',
        sage: 'bg-[var(--color-sage)] text-[var(--color-charcoal)] hover:bg-[#CFDEC9]',
        outline: 'border border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] hover:bg-black/5',
        ghost: 'bg-transparent text-[var(--color-charcoal)] hover:bg-black/5',
        destructive: 'bg-rose-700 text-white hover:bg-rose-800',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
`;
fs.writeFileSync('src/components/ui/button.tsx', buttonContent);

// --- 2. badge.tsx ---
const badgeContent = `import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'sage' | 'rose' | 'outline' | 'muted';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-lavender)] text-[var(--color-charcoal)]',
    sage: 'bg-[var(--color-sage)] text-[var(--color-charcoal)]',
    rose: 'bg-[var(--color-rose-light)] text-[var(--color-rose-dark)] font-semibold',
    outline: 'border border-[var(--color-border)] text-[var(--color-muted)]',
    muted: 'bg-[var(--color-ivory-warm)] text-[var(--color-muted)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
`;
fs.writeFileSync('src/components/ui/badge.tsx', badgeContent);

// --- 3. card.tsx ---
const cardContent = `import React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-white/80 backdrop-blur-sm p-5 shadow-[var(--shadow-card)] transition-all',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-serif text-lg font-semibold tracking-tight text-[var(--color-charcoal)]', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-[var(--color-muted)]', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center pt-4 border-t border-[var(--color-border-light)]', className)} {...props} />;
}
`;
fs.writeFileSync('src/components/ui/card.tsx', cardContent);

// --- 4. avatar.tsx ---
const avatarContent = `import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnonymous?: boolean;
}

export function Avatar({ name, size = 'md', className, isAnonymous }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (str: string) => {
    if (isAnonymous) return '🌸';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) return \`\${parts[0][0]}\${parts[1][0]}\`.toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div
      aria-label={isAnonymous ? 'Anonymous' : name}
      className={cn(
        'rounded-full flex items-center justify-center font-medium select-none shrink-0 border border-[var(--color-border)]',
        isAnonymous
          ? 'bg-[var(--color-lavender-light)] text-[var(--color-charcoal)]'
          : 'bg-[var(--color-sage)] text-[var(--color-charcoal)]',
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
`;
fs.writeFileSync('src/components/ui/avatar.tsx', avatarContent);

// --- 5. dialog.tsx ---
const dialogContent = `'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        className={cn(
          'w-full max-w-lg rounded-2xl bg-[var(--color-ivory)] border border-[var(--color-border)] p-6 shadow-xl relative animate-in zoom-in-95 duration-200',
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5 transition"
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h2 id="dialog-title" className="font-serif text-xl font-bold text-[var(--color-charcoal)] mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/ui/dialog.tsx', dialogContent);

// --- 6. input.tsx & textarea.tsx ---
const inputContent = `import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rose)] transition-colors',
            error && 'border-rose-500 focus:ring-rose-500',
            className
          )}
          {...props}
        />
        {helperText && !error && <p className="text-xs text-[var(--color-muted)]">{helperText}</p>}
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
`;
fs.writeFileSync('src/components/ui/input.tsx', inputContent);

const textareaContent = `import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full rounded-lg border border-[var(--color-border)] bg-white p-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rose)] transition-colors',
            error && 'border-rose-500 focus:ring-rose-500',
            className
          )}
          {...props}
        />
        {helperText && !error && <p className="text-xs text-[var(--color-muted)]">{helperText}</p>}
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
`;
fs.writeFileSync('src/components/ui/textarea.tsx', textareaContent);

// --- Shared Components ---

// 7. prototype-banner.tsx
const protoBannerContent = `'use client';

import React from 'react';
import { useDemo } from '@/contexts/demo-context';
import { Info, X } from 'lucide-react';

export function PrototypeBanner() {
  const { bannerDismissed, dismissBanner } = useDemo();

  if (bannerDismissed) return null;

  return (
    <div className="bg-[var(--color-charcoal)] text-[var(--color-ivory)] px-4 py-2 text-xs flex items-center justify-between z-40 relative">
      <div className="flex items-center space-x-2 max-w-4xl mx-auto text-center justify-center">
        <Info className="w-3.5 h-3.5 text-[var(--color-lavender)] shrink-0" />
        <span>
          <strong>Phase 0 & 1 Prototype:</strong> Simulated demo data only. Do not enter real personal details. Backend architecture is designed in docs/, not connected.
        </span>
      </div>
      <button
        onClick={dismissBanner}
        aria-label="Dismiss banner"
        className="p-1 hover:bg-white/10 rounded transition shrink-0 ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/prototype-banner.tsx', protoBannerContent);

// 8. demo-badge.tsx
const demoBadgeContent = `import React from 'react';
import { cn } from '@/lib/utils';

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-200/80',
        className
      )}
    >
      Demo data
    </span>
  );
}
`;
fs.writeFileSync('src/components/shared/demo-badge.tsx', demoBadgeContent);

// 9. crisis-banner.tsx
const crisisBannerContent = `'use client';

import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export function CrisisResourceBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside
      aria-label="Emergency and crisis resources"
      className="bg-[var(--color-rose-light)] border border-[var(--color-rose)]/30 rounded-xl p-4 my-4 text-[var(--color-charcoal)] relative transition-all"
    >
      <div className="flex items-start space-x-3 pr-6">
        <ShieldAlert className="w-5 h-5 text-[var(--color-rose-dark)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-[var(--color-rose-dark)]">
              Immediate Crisis & Emergency Support (India)
            </h4>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-white/70 rounded text-[var(--color-muted)]">
              Verify before launch
            </span>
          </div>
          <p className="text-xs text-[var(--color-charcoal-light)]">
            If you or someone you know is facing violence, distress, or emergency, help is available:
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
            <span className="inline-flex items-center font-medium">
              <PhoneCall className="w-3 h-3 mr-1 text-[var(--color-rose)]" />
              Police/Emergency: <strong>112</strong>
            </span>
            <span className="inline-flex items-center font-medium">
              <PhoneCall className="w-3 h-3 mr-1 text-[var(--color-rose)]" />
              National Women\\'s Helpline: <strong>7827170170</strong>
            </span>
            <span className="inline-flex items-center font-medium">
              <PhoneCall className="w-3 h-3 mr-1 text-[var(--color-rose)]" />
              Tele-MANAS: <strong>14416</strong>
            </span>
          </div>
          <div className="pt-1">
            <Link
              href="/safety"
              className="text-xs font-semibold text-[var(--color-rose-dark)] hover:underline inline-flex items-center"
            >
              View complete emergency helpline directory <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        aria-label="Close crisis banner"
        className="absolute top-3 right-3 p-1 text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
`;
fs.writeFileSync('src/components/shared/crisis-banner.tsx', crisisBannerContent);

// 10. privacy-notice.tsx
const privacyNoticeContent = `import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrivacyNoticeProps {
  message?: string;
  isAnonymousNotice?: boolean;
  className?: string;
}

export function PrivacyNotice({
  message,
  isAnonymousNotice,
  className,
}: PrivacyNoticeProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[var(--color-sage-light)] border border-[var(--color-sage)] p-3 text-xs text-[var(--color-charcoal)] flex items-start space-x-2.5',
        className
      )}
    >
      {isAnonymousNotice ? (
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
      ) : (
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
      )}
      <div className="space-y-0.5">
        <p className="font-semibold text-emerald-950">
          {isAnonymousNotice ? 'Pseudonymity Notice' : 'Privacy Protection'}
        </p>
        <p className="text-[var(--color-charcoal-light)] leading-relaxed">
          {message ||
            (isAnonymousNotice
              ? 'Anonymous posting provides pseudonymity from fellow community members. It does NOT provide anonymity from privileged security & safety operations in case of serious harm. Private discussions are never indexed by search engines.'
              : 'HerCircle private discussions are protected. Member content is never used for AI model training without separate explicit consent.')}
        </p>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/privacy-notice.tsx', privacyNoticeContent);

// 11. content-warning.tsx
const contentWarningContent = `'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentWarningWrapperProps {
  warningText: string;
  children: React.ReactNode;
}

export function ContentWarningWrapper({ warningText, children }: ContentWarningWrapperProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 rounded-t-lg px-3 py-1.5 text-xs text-amber-800">
          <span className="flex items-center font-medium">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Content Warning: {warningText}
          </span>
          <button
            onClick={() => setRevealed(false)}
            className="flex items-center hover:underline text-[11px]"
          >
            <EyeOff className="w-3 h-3 mr-1" /> Re-hide
          </button>
        </div>
        <div className="border border-t-0 border-amber-200/80 rounded-b-lg p-4 bg-white/60">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-center space-y-3">
      <div className="inline-flex p-2 rounded-full bg-amber-100 text-amber-800">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-amber-950">Content Warning</h4>
        <p className="text-xs text-amber-800 mt-1 max-w-md mx-auto">{warningText}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setRevealed(true)}
        className="bg-white/80 border-amber-300 hover:bg-white text-xs"
      >
        <Eye className="w-3.5 h-3.5 mr-1.5" /> Reveal content
      </Button>
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/content-warning.tsx', contentWarningContent);

// 12. empty-state.tsx
const emptyStateContent = `import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center flex flex-col items-center justify-center space-y-3 bg-white/40',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-lavender-light)] flex items-center justify-center text-[var(--color-charcoal)]">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-[var(--color-charcoal)]">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] max-w-sm leading-relaxed">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/empty-state.tsx', emptyStateContent);

// 13. skeleton-loader.tsx
const skeletonContent = `import React from 'react';
import { cn } from '@/lib/utils';

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-[var(--color-border)]/60', className)} />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-5 space-y-4 bg-white/60">
      <div className="flex items-center space-x-3">
        <SkeletonLoader className="w-8 h-8 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <SkeletonLoader className="w-24 h-3.5" />
          <SkeletonLoader className="w-16 h-2.5" />
        </div>
      </div>
      <SkeletonLoader className="w-3/4 h-5" />
      <div className="space-y-2">
        <SkeletonLoader className="w-full h-3" />
        <SkeletonLoader className="w-5/6 h-3" />
      </div>
      <div className="flex justify-between pt-2">
        <SkeletonLoader className="w-32 h-6 rounded-full" />
        <SkeletonLoader className="w-16 h-6 rounded-full" />
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/skeleton-loader.tsx', skeletonContent);

// 14. error-state.tsx
const errorStateContent = `'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-rose-950">{title}</h3>
      <p className="text-sm text-rose-800 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 bg-white">
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Try again
        </Button>
      )}
    </div>
  );
}
`;
fs.writeFileSync('src/components/shared/error-state.tsx', errorStateContent);

console.log('Successfully generated UI and Shared components.');
