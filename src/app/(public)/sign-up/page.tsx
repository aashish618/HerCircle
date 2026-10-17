'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto py-10 text-center space-y-4">
      <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
        Join HerCircle
      </h1>
      <p className="text-sm text-[var(--color-charcoal-light)]">
        HerCircle is a private, curated space. All prospective members join by submitting a short membership application reviewed by human moderators.
      </p>
      <div className="pt-4">
        <Link href="/apply">
          <Button size="lg">Start Membership Application</Button>
        </Link>
      </div>
      <p className="text-xs text-[var(--color-muted)] pt-2">
        Already approved? <Link href="/sign-in" className="text-[var(--color-rose)] font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
