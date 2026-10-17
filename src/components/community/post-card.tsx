'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Discussion } from '@/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TopicChip } from './topic-chip';
import { ReactionBar } from './reaction-bar';
import { PollView } from './poll-view';
import { ContentWarningWrapper } from '@/components/shared/content-warning';
import { ReportDialog } from '@/components/moderation/report-dialog';
import { formatDate } from '@/lib/utils';
import { MessageSquare, Pin } from 'lucide-react';

export function PostCard({ discussion }: { discussion: Discussion }) {
  const [reportOpen, setReportOpen] = useState(false);

  const postContent = (
    <div className="space-y-3">
      <Link href={`/discussions/${discussion.id}`} className="block group">
        <h3 className="font-serif text-lg font-semibold text-[var(--color-charcoal)] group-hover:text-[var(--color-rose)] transition-colors">
          {discussion.title}
        </h3>
        <p className="text-sm text-[var(--color-charcoal-light)] line-clamp-3 leading-relaxed mt-1.5">
          {discussion.body}
        </p>
      </Link>

      {discussion.poll && <PollView poll={discussion.poll} />}
    </div>
  );

  return (
    <>
      <article className="rounded-xl border border-[var(--color-border)] bg-white/90 p-5 shadow-[var(--shadow-card)] card-hover transition-all space-y-3 relative">
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <Avatar
              name={discussion.isAnonymous ? (discussion.anonymousAlias || 'Anonymous') : discussion.authorName}
              isAnonymous={discussion.isAnonymous}
              size="sm"
            />
            <div className="truncate text-xs">
              <span className="font-semibold text-[var(--color-charcoal)]">
                {discussion.isAnonymous ? `${discussion.anonymousAlias} (Anonymous)` : discussion.authorName}
              </span>
              <span className="text-[var(--color-muted)] mx-1.5">•</span>
              <span className="text-[var(--color-muted)] font-mono">{formatDate(discussion.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {discussion.isPinned && (
              <Badge variant="sage" className="flex items-center space-x-1">
                <Pin className="w-3 h-3 rotate-45" /> <span>Pinned</span>
              </Badge>
            )}
            <TopicChip name={discussion.circleName} slug={discussion.circleSlug} />
          </div>
        </div>

        {/* Post Body (with Content Warning if specified) */}
        {discussion.contentWarning ? (
          <ContentWarningWrapper warningText={discussion.contentWarning}>
            {postContent}
          </ContentWarningWrapper>
        ) : (
          postContent
        )}

        {/* Footer info & Reactions */}
        <div className="pt-1">
          <ReactionBar
            targetId={discussion.id}
            reactionCounts={discussion.reactionCounts}
            onReport={() => setReportOpen(true)}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-muted)]">
            <Link
              href={`/discussions/${discussion.id}`}
              className="inline-flex items-center space-x-1 hover:text-[var(--color-charcoal)] transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{discussion.commentCount} replies</span>
            </Link>
          </div>
        </div>
      </article>

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        targetId={discussion.id}
        targetType="discussion"
        targetPreview={discussion.title}
      />
    </>
  );
}
