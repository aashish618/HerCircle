'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockMentors } from '@/lib/mock/mentors';
import { mockDiscussions } from '@/lib/mock/discussions';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/community/post-card';
import { ArrowLeft, Award, CheckCircle2, MessageCircleHeart } from 'lucide-react';

export default function MentorProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const mentor = mockMentors.find((m) => m.userId === id) || mockMentors[0];
  const mentorDiscussions = mockDiscussions.filter((d) => d.authorId === mentor.userId);

  return (
    <div className="space-y-8 py-2">
      <Link
        href="/mentors"
        className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Mentor Directory
      </Link>

      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <Avatar name={mentor.user.displayName} size="xl" />
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)]">
                {mentor.user.displayName}
              </h1>
              <p className="text-xs text-[var(--color-muted)] font-medium">
                {mentor.user.city} • Joined {new Date(mentor.user.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-sm font-semibold text-[var(--color-charcoal)] pt-1">
                {mentor.headline}
              </p>
            </div>
          </div>

          <Badge variant="sage" className="shrink-0 flex items-center space-x-1.5 px-3 py-1 text-xs">
            <Award className="w-4 h-4 text-emerald-800" />
            <span>{mentor.experienceYears} Years Stated Experience</span>
          </Badge>
        </div>

        <div className="space-y-2 border-t border-[var(--color-border-light)] pt-4 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-[var(--color-charcoal)]">
            Background & Mentorship Philosophy
          </h3>
          <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
            {mentor.bio}
          </p>
        </div>

        <div className="space-y-2 border-t border-[var(--color-border-light)] pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal)]">
            Experience Areas
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {mentor.experienceAreas.map((area, i) => (
              <Badge key={i} variant="default">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-light)] text-xs text-[var(--color-muted)]">
          <span>{mentor.questionsAnswered} Community Questions Answered</span>
          <span className="text-emerald-700 font-semibold flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Available for Public Guidance
          </span>
        </div>
      </div>

      {/* Public Q&As by Mentor */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Discussions & Guidance by {mentor.user.displayName}
        </h2>
        {mentorDiscussions.length === 0 ? (
          <p className="text-xs text-[var(--color-muted)] italic">
            This mentor primarily responds to public guidance requests in topic circles.
          </p>
        ) : (
          <div className="space-y-4">
            {mentorDiscussions.map((d) => (
              <PostCard key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
