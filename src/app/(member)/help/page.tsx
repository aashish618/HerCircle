import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ShieldCheck, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { BubbleSpheres3D } from '@/components/shared/bubble-spheres-3d';

export default function HelpCenterPage() {
  const faqs = [
    {
      q: 'Who is eligible to join HerMaitri?',
      a: 'HerMaitri is open to all women aged 12 and older, including transgender women. We use human application review to ensure psychological safety without invasive biometric surveillance.',
    },
    {
      q: 'How does anonymous posting work?',
      a: 'When you check "Post anonymously", your name is replaced by a randomized flower alias (e.g. Lotus, Jasmine). Other members cannot see your real identity. However, to prevent abuse, server-side logs maintain platform accountability.',
    },
    {
      q: 'Why can\'t I send private direct messages (DMs)?',
      a: 'To prevent harassment, unsolicited advances, and predatory behavior, HerMaitri MVP routes all mentorship and advice through public Q&A threads.',
    },
    {
      q: 'What should I do if I see harmful content or harassment?',
      a: 'Click the flag icon on any post or comment to report it. Reports go directly to our human moderator review queue.',
    },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* 3D Violet Hero Banner matching Live Feed */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#DDD4FA] via-[#D8CBFA] to-[#C8B8F6] p-6 sm:p-8 border border-purple-300/60 shadow-md card-3d relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-purple-950 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            <span>KNOWLEDGE BASE & GUIDANCE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
            Help Center & FAQs
          </h1>

          <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-medium">
            Answers to common questions about HerMaitri membership, privacy, anonymous questions, and community etiquette.
          </p>
        </div>

        {/* 3D Bubble Spheres Cluster */}
        <div className="hidden md:flex items-center justify-center shrink-0 pr-4 relative z-10">
          <BubbleSpheres3D className="scale-125" />
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[var(--color-charcoal)] font-bold">
                {f.q}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
              {f.a}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)] p-6 space-y-3">
        <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
          Need Emergency or Crisis Help?
        </h3>
        <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
          For acute psychological distress, domestic emergencies, or cyber harassment, view our verified Indian helpline directory.
        </p>
        <Link href="/safety">
          <Button variant="outline" size="sm" className="bg-white text-xs">
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-rose-700" />
            View Emergency Resources Directory
          </Button>
        </Link>
      </div>
    </div>
  );
}
