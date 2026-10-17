import React from 'react';
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
