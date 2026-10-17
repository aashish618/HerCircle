'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { useDemo } from '@/contexts/demo-context';
import { mockCircles } from '@/lib/mock/circles';
import { EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AskAnonymouslyPage() {
  const router = useRouter();
  const { createDiscussion } = useDemo();

  const [circleSlug, setCircleSlug] = useState('ask-elder-sister');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const selectedCircle = mockCircles.find((c) => c.slug === circleSlug) || mockCircles[0];

    const newDisc = createDiscussion({
      circleSlug: selectedCircle.slug,
      circleName: selectedCircle.name,
      circleId: selectedCircle.id,
      title,
      body,
      isAnonymous: true,
    });

    router.push(`/discussions/${newDisc.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-6">
      <Link
        href="/feed"
        className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Feed
      </Link>

      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[var(--color-lavender)] text-xs font-semibold text-[var(--color-charcoal)] mb-1">
          <EyeOff className="w-3.5 h-3.5 text-[var(--color-rose-dark)] mr-1" />
          <span>Pseudonymous Question</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Ask an Anonymous Question
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)]">
          Your name and avatar will be replaced with an auto-assigned flower alias (e.g. Lotus, Jasmine).
        </p>
      </div>

      <PrivacyNotice isAnonymousNotice />

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            Destination Circle
          </label>
          <select
            value={circleSlug}
            onChange={(e) => setCircleSlug(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)]"
          >
            {mockCircles.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Your Question"
          placeholder="e.g. Dealing with family pressure to marry at 26 while preparing for UPSC"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Background & Specific Context"
          placeholder="Explain your situation openly. Sisters in this circle will respond with warmth and perspective..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          required
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm">
            Post Anonymously
          </Button>
        </div>
      </form>
    </div>
  );
}
