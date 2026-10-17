'use client';

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
          <pre className="rounded-lg bg-black/5 p-3 font-mono text-[11px] overflow-x-auto">
            {JSON.stringify({ user: 'Priya Sharma', discussions_count: 2, comments_count: 5 }, null, 2)}
          </pre>
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
