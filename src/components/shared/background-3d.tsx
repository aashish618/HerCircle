'use client';

import React, { useEffect, useRef } from 'react';

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates between -1 and 1
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth interpolation for silky physics
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const orbs = container.querySelectorAll<HTMLElement>('.interactive-orb');
      orbs.forEach((orb) => {
        const depth = parseFloat(orb.dataset.depth || '15');
        const rot = parseFloat(orb.dataset.rot || '5');
        const x = mouseX * depth;
        const y = mouseY * depth;
        const r = mouseX * rot;
        orb.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Dynamic 3D Iridescent Mesh Backdrops */}
      <div className="absolute top-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-purple-400/25 via-indigo-300/20 to-pink-300/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-rose-300/15 blur-[140px] animate-pulse-slow delay-1000" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-pink-300/20 via-purple-200/20 to-amber-200/15 blur-[130px] animate-pulse-slow delay-700" />

      {/* Floating 3D Spheres with Realistic Refraction & Glass Highlights */}
      {/* Sphere 1: Top-Right Lilac Glass Orb */}
      <div
        data-depth="25"
        data-rot="8"
        className="interactive-orb absolute top-[8%] right-[6%] w-32 h-32 sm:w-44 sm:h-44 rounded-full transition-transform duration-75 ease-out animate-float-slow"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/70 via-purple-300/40 to-indigo-500/50 backdrop-blur-md shadow-[0_20px_50px_rgba(147,112,219,0.35),inset_0_4px_12px_rgba(255,255,255,0.8),inset_0_-8px_16px_rgba(75,0,130,0.3)] border border-white/60 relative overflow-hidden">
          {/* Specular Glare */}
          <div className="absolute top-3 left-4 w-12 h-6 rounded-full bg-white/80 rotate-[-25deg] blur-[2px]" />
          <div className="absolute bottom-4 right-6 w-8 h-8 rounded-full bg-indigo-300/40 blur-[4px]" />
        </div>
      </div>

      {/* Sphere 2: Mid-Left Cool Cyan/Ice Frosted 3D Orb */}
      <div
        data-depth="-30"
        data-rot="-12"
        className="interactive-orb absolute top-[42%] left-[3%] w-24 h-24 sm:w-36 sm:h-36 rounded-full transition-transform duration-75 ease-out animate-float-reverse"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/80 via-sky-200/40 to-blue-400/50 backdrop-blur-md shadow-[0_18px_45px_rgba(56,189,248,0.28),inset_0_3px_10px_rgba(255,255,255,0.9),inset_0_-6px_14px_rgba(30,58,138,0.25)] border border-white/70 relative overflow-hidden">
          <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/90 rotate-[-20deg] blur-[1px]" />
        </div>
      </div>

      {/* Sphere 3: Bottom-Right Warm Rose Gold 3D Orb */}
      <div
        data-depth="35"
        data-rot="15"
        className="interactive-orb absolute bottom-[12%] right-[8%] w-28 h-28 sm:w-40 sm:h-40 rounded-full transition-transform duration-75 ease-out animate-float-slow delay-500"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/70 via-rose-200/40 to-pink-500/40 backdrop-blur-md shadow-[0_20px_50px_rgba(244,114,182,0.3),inset_0_4px_12px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(157,23,77,0.25)] border border-white/60 relative overflow-hidden">
          <div className="absolute top-3 left-4 w-10 h-5 rounded-full bg-white/80 rotate-[-25deg] blur-[2px]" />
        </div>
      </div>

      {/* Tiny Floating 3D Bubbles for micro-depth */}
      <div
        data-depth="-15"
        className="interactive-orb absolute top-[25%] left-[22%] w-10 h-10 rounded-full bg-gradient-to-br from-white/80 to-purple-200/50 shadow-[0_8px_20px_rgba(168,85,247,0.2)] border border-white/80 animate-float-slow delay-300"
      />
      <div
        data-depth="20"
        className="interactive-orb absolute top-[68%] left-[18%] w-14 h-14 rounded-full bg-gradient-to-br from-white/80 to-blue-200/50 shadow-[0_10px_25px_rgba(96,165,250,0.2)] border border-white/80 animate-float-reverse delay-700"
      />
      <div
        data-depth="-22"
        className="interactive-orb absolute top-[80%] right-[32%] w-12 h-12 rounded-full bg-gradient-to-br from-white/80 to-rose-200/50 shadow-[0_10px_25px_rgba(244,63,94,0.2)] border border-white/80 animate-float-slow delay-1000"
      />
    </div>
  );
}
