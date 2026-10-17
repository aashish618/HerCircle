'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { TopicChip } from '@/components/community/topic-chip';
import { ReactionBar } from '@/components/community/reaction-bar';
import { PollView } from '@/components/community/poll-view';
import { PostCard } from '@/components/community/post-card';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { ContentWarningWrapper } from '@/components/shared/content-warning';
import { PrivacyNotice } from '@/components/shared/privacy-notice';
import { CrisisResourceBanner } from '@/components/shared/crisis-banner';
import { EmptyState } from '@/components/shared/empty-state';
import { PostCardSkeleton } from '@/components/shared/skeleton-loader';
import { ErrorState } from '@/components/shared/error-state';
import { DemoBadge } from '@/components/shared/demo-badge';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockMentors } from '@/lib/mock/mentors';
import { Sparkles, MessageCircleQuestion, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-12 py-4">
      {/* Page Title */}
      <div className="border-b border-[var(--color-border)] pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="rose">Dev Only</Badge>
          <span className="text-xs font-mono text-[var(--color-muted)]">Checkpoint 1</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-charcoal)]">
          HerCircle Design System & Component Library
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          The visual foundations, typography scale, design tokens, and comprehensive states for all reusable UI components.
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          1. Color Palette Tokens & Contrast
        </h2>
        <p className="text-xs text-[var(--color-muted)]">
          Defined via CSS variables in <code className="font-mono">globals.css</code>. Tested against WCAG AA requirements (4.5:1 for body copy).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div className="rounded-xl border border-[var(--color-border)] p-3 space-y-2 bg-[var(--color-ivory)]">
            <div className="h-16 rounded-lg bg-[#F8F4EF] border border-black/10 shadow-inner" />
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-charcoal)]">Ivory (Background)</p>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">#F8F4EF</p>
              <p className="text-[10px] text-emerald-700 mt-1">Base canvas</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-3 space-y-2 bg-white">
            <div className="h-16 rounded-lg bg-[#E7DDF5] border border-black/10 shadow-inner" />
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-charcoal)]">Lavender</p>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">#E7DDF5</p>
              <p className="text-[10px] text-purple-700 mt-1">Subtle accents & tags</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-3 space-y-2 bg-white">
            <div className="h-16 rounded-lg bg-[#DDE8DC] border border-black/10 shadow-inner" />
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-charcoal)]">Sage</p>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">#DDE8DC</p>
              <p className="text-[10px] text-emerald-700 mt-1">Calm badges & notices</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-3 space-y-2 bg-white">
            <div className="h-16 rounded-lg bg-[#C87982] border border-black/10 shadow-inner" />
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-charcoal)]">Dusty Rose</p>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">#C87982</p>
              <p className="text-[10px] text-rose-700 mt-1">Primary buttons / accent</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-3 space-y-2 bg-white">
            <div className="h-16 rounded-lg bg-[#292631] shadow-inner" />
            <div className="text-xs">
              <p className="font-semibold text-[var(--color-charcoal)]">Deep Charcoal</p>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">#292631</p>
              <p className="text-[10px] text-gray-700 mt-1">11.4:1 contrast on Ivory</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          2. Editorial Typography Scale
        </h2>
        <p className="text-xs text-[var(--color-muted)]">
          Pairing <strong>Fraunces</strong> (expressive, warm serif) for editorial headings with <strong>DM Sans</strong> for clear UI readability.
        </p>

        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6 space-y-4 divide-y divide-[var(--color-border-light)]">
          <div className="pt-2">
            <p className="text-xs font-mono text-[var(--color-muted)] mb-1">Display / Hero (Fraunces Bold, 36px/44px)</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              Where Indian women connect, learn, and grow together.
            </h1>
          </div>

          <div className="pt-4">
            <p className="text-xs font-mono text-[var(--color-muted)] mb-1">Heading 2 (Fraunces SemiBold, 24px)</p>
            <h2 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">
              Ask an Elder Sister: Real perspective from women who have been there.
            </h2>
          </div>

          <div className="pt-4">
            <p className="text-xs font-mono text-[var(--color-muted)] mb-1">Heading 3 (Fraunces SemiBold, 18px)</p>
            <h3 className="font-serif text-lg font-semibold text-[var(--color-charcoal)]">
              How I negotiated a 35% salary correction without an outside offer
            </h3>
          </div>

          <div className="pt-4">
            <p className="text-xs font-mono text-[var(--color-muted)] mb-1">Body Text (DM Sans Regular, 15px, 1.6 line-height)</p>
            <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed max-w-2xl">
              HerCircle is designed to be a sanctuary from online toxicity. Discussions are private, anonymous options protect your identity from peers, and seasoned mentors guide younger women through career crossroads and life decisions.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-xs font-mono text-[var(--color-muted)] mb-1">Caption / Microcopy (DM Sans Medium, 12px)</p>
            <p className="text-xs text-[var(--color-muted)] font-medium">
              Verified by human review • 2.4k sisters participating • Posted 2h ago in Women’s Safety
            </p>
          </div>
        </div>
      </section>

      {/* 3. Button Component States */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          3. Button Variants & States
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Primary (Rose)</Button>
            <Button variant="secondary">Secondary (Lavender)</Button>
            <Button variant="sage">Sage (Calm)</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Button</Button>
            <Button size="lg">Large CTA</Button>
            <Button size="icon" aria-label="Icon only button">
              <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Badges & Chips */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          4. Badges, Chips & Meta Indicators
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Lavender Default</Badge>
            <Badge variant="sage">Sage Verified</Badge>
            <Badge variant="rose">Rose Accent</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="muted">Muted</Badge>
            <DemoBadge />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <TopicChip name="Career & Education" slug="career-education" iconName="GraduationCap" />
            <TopicChip name="Women’s Safety" slug="womens-safety" iconName="Shield" />
            <TopicChip name="Ask an Elder Sister" slug="ask-elder-sister" iconName="MessageCircleHeart" isActive />
            <TopicChip name="Money & Finance" slug="money-finance" iconName="Wallet" />
          </div>
        </div>
      </section>

      {/* 5. Avatars */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          5. Avatars & Anonymous Pseudonyms
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Avatar name="Priya Sharma" size="sm" />
              <span className="text-xs text-[var(--color-muted)]">SM (28px)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar name="Dr. Ananya Iyer" size="md" />
              <span className="text-xs text-[var(--color-muted)]">MD (36px)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar name="Kavita Nair" size="lg" />
              <span className="text-xs text-[var(--color-muted)]">LG (48px)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar name="Meera Joshi" size="xl" />
              <span className="text-xs text-[var(--color-muted)]">XL (64px)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar name="Lotus" isAnonymous size="lg" />
              <span className="text-xs text-[var(--color-muted)]">Anonymous Flower Alias (🌸)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Form Fields */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          6. Form Inputs & Textareas
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Your City / State" placeholder="e.g. Bengaluru, Karnataka" />
          <Input
            label="Age Verification (12+ Required)"
            placeholder="e.g. 24"
            error="You must be at least 12 years old to apply"
            defaultValue="11"
          />
          <div className="md:col-span-2">
            <Textarea
              label="Why do you wish to join HerCircle?"
              placeholder="Tell our review team a little about your journey..."
              helperText="Reviewed by human community moderators before access is granted."
            />
          </div>
        </div>
      </section>

      {/* 7. Reusable Banners & Notices */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          7. Safety, Privacy & Crisis Notices
        </h2>
        <div className="space-y-4">
          <CrisisResourceBanner />
          <PrivacyNotice />
          <PrivacyNotice isAnonymousNotice />
        </div>
      </section>

      {/* 8. Content Warning Component */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          8. Content Warning Wrapper
        </h2>
        <ContentWarningWrapper warningText="Mentions family distress, emotional exhaustion, and conflict">
          <p className="text-sm text-[var(--color-charcoal)]">
            This sensitive post is protected behind a click-to-reveal barrier so community members are not triggered unexpectedly while scrolling their feed.
          </p>
        </ContentWarningWrapper>
      </section>

      {/* 9. Interactive Discussion Card */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          9. Full Post Card (Live Interactive State)
        </h2>
        <PostCard discussion={mockDiscussions[0]} />
        <PostCard discussion={mockDiscussions[3]} />
      </section>

      {/* 10. Mentor Card */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          10. Mentor Profile Card
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MentorCard mentor={mockMentors[0]} />
          <MentorCard mentor={mockMentors[5]} />
        </div>
      </section>

      {/* 11. Empty, Loading, and Error States */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          11. Empty, Loading & Error States
        </h2>
        <div className="space-y-4">
          <EmptyState
            icon={MessageCircleQuestion}
            title="No discussions in this circle yet"
            description="Be the first sister to break the ice and ask a thoughtful question or share a reflection."
            action={<Button size="sm">Start a conversation</Button>}
          />

          <div>
            <p className="text-xs font-mono text-[var(--color-muted)] mb-2">Skeleton Loader Placeholder</p>
            <PostCardSkeleton />
          </div>

          <ErrorState
            title="Unable to load circle conversations"
            message="We could not reach the community data service. Please check your connection."
            onRetry={() => alert('Retry clicked')}
          />
        </div>
      </section>

      {/* 12. Modal Dialog */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
          12. Modal Dialog
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-6">
          <Button onClick={() => setDialogOpen(true)}>Open Sample Modal Dialog</Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Community Trust Pledge"
          >
            <div className="space-y-3 text-sm text-[var(--color-charcoal-light)]">
              <p>
                HerCircle is a sanctuary built on mutual kindness, privacy, and non-judgment. We hold each other in dignity.
              </p>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setDialogOpen(false)}>
                  I Agree
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
