import React from 'react';
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
