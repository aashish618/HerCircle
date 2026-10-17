'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-rose)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-rose)] text-white hover:bg-[var(--color-rose-dark)] shadow-sm',
        secondary: 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] hover:bg-[#DDD0F0]',
        sage: 'bg-[var(--color-sage)] text-[var(--color-charcoal)] hover:bg-[#CFDEC9]',
        outline: 'border border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] hover:bg-black/5',
        ghost: 'bg-transparent text-[var(--color-charcoal)] hover:bg-black/5',
        destructive: 'bg-rose-700 text-white hover:bg-rose-800',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
