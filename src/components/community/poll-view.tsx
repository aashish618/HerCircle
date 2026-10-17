'use client';

import React, { useState } from 'react';
import { Poll } from '@/lib/types';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PollView({ poll }: { poll: Poll }) {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(poll.userVote);
  const [votes, setVotes] = useState(poll.options);
  const [total, setTotal] = useState(poll.totalVotes);

  const handleVote = (index: number) => {
    if (selectedOption !== undefined) return;
    setSelectedOption(index);
    setVotes((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setTotal((prev) => prev + 1);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)]/60 p-4 my-3 space-y-3">
      <h4 className="text-sm font-semibold text-[var(--color-charcoal)]">{poll.question}</h4>
      <div className="space-y-2">
        {votes.map((option, idx) => {
          const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;
          const isChosen = selectedOption === idx;

          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              disabled={selectedOption !== undefined}
              className={cn(
                'w-full text-left relative overflow-hidden rounded-lg border p-2.5 text-xs transition-all flex items-center justify-between',
                selectedOption !== undefined ? 'cursor-default' : 'hover:border-[var(--color-rose)] cursor-pointer',
                isChosen ? 'border-[var(--color-rose)] bg-white' : 'border-[var(--color-border)] bg-white/70'
              )}
            >
              {selectedOption !== undefined && (
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-lavender)]/50 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              )}
              <span className="relative z-10 flex items-center font-medium">
                {isChosen && <Check className="w-3.5 h-3.5 mr-1.5 text-[var(--color-rose)]" />}
                {option.text}
              </span>
              {selectedOption !== undefined && (
                <span className="relative z-10 font-mono text-[var(--color-muted)] font-semibold">
                  {percentage}% ({option.votes})
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-[var(--color-muted)] text-right font-mono">
        {total} total community votes
      </p>
    </div>
  );
}
