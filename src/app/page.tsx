'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TopicChip } from '@/components/community/topic-chip';
import { PostCard } from '@/components/community/post-card';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockMentors } from '@/lib/mock/mentors';
import { mockCircles } from '@/lib/mock/circles';
import {
  ShieldCheck,
  HeartHandshake,
  MessageCircleHeart,
  Sparkles,
  ArrowRight,
  Lock,
  EyeOff,
  UserCheck,
} from 'lucide-react';

export default function LandingPage() {
  const featuredDiscussions = mockDiscussions.slice(0, 3);
  const featuredMentors = mockMentors.slice(0, 2);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-sage)] border border-[var(--color-sage)] text-xs font-medium text-emerald-950">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>India’s Private, Trust-First Women’s Sanctuary • Age 12+</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-charcoal)] max-w-3xl mx-auto leading-[1.15]">
          A private circle where Indian women guide, protect, and uplift each other.
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-charcoal-light)] max-w-2xl mx-auto leading-relaxed">
          Reddit-style conversations, protected topic circles, pseudonymity when you need it, and elder sisters ready with real life experience. No trolls, no algorithmic doom-scrolling, and no invasive surveillance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/apply">
            <Button size="lg" className="shadow-md text-sm px-6">
              Apply for Membership <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="secondary" size="lg" className="text-sm px-6">
              How HerCircle Works
            </Button>
          </Link>
        </div>

        <p className="text-xs text-[var(--color-muted)] font-mono">
          Reviewed by human moderators • Zero invasive biometric tests • Inclusive of all women
        </p>
      </section>

      {/* 4 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-lavender)] flex items-center justify-center text-[var(--color-charcoal)]">
            <Lock className="w-5 h-5 text-[var(--color-rose-dark)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Private, Topic-Based Circles
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            From career negotiations and financial independence to PCOS management and toddler parenting. Discussions are shielded behind membership approval and never publicly indexed.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-sage)] flex items-center justify-center text-[var(--color-charcoal)]">
            <EyeOff className="w-5 h-5 text-emerald-800" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Pseudonymous Questions
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Ask vulnerable questions with a delicate flower pseudonym (Lotus, Jasmine). Your identity is shielded from other members while maintaining platform accountability.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-rose-light)] flex items-center justify-center text-[var(--color-charcoal)]">
            <HeartHandshake className="w-5 h-5 text-[var(--color-rose-dark)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Ask an Elder Sister
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Intergenerational mentorship rooted in stated experience, not arbitrary seniority. Seasoned women lawyers, doctors, engineers, and teachers answering your public dilemmas.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-ivory-warm)] flex items-center justify-center text-[var(--color-charcoal)]">
            <UserCheck className="w-5 h-5 text-[var(--color-charcoal)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Human Moderation & Care
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Every application is vetted by human moderators. Clear anti-harassment rules, crisis resources for India, content warnings, and strict anti-doxxing safeguards.
          </p>
        </div>
      </section>

      {/* Explore Circles preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Discover Topic Circles
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Nine curated spaces where Indian women share authentic reflections
            </p>
          </div>
          <Link href="/circles" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            View all circles <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockCircles.map((circle) => (
            <TopicChip
              key={circle.id}
              name={circle.name}
              slug={circle.slug}
              iconName={circle.icon}
            />
          ))}
        </div>
      </section>

      {/* Sample Discussions Feed */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
            Meaningful Community Conversations
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            A preview of real questions and grounded advice happening inside HerCircle
          </p>
        </div>

        <div className="space-y-4">
          {featuredDiscussions.map((disc) => (
            <PostCard key={disc.id} discussion={disc} />
          ))}
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Meet Our Elder Sisters & Mentors
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Experienced women offering public guidance in engineering, law, medicine, and life transitions
            </p>
          </div>
          <Link href="/mentors" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            Explore directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredMentors.map((m) => (
            <MentorCard key={m.userId} mentor={m} />
          ))}
        </div>
      </section>

      {/* Safety & Belonging Pledge CTA */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)] p-8 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-[var(--color-rose)] mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)] max-w-xl mx-auto">
          Ready to join a community built for your peace of mind?
        </h2>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-lg mx-auto leading-relaxed">
          Open to all women aged 12+ (including transgender sisters). Free to join, thoughtfully moderated, and committed to your privacy.
        </p>
        <div className="pt-2">
          <Link href="/apply">
            <Button size="lg" className="px-8 shadow-sm">
              Apply for HerCircle Membership
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
