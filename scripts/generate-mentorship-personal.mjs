import fs from 'fs';

// 1. Ask an Elder Sister: src/app/(member)/elder-sister/page.tsx
const elderSisterPage = `'use client';

import React from 'react';
import Link from 'next/link';
import { mockMentors } from '@/lib/mock/mentors';
import { mockDiscussions } from '@/lib/mock/discussions';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { HeartHandshake, MessageCircleQuestion, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ElderSisterPage() {
  const elderSisterDiscussions = mockDiscussions.filter(
    (d) => d.circleSlug === 'ask-elder-sister'
  );

  return (
    <div className="space-y-10 py-2">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-lavender-light)] via-white to-[var(--color-ivory-warm)] p-6 md:p-8 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-lavender)] text-xs font-bold text-[var(--color-charcoal)]">
            <HeartHandshake className="w-3.5 h-3.5 text-[var(--color-rose-dark)]" />
            <span>Intergenerational Guidance</span>
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)]">
          Ask an Elder Sister
        </h1>

        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          In traditional Indian communities, younger women turned to older sisters, aunts, and grandmothers for perspective on life transitions. Here, seasoned women guide younger sisters with grounded wisdom, professional depth, and zero moralizing.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/ask">
            <Button size="sm">
              <MessageCircleQuestion className="w-4 h-4 mr-1.5" />
              Ask an Anonymous Question
            </Button>
          </Link>
          <Link href="/mentors">
            <Button variant="outline" size="sm" className="bg-white">
              Explore Mentor Directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Mentors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Featured Mentors Ready to Guide
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Profiles based on verified stated experience across engineering, health, law, and education
            </p>
          </div>
          <Link href="/mentors" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            View all 12 mentors <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMentors.slice(0, 4).map((m) => (
            <MentorCard key={m.userId} mentor={m} />
          ))}
        </div>
      </section>

      {/* Recent Elder Sister Advice Threads */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
            Recent Advice & Life Guidance Threads
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            Transparent public threads helping the entire sisterhood learn from each dilemma
          </p>
        </div>

        <div className="space-y-4">
          {elderSisterDiscussions.map((d) => (
            <PostCard key={d.id} discussion={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/elder-sister/page.tsx', elderSisterPage);

// 2. Mentor Directory: src/app/(member)/mentors/page.tsx
const mentorsPage = `'use client';

import React, { useState } from 'react';
import { mockMentors } from '@/lib/mock/mentors';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Sparkles } from 'lucide-react';

export default function MentorDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = [
    'All',
    'Career & Education',
    'Health & Wellness',
    'Money & Financial Independence',
    'Women\\'s Safety',
    'Ask an Elder Sister',
    'Personal Growth',
  ];

  const filteredMentors = mockMentors.filter((m) => {
    const matchesSearch =
      m.user.displayName.toLowerCase().includes(search.toLowerCase()) ||
      m.headline.toLowerCase().includes(search.toLowerCase()) ||
      m.bio.toLowerCase().includes(search.toLowerCase());

    const matchesTopic =
      selectedTopic === 'All' ||
      m.experienceAreas.some((area) =>
        area.toLowerCase().includes(selectedTopic.toLowerCase())
      );

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Mentor Directory
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Connect with experienced women across engineering, public policy, medicine, finance, and the arts. Guidance occurs in public threads for transparent, community-wide learning.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="max-w-md">
          <Input
            placeholder="Search mentors by name, company, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={\`px-3 py-1 rounded-full whitespace-nowrap transition \${
                selectedTopic === t
                  ? 'bg-[var(--color-rose)] text-white font-semibold shadow-sm'
                  : 'bg-white border border-[var(--color-border)] text-[var(--color-charcoal-light)] hover:bg-black/5'
              }\`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((m) => (
          <MentorCard key={m.userId} mentor={m} />
        ))}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/mentors/page.tsx', mentorsPage);

// 3. Mentor Profile: src/app/(member)/mentors/[id]/page.tsx
const mentorProfilePage = `'use client';

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
`;
fs.writeFileSync('src/app/(member)/mentors/[id]/page.tsx', mentorProfilePage);

// 4. Saved Discussions: src/app/(member)/saved/page.tsx
const savedPage = `'use client';

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
`;
fs.writeFileSync('src/app/(member)/saved/page.tsx', savedPage);

// 5. Notifications: src/app/(member)/notifications/page.tsx
const notifPage = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockNotifications } from '@/lib/mock/notifications';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, MessageSquare, Sparkles, HeartHandshake, Shield } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'reply':
        return <MessageSquare className="w-4 h-4 text-purple-700" />;
      case 'reaction':
        return <Sparkles className="w-4 h-4 text-amber-700" />;
      case 'guidance_request':
        return <HeartHandshake className="w-4 h-4 text-[var(--color-rose-dark)]" />;
      default:
        return <Shield className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-8 py-2">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
            Notifications
          </h1>
          <p className="text-sm text-[var(--color-charcoal-light)]">
            Community replies, supportive reactions, and guidance updates.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs">
          <Check className="w-3.5 h-3.5 mr-1" /> Mark all read
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={n.link}
            className={\`block p-4 rounded-xl border transition \${
              n.isRead
                ? 'bg-white/60 border-[var(--color-border)] hover:bg-white'
                : 'bg-[var(--color-lavender-light)]/70 border-[var(--color-lavender)] hover:bg-[var(--color-lavender-light)]'
            }\`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-white shadow-xs shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[var(--color-charcoal)]">{n.title}</p>
                  <span className="text-[11px] text-[var(--color-muted)] font-mono">
                    {formatDate(n.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">{n.body}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/notifications/page.tsx', notifPage);

// 6. Member Profile: src/app/(member)/profile/[id]/page.tsx
const profilePage = `'use client';

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
`;
fs.writeFileSync('src/app/(member)/profile/[id]/page.tsx', profilePage);

// 7. Settings: src/app/(member)/settings/page.tsx
const settingsPage = `'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { DemoBadge } from '@/components/shared/demo-badge';
import { Shield, Download, Trash2, CheckCircle2, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [exportOpen, setExportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Member Settings & Privacy
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Manage your identity visibility, content preferences, and data rights.
        </p>
      </div>

      {/* Privacy & Visibility Settings */}
      <form onSubmit={handleSavePreferences} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 space-y-5 shadow-[var(--shadow-card)]">
        <h2 className="font-serif text-lg font-bold text-[var(--color-charcoal)] flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-800" />
          <span>Profile & Privacy Controls</span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[var(--color-rose)]" />
            <span>Show my city location on my profile</span>
          </label>
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[var(--color-rose)]" />
            <span>Enable flowers alias pseudonymity by default when creating discussions</span>
          </label>
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[var(--color-rose)]" />
            <span>Opt-out of all third-party analytics and telemetry</span>
          </label>
        </div>

        <div className="pt-2">
          <Button type="submit" size="sm">
            Save Preferences
          </Button>
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-semibold ml-3 inline-flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Preferences updated
            </span>
          )}
        </div>
      </form>

      {/* Data Export & Deletion (Labeled as Mocked Flows) */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 space-y-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
            Data Rights & Account Sovereignty
          </h2>
          <DemoBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-2 bg-[var(--color-ivory-warm)]/60">
            <h3 className="font-serif text-sm font-bold text-[var(--color-charcoal)] flex items-center space-x-1.5">
              <Download className="w-4 h-4 text-[var(--color-rose-dark)]" />
              <span>Download My Data Archive</span>
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Export all your discussions, comments, and profile data in machine-readable JSON format.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportOpen(true)}
              className="mt-2 bg-white text-xs"
            >
              Export JSON Archive (Mocked)
            </Button>
          </div>

          <div className="rounded-xl border border-rose-200 p-4 space-y-2 bg-rose-50/50">
            <h3 className="font-serif text-sm font-bold text-rose-950 flex items-center space-x-1.5">
              <Trash2 className="w-4 h-4 text-rose-700" />
              <span>Permanent Account Deletion</span>
            </h3>
            <p className="text-xs text-rose-800 leading-relaxed">
              Permanently delete your profile and unlink all anonymous identity mappings from platform logs.
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              className="mt-2 text-xs"
            >
              Request Account Deletion (Mocked)
            </Button>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Data Export Archive (Mocked Flow)"
      >
        <div className="space-y-4 text-xs text-[var(--color-charcoal-light)]">
          <p>
            In production, this generates a cryptographically signed download archive containing all your authored discussions, replies, reactions, and saved items.
          </p>
          <div className="rounded-lg bg-black/5 p-3 font-mono text-[11px]">
            {'{'} "user": "Priya Sharma", "discussions_count": 2, "comments_count": 5 {'}'}
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={() => setExportOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Confirm Account Deletion (Mocked Flow)"
      >
        <div className="space-y-4 text-xs text-[var(--color-charcoal-light)]">
          <p className="text-rose-700 font-semibold">
            Warning: This action is irreversible. All your profile data, bookmarks, and private circle memberships will be permanently expunged.
          </p>
          <p>
            In Phase 2 with Supabase, this executes a cascading user deletion function with automatic database audit logging.
          </p>
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                alert('Demo account deletion flow executed.');
                setDeleteOpen(false);
              }}
            >
              Confirm Deletion
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/settings/page.tsx', settingsPage);

// 8. Help Center: src/app/(member)/help/page.tsx
const helpPage = `import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';

export default function HelpCenterPage() {
  const faqs = [
    {
      q: 'Who is eligible to join HerCircle?',
      a: 'HerCircle is open to all women aged 12 and older, including transgender women. We use human application review to ensure psychological safety without invasive biometric surveillance.',
    },
    {
      q: 'How does anonymous posting work?',
      a: 'When you check "Post anonymously", your name is replaced by a randomized flower alias (e.g. Lotus, Jasmine). Other members cannot see your real identity. However, to prevent abuse, server-side logs maintain platform accountability.',
    },
    {
      q: 'Why can\\'t I send private direct messages (DMs)?',
      a: 'To prevent harassment, unsolicited advances, and predatory behavior, HerCircle MVP routes all mentorship and advice through public Q&A threads.',
    },
    {
      q: 'What should I do if I see harmful content or harassment?',
      a: 'Click the flag icon on any post or comment to report it. Reports go directly to our human moderator review queue.',
    },
  ];

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Help Center & FAQs
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Answers to common questions about HerCircle membership, privacy, and community etiquette.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[var(--color-charcoal)] font-bold">
                {f.q}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
              {f.a}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)] p-6 space-y-3">
        <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
          Need Emergency or Crisis Help?
        </h3>
        <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
          For acute psychological distress, domestic emergencies, or cyber harassment, view our verified Indian helpline directory.
        </p>
        <Link href="/safety">
          <Button variant="outline" size="sm" className="bg-white text-xs">
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-rose-700" />
            View Emergency Resources Directory
          </Button>
        </Link>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(member)/help/page.tsx', helpPage);

console.log('Successfully generated Mentorship and Personal pages.');
