import {
  User,
  Circle,
  Discussion,
  Comment,
  MentorProfile,
  Report,
  MembershipApplication,
  Notification,
  CrisisResource,
} from './types';
import { mockUsers } from './mock/users';
import { mockCircles } from './mock/circles';
import { mockDiscussions } from './mock/discussions';
import { mockComments } from './mock/comments';
import { mockMentors } from './mock/mentors';
import { mockReports } from './mock/reports';
import { mockApplications } from './mock/applications';
import { mockNotifications } from './mock/notifications';
import { mockCrisisResources } from './mock/crisis';

/**
 * Data Access Layer (DAL) for HerCircle.
 * These functions simulate asynchronous database queries.
 * In Phase 2, these will connect directly to Supabase with RLS.
 */

// --- Users ---
export async function getUsers(): Promise<User[]> {
  return mockUsers;
}

export async function getUserById(id: string): Promise<User | undefined> {
  return mockUsers.find((u) => u.id === id);
}

// --- Circles ---
export async function getCircles(): Promise<Circle[]> {
  return mockCircles;
}

export async function getCircleBySlug(slug: string): Promise<Circle | undefined> {
  return mockCircles.find((c) => c.slug === slug);
}

// --- Discussions ---
export async function getDiscussions(circleSlug?: string): Promise<Discussion[]> {
  if (circleSlug) {
    return mockDiscussions.filter((d) => d.circleSlug === circleSlug && !d.isRemoved);
  }
  return mockDiscussions.filter((d) => !d.isRemoved);
}

export async function getDiscussionById(id: string): Promise<Discussion | undefined> {
  return mockDiscussions.find((d) => d.id === id && !d.isRemoved);
}

// --- Comments ---
export async function getCommentsByDiscussionId(discussionId: string): Promise<Comment[]> {
  return mockComments[discussionId] || [];
}

// --- Mentors ---
export async function getMentors(): Promise<MentorProfile[]> {
  return mockMentors;
}

export async function getMentorByUserId(userId: string): Promise<MentorProfile | undefined> {
  return mockMentors.find((m) => m.userId === userId);
}

// --- Reports ---
export async function getReports(): Promise<Report[]> {
  return mockReports;
}

// --- Applications ---
export async function getApplications(): Promise<MembershipApplication[]> {
  return mockApplications;
}

// --- Notifications ---
export async function getNotifications(userId?: string): Promise<Notification[]> {
  if (userId) {
    return mockNotifications.filter((n) => n.userId === userId);
  }
  return mockNotifications;
}

// --- Crisis Resources ---
export async function getCrisisResources(): Promise<CrisisResource[]> {
  return mockCrisisResources;
}
