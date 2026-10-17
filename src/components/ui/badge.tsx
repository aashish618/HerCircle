import React from 'react';
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
