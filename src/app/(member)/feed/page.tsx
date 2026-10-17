'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="py-20 text-center text-sm text-purple-900 font-medium animate-pulse">
      Loading Live Feed...
    </div>
  );
}
