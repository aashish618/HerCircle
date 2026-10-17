# Database Schema

> Supabase PostgreSQL — design reference (not yet implemented)

---

## Enums

| Enum Name | Values |
|---|---|
| `user_role` | `member`, `moderator`, `admin` |
| `application_status` | `pending`, `approved`, `declined`, `info_requested` |
| `reaction_target` | `discussion`, `comment` |
| `reaction_type` | `support`, `insightful`, `helpful`, `heart` |
| `guidance_status` | `pending`, `accepted`, `completed` |
| `report_category` | `harassment`, `doxxing`, `spam`, `misinformation`, `self_harm`, `other` |
| `report_status` | `open`, `escalated`, `resolved`, `dismissed` |

---

## Tables

### `profiles`

Primary user profile, created on first sign-in.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, references `auth.users(id)` | Supabase Auth UID |
| `email` | `text` | unique, not null | From auth provider |
| `display_name` | `text` | not null | Chosen during onboarding |
| `avatar_url` | `text` | | Path in `avatars` bucket |
| `bio` | `text` | max 500 chars | |
| `city` | `text` | | Indian city / "Prefer not to say" |
| `role` | `user_role` | not null, default `member` | |
| `is_mentor` | `boolean` | default `false` | |
| `created_at` | `timestamptz` | default `now()` | |
| `updated_at` | `timestamptz` | default `now()` | Auto-updated via trigger |

---

### `membership_applications`

Gated entry — every new user submits an application reviewed by a moderator.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `user_id` | `uuid` | FK → `profiles(id)`, not null | |
| `display_name` | `text` | not null | Name at time of application |
| `age_group` | `text` | not null | e.g. "12-17", "18-24", "25-34" |
| `interests` | `text[]` | | Selected topic tags |
| `about_text` | `text` | not null, max 1000 chars | Why the user wants to join |
| `status` | `application_status` | not null, default `pending` | |
| `reviewer_id` | `uuid` | FK → `profiles(id)` | Moderator who reviewed |
| `review_note` | `text` | | Internal note (not shown to user) |
| `created_at` | `timestamptz` | default `now()` | |
| `reviewed_at` | `timestamptz` | | Set on status change |

---

### `circles`

Topic-based sub-communities (e.g. "Career Talk", "Mental Health").

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `slug` | `text` | unique, not null | URL-safe identifier |
| `name` | `text` | not null | |
| `description` | `text` | | |
| `icon` | `text` | | Emoji or icon key |
| `rules` | `text` | | Circle-specific guidelines |
| `is_private` | `boolean` | default `false` | Private = invite-only |
| `created_at` | `timestamptz` | default `now()` | |

---

### `circle_members`

Join table — which users belong to which circles.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `circle_id` | `uuid` | PK (composite), FK → `circles(id)` | |
| `user_id` | `uuid` | PK (composite), FK → `profiles(id)` | |
| `joined_at` | `timestamptz` | default `now()` | |

---

### `discussions`

Top-level posts within a circle.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `circle_id` | `uuid` | FK → `circles(id)`, not null | |
| `author_id` | `uuid` | FK → `profiles(id)`, not null | Real author (hidden if anonymous) |
| `anonymous_alias` | `text` | | e.g. "Butterfly 🦋" — null if not anonymous |
| `title` | `text` | not null, max 200 chars | |
| `body` | `text` | not null | Markdown supported |
| `content_warning` | `text` | | Optional CW label |
| `has_poll` | `boolean` | default `false` | |
| `is_pinned` | `boolean` | default `false` | Moderator action |
| `is_locked` | `boolean` | default `false` | Moderator action |
| `is_removed` | `boolean` | default `false` | Soft-delete by moderator |
| `created_at` | `timestamptz` | default `now()` | |
| `updated_at` | `timestamptz` | default `now()` | |

> [!NOTE]
> When `anonymous_alias` is set, the client displays the alias instead of `author_id`. The real identity is never sent to the client — see `anonymous_identities` table and RLS policies below.

---

### `comments`

Threaded replies on discussions. `parent_id` enables one level of nesting.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `discussion_id` | `uuid` | FK → `discussions(id)`, not null | |
| `parent_id` | `uuid` | FK → `comments(id)`, nullable | Null = top-level reply |
| `author_id` | `uuid` | FK → `profiles(id)`, not null | |
| `anonymous_alias` | `text` | | Inherits from discussion if anonymous |
| `body` | `text` | not null | |
| `is_removed` | `boolean` | default `false` | |
| `created_at` | `timestamptz` | default `now()` | |

---

### `reactions`

Positive-only reactions on discussions or comments.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `target_type` | `reaction_target` | not null | `discussion` or `comment` |
| `target_id` | `uuid` | not null | ID of the discussion or comment |
| `user_id` | `uuid` | FK → `profiles(id)`, not null | |
| `type` | `reaction_type` | not null | |
| `created_at` | `timestamptz` | default `now()` | |

**Unique constraint:** `(target_type, target_id, user_id, type)` — one reaction of each type per user per target.

---

### `saved_items`

Bookmarked discussions.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `user_id` | `uuid` | PK (composite), FK → `profiles(id)` | |
| `discussion_id` | `uuid` | PK (composite), FK → `discussions(id)` | |
| `saved_at` | `timestamptz` | default `now()` | |

---

### `mentor_profiles`

Extended profile for users who opt in as mentors.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `user_id` | `uuid` | PK, FK → `profiles(id)` | |
| `headline` | `text` | not null, max 120 chars | e.g. "Software Engineer · 8 yrs" |
| `experience_areas` | `text[]` | not null | e.g. `{"career", "tech", "finance"}` |
| `experience_years` | `int` | | |
| `bio` | `text` | max 1000 chars | |
| `is_available` | `boolean` | default `true` | Mentor can pause availability |
| `created_at` | `timestamptz` | default `now()` | |

---

### `guidance_requests`

One-to-one mentorship requests.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `mentor_id` | `uuid` | FK → `profiles(id)`, not null | |
| `requester_id` | `uuid` | FK → `profiles(id)`, not null | |
| `topic` | `text` | not null | |
| `message` | `text` | not null, max 1000 chars | |
| `status` | `guidance_status` | not null, default `pending` | |
| `created_at` | `timestamptz` | default `now()` | |

---

### `reports`

Content/user reports submitted by members, handled by moderators.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `reporter_id` | `uuid` | FK → `profiles(id)`, not null | |
| `target_type` | `text` | not null | `discussion`, `comment`, or `user` |
| `target_id` | `uuid` | not null | |
| `category` | `report_category` | not null | |
| `description` | `text` | max 1000 chars | |
| `status` | `report_status` | not null, default `open` | |
| `reviewer_id` | `uuid` | FK → `profiles(id)` | Moderator who handled it |
| `review_note` | `text` | | Internal resolution note |
| `created_at` | `timestamptz` | default `now()` | |
| `resolved_at` | `timestamptz` | | |

---

### `anonymous_identities`

Maps real users to anonymous aliases per discussion. **Restricted table — never exposed to clients.**

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `user_id` | `uuid` | FK → `profiles(id)`, not null | |
| `alias` | `text` | not null | e.g. "Butterfly 🦋" |
| `discussion_id` | `uuid` | FK → `discussions(id)`, not null | |

**Unique constraint:** `(user_id, discussion_id)` — one alias per user per discussion.

> [!CAUTION]
> This table has **no client-readable RLS policy**. Only server-side functions (Edge Functions / service-role key) can read it. Leaking this mapping would deanonymise users.

---

### `audit_log`

Append-only log of sensitive actions for accountability.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `actor_id` | `uuid` | FK → `profiles(id)` | Who performed the action |
| `action` | `text` | not null | e.g. `role_change`, `content_removed` |
| `target_type` | `text` | | e.g. `discussion`, `profile` |
| `target_id` | `uuid` | | |
| `metadata` | `jsonb` | | Extra context (old/new values, reason) |
| `created_at` | `timestamptz` | default `now()` | |

---

### `polls`

Optional poll attached to a discussion.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `discussion_id` | `uuid` | FK → `discussions(id)`, unique, not null | One poll per discussion |
| `question` | `text` | not null | |
| `options` | `jsonb` | not null | Array of `{ "label": "..." }` objects |
| `created_at` | `timestamptz` | default `now()` | |

---

### `poll_votes`

One vote per user per poll.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `poll_id` | `uuid` | PK (composite), FK → `polls(id)` | |
| `user_id` | `uuid` | PK (composite), FK → `profiles(id)` | |
| `option_index` | `int` | not null | Index into `polls.options` array |
| `created_at` | `timestamptz` | default `now()` | |

---

### `notifications`

In-app notification feed.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `user_id` | `uuid` | FK → `profiles(id)`, not null | |
| `type` | `text` | not null | e.g. `reply`, `mention`, `mod_action` |
| `title` | `text` | not null | |
| `body` | `text` | | |
| `link` | `text` | | In-app deep link |
| `is_read` | `boolean` | default `false` | |
| `created_at` | `timestamptz` | default `now()` | |

**Index:** `(user_id, is_read, created_at DESC)` for unread-first feed queries.

---

## Row-Level Security (RLS) Policies

All tables have RLS **enabled**. Policies use `auth.uid()` to identify the caller and a helper function to check role:

```sql
-- Helper: returns the role of the current user
create function public.current_user_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;
```

### Community Content (circles, discussions, comments, reactions, polls, poll_votes)

| Policy | Rule | Effect |
|---|---|---|
| **Approved-member read** | `current_user_role() IN ('member','moderator','admin')` | Only approved members can `SELECT` community content. Visitors and applicants see nothing. |
| **Author insert** | `auth.uid() = author_id` (or `user_id`) | Members can create their own content. |
| **Author update** | `auth.uid() = author_id AND NOT is_removed` | Authors can edit their own non-removed content. |
| **Moderator update** | `current_user_role() IN ('moderator','admin')` | Moderators can pin, lock, or soft-remove any content. |
| **No hard delete** | No `DELETE` policy on discussions/comments | Content is soft-deleted (`is_removed = true`), never hard-deleted by clients. |

### `profiles`

| Policy | Rule |
|---|---|
| **Self read** | `auth.uid() = id` — always read own profile |
| **Member read** | `current_user_role() IN ('member','moderator','admin')` — approved members can read other profiles |
| **Self update** | `auth.uid() = id` — users update only their own profile |
| **Role update blocked** | `role` column excluded from client-update; role changes happen via server-side function + audit log |

### `membership_applications`

| Policy | Rule |
|---|---|
| **Self insert** | `auth.uid() = user_id` |
| **Self read** | `auth.uid() = user_id` — applicants can view their own status |
| **Moderator read/update** | `current_user_role() IN ('moderator','admin')` — review and decide |

### `saved_items`

| Policy | Rule |
|---|---|
| **Self only** | `auth.uid() = user_id` for all operations |

### `mentor_profiles`

| Policy | Rule |
|---|---|
| **Member read** | `current_user_role() IN ('member','moderator','admin')` |
| **Self insert/update** | `auth.uid() = user_id` |

### `guidance_requests`

| Policy | Rule |
|---|---|
| **Requester insert** | `auth.uid() = requester_id` |
| **Participant read** | `auth.uid() IN (mentor_id, requester_id)` |
| **Mentor update** | `auth.uid() = mentor_id` — accept/complete |

### `reports`

| Policy | Rule |
|---|---|
| **Member insert** | `auth.uid() = reporter_id` — any member can file a report |
| **Moderator read/update** | `current_user_role() IN ('moderator','admin')` — only mods see and handle reports |
| **Reporter cannot read** | Reporters do not see other reports or the resolution of their own (prevents gaming) |

### `anonymous_identities`

| Policy | Rule |
|---|---|
| **No SELECT / UPDATE / DELETE** | No RLS policy grants any client access. Table is invisible from the client. |
| **Server-only** | Accessed exclusively via Edge Functions using the `service_role` key. |

### `audit_log`

| Policy | Rule |
|---|---|
| **Insert-only** | Server-side functions insert rows; no `SELECT`, `UPDATE`, or `DELETE` granted to any client role. |
| **Admin read** | `current_user_role() = 'admin'` — admins can query the log via a dedicated admin view/function. |

### `notifications`

| Policy | Rule |
|---|---|
| **Self only** | `auth.uid() = user_id` for `SELECT` and `UPDATE` (mark as read) |
| **Server insert** | Notifications created by server-side triggers/functions, not directly by clients. |

---

## Storage Buckets

### `avatars`

| Setting | Value |
|---|---|
| **Public read** | Yes — avatar URLs are publicly accessible |
| **Authenticated write** | Users can upload to their own path (`avatars/{user_id}/*`) |
| **File size limit** | 2 MB |
| **Allowed MIME types** | `image/jpeg`, `image/png`, `image/webp` |
| **Policy** | `auth.uid()::text = (storage.foldername(name))[1]` — users write only to their own folder |

### `discussion-images`

| Setting | Value |
|---|---|
| **Public read** | No — private bucket |
| **Authenticated read** | Approved members only (via signed URLs generated server-side) |
| **Authenticated write** | Members can upload to `discussion-images/{user_id}/*` |
| **File size limit** | 5 MB |
| **Allowed MIME types** | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |
| **Access method** | Server generates short-lived signed URLs; client never gets the raw storage path |

---

## Key Indexes

| Table | Index | Purpose |
|---|---|---|
| `discussions` | `(circle_id, is_removed, created_at DESC)` | Feed queries per circle |
| `comments` | `(discussion_id, created_at ASC)` | Thread rendering |
| `reactions` | `(target_type, target_id)` | Reaction counts |
| `notifications` | `(user_id, is_read, created_at DESC)` | Unread-first feed |
| `reports` | `(status, created_at DESC)` | Moderator queue |
| `membership_applications` | `(status, created_at DESC)` | Application review queue |
| `audit_log` | `(actor_id, created_at DESC)` | Per-user audit trail |
