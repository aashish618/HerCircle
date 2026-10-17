'use client';

import React, { useState } from 'react';
import { mockMentors } from '@/lib/mock/mentors';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { Input } from '@/components/ui/input';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';
import { Users, Search, Sparkles, Award } from 'lucide-react';

export default function MentorDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = [
    'All',
    'Career & Education',
    'Health & Wellness',
    'Money & Financial Independence',
    'Women\'s Safety',
    'Ask an Elder Sister',
    'Personal Growth',
  ];

  const filteredMentors = mockMentors.filter((m) => {
    const matchesSearch =
      m.user.displayName.toLowerCase().includes(search.toLowerCase()) ||
      m.headline.toLowerCase().includes(search.toLowerCase()) ||
      m.bio.toLowerCase().includes(search.toLowerCase());

    const matchesTopic =
      selectedTopic === 'All' ||
      m.experienceAreas.some((area) =>
        area.toLowerCase().includes(selectedTopic.toLowerCase())
      );

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-8 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D0BCF8] to-[#BEA2F6] p-6 sm:p-8 border border-purple-300/80 shadow-[0_15px_35px_rgba(124,58,237,0.2)] card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Ambient Glowing 3D Lights inside banner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-white/40 via-purple-300/35 to-indigo-500/35 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-pink-400/30 via-rose-300/20 to-purple-400/25 blur-2xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>HER MAITRI MENTORSHIP • 12+ MENTORS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Mentor Directory
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            Connect with experienced women across engineering, public policy, medicine, finance, and the arts. Guidance occurs in public threads for transparent, community-wide learning.
          </p>
        </div>

        {/* 3D Pearlescent & Metallic Bubble Spheres Cluster */}
        <div className="flex items-center justify-center shrink-0 pr-4 relative z-10 scale-110 sm:scale-125">
          <BubbleSpheres3D />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3.5">
        <div className="max-w-md relative">
          <Input
            placeholder="Search mentors by name, company, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full bg-white/90 border-purple-200/80 pl-4 py-2.5 text-xs shadow-xs focus:border-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition text-xs font-semibold ${
                selectedTopic === t
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-white/80 border border-purple-200/60 text-purple-950 hover:bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMentors.map((m) => (
          <MentorCard key={m.userId} mentor={m} />
        ))}
      </div>
    </div>
  );
}
