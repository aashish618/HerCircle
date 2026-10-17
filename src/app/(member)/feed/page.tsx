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

import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';

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
      {/* 3D Violet Greeting Header matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D8CBFA] to-[#C8B8F6] p-6 sm:p-8 border border-purple-300/60 shadow-md card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>WELCOME TO THE CIRCLE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Namaste, {user?.displayName || 'Sister'}
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            What perspective or question is on your mind today? Connect, ask with pseudonyms, or seek advice from elder sisters.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Link href="/discussions/new">
              <Button size="sm" className="bg-purple-950 hover:bg-black text-white rounded-full px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Start Discussion
              </Button>
            </Link>
            <Link href="/ask">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white text-purple-950 border-purple-200 rounded-full px-5 py-2 text-xs font-semibold inline-flex items-center">
                <MessageCircleQuestion className="w-3.5 h-3.5 mr-1 text-purple-800" />
                Ask Anonymously
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Bubble Spheres Cluster */}
        <div className="hidden md:flex items-center justify-center shrink-0 pr-4 relative z-10">
          <BubbleSpheres3D className="scale-125" />
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
