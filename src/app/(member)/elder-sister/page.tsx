'use client';

import React from 'react';
import Link from 'next/link';
import { mockMentors } from '@/lib/mock/mentors';
import { mockDiscussions } from '@/lib/mock/discussions';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';
import { HeartHandshake, MessageCircleQuestion, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ElderSisterPage() {
  const elderSisterDiscussions = mockDiscussions.filter(
    (d) => d.circleSlug === 'ask-elder-sister'
  );

  return (
    <div className="space-y-10 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D0BCF8] to-[#BEA2F6] p-6 sm:p-8 border border-purple-300/80 shadow-[0_15px_35px_rgba(124,58,237,0.2)] card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Ambient Glowing 3D Lights inside banner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-white/40 via-purple-300/35 to-indigo-500/35 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-pink-400/30 via-rose-300/20 to-purple-400/25 blur-2xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-700" />
            <span>INTERGENERATIONAL GUIDANCE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Ask an Elder Sister
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            In traditional Indian communities, younger women turned to older sisters, aunts, and grandmothers for perspective on life transitions. Here, seasoned women guide younger sisters with grounded wisdom, professional depth, and zero moralizing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/ask">
              <Button size="sm" className="bg-purple-950 hover:bg-black text-white rounded-full px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center">
                <MessageCircleQuestion className="w-3.5 h-3.5 mr-1.5" />
                Ask an Anonymous Question
              </Button>
            </Link>
            <Link href="/mentors">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white text-purple-950 border-purple-200 rounded-full px-5 py-2 text-xs font-semibold">
                Explore Mentor Directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Pearlescent & Metallic Bubble Spheres Cluster */}
        <div className="flex items-center justify-center shrink-0 pr-4 relative z-10 scale-110 sm:scale-125">
          <BubbleSpheres3D />
        </div>
      </div>

      {/* Featured Mentors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-950">
              Featured Mentors Ready to Guide
            </h2>
            <p className="text-xs text-gray-600">
              Profiles based on verified stated experience across engineering, health, law, and education
            </p>
          </div>
          <Link href="/mentors" className="text-xs font-semibold text-purple-800 hover:underline flex items-center">
            View all 12 mentors <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockMentors.slice(0, 4).map((m) => (
            <MentorCard key={m.userId} mentor={m} />
          ))}
        </div>
      </section>

      {/* Recent Elder Sister Advice Threads */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-950">
            Recent Advice & Life Guidance Threads
          </h2>
          <p className="text-xs text-gray-600">
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
