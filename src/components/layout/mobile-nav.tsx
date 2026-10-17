'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  Home,
  Compass,
  MessageCircleQuestion,
  HeartHandshake,
  Menu,
  X,
  Bookmark,
  Users,
  Shield,
  ShieldAlert,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { isMember, isModerator } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  const mainTabs = isMember
    ? [
        { label: 'Live Feed', href: '/', icon: Home },
        { label: 'Circles', href: '/circles', icon: Compass },
        { label: 'Ask', href: '/ask', icon: MessageCircleQuestion },
        { label: 'Sisters', href: '/elder-sister', icon: HeartHandshake },
      ]
    : [
        { label: 'Home', href: '/', icon: Home },
        { label: 'How It Works', href: '/how-it-works', icon: Compass },
        { label: 'Apply', href: '/apply', icon: HeartHandshake },
        { label: 'Safety', href: '/safety', icon: ShieldAlert },
      ];

  return (
    <>
      {/* Fixed bottom navigation bar */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-ivory)]/95 backdrop-blur-md px-2 py-1 flex items-center justify-around"
      >
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-medium transition',
                isActive
                  ? 'text-[var(--color-rose-dark)] font-semibold'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)]'
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setSheetOpen(true)}
          aria-label="Open navigation menu"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-medium text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Slide-over menu sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSheetOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[var(--color-ivory)] border-l border-[var(--color-border)] p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <span className="font-serif text-lg font-bold">HerMaitri Menu</span>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-[var(--color-muted)]">Pages</p>
                <Link
                  href="/"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <Home className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>Live Feed</span>
                </Link>
                <Link
                  href="/circles"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <Compass className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>Explore Circles</span>
                </Link>
                <Link
                  href="/elder-sister"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <HeartHandshake className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>Ask an Elder Sister</span>
                </Link>
                <Link
                  href="/mentors"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <Users className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>Mentor Directory</span>
                </Link>
                <Link
                  href="/saved"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <Bookmark className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>Saved Discussions</span>
                </Link>
              </div>

              {isModerator && (
                <div className="space-y-1 pt-3 border-t border-[var(--color-border-light)]">
                  <p className="text-[10px] uppercase font-bold text-[var(--color-rose-dark)]">Moderator</p>
                  <Link
                    href="/mod/dashboard"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)] font-semibold"
                  >
                    <Shield className="w-4 h-4 text-emerald-700" />
                    <span>Mod Dashboard & Queues</span>
                  </Link>
                </div>
              )}

              <div className="space-y-1 pt-3 border-t border-[var(--color-border-light)]">
                <p className="text-[10px] uppercase font-bold text-[var(--color-muted)]">Trust & Safety</p>
                <Link
                  href="/guidelines"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-xs text-[var(--color-charcoal)]"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Community Guidelines</span>
                </Link>
                <Link
                  href="/safety"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-xs text-[var(--color-charcoal)]"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Crisis & Safety Helplines</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-xs text-[var(--color-charcoal)]"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings & Privacy</span>
                </Link>
                <Link
                  href="/help"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-xs text-[var(--color-charcoal)]"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help Center</span>
                </Link>
                <Link
                  href="/design-system"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-xs font-mono text-[var(--color-muted)]"
                >
                  <span>→ /design-system</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
