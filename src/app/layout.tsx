import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { DemoProvider } from '@/contexts/demo-context';
import { Shell } from '@/components/layout/shell';

export const metadata: Metadata = {
  title: 'HerMaitri — India’s Private Women’s Community & Mentorship',
  description:
    'An India-first, private community and mentorship platform for women aged 12+. Thoughtful discussions, anonymous questions, and elder sister guidance.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)] font-sans antialiased selection:bg-[var(--color-lavender)] selection:text-[var(--color-charcoal)]">
        <AuthProvider>
          <DemoProvider>
            <Shell>{children}</Shell>
          </DemoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
