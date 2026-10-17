'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Discussion,
  Comment,
  Report,
  ReportCategory,
  MembershipApplication,
  ReactionType,
  ReportStatus,
  ApplicationStatus,
} from '@/lib/types';
import { mockReports } from '@/lib/mock/reports';
import { mockApplications } from '@/lib/mock/applications';
import { generateId, getRandomAlias } from '@/lib/utils';

interface DemoContextType {
  savedDiscussionIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;

  userReactions: Record<string, ReactionType>;
  toggleReaction: (targetId: string, type: ReactionType) => void;

  createdDiscussions: Discussion[];
  createDiscussion: (data: {
    circleSlug: string;
    circleName: string;
    circleId: string;
    title: string;
    body: string;
    isAnonymous: boolean;
    contentWarning?: string;
  }) => Discussion;

  customComments: Record<string, Comment[]>;
  createComment: (
    discussionId: string,
    body: string,
    isAnonymous: boolean,
    parentId?: string
  ) => Comment;

  reports: Report[];
  submitReport: (data: {
    targetType: 'discussion' | 'comment' | 'user';
    targetId: string;
    targetPreview: string;
    category: ReportCategory;
    description: string;
  }) => void;
  updateReportStatus: (reportId: string, status: ReportStatus, note?: string) => void;

  applications: MembershipApplication[];
  submitApplication: (data: {
    displayName: string;
    ageGroup: string;
    interests: string[];
    aboutText: string;
  }) => void;
  updateApplicationStatus: (
    appId: string,
    status: ApplicationStatus,
    note?: string
  ) => void;

  bannerDismissed: boolean;
  dismissBanner: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [savedDiscussionIds, setSavedDiscussionIds] = useState<string[]>(['disc-1', 'disc-4']);
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType>>({
    'disc-1': 'helpful',
    'disc-2': 'support',
  });
  const [createdDiscussions, setCreatedDiscussions] = useState<Discussion[]>([]);
  const [customComments, setCustomComments] = useState<Record<string, Comment[]>>({});
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [applications, setApplications] = useState<MembershipApplication[]>(mockApplications);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const toggleSave = (id: string) => {
    setSavedDiscussionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedDiscussionIds.includes(id);

  const toggleReaction = (targetId: string, type: ReactionType) => {
    setUserReactions((prev) => {
      const next = { ...prev };
      if (next[targetId] === type) {
        delete next[targetId];
      } else {
        next[targetId] = type;
      }
      return next;
    });
  };

  const createDiscussion = (data: {
    circleSlug: string;
    circleName: string;
    circleId: string;
    title: string;
    body: string;
    isAnonymous: boolean;
    contentWarning?: string;
  }): Discussion => {
    const newDisc: Discussion = {
      id: `disc-custom-${generateId()}`,
      circleId: data.circleId,
      circleName: data.circleName,
      circleSlug: data.circleSlug,
      authorId: data.isAnonymous ? 'anon' : 'user-1',
      authorName: data.isAnonymous ? 'Anonymous Member' : 'Kajal Sharma',
      isAnonymous: data.isAnonymous,
      anonymousAlias: data.isAnonymous ? getRandomAlias() : undefined,
      title: data.title,
      body: data.body,
      contentWarning: data.contentWarning,
      isPinned: false,
      isLocked: false,
      isRemoved: false,
      reactionCounts: { support: 1, insightful: 0, helpful: 0, heart: 0 },
      commentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCreatedDiscussions((prev) => [newDisc, ...prev]);
    return newDisc;
  };

  const createComment = (
    discussionId: string,
    body: string,
    isAnonymous: boolean,
    parentId?: string
  ): Comment => {
    const newComment: Comment = {
      id: `comm-custom-${generateId()}`,
      discussionId,
      parentId,
      authorId: isAnonymous ? 'anon' : 'user-1',
      authorName: isAnonymous ? 'Anonymous Member' : 'Kajal Sharma',
      isAnonymous,
      anonymousAlias: isAnonymous ? getRandomAlias() : undefined,
      body,
      isRemoved: false,
      reactionCounts: { support: 0, insightful: 0, helpful: 0, heart: 0 },
      createdAt: new Date().toISOString(),
    };

    setCustomComments((prev) => {
      const current = prev[discussionId] || [];
      return {
        ...prev,
        [discussionId]: [...current, newComment],
      };
    });

    return newComment;
  };

  const submitReport = (data: {
    targetType: 'discussion' | 'comment' | 'user';
    targetId: string;
    targetPreview: string;
    category: ReportCategory;
    description: string;
  }) => {
    const newReport: Report = {
      id: `rep-${generateId()}`,
      reporterId: 'user-1',
      reporterName: 'Kajal Sharma',
      targetType: data.targetType,
      targetId: data.targetId,
      targetPreview: data.targetPreview,
      category: data.category,
      description: data.description,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: ReportStatus, note?: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status,
              reviewerId: 'user-4',
              reviewNote: note || r.reviewNote,
              resolvedAt:
                status === 'resolved' || status === 'dismissed'
                  ? new Date().toISOString()
                  : undefined,
            }
          : r
      )
    );
  };

  const submitApplication = (data: {
    displayName: string;
    ageGroup: string;
    interests: string[];
    aboutText: string;
  }) => {
    const newApp: MembershipApplication = {
      id: `app-${generateId()}`,
      userId: `applicant-${generateId()}`,
      displayName: data.displayName,
      ageGroup: data.ageGroup,
      interests: data.interests,
      aboutText: data.aboutText,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (
    appId: string,
    status: ApplicationStatus,
    note?: string
  ) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              status,
              reviewerId: 'user-4',
              reviewNote: note || a.reviewNote,
              reviewedAt: new Date().toISOString(),
            }
          : a
      )
    );
  };

  const dismissBanner = () => setBannerDismissed(true);

  return (
    <DemoContext.Provider
      value={{
        savedDiscussionIds,
        toggleSave,
        isSaved,
        userReactions,
        toggleReaction,
        createdDiscussions,
        createDiscussion,
        customComments,
        createComment,
        reports,
        submitReport,
        updateReportStatus,
        applications,
        submitApplication,
        updateApplicationStatus,
        bannerDismissed,
        dismissBanner,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
