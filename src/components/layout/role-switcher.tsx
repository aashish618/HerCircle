'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/lib/types';
import { ShieldCheck, UserCheck, Eye, Sparkles, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoleSwitcher() {
  const { role, setRole, user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const roles: { value: UserRole; label: string; icon: LucideIcon; desc: string }[] = [
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
      desc: 'Kajal Sharma (full access: discussions, circles, mentors, Q&A)',
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
