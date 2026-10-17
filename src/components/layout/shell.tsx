'use client';

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
