import fs from 'fs';

// 1. reaction-bar.tsx
const reactionBar = `'use client';

import React from 'react';
import { Sparkles, Lightbulb, CheckCircle2, Heart, Bookmark, Flag } from 'lucide-react';
import { ReactionCounts, ReactionType } from '@/lib/types';
import { useDemo } from '@/contexts/demo-context';
import { cn } from '@/lib/utils';

interface ReactionBarProps {
  targetId: string;
  reactionCounts: ReactionCounts;
  targetType?: 'discussion' | 'comment';
  onReport?: () => void;
  showSave?: boolean;
}

export function ReactionBar({
  targetId,
  reactionCounts,
  onReport,
  showSave = true,
}: ReactionBarProps) {
  const { userReactions, toggleReaction, isSaved, toggleSave } = useDemo();
  const currentReaction = userReactions[targetId];
  const saved = isSaved(targetId);

  const reactions: { type: ReactionType; label: string; icon: any; count: number; activeColor: string }[] = [
    {
      type: 'support',
      label: 'Support',
      icon: Sparkles,
      count: reactionCounts.support + (currentReaction === 'support' ? 1 : 0),
      activeColor: 'bg-[var(--color-rose-light)] text-[var(--color-rose-dark)] border-[var(--color-rose)]',
    },
    {
      type: 'insightful',
      label: 'Insightful',
      icon: Lightbulb,
      count: reactionCounts.insightful + (currentReaction === 'insightful' ? 1 : 0),
      activeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      type: 'helpful',
      label: 'Helpful',
      icon: CheckCircle2,
      count: reactionCounts.helpful + (currentReaction === 'helpful' ? 1 : 0),
      activeColor: 'bg-[var(--color-sage)] text-emerald-900 border-emerald-300',
    },
    {
      type: 'heart',
      label: 'Warmth',
      icon: Heart,
      count: reactionCounts.heart + (currentReaction === 'heart' ? 1 : 0),
      activeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-light)] text-xs">
      <div className="flex flex-wrap items-center gap-1.5">
        {reactions.map((r) => {
          const Icon = r.icon;
          const isActive = currentReaction === r.type;
          return (
            <button
              key={r.type}
              onClick={() => toggleReaction(targetId, r.type)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border)] transition-all hover:bg-black/5',
                isActive && r.activeColor
              )}
            >
              <Icon className={cn('w-3.5 h-3.5', isActive ? 'fill-current' : 'text-[var(--color-muted)]')} />
              <span className="font-medium">{r.label}</span>
              <span className="opacity-75 font-mono text-[11px]">{r.count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2">
        {showSave && (
          <button
            onClick={() => toggleSave(targetId)}
            aria-label={saved ? 'Remove from saved' : 'Save discussion'}
            className={cn(
              'p-1.5 rounded-full border border-[var(--color-border)] transition hover:bg-black/5',
              saved ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)]' : 'text-[var(--color-muted)]'
            )}
          >
            <Bookmark className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
          </button>
        )}
        {onReport && (
          <button
            onClick={onReport}
            aria-label="Report content"
            className="p-1.5 rounded-full border border-transparent text-[var(--color-muted)] hover:text-rose-700 hover:bg-rose-50 transition"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/community/reaction-bar.tsx', reactionBar);

// 2. topic-chip.tsx
const topicChip = `import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Shirt,
  Heart,
  Shield,
  Users,
  Wallet,
  Baby,
  Sparkles,
  MessageCircleHeart,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, any> = {
  GraduationCap,
  Shirt,
  Heart,
  Shield,
  Users,
  Wallet,
  Baby,
  Sparkles,
  MessageCircleHeart,
};

interface TopicChipProps {
  name: string;
  slug: string;
  iconName?: string;
  className?: string;
  isActive?: boolean;
}

export function TopicChip({ name, slug, iconName, className, isActive }: TopicChipProps) {
  const Icon = (iconName && ICON_MAP[iconName]) || Tag;

  return (
    <Link
      href={\`/circles/\${slug}\`}
      className={cn(
        'inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] transition-all hover:bg-[var(--color-lavender-light)]',
        isActive
          ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] font-semibold shadow-sm'
          : 'bg-white/80 text-[var(--color-charcoal-light)]',
        className
      )}
    >
      <Icon className="w-3 h-3 text-[var(--color-rose)]" />
      <span>{name}</span>
    </Link>
  );
}
`;
fs.writeFileSync('src/components/community/topic-chip.tsx', topicChip);

// 3. poll-view.tsx
const pollView = `'use client';

import React, { useState } from 'react';
import { Poll } from '@/lib/types';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PollView({ poll }: { poll: Poll }) {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(poll.userVote);
  const [votes, setVotes] = useState(poll.options);
  const [total, setTotal] = useState(poll.totalVotes);

  const handleVote = (index: number) => {
    if (selectedOption !== undefined) return;
    setSelectedOption(index);
    setVotes((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setTotal((prev) => prev + 1);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)]/60 p-4 my-3 space-y-3">
      <h4 className="text-sm font-semibold text-[var(--color-charcoal)]">{poll.question}</h4>
      <div className="space-y-2">
        {votes.map((option, idx) => {
          const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;
          const isChosen = selectedOption === idx;

          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              disabled={selectedOption !== undefined}
              className={cn(
                'w-full text-left relative overflow-hidden rounded-lg border p-2.5 text-xs transition-all flex items-center justify-between',
                selectedOption !== undefined ? 'cursor-default' : 'hover:border-[var(--color-rose)] cursor-pointer',
                isChosen ? 'border-[var(--color-rose)] bg-white' : 'border-[var(--color-border)] bg-white/70'
              )}
            >
              {selectedOption !== undefined && (
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-lavender)]/50 transition-all duration-500"
                  style={{ width: \`\${percentage}%\` }}
                />
              )}
              <span className="relative z-10 flex items-center font-medium">
                {isChosen && <Check className="w-3.5 h-3.5 mr-1.5 text-[var(--color-rose)]" />}
                {option.text}
              </span>
              {selectedOption !== undefined && (
                <span className="relative z-10 font-mono text-[var(--color-muted)] font-semibold">
                  {percentage}% ({option.votes})
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-[var(--color-muted)] text-right font-mono">
        {total} total community votes
      </p>
    </div>
  );
}
`;
fs.writeFileSync('src/components/community/poll-view.tsx', pollView);

// 4. post-card.tsx
const postCard = `'use client';

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
      <Link href={\`/discussions/\${discussion.id}\`} className="block group">
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
                {discussion.isAnonymous ? \`\${discussion.anonymousAlias} (Anonymous)\` : discussion.authorName}
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
              href={\`/discussions/\${discussion.id}\`}
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
`;
fs.writeFileSync('src/components/community/post-card.tsx', postCard);

// 5. comment-thread.tsx
const commentThread = `'use client';

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

function SingleComment({
  comment,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleReplySubmit,
  isAnonymous,
  setIsAnonymous,
}: any) {
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
              {comment.isAnonymous ? \`\${comment.anonymousAlias} (Anonymous)\` : comment.authorName}
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
            {comment.replies.map((child: any) => (
              <div key={child.id} className="pt-2 text-xs space-y-1">
                <div className="flex items-center space-x-2">
                  <CornerDownRight className="w-3 h-3 text-[var(--color-muted)]" />
                  <Avatar
                    name={child.isAnonymous ? (child.anonymousAlias || 'Anonymous') : child.authorName}
                    isAnonymous={child.isAnonymous}
                    size="sm"
                  />
                  <span className="font-semibold text-[var(--color-charcoal)]">
                    {child.isAnonymous ? \`\${child.anonymousAlias} (Anonymous)\` : child.authorName}
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
`;
fs.writeFileSync('src/components/community/comment-thread.tsx', commentThread);

// 6. mentor-card.tsx
const mentorCard = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MentorProfile } from '@/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { CheckCircle2, MessageCircleHeart, Award } from 'lucide-react';

export function MentorCard({ mentor }: { mentor: MentorProfile }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setDialogOpen(false);
      setTopic('');
      setMessage('');
    }, 1500);
  };

  return (
    <>
      <div className="rounded-xl border border-[var(--color-border)] bg-white/90 p-5 shadow-[var(--shadow-card)] card-hover flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              <Avatar name={mentor.user.displayName} size="lg" />
              <div>
                <Link
                  href={\`/mentors/\${mentor.userId}\`}
                  className="font-serif text-base font-bold text-[var(--color-charcoal)] hover:text-[var(--color-rose)] transition"
                >
                  {mentor.user.displayName}
                </Link>
                <p className="text-xs text-[var(--color-muted)]">{mentor.user.city}</p>
              </div>
            </div>
            <Badge variant="sage" className="shrink-0 flex items-center space-x-1">
              <Award className="w-3 h-3 text-emerald-800" />
              <span>{mentor.experienceYears} yrs exp</span>
            </Badge>
          </div>

          <p className="text-xs font-medium text-[var(--color-charcoal)] leading-snug">
            {mentor.headline}
          </p>

          <p className="text-xs text-[var(--color-charcoal-light)] line-clamp-3 leading-relaxed">
            {mentor.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {mentor.experienceAreas.map((area, i) => (
              <Badge key={i} variant="default" className="text-[11px]">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted)] font-mono">
            {mentor.questionsAnswered} public answers
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setDialogOpen(true)}
            className="text-xs"
          >
            <MessageCircleHeart className="w-3.5 h-3.5 mr-1 text-[var(--color-rose-dark)]" />
            Request Guidance
          </Button>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={\`Request Guidance from \${mentor.user.displayName}\`}
      >
        {sent ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-lg font-bold">Guidance Request Sent</h4>
            <p className="text-xs text-[var(--color-muted)]">
              {mentor.user.displayName} will review and respond in a public guidance thread.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
              HerCircle mentorship operates via transparent, public Q&A threads so guidance benefits other sisters too. No private DMs are allowed in this MVP.
            </p>
            <Input
              label="Topic of Guidance"
              placeholder="e.g., Salary negotiation in IT or Switching to UPSC"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <Textarea
              label="Your Question / Situation"
              placeholder="Briefly describe your question and any specific context..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Submit Request
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}
`;
fs.writeFileSync('src/components/mentorship/mentor-card.tsx', mentorCard);

// 7. report-dialog.tsx
const reportDialog = `'use client';

import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDemo } from '@/contexts/demo-context';
import { ReportCategory } from '@/lib/types';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'discussion' | 'comment' | 'user';
  targetPreview: string;
}

export function ReportDialog({
  open,
  onClose,
  targetId,
  targetType,
  targetPreview,
}: ReportDialogProps) {
  const { submitReport } = useDemo();
  const [category, setCategory] = useState<ReportCategory>('harassment');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      targetType,
      targetId,
      targetPreview,
      category,
      description,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 1500);
  };

  const categories: { value: ReportCategory; label: string; desc: string }[] = [
    { value: 'harassment', label: 'Harassment & Bullying', desc: 'Threats, abusive language, or persistent targetting' },
    { value: 'doxxing', label: 'Doxxing & Privacy Breach', desc: 'Sharing private phone, address, or workplace info without consent' },
    { value: 'spam', label: 'Spam & Commercial Promotion', desc: 'Unsolicited WhatsApp links, products, or crypto schemes' },
    { value: 'misinformation', label: 'Dangerous Health Advice', desc: 'Medical or legal advice claiming authoritative certainty' },
    { value: 'self_harm', label: 'Crisis / Self-Harm Distress', desc: 'Immediate human escalation for emotional crisis' },
    { value: 'other', label: 'Other Guideline Violation', desc: 'Content violating community dignity or trust' },
  ];

  return (
    <Dialog open={open} onClose={onClose} title="Report to Moderation Team">
      {submitted ? (
        <div className="py-6 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
            Report Submitted
          </h4>
          <p className="text-xs text-[var(--color-muted)]">
            Our human moderator team will review this in the queue promptly. Thank you for protecting the sisterhood.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-[var(--color-charcoal-light)]">
            Reporting: <em className="text-[var(--color-charcoal)] font-medium">"{targetPreview.slice(0, 60)}..."</em>
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
              Violation Category
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {categories.map((c) => (
                <label
                  key={c.value}
                  className="flex items-start space-x-2.5 p-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-ivory-warm)] cursor-pointer text-xs"
                >
                  <input
                    type="radio"
                    name="report-category"
                    value={c.value}
                    checked={category === c.value}
                    onChange={() => setCategory(c.value)}
                    className="mt-0.5 text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
                  />
                  <div>
                    <span className="font-semibold text-[var(--color-charcoal)]">{c.label}</span>
                    <p className="text-[11px] text-[var(--color-muted)]">{c.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Textarea
            label="Additional Context (Optional)"
            placeholder="Add any specifics that help our human moderators evaluate this quickly..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" variant="destructive">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Submit Report
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
`;
fs.writeFileSync('src/components/moderation/report-dialog.tsx', reportDialog);

console.log('Successfully generated community and moderation components.');
