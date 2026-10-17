'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockCircles } from '@/lib/mock/circles';
import { mockDiscussions } from '@/lib/mock/discussions';
import { useDemo } from '@/contexts/demo-context';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/empty-state';
import { Users, MessageSquare, ShieldCheck, Plus, ArrowLeft } from 'lucide-react';

export default function CircleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { createdDiscussions } = useDemo();

  const circle = mockCircles.find((c) => c.slug === slug);

  if (!circle) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Circle Not Found</h2>
        <Link href="/circles">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Circles
          </Button>
        </Link>
      </div>
    );
  }

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  const circleDiscussions = allDiscussions.filter((d) => d.circleSlug === slug);

  return (
    <div className="space-y-8 py-2">
      {/* Circle Banner */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 md:p-8 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <Link
              href="/circles"
              className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> All Circles
            </Link>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
              {circle.name}
            </h1>
            <p className="text-sm text-[var(--color-charcoal-light)] max-w-xl leading-relaxed">
              {circle.description}
            </p>
          </div>

          <Link href={`/discussions/new?circle=${circle.slug}`}>
            <Button size="sm" className="shadow-sm text-xs shrink-0">
              <Plus className="w-3.5 h-3.5 mr-1" /> Start Discussion
            </Button>
          </Link>
        </div>

        {/* Rules & Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--color-border-light)] text-xs">
          <div className="rounded-lg bg-[var(--color-ivory-warm)] p-3">
            <p className="font-semibold text-[var(--color-charcoal)] mb-0.5">Circle Rules</p>
            <p className="text-[var(--color-muted)] leading-relaxed">{circle.rules}</p>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <div>
              <p className="text-[var(--color-muted)]">Members</p>
              <p className="font-bold text-sm text-[var(--color-charcoal)]">{circle.memberCount}</p>
            </div>
            <div>
              <p className="text-[var(--color-muted)]">Conversations</p>
              <p className="font-bold text-sm text-[var(--color-charcoal)]">{circleDiscussions.length}</p>
            </div>
            <div>
              <p className="text-[var(--color-muted)]">Privacy</p>
              <Badge variant="sage">Members Only</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Conversations in {circle.name}
        </h2>

        {circleDiscussions.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No discussions yet"
            description="Be the first sister to post a question or reflection in this circle."
            action={
              <Link href={`/discussions/new?circle=${circle.slug}`}>
                <Button size="sm">Create First Discussion</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {circleDiscussions.map((d) => (
              <PostCard key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
