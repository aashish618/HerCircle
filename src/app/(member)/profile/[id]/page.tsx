'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockUsers } from '@/lib/mock/users';
import { mockDiscussions } from '@/lib/mock/discussions';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/community/post-card';
import { formatDate } from '@/lib/utils';
import { MapPin, Calendar, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
  const userDiscussions = mockDiscussions.filter((d) => d.authorId === user.id);

  return (
    <div className="space-y-8 py-2">
      {/* Profile Card */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Avatar name={user.displayName} size="xl" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)]">
                {user.displayName}
              </h1>
              <Badge variant="sage">{user.role}</Badge>
            </div>
            {user.city && (
              <p className="text-xs text-[var(--color-muted)] flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[var(--color-rose)]" /> {user.city}
              </p>
            )}
            <p className="text-xs text-[var(--color-muted)] flex items-center pt-0.5">
              <Calendar className="w-3.5 h-3.5 mr-1" /> Member since {formatDate(user.joinedAt)}
            </p>
          </div>
        </div>

        {user.bio && (
          <div className="pt-3 border-t border-[var(--color-border-light)] text-xs text-[var(--color-charcoal)] leading-relaxed">
            <p>{user.bio}</p>
          </div>
        )}
      </div>

      {/* Member Activity */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Conversations Started by {user.displayName}
        </h2>
        {userDiscussions.length === 0 ? (
          <p className="text-xs text-[var(--color-muted)] italic">
            No public discussions posted yet.
          </p>
        ) : (
          <div className="space-y-4">
            {userDiscussions.map((d) => (
              <PostCard key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
