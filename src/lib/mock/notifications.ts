import { Notification } from '@/lib/types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'reply',
    title: 'New reply to your negotiation playbook',
    body: 'Sneha Reddy replied: "Thank you Priya didi! As a junior engineer..."',
    link: '/discussions/disc-1',
    isRead: false,
    createdAt: '2024-02-10T12:30:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'reaction',
    title: '145 people marked your answer helpful',
    body: 'Your discussion on 35% salary correction has helped 145 community members.',
    link: '/discussions/disc-1',
    isRead: false,
    createdAt: '2024-02-11T09:00:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'guidance_request',
    title: 'Guidance request from Samira Rao',
    body: 'Topic: Transitioning from campus to first engineering role in Bangalore.',
    link: '/mentors/user-1',
    isRead: true,
    createdAt: '2024-02-09T15:45:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'moderation',
    title: 'Community Guidelines reminder',
    body: 'Thank you for your active and constructive participation in Career & Education.',
    link: '/guidelines',
    isRead: true,
    createdAt: '2024-02-01T10:00:00Z',
  }
];
