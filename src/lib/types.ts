// ── Roles ──
export type UserRole = 'visitor' | 'applicant' | 'member' | 'moderator';

// ── User / Profile ──
export interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  city?: string;
  role: UserRole;
  isMentor: boolean;
  joinedAt: string;
}

// ── Membership Application ──
export type ApplicationStatus = 'pending' | 'approved' | 'declined' | 'info_requested';

export interface MembershipApplication {
  id: string;
  userId: string;
  displayName: string;
  ageGroup: string;
  interests: string[];
  aboutText: string;
  status: ApplicationStatus;
  reviewerId?: string;
  reviewNote?: string;
  createdAt: string;
  reviewedAt?: string;
}

// ── Circles ──
export interface Circle {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  rules: string;
  memberCount: number;
  discussionCount: number;
  isPrivate: boolean;
  moderators: string[];
  createdAt: string;
}

// ── Discussions ──
export interface Discussion {
  id: string;
  circleId: string;
  circleName: string;
  circleSlug: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isAnonymous: boolean;
  anonymousAlias?: string;
  title: string;
  body: string;
  contentWarning?: string;
  poll?: Poll;
  isPinned: boolean;
  isLocked: boolean;
  isRemoved: boolean;
  reactionCounts: ReactionCounts;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

// ── Comments ──
export interface Comment {
  id: string;
  discussionId: string;
  parentId?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isAnonymous: boolean;
  anonymousAlias?: string;
  body: string;
  isRemoved: boolean;
  reactionCounts: ReactionCounts;
  createdAt: string;
  replies?: Comment[];
}

// ── Reactions ──
export type ReactionType = 'support' | 'insightful' | 'helpful' | 'heart';

export interface ReactionCounts {
  support: number;
  insightful: number;
  helpful: number;
  heart: number;
}

// ── Polls ──
export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVote?: number;
}

// ── Mentors ──
export interface MentorProfile {
  userId: string;
  user: User;
  headline: string;
  experienceAreas: string[];
  experienceYears: number;
  bio: string;
  isAvailable: boolean;
  questionsAnswered: number;
  createdAt: string;
}

// ── Guidance Requests ──
export type GuidanceStatus = 'pending' | 'accepted' | 'completed';

export interface GuidanceRequest {
  id: string;
  mentorId: string;
  requesterId: string;
  topic: string;
  message: string;
  status: GuidanceStatus;
  createdAt: string;
}

// ── Reports ──
export type ReportCategory = 'harassment' | 'doxxing' | 'spam' | 'misinformation' | 'self_harm' | 'other';
export type ReportStatus = 'open' | 'escalated' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'discussion' | 'comment' | 'user';
  targetId: string;
  targetPreview: string;
  category: ReportCategory;
  description: string;
  status: ReportStatus;
  reviewerId?: string;
  reviewNote?: string;
  createdAt: string;
  resolvedAt?: string;
}

// ── Notifications ──
export type NotificationType = 'reply' | 'reaction' | 'mention' | 'guidance_request' | 'application_update' | 'moderation';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

// ── Crisis Resources ──
export interface CrisisResource {
  name: string;
  phone?: string;
  description: string;
  verifyBeforeLaunch: boolean;
}
