import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';

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
      <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Help Center & FAQs
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Answers to common questions about HerMaitri membership, privacy, and community etiquette.
        </p>
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
