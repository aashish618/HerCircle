import fs from 'fs';

// 1. Moderator Dashboard: src/app/(mod)/mod/dashboard/page.tsx
const dashboardPage = `'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/contexts/demo-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldAlert,
  UserCheck,
  Compass,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
} from 'lucide-react';

export default function ModDashboardPage() {
  const { reports, applications } = useDemo();

  const openReports = reports.filter((r) => r.status === 'open' || r.status === 'escalated');
  const pendingApps = applications.filter((a) => a.status === 'pending');

  const auditEvents = [
    { action: 'Report Resolved', target: 'Unsolicited WhatsApp group invite', actor: 'Kavita Nair', time: '10m ago' },
    { action: 'Application Approved', target: 'Zeenat Parveen (Fashion & Shopping)', actor: 'Kavita Nair', time: '1h ago' },
    { action: 'Content Warning Added', target: 'Joint family boundary discussion', actor: 'Lakshmi Pillai', time: '3h ago' },
    { action: 'Guidance Flag Cleared', target: 'UPSC preparation advice', actor: 'Kavita Nair', time: '1d ago' },
  ];

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-sage)] text-xs font-semibold text-emerald-950">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-800" />
          <span>Trust & Safety Operations</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Moderator Dashboard
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Human-only moderation console for community health, report queues, and membership applications.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-rose-200 bg-rose-50/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-rose-950">Active Reports</CardTitle>
              <ShieldAlert className="w-4 h-4 text-rose-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-serif text-rose-900">{openReports.length}</p>
            <p className="text-xs text-rose-800 mt-1">Requires human review</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-amber-950">Pending Applications</CardTitle>
              <UserCheck className="w-4 h-4 text-amber-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-serif text-amber-900">{pendingApps.length}</p>
            <p className="text-xs text-amber-800 mt-1">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card className="border-[var(--color-sage)] bg-[var(--color-sage-light)]/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-emerald-950">Active Circles</CardTitle>
              <Compass className="w-4 h-4 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-serif text-emerald-950">9</p>
            <p className="text-xs text-emerald-800 mt-1">100% human moderated</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/mod/reports" className="block">
          <Button variant="outline" className="w-full justify-between h-auto py-3 bg-white text-xs">
            <span className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Review Report Queue ({openReports.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)]" />
          </Button>
        </Link>

        <Link href="/mod/applications" className="block">
          <Button variant="outline" className="w-full justify-between h-auto py-3 bg-white text-xs">
            <span className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Review Applications ({pendingApps.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)]" />
          </Button>
        </Link>

        <Link href="/mod/community" className="block">
          <Button variant="outline" className="w-full justify-between h-auto py-3 bg-white text-xs">
            <span className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Manage Circle Rules</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)]" />
          </Button>
        </Link>
      </div>

      {/* Audit Log Simulation */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[var(--color-charcoal)] flex items-center space-x-2">
            <History className="w-4 h-4 text-[var(--color-muted)]" />
            <span>Simulated Moderation Audit Log</span>
          </h2>
          <Badge variant="muted">Server-side RLS in docs/</Badge>
        </div>
        <p className="text-xs text-[var(--color-muted)]">
          All moderation and administrative actions produce immutable audit log entries with actor IDs and timestamp metadata.
        </p>

        <div className="divide-y divide-[var(--color-border-light)] text-xs">
          {auditEvents.map((ev, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[var(--color-charcoal)] mr-2">{ev.action}:</span>
                <span className="text-[var(--color-charcoal-light)]">"{ev.target}"</span>
              </div>
              <div className="text-[var(--color-muted)] font-mono text-[11px] shrink-0 ml-2">
                by {ev.actor} • {ev.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(mod)/mod/dashboard/page.tsx', dashboardPage);

// 2. Report Review Queue: src/app/(mod)/mod/reports/page.tsx
const reportsQueuePage = `'use client';

import React, { useState } from 'react';
import { useDemo } from '@/contexts/demo-context';
import { ReportStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function ReportsQueuePage() {
  const { reports, updateReportStatus } = useDemo();
  const [filter, setFilter] = useState<'all' | 'open' | 'escalated' | 'resolved'>('all');
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  const filteredReports = reports.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleResolve = (id: string) => {
    updateReportStatus(id, 'resolved', reviewNotes[id] || 'Handled by moderator.');
  };

  const handleEscalate = (id: string) => {
    updateReportStatus(id, 'escalated', reviewNotes[id] || 'Escalated to lead team.');
  };

  const handleDismiss = (id: string) => {
    updateReportStatus(id, 'dismissed', reviewNotes[id] || 'Dismissed after review.');
  };

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Report Review Queue
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Human review of member-flagged harassment, doxxing, misinformation, and distress.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[var(--color-border)] pb-2 text-xs">
        {(['all', 'open', 'escalated', 'resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={\`px-3 py-1.5 rounded-lg capitalize font-medium transition \${
              filter === tab
                ? 'bg-[var(--color-charcoal)] text-white font-semibold'
                : 'text-[var(--color-muted)] hover:bg-black/5 hover:text-[var(--color-charcoal)]'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="py-12 text-center text-xs text-[var(--color-muted)]">
            No reports matching the selected filter.
          </div>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="space-y-3">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        report.status === 'open'
                          ? 'rose'
                          : report.status === 'escalated'
                          ? 'default'
                          : 'sage'
                      }
                    >
                      {report.status}
                    </Badge>
                    <span className="text-xs uppercase font-mono font-bold text-[var(--color-rose-dark)]">
                      {report.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--color-muted)]">
                    Reported {formatDate(report.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-sm mt-2 text-[var(--color-charcoal)]">
                  Reported: "{report.targetPreview}"
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 text-xs text-[var(--color-charcoal-light)]">
                <p><strong>Reporter notes:</strong> {report.description}</p>
                {report.reviewNote && (
                  <p className="rounded-lg bg-[var(--color-ivory-warm)] p-2 text-emerald-950 border border-[var(--color-border)]">
                    <strong>Moderator note:</strong> {report.reviewNote}
                  </p>
                )}
              </CardContent>

              {report.status !== 'resolved' && report.status !== 'dismissed' && (
                <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3">
                  <Input
                    placeholder="Enter resolution notes..."
                    value={reviewNotes[report.id] || ''}
                    onChange={(e) =>
                      setReviewNotes({ ...reviewNotes, [report.id]: e.target.value })
                    }
                    className="text-xs"
                  />
                  <div className="flex items-center space-x-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDismiss(report.id)}
                      className="text-xs"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEscalate(report.id)}
                      className="text-xs"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Escalate
                    </Button>
                    <Button
                      variant="sage"
                      size="sm"
                      onClick={() => handleResolve(report.id)}
                      className="text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-800" /> Resolve
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(mod)/mod/reports/page.tsx', reportsQueuePage);

// 3. Membership Review Queue: src/app/(mod)/mod/applications/page.tsx
const applicationsQueuePage = `'use client';

import React, { useState } from 'react';
import { useDemo } from '@/contexts/demo-context';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Check, X, HelpCircle, ShieldCheck } from 'lucide-react';

export default function ApplicationsQueuePage() {
  const { applications, updateApplicationStatus } = useDemo();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');

  const filteredApps = applications.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Membership Applications Review
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Human verification of prospective sisters. We check alignment with community guidelines, age verification, and non-commercial intent.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[var(--color-border)] pb-2 text-xs">
        {(['all', 'pending', 'approved', 'declined'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={\`px-3 py-1.5 rounded-lg capitalize font-medium transition \${
              filter === tab
                ? 'bg-[var(--color-charcoal)] text-white font-semibold'
                : 'text-[var(--color-muted)] hover:bg-black/5 hover:text-[var(--color-charcoal)]'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="py-12 text-center text-xs text-[var(--color-muted)]">
            No applications in this category.
          </div>
        ) : (
          filteredApps.map((app) => (
            <Card key={app.id} className="space-y-3">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base text-[var(--color-charcoal)]">
                      {app.displayName}
                    </CardTitle>
                    <p className="text-xs text-[var(--color-muted)]">
                      Age Bracket: {app.ageGroup} • Applied {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      app.status === 'approved'
                        ? 'sage'
                        : app.status === 'pending'
                        ? 'default'
                        : 'rose'
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 text-xs text-[var(--color-charcoal-light)] leading-relaxed">
                <div>
                  <p className="font-semibold text-[var(--color-charcoal)] mb-1">
                    Selected Interest Circles:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.interests.map((int, i) => (
                      <Badge key={i} variant="muted">
                        {int}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-[var(--color-charcoal)] mb-0.5">
                    Why they wish to join:
                  </p>
                  <p className="rounded-lg bg-[var(--color-ivory-warm)] p-3 text-[var(--color-charcoal)]">
                    "{app.aboutText}"
                  </p>
                </div>

                {app.reviewNote && (
                  <p className="text-[11px] text-[var(--color-muted)]">
                    <strong>Review Note:</strong> {app.reviewNote}
                  </p>
                )}
              </CardContent>

              {app.status === 'pending' && (
                <CardFooter className="flex items-center justify-end space-x-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateApplicationStatus(app.id, 'declined', 'Declined per community standards.')
                    }
                    className="text-xs"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Decline
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      updateApplicationStatus(app.id, 'info_requested', 'Please clarify community intention.')
                    }
                    className="text-xs"
                  >
                    <HelpCircle className="w-3.5 h-3.5 mr-1" /> Request Info
                  </Button>
                  <Button
                    variant="sage"
                    size="sm"
                    onClick={() =>
                      updateApplicationStatus(app.id, 'approved', 'Approved by human moderator.')
                    }
                    className="text-xs font-semibold"
                  >
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-800" /> Approve Sister
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(mod)/mod/applications/page.tsx', applicationsQueuePage);

// 4. Community Management: src/app/(mod)/mod/community/page.tsx
const communityMgmtPage = `'use client';

import React, { useState } from 'react';
import { mockCircles } from '@/lib/mock/circles';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DemoBadge } from '@/components/shared/demo-badge';
import { CheckCircle2, Shield } from 'lucide-react';

export default function CommunityManagementPage() {
  const [selectedCircle, setSelectedCircle] = useState(mockCircles[0]);
  const [rulesText, setRulesText] = useState(selectedCircle.rules);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCircleChange = (slug: string) => {
    const found = mockCircles.find((c) => c.slug === slug) || mockCircles[0];
    setSelectedCircle(found);
    setRulesText(found.rules);
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
            Circle Management & Rules
          </h1>
          <DemoBadge />
        </div>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Configure circle-specific guidelines, assign peer moderators, and manage topic boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Circle Selector List */}
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Circles
          </p>
          {mockCircles.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCircleChange(c.slug)}
              className={\`w-full text-left p-2.5 rounded-xl text-xs font-medium transition border flex items-center justify-between \${
                selectedCircle.slug === c.slug
                  ? 'border-[var(--color-rose)] bg-[var(--color-rose-light)] text-[var(--color-charcoal)] font-semibold'
                  : 'border-[var(--color-border)] bg-white/70 hover:bg-white text-[var(--color-charcoal-light)]'
              }\`}
            >
              <span>{c.name}</span>
              <span className="text-[10px] text-[var(--color-muted)] font-mono">{c.discussionCount}</span>
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-6 space-y-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-light)]">
              <h2 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
                {selectedCircle.name}
              </h2>
              <Badge variant="sage">Active Circle</Badge>
            </div>

            <Textarea
              label="Circle-Specific Rules & Etiquette"
              value={rulesText}
              onChange={(e) => setRulesText(e.target.value)}
              rows={4}
              helperText="These guidelines appear on the circle detail page and in discussion composers."
            />

            <div className="pt-2 text-xs text-[var(--color-muted)] space-y-1">
              <p><strong>Assigned Moderators:</strong> Kavita Nair (Kochi), Lakshmi Pillai (Thiruvananthapuram)</p>
              <p><strong>Visibility:</strong> Approved Members Only (No search engine crawling)</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
              <Button type="submit" size="sm">
                Save Rule Changes (Mocked)
              </Button>
              {savedSuccess && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Rules updated
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(mod)/mod/community/page.tsx', communityMgmtPage);

console.log('Successfully generated all Moderation pages.');
