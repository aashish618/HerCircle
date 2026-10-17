'use client';

import React from 'react';
import { Sparkles, Lightbulb, CheckCircle2, Heart, Bookmark, Flag, LucideIcon } from 'lucide-react';
import { ReactionCounts, ReactionType } from '@/lib/types';
import { useDemo } from '@/contexts/demo-context';
import { cn } from '@/lib/utils';

interface ReactionBarProps {
  targetId: string;
  reactionCounts: ReactionCounts;
  targetType?: 'discussion' | 'comment';
  onReport?: () => void;
  showSave?: boolean;
}

export function ReactionBar({
  targetId,
  reactionCounts,
  onReport,
  showSave = true,
}: ReactionBarProps) {
  const { userReactions, toggleReaction, isSaved, toggleSave } = useDemo();
  const currentReaction = userReactions[targetId];
  const saved = isSaved(targetId);

  const reactions: { type: ReactionType; label: string; icon: LucideIcon; count: number; activeColor: string }[] = [
    {
      type: 'support',
      label: 'Support',
      icon: Sparkles,
      count: reactionCounts.support + (currentReaction === 'support' ? 1 : 0),
      activeColor: 'bg-[var(--color-rose-light)] text-[var(--color-rose-dark)] border-[var(--color-rose)]',
    },
    {
      type: 'insightful',
      label: 'Insightful',
      icon: Lightbulb,
      count: reactionCounts.insightful + (currentReaction === 'insightful' ? 1 : 0),
      activeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      type: 'helpful',
      label: 'Helpful',
      icon: CheckCircle2,
      count: reactionCounts.helpful + (currentReaction === 'helpful' ? 1 : 0),
      activeColor: 'bg-[var(--color-sage)] text-emerald-900 border-emerald-300',
    },
    {
      type: 'heart',
      label: 'Warmth',
      icon: Heart,
      count: reactionCounts.heart + (currentReaction === 'heart' ? 1 : 0),
      activeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-light)] text-xs">
      <div className="flex flex-wrap items-center gap-1.5">
        {reactions.map((r) => {
          const Icon = r.icon;
          const isActive = currentReaction === r.type;
          return (
            <button
              key={r.type}
              onClick={() => toggleReaction(targetId, r.type)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border)] transition-all hover:bg-black/5',
                isActive && r.activeColor
              )}
            >
              <Icon className={cn('w-3.5 h-3.5', isActive ? 'fill-current' : 'text-[var(--color-muted)]')} />
              <span className="font-medium">{r.label}</span>
              <span className="opacity-75 font-mono text-[11px]">{r.count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2">
        {showSave && (
          <button
            onClick={() => toggleSave(targetId)}
            aria-label={saved ? 'Remove from saved' : 'Save discussion'}
            className={cn(
              'p-1.5 rounded-full border border-[var(--color-border)] transition hover:bg-black/5',
              saved ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)]' : 'text-[var(--color-muted)]'
            )}
          >
            <Bookmark className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
          </button>
        )}
        {onReport && (
          <button
            onClick={onReport}
            aria-label="Report content"
            className="p-1.5 rounded-full border border-transparent text-[var(--color-muted)] hover:text-rose-700 hover:bg-rose-50 transition"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
