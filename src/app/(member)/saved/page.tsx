'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/contexts/demo-context';
import { mockDiscussions } from '@/lib/mock/discussions';
import { PostCard } from '@/components/community/post-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Bookmark, Compass, Sparkles } from 'lucide-react';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';

export default function SavedDiscussionsPage() {
  const { savedDiscussionIds, createdDiscussions } = useDemo();

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  const savedDiscussions = allDiscussions.filter((d) =>
    savedDiscussionIds.includes(d.id)
  );

  return (
    <div className="space-y-8 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D8CBFA] to-[#C8B8F6] p-6 sm:p-8 border border-purple-300/60 shadow-md card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <Bookmark className="w-3.5 h-3.5 text-purple-700" />
            <span>PRIVATE LIBRARY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Saved Discussions
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            Your bookmarked playbooks, medical advice threads, and sisterly reflections. Saved privately to your account.
          </p>
        </div>

        {/* 3D Bubble Spheres Cluster */}
        <div className="hidden md:flex items-center justify-center shrink-0 pr-4 relative z-10">
          <BubbleSpheres3D className="scale-125" />
        </div>
      </div>

      {savedDiscussions.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved discussions yet"
          description="Click the bookmark icon on any post in your feed to save it for easy reference later."
          action={
            <Link href="/feed">
              <Button size="sm">
                <Compass className="w-4 h-4 mr-1.5" /> Explore Feed
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {savedDiscussions.map((d) => (
            <PostCard key={d.id} discussion={d} />
          ))}
        </div>
      )}
    </div>
  );
}
