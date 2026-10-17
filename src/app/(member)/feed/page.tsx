'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useDemo } from '@/contexts/demo-context';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockCircles } from '@/lib/mock/circles';
import { mockMentors } from '@/lib/mock/mentors';
import { PostCard } from '@/components/community/post-card';
import { TopicChip } from '@/components/community/topic-chip';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import {
  MessageCircleQuestion,
  Plus,
  HeartHandshake,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function FeedPage() {
  const { user } = useAuth();
  const { createdDiscussions } = useDemo();
  const [activeTab, setActiveTab] = useState<'all' | 'elder-sister' | 'trending'>('all');

  // Combine newly created discussions with mock discussions
  const allDiscussions = [...createdDiscussions, ...mockDiscussions];

  let filteredDiscussions = allDiscussions;
  if (activeTab === 'elder-sister') {
    filteredDiscussions = allDiscussions.filter(
      (d) => d.circleSlug === 'ask-elder-sister'
    );
  } else if (activeTab === 'trending') {
    filteredDiscussions = [...allDiscussions].sort(
      (a, b) => b.reactionCounts.helpful + b.commentCount - (a.reactionCounts.helpful + a.commentCount)
    );
  }

  const featuredMentors = mockMentors.slice(0, 3);

  return (
    <div className="space-y-8 py-2">
      {/* Personalized Greeting Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-ivory-warm)] via-white to-[var(--color-lavender-light)]/40 p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-rose-dark)]">
              Welcome to the Circle
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)]">
              Namaste, {user?.displayName || 'Sister'}
            </h1>
            <p className="text-xs text-[var(--color-charcoal-light)]">
              What perspective or question is on your mind today?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/ask">
              <Button variant="secondary" size="sm" className="shadow-sm text-xs">
                <MessageCircleQuestion className="w-3.5 h-3.5 mr-1 text-[var(--color-rose-dark)]" />
                Ask Anonymously
              </Button>
            </Link>
            <Link href="/discussions/new">
              <Button size="sm" className="shadow-sm text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                New Discussion
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Topic Discovery Scroll */}
        <div className="pt-2 border-t border-[var(--color-border-light)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Explore Topics
          </p>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {mockCircles.map((circle) => (
              <TopicChip
                key={circle.id}
                name={circle.name}
                slug={circle.slug}
                iconName={circle.icon}
                className="shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ask an Elder Sister Banner */}
      <div className="rounded-xl border border-[var(--color-lavender)] bg-[var(--color-lavender-light)]/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-lavender)] flex items-center justify-center text-[var(--color-rose-dark)] shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold text-[var(--color-charcoal)]">
              Facing a crossroads? Ask an Elder Sister
            </h3>
            <p className="text-xs text-[var(--color-charcoal-light)]">
              Get grounded, non-judgmental guidance from older women in law, tech, and medicine.
            </p>
          </div>
        </div>
        <Link href="/elder-sister" className="shrink-0">
          <Button variant="outline" size="sm" className="bg-white/90 text-xs">
            Ask an Elder Sister →
          </Button>
        </Link>
      </div>

      {/* Feed Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'all'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }`}
          >
            All Discussions ({allDiscussions.length})
          </button>
          <button
            onClick={() => setActiveTab('elder-sister')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'elder-sister'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }`}
          >
            Ask an Elder Sister
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'trending'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }`}
          >
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </span>
          </button>
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <PostCard key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </div>
  );
}
