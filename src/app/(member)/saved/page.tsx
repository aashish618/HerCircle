'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/contexts/demo-context';
import { mockDiscussions } from '@/lib/mock/discussions';
import { PostCard } from '@/components/community/post-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Bookmark, Compass } from 'lucide-react';

export default function SavedDiscussionsPage() {
  const { savedDiscussionIds, createdDiscussions } = useDemo();

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  const savedDiscussions = allDiscussions.filter((d) =>
    savedDiscussionIds.includes(d.id)
  );

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Saved Discussions
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Your bookmarked playbooks, medical advice threads, and sisterly reflections. Saved privately to your account.
        </p>
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
