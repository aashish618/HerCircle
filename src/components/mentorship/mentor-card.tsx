'use client';

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
                  href={`/mentors/${mentor.userId}`}
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
        title={`Request Guidance from ${mentor.user.displayName}`}
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
              HerMaitri mentorship operates via transparent, public Q&A threads so guidance benefits other sisters too. No private DMs are allowed in this MVP.
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
