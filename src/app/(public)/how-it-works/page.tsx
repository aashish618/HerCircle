import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, UserCheck, HeartHandshake, EyeOff, FileText, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="space-y-10 py-4">
      <div className="space-y-2 border-b border-[var(--color-border)] pb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
          How HerMaitri Works
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          HerMaitri is an intentional sanctuary designed from the ground up for Indian women. Here is our exact process, safety philosophy, and community architecture.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-rose)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            1
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
              Application & Respectful Human Verification
            </h3>
            <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
              We never use invasive biometric methods like facial scanning or voice analysis — such tools are privacy-invasive and cannot guarantee gender. Instead, we use a written membership application reviewed by human community moderators, combined with clear community agreements and peer accountability. Open to all women aged 12+, including transgender women.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-rose)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            2
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
              Private Topic Circles
            </h3>
            <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
              Members participate in 9 foundational circles (Career, Money, Health, Safety, Family, Motherhood, Fashion, Personal Growth, and Elder Sister). Circle discussions are never publicly indexed by search engines.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-rose)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
              Pseudonymous Asking & Honest Boundaries
            </h3>
            <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
              When dealing with delicate matters (in-law conflicts, workplace POSH dilemmas, medical questions), you can post with an auto-generated flower alias. We are honest: this is pseudonymity toward peers, not absolute anonymity from platform safety logs.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-rose)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            4
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-serif text-lg font-bold text-[var(--color-charcoal)]">
              Intergenerational Mentorship in the Open
            </h3>
            <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
              Mentorship happens in public Q&A threads, not behind closed DMs. This keeps interactions safe, accountable, and enables hundreds of other sisters facing similar dilemmas to learn from the advice.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)] p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Our Health & Safety Red Lines
        </h3>
        <ul className="text-xs text-[var(--color-charcoal-light)] space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Peer support is not medical or legal advice:</strong> Disclaimers accompany all health and financial discussions.</li>
          <li><strong>Anti-Harassment & Anti-Doxxing:</strong> Sharing private phone numbers, names of private individuals, or addresses results in immediate removal.</li>
          <li><strong>Content Warnings:</strong> Members flag sensitive topics so peers can choose when to engage.</li>
          <li><strong>No AI Model Training:</strong> Member posts are never scraped or fed into AI models without explicit, separate consent.</li>
        </ul>
      </div>

      <div className="pt-2">
        <Link href="/apply">
          <Button size="lg">
            Apply to Join HerMaitri <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
