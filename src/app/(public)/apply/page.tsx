'use client';

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
    'Women\'s Safety',
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
                      className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'border-[var(--color-rose)] bg-[var(--color-rose-light)] font-medium text-[var(--color-charcoal)]'
                          : 'border-[var(--color-border)] hover:bg-black/5 text-[var(--color-charcoal-light)]'
                      }`}
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
