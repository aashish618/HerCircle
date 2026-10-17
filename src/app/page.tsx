'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCircles } from '@/lib/mock/circles';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockMentors } from '@/lib/mock/mentors';
import { PostCard } from '@/components/community/post-card';
import { useAuth } from '@/contexts/auth-context';
import { useDemo } from '@/contexts/demo-context';
import {
  ShieldCheck,
  HeartHandshake,
  MessageCircleHeart,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Lock,
  EyeOff,
  UserCheck,
  ChevronDown,
  Search,
  MessageSquare,
  Plus,
  Minus,
  CheckCircle2,
  Users,
  Compass,
  Smile,
  Heart,
  Share2,
} from 'lucide-react';

export default function LandingPage() {
  const { isMember } = useAuth();
  const { createdDiscussions } = useDemo();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState('All Circles');
  const [feedTab, setFeedTab] = useState<'all' | 'elder-sister' | 'trending'>('all');

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  let discussionsToShow = allDiscussions;
  if (feedTab === 'elder-sister') {
    discussionsToShow = allDiscussions.filter((d) => d.circleSlug === 'ask-elder-sister');
  } else if (feedTab === 'trending') {
    discussionsToShow = [...allDiscussions].sort(
      (a, b) => b.reactionCounts.helpful + b.commentCount - (a.reactionCounts.helpful + a.commentCount)
    );
  }

  const faqs = [
    {
      q: 'Who is eligible to join HerMaitri?',
      a: 'HerMaitri is open to all women aged 12 and older, including cisgender and transgender women. We do not use invasive biometric or voice verification. Instead, prospective members submit a short membership application reviewed by human moderators to preserve mutual trust and safety.',
    },
    {
      q: 'How does pseudonymous / anonymous posting work?',
      a: 'When posting sensitive questions, you can choose to post anonymously. Other members will only see a flower alias (like "Lotus" or "Jasmine") and cannot trace it to your profile. Anonymous posting is pseudonymous to other members, while platform moderators maintain privileged accountability to prevent abuse.',
    },
    {
      q: 'What is the "Ask an Elder Sister" mentorship principle?',
      a: 'Elder sisters are experienced women across tech, medicine, finance, education, and life who offer guidance based on real lived experience, not age alone. Mentorship happens in public threads so multiple women learn from every conversation. No private DMs are allowed in the MVP to protect members from harassment.',
    },
    {
      q: 'How is user privacy and data protected?',
      a: 'Private community discussions are strictly noindex and never crawlable by public search engines. Your posts will never be used for AI model training without separate, explicit consent. Account deletion and data export requests are built directly into your settings.',
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-8 sm:space-y-12 pb-12">
      {/* ── TOP SECTION: LIVE CIRCLES & CAROUSEL SHOWCASE (Matching Image 1) ── */}
      <section className="px-4 sm:px-8 pt-6 sm:pt-8">
        {/* Subheader bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-sans">
                  Live Circles (9)
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                  India
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Monday, October 17, 2026 • Curated & safe for women 12+
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* User capsule */}
            <div className="hidden sm:flex items-center space-x-2 bg-gray-50 border border-gray-200/80 rounded-full px-2.5 py-1 text-xs text-gray-600">
              <div className="w-5 h-5 rounded-full bg-amber-200 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-700">Members</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs cursor-pointer hover:border-gray-300 transition">
              <span>Live Circles</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Search capsule button */}
            <Link
              href="/circles"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer"
              aria-label="Search Circles"
            >
              <Search className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── HORIZONTAL CAROUSEL SHOWCASE (Matching Image 1) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: Lavender Discussion Card (Span 4) */}
          <div className="md:col-span-4 rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D8CBFA] to-[#C8B8F6] p-6 sm:p-7 flex flex-col justify-between shadow-sm card-3d relative overflow-hidden min-h-[420px]">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-purple-900 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/50 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
                HER MAITRI HUB
              </span>
            </div>

            {/* Center content */}
            <div className="space-y-4 my-auto pt-6">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Priya"
                  className="w-8 h-8 rounded-full border-2 border-[#DDD4FA] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Fatima"
                  className="w-8 h-8 rounded-full border-2 border-[#DDD4FA] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Sneha"
                  className="w-8 h-8 rounded-full border-2 border-[#DDD4FA] object-cover"
                />
              </div>

              <div className="flex items-center space-x-1.5 text-purple-900 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full border-2 border-purple-900" />
                <span>DISCUSSION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 leading-snug font-sans">
                Negotiating salary in IT without another offer
              </h2>

              <p className="text-xs text-purple-900/80 font-medium">
                Priya S. and 4 elder sisters shared exact counter-offer scripts and compensation templates.
              </p>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-200/50">
              <span className="text-xs font-semibold text-purple-950/70">
                3.8k Members
              </span>
              <Link href="/discussions/disc-1">
                <button className="px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-purple-950 text-xs font-bold shadow-xs hover:shadow transition inline-flex items-center space-x-1">
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>

          {/* Card 2: Spotlight Mentor Centerpiece (Span 4) */}
          <div className="md:col-span-4 rounded-[28px] relative overflow-hidden shadow-md card-3d min-h-[420px] flex flex-col justify-between group">
            {/* Background Mentor Photo */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt="Dr. Ananya Iyer"
              className="absolute inset-0 w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/30" />

            {/* Top Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>LIVE</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                12.4k Followers
              </span>
            </div>

            {/* Bottom Overlay Card matching Image 1 */}
            <div className="relative z-10 m-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-950 leading-tight">
                  Dr. Ananya&apos;s Tech Corner
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  for women in IT & leadership!
                </p>
              </div>
              <Link
                href="/mentors/mentor-1"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-800 transition shrink-0 ml-3"
                aria-label="View Mentor"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Mindful / Wellness Frosted Card with 3D Floating Bubbles (Span 4) */}
          <div className="md:col-span-4 rounded-[28px] bg-gradient-to-br from-[#D8E8F5] via-[#CEE0F0] to-[#BED6EC] p-6 sm:p-7 flex flex-col justify-between shadow-sm card-3d relative overflow-hidden min-h-[420px]">
            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-blue-900 shadow-xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-blue-900/70">
                2.9k Followers
              </span>
            </div>

            {/* 3D Floating Pearlescent Spheres matching reference Image 1 */}
            <div className="relative my-2 h-36 flex items-center justify-center">
              {/* Bronze/Rose Gold Metallic Orb */}
              <div className="absolute top-2 left-10 w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-amber-600 to-amber-900 shadow-[0_10px_25px_rgba(180,83,9,0.35),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-amber-300/40 animate-float-slow" />
              
              {/* Cluster of Frosted Glass Blue Spheres */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white via-sky-300/70 to-blue-500/80 shadow-[0_15px_35px_rgba(59,130,246,0.35),inset_0_4px_8px_rgba(255,255,255,0.9)] border border-white/60 animate-float-reverse">
                  <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/90 rotate-[-25deg] blur-[1px]" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-gradient-to-br from-white/90 via-sky-200 to-blue-400 shadow-[0_8px_20px_rgba(59,130,246,0.25)] border border-white/80 animate-float-slow delay-300" />
                <div className="absolute -top-1 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-white via-indigo-200 to-purple-400 shadow-[0_6px_16px_rgba(99,102,241,0.25)] border border-white/80 animate-float-reverse delay-500" />
              </div>
            </div>

            {/* Center Content */}
            <div className="space-y-2 relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-white/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-blue-950 font-mono">
                PCOS & HORMONAL CARE
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950 leading-snug font-sans">
                Into the Mindful Mornings
              </h2>

              <p className="text-xs text-blue-950/80 font-medium">
                Grounded nutrition, gentle pranayama, and peer experiences navigating cycle irregularity naturally.
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-200/50 relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950 flex items-center space-x-1">
                <span>◎ SANCTUARY</span>
              </span>
              <Link href="/circles/health-wellness">
                <button className="px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-blue-950 text-xs font-bold shadow-xs hover:shadow transition inline-flex items-center space-x-1">
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel pagination indicators */}
        <div className="flex items-center justify-center space-x-1.5 pt-6 pb-2">
          <span className="w-8 h-1.5 rounded-full bg-gray-900" />
          <span className="w-2 h-1.5 rounded-full bg-gray-300" />
          <span className="w-2 h-1.5 rounded-full bg-gray-300" />
        </div>
      </section>

      {/* ── SECTION: LIVE COMMUNITY DISCUSSIONS FEED ── */}
      <section className="px-4 sm:px-8 space-y-5">
        <div className="rounded-[28px] border border-purple-200/70 bg-white/80 backdrop-blur-md p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950 font-sans">
                  Live Community Feed
                </h2>
              </div>
              <p className="text-xs text-purple-950/70 font-medium mt-0.5">
                Real reflections, anonymous inquiries, and grounded advice from sisters across India
              </p>
            </div>

            {/* Feed Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFeedTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  feedTab === 'all'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'bg-white border border-purple-200 text-purple-950 hover:bg-purple-50'
                }`}
              >
                All Discussions
              </button>
              <button
                onClick={() => setFeedTab('elder-sister')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  feedTab === 'elder-sister'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'bg-white border border-purple-200 text-purple-950 hover:bg-purple-50'
                }`}
              >
                Ask an Elder Sister
              </button>
              <button
                onClick={() => setFeedTab('trending')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  feedTab === 'trending'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'bg-white border border-purple-200 text-purple-950 hover:bg-purple-50'
                }`}
              >
                Trending Topics
              </button>
            </div>
          </div>

          {/* Discussions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discussionsToShow.slice(0, 6).map((disc) => (
              <PostCard key={disc.id} discussion={disc} />
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link href="/discussions/new">
              <Button size="sm" className="bg-purple-950 hover:bg-black text-white rounded-full px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center space-x-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Start New Discussion</span>
              </Button>
            </Link>

            <Link href="/circles" className="text-xs font-semibold text-purple-800 hover:underline inline-flex items-center">
              <span>View all 9 circles</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: DARK SANCTUARY SHOWCASE (Matching Image 2 - Left) ── */}
      <section className="px-4 sm:px-8">
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#121118] text-white p-8 sm:p-14 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Avatar Capsules matching reference */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Top decorative pill avatars */}
            <div className="flex items-center justify-center -space-x-3 sm:-space-x-4 mb-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-4 ring-[#121118] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-4 ring-purple-500 overflow-hidden shadow-lg z-10">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-4 ring-[#121118] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>India-First • Safe for women 12+ • Human Moderated</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] font-sans">
              Live world brimming with sisterhood and guidance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-200">
                15,000+ women
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-sans">
              An intentional sanctuary where Indian women guide, protect, and uplift one another. Protected circles, pseudonymous questions with delicate flower aliases, and seasoned elder sisters ready with real wisdom.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/apply">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-3 text-sm font-semibold shadow-md">
                  Apply for Membership <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/elder-sister">
                <Button variant="outline" className="rounded-full px-7 py-3 text-sm font-semibold border-white/20 text-white hover:bg-white/10">
                  Ask an Elder Sister
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: LILAC CELEBRATION & CIRCLES (Matching Image 2 - Bottom Right) ── */}
      <section className="px-4 sm:px-8">
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#DDD4FA] p-8 sm:p-12 text-gray-950 relative overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-900 font-mono">
                COMMUNITY HUBS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1 font-sans">
                Every day is sisterhood!
              </h2>
              <p className="text-sm text-purple-900 font-medium mt-1">
                +15k Joined • 9 Curated Circles Running Now ▾
              </p>
            </div>

            <Link href="/circles">
              <Button className="rounded-full bg-gray-950 hover:bg-black text-white px-5 py-2 text-xs font-semibold shadow-sm">
                Explore All 9 Circles <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Grid of Circle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCircles.slice(0, 6).map((circle) => (
              <Link
                key={circle.id}
                href={`/circles/${circle.slug}`}
                className="rounded-2xl bg-white/80 hover:bg-white p-5 transition shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 font-mono">
                      {circle.memberCount.toLocaleString()} sisters
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-purple-900 transition">
                    {circle.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {circle.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>{circle.discussionCount} active topics</span>
                  <span className="text-purple-700 font-semibold group-hover:underline">Enter Circle →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DARK FAQS & ANSWERED QUESTIONS (Matching Image 2 - Top Right) ── */}
      <section className="px-4 sm:px-8">
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#14121A] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading + App Badges matching Image 2 */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-purple-200">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Let&apos;s Chat</span>
              </div>

              {/* Hand-drawn style decorative arrow */}
              <div className="text-purple-300">
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M10 10 C 25 10, 35 25, 30 40 M 22 35 L 30 40 L 35 32" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
                FAQs <br />
                <span className="text-purple-300 font-light italic">and answered</span> <br />
                your questions
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                Everything you need to know about HerMaitri membership, anonymous posting safety, and elder sister mentorship.
              </p>

              {/* Install / PWA Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-gray-200 flex items-center space-x-2 cursor-pointer">
                  <span>📱 Download PWA</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-gray-200 flex items-center space-x-2 cursor-pointer">
                  <span>Google Play</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-gray-200 flex items-center space-x-2 cursor-pointer">
                  <span>App Store</span>
                </div>
              </div>

              <div className="pt-6 text-xs text-gray-500 font-mono">
                Made with love 💜 Copyright © 2026 HerMaitri
              </div>
            </div>

            {/* Right Column: Featured Testimonial + Interactive Accordion */}
            <div className="lg:col-span-7 space-y-5">
              {/* Featured Sister Testimonial Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 space-y-3">
                <div className="flex items-center space-x-1 text-amber-400 text-sm">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-gray-200 italic leading-relaxed">
                  &ldquo;HerMaitri gave me a safe, non-judgmental space to ask about salary negotiation when my parents didn&apos;t understand the corporate world. Within hours, an elder sister in IT guided me to a 35% hike.&rdquo;
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Priya S."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Priya Sharma</p>
                    <p className="text-[11px] text-gray-400">Software Engineer • Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Interactive Accordion Items */}
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/5 transition"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm sm:text-base font-semibold text-gray-100 font-sans">
                          <span className="text-purple-400 font-mono text-xs mr-2">
                            Question {String(idx + 1).padStart(2, '0')} :
                          </span>
                          {faq.q}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300 shrink-0">
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
