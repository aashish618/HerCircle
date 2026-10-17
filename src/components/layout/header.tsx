'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DemoBadge } from '@/components/shared/demo-badge';
import { Bell, Plus, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Header() {
  const { role, user, isMember, isModerator } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-ivory)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <div className="flex items-center space-x-3">
          <Link href={isMember ? '/feed' : '/'} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-[var(--color-rose)] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[var(--color-charcoal)]">
              HerCircle
            </span>
          </Link>
          <DemoBadge />
        </div>

        {/* Center / Right Actions */}
        <div className="flex items-center space-x-3">
          {isMember ? (
            <>
              <Link href="/discussions/new">
                <Button size="sm" className="hidden sm:inline-flex items-center space-x-1.5 shadow-sm">
                  <Plus className="w-4 h-4" />
                  <span>Start Discussion</span>
                </Button>
              </Link>
              <Link
                href="/notifications"
                className="relative p-2 rounded-full text-[var(--color-charcoal-light)] hover:bg-black/5 transition"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-rose)] ring-2 ring-[var(--color-ivory)]" />
              </Link>
              {isModerator && (
                <Link href="/mod/dashboard">
                  <Button variant="sage" size="sm" className="hidden md:inline-flex items-center space-x-1 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Mod Queue</span>
                  </Button>
                </Link>
              )}
              {user && (
                <Link href={`/profile/${user.id}`}>
                  <Avatar name={user.displayName} size="sm" />
                </Link>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/how-it-works" className="hidden sm:inline-block text-xs font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-rose)] px-3 py-1.5">
                How It Works
              </Link>
              <Link href="/sign-in" className="text-xs font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-rose)] px-3 py-1.5">
                Sign In
              </Link>
              <Link href="/apply">
                <Button size="sm" variant="default" className="text-xs">
                  Apply for Membership
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
