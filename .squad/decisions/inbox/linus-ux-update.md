# UX Review Update: New Pages & Components Post-DEC-017

**Author:** Linus (Product Designer)
**Date:** 2025-07-18
**Status:** 📋 Proposed
**Scope:** 8 new/changed pages, marketing quick scan, design priorities for trust & conversion
**Baseline:** DEC-016 (score 5.7→7.6), DEC-017 (P0+P1 implemented, P2 deferred)

---

## New Page Scores

### 1. Pending Approval Page (`/pending-approval`) — **7.5/10**

**Strengths:**
- Premium dark gradient with decorative glows — consistent with auth pages
- Personalised greeting ("Thanks for signing up, {firstName}!") — warm, Nairobi-appropriate
- WhatsApp contact link is the right CTA for Kenya parents
- Clock icon + "24 hours" expectation-setting is good UX writing
- Logo centred at top — brand presence without clutter

**Issues:**
- **No auto-refresh or polling** — parent signs up, sees "under review," must manually reload to discover approval. A 30-second poll or SSE listener would dramatically improve this. Currently feels like a dead end.
- Sign-out form POSTs to `/api/auth/signout` — verify this route handler exists and returns the correct redirect.
- No visual progress indicator (even a pulsing dot or animated clock would communicate "we're actively processing").

---

### 2. Admin Approvals (`/admin/approvals`) — **7.0/10**

**Strengths:**
- "All caught up!" empty state with green checkmark — delightful, differentiates empty-queue from empty-search
- Flash messages for approve/reject with auto-dismiss — correct pattern
- Search input with focus ring on gold — on-brand
- Pending count badge in header — at-a-glance awareness

**Issues:**
- **No confirmation dialog on Reject** — rejection calls `adminClient.auth.admin.deleteUser()`, permanently destroying the account. One-tap destructive action with no undo. Must add a confirmation modal. This is a trust-critical gap.
- Flash message uses `CheckCircle2` icon for both approve AND reject — reject should use `XCircle` or `AlertTriangle` to semantically match the action.
- **Mobile: data cells have no labels** — desktop table header row is `hidden md:grid`, but on mobile the stacked cells show raw values without context labels (name/email/role are unlabelled). Need per-cell `<span className="md:hidden">` labels.
- Actions column on mobile: approve/reject buttons stack vertically but aren't full-width — feels cramped on small screens.

---

### 3. Admin Student View (`/admin/students/[id]`) — **7.5/10**

**Strengths:**
- Clean composition: ViewingAsBanner → StudentDashboardView. Reusable.
- "Generate Progress Report" CTA is prominent and immediately actionable
- Back navigation with breadcrumb-style label ("Back to Students")
- `viewOnly` flag adjusts student dashboard copy — thoughtful

**Issues:**
- **ViewingAsBanner uses gold gradient instead of coral** — the previous review (linus-student-view-ux.md) specified coral for "viewing as" because gold = reward/positive in our design system, while coral = attention/warning. Current gold gradient blurs that semantic distinction and could cause admins to not notice they're in a different context.
- Missing session timer (how long admin has been viewing as student) — specified in previous review, not implemented.
- No "Edit" dropdown menu for quick admin actions (assign coach, change status, etc.)

---

### 4. Coach Student View (`/coach/students/[id]`) — **7.5/10**

Identical structure to admin view. Same strengths and issues. Back link correctly targets `/coach` instead of `/admin/students`. Coach report page correctly scoped.

---

### 5. StudentDashboardView Component — **8.0/10**

**Strengths:**
- Best-structured component of the batch. Clear visual hierarchy: Next Session (hero) → Tracks (cards) → Streak/XP (metrics) → Activity (timeline) → Achievements (badges)
- Navy gradient hero for "Next Session" feels premium — gold accent, coach name, duration
- Horizontal snap-scroll for track cards on mobile with grid on desktop — correct responsive pattern
- All five sections have dashed-border empty states with relevant emoji — comprehensive
- `viewOnly` flag toggles copy appropriately ("Your Next Move" ↔ "Next Scheduled Session")

**Issues:**
- Activity timeline `pl-8` with absolute-positioned timeline dots may clip on screens under 320px — add `min-w-0` safety
- Achievements horizontal scroll has no count indicator or "View all" link — user doesn't know how many badges exist off-screen
- Date formatting uses `en-US` locale but target audience is Kenya — should use `en-GB` (day/month order) for consistency with rest of platform

---

### 6. ViewingAsBanner Component — **7.0/10**

**Strengths:**
- Responsive: stacks vertically on mobile, horizontal on desktop
- "Generate Progress Report" button uses navy fill — clear primary CTA
- Back arrow + pipe separator + "Viewing as" — clean information architecture

**Issues:**
- **Gold gradient conflicts with design system semantics** — see item 3 above. Should be coral.
- No session timer — previous spec called for elapsed time display
- No dropdown with admin actions (assign coach, edit profile, deactivate)
- On mobile, the "Generate Progress Report" button goes full-width but the back link and label are cramped — consider stacking with more vertical breathing room

---

### 7. ProgressReportEditor — **8.0/10**

**Strengths:**
- Excellent section-based layout with print-aware design (`print:hidden`, `print:break-inside-avoid`, `print:border-none`)
- Print header with "COGNITRON" branding and gold divider — professional output
- Coach Notes section uses coral accent + "Private" badge — unmistakable visual signal
- Star rating for engagement — intuitive, hover-scalable
- Skills as toggle pills — fast, visual
- Projects as add/remove list with keyboard support (Enter to add)
- Dual action bars (top + bottom) — usability positive for long form
- Toast notifications for save/send — non-blocking feedback

**Issues:**
- **Skill toggle tap targets too small for mobile** — `px-3 py-1.5` on a skill pill yields roughly 28px height, below Apple HIG's 44px minimum. Coach filling this on a phone in a matatu will mis-tap. Increase to `px-4 py-2`.
- "Save Draft" and "Send to Parent" are toast-only stubs — no actual persistence. Acceptable for now, but toast text ("Draft saved successfully") is misleading if nothing actually saves.
- No unsaved changes warning when navigating away — long form, easy to lose work
- The "Add a project" input has no visible label — only placeholder text, which disappears on focus. Add a `<label>` for accessibility.

---

### 8. Parent Add-Child Flow (`/parent/add-child`) — **7.5/10**

**Strengths:**
- Clean single-card form with back link — focused, distraction-free
- Kenya DPA §33 reference builds legal trust — parent knows this is compliant
- Loading spinner on submit button — correct pattern
- Success message with auto-redirect (2s) — smooth flow
- Date-of-birth max set to today — prevents future dates
- Email field clearly marked optional with explanation ("for older kids who want login access")

**Issues:**
- **First name field has User icon, last name field does NOT** — visual asymmetry. Off by one. Either add icon to both name fields or remove from first.
- `grid-cols-2` for names at all breakpoints — at 320px width each input is ~144px, tight for thumb typing. Add `sm:grid-cols-2 grid-cols-1` to stack on small phones.
- Zod validation returns only the first error — if parent gets first name AND date of birth wrong, they see one error, fix it, submit again, see the next. Show all errors at once.
- No field-level inline validation — errors only appear after submit in a banner. Add per-field error messages below inputs.
- Generated password is never communicated to parent — how does the child log in? Need to either show credentials or explain the "parent-managed access" path in the success state.
- The "child@example.com" placeholder is generic — consider "amara@gmail.com" to match the first name placeholder "Amara" for cohesion.

---

### 9. Admin Students List (`/admin/students`) — **7.5/10**

**Strengths:**
- Reusable DataTable with sort, search, pagination — scalable pattern
- ExportButton for CSV — admin utility
- StudentDetailDrawer with slide-in animation, XP highlight, "View Full Dashboard" CTA
- Filter pills for Status and Track — fast interaction

**Issues:**
- **Drawer doesn't trap keyboard focus** — a11y gap. Pressing Tab cycles to background content behind the overlay. Need focus trap.
- Filter buttons show lowercase text ("active", "trial") — capitalize first letter for label consistency.
- No loading state when DataTable fetches filtered data (currently client-side so fast, but will matter when real API connected).
- Drawer "Send Notification" button is a stub — no click handler, no disabled state. Either wire up or remove to avoid dead-click confusion.

---

## Marketing Page Quick Scan

| Page | Status | Notes |
|------|--------|-------|
| **Homepage** | ✅ No regression | Hero, trust bar, tracks, how-it-works, testimonials all intact. Dual CTA (Book + WhatsApp) working. |
| **About** | ✅ No regression | Founder story, coach bio, values. Layout clean. |
| **Pricing** | ✅ No regression | KES-first (fixed per DEC-005). Anchor pricing card prominent. FAQ functional. |
| **Academy** | ✅ No regression | Three track cards with outcomes. Sub-pages (coding/ai/chess) linked. |
| **Marketing Layout** | ✅ Clean | Navbar + Footer + WhatsApp fab + Analytics. Route group separation (DEC-018) working — no bleed between marketing and dashboard. |

**No regressions detected.** Marketing pages are stable.

---

## Top 5 Design Priorities

### 1. Add Reject Confirmation Dialog on Approvals — **Trust-Critical**

**Rationale:** Rejecting a user permanently deletes their auth account with zero confirmation. A single mis-tap destroys data. For an admin tool managing real families' signups, this is unacceptable. Add a modal: "Reject {name}? This will permanently delete their account. This cannot be undone."

**Impact:** Trust (admin confidence), legal (data deletion is irreversible), operations (prevent accidental data loss).

---

### 2. Auto-Refresh on Pending Approval Page — **Conversion-Critical**

**Rationale:** A Nairobi parent signs up on their phone, sees "under review," and... nothing. No way to know when they're approved without manually reloading. Many will assume the site is broken and leave. Add a 30-second polling interval or SSE listener that auto-redirects to `/dashboard` on approval. Show a subtle pulse animation on the clock icon to communicate liveness.

**Impact:** Directly affects signup→activation conversion rate. Every parent who bounces from this page is a lost lead.

---

### 3. ViewingAsBanner: Gold → Coral — **Design System Integrity**

**Rationale:** The previous review (linus-student-view-ux.md) specified coral (`bg-coral`) for the "viewing as" banner because gold = reward/positive and coral = attention/warning in our colour system. The implemented version uses a gold gradient, breaking semantic consistency. An admin who doesn't notice they're "viewing as" a student could make incorrect assumptions about data they're seeing.

**Impact:** Prevents admin context confusion. Maintains colour semantics across the platform.

---

### 4. Fix Name Field Icon Asymmetry in Add-Child — **Polish**

**Rationale:** First name has a `<User>` icon inside the input; last name does not. This off-by-one visual inconsistency undermines the premium positioning. Parents notice these details — especially on a form about their child. Either add the icon to both fields or remove it from the first. Also stack the name fields on screens under `sm` breakpoint to prevent cramped inputs on small phones.

**Impact:** Perceived quality on the most emotionally important form (adding your child to the platform).

---

### 5. Enlarge Skill Toggle Tap Targets in ProgressReportEditor — **Mobile Usability**

**Rationale:** Coaches fill out progress reports on mobile between sessions. The skill toggle pills at `px-3 py-1.5` produce ~28px touch targets — below the 44px Apple HIG minimum. Increase to `px-4 py-2.5` with `min-h-[44px]`. Also applies to the "Add a project" and "Add an achievement" inputs.

**Impact:** Coach productivity on the tool they'll use most frequently. Bad tap targets = frustrated coaches = delayed reports to parents.

---

## P2 Items Update

| P2 Item | Current Status | Recommendation | Rationale |
|---------|---------------|----------------|-----------|
| **Age-tier theming** | Needs Linus input | **→ Promote to P1** | Age tiers exist in data model (5-8, 9-12, 13-17) but UI is identical for all. A 6-year-old and 16-year-old see the same dashboard. Theming (colour palette, illustration style, language register) directly affects perceived value and child engagement. I'll provide a spec. |
| **SVG progress path** | Needs Linus input | **Keep P2** | Current track cards with progress bars work well. SVG paths are polish, not structural. Revisit after launch. |
| **Google login** | Needs Danny approval | **Keep P2** | Not blocking any flow. Email+password works. Nice-to-have. |
| **Responsive testing** | Needs Frank | **→ Promote to P1** | 8 new pages added since last responsive test pass. We claim "mobile-first" but haven't validated the new pages on real devices. The add-child `grid-cols-2` and approval table mobile issues prove this needs attention. |
| **Dark mode** | Deferred | **Keep P2** | Dashboard chrome is already dark. Low-priority aesthetic preference. |
| **Onboarding tour** | Deferred | **Keep P2** | Valuable but not pre-launch critical. Parents will have WhatsApp support. |
| **Keyboard shortcuts** | Deferred | **Keep P2** | Desktop-only enhancement. Our users are on phones. |
| **Skeleton loading** | Deferred | **→ Promote to P1** | Multiple new data-fetching pages (approvals, student list, student view) currently show nothing during load. Skeleton screens maintain perceived performance and prevent layout shift. |

---

## Score Summary

| Page/Component | Score | Previous | Delta |
|----------------|-------|----------|-------|
| Pending Approval | 7.5 | new | — |
| Admin Approvals | 7.0 | new | — |
| Admin Student View | 7.5 | new | — |
| Coach Student View | 7.5 | new | — |
| StudentDashboardView | 8.0 | new | — |
| ViewingAsBanner | 7.0 | new | — |
| ProgressReportEditor | 8.0 | new | — |
| Parent Add-Child | 7.5 | new | — |
| Admin Students List | 7.5 | new | — |
| **New page average** | **7.5** | — | — |
| **Overall platform** (incl DEC-016) | **7.6** | 7.6 | **0.0** |

The new pages maintain the 7.6 baseline established in DEC-016 — no regression, slight upward pull from StudentDashboardView and ProgressReportEditor (both 8.0). Addressing the Top 5 priorities above would push the overall to **8.0+**.

---

## Next Steps

1. I will provide an **age-tier theming spec** (colours, typography scale, illustration direction) for the three tiers
2. Top 5 items should be triaged by Rusty for effort estimation
3. Frank should run responsive testing on the 8 new pages (especially add-child and approvals on 320px–375px viewports)
4. Tess should review the pending-approval page copy — is "24 hours" the right expectation for Nairobi parents?
