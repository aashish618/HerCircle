'use client';

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
                <span className="text-[var(--color-charcoal-light)]">&ldquo;{ev.target}&rdquo;</span>
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
