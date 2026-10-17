'use client';

import React from 'react';
import Link from 'next/link';
import { mockMentors } from '@/lib/mock/mentors';
import { mockDiscussions } from '@/lib/mock/discussions';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { HeartHandshake, MessageCircleQuestion, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ElderSisterPage() {
  const elderSisterDiscussions = mockDiscussions.filter(
    (d) => d.circleSlug === 'ask-elder-sister'
  );

  return (
    <div className="space-y-10 py-2">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-lavender-light)] via-white to-[var(--color-ivory-warm)] p-6 md:p-8 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-lavender)] text-xs font-bold text-[var(--color-charcoal)]">
            <HeartHandshake className="w-3.5 h-3.5 text-[var(--color-rose-dark)]" />
            <span>Intergenerational Guidance</span>
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)]">
          Ask an Elder Sister
        </h1>

        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          In traditional Indian communities, younger women turned to older sisters, aunts, and grandmothers for perspective on life transitions. Here, seasoned women guide younger sisters with grounded wisdom, professional depth, and zero moralizing.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/ask">
            <Button size="sm">
              <MessageCircleQuestion className="w-4 h-4 mr-1.5" />
              Ask an Anonymous Question
            </Button>
          </Link>
          <Link href="/mentors">
            <Button variant="outline" size="sm" className="bg-white">
              Explore Mentor Directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Mentors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Featured Mentors Ready to Guide
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Profiles based on verified stated experience across engineering, health, law, and education
            </p>
          </div>
          <Link href="/mentors" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            View all 12 mentors <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMentors.slice(0, 4).map((m) => (
            <MentorCard key={m.userId} mentor={m} />
          ))}
        </div>
      </section>

      {/* Recent Elder Sister Advice Threads */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
            Recent Advice & Life Guidance Threads
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            Transparent public threads helping the entire sisterhood learn from each dilemma
          </p>
        </div>

        <div className="space-y-4">
          {elderSisterDiscussions.map((d) => (
            <PostCard key={d.id} discussion={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
