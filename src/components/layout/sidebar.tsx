'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  Home,
  Compass,
  MessageCircleQuestion,
  HeartHandshake,
  Users,
  Bookmark,
  Shield,
  HelpCircle,
  Settings,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { isMember, isModerator } = useAuth();

  const memberNav = [
    { label: 'Home Feed', href: '/feed', icon: Home },
    { label: 'Explore Circles', href: '/circles', icon: Compass },
    { label: 'Ask Anonymously', href: '/ask', icon: MessageCircleQuestion },
    { label: 'Ask an Elder Sister', href: '/elder-sister', icon: HeartHandshake },
    { label: 'Mentor Directory', href: '/mentors', icon: Users },
    { label: 'Saved Discussions', href: '/saved', icon: Bookmark },
  ];

  const publicNav = [
    { label: 'Welcome / Home', href: '/', icon: Home },
    { label: 'How It Works', href: '/how-it-works', icon: Compass },
    { label: 'Apply for Membership', href: '/apply', icon: HeartHandshake },
    { label: 'Community Guidelines', href: '/guidelines', icon: Shield },
    { label: 'Crisis & Safety', href: '/safety', icon: ShieldAlert },
  ];

  const secondaryNav = [
    { label: 'Community Guidelines', href: '/guidelines', icon: Shield },
    { label: 'Crisis Resources', href: '/safety', icon: ShieldAlert },
    { label: 'Settings & Privacy', href: '/settings', icon: Settings },
    { label: 'Help Center', href: '/help', icon: HelpCircle },
  ];

  const modNav = [
    { label: 'Mod Dashboard', href: '/mod/dashboard', icon: Shield },
    { label: 'Report Queue', href: '/mod/reports', icon: ShieldAlert },
    { label: 'Applications', href: '/mod/applications', icon: Users },
    { label: 'Circle Management', href: '/mod/community', icon: Compass },
  ];

  const currentNav = isMember ? memberNav : publicNav;

  return (
    <aside
      aria-label="Sidebar navigation"
      className="hidden md:flex flex-col w-64 shrink-0 border-r border-[var(--color-border)] min-h-[calc(100vh-4rem)] p-4 space-y-6"
    >
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          {isMember ? 'Community' : 'About HerCircle'}
        </p>
        <nav className="space-y-0.5">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] font-semibold shadow-sm'
                    : 'text-[var(--color-charcoal-light)] hover:bg-black/5 hover:text-[var(--color-charcoal)]'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-[var(--color-rose-dark)]' : 'text-[var(--color-muted)]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {isMember && isModerator && (
        <div className="space-y-1 pt-2 border-t border-[var(--color-border-light)]">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-rose-dark)]">
            Moderator Tools
          </p>
          <nav className="space-y-0.5">
            {modNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-sage)] text-emerald-950 font-semibold shadow-sm'
                      : 'text-[var(--color-charcoal-light)] hover:bg-black/5'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-800' : 'text-[var(--color-muted)]')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {isMember && (
        <div className="space-y-1 pt-2 border-t border-[var(--color-border-light)]">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Account & Safety
          </p>
          <nav className="space-y-0.5">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] font-semibold'
                      : 'text-[var(--color-muted)] hover:bg-black/5 hover:text-[var(--color-charcoal)]'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Dev Design System link */}
      <div className="pt-auto mt-auto border-t border-[var(--color-border-light)] pt-3">
        <Link
          href="/design-system"
          className="text-[11px] font-mono text-[var(--color-muted)] hover:text-[var(--color-rose)] flex items-center space-x-1 px-3 py-1"
        >
          <span>→ View /design-system</span>
        </Link>
      </div>
    </aside>
  );
}
