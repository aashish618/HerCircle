'use client';

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
                    &ldquo;{app.aboutText}&rdquo;
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
