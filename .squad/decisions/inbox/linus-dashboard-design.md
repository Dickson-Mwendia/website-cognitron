# Cognitron — Student Learning Dashboard Design

**Author:** Linus (Product Designer)
**Date:** 2025
**Status:** Proposal — Ready for review

---

## 0. Design Philosophy

Cognitron's dashboard must thread a needle: **luxury education brand** that kids ages 5–17 actually *want* to open. Think "Duolingo's dopamine engine wearing a Brookhouse blazer."

Three governing principles:

1. **Earn the parent's trust** — Clean, data-rich, premium. Every screen should feel like KES 2M+/year well spent.
2. **Win the child's attention** — Gamified, celebratory, alive with motion. Progress should feel as rewarding as levelling up in a game.
3. **Respect the context** — Nairobi device mix skews tablet + phone. Data plans matter. Offline-first thinking. Content must load fast on 4G.

---

## 1. Information Architecture

### 1.1 Page Hierarchy

```
/dashboard                          ← Student home (post-login default)
  /dashboard/track/[coding|ai|chess] ← Track detail / curriculum map
  /dashboard/lesson/[id]            ← Lesson viewer / join session
  /dashboard/practice               ← Practice exercises & challenges
  /dashboard/achievements           ← Badges, XP history, streak calendar
  /dashboard/profile                ← Student profile, avatar, settings
  /dashboard/schedule               ← Full calendar view

/parent                             ← Parent home (post-login, role-based)
  /parent/child/[id]                ← Per-child detail view
  /parent/schedule                  ← Family calendar across all children
  /parent/messages                  ← Coach communication
  /parent/billing                   ← Invoices, payment history, plan
  /parent/reports                   ← Downloadable progress reports
```

### 1.2 Navigation Structure

**Student Nav (sidebar on desktop, bottom bar on mobile/tablet):**

| Icon | Label | Route | Notes |
|------|-------|-------|-------|
| 🏠 | Home | `/dashboard` | Always visible |
| 📚 | My Tracks | Expandable | Sub-items: Coding, AI, Chess (only enrolled tracks) |
| ⚔️ | Practice | `/dashboard/practice` | Quick-access to exercises |
| 🏆 | Achievements | `/dashboard/achievements` | Badge count indicator |
| 📅 | Schedule | `/dashboard/schedule` | Next-session countdown |
| 👤 | Profile | `/dashboard/profile` | Avatar, settings |

**Parent Nav (sidebar on desktop, hamburger on mobile):**

| Icon | Label | Route |
|------|-------|-------|
| 📊 | Overview | `/parent` |
| 👧 | Children | Expandable per child |
| 📅 | Schedule | `/parent/schedule` |
| 💬 | Messages | `/parent/messages` |
| 💳 | Billing | `/parent/billing` |
| 📄 | Reports | `/parent/reports` |

### 1.3 Core User Flows

**Flow 1 — Student opens app:**
`Login → Dashboard (sees next lesson, streak, XP) → Tap "Join Lesson" → Video/content room`

**Flow 2 — Student practices between lessons:**
`Dashboard → Practice → Select track → Pick challenge → Complete → Earn XP → See badge progress`

**Flow 3 — Parent checks progress:**
`Login → Parent Overview (all children summary) → Tap child → See track progress, coach notes, upcoming sessions`

**Flow 4 — Parent pays:**
`Parent Overview → Billing → View invoice → Pay via M-Pesa/card → Receipt confirmation`

**Flow 5 — Student views track curriculum:**
`Dashboard → My Tracks → Coding → See skill tree → Tap lesson node → View details/start practice`

---

## 2. Wireframe Descriptions

### 2.1 Student Dashboard (Primary View — `/dashboard`)

The dashboard is a single-scroll page with a **fixed sidebar** (desktop) or **bottom nav** (tablet/mobile). The content area uses a **card-based layout** within a responsive grid.

#### Header Bar (fixed top)
- **Left:** Cognitron shield logo (icon-only variant, 32px)
- **Center:** Greeting — `"Good morning, Amara! 🔥 5-day streak"` (Playfair Display, gold streak icon)
- **Right:** Notification bell (gold dot for unread) + avatar circle (student's chosen character)
- Background: Navy (`#0c1b33`), text white, gold accents

#### Section A — "Your Next Move" (Hero Card)
- **Full-width card**, navy background with subtle diagonal gold shimmer animation
- **Left column (60%):**
  - "Up Next" label (gold, DM Sans 12px uppercase tracking-wider)
  - Lesson title: e.g. "Python Lists & Loops" (Playfair Display 24px, white)
  - Coach name + avatar thumbnail: "with Coach David"
  - Date/time: "Tomorrow, 4:00 PM" with a live countdown badge if within 1 hour
  - **Primary CTA:** "Join Lesson →" (gold pill button, 48px tap target)
  - **Secondary CTA:** "View Prep Notes" (ghost button, white border)
- **Right column (40%):**
  - Stylized illustration of the track (e.g., a code editor for coding, neural network for AI, chess board for chess) — rendered in navy-light with gold line art, not photographic
  - On tablet: illustration becomes a subtle background watermark

#### Section B — "Your Tracks" (Enrolled Track Cards)
- **Horizontal scroll** on mobile, **2–3 column grid** on desktop
- Each track card:
  - **Track icon** (custom SVG, not emoji) in a 48px circle with track accent color
  - **Track name:** "Coding & Apps" (Playfair Display 18px)
  - **Current level badge:** e.g. "⚡ Creator" with the level emoji
  - **Progress ring:** Circular SVG progress indicator (not a bar!) showing % completion of current level
    - Ring uses gold fill on navy stroke
    - Center of ring shows percentage in large bold text
    - Animated on load: ring fills clockwise with a spring easing
  - **XP this week:** "+85 XP" with a small upward arrow icon (green/teal)
  - **Tap → navigates** to `/dashboard/track/[track]`
- Track card colors:
  - Coding: navy card with teal (`#2a9d8f`) accent ring
  - AI: navy card with coral (`#e8614d`) accent ring
  - Chess: navy card with gold (`#d4a843`) accent ring

#### Section C — "Streak & XP" (Motivation Strip)
- **Horizontal strip** spanning full width, off-white background
- **Left: Streak calendar** — 7-day row of circles (Mon–Sun). Filled gold = practiced that day. Today pulses gently. Empty = subtle dashed border.
  - Below the row: "🔥 5 days — keep it going!" (DM Sans, gold-dark)
- **Center: XP bar** — A horizontal bar showing XP progress toward next level
  - Current level icon on left, next level icon on right
  - Fill uses a gold gradient with subtle shimmer animation
  - Text: "2,340 / 3,000 XP to Level 12" (DM Sans 14px)
- **Right: Daily challenge** — Small card: "Daily Challenge: Solve 3 Python puzzles → +50 XP"
  - CTA: "Start →" pill button

#### Section D — "Recent Activity" (Timeline)
- Vertical timeline with gold connector line on the left
- Each entry:
  - Timestamp: "2 hours ago" (slate, 12px)
  - Activity icon (small, 20px, in a circle)
  - Description: "Completed Lesson 4.2: CSS Flexbox" or "Earned badge: First Algorithm"
  - XP gained: "+25 XP" (gold, right-aligned)
- Maximum 5 entries shown, with "View all activity →" link at bottom
- Entries animate in with a stagger (0.1s between each)

#### Section E — "Achievements Spotlight" (Badge Carousel)
- **Horizontal scrolling carousel** of badge cards
- Each badge card (120×140px):
  - Badge illustration (64px, custom SVG — see §6 for style)
  - Badge name: "Bug Squasher" (DM Sans 12px bold)
  - Earned date or "3/5 complete" progress bar if in-progress
  - **Earned badges:** Full color, subtle gold shadow
  - **Locked badges:** Greyscale silhouette, dashed border, "?" overlay
- "View all 24 badges →" link

#### Section F — "Quick Actions" (Floating Action Row)
- **On mobile:** Fixed bottom sheet (above the bottom nav) with 3 icon buttons
- **On desktop:** Horizontal row of pill buttons below the fold
- Actions:
  - "🎯 Practice Now" → `/dashboard/practice`
  - "📅 My Schedule" → `/dashboard/schedule`
  - "💬 Ask Coach" → opens chat/message panel

---

### 2.2 Track Detail View (`/dashboard/track/[track]`)

This is the core curriculum experience — showing where the student is, where they've been, and where they're going.

#### Track Header
- Full-width banner with track accent color gradient (e.g., teal→navy for coding)
- Track icon (large, 72px) + Track name (Playfair Display 32px, white)
- Current level: "⚡ Creator — Level 3" with the level progress ring (same as dashboard, but larger)
- Overall track progress: "68% complete" (DM Sans)
- "Continue Learning →" CTA button

#### The Skill Tree (Core Innovation)

**Not a boring list. A visual, vertical "map" that feels like a game world.**

- **Layout:** Vertical scrolling path rendered as a winding road/river from bottom (start) to top (mastery)
- **Visual metaphor:** Think of the Candy Crush level map or Duolingo's path — nodes connected by a golden path
- **Each node = one lesson/unit:**
  - **Completed nodes:** Filled circle, gold border, checkmark, full color icon
  - **Current node:** Larger, pulsing glow animation, "YOU ARE HERE" label
  - **Upcoming nodes:** Semi-transparent, dashed border, locked icon
  - **Milestone nodes** (end of each level): Larger hexagonal node (echoing the Cognitron shield), with the level badge emoji and level name
- **The path between nodes:**
  - Completed sections: Solid gold line, 3px
  - Current section: Animated dashed gold line (moving dots animation)
  - Upcoming sections: Thin, dashed, slate-colored line
- **Side branches:** Optional practice exercises branch off the main path as smaller nodes with a puzzle-piece icon
- **Milestone gates:** Between levels (Explorer → Builder → Creator → Architect), a decorative "gate" graphic appears on the path with the level-up badge. Completed gates have a gold "unlocked" state.

**Technical implementation note:** Use SVG for the path rendering with CSS animations. The tree scrolls vertically. On tablet/mobile it's a single-column path. On desktop it can meander left-right across the wider viewport. Each node is a clickable `<Link>` element.

#### Lesson Detail Popover (tap a node)
- Slide-up panel (mobile) or side panel (desktop)
- Lesson title, description, duration estimate
- Skills covered (tag pills)
- "Start Lesson" or "Review Notes" CTA
- If completed: Score/XP earned, date completed, "Redo" option

#### Track Sidebar (desktop only)
- Coach info card (photo, name, bio, "Message" button)
- Track stats: total XP earned, lessons completed, time spent
- Resources: downloadable PDFs, useful links
- "Practice in this track" CTA

---

### 2.3 Parent Dashboard (`/parent`)

Clean, data-rich, and reassuring. No gamification clutter — parents want clarity, not confetti.

#### Header
- Cognitron logo + "Parent Dashboard" label
- "Good afternoon, Mrs. Wanjiku" greeting
- Notification bell + profile dropdown

#### Section A — Children Overview Cards
- One card per child (if multiple children enrolled)
- Each card:
  - Child's avatar + name
  - Enrolled tracks (icon badges: 💻 🤖 ♟️)
  - **Sparkline chart** showing XP earned over the last 4 weeks (mini line chart, gold on navy)
  - Key stats: "12 lessons completed · 🔥 5-day streak · Level 8"
  - "View Details →" link to `/parent/child/[id]`

#### Section B — Upcoming Sessions
- **Week-view calendar strip** showing next 7 days
- Each session card:
  - Date, time, duration
  - Track icon + lesson name
  - Coach name + photo thumbnail
  - Delivery method badge: "🏠 Home Visit" or "💻 Online"
  - "Reschedule" / "Cancel" links (open modal)

#### Section C — Coach Notes & Feedback
- Reverse-chronological feed of coach updates
- Each note:
  - Coach avatar + name
  - Date
  - Note text (Markdown rendered): e.g., "Amara showed excellent problem decomposition today. She independently debugged a loop error. Recommend adding 15 minutes of Python practice between sessions."
  - Attachments: links to student's work/code if applicable
  - "Reply" button

#### Section D — Progress Reports
- Per-child expandable section
- Per-track:
  - Current level + progress percentage
  - Skills radar chart (5-axis: e.g., for coding: Logic, Syntax, Debugging, Design, Presentation)
  - Comparison: "Your child is in the top 20% of their cohort for debugging skills"
  - Milestone timeline: visual of levels completed with dates
- "Download Term Report (PDF)" button — generates a branded PDF with the Cognitron shield watermark

#### Section E — Quick Actions
- "📅 Book extra session" → scheduling flow
- "💬 Message coach" → messaging
- "💳 View billing" → `/parent/billing`
- "📞 Call us" → WhatsApp link (existing pattern from marketing site)

---

### 2.4 Profile & Achievements View (`/dashboard/achievements`)

This is the trophy room — where kids show off and feel proud.

#### Profile Header
- Large avatar (128px) — customizable character/mascot or uploaded photo
- Student name (Playfair Display 28px)
- Title/rank: "⚡ Creator · Level 11 · 4,250 XP" (DM Sans)
- Member since: "Joined March 2025"
- Edit profile link (pencil icon)

#### XP & Level Progress (prominent)
- Large circular progress ring (200px diameter)
- Current level number in the center (large, bold, gold)
- XP bar below: "4,250 / 5,000 XP to Level 12"
- Level history: small thumbnails of past level badges in a horizontal row

#### Badge Collection Grid
- **Grid layout:** 3 columns on mobile, 4 on tablet, 6 on desktop
- Each badge (responsive card):
  - **Earned:** Full-color illustration, gold border, name, earned date
  - **In-progress:** Partial color, progress bar underneath ("3/5 challenges complete")
  - **Locked:** Greyscale silhouette, "?" center, name hidden ("Complete 10 AI lessons to unlock")
  - Tap opens detail modal with badge description, requirements, and earn date
- **Categories:**
  - 🏅 Track Mastery (per-track level completion)
  - 🔥 Streak (3-day, 7-day, 14-day, 30-day, 100-day)
  - 🎯 Practice (complete N practice sessions)
  - ⚡ Speed (finish lesson in record time)
  - 🤝 Mentor (help a peer)
  - 🏆 Competition (tournament results — chess)
  - 🌟 Special (seasonal events, first login, profile complete, etc.)

#### Streak Calendar
- Full month-view calendar grid
- Each day is a small square:
  - Gold filled = practiced
  - Empty with dashed border = no activity
  - Today = pulsing gold outline
  - Future = greyed out
- Below: streak stats — "Current: 🔥 5 days · Longest: 🔥 23 days · Total practice days: 47"

#### Leaderboard (Cohort-only, Optional Toggle)
- "My Cohort" leaderboard — only shows students in the same small group (max 4)
- Ranked by XP earned this week
- Each entry: rank, avatar, name, XP, streak
- Anonymized if parent opts out: "Student A, Student B"
- Toggle: "Show my ranking" — opt-in, not default for younger students

---

## 3. Component Inventory

### 3.1 Navigation & Layout

| Component | Description | Variants |
|-----------|-------------|----------|
| `DashboardShell` | Layout wrapper with sidebar + top bar + content area | `student`, `parent` |
| `DashboardSidebar` | Collapsible sidebar nav (desktop) | `student`, `parent` |
| `BottomNav` | Fixed bottom navigation bar (mobile/tablet) | `student` only |
| `TopBar` | Greeting, notifications, avatar | — |
| `NotificationBell` | Bell icon with unread count badge | — |
| `AvatarCircle` | Student/coach/parent avatar | sizes: `sm`, `md`, `lg`, `xl` |

### 3.2 Track & Progress

| Component | Description | Variants |
|-----------|-------------|----------|
| `TrackCard` | Enrolled track summary with progress ring | `coding`, `ai`, `chess` |
| `ProgressRing` | Circular SVG progress indicator | sizes, colors per track |
| `XPBar` | Horizontal XP progress bar with shimmer | — |
| `SkillTree` | Vertical map-style curriculum visualization | per track |
| `SkillTreeNode` | Individual lesson node in the tree | `completed`, `current`, `locked`, `milestone` |
| `SkillTreePath` | SVG path connector between nodes | `completed`, `active`, `locked` |
| `MilestoneGate` | Hexagonal gate graphic between levels | `unlocked`, `locked` |
| `LevelBadge` | Badge showing current level with emoji | per track, per level |
| `RadarChart` | 5-axis skills chart for parent reports | — |
| `Sparkline` | Mini line chart for parent overview | — |

### 3.3 Gamification

| Component | Description | Variants |
|-----------|-------------|----------|
| `StreakCalendar` | 7-day row or full-month grid of streak indicators | `row`, `grid` |
| `StreakDay` | Individual day circle in streak calendar | `active`, `inactive`, `today`, `future` |
| `BadgeCard` | Achievement badge display card | `earned`, `in-progress`, `locked` |
| `BadgeModal` | Detail overlay for badge info | — |
| `XPGain` | Animated "+25 XP" floating text on actions | — |
| `LevelUpCelebration` | Full-screen confetti + level-up modal | — |
| `DailyChallenge` | Small card prompting today's challenge | — |
| `LeaderboardTable` | Cohort ranking table | — |
| `CohortRankRow` | Individual row in leaderboard | `self`, `other`, `anonymous` |

### 3.4 Scheduling & Sessions

| Component | Description | Variants |
|-----------|-------------|----------|
| `NextSessionCard` | Hero card for upcoming lesson | `imminent` (within 1hr), `upcoming` |
| `SessionCountdown` | Live countdown timer badge | — |
| `WeekStrip` | Horizontal 7-day calendar strip | — |
| `SessionSlot` | Calendar entry for a session | `home-visit`, `online` |
| `ScheduleCalendar` | Full monthly calendar view | — |
| `RescheduleModal` | Modal for rescheduling sessions | — |

### 3.5 Communication & Content

| Component | Description | Variants |
|-----------|-------------|----------|
| `CoachNoteCard` | Coach feedback entry | — |
| `CoachInfoCard` | Coach profile sidebar card | — |
| `ActivityTimeline` | Vertical timeline of recent activity | — |
| `ActivityEntry` | Single timeline entry | per activity type |
| `LessonPopover` | Slide-up or side panel for lesson details | — |
| `ResourceLink` | Downloadable resource row | — |

### 3.6 Parent-Specific

| Component | Description | Variants |
|-----------|-------------|----------|
| `ChildOverviewCard` | Summary card per child | — |
| `ProgressReport` | Downloadable term report section | — |
| `BillingTable` | Invoice/payment history table | — |
| `PaymentMethodCard` | Saved payment method display | `mpesa`, `card` |
| `MessageThread` | Coach conversation thread | — |
| `MessageComposer` | Reply input with attachments | — |

### 3.7 Shared / Atomic

| Component | Description | Variants |
|-----------|-------------|----------|
| `PillButton` | Rounded CTA button | `primary` (gold), `secondary` (ghost), `danger` |
| `GhostButton` | Transparent bordered button | — |
| `TagPill` | Small tag for skills, categories | various colors |
| `Tooltip` | Contextual hover/tap tooltip | — |
| `EmptyState` | Illustrated placeholder when no data | per context |
| `LoadingSkeleton` | Shimmer loading placeholder | matches each card type |
| `ConfettiOverlay` | Full-viewport confetti burst animation | — |
| `Toast` | Notification toast pop-up | `success`, `info`, `warning` |

---

## 4. Interaction Design

### 4.1 Page Transitions

| Transition | Animation | Duration | Easing |
|------------|-----------|----------|--------|
| Dashboard → Track View | Content slides left, track view slides in from right | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Track View → Lesson Popover | Panel slides up from bottom (mobile) or fades in from right (desktop) | 250ms | `ease-out` |
| Tab switching (within a view) | Crossfade with slight upward shift | 200ms | `ease-out` |
| Return (back navigation) | Reverse of the enter animation | 250ms | `ease-in-out` |

### 4.2 Micro-interactions

| Element | Trigger | Animation | Purpose |
|---------|---------|-----------|---------|
| **Progress Ring** | Page load / data update | Ring fills clockwise from 0 to current %, spring bounce at end | Makes progress feel dynamic and alive |
| **XP Bar** | XP gained | Bar width animates to new value, gold shimmer pulse travels left→right | Celebrates every bit of progress |
| **Streak Day** | Day completed | Circle scales up to 120% then settles at 100%, gold pulse | Satisfying "stamp" feeling |
| **Badge Earned** | Achievement unlocked | Badge flies to center screen, gold particle burst, scale-up + rotate, then settles into grid | Major celebration moment |
| **Level Up** | New level reached | Screen darkens, confetti falls from top, level badge scales up with glow, congratulatory message types out character by character | Peak emotional moment — should feel epic |
| **Skill Tree Node** | Lesson completed | Node fills from grey to full color, checkmark draws on, path extends to next node with flowing gold particles | Tangible forward movement |
| **Next Session Card** | Hover (desktop) | Subtle 2px lift (translateY), shadow deepens | Premium interactive feel |
| **Track Card** | Hover / touch | Card lifts 4px, shadow expands, progress ring animates a subtle pulse | Inviting interaction |
| **XP Gain** | Action completed | "+25 XP" text floats upward from the action point and fades, slight scale-up | Instant gratification feedback |
| **Notification Bell** | New notification | Bell rocks 15° left-right 2x, gold dot pulses | Draws attention without being aggressive |
| **Daily Challenge** | Available | Gentle breathing animation (scale 1.0→1.02→1.0 loop) | Subtle "look at me" without being annoying |

### 4.3 Loading States

- **Skeleton screens** everywhere (not spinners). Match the exact layout of the real content.
- Skeleton uses `bg-navy/5` with a left-to-right shimmer animation (`background-position` animation on a gradient)
- Progress rings show a neutral grey ring that fills with color once data arrives
- Skill tree nodes appear as grey dots, then animate to their real state

### 4.4 Empty States

- **No enrolled tracks:** Friendly illustration of the Cognitron mascot holding a map. "Your adventure starts here! Ask your parent to enroll you in a track." CTA: "Explore Tracks →"
- **No upcoming sessions:** Calendar illustration with a gold star. "No lessons this week. How about some practice?" CTA: "Practice Now →"
- **No achievements yet:** Trophy case with dashed outlines. "Your trophy case is waiting! Complete your first lesson to earn your first badge."

### 4.5 Celebration Sequences

**Level Up sequence** (most elaborate):
1. Screen overlay fades in (navy at 70% opacity)
2. Old level badge rises from bottom, pauses center
3. Transformation animation: badge morphs/shimmers and becomes new level badge
4. Gold confetti burst from center (100 particles, physics-based falling)
5. "LEVEL UP!" text in Playfair Display, gold, scales up with a bounce
6. New level name types out: "You are now a ⚡ Creator!"
7. XP bar and stats update behind the overlay
8. "Continue →" button fades in after 2 seconds
9. Overlay dismisses, dashboard updates reflect new level

**Badge Earned sequence** (medium):
1. Badge icon flies from the triggering action to the achievements section of the sidebar
2. Once it "lands", a small gold starburst appears
3. Toast notification: "🏅 New Badge: Bug Squasher! +100 XP bonus"
4. Toast auto-dismisses after 4 seconds

**Streak milestone** (light):
1. Streak counter updates with a flip animation (like an airport departure board)
2. If milestone (7, 14, 30, 100): small confetti burst + "🔥 7-day streak!" toast

---

## 5. Responsive Strategy

### 5.1 Breakpoints

| Breakpoint | Width | Primary Device | Layout |
|------------|-------|----------------|--------|
| **Mobile** | < 640px | Phone | Single column, bottom nav, stacked cards |
| **Tablet** | 640–1024px | iPad (primary kid device) | Two columns, bottom nav, side-by-side cards |
| **Desktop** | > 1024px | Laptop/monitor (parent primary) | Sidebar nav, 3-column grid, popovers |

### 5.2 Tablet-First Design (Critical)

Tablets (especially iPads) are the primary device for students in this market. Design decisions prioritize this form factor:

- **Touch targets:** Minimum 48px for all interactive elements. Skill tree nodes: minimum 56px.
- **Navigation:** Bottom bar navigation (5 items) — thumb-reachable for kids
- **Cards:** Generous padding (24px), large text (min 16px body), no hover-only interactions
- **Skill tree:** Single-column winding path, nodes are 64px circles, generous spacing
- **Gestures:** Swipe between track cards. Pull-to-refresh on main dashboard. Horizontal scroll for badge carousel.
- **Orientation:** Support both portrait (primary) and landscape. Skill tree benefits from portrait; schedule calendar benefits from landscape. No forced orientation.

### 5.3 Layout Grid

| Breakpoint | Grid | Sidebar | Content |
|------------|------|---------|---------|
| Mobile | 4 columns | None (bottom nav) | Full width |
| Tablet | 8 columns | None (bottom nav) | Full width |
| Desktop | 12 columns | 3 columns (collapsible) | 9 columns |

### 5.4 Component Behavior by Breakpoint

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Nav | Bottom bar (5 icons) | Bottom bar (5 icons) | Left sidebar (collapsible) |
| Next Session Card | Full-width stack | Full-width, 60/40 split | Full-width, 60/40 split |
| Track Cards | Horizontal scroll | 2-column grid | 3-column grid |
| Streak Strip | Stacked (calendar, XP, challenge) | Horizontal (3 across) | Horizontal (3 across) |
| Activity Timeline | Full-width | Full-width, 2/3 column | Sidebar widget |
| Skill Tree | Single column path | Single column path (wider) | Meandering path (wider) |
| Badge Grid | 3 columns | 4 columns | 6 columns |
| Parent Overview | Stacked child cards | Side-by-side child cards | 3-column dashboard |

### 5.5 Performance / Data Considerations

Given the Nairobi context (4G networks, data cost awareness):

- **Image strategy:** SVG for all icons, badges, and illustrations. No large PNGs. Badge illustrations are inline SVG, cached aggressively.
- **Font loading:** Playfair Display (headings only, weights 600+700) + DM Sans (400+600). Total: ~80KB. Preloaded, `font-display: swap`.
- **Code splitting:** Each dashboard section is a lazy-loaded component. Track views are route-level code-split.
- **Data fetching:** Use React Server Components for initial data. Client components only for interactive elements (streak calendar, progress rings, skill tree). ISR for coach notes.
- **Offline support:** Service worker caches the dashboard shell, student profile, and last-fetched data. Offline mode shows cached data with a subtle "Offline — data may not be current" banner. Practice exercises that are text/SVG-based should work offline.
- **Bundle target:** Dashboard JS < 150KB gzipped. Total page weight (including fonts, SVGs) < 500KB for initial load.

---

## 6. Design Recommendations

### 6.1 Extended Color Palette for Gamification

Building on the existing brand palette and the additions from the brand identity doc (Coral `#e8614d`, Teal `#2a9d8f`):

| Token | Hex | Usage |
|-------|-----|-------|
| **XP Gold** | `#d4a843` (existing gold) | XP bars, XP gain text, primary gamification color |
| **XP Gold Shimmer** | `linear-gradient(90deg, #d4a843, #e8c96e, #d4a843)` | Animated shimmer on XP bars |
| **Streak Fire** | `#e8614d` (coral) | Streak fire icons, streak milestones |
| **Streak Fire Glow** | `#e8614d` at 20% opacity | Glow behind streak indicators |
| **Level Teal** | `#2a9d8f` (teal) | Level-up accents, coding track progress |
| **Success Green** | `#22c55e` | Lesson complete checkmarks, correct answers |
| **Practice Purple** | `#8b5cf6` | Practice mode accents, challenge badges |
| **Badge Bronze** | `#cd7f32` | Tier 1 badges |
| **Badge Silver** | `#c0c0c0` | Tier 2 badges |
| **Badge Gold** | `#ffd700` | Tier 3 badges |
| **Badge Platinum** | `#e5e4e2` with shimmer | Tier 4 (rare) badges |
| **Locked Grey** | `#9ca3af` | Locked badges, upcoming content |

#### Track Accent Colors
Each track has a designated accent that appears in progress rings, skill tree paths, and track headers:

| Track | Accent | Hex | Rationale |
|-------|--------|-----|-----------|
| Coding | Teal | `#2a9d8f` | Tech, terminals, "matrix green" energy |
| AI | Coral | `#e8614d` | Neural warmth, innovation, energy |
| Chess | Gold | `#d4a843` | Strategy, trophies, intellectual prestige |

These accents always pair with the navy primary — never used as standalone backgrounds.

### 6.2 Iconography Style

- **Icon library:** Lucide React (already in use across the marketing site)
- **Style:** 1.5px stroke weight, rounded line caps, 24px default size
- **Custom icons needed** (not in Lucide, need SVG creation):
  - Track icons: Code bracket, Neural network, Chess knight (matching the Cognition Shield logo motifs)
  - Level badges: Explorer (🌱 seedling), Builder (🔨 hammer), Creator (⚡ bolt), Architect (🏆 trophy)
  - Gamification: XP star, streak flame, challenge target, practice sword
- **Icon treatment in dark contexts (navy bg):** White stroke, gold fill on interactive/active state
- **Icon treatment in light contexts (off-white bg):** Navy stroke, gold fill on active state

### 6.3 Illustration Style

- **Overall approach:** Flat vector illustrations with a limited palette (navy, gold, teal, coral, off-white). No gradients. Bold, geometric shapes with rounded corners.
- **Character style:** Semi-abstract "kid" characters — round heads, simple features, expressive poses. Not overly cartoonish (this is a premium brand), but warm and approachable. Think Headspace meets Notion illustrations.
- **Scene compositions:** Characters interacting with oversized props that represent each track:
  - Coding: Kid typing on a giant floating code editor, code symbols floating around
  - AI: Kid looking at a friendly robot helper, neural network connections in the background
  - Chess: Kid pondering over a giant chess piece, strategic arrows and patterns
- **Empty states:** Simple character + relevant prop (e.g., kid with magnifying glass for "no results", kid with treasure map for "start your journey")
- **Mascot consideration:** A small, friendly mascot that appears in the skill tree (guides the path), empty states, and celebration moments. Recommendation: a stylized owl wearing a tiny Cognitron shield badge on its chest — owls represent wisdom, the shield ties back to the brand, and it's appealing across the full 5–17 age range. The owl should have simple geometric features (circles, triangles) and appear in navy+gold.

### 6.4 Age-Adaptive Design Recommendations

Rather than building three separate interfaces, use a **single responsive design with adaptive density and complexity:**

| Dimension | Ages 5–8 | Ages 9–12 | Ages 13–17 |
|-----------|----------|-----------|------------|
| **Font sizes** | Body 18px, headings 28px+ | Body 16px, headings 24px+ | Body 14px, headings 22px+ |
| **Touch targets** | 56px minimum | 48px minimum | 44px minimum |
| **Skill tree nodes** | 72px, very spaced | 64px, moderate spacing | 56px, compact |
| **Iconography** | Large, filled icons | Standard Lucide style | Standard Lucide style |
| **Navigation items** | 3 items (Home, My Lessons, Prizes) | 5 items (full nav) | 5 items + keyboard shortcuts |
| **Gamification density** | Mascot appears frequently, stickers, big celebrations | Badges prominent, leaderboard visible, challenges | Subtle XP, portfolio focus, project milestones |
| **Dashboard labels** | "My Lessons", "My Prizes", "Practice Games" | "My Tracks", "Achievements", "Practice" | "Tracks", "Portfolio", "Practice Lab" |
| **Progress viz** | Star collection (fill 5 stars per lesson) | Progress rings + XP | Progress percentage + project completion |
| **Celebration intensity** | Every action gets feedback, big confetti, mascot dances | Level-ups and badges get celebration | Subtle toast notifications, no confetti |
| **Content density** | 2–3 cards per screen | 4–6 cards per screen | 6–8 cards per screen |
| **Color intensity** | Slightly more saturated accents | Standard palette | Standard palette |

**Implementation:** The `age_group` (derived from the student's birthdate in their profile) is used as a prop/context value. Components read this context and adjust their rendering. No separate routes — same pages, adaptive components.

```tsx
// Conceptual context usage
const { ageGroup } = useStudentProfile(); // 'young' | 'middle' | 'teen'
<SkillTree ageGroup={ageGroup} nodes={trackNodes} />
```

---

## 7. Inspiration References

### 7.1 Gamification & Motivation

| Platform | What to Learn | What to Adapt |
|----------|---------------|---------------|
| **Duolingo** | The streak mechanic is best-in-class. The daily reminder, the streak freeze, the milestone celebrations — it's addictive without being predatory. Their skill tree (now "path") is the gold standard for curriculum visualization. | Adopt the streak calendar, daily challenge prompt, and the "path" metaphor for our skill tree. But elevate the visual design — Duolingo is playful/mass-market; we need premium. Replace their cartoonish style with our navy+gold geometric approach. |
| **Khan Academy** | Their progress tracking is clear and trustworthy. The mastery system (practiced → level 1 → level 2 → mastered) gives granular feedback. The parent dashboard ("Coach" view) is a great reference for our parent view. | Adopt their mastery-level granularity for skills within each lesson. Their course progress cards with completion percentages are a proven pattern. |
| **Chess.com / Lichess** | Rating system, puzzle streak, daily puzzles, game analysis. The rating graph over time is highly motivating for chess players. Puzzle streaks ("Solve 10 in a row") are addictive. | Integrate a rating-like progression for chess track. Adopt the puzzle streak mechanic for all tracks (coding challenges, AI quizzes, chess puzzles). |
| **Brilliant.org** | Beautiful, interactive lessons that feel like play. The "streak" and "problem of the day" mechanics are elegant. Premium feel throughout. | Closest aesthetic reference. Our dashboard should match this level of craft. Adopt their clean card layouts, thoughtful spacing, and subtle animations. |

### 7.2 Learning Dashboards

| Platform | What to Learn | What to Adapt |
|----------|---------------|---------------|
| **Codecademy Pro** | Clean dashboard showing enrolled courses, progress %, and next lesson. The "syllabus" view with expandable sections is clear and professional. | Good parent-facing pattern. Adopt the clean course-card layout for our track cards. |
| **Notion (for Kids)** | Notion's design system proves you can be minimal AND engaging. Their empty states, loading states, and page transitions are best-in-class. | Adopt their loading skeleton approach and their smooth page transition patterns. |
| **ClassDojo** | The parent–teacher communication model is proven. The "Class Story" feed keeps parents engaged. The student portfolio feature is powerful. | Adopt their coach-notes feed pattern for our parent view. The portfolio idea maps to our teen (13–17) "project portfolio" feature. |

### 7.3 Visual Design & Animation

| Platform | What to Learn | What to Adapt |
|----------|---------------|---------------|
| **Linear** | Premium SaaS feel with beautiful micro-interactions. The way elements animate in on page load (stagger, subtle spring) sets a quality bar. | Adopt their animation timings and stagger patterns for our dashboard card loading. Their dark theme aesthetic translates to our navy backgrounds. |
| **Stripe Dashboard** | Data visualization done right. Clean charts, clear hierarchy, premium feel. | Reference for our parent dashboard — billing, payment history, and data visualization patterns. |
| **Apple Fitness+** | The activity rings are the best circular progress indicator in existence. The animation when they complete is incredibly satisfying. | Directly inspire our progress rings. Adopt the ring completion animation (fill + celebratory haptic/visual). |
| **Headspace** | Calm, premium, illustration-led. Proves you can be "for wellness/growth" without being clinical. Their illustration style (flat, limited palette, warm) is a great reference. | Adapt their illustration principles (limited palette, geometric, warm) for our mascot and scene illustrations. Swap their pastels for our navy+gold. |

### 7.4 Nairobi-Market Specific

| Reference | Insight |
|-----------|---------|
| **M-Pesa integration** | Parents expect M-Pesa as a payment option. The billing section should show M-Pesa transaction codes alongside card receipts. Use the familiar M-Pesa green (`#4CAF50`) for payment confirmations. |
| **WhatsApp as primary messaging** | Coach communication should have a WhatsApp integration option. Many Nairobi parents prefer WhatsApp over in-app messaging. Offer both, but default to WhatsApp notification delivery. |
| **International school calendar** | The schedule view should align with the three-term Kenyan school calendar (Jan–Apr, May–Aug, Sep–Dec) rather than US semesters. Term breaks are peak lesson times — show a "Holiday Intensive" promotion in the schedule during breaks. |
| **Device context** | Many households have shared tablets. Support fast user-switching (tap avatar to switch between siblings) without full logout. Parental PIN to access parent view. |
| **Power/connectivity** | Include a small connection-status indicator. Cache aggressively. Dark mode (already navy-heavy) saves battery on OLED tablets/phones. |

---

## 8. Implementation Priorities

### Phase 1 — MVP Dashboard (Build First)

| Priority | Component | Why First |
|----------|-----------|-----------|
| P0 | `DashboardShell` + `TopBar` + `BottomNav` | Structural foundation — everything else lives inside this |
| P0 | `NextSessionCard` + `SessionCountdown` | The #1 action: joining lessons. Must work day one. |
| P0 | `TrackCard` + `ProgressRing` | Core progress visualization. Parents and students both need this immediately. |
| P0 | `StreakCalendar` (row variant) | Streak is the primary retention mechanic. Start tracking from day one. |
| P0 | Parent `ChildOverviewCard` + `UpcomingSessions` | Parents are paying. They need visibility immediately. |
| P1 | `XPBar` + `LevelBadge` | Gamification layer. Important for motivation but can launch with a simpler version. |
| P1 | `ActivityTimeline` | Nice-to-have for launch. Shows the platform is alive. |
| P1 | `CoachNoteCard` + parent messaging | Coach communication is high-value. Can use WhatsApp as a bridge initially. |

### Phase 2 — Engagement Layer

| Priority | Component | Why Second |
|----------|-----------|------------|
| P2 | `SkillTree` + `SkillTreeNode` + `SkillTreePath` | The signature interaction. Complex to build but huge differentiator. |
| P2 | `BadgeCard` + `BadgeModal` + badge system | Full gamification. Requires badge design assets. |
| P2 | `DailyChallenge` | Retention mechanic. Needs practice content to exist first. |
| P2 | `LevelUpCelebration` + `ConfettiOverlay` | Polish layer. Makes the product feel premium. |
| P2 | Parent `RadarChart` + `ProgressReport` | Advanced analytics. Requires enough data to be meaningful. |

### Phase 3 — Delight & Differentiation

| Priority | Component | Why Third |
|----------|-----------|-----------|
| P3 | `LeaderboardTable` | Social feature. Needs enough students in cohorts. |
| P3 | Age-adaptive rendering | Requires all base components to be stable first. |
| P3 | Offline support | Service worker, caching strategy. |
| P3 | Mascot integration | Illustration assets needed. Enhances but doesn't block. |
| P3 | Portfolio view (teens) | Needs enough completed projects to showcase. |

---

## 9. Open Questions for Team Discussion

1. **Authentication provider:** What auth system are we using? (Clerk, NextAuth, Supabase Auth?) This affects the dashboard layout route structure and role-based rendering (student vs. parent).

2. **Real-time features:** Do we want live session joining (WebRTC/Zoom embed) directly in the dashboard, or do we link out to a separate platform (Google Meet, Zoom)?

3. **Content management:** Where do lesson content, exercises, and coach notes live? (CMS like Sanity? Custom DB? Notion API?) This affects how the skill tree and lesson popovers fetch data.

4. **M-Pesa integration:** Which payment processor? (Pesapal, Flutterwave, IntaSend?) This affects the billing component architecture.

5. **Mascot design:** Should we commission the owl mascot from an illustrator, or should we design it in-house as SVG? Budget consideration.

6. **Sibling user-switching:** How many families have multiple enrolled children? If >30%, the quick-switch feature should be P1 instead of P3.

7. **Coach-side interface:** This design doc covers student + parent views. Do coaches need a separate dashboard? (Likely yes — for scheduling, note-writing, attendance tracking.) That's a separate design doc.

---

*— Linus, Product Designer*
