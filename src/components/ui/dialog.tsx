'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        className={cn(
          'w-full max-w-lg rounded-2xl bg-[var(--color-ivory)] border border-[var(--color-border)] p-6 shadow-xl relative animate-in zoom-in-95 duration-200',
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5 transition"
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h2 id="dialog-title" className="font-serif text-xl font-bold text-[var(--color-charcoal)] mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
