'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockCircles } from '@/lib/mock/circles';
import { Input } from '@/components/ui/input';
import { TopicChip } from '@/components/community/topic-chip';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';
import { Users, MessageSquare, Search, ArrowRight, ArrowUpRight, Compass } from 'lucide-react';

export default function CirclesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCircles = mockCircles.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D0BCF8] to-[#BEA2F6] p-6 sm:p-8 border border-purple-300/80 shadow-[0_15px_35px_rgba(124,58,237,0.2)] card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Ambient Glowing 3D Lights inside banner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-white/40 via-purple-300/35 to-indigo-500/35 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-pink-400/30 via-rose-300/20 to-purple-400/25 blur-2xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <Compass className="w-3.5 h-3.5 text-purple-700" />
            <span>COMMUNITY HUBS • 9 CIRCLES</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Explore Topic Circles
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            Nine private, moderated circles designed around the real facets of Indian women&apos;s lives. Join circles to participate in focused discussions.
          </p>
        </div>

        {/* 3D Pearlescent & Metallic Bubble Spheres Cluster */}
        <div className="flex items-center justify-center shrink-0 pr-4 relative z-10 scale-110 sm:scale-125">
          <BubbleSpheres3D />
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Input
          placeholder="Search circles by name or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full bg-white/90 border-purple-200/80 pl-4 py-2.5 text-xs shadow-xs focus:border-purple-500"
        />
      </div>

      {/* Circle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCircles.map((circle) => (
          <div
            key={circle.id}
            className="rounded-[24px] border border-purple-200/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm card-3d flex flex-col justify-between space-y-4 hover:border-purple-400 hover:shadow-md transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <TopicChip name={circle.name} slug={circle.slug} iconName={circle.icon} />
                <span className="text-xs text-purple-900 font-mono font-bold">
                  {circle.memberCount.toLocaleString()} members
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-950 group-hover:text-purple-900 transition">
                {circle.name}
              </h2>

              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {circle.description}
              </p>
            </div>

            <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center space-x-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                <span>{circle.discussionCount} conversations</span>
              </span>

              <Link href={`/circles/${circle.slug}`}>
                <button className="px-4 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition inline-flex items-center space-x-1">
                  <span>Enter Circle</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
