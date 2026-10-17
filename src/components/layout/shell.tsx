'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { PrototypeBanner } from '@/components/shared/prototype-banner';
import { RoleSwitcher } from './role-switcher';
import { Background3D } from '@/components/shared/background-3d';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#EBE7F6] text-[var(--color-charcoal)] antialiased relative overflow-x-hidden">
      <Background3D />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PrototypeBanner />

      {/* Centered Floating Canvas with violet aesthetic matching live feed */}
      <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto sm:my-4 md:my-6 sm:rounded-[36px] bg-gradient-to-b from-[#F6F1FD] via-[#EEE6FA] to-[#E5DCF6] shadow-[0_25px_70px_-15px_rgba(50,30,90,0.18)] border border-purple-200/70 overflow-hidden relative z-10">
        {/* Floating 3D ambient bubbles inside the canvas corners */}
        <div className="absolute top-24 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-white/90 via-purple-300/60 to-indigo-500/70 shadow-[0_15px_35px_rgba(124,58,237,0.25),inset_0_3px_8px_rgba(255,255,255,0.9)] border border-white/60 animate-float-slow pointer-events-none z-0" />
        <div className="absolute top-[45%] -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-white/90 via-sky-300/60 to-blue-500/60 shadow-[0_12px_28px_rgba(59,130,246,0.25),inset_0_3px_8px_rgba(255,255,255,0.9)] border border-white/60 animate-float-reverse pointer-events-none z-0" />
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-white/90 via-rose-300/50 to-pink-500/50 shadow-[0_15px_35px_rgba(244,114,182,0.25),inset_0_3px_8px_rgba(255,255,255,0.9)] border border-white/60 animate-float-slow delay-500 pointer-events-none z-0" />

        <Header />

        {isLanding ? (
          <main id="main-content" className="flex-1 w-full relative z-10">
            {children}
          </main>
        ) : (
          <div className="flex-1 flex w-full relative z-10">
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
