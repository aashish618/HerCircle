import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Shirt,
  Heart,
  Shield,
  Users,
  Wallet,
  Baby,
  Sparkles,
  MessageCircleHeart,
  Tag,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Shirt,
  Heart,
  Shield,
  Users,
  Wallet,
  Baby,
  Sparkles,
  MessageCircleHeart,
};

interface TopicChipProps {
  name: string;
  slug: string;
  iconName?: string;
  className?: string;
  isActive?: boolean;
}

export function TopicChip({ name, slug, iconName, className, isActive }: TopicChipProps) {
  const Icon = (iconName && ICON_MAP[iconName]) || Tag;

  return (
    <Link
      href={`/circles/${slug}`}
      className={cn(
        'inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] transition-all hover:bg-[var(--color-lavender-light)]',
        isActive
          ? 'bg-[var(--color-lavender)] text-[var(--color-charcoal)] font-semibold shadow-sm'
          : 'bg-white/80 text-[var(--color-charcoal-light)]',
        className
      )}
    >
      <Icon className="w-3 h-3 text-[var(--color-rose)]" />
      <span>{name}</span>
    </Link>
  );
}
