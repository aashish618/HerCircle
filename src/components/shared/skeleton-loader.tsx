import React from 'react';
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
