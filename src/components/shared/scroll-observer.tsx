'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // If native CSS scroll-driven animations are supported, the browser compositor handles it natively
    if (typeof window === 'undefined') return;

    const hasNativeSupport =
      typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    // For full cross-browser reliability and dynamic DOM updates, observe .scroll-reveal elements
    const elements = document.querySelectorAll<HTMLElement>('.scroll-reveal');

    if (hasNativeSupport) {
      // Native engine handles view-timeline directly; no JS manipulation needed
      return;
    }

    // Fallback using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.classList.remove('not-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => {
      el.classList.add('not-revealed');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
