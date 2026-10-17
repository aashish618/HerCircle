'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, ShieldCheck, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function PendingPage() {
  const { setRole } = useAuth();

  return (
    <div className="max-w-lg mx-auto py-12 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
          Status: Under Human Review
        </span>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Your Application is Pending
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
          Thank you for applying to HerCircle! Our human community moderators review every application individually to ensure our sanctuary remains safe and authentic.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-5 text-left text-xs space-y-3">
        <h3 className="font-semibold text-[var(--color-charcoal)]">What happens next?</h3>
        <ul className="space-y-1.5 text-[var(--color-muted)] list-disc list-inside">
          <li>Reviews are typically processed within 24 to 48 hours.</li>
          <li>You will receive an email confirmation once reviewed.</li>
          <li>In the meantime, feel free to read our Community Guidelines and Safety resources.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/guidelines">
          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-1.5" /> Read Guidelines
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setRole('member');
          }}
        >
          <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-700" />
          Dev Shortcut: Switch to Approved Member
        </Button>
      </div>
    </div>
  );
}
