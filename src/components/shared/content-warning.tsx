'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentWarningWrapperProps {
  warningText: string;
  children: React.ReactNode;
}

export function ContentWarningWrapper({ warningText, children }: ContentWarningWrapperProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 rounded-t-lg px-3 py-1.5 text-xs text-amber-800">
          <span className="flex items-center font-medium">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Content Warning: {warningText}
          </span>
          <button
            onClick={() => setRevealed(false)}
            className="flex items-center hover:underline text-[11px]"
          >
            <EyeOff className="w-3 h-3 mr-1" /> Re-hide
          </button>
        </div>
        <div className="border border-t-0 border-amber-200/80 rounded-b-lg p-4 bg-white/60">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-center space-y-3">
      <div className="inline-flex p-2 rounded-full bg-amber-100 text-amber-800">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-amber-950">Content Warning</h4>
        <p className="text-xs text-amber-800 mt-1 max-w-md mx-auto">{warningText}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setRevealed(true)}
        className="bg-white/80 border-amber-300 hover:bg-white text-xs"
      >
        <Eye className="w-3.5 h-3.5 mr-1.5" /> Reveal content
      </Button>
    </div>
  );
}
