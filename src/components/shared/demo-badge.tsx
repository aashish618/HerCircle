import React from 'react';
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
