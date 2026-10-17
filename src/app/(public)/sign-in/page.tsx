'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { DemoBadge } from '@/components/shared/demo-badge';

export default function SignInPage() {
  const router = useRouter();
  const { setRole } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('member');
    router.push('/feed');
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <DemoBadge />
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Welcome back to HerCircle
        </h1>
        <p className="text-xs text-[var(--color-muted)]">
          Prototype demo mode: Click Sign In to enter as Approved Member (Priya Sharma).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-4 shadow-[var(--shadow-card)]">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password / Magic Link"
          type="password"
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full">
          Sign In (Demo Member)
        </Button>
        <p className="text-xs text-center text-[var(--color-muted)] pt-2">
          New here? <Link href="/apply" className="text-[var(--color-rose)] font-semibold hover:underline">Apply for membership</Link>
        </p>
      </form>
    </div>
  );
}
