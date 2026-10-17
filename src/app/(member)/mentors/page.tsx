'use client';

import React, { useState } from 'react';
import { mockMentors } from '@/lib/mock/mentors';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Sparkles } from 'lucide-react';

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
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Mentor Directory
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Connect with experienced women across engineering, public policy, medicine, finance, and the arts. Guidance occurs in public threads for transparent, community-wide learning.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="max-w-md">
          <Input
            placeholder="Search mentors by name, company, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
                selectedTopic === t
                  ? 'bg-[var(--color-rose)] text-white font-semibold shadow-sm'
                  : 'bg-white border border-[var(--color-border)] text-[var(--color-charcoal-light)] hover:bg-black/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((m) => (
          <MentorCard key={m.userId} mentor={m} />
        ))}
      </div>
    </div>
  );
}
