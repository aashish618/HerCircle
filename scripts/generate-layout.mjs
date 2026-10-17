import fs from 'fs';

// 1. role-switcher.tsx
const roleSwitcher = `'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/lib/types';
import { ShieldCheck, UserCheck, Eye, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoleSwitcher() {
  const { role, setRole, user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const roles: { value: UserRole; label: string; icon: any; desc: string }[] = [
    {
      value: 'visitor',
      label: 'Visitor',
      icon: Eye,
      desc: 'Public landing, guidelines, safety & application form only',
    },
    {
      value: 'applicant',
      label: 'Applicant',
      icon: UserCheck,
      desc: 'Application submitted, viewing pending approval page',
    },
    {
      value: 'member',
      label: 'Member',
      icon: Sparkles,
      desc: 'Priya Sharma (full access: discussions, circles, mentors, Q&A)',
    },
    {
      value: 'moderator',
      label: 'Moderator',
      icon: ShieldCheck,
      desc: 'Kavita Nair (mod queue, application reviews, member tools)',
    },
  ];

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-50">
      {expanded ? (
        <div className="w-72 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory)]/95 backdrop-blur-md p-4 shadow-2xl text-[var(--color-charcoal)] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-rose-dark)]">
              Dev Role Switcher
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
            >
              Minimize
            </button>
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-1.5 mb-2 leading-relaxed">
            Test authorization boundaries and simulated views across all 4 defined platform roles:
          </p>
          <div className="space-y-1.5">
            {roles.map((r) => {
              const Icon = r.icon;
              const isCurrent = role === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => {
                    setRole(r.value);
                  }}
                  className={cn(
                    'w-full text-left p-2 rounded-xl text-xs transition border flex items-start space-x-2.5',
                    isCurrent
                      ? 'border-[var(--color-rose)] bg-[var(--color-rose-light)] text-[var(--color-charcoal)] font-semibold shadow-sm'
                      : 'border-transparent hover:bg-black/5 text-[var(--color-charcoal-light)]'
                  )}
                >
                  <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', isCurrent ? 'text-[var(--color-rose-dark)]' : 'text-[var(--color-muted)]')} />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span>{r.label}</span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-mono px-1 py-0.2 bg-[var(--color-rose)] text-white rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[var(--color-muted)] font-normal leading-tight mt-0.5">
                      {r.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {user && (
            <p className="text-[10px] text-[var(--color-muted)] text-center pt-2 mt-2 border-t border-[var(--color-border-light)] font-mono">
              Logged in as: {user.displayName} ({user.city})
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center space-x-2 rounded-full border border-[var(--color-border)] bg-[var(--color-charcoal)] text-[var(--color-ivory)] px-3.5 py-2 text-xs font-semibold shadow-lg hover:bg-black transition-transform active:scale-95"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-lavender)]" />
          <span>Role: <strong className="capitalize text-[var(--color-lavender)]">{role}</strong></span>
        </button>
      )}
    </div>
  );
}
`;
fs.writeFileSync('src/components/layout/role-switcher.tsx', roleSwitcher);

// 2. header.tsx
const header = `'use client';

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
                <Link href={\`/profile/\${user.id}\`}>
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
`;
fs.writeFileSync('src/components/layout/header.tsx', header);

// 3. sidebar.tsx
const sidebar = `'use client';

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
`;
fs.writeFileSync('src/components/layout/sidebar.tsx', sidebar);

// 4. mobile-nav.tsx
const mobileNav = `'use client';

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
        { label: 'Feed', href: '/feed', icon: Home },
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
              <span className="font-serif text-lg font-bold">HerCircle Menu</span>
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
                  href={isMember ? '/feed' : '/'}
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <Home className="w-4 h-4 text-[var(--color-rose)]" />
                  <span>{isMember ? 'Home Feed' : 'Welcome'}</span>
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
`;
fs.writeFileSync('src/components/layout/mobile-nav.tsx', mobileNav);

// 5. shell.tsx
const shell = `'use client';

import React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { PrototypeBanner } from '@/components/shared/prototype-banner';
import { RoleSwitcher } from './role-switcher';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PrototypeBanner />
      <Header />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8 max-w-4xl">
          {children}
        </main>
      </div>
      <MobileNav />
      <RoleSwitcher />
    </div>
  );
}
`;
fs.writeFileSync('src/components/layout/shell.tsx', shell);

console.log('Successfully generated layout components.');
