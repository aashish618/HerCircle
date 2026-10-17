'use client';

import React from 'react';

export function BubbleSpheres3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Metallic Rose Gold / Bronze Orb */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-600 to-amber-900 shadow-[0_8px_20px_rgba(180,83,9,0.35),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-amber-300/40 animate-float-slow" />

      {/* Central Pearlescent Violet & Frosted Sky-Blue Spheres */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Main Big Pearlescent Violet Sphere */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white via-purple-300/80 to-indigo-500/90 shadow-[0_16px_36px_rgba(124,58,237,0.35),inset_0_4px_8px_rgba(255,255,255,0.95),inset_0_-8px_16px_rgba(75,0,130,0.3)] border border-white/70 animate-float-reverse relative overflow-hidden">
          <div className="absolute top-2 left-3 w-7 h-3.5 rounded-full bg-white/90 rotate-[-25deg] blur-[1px]" />
          <div className="absolute bottom-2 right-3 w-5 h-5 rounded-full bg-purple-200/50 blur-[2px]" />
        </div>

        {/* Satellite Sphere 1: Sky Blue */}
        <div className="absolute -bottom-2 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-white/90 via-sky-300/80 to-blue-500/80 shadow-[0_10px_22px_rgba(59,130,246,0.3),inset_0_3px_6px_rgba(255,255,255,0.9)] border border-white/80 animate-float-slow delay-300 relative overflow-hidden">
          <div className="absolute top-1.5 left-2 w-4 h-2 rounded-full bg-white/90 rotate-[-20deg] blur-[1px]" />
        </div>

        {/* Satellite Sphere 2: Deep Violet / Pink */}
        <div className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-gradient-to-br from-white via-pink-300 to-purple-500 shadow-[0_8px_18px_rgba(168,85,247,0.3)] border border-white/80 animate-float-reverse delay-500" />
      </div>

      {/* Micro-sparkle floating bubble */}
      <div className="absolute bottom-1 left-2 w-5 h-5 rounded-full bg-gradient-to-br from-white to-purple-200 shadow-md border border-white animate-float-slow delay-700" />
    </div>
  );
}
