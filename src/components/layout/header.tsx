'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DemoBadge } from '@/components/shared/demo-badge';
import {
  Bell,
  Plus,
  ShieldCheck,
  Video,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';

export function Header() {
  const { role, user, isMember, isModerator } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand logo - Minimalist geometric mark matching reference */}
        <div className="flex items-center space-x-3">
          <Link href={isMember ? '/feed' : '/'} className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gray-950 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 leading-none">
                HerMaitri
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-700 font-semibold font-mono">
                Sisterhood
              </span>
            </div>
          </Link>
          <DemoBadge />
        </div>

        {/* Center Pill Navigation (Matches Image 1 & 2) */}
        <nav className="hidden lg:flex items-center bg-gray-50/90 border border-gray-200/70 rounded-full px-2 py-1 shadow-inner text-xs font-medium text-gray-600">
          <Link
            href="/circles"
            className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full transition ${
              pathname.startsWith('/circles')
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'hover:text-gray-900'
            }`}
          >
            <span>Circles</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </Link>

          <Link
            href={isMember ? '/feed' : '/'}
            className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full transition ${
              pathname === '/' || pathname === '/feed'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'hover:text-gray-900'
            }`}
          >
            <span>Live Feed</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse ml-0.5" />
          </Link>

          <Link
            href="/elder-sister"
            className={`px-3.5 py-1.5 rounded-full transition ${
              pathname.startsWith('/elder-sister')
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'hover:text-gray-900'
            }`}
          >
            Elder Sister
          </Link>

          <Link
            href="/mentors"
            className={`px-3.5 py-1.5 rounded-full transition ${
              pathname.startsWith('/mentors')
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'hover:text-gray-900'
            }`}
          >
            Mentors
          </Link>

          <Link
            href="/guidelines"
            className={`px-3.5 py-1.5 rounded-full transition ${
              pathname.startsWith('/guidelines')
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'hover:text-gray-900'
            }`}
          >
            Guidelines
          </Link>
        </nav>

        {/* Center / Right Actions (Matches Image 1) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isMember ? (
            <>
              <Link href="/discussions/new">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 text-xs font-semibold shadow-sm inline-flex items-center space-x-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start Discussion</span>
                </Button>
              </Link>
              <Link
                href="/notifications"
                className="relative p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </Link>
              {isModerator && (
                <Link href="/mod/dashboard">
                  <Button variant="outline" size="sm" className="hidden md:inline-flex items-center space-x-1 text-xs rounded-full border-gray-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mod Queue</span>
                  </Button>
                </Link>
              )}
              {user && (
                <Link href={`/profile/${user.id}`} className="ring-2 ring-purple-100 rounded-full p-0.5 hover:ring-purple-300 transition">
                  <Avatar name={user.displayName} size="sm" />
                </Link>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/how-it-works"
                className="hidden sm:inline-block text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5"
              >
                How It Works
              </Link>
              <Link
                href="/sign-in"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5"
              >
                Sign In
              </Link>
              <Link href="/apply">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-xs font-semibold shadow-sm"
                >
                  Open App
                </Button>
              </Link>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <Video className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <MoreVertical className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
