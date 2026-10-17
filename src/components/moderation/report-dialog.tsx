'use client';

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
            Reporting: <em className="text-[var(--color-charcoal)] font-medium">&ldquo;{targetPreview.slice(0, 60)}...&rdquo;</em>
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
