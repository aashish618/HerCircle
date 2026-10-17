'use client';

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
              className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition border flex items-center justify-between ${
                selectedCircle.slug === c.slug
                  ? 'border-[var(--color-rose)] bg-[var(--color-rose-light)] text-[var(--color-charcoal)] font-semibold'
                  : 'border-[var(--color-border)] bg-white/70 hover:bg-white text-[var(--color-charcoal-light)]'
              }`}
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
