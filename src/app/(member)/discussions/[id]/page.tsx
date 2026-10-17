'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockComments } from '@/lib/mock/comments';
import { useDemo } from '@/contexts/demo-context';
import { Avatar } from '@/components/ui/avatar';
import { TopicChip } from '@/components/community/topic-chip';
import { ReactionBar } from '@/components/community/reaction-bar';
import { PollView } from '@/components/community/poll-view';
import { CommentThread } from '@/components/community/comment-thread';
import { ContentWarningWrapper } from '@/components/shared/content-warning';
import { ReportDialog } from '@/components/moderation/report-dialog';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Pin, Lock, ShieldCheck } from 'lucide-react';

export default function DiscussionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { createdDiscussions } = useDemo();
  const [reportOpen, setReportOpen] = useState(false);

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  const discussion = allDiscussions.find((d) => d.id === id);

  if (!discussion) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Discussion Not Found</h2>
        <Link href="/feed" className="text-xs text-[var(--color-rose)] hover:underline inline-flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Feed
        </Link>
      </div>
    );
  }

  const initialComments = mockComments[discussion.id] || [];

  const mainPostContent = (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)] leading-tight">
        {discussion.title}
      </h1>
      <p className="text-sm text-[var(--color-charcoal)] leading-relaxed whitespace-pre-line">
        {discussion.body}
      </p>
      {discussion.poll && <PollView poll={discussion.poll} />}
    </div>
  );

  return (
    <div className="space-y-6 py-2">
      <Link
        href="/feed"
        className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Feed
      </Link>

      <article className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-6 shadow-[var(--shadow-card)]">
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--color-border-light)]">
          <div className="flex items-center space-x-3">
            <Avatar
              name={discussion.isAnonymous ? (discussion.anonymousAlias || 'Anonymous') : discussion.authorName}
              isAnonymous={discussion.isAnonymous}
              size="md"
            />
            <div>
              <p className="text-xs font-bold text-[var(--color-charcoal)]">
                {discussion.isAnonymous ? `${discussion.anonymousAlias} (Anonymous Member)` : discussion.authorName}
              </p>
              <p className="text-[11px] text-[var(--color-muted)] font-mono">
                {formatDate(discussion.createdAt)}
              </p>
            </div>
          </div>
          <TopicChip name={discussion.circleName} slug={discussion.circleSlug} />
        </div>

        {/* Content with optional warning */}
        {discussion.contentWarning ? (
          <ContentWarningWrapper warningText={discussion.contentWarning}>
            {mainPostContent}
          </ContentWarningWrapper>
        ) : (
          mainPostContent
        )}

        {/* Reaction Bar */}
        <ReactionBar
          targetId={discussion.id}
          reactionCounts={discussion.reactionCounts}
          onReport={() => setReportOpen(true)}
        />
      </article>

      {/* Comment Thread */}
      <CommentThread discussionId={discussion.id} initialComments={initialComments} />

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        targetId={discussion.id}
        targetType="discussion"
        targetPreview={discussion.title}
      />
    </div>
  );
}
