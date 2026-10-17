# Security Model

> HerCircle security architecture — roles, policies, and threat mitigations.

---

## Roles & Permissions Matrix

Four roles in escalating privilege order. All enforcement happens server-side via Supabase RLS and Edge Functions.

| Resource | Visitor | Applicant | Member | Moderator / Admin |
|---|---|---|---|---|
| **Landing / public pages** | R | R | R | R |
| **Profiles** | — | Read own | R (all members) | R / U (any) |
| **Membership applications** | — | C own / R own | — | R / U (all) |
| **Circles (list & details)** | — | — | R | R / C / U |
| **Circle membership** | — | — | C / D own | R / D (any) |
| **Discussions** | — | — | R / C / U own | R / C / U any (pin, lock, remove) |
| **Comments** | — | — | R / C / U own | R / C / U any (remove) |
| **Reactions** | — | — | C / D own | C / D own |
| **Saved items** | — | — | C / R / D own | C / R / D own |
| **Polls & votes** | — | — | R / C own / Vote | R / C own / Vote |
| **Mentor profiles** | — | — | R all / C-U own | R / U any |
| **Guidance requests** | — | — | C own / R own | R (all) |
| **Reports** | — | — | C | R / U (all) |
| **Anonymous identities** | — | — | — | — (server-only) |
| **Audit log** | — | — | — | R (admin only) |
| **Notifications** | — | — | R / U own | R / U own |

**Legend:** R = Read, C = Create, U = Update, D = Delete, — = No access

> [!IMPORTANT]
> "Moderator / Admin" privileges are enforced by RLS policies checking `profiles.role`. The client never sends a role claim — the database looks it up on every query.

---

## Key Security Principles

### 1. No Privileged Keys in the Browser

- The Supabase `anon` key is the only key shipped to the client.
- The `service_role` key is used exclusively in Edge Functions and server-side jobs.
- Environment variables containing secrets are never bundled into the frontend build.

### 2. Anonymous Identity Isolation

- The `anonymous_identities` table has **zero client-readable RLS policies**.
- When a user posts anonymously, an Edge Function generates or retrieves their alias and writes it to both the `anonymous_identities` table and the `discussions.anonymous_alias` / `comments.anonymous_alias` column.
- The client only ever sees the alias string — never the `user_id ↔ alias` mapping.
- Even moderators cannot query this table directly; deanonymisation requires an admin-level Edge Function call that is audit-logged.

### 3. Server-Side Role Enforcement

- Role values (`member`, `moderator`, `admin`) live in the `profiles` table and are checked via `current_user_role()` inside RLS policies.
- Role changes are performed only via a dedicated Edge Function that:
  1. Validates the caller is an admin.
  2. Updates the role.
  3. Writes an `audit_log` entry.
- The `role` column is excluded from any client-facing `UPDATE` policy.

### 4. Private Content Not Publicly Indexed

- All authenticated pages return `X-Robots-Tag: noindex, nofollow` headers.
- No sitemap entries reference member-only routes.
- Server-side rendering (if used) gates content behind auth checks before emitting HTML.
- Discussion images are served via short-lived signed URLs, not stable public URLs.

### 5. Signed URLs for Private Storage

- The `discussion-images` bucket is private.
- When a member views a discussion, the server generates a signed URL (e.g. 60-minute expiry) for each attached image.
- Signed URLs are not cached in the client beyond the current session.

### 6. Audit Logging

The following actions are recorded in `audit_log`:

| Action | Details logged |
|---|---|
| `role_change` | Old role → new role, admin who made the change |
| `content_removed` | Discussion/comment ID, moderator, reason |
| `application_decision` | Application ID, decision, reviewer |
| `anonymous_identity_access` | Who accessed the mapping, which discussion |
| `data_export` | User who requested export, timestamp |
| `account_deletion` | User ID, deletion timestamp, admin (if admin-initiated) |
| `report_resolution` | Report ID, outcome, moderator |

> [!NOTE]
> The audit log is append-only. No `UPDATE` or `DELETE` operations are permitted on this table, even for admins.

### 7. No AI-Generated Diagnosis or Legal Conclusions

- The platform does not use AI to provide medical diagnoses, legal advice, or mental health assessments.
- Any AI-assisted features (e.g. content suggestions, moderation flags) are clearly labelled as automated and reviewed by humans before action.
- Mentor guidance is peer-based and explicitly disclaimed as non-professional advice.

### 8. Crisis Escalation Path

When a `self_harm` report is filed:

1. The report is immediately tagged as **priority** and surfaced at the top of the moderator queue.
2. Moderators are guided to respond within a defined SLA (target: < 1 hour during staffed hours).
3. The response includes linking the user to crisis resources:
   - **iCall** — 9152987821
   - **Vandrevala Foundation** — 1860-2662-345 (24/7)
   - **AASRA** — 9820466726
4. If the user appears to be in immediate danger, moderators escalate to the platform admin, who may contact local authorities if necessary.
5. All crisis-related actions are audit-logged.

> [!CAUTION]
> Moderators are **not** trained counsellors. The protocol is to connect users with professional resources, not to provide therapy.

---

## Threat Model

### Unauthorized Content Access

| Threat | An unauthenticated or unapproved user views private community content. |
|---|---|
| **Mitigation** | RLS policies on all community tables require `current_user_role() IN ('member','moderator','admin')`. Supabase returns zero rows to callers without an approved profile. |
| **Defence in depth** | Frontend route guards redirect unauthenticated users; but security does not rely on client-side checks. |

### Deanonymisation of Anonymous Posts

| Threat | A member or moderator discovers the real identity behind an anonymous post. |
|---|---|
| **Mitigation** | The `anonymous_identities` table has no client-readable RLS policy. The `discussions` and `comments` tables expose `anonymous_alias` but never join to the identity table. |
| **Defence in depth** | Deanonymisation via admin Edge Function is audit-logged and rate-limited. Alias generation uses a pool of non-identifying labels (animals, colours, etc.) to avoid pattern-based guessing. |

### Privilege Escalation

| Threat | A member modifies their profile to claim moderator or admin privileges. |
|---|---|
| **Mitigation** | The `role` column is not writable via any client `UPDATE` RLS policy. Role changes require a server-side Edge Function callable only by admins. |
| **Defence in depth** | `current_user_role()` is a `SECURITY DEFINER` function — it reads the role from the database, not from a client-supplied JWT claim. |

### Data Exfiltration

| Threat | An attacker bulk-scrapes community content. |
|---|---|
| **Mitigation** | No bulk-export API is exposed to clients. List queries use cursor-based pagination with a maximum page size. |
| **Defence in depth** | Supabase rate limiting (per-IP and per-user). Abnormal query patterns can trigger alerts (future: monitoring integration). |

### Harassment & Doxxing

| Threat | A member harasses another member or reveals personal information (doxxing). |
|---|---|
| **Mitigation** | Reporting system with `harassment` and `doxxing` categories. Moderators can remove content and restrict users. Community guidelines prohibit sharing others' personal information. |
| **Defence in depth** | Content warnings on sensitive discussions. Anti-doxxing rules enforced during moderation review. Repeat offenders can be permanently banned (role set to a disabled state, auth account suspended). |

### Malicious File Uploads

| Threat | A user uploads harmful files (malware, illegal content) via avatar or discussion image uploads. |
|---|---|
| **Mitigation** | Storage buckets enforce MIME type allowlists (`image/jpeg`, `image/png`, `image/webp`, `image/gif`) and file size limits. |
| **Defence in depth** | Images are served via Supabase's CDN/transformation layer, which re-encodes images and strips metadata (EXIF). |

---

## Summary of Controls by Layer

```
┌─────────────────────────────────────────────┐
│                 Client App                  │
│  • Route guards (UX only, not security)     │
│  • No secrets, no service_role key          │
│  • Signed URLs for private images           │
├─────────────────────────────────────────────┤
│              Supabase Edge Functions         │
│  • Role changes, anonymous identity mgmt    │
│  • Audit log writes                         │
│  • Crisis escalation triggers               │
│  • Signed URL generation                    │
├─────────────────────────────────────────────┤
│              Supabase RLS                   │
│  • Per-table, per-operation policies        │
│  • current_user_role() checks               │
│  • No client access to restricted tables    │
├─────────────────────────────────────────────┤
│              PostgreSQL                     │
│  • Enums, constraints, triggers             │
│  • Append-only audit log                    │
│  • Foreign keys for referential integrity   │
└─────────────────────────────────────────────┘
```
