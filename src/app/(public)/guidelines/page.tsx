'use client';

import React from 'react';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';
import { ShieldCheck, HeartHandshake, EyeOff, AlertTriangle, Sparkles, Scale, Lock, Heart } from 'lucide-react';

export default function GuidelinesPage() {
  const guidelines = [
    {
      num: '1',
      title: 'Zero Tolerance for Doxxing & Privacy Invasions',
      body: 'Never post real phone numbers, home addresses, specific residential society names, or identifying personal documents of yourself or any other person.',
      sub: 'Violations result in instant post removal and permanent account disqualification.',
      icon: Lock,
    },
    {
      num: '2',
      title: 'Peer Support is Not Professional Advice',
      body: 'Members may share personal experiences with PCOS, mental health, investments, or legal disputes. However, peer advice must never be presented as authoritative medical, psychiatric, or legal diagnosis.',
      sub: 'Selling unverified wellness remedies, detox products, or investment schemes is prohibited.',
      icon: Scale,
    },
    {
      num: '3',
      title: 'Anti-Harassment & Non-Judgment',
      body: 'We welcome women from diverse cultural backgrounds, faiths, castes, sexual orientations, and gender identities (including trans women). Moral policing, victim-blaming, slurs, and mocking of vulnerable questions are strictly prohibited.',
      sub: 'Violations are escalated immediately to human community moderators.',
      icon: Heart,
    },
    {
      num: '4',
      title: 'Respectful Pseudonymity',
      body: 'Anonymous posting is a shield for vulnerability, not a weapon for malice. Content posted anonymously must still adhere to all community standards. Abuse of anonymous posting leads to loss of the privilege.',
      sub: 'Pseudonymity protects you from peers; safety operations maintain platform integrity.',
      icon: EyeOff,
    },
    {
      num: '5',
      title: 'Transparent Mentorship',
      body: 'Mentorship happens in public guidance threads so multiple women learn from every conversation. No solicitations for private payments, offline meetups without consent, or recruitment schemes.',
      sub: 'Protecting the safety of our younger sisters is paramount.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D8CBFA] to-[#C8B8F6] p-6 sm:p-8 border border-purple-300/60 shadow-md card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>CORE COMMUNITY STANDARDS • AGE 12+</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            HerMaitri Community Guidelines
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            HerMaitri is a sanctuary for Indian women across all ages (12+). These rules are enforced by human moderators to preserve mutual trust, privacy, and psychological safety.
          </p>
        </div>

        {/* 3D Pearlescent & Metallic Bubble Spheres Cluster */}
        <div className="hidden md:flex items-center justify-center shrink-0 pr-4 relative z-10">
          <BubbleSpheres3D className="scale-125" />
        </div>
      </div>

      {/* Guidelines Cards */}
      <div className="space-y-4">
        {guidelines.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.num}
              className="rounded-[24px] border border-purple-200/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm card-3d space-y-2 hover:border-purple-400 transition"
            >
              <div className="flex items-center space-x-3 pb-1">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-900 font-bold text-xs shrink-0">
                  {g.num}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-950">
                  {g.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-11">
                {g.body}
              </p>

              {g.sub && (
                <p className="text-xs text-purple-900/70 font-medium pl-11">
                  {g.sub}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
