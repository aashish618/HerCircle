'use client';

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
