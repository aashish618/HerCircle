'use client';

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
            className={`block p-4 rounded-xl border transition ${
              n.isRead
                ? 'bg-white/60 border-[var(--color-border)] hover:bg-white'
                : 'bg-[var(--color-lavender-light)]/70 border-[var(--color-lavender)] hover:bg-[var(--color-lavender-light)]'
            }`}
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
