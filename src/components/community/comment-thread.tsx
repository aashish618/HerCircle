'use client';

import React, { useState } from 'react';
import { Comment } from '@/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ReactionBar } from './reaction-bar';
import { ReportDialog } from '@/components/moderation/report-dialog';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { formatDate } from '@/lib/utils';
import { useDemo } from '@/contexts/demo-context';
import { MessageSquare, CornerDownRight } from 'lucide-react';

interface CommentThreadProps {
  discussionId: string;
  initialComments: Comment[];
}

export function CommentThread({ discussionId, initialComments }: CommentThreadProps) {
  const { customComments, createComment } = useDemo();
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const extraComments = customComments[discussionId] || [];
  const allComments = [...initialComments, ...extraComments];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    createComment(discussionId, commentText, isAnonymous);
    setCommentText('');
  };

  const handleReplySubmit = (parentId: string) => {
    if (!replyText.trim()) return;
    createComment(discussionId, replyText, isAnonymous, parentId);
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <section aria-label="Replies thread" className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Replies ({allComments.length})
        </h3>
      </div>

      {/* Main reply input box */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--color-border)] bg-white/90 p-4 space-y-3">
        <Textarea
          placeholder="Share your perspective, sisterly advice, or lived experience..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          aria-label="Add a reply"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center space-x-2 text-xs text-[var(--color-charcoal-light)] cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
            />
            <span>Reply anonymously (pseudonym alias assigned)</span>
          </label>

          <Button type="submit" size="sm" disabled={!commentText.trim()}>
            Post reply
          </Button>
        </div>

        {isAnonymous && <PrivacyNotice isAnonymousNotice className="mt-2" />}
      </form>

      {/* List of comments */}
      <div className="space-y-4">
        {allComments.map((comment) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyText={replyText}
            setReplyText={setReplyText}
            handleReplySubmit={handleReplySubmit}
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
          />
        ))}
      </div>
    </section>
  );
}

interface SingleCommentProps {
  comment: Comment;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReplySubmit: (parentId: string) => void;
}

function SingleComment({
  comment,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleReplySubmit,
}: SingleCommentProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const isReplying = replyingTo === comment.id;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white/70 p-4 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar
            name={comment.isAnonymous ? (comment.anonymousAlias || 'Anonymous') : comment.authorName}
            isAnonymous={comment.isAnonymous}
            size="sm"
          />
          <div className="text-xs">
            <span className="font-semibold text-[var(--color-charcoal)]">
              {comment.isAnonymous ? `${comment.anonymousAlias} (Anonymous)` : comment.authorName}
            </span>
            <span className="text-[var(--color-muted)] mx-1.5">•</span>
            <span className="text-[var(--color-muted)] font-mono">{formatDate(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--color-charcoal)] leading-relaxed pl-9">
        {comment.body}
      </p>

      <div className="pl-9 pt-1">
        <ReactionBar
          targetId={comment.id}
          targetType="comment"
          reactionCounts={comment.reactionCounts}
          onReport={() => setReportOpen(true)}
          showSave={false}
        />
        <div className="mt-1 flex items-center space-x-3 text-xs">
          <button
            onClick={() => setReplyingTo(isReplying ? null : comment.id)}
            className="inline-flex items-center space-x-1 text-[var(--color-rose-dark)] hover:underline font-medium"
          >
            <MessageSquare className="w-3 h-3" />
            <span>{isReplying ? 'Cancel' : 'Reply'}</span>
          </button>
        </div>

        {/* Inline reply composer */}
        {isReplying && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--color-ivory-warm)] border border-[var(--color-border)] space-y-2">
            <Textarea
              placeholder="Write a supportive reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => handleReplySubmit(comment.id)}>
                Send reply
              </Button>
            </div>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-2.5 border-l-2 border-[var(--color-lavender)] pl-3">
            {comment.replies.map((child: Comment) => (
              <div key={child.id} className="pt-2 text-xs space-y-1">
                <div className="flex items-center space-x-2">
                  <CornerDownRight className="w-3 h-3 text-[var(--color-muted)]" />
                  <Avatar
                    name={child.isAnonymous ? (child.anonymousAlias || 'Anonymous') : child.authorName}
                    isAnonymous={child.isAnonymous}
                    size="sm"
                  />
                  <span className="font-semibold text-[var(--color-charcoal)]">
                    {child.isAnonymous ? `${child.anonymousAlias} (Anonymous)` : child.authorName}
                  </span>
                  <span className="text-[var(--color-muted)] font-mono">{formatDate(child.createdAt)}</span>
                </div>
                <p className="text-sm text-[var(--color-charcoal)] pl-5 leading-relaxed">
                  {child.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        targetId={comment.id}
        targetType="comment"
        targetPreview={comment.body}
      />
    </div>
  );
}
