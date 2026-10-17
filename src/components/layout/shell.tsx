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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#DDD4FA]/80 via-[#D3C3F8]/70 to-[#E4CEF8]/80 text-[var(--color-charcoal)] antialiased relative overflow-x-hidden">
      <Background3D />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PrototypeBanner />

      {/* Centered Floating Canvas with rich violet aesthetic & 3D depth */}
      <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto sm:my-4 md:my-6 sm:rounded-[36px] bg-gradient-to-b from-[#FAF7FE]/95 via-[#F1E8FD]/90 to-[#E6D7FB]/95 shadow-[0_30px_80px_-15px_rgba(76,29,149,0.25)] border border-white/80 backdrop-blur-xl overflow-hidden relative z-10">
        {/* Floating 3D ambient bubbles inside the canvas corners */}
        <div className="absolute top-20 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-white/95 via-purple-300/70 to-indigo-600/80 shadow-[0_18px_40px_rgba(124,58,237,0.35),inset_0_4px_10px_rgba(255,255,255,0.95)] border border-white/70 animate-float-slow pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-3 left-4 w-10 h-5 rounded-full bg-white/95 rotate-[-25deg] blur-[1px]" />
        </div>

        <div className="absolute top-[42%] -left-8 w-28 h-28 rounded-full bg-gradient-to-br from-white/95 via-sky-300/70 to-blue-600/75 shadow-[0_16px_35px_rgba(59,130,246,0.35),inset_0_4px_10px_rgba(255,255,255,0.95)] border border-white/70 animate-float-reverse pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-3 left-4 w-9 h-4 rounded-full bg-white/95 rotate-[-20deg] blur-[1px]" />
        </div>

        <div className="absolute bottom-24 -right-8 w-36 h-36 rounded-full bg-gradient-to-br from-white/95 via-rose-300/70 to-pink-600/75 shadow-[0_20px_45px_rgba(244,63,94,0.35),inset_0_4px_10px_rgba(255,255,255,0.95)] border border-white/70 animate-float-drift pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-3 left-4 w-11 h-5 rounded-full bg-white/95 rotate-[-25deg] blur-[1px]" />
        </div>

        <div className="absolute top-[75%] -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-white/95 via-purple-300/70 to-fuchsia-600/75 shadow-[0_12px_28px_rgba(192,38,211,0.3),inset_0_3px_8px_rgba(255,255,255,0.95)] border border-white/70 animate-float-slow delay-700 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-2 left-2.5 w-6 h-3 rounded-full bg-white/95 rotate-[-20deg] blur-[1px]" />
        </div>

        {/* Small rising micro-bubbles inside the canvas */}
        <div className="absolute top-[30%] right-[15%] w-8 h-8 rounded-full bg-gradient-to-br from-white/90 to-purple-300/60 shadow-[0_6px_15px_rgba(147,51,234,0.25)] border border-white/80 animate-bubble-rise pointer-events-none z-0" />
        <div className="absolute top-[65%] left-[25%] w-10 h-10 rounded-full bg-gradient-to-br from-white/90 to-sky-300/60 shadow-[0_6px_15px_rgba(56,189,248,0.25)] border border-white/80 animate-bubble-rise delay-500 pointer-events-none z-0" />

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
