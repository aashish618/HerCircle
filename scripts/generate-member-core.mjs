import fs from 'fs';

// 1. Member Home Feed: src/app/(member)/feed/page.tsx
const feedPage = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useDemo } from '@/contexts/demo-context';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockCircles } from '@/lib/mock/circles';
import { mockMentors } from '@/lib/mock/mentors';
import { PostCard } from '@/components/community/post-card';
import { TopicChip } from '@/components/community/topic-chip';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import {
  MessageCircleQuestion,
  Plus,
  HeartHandshake,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function FeedPage() {
  const { user } = useAuth();
  const { createdDiscussions } = useDemo();
  const [activeTab, setActiveTab] = useState<'all' | 'elder-sister' | 'trending'>('all');

  // Combine newly created discussions with mock discussions
  const allDiscussions = [...createdDiscussions, ...mockDiscussions];

  let filteredDiscussions = allDiscussions;
  if (activeTab === 'elder-sister') {
    filteredDiscussions = allDiscussions.filter(
      (d) => d.circleSlug === 'ask-elder-sister'
    );
  } else if (activeTab === 'trending') {
    filteredDiscussions = [...allDiscussions].sort(
      (a, b) => b.reactionCounts.helpful + b.commentCount - (a.reactionCounts.helpful + a.commentCount)
    );
  }

  const featuredMentors = mockMentors.slice(0, 3);

  return (
    <div className="space-y-8 py-2">
      {/* Personalized Greeting Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-ivory-warm)] via-white to-[var(--color-lavender-light)]/40 p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-rose-dark)]">
              Welcome to the Circle
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)]">
              Namaste, {user?.displayName || 'Sister'}
            </h1>
            <p className="text-xs text-[var(--color-charcoal-light)]">
              What perspective or question is on your mind today?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/ask">
              <Button variant="secondary" size="sm" className="shadow-sm text-xs">
                <MessageCircleQuestion className="w-3.5 h-3.5 mr-1 text-[var(--color-rose-dark)]" />
                Ask Anonymously
              </Button>
            </Link>
            <Link href="/discussions/new">
              <Button size="sm" className="shadow-sm text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                New Discussion
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Topic Discovery Scroll */}
        <div className="pt-2 border-t border-[var(--color-border-light)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Explore Topics
          </p>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {mockCircles.map((circle) => (
              <TopicChip
                key={circle.id}
                name={circle.name}
                slug={circle.slug}
                iconName={circle.icon}
                className="shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ask an Elder Sister Banner */}
      <div className="rounded-xl border border-[var(--color-lavender)] bg-[var(--color-lavender-light)]/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-lavender)] flex items-center justify-center text-[var(--color-rose-dark)] shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold text-[var(--color-charcoal)]">
              Facing a crossroads? Ask an Elder Sister
            </h3>
            <p className="text-xs text-[var(--color-charcoal-light)]">
              Get grounded, non-judgmental guidance from older women in law, tech, and medicine.
            </p>
          </div>
        </div>
        <Link href="/elder-sister" className="shrink-0">
          <Button variant="outline" size="sm" className="bg-white/90 text-xs">
            Ask an Elder Sister →
          </Button>
        </Link>
      </div>

      {/* Feed Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition \${
              activeTab === 'all'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }\`}
          >
            All Discussions ({allDiscussions.length})
          </button>
          <button
            onClick={() => setActiveTab('elder-sister')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition \${
              activeTab === 'elder-sister'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }\`}
          >
            Ask an Elder Sister
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition \${
              activeTab === 'trending'
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-black/5'
            }\`}
          >
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </span>
          </button>
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <PostCard key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/feed/page.tsx', feedPage);

// 2. Explore Circles: src/app/(member)/circles/page.tsx
const circlesPage = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockCircles } from '@/lib/mock/circles';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TopicChip } from '@/components/community/topic-chip';
import { Users, MessageSquare, Search, ArrowRight } from 'lucide-react';

export default function CirclesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCircles = mockCircles.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Explore Topic Circles
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Nine private, moderated circles designed around the real facets of Indian women\\'s lives.
        </p>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search circles by name or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCircles.map((circle) => (
          <Card key={circle.id} className="flex flex-col justify-between hover:border-[var(--color-rose)] transition">
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <TopicChip name={circle.name} slug={circle.slug} iconName={circle.icon} />
                <span className="text-xs text-[var(--color-muted)] font-mono">
                  {circle.memberCount} members
                </span>
              </div>
              <CardTitle className="text-lg">{circle.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                {circle.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-muted)] flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{circle.discussionCount} conversations</span>
              </span>
              <Link href={\`/circles/\${circle.slug}\`}>
                <Button variant="outline" size="sm" className="text-xs">
                  Enter Circle <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/circles/page.tsx', circlesPage);

// 3. Circle Detail: src/app/(member)/circles/[slug]/page.tsx
const circleDetailPage = `'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockCircles } from '@/lib/mock/circles';
import { mockDiscussions } from '@/lib/mock/discussions';
import { useDemo } from '@/contexts/demo-context';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/empty-state';
import { Users, MessageSquare, ShieldCheck, Plus, ArrowLeft } from 'lucide-react';

export default function CircleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { createdDiscussions } = useDemo();

  const circle = mockCircles.find((c) => c.slug === slug);

  if (!circle) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Circle Not Found</h2>
        <Link href="/circles">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Circles
          </Button>
        </Link>
      </div>
    );
  }

  const allDiscussions = [...createdDiscussions, ...mockDiscussions];
  const circleDiscussions = allDiscussions.filter((d) => d.circleSlug === slug);

  return (
    <div className="space-y-8 py-2">
      {/* Circle Banner */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 md:p-8 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <Link
              href="/circles"
              className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> All Circles
            </Link>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
              {circle.name}
            </h1>
            <p className="text-sm text-[var(--color-charcoal-light)] max-w-xl leading-relaxed">
              {circle.description}
            </p>
          </div>

          <Link href={\`/discussions/new?circle=\${circle.slug}\`}>
            <Button size="sm" className="shadow-sm text-xs shrink-0">
              <Plus className="w-3.5 h-3.5 mr-1" /> Start Discussion
            </Button>
          </Link>
        </div>

        {/* Rules & Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--color-border-light)] text-xs">
          <div className="rounded-lg bg-[var(--color-ivory-warm)] p-3">
            <p className="font-semibold text-[var(--color-charcoal)] mb-0.5">Circle Rules</p>
            <p className="text-[var(--color-muted)] leading-relaxed">{circle.rules}</p>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <div>
              <p className="text-[var(--color-muted)]">Members</p>
              <p className="font-bold text-sm text-[var(--color-charcoal)]">{circle.memberCount}</p>
            </div>
            <div>
              <p className="text-[var(--color-muted)]">Conversations</p>
              <p className="font-bold text-sm text-[var(--color-charcoal)]">{circleDiscussions.length}</p>
            </div>
            <div>
              <p className="text-[var(--color-muted)]">Privacy</p>
              <Badge variant="sage">Members Only</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Conversations in {circle.name}
        </h2>

        {circleDiscussions.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No discussions yet"
            description="Be the first sister to post a question or reflection in this circle."
            action={
              <Link href={\`/discussions/new?circle=\${circle.slug}\`}>
                <Button size="sm">Create First Discussion</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {circleDiscussions.map((d) => (
              <PostCard key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/circles/[slug]/page.tsx', circleDetailPage);

// 4. Discussion Detail: src/app/(member)/discussions/[id]/page.tsx
const discussionDetailPage = `'use client';

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
                {discussion.isAnonymous ? \`\${discussion.anonymousAlias} (Anonymous Member)\` : discussion.authorName}
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
`;
fs.writeFileSync('src/app/(member)/discussions/[id]/page.tsx', discussionDetailPage);

// 5. Create Discussion: src/app/(member)/discussions/new/page.tsx
const createDiscussionPage = `'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { useDemo } from '@/contexts/demo-context';
import { mockCircles } from '@/lib/mock/circles';
import { ArrowLeft, Sparkles, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewDiscussionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCircle = searchParams.get('circle') || 'career-education';

  const { createDiscussion } = useDemo();

  const [circleSlug, setCircleSlug] = useState(defaultCircle);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasContentWarning, setHasContentWarning] = useState(false);
  const [contentWarning, setContentWarning] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const selectedCircle = mockCircles.find((c) => c.slug === circleSlug) || mockCircles[0];

    const newDisc = createDiscussion({
      circleSlug: selectedCircle.slug,
      circleName: selectedCircle.name,
      circleId: selectedCircle.id,
      title,
      body,
      isAnonymous,
      contentWarning: hasContentWarning ? contentWarning : undefined,
    });

    router.push(\`/discussions/\${newDisc.id}\`);
  };

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-6">
      <Link
        href="/feed"
        className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Feed
      </Link>

      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Start a New Discussion
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)]">
          Share an experience, seek sisterly advice, or ask a question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]">
        {/* Circle Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            Select Topic Circle
          </label>
          <select
            value={circleSlug}
            onChange={(e) => setCircleSlug(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)]"
          >
            {mockCircles.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <Input
          label="Discussion Title"
          placeholder="e.g. How to negotiate a salary correction in IT without another offer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Body */}
        <Textarea
          label="Details / Your Reflection"
          placeholder="Give background details, context, or specific dilemmas you\\'d like perspectives on..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />

        {/* Anonymous Toggle with Explanation */}
        <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-ivory-warm)]/50 space-y-3">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
            />
            <span className="text-xs font-semibold text-[var(--color-charcoal)]">
              Post with an Anonymous Pseudonym (Flower Alias)
            </span>
          </label>
          {isAnonymous && <PrivacyNotice isAnonymousNotice />}
        </div>

        {/* Content Warning Option */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasContentWarning}
              onChange={(e) => setHasContentWarning(e.target.checked)}
              className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
            />
            <span className="text-xs text-[var(--color-charcoal)] font-medium">
              Add a Content Warning (e.g. domestic distress, harassment, illness)
            </span>
          </label>
          {hasContentWarning && (
            <Input
              placeholder="e.g. Mentions family conflict and emotional exhaustion"
              value={contentWarning}
              onChange={(e) => setContentWarning(e.target.value)}
              required={hasContentWarning}
            />
          )}
        </div>

        {/* Image Attachment Placeholder (Mocked) */}
        <div className="pt-2 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span className="flex items-center space-x-1">
            <ImageIcon className="w-4 h-4 text-[var(--color-muted)]" />
            <span>Image attachments: private storage buckets (Phase 2)</span>
          </span>
          <Button type="submit" size="sm">
            Publish Discussion
          </Button>
        </div>
      </form>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/discussions/new/page.tsx', createDiscussionPage);

// 6. Anonymous Question Composer: src/app/(member)/ask/page.tsx
const askPage = `'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { useDemo } from '@/contexts/demo-context';
import { mockCircles } from '@/lib/mock/circles';
import { EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AskAnonymouslyPage() {
  const router = useRouter();
  const { createDiscussion } = useDemo();

  const [circleSlug, setCircleSlug] = useState('ask-elder-sister');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const selectedCircle = mockCircles.find((c) => c.slug === circleSlug) || mockCircles[0];

    const newDisc = createDiscussion({
      circleSlug: selectedCircle.slug,
      circleName: selectedCircle.name,
      circleId: selectedCircle.id,
      title,
      body,
      isAnonymous: true,
    });

    router.push(\`/discussions/\${newDisc.id}\`);
  };

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-6">
      <Link
        href="/feed"
        className="text-xs font-semibold text-[var(--color-rose)] hover:underline inline-flex items-center"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Feed
      </Link>

      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[var(--color-lavender)] text-xs font-semibold text-[var(--color-charcoal)] mb-1">
          <EyeOff className="w-3.5 h-3.5 text-[var(--color-rose-dark)] mr-1" />
          <span>Pseudonymous Question</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Ask an Anonymous Question
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)]">
          Your name and avatar will be replaced with an auto-assigned flower alias (e.g. Lotus, Jasmine).
        </p>
      </div>

      <PrivacyNotice isAnonymousNotice />

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            Destination Circle
          </label>
          <select
            value={circleSlug}
            onChange={(e) => setCircleSlug(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)]"
          >
            {mockCircles.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Your Question"
          placeholder="e.g. Dealing with family pressure to marry at 26 while preparing for UPSC"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Background & Specific Context"
          placeholder="Explain your situation openly. Sisters in this circle will respond with warmth and perspective..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          required
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm">
            Post Anonymously
          </Button>
        </div>
      </form>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/ask/page.tsx', askPage);

console.log('Successfully generated Member Core pages.');
