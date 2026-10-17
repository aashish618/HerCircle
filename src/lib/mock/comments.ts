import { Comment } from '@/lib/types';

export const mockComments: Record<string, Comment[]> = {
  'disc-1': [
    {
      id: 'comm-101',
      discussionId: 'disc-1',
      authorId: 'user-7',
      authorName: 'Sneha Reddy',
      isAnonymous: false,
      body: 'Thank you Kajal didi! As a junior engineer, I always felt terrified that asking for more money would make me look greedy or ungrateful. Your tip on framing it around business impact and project metrics is gold.',
      isRemoved: false,
      reactionCounts: { support: 12, insightful: 5, helpful: 18, heart: 9 },
      createdAt: '2024-02-10T12:30:00Z',
      replies: [
        {
          id: 'comm-102',
          discussionId: 'disc-1',
          parentId: 'comm-101',
          authorId: 'user-1',
          authorName: 'Kajal Sharma',
          isAnonymous: false,
          body: 'Sneha, never apologize for being compensated fairly. The company evaluates your output on business value, so your compensation discussion should simply reflect that objective value.',
          isRemoved: false,
          reactionCounts: { support: 14, insightful: 8, helpful: 15, heart: 11 },
          createdAt: '2024-02-10T13:15:00Z',
        }
      ]
    },
    {
      id: 'comm-103',
      discussionId: 'disc-1',
      authorId: 'user-5',
      authorName: 'Ritu Desai',
      isAnonymous: false,
      body: 'Can confirm this playbook works across domains. Used a similar documented impact sheet when returning from my career break and managed to anchor the conversation at senior tier.',
      isRemoved: false,
      reactionCounts: { support: 8, insightful: 12, helpful: 14, heart: 4 },
      createdAt: '2024-02-10T14:40:00Z',
    }
  ],
  'disc-2': [
    {
      id: 'comm-201',
      discussionId: 'disc-2',
      authorId: 'user-6',
      authorName: 'Deepika Singh',
      isAnonymous: false,
      body: 'Dear Lotus, I cleared civil services at 28 after resisting constant marriage questions. What helped was sitting my parents down once, very calmly, and saying: "Give me this fixed timeframe. After that, we can discuss the next chapter. But while I am studying, your faith in me is my oxygen." When they see you treat your goal with professional discipline, their anxiety softens.',
      isRemoved: false,
      reactionCounts: { support: 34, insightful: 28, helpful: 42, heart: 39 },
      createdAt: '2024-02-12T09:45:00Z',
      replies: [
        {
          id: 'comm-202',
          discussionId: 'disc-2',
          parentId: 'comm-201',
          authorId: 'anon-101',
          authorName: 'Anonymous Member',
          isAnonymous: true,
          anonymousAlias: 'Lotus',
          body: 'Deepika didi, reading this brought tears to my eyes. The phrase "your faith in me is my oxygen" is something I am going to gently say to my mother tonight. Thank you so much.',
          isRemoved: false,
          reactionCounts: { support: 19, insightful: 6, helpful: 8, heart: 25 },
          createdAt: '2024-02-12T10:30:00Z',
        }
      ]
    },
    {
      id: 'comm-203',
      discussionId: 'disc-2',
      authorId: 'user-8',
      authorName: 'Meera Joshi',
      isAnonymous: false,
      body: 'Remember child: relatives speak out of habit and societal template, not malice. Nod politely, offer them sweets, and return quietly to your study table. Your life belongs to you, not to drawing room gossip.',
      isRemoved: false,
      reactionCounts: { support: 45, insightful: 32, helpful: 38, heart: 51 },
      createdAt: '2024-02-12T11:10:00Z',
    }
  ],
  'disc-3': [
    {
      id: 'comm-301',
      discussionId: 'disc-3',
      authorId: 'user-11',
      authorName: 'Pooja Mehta',
      isAnonymous: false,
      body: 'Thank you Dr. Ananya. After years of doctors saying "just lose 10 kg and your periods will be fine", finding a physician who actually checked my insulin resistance and thyroid changed everything.',
      isRemoved: false,
      reactionCounts: { support: 22, insightful: 15, helpful: 20, heart: 16 },
      createdAt: '2024-02-08T16:00:00Z',
    }
  ],
  'disc-6': [
    {
      id: 'comm-601',
      discussionId: 'disc-6',
      authorId: 'user-4',
      authorName: 'Kavita Nair',
      isAnonymous: false,
      body: 'Jasmine, this is one of the most common challenges in joint living. What helped me: establish "micro-rituals" that belong exclusively to you. For example, a morning 30-min walk alone, an evening tea in your room with the door closed, and scheduling weekend outings with clear prior notice rather than asking permission.',
      isRemoved: false,
      reactionCounts: { support: 18, insightful: 21, helpful: 25, heart: 14 },
      createdAt: '2024-02-13T15:30:00Z',
    }
  ]
};
