# HerCircle — Product Requirements Document

> **Status:** Draft · Prototype  
> **Last updated:** 2026-10-17

---

## 1 · Product Vision

HerCircle is an **India-first private women's community platform** that blends:

- **Reddit-style discussions** — threaded, votable, topic-organised posts.
- **Private circles** — interest-based groups members opt into.
- **Anonymous questions** — a safe way to ask sensitive things without attaching your name.
- **Intergenerational mentorship** — experienced women offering guidance to younger members.
- **Strong privacy & moderation** — community-driven safety backed by human review.

The platform exists because women in India still lack a mainstream, trustworthy online space that is *theirs by default* — not a sub-section of a larger product, not a dating app sidebar, and not a Facebook group with unpredictable moderation.

---

## 2 · Target Users

| Criterion | Detail |
|---|---|
| **Who** | All women aged **12 and above**, including transgender women. |
| **Geography (v1)** | India — content, crisis resources, and UX language are India-first. |
| **Language (v1)** | English. Vernacular support is deferred. |

### Gender Verification Philosophy

HerCircle **never** uses invasive gender detection (ID scans, selfie verification, biometric checks, etc.).

Membership integrity is maintained through:

1. **Membership application** — short form with a few open-ended questions.
2. **Human review** — moderators review every application.
3. **Community guidelines** — clear behavioural expectations accepted on sign-up.
4. **Reporting** — members can flag accounts that appear to violate the women-only policy.

> [!IMPORTANT]
> This is a trust-based model. It will not catch every bad actor — and that's an accepted trade-off in favour of dignity and inclusion.

---

## 3 · Roles & Permissions

HerCircle has four roles. Permissions follow a strict escalation ladder.

### 3.1 Role Definitions

| Role | Who | Access |
|---|---|---|
| **Visitor** | Anyone who lands on the site without an account or membership. | Public-facing pages only. |
| **Applicant** | Has submitted a membership application; awaiting review. | Pending-status page only. |
| **Approved Member** | Application approved; full community participant. | All community features. |
| **Moderator / Admin** | Trusted member elevated to a moderation role. | All member features + moderation tools. |

### 3.2 CRUD Permissions Matrix

| Action | Visitor | Applicant | Member | Mod / Admin |
|---|:---:|:---:|:---:|:---:|
| View landing page | ✅ | ✅ | ✅ | ✅ |
| View guidelines & safety page | ✅ | ✅ | ✅ | ✅ |
| Apply for membership | ✅ | — | — | — |
| View pending application page | — | ✅ | — | — |
| View community content (feed, circles, discussions) | — | — | ✅ | ✅ |
| Create discussions (named or anonymous) | — | — | ✅ | ✅ |
| Reply to discussions | — | — | ✅ | ✅ |
| React to posts / replies | — | — | ✅ | ✅ |
| Save / unsave discussions | — | — | ✅ | ✅ |
| Join / leave circles | — | — | ✅ | ✅ |
| Report content or members | — | — | ✅ | ✅ |
| View mentors & request guidance | — | — | ✅ | ✅ |
| Manage own profile & settings | — | — | ✅ | ✅ |
| Review reports (open / escalate / resolve) | — | — | — | ✅ |
| Review membership applications (approve / request info / decline) | — | — | — | ✅ |
| Manage circle rules | — | — | — | ✅ |
| Pin / lock / remove content | — | — | — | ✅ |
| View audit logs | — | — | — | ✅ |

---

## 4 · Mentorship

### Principles

- **Optional.** No one is required to be a mentor or seek one.
- **Experience-based, not age-based.** A 22-year-old entrepreneur can mentor a 40-year-old career-switcher.
- **Public Q&A threads (MVP).** Mentorship conversations happen in visible threads so the whole community benefits.
- **No private messaging in MVP.** This is a deliberate safety guardrail — DMs introduce grooming and harassment vectors that require moderation tooling we haven't built yet.

### Mentor Registration

Members can register as mentors by filling a short profile: areas of experience, a short bio, and availability. Moderators can review and de-list mentors if needed.

---

## 5 · Health & Safety

### 5.1 Peer Support ≠ Professional Advice

Every health-related circle and discussion displays a persistent disclaimer:

> *"Conversations here are peer support, not professional medical, legal, or psychological advice. Please consult a qualified professional for decisions affecting your health or safety."*

### 5.2 Crisis Resources

A dedicated **Crisis Resources** page lists India-relevant helplines and organisations:

- Mental health helplines (e.g., iCall, Vandrevala Foundation)
- Domestic violence helplines (e.g., Women Helpline 181, NCW)
- Legal aid contacts
- LGBTQ+ support organisations

> [!WARNING]
> All listed resources must be **verified before launch** — phone numbers, URLs, and operating hours change. Assign an owner to re-verify quarterly.

### 5.3 Content Warnings

Authors can tag posts with content warnings. Warned posts show a click-to-reveal overlay.

### 5.4 Anti-Harassment

- Clear anti-harassment rules in community guidelines.
- One-click reporting on every post, reply, and profile.
- Serious reports (threats, doxxing, CSAM, self-harm) are **escalated to human moderators immediately** and are never auto-resolved.

---

## 6 · Privacy

### 6.1 Anonymity Model

**Anonymous = pseudonymous to other members, not to platform operations.**

When a member posts anonymously, other members see a random alias. However, HerCircle moderators and system operators **can** see the real account behind anonymous posts — this is necessary to enforce rules and respond to safety escalations.

We state this plainly in our guidelines and during onboarding. We do not pretend otherwise.

### 6.2 Limits of Privacy

**Privacy is not absolutely guaranteed.** No platform can make that promise. HerCircle takes strong technical and operational precautions, but we are honest with members:

- Court orders or legal processes may compel disclosure.
- Security breaches, while guarded against, are possible.
- Human moderators with access to data are bound by policy, not cryptography.

### 6.3 Data Principles

| Principle | Implementation |
|---|---|
| No AI training without consent | Member content is never used to train AI/ML models unless the member explicitly opts in. |
| Private content not indexed | Circle discussions and anonymous posts are excluded from search-engine indexing (noindex, nofollow). |
| Account deletion | Members can delete their account from Settings. All personal data is purged. *(Mocked in prototype.)* |
| Data export | Members can request an export of their data from Settings. *(Mocked in prototype.)* |

---

## 7 · Seeded Circles

The platform launches with the following pre-created circles. Members can browse and join any of them.

| Circle | Description |
|---|---|
| **Career & Education** | Job hunting, study tips, workplace issues, skill-building. |
| **Fashion & Shopping** | Style advice, hauls, deals, brand reviews. |
| **Health & Wellness** | Physical health, mental health, fitness, nutrition. |
| **Women's Safety** | Street safety, travel safety, digital safety, self-defence. |
| **Relationships & Family** | Dating, marriage, in-laws, friendships, boundaries. |
| **Money & Financial Independence** | Saving, investing, salary negotiation, financial literacy. |
| **Motherhood & Parenting** | Pregnancy, childcare, school choices, working-mom life. |
| **Personal Growth** | Habits, journaling, therapy journeys, confidence. |
| **Ask an Elder Sister** | No specific topic — ask anything of experienced members. |

---

## 8 · MVP Scope & Deferrals

### In Scope (MVP / Prototype)

- Landing page, guidelines page, safety/crisis page
- Membership application flow + moderator review
- Community feed with circle filtering
- Discussion creation (named + anonymous), replies, reactions
- Circle browsing, joining, and leaving
- Anonymous questions
- Mentor directory, mentor profiles, guidance requests (public threads)
- Content saving (bookmarks)
- Content reporting + moderator queue (open / escalate / resolve)
- Profile & settings pages (with mocked deletion + export)
- Content warnings
- Basic responsive design (mobile-first)

### Deferred (Post-MVP)

- Private / direct messaging
- Vernacular language support
- Push notifications
- Mentor–mentee private sessions
- User-created circles
- Reputation / karma system
- Mobile apps (native)
- Advanced search & filtering
- Email digest / notification preferences
- OAuth / social login (email + password only in MVP)
- Real account deletion & data export (currently mocked)
