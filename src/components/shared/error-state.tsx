'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-rose-950">{title}</h3>
      <p className="text-sm text-rose-800 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 bg-white">
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Try again
        </Button>
      )}
    </div>
  );
}
