# HerMaitri — India-First Private Women's Community & Mentorship Platform

> **Phase 0 & 1 Prototype**: Documentation & Frontend Interactive Prototype  
> **Target Audience**: Women aged 12+ (inclusive of cisgender and transgender women)  
> **Tech Stack**: Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4, Lucide Icons, React Context

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

---

## Overview

HerMaitri is a private, curated digital sanctuary for Indian women combining:
1. **Reddit-style discussions** across 9 curated Indian topic circles
2. **Anonymous questions** with flower pseudonyms (Lotus, Jasmine, Marigold)
3. **Intergenerational mentorship** ("Ask an Elder Sister") based on stated experience, not ageism
4. **Human moderation & safety red-lines** (no invasive biometrics, verified crisis resources, strict anti-doxxing)

---

## Dev Role Switcher

A floating role-switcher widget is pinned at the bottom-right of every screen, allowing you to instantly test authorization boundaries across all 4 defined platform roles:

| Role | Context & Permissions |
|------|------------------------|
| **Visitor** | Unauthenticated public view: landing, how it works, guidelines, crisis resources, application form |
| **Applicant** | Application submitted; views the pending approval state |
| **Approved Member** | Logged in as **Priya Sharma** (Bengaluru): full access to discussions, circles, mentors, anonymous questions, comments, saves |
| **Moderator / Admin** | Logged in as **Kavita Nair** (Kochi): access to moderator dashboard, report queue, application review queue, and circle rules management |

---

## Documentation Index

All architectural blueprints and security specifications are located in `docs/`:

- [`docs/PRD.md`](./docs/PRD.md): Product Requirements Document, personas, CRUD permissions matrix across all 4 roles, eligibility policy, mentorship model, and safety principles.
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md): Technical architecture, App Router layout structure, DAL mock-to-Supabase swap pattern, design tokens, and type scale.
- [`docs/USER_FLOWS.md`](./docs/USER_FLOWS.md): Full sitemap diagram and 10 step-by-step end-to-end user journeys.
- [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md): Complete Supabase PostgreSQL schema with 17 tables, 7 enums, RLS policies, storage bucket policies, and indexes.
- [`docs/SECURITY_MODEL.md`](./docs/SECURITY_MODEL.md): Threat model, anonymous identity isolation, server-side role enforcement, audit logging specification, and Indian emergency escalation protocols.
- [`docs/DECISIONS.md`](./docs/DECISIONS.md): 15 architectural and product trade-off decisions with one-line rationales.
- [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md): Checkpoint-by-checkpoint implementation breakdown.

---

## File and Folder Structure

```
HerCircle/
├── docs/                             # Architecture & Security Documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── USER_FLOWS.md
│   ├── DATABASE_SCHEMA.md
│   ├── SECURITY_MODEL.md
│   ├── DECISIONS.md
│   └── IMPLEMENTATION_PLAN.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with fonts, providers, and shell
│   │   ├── globals.css               # Design tokens, CSS variables, Tailwind theme
│   │   ├── page.tsx                  # Landing page
│   │   ├── design-system/page.tsx    # Dev-only component & token showcase
│   │   ├── (public)/                 # Public & Visitor routes
│   │   │   ├── how-it-works/page.tsx
│   │   │   ├── apply/page.tsx        # Multi-step membership application
│   │   │   ├── sign-in/page.tsx
│   │   │   ├── sign-up/page.tsx
│   │   │   ├── pending/page.tsx      # Application pending approval
│   │   │   ├── guidelines/page.tsx   # Community guidelines
│   │   │   └── safety/page.tsx       # Crisis resources & privacy rights
│   │   ├── (member)/                 # Approved Member routes
│   │   │   ├── feed/page.tsx         # Personalized home feed
│   │   │   ├── circles/page.tsx      # Explore topic circles
│   │   │   ├── circles/[slug]/page.tsx
│   │   │   ├── discussions/[id]/page.tsx
│   │   │   ├── discussions/new/page.tsx
│   │   │   ├── ask/page.tsx          # Anonymous question composer
│   │   │   ├── elder-sister/page.tsx # Mentorship landing
│   │   │   ├── mentors/page.tsx      # Mentor directory
│   │   │   ├── mentors/[id]/page.tsx
│   │   │   ├── saved/page.tsx        # Bookmarked discussions
│   │   │   ├── notifications/page.tsx
│   │   │   ├── profile/[id]/page.tsx
│   │   │   ├── settings/page.tsx     # Privacy controls, data export & deletion
│   │   │   └── help/page.tsx         # Help center FAQs
│   │   └── (mod)/                    # Moderator routes
│   │       └── mod/
│   │           ├── dashboard/page.tsx
│   │           ├── reports/page.tsx  # Report review queue
│   │           ├── applications/page.tsx # Membership application queue
│   │           └── community/page.tsx # Circle management & rules
│   ├── components/
│   │   ├── ui/                       # Base primitives (button, badge, card, avatar, dialog, input, textarea)
│   │   ├── layout/                   # Header, sidebar, mobile-nav, shell, role-switcher
│   │   ├── community/                # PostCard, ReactionBar, CommentThread, TopicChip, PollView
│   │   ├── mentorship/               # MentorCard, GuidanceRequest
│   │   ├── moderation/               # ReportDialog, ModControls
│   │   └── shared/                   # PrototypeBanner, DemoBadge, CrisisBanner, PrivacyNotice, ContentWarning, EmptyState, SkeletonLoader, ErrorState
│   ├── contexts/
│   │   ├── auth-context.tsx          # Simulated auth with 4-role switcher
│   │   └── demo-context.tsx          # Interactive state (posts, comments, reports, saves, reactions)
│   └── lib/
│       ├── types.ts                  # Shared TypeScript interfaces
│       ├── utils.ts                  # Helper utilities (cn, date, aliases)
│       ├── data.ts                   # Asynchronous data access layer
│       └── mock/                     # Seeded Indian datasets
│           ├── users.ts              # 15 diverse Indian women profiles
│           ├── circles.ts            # 9 curated topic circles
│           ├── discussions.ts        # 32 realistic Indian discussions
│           ├── comments.ts           # Nested replies & peer advice
│           ├── mentors.ts            # 12 mentor profiles across domains
│           ├── reports.ts            # Moderation report queue seeds
│           ├── applications.ts       # Membership application seeds
│           ├── notifications.ts      # Notifications seeds
│           └── crisis.ts             # India crisis helplines
```

---

## Screens Implemented Checklist

- [x] **Landing Page** (`/`): Welcoming hero, value proposition, 4 pillars, circle previews, featured discussions, mentor highlights, safety commitments.
- [x] **How HerCircle Works** (`/how-it-works`): 4-step workflow, human review process, non-invasive verification, safety red-lines.
- [x] **Membership Application** (`/apply`): 3-step application form (personal info, interest circle selection, motivation statement, age 12+ confirmation, guidelines pledge). Submits directly to demo queue.
- [x] **Sign In / Sign Up** (`/sign-in`, `/sign-up`): Clearly labeled mock auth pages with one-click demo member access.
- [x] **Membership Pending** (`/pending`): Post-submission status screen explaining review timelines with dev shortcut.
- [x] **Community Guidelines** (`/guidelines`): 5 core tenets: anti-doxxing, peer support boundaries, anti-harassment, respectful pseudonymity, transparent mentorship.
- [x] **Privacy & Safety** (`/safety`): Verified India crisis helpline directory (Tele-MANAS, NCW, Vandrevala, Cybercrime, 112) marked "verify before launch", data rights, no AI training.
- [x] **Member Home Feed** (`/feed`): Personalized greeting, "Ask Anonymously" & "New Discussion" actions, topic chips, recommended circles, filter tabs (All, Elder Sister, Trending), real-time feed.
- [x] **Explore Circles** (`/circles`): Grid of 9 seeded circles with search filter, discussion counts, and member counts.
- [x] **Circle Detail** (`/circles/[slug]`): Custom circle banner, dedicated rules, assigned moderators, and filtered discussion feed.
- [x] **Discussion Detail** (`/discussions/[id]`): Full discussion view, poll viewer, content warning wrapper, reaction bar with 4 reaction types + save + report, nested comment thread with reply composer.
- [x] **Create Discussion** (`/discussions/new`): Circle selector, title, body, named vs. anonymous toggle with privacy notice, content warning checkbox, image placeholder. Submits and redirects to feed.
- [x] **Anonymous Question Composer** (`/ask`): Dedicated flow with flower alias preview and pseudonymity explanation.
- [x] **Ask an Elder Sister** (`/elder-sister`): Intergenerational guidance landing, featured mentors, recent guidance threads.
- [x] **Mentor Directory** (`/mentors`): Topic filter chips, search input, 12+ mentor cards with "Request Guidance" dialog.
- [x] **Mentor Profile** (`/mentors/[id]`): Stated experience narrative, verified topics, public Q&As answered, request guidance flow.
- [x] **Saved Discussions** (`/saved`): Live bookmarked discussions synced with reaction bar save button.
- [x] **Notifications** (`/notifications`): Reply alerts, helpful reaction milestones, guidance updates with "mark all as read".
- [x] **Member Profile** (`/profile/[id]`): User avatar, city, bio, member since date, and conversations started.
- [x] **Member Settings** (`/settings`): Profile privacy checkboxes, JSON data export flow (mocked), irreversible account deletion flow (mocked).
- [x] **Help Center** (`/help`): Frequently asked questions on membership, pseudonymity, rules, and crisis support.
- [x] **Moderator Dashboard** (`/mod/dashboard`): Metric cards (active reports, pending apps, active circles), quick navigation, simulated audit log.
- [x] **Report Review Queue** (`/mod/reports`): Filter by status, review notes input, actions (Resolve, Escalate, Dismiss).
- [x] **Membership Review Queue** (`/mod/applications`): Filter by status, actions (Approve, Request Info, Decline).
- [x] **Community Management** (`/mod/community`): Circle rules editor and moderator assignment console.
- [x] **Design System Showcase** (`/design-system`): Complete token catalog, type scale, and every reusable component in all states.

---

## Functional vs. Mocked Features

| Feature | Status | Notes |
|---------|--------|-------|
| Route Navigation | **Fully Functional** | All links resolve to real App Router pages |
| Role Switching | **Fully Functional** | Instant switching between Visitor, Applicant, Member, Moderator |
| Discussion Creation | **Fully Functional (In-Memory)** | Form adds discussions to feed and redirects |
| Anonymous Posting | **Fully Functional (In-Memory)** | Assigns random flower alias (🌸 Lotus, Jasmine) |
| Commenting & Nested Replies | **Fully Functional (In-Memory)** | Replies render in discussion thread |
| Reactions (Support, Helpful, etc.) | **Fully Functional (In-Memory)** | Real-time reaction toggle & counts |
| Save / Unsave Bookmarks | **Fully Functional (In-Memory)** | Synchronized with `/saved` page |
| Report Submission & Queue | **Fully Functional (In-Memory)** | Flagging a post pushes to `/mod/reports` |
| Application Submission & Queue | **Fully Functional (In-Memory)** | Applying pushes to `/mod/applications` |
| Moderation Actions (Approve/Resolve) | **Fully Functional (In-Memory)** | State updates reflected in moderator views |
| Data Access Layer (`lib/data.ts`) | **Fully Functional** | Async functions ready for Supabase client replacement |
| Authentication & Sessions | *Simulated / Mocked* | React Context + localStorage (no passwords/tokens) |
| Image Uploads | *Mocked Placeholder* | Image icon shown; storage bucket designed in docs |
| Full-text Search | *Client-Side Filter* | PostgreSQL FTS designed for Phase 2 |
| Data Export / Account Deletion | *Mocked Dialogs* | Clearly labeled as mocked in UI |
| Push / Email Notifications | *Simulated* | In-app notification tray with mock events |

---

## Known Limitations (Phase 0 & 1)

1. **Client-side Session Storage**: The prototype stores interactive state in React Context and demo role in `localStorage`. Hard refreshing resets created posts to seed defaults unless persisted in demo state.
2. **No Real Database**: No external database is connected. All records run through `lib/data.ts` reading from `lib/mock/`.
3. **No Direct Messaging**: In accordance with the product brief, private DMs are intentionally omitted in favor of public, accountable Q&A threads.
4. **Offline Font Fallback**: In environments without internet access to Google Fonts, the app seamlessly falls back to system serif (Georgia, Cambria) and sans-serif (-apple-system, Segoe UI) stacks.

---

## Security Risks Requiring Review Before Launch

1. **Deanonymization Risk**: Anonymous discussions must have their author IDs stored in a segregated table (`anonymous_identities`) accessible only by elevated database functions, never by client queries.
2. **Medical & Legal Misinformation**: In health circles (e.g. PCOS, thyroid), automated disclaimers and human verification must prevent harmful unverified commercial remedies.
3. **Doxxing in Joint Family Threads**: Emotional relationship posts must be screened for private phone numbers or residential addresses.
4. **Emergency Escalation Response**: Self-harm reports require a dedicated, 24/7 SLA protocol with direct linkages to verified crisis helplines.

---

## Phase 2 Backend Implementation Plan

1. **Supabase Setup**:
   - Provision Supabase project with PostgreSQL 15+.
   - Run the schema script from [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md).
2. **Authentication**:
   - Enable Supabase Auth with Magic Links (email OTP).
   - Hook user registration to the `membership_applications` table.
3. **Row Level Security (RLS)**:
   - Apply policies from [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md) ensuring only approved members can read discussions.
   - Enforce server-side moderator role checks via `auth.jwt()`.
4. **Data Access Layer Swap**:
   - Replace implementations in `src/lib/data.ts` with `@supabase/supabase-js` queries without changing component interfaces.
5. **Private Storage**:
   - Configure private storage bucket for user attachments with signed URL generation.
6. **Integration & Security Tests**:
   - Write automated RLS test suites verifying unauthorized queries fail.
