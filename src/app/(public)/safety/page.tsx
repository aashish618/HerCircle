import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCrisisResources } from '@/lib/mock/crisis';
import { ShieldAlert, PhoneCall, Lock, HeartHandshake } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 border-b border-[var(--color-border)] pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-rose-light)] text-xs font-semibold text-[var(--color-rose-dark)]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Trust, Safety & Emergency Pathways</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
          Privacy, Safety & Emergency Resources
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          If you or someone in your circle is facing immediate danger, violence, or mental distress, please connect with these verified crisis helplines in India.
        </p>
      </div>

      {/* Verified Helplines Directory */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Emergency & Crisis Helplines (Pan-India)
          </h2>
          <Badge variant="rose">Verify before launch</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCrisisResources.map((res, i) => (
            <Card key={i} className="border-rose-200/80 bg-rose-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-rose-950 flex items-center justify-between">
                  <span>{res.name}</span>
                </CardTitle>
                {res.phone && (
                  <p className="font-mono text-sm font-bold text-rose-800 flex items-center pt-1">
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> {res.phone}
                  </p>
                )}
              </CardHeader>
              <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
                {res.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Privacy Commitments */}
      <section className="space-y-4 pt-4 border-t border-[var(--color-border)]">
        <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
          Our Data & Privacy Commitments
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-white/90 p-6 space-y-4 text-xs text-[var(--color-charcoal-light)] leading-relaxed">
          <div className="flex items-start space-x-3">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--color-charcoal)]">No Public Search Indexing</p>
              <p>Community conversations carry <code className="font-mono">noindex, nofollow</code> headers and are barred from search engine crawlers.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--color-charcoal)]">No AI Training Without Consent</p>
              <p>Member posts and discussions are strictly protected from commercial AI model training pipelines without separate explicit opt-in.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--color-charcoal)]">Limits of Privacy</p>
              <p>While pseudonymity protects you from peers, HerMaitri complies with mandatory legal disclosures regarding self-harm or credible threats of violence under Indian statutory requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
