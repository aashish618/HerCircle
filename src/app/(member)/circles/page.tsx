'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockCircles } from '@/lib/mock/circles';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TopicChip } from '@/components/community/topic-chip';
import { Users, MessageSquare, Search, ArrowRight } from 'lucide-react';

export default function CirclesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCircles = mockCircles.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-2">
      <div className="border-b border-[var(--color-border)] pb-4 space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-charcoal)]">
          Explore Topic Circles
        </h1>
        <p className="text-sm text-[var(--color-charcoal-light)]">
          Nine private, moderated circles designed around the real facets of Indian women&apos;s lives.
        </p>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search circles by name or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCircles.map((circle) => (
          <Card key={circle.id} className="flex flex-col justify-between hover:border-[var(--color-rose)] transition">
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <TopicChip name={circle.name} slug={circle.slug} iconName={circle.icon} />
                <span className="text-xs text-[var(--color-muted)] font-mono">
                  {circle.memberCount} members
                </span>
              </div>
              <CardTitle className="text-lg">{circle.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                {circle.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-muted)] flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{circle.discussionCount} conversations</span>
              </span>
              <Link href={`/circles/${circle.slug}`}>
                <Button variant="outline" size="sm" className="text-xs">
                  Enter Circle <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
