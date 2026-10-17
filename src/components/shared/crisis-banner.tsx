'use client';

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
              National Women&apos;s Helpline: <strong>7827170170</strong>
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
