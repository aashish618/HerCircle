'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { PrototypeBanner } from '@/components/shared/prototype-banner';
import { RoleSwitcher } from './role-switcher';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#EBE7F6] text-[var(--color-charcoal)] antialiased">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PrototypeBanner />

      {/* Centered Floating Canvas matching user reference designs */}
      <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto sm:my-4 md:my-6 sm:rounded-[36px] bg-white shadow-[0_25px_70px_-15px_rgba(50,30,90,0.12)] border border-white/80 overflow-hidden">
        <Header />

        {isLanding ? (
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
        ) : (
          <div className="flex-1 flex w-full">
            <Sidebar />
            <main id="main-content" className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8 max-w-5xl">
              {children}
            </main>
          </div>
        )}
      </div>

      <MobileNav />
      <RoleSwitcher />
    </div>
  );
}
