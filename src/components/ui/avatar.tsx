import React from 'react';
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
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
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
