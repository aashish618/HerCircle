import fs from 'fs';

// 1. Landing page: src/app/page.tsx
const landingPage = `'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TopicChip } from '@/components/community/topic-chip';
import { PostCard } from '@/components/community/post-card';
import { MentorCard } from '@/components/mentorship/mentor-card';
import { mockDiscussions } from '@/lib/mock/discussions';
import { mockMentors } from '@/lib/mock/mentors';
import { mockCircles } from '@/lib/mock/circles';
import {
  ShieldCheck,
  HeartHandshake,
  MessageCircleHeart,
  Sparkles,
  ArrowRight,
  Lock,
  EyeOff,
  UserCheck,
} from 'lucide-react';

export default function LandingPage() {
  const featuredDiscussions = mockDiscussions.slice(0, 3);
  const featuredMentors = mockMentors.slice(0, 2);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-sage)] border border-[var(--color-sage)] text-xs font-medium text-emerald-950">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>India’s Private, Trust-First Women’s Sanctuary • Age 12+</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-charcoal)] max-w-3xl mx-auto leading-[1.15]">
          A private circle where Indian women guide, protect, and uplift each other.
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-charcoal-light)] max-w-2xl mx-auto leading-relaxed">
          Reddit-style conversations, protected topic circles, pseudonymity when you need it, and elder sisters ready with real life experience. No trolls, no algorithmic doom-scrolling, and no invasive surveillance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/apply">
            <Button size="lg" className="shadow-md text-sm px-6">
              Apply for Membership <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="secondary" size="lg" className="text-sm px-6">
              How HerCircle Works
            </Button>
          </Link>
        </div>

        <p className="text-xs text-[var(--color-muted)] font-mono">
          Reviewed by human moderators • Zero invasive biometric tests • Inclusive of all women
        </p>
      </section>

      {/* 4 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-lavender)] flex items-center justify-center text-[var(--color-charcoal)]">
            <Lock className="w-5 h-5 text-[var(--color-rose-dark)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Private, Topic-Based Circles
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            From career negotiations and financial independence to PCOS management and toddler parenting. Discussions are shielded behind membership approval and never publicly indexed.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-sage)] flex items-center justify-center text-[var(--color-charcoal)]">
            <EyeOff className="w-5 h-5 text-emerald-800" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Pseudonymous Questions
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Ask vulnerable questions with a delicate flower pseudonym (Lotus, Jasmine). Your identity is shielded from other members while maintaining platform accountability.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-rose-light)] flex items-center justify-center text-[var(--color-charcoal)]">
            <HeartHandshake className="w-5 h-5 text-[var(--color-rose-dark)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Ask an Elder Sister
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Intergenerational mentorship rooted in stated experience, not arbitrary seniority. Seasoned women lawyers, doctors, engineers, and teachers answering your public dilemmas.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-3 shadow-[var(--shadow-card)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-ivory-warm)] flex items-center justify-center text-[var(--color-charcoal)]">
            <UserCheck className="w-5 h-5 text-[var(--color-charcoal)]" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
            Human Moderation & Care
          </h2>
          <p className="text-xs text-[var(--color-charcoal-light)] leading-relaxed">
            Every application is vetted by human moderators. Clear anti-harassment rules, crisis resources for India, content warnings, and strict anti-doxxing safeguards.
          </p>
        </div>
      </section>

      {/* Explore Circles preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Discover Topic Circles
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Nine curated spaces where Indian women share authentic reflections
            </p>
          </div>
          <Link href="/circles" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            View all circles <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockCircles.map((circle) => (
            <TopicChip
              key={circle.id}
              name={circle.name}
              slug={circle.slug}
              iconName={circle.icon}
            />
          ))}
        </div>
      </section>

      {/* Sample Discussions Feed */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
            Meaningful Community Conversations
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            A preview of real questions and grounded advice happening inside HerCircle
          </p>
        </div>

        <div className="space-y-4">
          {featuredDiscussions.map((disc) => (
            <PostCard key={disc.id} discussion={disc} />
          ))}
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--color-charcoal)]">
              Meet Our Elder Sisters & Mentors
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Experienced women offering public guidance in engineering, law, medicine, and life transitions
            </p>
          </div>
          <Link href="/mentors" className="text-xs font-semibold text-[var(--color-rose)] hover:underline flex items-center">
            Explore directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredMentors.map((m) => (
            <MentorCard key={m.userId} mentor={m} />
          ))}
        </div>
      </section>

      {/* Safety & Belonging Pledge CTA */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory-warm)] p-8 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-[var(--color-rose)] mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)] max-w-xl mx-auto">
          Ready to join a community built for your peace of mind?
        </h2>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-lg mx-auto leading-relaxed">
          Open to all women aged 12+ (including transgender sisters). Free to join, thoughtfully moderated, and committed to your privacy.
        </p>
        <div className="pt-2">
          <Link href="/apply">
            <Button size="lg" className="px-8 shadow-sm">
              Apply for HerCircle Membership
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
`;
fs.writeFileSync('src/app/page.tsx', landingPage);

// 2. How it works: src/app/(public)/how-it-works/page.tsx
const howItWorks = `import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, UserCheck, HeartHandshake, EyeOff, FileText, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="space-y-10 py-4">
      <div className="space-y-2 border-b border-[var(--color-border)] pb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
          How HerCircle Works
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed">
          HerCircle is an intentional sanctuary designed from the ground up for Indian women. Here is our exact process, safety philosophy, and community architecture.
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
            Apply to Join HerCircle <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/how-it-works/page.tsx', howItWorks);

// 3. Membership Application: src/app/(public)/apply/page.tsx
const applyPage = `'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDemo } from '@/contexts/demo-context';
import { useAuth } from '@/contexts/auth-context';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const { submitApplication } = useDemo();
  const { setRole } = useAuth();

  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState('');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [city, setCity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Career & Education',
    'Ask an Elder Sister',
  ]);
  const [aboutText, setAboutText] = useState('');
  const [agreedGuidelines, setAgreedGuidelines] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const circles = [
    'Career & Education',
    'Fashion & Shopping',
    'Health & Wellness',
    'Women\\'s Safety',
    'Relationships & Family',
    'Money & Financial Independence',
    'Motherhood & Parenting',
    'Personal Growth',
    'Ask an Elder Sister',
  ];

  const toggleInterest = (name: string) => {
    setSelectedInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitApplication({
        displayName,
        ageGroup,
        interests: selectedInterests,
        aboutText,
      });
      setRole('applicant');
      setIsSubmitted(true);
      setTimeout(() => {
        router.push('/pending');
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2 text-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-sage)] text-xs font-medium text-emerald-950">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Membership Application • Step {step} of 3</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Apply to Join HerCircle
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)]">
          Human-reviewed membership. Open to all women aged 12+, including transgender women.
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold">Application Submitted!</h2>
          <p className="text-xs text-[var(--color-muted)] max-w-md mx-auto">
            Your application is now in the review queue. Redirecting you to the membership status page...
          </p>
        </div>
      ) : (
        <form onSubmit={handleNext} className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 md:p-8 space-y-6 shadow-[var(--shadow-card)]">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
                1. About You
              </h2>
              <Input
                label="Preferred Display Name"
                placeholder="e.g. Aditi or Meenakshi"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <Input
                label="City / Region"
                placeholder="e.g. Pune, Maharashtra"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
                  Age Group (12+ Required)
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)]"
                >
                  <option value="12-17">12 to 17 (Young Sister)</option>
                  <option value="18-24">18 to 24 (Student / Early Career)</option>
                  <option value="25-34">25 to 34 (Mid Career / Family)</option>
                  <option value="35-49">35 to 49 (Experienced / Leadership)</option>
                  <option value="50+">50+ (Elder Sister / Mentor)</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
                2. Your Circles of Interest
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Select the spaces you would most like to explore or contribute to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {circles.map((c) => {
                  const isChecked = selectedInterests.includes(c);
                  return (
                    <label
                      key={c}
                      className={\`flex items-center space-x-2.5 p-3 rounded-xl border text-xs cursor-pointer transition \${
                        isChecked
                          ? 'border-[var(--color-rose)] bg-[var(--color-rose-light)] font-medium text-[var(--color-charcoal)]'
                          : 'border-[var(--color-border)] hover:bg-black/5 text-[var(--color-charcoal-light)]'
                      }\`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleInterest(c)}
                        className="rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
                      />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[var(--color-charcoal)]">
                3. Intent & Community Pledge
              </h2>
              <Textarea
                label="Why do you wish to join HerCircle?"
                placeholder="Share a short note on what brought you here and what you hope to find or share..."
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={4}
                required
              />

              <div className="space-y-2.5 pt-2 border-t border-[var(--color-border-light)]">
                <label className="flex items-start space-x-2.5 text-xs text-[var(--color-charcoal-light)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedAge}
                    onChange={(e) => setAgreedAge(e.target.checked)}
                    required
                    className="mt-0.5 rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
                  />
                  <span>
                    I confirm that I am a woman aged 12 or older. (Open to cisgender and transgender women).
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 text-xs text-[var(--color-charcoal-light)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedGuidelines}
                    onChange={(e) => setAgreedGuidelines(e.target.checked)}
                    required
                    className="mt-0.5 rounded text-[var(--color-rose)] focus:ring-[var(--color-rose)]"
                  />
                  <span>
                    I agree to the Community Guidelines: no harassment, no doxxing, no unverified medical sales, and holding my sisters in mutual dignity.
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border-light)]">
            {step > 1 ? (
              <Button type="button" variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : <div />}
            <Button type="submit" size="sm">
              {step === 3 ? 'Submit Application' : 'Next Step'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/apply/page.tsx', applyPage);

// 4. Sign-in & Sign-up: src/app/(public)/sign-in/page.tsx & sign-up/page.tsx
const signIn = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { DemoBadge } from '@/components/shared/demo-badge';

export default function SignInPage() {
  const router = useRouter();
  const { setRole } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('member');
    router.push('/feed');
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <DemoBadge />
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Welcome back to HerCircle
        </h1>
        <p className="text-xs text-[var(--color-muted)]">
          Prototype demo mode: Click Sign In to enter as Approved Member (Priya Sharma).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-6 space-y-4 shadow-[var(--shadow-card)]">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password / Magic Link"
          type="password"
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full">
          Sign In (Demo Member)
        </Button>
        <p className="text-xs text-center text-[var(--color-muted)] pt-2">
          New here? <Link href="/apply" className="text-[var(--color-rose)] font-semibold hover:underline">Apply for membership</Link>
        </p>
      </form>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/sign-in/page.tsx', signIn);

const signUp = `'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto py-10 text-center space-y-4">
      <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
        Join HerCircle
      </h1>
      <p className="text-sm text-[var(--color-charcoal-light)]">
        HerCircle is a private, curated space. All prospective members join by submitting a short membership application reviewed by human moderators.
      </p>
      <div className="pt-4">
        <Link href="/apply">
          <Button size="lg">Start Membership Application</Button>
        </Link>
      </div>
      <p className="text-xs text-[var(--color-muted)] pt-2">
        Already approved? <Link href="/sign-in" className="text-[var(--color-rose)] font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/sign-up/page.tsx', signUp);

// 5. Membership Pending: src/app/(public)/pending/page.tsx
const pendingPage = `'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, ShieldCheck, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function PendingPage() {
  const { setRole } = useAuth();

  return (
    <div className="max-w-lg mx-auto py-12 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
          Status: Under Human Review
        </span>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Your Application is Pending
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)] leading-relaxed">
          Thank you for applying to HerCircle! Our human community moderators review every application individually to ensure our sanctuary remains safe and authentic.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white/80 p-5 text-left text-xs space-y-3">
        <h3 className="font-semibold text-[var(--color-charcoal)]">What happens next?</h3>
        <ul className="space-y-1.5 text-[var(--color-muted)] list-disc list-inside">
          <li>Reviews are typically processed within 24 to 48 hours.</li>
          <li>You will receive an email confirmation once reviewed.</li>
          <li>In the meantime, feel free to read our Community Guidelines and Safety resources.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/guidelines">
          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-1.5" /> Read Guidelines
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setRole('member');
          }}
        >
          <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-700" />
          Dev Shortcut: Switch to Approved Member
        </Button>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/pending/page.tsx', pendingPage);

// 6. Community Guidelines: src/app/(public)/guidelines/page.tsx
const guidelines = `import React from 'react';
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
`;
fs.writeFileSync('src/app/(public)/guidelines/page.tsx', guidelines);

// 7. Crisis & Safety: src/app/(public)/safety/page.tsx
const safety = `import React from 'react';
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
              <p>While pseudonymity protects you from peers, HerCircle complies with mandatory legal disclosures regarding self-harm or credible threats of violence under Indian statutory requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
fs.writeFileSync('src/app/(public)/safety/page.tsx', safety);

console.log('Successfully generated all public pages.');
