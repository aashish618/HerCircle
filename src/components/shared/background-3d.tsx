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
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
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
      {/* ── Vibrant 3D Iridescent Mesh & Aurora Lights (Deep, Rich, Non-Pale) ── */}
      <div className="absolute top-[-12%] left-[-8%] w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-purple-600/35 via-violet-500/30 to-fuchsia-400/30 blur-[100px] animate-aura-glow" />
      <div className="absolute top-[35%] right-[-12%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-500/35 via-purple-600/30 to-pink-500/30 blur-[110px] animate-aura-glow delay-1000" />
      <div className="absolute bottom-[-15%] left-[15%] w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-pink-500/30 via-purple-500/30 to-amber-300/25 blur-[100px] animate-aura-glow delay-500" />
      <div className="absolute top-[18%] left-[45%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-400/25 via-indigo-300/20 to-sky-300/25 blur-[90px] animate-pulse-slow" />

      {/* ── Prominent 3D Spheres with Realistic Refraction, Rim Lights & Specular Glint ── */}

      {/* Sphere 1: Top-Right Vivid Royal Lilac 3D Orb */}
      <div
        data-depth="30"
        data-rot="10"
        className="interactive-orb absolute top-[6%] right-[3%] sm:right-[5%] w-36 h-36 sm:w-52 sm:h-52 rounded-full transition-transform duration-75 ease-out animate-float-slow"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/95 via-purple-400/60 to-indigo-700/80 backdrop-blur-md shadow-[0_25px_60px_rgba(109,40,217,0.45),inset_0_5px_15px_rgba(255,255,255,0.95),inset_0_-12px_24px_rgba(49,15,107,0.5)] border border-white/70 relative overflow-hidden">
          {/* Main Specular Glare */}
          <div className="absolute top-4 left-5 w-16 h-8 rounded-full bg-white/95 rotate-[-25deg] blur-[2px]" />
          {/* Secondary Specular Pin */}
          <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-white" />
          {/* Inner Light Bounce */}
          <div className="absolute bottom-5 right-7 w-14 h-14 rounded-full bg-indigo-300/60 blur-[6px]" />
        </div>
      </div>

      {/* Sphere 2: Mid-Left Cool Cyan / Ice Frosted 3D Orb */}
      <div
        data-depth="-35"
        data-rot="-15"
        className="interactive-orb absolute top-[38%] left-[2%] sm:left-[3%] w-28 h-28 sm:w-44 sm:h-44 rounded-full transition-transform duration-75 ease-out animate-float-reverse"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/95 via-sky-300/60 to-blue-600/70 backdrop-blur-md shadow-[0_22px_55px_rgba(14,165,233,0.4),inset_0_4px_12px_rgba(255,255,255,0.95),inset_0_-10px_20px_rgba(15,23,42,0.4)] border border-white/80 relative overflow-hidden">
          <div className="absolute top-3 left-4 w-12 h-6 rounded-full bg-white/95 rotate-[-20deg] blur-[1px]" />
          <div className="absolute bottom-4 right-5 w-10 h-10 rounded-full bg-sky-200/50 blur-[5px]" />
        </div>
      </div>

      {/* Sphere 3: Bottom-Right Shimmering Warm Rose Gold 3D Orb */}
      <div
        data-depth="40"
        data-rot="18"
        className="interactive-orb absolute bottom-[8%] right-[4%] sm:right-[6%] w-32 h-32 sm:w-48 sm:h-48 rounded-full transition-transform duration-75 ease-out animate-float-drift"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/90 via-rose-300/60 to-pink-600/65 backdrop-blur-md shadow-[0_25px_60px_rgba(225,29,72,0.38),inset_0_5px_14px_rgba(255,255,255,0.95),inset_0_-10px_22px_rgba(136,19,55,0.4)] border border-white/70 relative overflow-hidden">
          <div className="absolute top-4 left-5 w-14 h-7 rounded-full bg-white/95 rotate-[-25deg] blur-[2px]" />
          <div className="absolute bottom-5 right-7 w-12 h-12 rounded-full bg-amber-200/40 blur-[5px]" />
        </div>
      </div>

      {/* Sphere 4: Bottom-Left Rich Amethyst Purple Accent Orb */}
      <div
        data-depth="-25"
        data-rot="-8"
        className="interactive-orb absolute bottom-[18%] left-[5%] w-24 h-24 sm:w-36 sm:h-36 rounded-full transition-transform duration-75 ease-out animate-float-slow delay-300"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/90 via-fuchsia-300/60 to-purple-700/75 backdrop-blur-md shadow-[0_20px_50px_rgba(147,51,234,0.4),inset_0_4px_12px_rgba(255,255,255,0.9),inset_0_-8px_18px_rgba(88,28,135,0.45)] border border-white/75 relative overflow-hidden">
          <div className="absolute top-3 left-4 w-9 h-5 rounded-full bg-white/90 rotate-[-22deg] blur-[1px]" />
        </div>
      </div>

      {/* Sphere 5: Top-Left Metallic Champagne / Rose Gold Micro-Cluster */}
      <div
        data-depth="22"
        className="interactive-orb absolute top-[14%] left-[6%] w-20 h-20 sm:w-28 sm:h-28 rounded-full transition-transform duration-75 ease-out animate-float-drift delay-700"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 via-amber-400/70 to-amber-700/80 shadow-[0_16px_40px_rgba(180,83,9,0.35),inset_0_3px_8px_rgba(255,255,255,0.95),inset_0_-6px_14px_rgba(120,53,15,0.5)] border border-amber-200/60 relative overflow-hidden">
          <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/95 rotate-[-25deg] blur-[1px]" />
        </div>
      </div>

      {/* ── Dynamic Floating Pearlescent Bubbles with Rising Physics ── */}
      <div
        data-depth="-18"
        className="interactive-orb absolute top-[22%] left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-white/95 via-purple-300/70 to-indigo-400/80 shadow-[0_10px_25px_rgba(147,51,234,0.35),inset_0_2px_6px_rgba(255,255,255,0.95)] border border-white/80 animate-bubble-rise"
      />
      <div
        data-depth="24"
        className="interactive-orb absolute top-[64%] left-[16%] w-16 h-16 rounded-full bg-gradient-to-br from-white/95 via-sky-300/70 to-blue-500/70 shadow-[0_14px_30px_rgba(59,130,246,0.35),inset_0_3px_8px_rgba(255,255,255,0.95)] border border-white/85 animate-bubble-rise delay-500"
      />
      <div
        data-depth="-28"
        className="interactive-orb absolute top-[76%] right-[24%] w-14 h-14 rounded-full bg-gradient-to-br from-white/95 via-pink-300/70 to-rose-500/70 shadow-[0_12px_28px_rgba(244,63,94,0.35),inset_0_2px_6px_rgba(255,255,255,0.95)] border border-white/85 animate-bubble-rise delay-1000"
      />
      <div
        data-depth="16"
        className="interactive-orb absolute top-[30%] right-[16%] w-10 h-10 rounded-full bg-gradient-to-br from-white/95 via-purple-200/80 to-purple-400/80 shadow-[0_8px_20px_rgba(168,85,247,0.3),inset_0_2px_5px_rgba(255,255,255,0.95)] border border-white/90 animate-float-bob delay-300"
      />
      <div
        data-depth="-14"
        className="interactive-orb absolute top-[85%] left-[38%] w-11 h-11 rounded-full bg-gradient-to-br from-white/95 via-violet-300/75 to-indigo-500/75 shadow-[0_9px_22px_rgba(124,58,237,0.32),inset_0_2px_5px_rgba(255,255,255,0.95)] border border-white/85 animate-bubble-rise delay-700"
      />
      <div
        data-depth="20"
        className="interactive-orb absolute top-[48%] right-[12%] w-14 h-14 rounded-full bg-gradient-to-br from-white/95 via-amber-200/70 to-rose-400/70 shadow-[0_10px_24px_rgba(251,146,60,0.3),inset_0_2px_6px_rgba(255,255,255,0.95)] border border-white/85 animate-float-drift delay-500"
      />
    </div>
  );
}
