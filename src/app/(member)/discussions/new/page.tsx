'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { useDemo } from '@/contexts/demo-context';
import { mockCircles } from '@/lib/mock/circles';
import { ArrowLeft, Sparkles, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewDiscussionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCircle = searchParams.get('circle') || 'career-education';

  const { createDiscussion } = useDemo();

  const [circleSlug, setCircleSlug] = useState(defaultCircle);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasContentWarning, setHasContentWarning] = useState(false);
  const [contentWarning, setContentWarning] = useState('');

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
      isAnonymous,
      contentWarning: hasContentWarning ? contentWarning : undefined,
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
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Start a New Discussion
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)]">
          Share an experience, seek sisterly advice, or ask a question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]">
        {/* Circle Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            Select Topic Circle
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

        {/* Title */}
        <Input
          label="Discussion Title"
          placeholder="e.g. How to negotiate a salary correction in IT without another offer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Body */}
        <Textarea
          label="Details / Your Reflection"
          placeholder="Give background details, context, or specific dilemmas you\'d like perspectives on..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />

        {/* Anonymous Toggle with Explanation */}
        <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-ivory-warm)]/50 space-y-3">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
            />
            <span className="text-xs font-semibold text-[var(--color-charcoal)]">
              Post with an Anonymous Pseudonym (Flower Alias)
            </span>
          </label>
          {isAnonymous && <PrivacyNotice isAnonymousNotice />}
        </div>

        {/* Content Warning Option */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasContentWarning}
              onChange={(e) => setHasContentWarning(e.target.checked)}
              className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
            />
            <span className="text-xs text-[var(--color-charcoal)] font-medium">
              Add a Content Warning (e.g. domestic distress, harassment, illness)
            </span>
          </label>
          {hasContentWarning && (
            <Input
              placeholder="e.g. Mentions family conflict and emotional exhaustion"
              value={contentWarning}
              onChange={(e) => setContentWarning(e.target.value)}
              required={hasContentWarning}
            />
          )}
        </div>

        {/* Image Attachment Placeholder (Mocked) */}
        <div className="pt-2 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span className="flex items-center space-x-1">
            <ImageIcon className="w-4 h-4 text-[var(--color-muted)]" />
            <span>Image attachments: private storage buckets (Phase 2)</span>
          </span>
          <Button type="submit" size="sm">
            Publish Discussion
          </Button>
        </div>
      </form>
    </div>
  );
}
