# Decisions Log

> Key decisions made for the HerCircle prototype, with rationale.

---

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Age eligibility | **12+** | Platform is designed for women and girls; age-appropriate safeguards are built into content guidelines, moderation, and community structure. |
| 2 | Dusty rose (`#C87982`) on ivory (`#F8F4EF`) | **Accents & large text only** | Contrast ratio ~3.8:1 fails WCAG AA for small body text (requires 4.5:1). Charcoal (`#292631`) is used for all body text. Rose is restricted to decorative elements, icons, and headings ≥18.66px bold / ≥24px regular. |
| 3 | Anonymous posting | **Pseudonymous** | Users post under display names, not real names. UI clearly communicates this is pseudonymity, not true anonymity. Anonymous identity ↔ account mapping stored in a restricted DB table (Phase 2). |
| 4 | Private messaging | **Not in MVP** | DMs require a full content-moderation pipeline to prevent harassment. Deferred to Phase 2 when moderation infrastructure is in place. |
| 5 | Authentication | **React Context role switcher** | Prototype only — no real passwords, tokens, or sessions. A demo switcher lets reviewers toggle between Member, Moderator, and Visitor roles. |
| 6 | Image uploads | **Placeholder UI only** | Upload buttons are shown but non-functional. Real uploads require storage buckets, signed URLs, and image moderation. Deferred. |
| 7 | Real-time features | **Static mock data** | Notifications and activity indicators use pre-seeded data. Real-time updates require Supabase Realtime or WebSockets. Deferred to Phase 2. |
| 8 | Search | **Not implemented** | Full-text search would require PostgreSQL FTS or an external service (e.g. Algolia). Out of scope for prototype. |
| 9 | Multi-language support | **English only** | Content is India-aware (culturally relevant topics, INR references, local crisis resources) but English-only. i18n infrastructure deferred. |
| 10 | Mentor verification | **Stated experience only** | Mentors self-report expertise. No identity or credential verification in MVP. Verification workflow planned for Phase 2. |
| 11 | Content moderation | **Human-only** | Moderators manually review flagged content via the mod dashboard. AI-assisted moderation (toxicity scoring, auto-flagging) deferred. |
| 12 | Crisis resources | **India-relevant, marked 'verify before launch'** | Helpline numbers and resources for mental health, domestic violence, etc. are included but must be verified for accuracy before any public release. |
| 13 | localStorage usage | **Demo state only** | Used exclusively for clearly labelled demo state (saved posts, dismissed banners). No sensitive or personal data is stored. |
| 14 | Mobile navigation | **Bottom bar + slide-out sheet** | Bottom bar surfaces primary nav (Feed, Circles, Ask, Notifications). A hamburger icon opens a slide-out sheet with the full menu for less-frequent destinations. |
| 15 | Comment nesting | **Max 3 levels** | Deeper nesting causes usability issues on mobile (excessive indentation, tiny tap targets). Replies beyond level 3 are flattened. |
