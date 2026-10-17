'use client';

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
            className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
              filter === tab
                ? 'bg-[var(--color-charcoal)] text-white font-semibold'
                : 'text-[var(--color-muted)] hover:bg-black/5 hover:text-[var(--color-charcoal)]'
            }`}
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
                  Reported: &ldquo;{report.targetPreview}&rdquo;
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
