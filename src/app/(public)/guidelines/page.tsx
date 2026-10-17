import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, HeartHandshake, EyeOff, AlertTriangle } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 border-b border-[var(--color-border)] pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-sage)] text-xs font-medium text-emerald-950">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Core Community Standards</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
          HerCircle Community Guidelines
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          HerCircle is a sanctuary for Indian women across all ages (12+). These rules are enforced by human moderators to preserve mutual trust, privacy, and psychological safety.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <span>1. Zero Tolerance for Doxxing & Privacy Invasions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed space-y-1.5">
            <p>
              Never post real phone numbers, home addresses, specific residential society names, or identifying personal documents of yourself or any other person.
            </p>
            <p className="text-[var(--color-muted)]">
              Violations result in instant post removal and permanent account disqualification.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <span>2. Peer Support is Not Professional Advice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed space-y-1.5">
            <p>
              Members may share personal experiences with PCOS, mental health, investments, or legal disputes. However, peer advice must never be presented as authoritative medical, psychiatric, or legal diagnosis.
            </p>
            <p className="text-[var(--color-muted)]">
              Selling unverified wellness remedies, detox products, or investment schemes is prohibited.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <span>3. Anti-Harassment & Non-Judgment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed space-y-1.5">
            <p>
              We welcome women from diverse cultural backgrounds, faiths, castes, sexual orientations, and gender identities (including trans women). Moral policing, victim-blaming, slurs, and mocking of vulnerable questions are strictly prohibited.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <span>4. Respectful Pseudonymity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed space-y-1.5">
            <p>
              Anonymous posting is a shield for vulnerability, not a weapon for malice. Content posted anonymously must still adhere to all community standards. Abuse of anonymous posting leads to loss of the privilege.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <span>5. Transparent Mentorship</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[var(--color-charcoal-light)] leading-relaxed space-y-1.5">
            <p>
              Mentorship happens in public guidance threads. No solicitations for private payments, offline meetups without consent, or recruitment schemes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
