'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';
import { mockUsers } from '@/lib/mock/users';

const DEMO_USERS: Record<UserRole, User | null> = {
  visitor: null,
  applicant: {
    id: 'applicant-1',
    displayName: 'Neha Gupta',
    city: 'Mumbai',
    role: 'applicant',
    isMentor: false,
    joinedAt: '2024-02-14T09:30:00Z',
    bio: 'Data analyst based in Mumbai. Applied to connect with elder women who navigated corporate leadership.',
  },
  member: mockUsers[0], // Priya Sharma
  moderator: mockUsers[3], // Kavita Nair
};

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isMember: boolean;
  isModerator: boolean;
  isApplicant: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hercircle-demo-role') as UserRole | null;
        if (saved && ['visitor', 'applicant', 'member', 'moderator'].includes(saved)) {
          return saved;
        }
      } catch {
        // Ignore
      }
    }
    return 'member';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hercircle-demo-role', newRole);
      } catch {
        // Ignore
      }
    }
  };

  const user = DEMO_USERS[role];
  const isAuthenticated = role !== 'visitor';
  const isMember = role === 'member' || role === 'moderator';
  const isModerator = role === 'moderator';
  const isApplicant = role === 'applicant';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        isAuthenticated,
        isMember,
        isModerator,
        isApplicant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
