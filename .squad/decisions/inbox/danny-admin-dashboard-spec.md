# Cognitron — Admin Dashboard Specification

**Author:** Danny (Lead Strategist)
**Date:** July 2025
**Status:** Proposal — Ready for review
**Dependencies:** Linus (dashboard design), Tess (user needs), Virgil/Turk/Livingston (curriculum structures), Market Analysis

---

## Executive Summary

The Admin Dashboard is the founder's cockpit for running Cognitron. It surfaces the metrics that drive decisions — not vanity numbers, but signals that tell you whether the business is healthy, where to invest, and what's about to break.

This spec defines the business intelligence layer for the **Admin** role — a new fourth role alongside Student, Parent, and Coach. The Admin sees everything: every student, every coach, every payment, every session. But raw data isn't the goal. The goal is **actionable insight**: "Which families are at risk of churning?" matters more than "Total students: 47."

Everything here is designed for a bootstrapped premium education startup in Nairobi. The founder checks this dashboard over morning coffee in Karen, between school partnership meetings, and at 10 PM after putting the kids to bed. It must load fast, surface what matters, and never require more than 2 clicks to answer any business question.

---

## 1. Metrics Framework

### 1.1 Revenue Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **MRR (Monthly Recurring Revenue)** | Sum of all active monthly subscriptions + (term packages / months in term) | Real-time | The heartbeat number. If this is growing, you're alive. |
| **ARR (Annualized Recurring Revenue)** | MRR × 12 | Real-time (derived) | For planning and investor conversations. |
| **Revenue by Track** | Sum of payments attributed to each track (Coding, AI, Chess) | Daily | Shows which tracks drive the business. Informs hiring and curriculum investment. |
| **Revenue by Tier** | Revenue split by delivery type: Group, 1-on-1, Home Visit, Elite Annual | Daily | Validates pricing strategy. If Home Visit revenue dominates, that's your moat. |
| **Revenue per Student (ARPS)** | Total revenue / active students | Monthly | Are you monetizing well? Tells you if families are upgrading or downgrading. |
| **Revenue per Family** | Total revenue / active families | Monthly | More useful than per-student for multi-child families (Dr. Wambui pays for 3 kids). |
| **Payment Collection Rate** | (Payments received on time / payments due) × 100 | Daily | Critical for cash flow. Nairobi parents sometimes delay; you need to see this early. |
| **M-Pesa vs Card Split** | % of payments via M-Pesa vs card | Monthly | Operational — informs payment provider negotiations and fee optimization. |
| **Outstanding Receivables** | Sum of unpaid invoices past due date | Real-time | Cash flow risk. Color-code: yellow (1–7 days late), orange (8–14), red (15+). |
| **Term-over-Term Revenue Growth** | (Current term revenue − previous term revenue) / previous term × 100 | End of term | Are you growing term-on-term? The most meaningful growth metric for a term-based business. |
| **Lifetime Value (LTV)** | Average revenue per family × average retention in terms | Quarterly | Paired with CAC, tells you if the unit economics work. |
| **Customer Acquisition Cost (CAC)** | Total marketing/sales spend / new families acquired | Monthly | Must be significantly less than LTV. For premium, expect KES 5,000–15,000 per family. |

### 1.2 Student Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **Total Enrolled Students** | Count of students with active enrollment | Real-time | Headline number. |
| **Active vs Inactive** | Active: attended ≥1 session in last 2 weeks. Inactive: no activity in 2+ weeks. | Daily | Inactive students are pre-churn. Flag them early. |
| **Students by Track** | Count per track (Coding, AI, Chess), including multi-track students | Daily | Informs coach hiring and content investment. |
| **Students by Age Tier** | Count per age tier (5–7, 8–10, 11–13, 14–17) | Monthly | Helps predict demand for curriculum levels. |
| **Students by Delivery Type** | Group vs 1-on-1 vs Home Visit | Daily | Capacity planning. Home visits have hard limits (coach travel time). |
| **Multi-Track Students** | Students enrolled in 2+ tracks | Monthly | These are your highest-value families. Track and protect them. |
| **New Enrollments (this term)** | Students who started in current term | Real-time | Leading growth indicator. |
| **Enrollment Trend** | Weekly/monthly new enrollment count over time | Weekly | Is growth accelerating or decelerating? |
| **Churn (this term)** | Students who did not re-enroll from previous term | End of term | The metric you most want to be zero. Every churned student is KES 35K–100K lost per term. |
| **Net Student Growth** | New enrollments − churns | Per term | Must be positive to grow. Simple but crucial. |
| **Students by Neighborhood** | Distribution across Karen, Runda, Lavington, etc. | Monthly | Geographic concentration risk. Also informs home-visit route planning. |
| **Students by School** | Which international schools are represented | Monthly | Validates school partnership strategy. "12 Brookhouse kids" = the partnership is working. |

### 1.3 Engagement Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **Session Attendance Rate** | (Sessions attended / sessions scheduled) × 100 | Daily | Below 80% = problem. Consistent no-shows signal churn risk. |
| **Lesson Completion Rate** | Lessons completed / lessons available per track | Weekly | Are students progressing through the curriculum? |
| **Average Sessions per Student per Week** | Total sessions / active students / weeks | Weekly | Should be ≥1. Higher = more engaged (and more revenue). |
| **Practice Activity Rate** | % of students who completed ≥1 practice activity between sessions | Weekly | Between-session engagement is the strongest retention predictor. |
| **XP Earned (Platform-Wide)** | Total XP earned across all students, per day/week/month | Daily | A pulse check on platform activity. Trending down = engagement problem. |
| **Average Streak Length** | Mean consecutive days of activity across active students | Weekly | Streaks drive habit formation. Longer average = healthier engagement. |
| **Badge Completion Rate** | Badges earned / badges available × students | Monthly | Are the gamification systems working? |
| **Portfolio Projects Created** | Total projects in student portfolios | Monthly | Portfolio projects are Cognitron's proof of value. This number should always grow. |
| **Offline Content Usage** | Downloads of offline packs (chess puzzles, coding challenges) | Weekly | Tells you if the offline-first strategy is working for boarding school students. |

### 1.4 Coach Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **Coach Utilization Rate** | (Sessions delivered / maximum available sessions) × 100 | Weekly | Under-utilized coaches = cost without revenue. Over-utilized = burnout risk. |
| **Sessions per Coach per Week** | Total sessions / active coaches / weeks | Weekly | Target: 15–25 sessions/week for full-time. Above 25 = overload. |
| **Student-to-Coach Ratio** | Active students / active coaches | Monthly | For premium service, aim for ≤12:1 overall, ≤4:1 per session. |
| **Session Notes Completion Rate** | Sessions with coach notes submitted / total sessions | Daily | Coaches who don't log notes are not giving parents what they pay for. Should be 100%. |
| **Average Session Rating** | Mean of parent post-session ratings (1–5) | Weekly | Below 4.0 for any coach = quality conversation needed. |
| **Coach Response Time** | Average time for coach to respond to parent messages | Daily | Premium service = fast responses. Target: <4 hours during business hours. |
| **Cancellation Rate (Coach-Initiated)** | Coach-cancelled sessions / total scheduled sessions | Monthly | Should be near zero. Frequent cancellations destroy parent trust. |
| **On-Time Rate** | Sessions started within 5 min of scheduled time / total sessions | Weekly | For home visits especially, punctuality = professionalism. |

### 1.5 Growth & Retention Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **Trial → Paid Conversion Rate** | Families who enrolled after demo/trial / total demo/trials | Monthly | Is your sales funnel working? Target: >40% for premium. |
| **Referral Source Breakdown** | New families by source: referral, school partnership, Instagram, WhatsApp, Google, event | Monthly | Where to spend marketing shillings. If 70% is referral, invest in referral program, not Google Ads. |
| **Term-over-Term Retention Rate** | Students who re-enrolled / students who were enrolled last term × 100 | Per term | THE most important metric after revenue. Target: >85% for premium. |
| **Churn Rate** | 1 − retention rate | Per term | Every 1% improvement in retention compounds dramatically over 4 years (full journey). |
| **Re-Enrollment Rate** | Previously churned students who returned / total churned | Per term | Shows if your "win-back" efforts work. Even 10% re-enrollment is significant. |
| **Family Expansion Rate** | Families who added a sibling or additional track / total families | Per term | Organic growth within existing families. Cheapest growth you can get. |
| **Net Promoter Score (NPS)** | Based on quarterly "Would you recommend Cognitron?" survey | Quarterly | Below 50 = problem. Above 70 = you're winning. |
| **Waitlist Size** | Families waiting for a slot (by track, by delivery type) | Real-time | A waitlist is the best problem to have. Also signals where to hire coaches. |

### 1.6 Operations Metrics

| Metric | Calculation | Update Frequency | Why It Matters |
|--------|-------------|-----------------|----------------|
| **Upcoming Sessions (Next 7 Days)** | Count and list of scheduled sessions | Real-time | Operational awareness. |
| **Cancellations (This Week)** | Parent-cancelled + coach-cancelled sessions | Real-time | Spike in cancellations = something's wrong. |
| **No-Shows (This Week)** | Scheduled sessions where student didn't attend and didn't cancel | Real-time | No-shows are lost revenue and signal disengagement. |
| **Schedule Utilization** | Filled session slots / available session slots | Weekly | Are you leaving capacity on the table? |
| **Home Visit Route Efficiency** | Average travel time between home visits per coach per day | Weekly | Nairobi traffic is brutal. Poor routing = wasted coach hours. |
| **Platform Uptime** | % of time dashboard is accessible | Daily | Premium families expect 99.9%+. |
| **Support Tickets Open** | Active support/incident reports | Real-time | Zero is ideal. Any open ticket is a family at risk. |

---

## 2. Dashboard Layout — Admin Pages

### 2.1 Admin Navigation

```
/admin                              ← Overview cockpit (default)
  /admin/students                   ← Student roster & management
  /admin/coaches                    ← Coach management & performance
  /admin/revenue                    ← Financial dashboard
  /admin/curriculum                 ← Content management
  /admin/sessions                   ← Schedule management
  /admin/families                   ← Family/parent management
  /admin/settings                   ← Platform configuration
```

**Admin Nav (sidebar, always expanded on desktop):**

| Icon | Label | Route | Badge |
|------|-------|-------|-------|
| 📊 | Overview | `/admin` | Alert count |
| 👩‍🎓 | Students | `/admin/students` | New this week |
| 🎓 | Coaches | `/admin/coaches` | — |
| 💰 | Revenue | `/admin/revenue` | Overdue payments |
| 📚 | Curriculum | `/admin/curriculum` | — |
| 📅 | Sessions | `/admin/sessions` | Today's count |
| 👨‍👩‍👧‍👦 | Families | `/admin/families` | Churn risk count |
| ⚙️ | Settings | `/admin/settings` | — |

---

### 2.2 Overview Page (`/admin`) — The Cockpit

This is the screen you see every morning. It answers: "How is Cognitron doing right now?"

#### Header
- **Greeting:** "Good morning, [Name]. Here's your Cognitron pulse."
- **Date range selector:** Today / This Week / This Month / This Term / Custom
- **Quick actions:** "Export Report" | "Send Announcement" | "Create Coach Account"

#### Section A — Vital Signs (4 KPI Cards, Full Width)

Four large metric cards across the top. Each shows: current value, trend arrow (↑/↓), % change from previous period, sparkline (last 8 weeks).

| Card | Metric | Color Signal |
|------|--------|-------------|
| 💰 **Revenue** | MRR with month-over-month trend | Green if growing, red if declining |
| 👩‍🎓 **Students** | Total active with net change this term | Green if net positive |
| 🔥 **Engagement** | Platform-wide session attendance rate | Green ≥90%, yellow 80–89%, red <80% |
| 🔄 **Retention** | Current term retention rate (projected) | Green ≥85%, yellow 75–84%, red <75% |

#### Section B — Alerts & Action Items (Left Column, 60%)

A prioritized feed of things that need the founder's attention. Not a notification center — a **decision queue**.

**Alert Types (priority ordered):**

| Priority | Alert | Trigger | Action |
|----------|-------|---------|--------|
| 🔴 Critical | Payment failure | M-Pesa or card payment failed | "View payment" → contact family |
| 🔴 Critical | Coach no-show | Coach didn't check in for scheduled session | "Contact coach" → arrange cover |
| 🟠 High | Churn risk | Student inactive 14+ days OR parent hasn't opened weekly digest 3+ weeks | "View family" → personal outreach |
| 🟠 High | Coach quality alert | Session rating ≤3.0 OR 3+ parents flagged same coach | "View coach" → quality review |
| 🟡 Medium | Payment overdue | Invoice unpaid 7+ days past due | "Send reminder" → WhatsApp nudge |
| 🟡 Medium | Low engagement | Student attendance <70% over last 4 weeks | "View student" → coach follow-up |
| 🟢 Info | New enrollment | New family completed enrollment | "Welcome" → ensure onboarding is smooth |
| 🟢 Info | Milestone reached | Student leveled up, earned rare badge, or completed a track | "Celebrate" → social media content opportunity |

Each alert is a card with: timestamp, summary, affected person/family, and a primary action button.

#### Section C — Quick Charts (Right Column, 40%)

| Chart | Type | Data |
|-------|------|------|
| **Enrollment Trend** | Line chart | New students per week, last 12 weeks |
| **Revenue by Track** | Donut chart | Coding vs AI vs Chess revenue split |
| **Session Load This Week** | Bar chart | Sessions per day (Mon–Sun), with coach capacity line overlaid |
| **Top Referral Sources** | Horizontal bar | Source breakdown for new families this term |

#### Section D — Today's Operations (Full Width Strip)

| Element | Content |
|---------|---------|
| **Sessions Today** | Count + list: "14 sessions today (8 home visits, 4 online, 2 group). Next: Amani Kamau, Coding, 2:00 PM, Coach David, Home Visit (Karen)" |
| **Coaches Active** | Which coaches are scheduled today, their load, and status |
| **Upcoming This Week** | Calendar strip showing session density per day |

---

### 2.3 Students Page (`/admin/students`)

A searchable, filterable roster of every student on the platform.

#### Filters Bar
- **Search:** By name, school, parent name, email, phone
- **Track:** Coding / AI / Chess / Any
- **Age Tier:** 5–7 / 8–10 / 11–13 / 14–17
- **Status:** Active / Inactive / Churned / Trial
- **Delivery Type:** Group / 1-on-1 / Home Visit
- **Coach:** Dropdown of all coaches
- **Neighborhood:** Karen / Runda / Lavington / etc.
- **School:** Brookhouse / ISK / Braeburn / etc.
- **Sort:** Name / Enrollment Date / Last Active / XP / Level

#### Student Table

| Column | Data |
|--------|------|
| Name + Avatar | Student name, age, avatar thumbnail |
| School | International school name |
| Tracks | Icon badges (💻🤖♟️) with current level per track |
| Coach | Assigned coach name |
| Delivery | Group / 1-on-1 / Home Visit |
| Status | Active (green) / Inactive (yellow) / Churned (red) / Trial (blue) |
| Last Active | Relative timestamp ("2 hours ago", "5 days ago") |
| Attendance | % for current term |
| Sessions This Term | X of Y completed |
| XP | Total XP with trend indicator |
| Actions | View / Edit / Assign Coach / Message Parent |

#### Student Drill-Down (click a row)

Full student profile showing everything a coach sees PLUS:
- **Family info:** Parent names, contact, payment status, other enrolled siblings
- **Financial:** Payment history, current plan, outstanding balance
- **Engagement timeline:** Visual timeline of sessions, practice activities, milestones
- **Coach notes history:** All coach notes across all sessions
- **Churn risk score:** Algorithmic assessment (see §4)
- **Admin notes:** Internal notes (not visible to parent/student)
- **Actions:** Reassign coach, change plan, send message to parent, mark as churned, add admin note

---

### 2.4 Coaches Page (`/admin/coaches`)

#### Coach Roster Table

| Column | Data |
|--------|------|
| Name + Photo | Coach name, verification badge |
| Tracks | Which tracks they teach |
| Active Students | Count of assigned students |
| Sessions This Week | Delivered / scheduled |
| Utilization | % with color (green 60–85%, yellow <60% or >85%, red >95%) |
| Avg Rating | Parent rating average (last 30 days) |
| Notes Completion | % of sessions with notes logged |
| On-Time Rate | % of sessions started on time |
| Status | Active / On Leave / Inactive |
| Actions | View / Edit / Schedule / Message |

#### Coach Drill-Down

- **Profile:** Full bio, qualifications, background check status, tracks certified, start date
- **Student assignments:** List of all assigned students with their status
- **Performance dashboard:**
  - Session ratings over time (line chart)
  - Attendance and punctuality stats
  - Parent feedback quotes (anonymized)
  - Utilization calendar heatmap
- **Schedule:** Full calendar of upcoming sessions
- **Admin actions:** Reassign students, adjust schedule, change status, add performance note, terminate

#### Create Coach Account (Admin-Only Form)

Fields:
- Full name, email, phone (WhatsApp number)
- Photo upload
- Tracks qualified to teach (checkboxes)
- Background check status (checkbox + date)
- Employment type (Full-time / Part-time / Contract)
- Bio / qualifications (text)
- Availability (weekly schedule builder)

---

### 2.5 Revenue Page (`/admin/revenue`)

#### Header Metrics (4 cards)

| Card | Metric |
|------|--------|
| 💰 MRR | Current MRR with month-over-month change |
| 📈 ARR | Annualized run rate |
| 💳 Collection Rate | % payments received on time this month |
| ⚠️ Outstanding | Total overdue receivables with count of families |

#### Revenue Trend Chart (Primary)
- **Line chart:** Monthly revenue over last 12 months
- **Stacked by:** Track (Coding/AI/Chess) or Tier (Group/1-on-1/Home/Annual)
- **Toggle:** MRR view vs total collected view

#### Revenue Breakdown Table

| Column | Data |
|--------|------|
| Family Name | Parent name(s) |
| Children | Count + names |
| Plan | Tier + tracks |
| Monthly Value | KES amount |
| Payment Method | M-Pesa / Card |
| Status | Current / Overdue / Grace Period |
| Last Payment | Date + amount |
| Next Due | Date |
| Actions | View history / Send reminder / Record payment / Adjust plan |

#### Additional Views (Tabs)

**Invoices Tab:**
- All invoices (filterable by status: Paid / Pending / Overdue / Cancelled)
- Bulk actions: Send reminders, export, reconcile

**Payment History Tab:**
- Chronological feed of all payments with M-Pesa confirmation codes / card transaction IDs
- Reconciliation status

**Pricing Tab:**
- Current pricing tiers with student counts per tier
- Ability to create/edit pricing plans (see §3 Admin Actions)

**Revenue Analytics Tab:**
- LTV by cohort (when families enrolled)
- Revenue concentration risk (% of revenue from top 5 families)
- Revenue per student trend
- M-Pesa vs card split over time
- Seasonal revenue patterns (term boundaries, holiday intensives)

---

### 2.6 Curriculum Page (`/admin/curriculum`)

CRUD interface for managing the three-track curriculum.

#### Hierarchy Navigation (Left Panel)

```
📚 Curriculum
├── 💻 Coding
│   ├── 🌱 Explorer Tier (Ages 5–7)
│   │   ├── Level 1: My First Code
│   │   │   ├── Module A: Thinking Like a Computer (3 sessions)
│   │   │   ├── Module B: ScratchJr Adventures (5 sessions)
│   │   │   └── Module C: Patterns & Loops (4 sessions)
│   │   └── Level 2: Code Stories
│   ├── 🔨 Builder Tier (Ages 8–10)
│   │   ├── Level 3 ─ Level 5
│   ├── 🚀 Creator Tier (Ages 11–13)
│   │   ├── Level 6 ─ Level 8
│   └── 💡 Innovator Tier (Ages 14–17)
│       ├── Level 9 ─ Level 12
├── 🤖 AI & Machine Learning
│   ├── 🔮 Discoverer ─ 🧠 Architect (Levels 1–10)
└── ♟️ Chess
    ├── ♟️ Pawn ─ ♚ King (Levels 1–12)
```

#### Content Editor (Right Panel)

When any item is selected in the hierarchy:

**For a Track:** Name, description, age range, icon, accent color, total levels
**For a Tier:** Name, label, emoji, age range, levels included
**For a Level:** Name, subtitle, session count, prerequisite level, capstone project description
**For a Module:** Name, session count, key concepts (tags), capstone/project, lesson plans
**For a Lesson/Session:** Title, objectives, duration, activities, materials needed, homework/practice assignment

**Admin Actions on Curriculum:**
- Create / Edit / Archive any curriculum item (never hard-delete — archive for history)
- Reorder modules within a level
- Preview as student (see the skill tree for this track)
- View student count at each level (how many students are currently at Level 4 Coding?)
- Manage skills tracked per track
- Manage badges and achievements (create/edit badge, set criteria)
- Manage practice content (chess puzzles library, coding challenges)

---

### 2.7 Sessions Page (`/admin/sessions`)

#### Calendar View (Primary)
- **Weekly calendar** showing all sessions across all coaches
- Color-coded by: Track (Coding = teal, AI = coral, Chess = gold) or Coach or Delivery Type
- Each session block shows: Student name, track, coach, time, location (Home/Online), status
- Click to expand: full session details, coach notes, attendance

#### Filters
- Date range, Coach, Track, Delivery type, Status (Scheduled/Completed/Cancelled/No-Show)

#### Session Table View (Secondary)
- Sortable table of all sessions
- Columns: Date, Time, Student, Track, Coach, Type, Location, Duration, Status, Rating, Notes (Y/N)
- Bulk actions: Export, Reschedule, Cancel

#### Operations Dashboard (Tab)
- **Today:** List of all sessions with live status (Upcoming / In Progress / Completed)
- **This Week:** Summary stats (total sessions, by type, by coach)
- **Cancellation Log:** Recent cancellations with reason codes
- **No-Show Log:** Students who didn't show, with pattern detection ("Jabari has missed 3 of last 5 sessions")

#### Admin Session Actions
- Create ad-hoc session (e.g., makeup session)
- Reschedule any session
- Cancel with reason code (Coach unavailable / Parent request / Holiday / Emergency)
- Assign substitute coach
- View session notes entered by coach
- Flag sessions for quality review

---

### 2.8 Families Page (`/admin/families`)

#### Family Roster

| Column | Data |
|--------|------|
| Family Name | Primary parent name |
| Children | Names + ages of enrolled children |
| Tracks | All tracks across all children |
| Plan/Tier | Current subscription tier |
| Monthly Value | Total family monthly spend |
| Payment Status | Current / Overdue / Churned |
| Enrollment Date | When they joined |
| Referral Source | How they found Cognitron |
| Churn Risk | Score (Low / Medium / High) with indicator |
| NPS | Last survey response |
| Actions | View / Message / Adjust Plan |

#### Family Drill-Down
- **All children:** Cards for each child with progress summaries (same data parents see)
- **Communication log:** All WhatsApp messages, emails, platform messages sent to this family
- **Payment history:** Full financial relationship
- **Coach assignments:** Current coaches for each child
- **Notes:** Internal admin notes, sales notes, churn prevention notes
- **Referral info:** Did they refer others? Were they referred by someone?
- **Lifecycle timeline:** Visual timeline from first contact → trial → enrollment → re-enrollment → expansion

---

### 2.9 Settings Page (`/admin/settings`)

| Section | Controls |
|---------|----------|
| **Platform** | Company name, logo, support email, support WhatsApp number |
| **Pricing** | CRUD for pricing plans (Group/1-on-1/Home/Annual). Set prices, define what's included |
| **Terms & Calendar** | Define school terms (Term 1: Jan–Apr, Term 2: May–Aug, Term 3: Sep–Dec), holiday periods, operating hours |
| **Notifications** | Configure which automated messages are sent (weekly digests, session reminders, milestone alerts). Templates for each |
| **Payments** | M-Pesa Business number, card payment gateway config (Paystack/Flutterwave), currency, tax settings |
| **Roles & Access** | Manage admin accounts (initially just founder, but plan for growth). Future: sub-admin roles |
| **Integrations** | WhatsApp Business API config, SMS gateway (Africa's Talking), email provider, chess platform API keys (Lichess/Chess.com) |
| **Data & Privacy** | Data retention policies, export all data, GDPR-style controls |
| **Announcements** | Create and schedule platform-wide announcements (shown on all dashboards) |

---

## 3. Admin Permissions Model

### 3.1 Role Hierarchy

```
Admin (sees and controls everything)
  └── Coach (sees assigned students, manages own sessions)
        └── Parent (sees own children, manages family billing)
              └── Student (sees own data, manages own profile)
```

### 3.2 Permissions Matrix

| Action | Student | Parent | Coach | Admin |
|--------|---------|--------|-------|-------|
| **View own dashboard/data** | ✅ | ✅ | ✅ | ✅ |
| **View own children's data** | — | ✅ | — | ✅ |
| **View assigned students' data** | — | — | ✅ | ✅ |
| **View ALL students' data** | — | — | — | ✅ |
| **View ALL families' data** | — | — | — | ✅ |
| **View ALL coaches' data** | — | — | — | ✅ |
| **View platform-wide metrics** | — | — | — | ✅ |
| **View revenue/financial data** | — | Own billing | — | ✅ |
| **View payment history (all)** | — | — | — | ✅ |
| **Create/manage coach accounts** | — | — | — | ✅ |
| **Assign students to coaches** | — | — | — | ✅ |
| **Reassign students** | — | — | — | ✅ |
| **Create/edit curriculum content** | — | — | — | ✅ |
| **Create/edit pricing plans** | — | — | — | ✅ |
| **Send platform announcements** | — | — | — | ✅ |
| **Export data (CSV/PDF)** | — | Own reports | — | ✅ All data |
| **Manage user accounts** | Own profile | Own + children | Own profile | ✅ All |
| **View/manage sessions (all)** | — | — | Own sessions | ✅ All |
| **Cancel/reschedule any session** | — | Own | Own | ✅ Any |
| **View coach performance data** | — | Rate coach | — | ✅ All coaches |
| **View churn risk scores** | — | — | — | ✅ |
| **View referral source data** | — | — | — | ✅ |
| **Manage integrations/settings** | — | — | — | ✅ |
| **Archive/deactivate accounts** | — | — | — | ✅ |
| **View audit log** | — | — | — | ✅ |

### 3.3 Admin Account Security

- **Two-factor authentication (2FA):** Required for all admin accounts. M-Pesa-friendly OTP via SMS.
- **Session timeout:** 30 minutes of inactivity = forced re-login.
- **Audit log:** Every admin action is logged with timestamp, actor, and description. Cannot be deleted.
- **IP allowlisting (future):** Restrict admin access to known networks.
- **Role-based sub-admin (future):** E.g., "Finance Admin" sees revenue but not curriculum. "Curriculum Admin" manages content but not finances.

---

## 4. Alerts & Notifications System

### 4.1 Alert Definitions

Alerts are generated automatically based on rules. They appear on the Admin Overview page and optionally send WhatsApp/SMS to the founder's phone.

#### Revenue Alerts

| Alert | Trigger | Severity | Push to Phone? |
|-------|---------|----------|---------------|
| **Payment failed** | M-Pesa STK push failed or card declined | 🔴 Critical | Yes — SMS |
| **Invoice overdue (7 days)** | Invoice unpaid 7+ days past due | 🟠 High | Yes — WhatsApp |
| **Invoice overdue (14 days)** | Invoice unpaid 14+ days past due | 🔴 Critical | Yes — SMS |
| **MRR decline** | MRR dropped >5% month-over-month | 🟠 High | Yes — WhatsApp |
| **Large payment received** | Payment ≥KES 100,000 (annual membership, multi-child) | 🟢 Info | Yes — WhatsApp |
| **Revenue concentration risk** | Single family accounts for >15% of total revenue | 🟡 Medium | No |

#### Student & Engagement Alerts

| Alert | Trigger | Severity | Push to Phone? |
|-------|---------|----------|---------------|
| **Churn risk — inactivity** | Student no activity for 14+ days | 🟠 High | No (batch daily) |
| **Churn risk — declining attendance** | Attendance dropped below 70% over 4 weeks | 🟠 High | No (batch daily) |
| **Churn risk — parent disengagement** | Parent hasn't opened weekly digest or logged in for 3+ weeks | 🟡 Medium | No |
| **New enrollment** | Family completes enrollment | 🟢 Info | Yes — WhatsApp |
| **Student milestone** | Student levels up, completes a track, or earns rare badge | 🟢 Info | No |
| **Trial expiring** | Trial family hasn't converted with 3 days left | 🟠 High | Yes — WhatsApp |

#### Coach & Operations Alerts

| Alert | Trigger | Severity | Push to Phone? |
|-------|---------|----------|---------------|
| **Coach no-show** | Coach didn't check in within 10 min of session start | 🔴 Critical | Yes — SMS + call |
| **Coach quality concern** | Average rating dropped below 3.5 OR 2+ parents flagged | 🟠 High | Yes — WhatsApp |
| **Coach capacity warning** | Coach at >90% utilization next week | 🟡 Medium | No |
| **Session cancellation spike** | >3 cancellations in a single day | 🟠 High | Yes — WhatsApp |
| **No-show pattern** | Same student no-showed 3+ times this term | 🟡 Medium | No |
| **Notes overdue** | Coach hasn't submitted session notes within 24 hours | 🟡 Medium | No |

### 4.2 Alert Delivery

| Channel | Use Case |
|---------|----------|
| **Admin Dashboard** | All alerts — the canonical alert center |
| **WhatsApp (founder's phone)** | High/Critical alerts that need same-day action |
| **SMS** | Critical alerts only (payment failures, coach no-shows) — for when WhatsApp isn't checked |
| **Email** | Daily digest of all alerts at 7:00 AM + weekly summary report every Monday |

### 4.3 Churn Risk Scoring

A composite score (Low / Medium / High) calculated for each family, updated daily.

**Inputs:**
| Signal | Weight | High-Risk Threshold |
|--------|--------|-------------------|
| Session attendance (last 4 weeks) | 30% | Below 70% |
| Practice activity between sessions | 20% | No practice in 2+ weeks |
| Parent dashboard login recency | 15% | No login in 3+ weeks |
| Parent weekly digest open rate | 10% | Not opening digests |
| Payment timeliness | 15% | Payment overdue |
| Coach interaction quality | 10% | Rating ≤3 on recent sessions |

**Score thresholds:**
- 🟢 Low (0–30): Healthy, engaged family
- 🟡 Medium (31–60): Watch — some signals declining
- 🔴 High (61–100): Intervention needed — founder or coach should reach out personally

**Founder action playbook for High-risk families:**
1. Check if there's a specific issue (coach mismatch, schedule conflict, child not enjoying track)
2. Personal WhatsApp from founder: "Hi Dr. Wambui, I noticed Jabari has missed a few sessions. Is everything okay? I'd love to chat and make sure we're serving your family well."
3. Offer: free makeup session, coach change, schedule adjustment
4. If payment issue: payment plan or temporary pause (retain relationship over revenue)

---

## 5. Reporting & Data Export

### 5.1 Standard Reports

| Report | Audience | Format | Frequency | Content |
|--------|----------|--------|-----------|---------|
| **Weekly Pulse** | Founder | PDF + Email | Every Monday | Top-line metrics (MRR, students, attendance, alerts), week-over-week changes, action items |
| **Monthly Business Review** | Founder / Investors | PDF | Monthly | Full P&L-style: revenue trends, growth, churn, coach performance, engagement stats, NPS |
| **Term Report** | Founder | PDF | End of term | Comprehensive: retention analysis, revenue by cohort, curriculum progress, coach evaluations, next-term projections |
| **Coach Performance Report** | Founder / Coach (filtered) | PDF | Monthly | Per-coach: utilization, ratings, student progress, notes completion, punctuality |
| **Student Progress Report** | Parents (via admin export) | PDF | End of term | Per-student: achievements, level progress, skills mastered, coach commentary (this is the branded PDF parents love) |
| **Financial Report** | Founder / Accountant | CSV + PDF | Monthly | All transactions, outstanding receivables, M-Pesa reconciliation, revenue by category |
| **Enrollment Pipeline** | Founder | PDF | Weekly | Trials in progress, conversion funnel, referral sources, waitlist status |

### 5.2 Ad-Hoc Exports

Any table or view in the admin dashboard can be exported:

| Format | Use Case |
|--------|----------|
| **CSV** | For loading into Excel/Google Sheets. Students roster, session history, payment records. |
| **PDF** | Formatted reports for sharing, printing, or investor updates. |
| **JSON** | For technical integrations (future API consumers). |

**Export controls:**
- Admin can export any dataset with current filters applied
- Exports are logged in the audit trail (who exported what, when)
- Sensitive fields (parent phone, payment details) are optionally redacted

### 5.3 Automated Reports

| Report | Delivery | Schedule |
|--------|----------|----------|
| Weekly Pulse | Email to founder | Monday 7:00 AM EAT |
| Overdue Payments Summary | WhatsApp to founder | Daily 9:00 AM EAT (only if there are overdue payments) |
| Churn Risk Daily Brief | Email to founder | Daily 7:00 AM EAT (only if there are High-risk families) |
| Monthly Business Review | Email to founder | 1st of each month |

---

## 6. Data Model Additions

These are the new tables and fields Rusty needs to add to support admin features. They extend the existing data model (which already supports students, parents, coaches, sessions, tracks, and curriculum from the other specs).

### 6.1 New Tables

```
┌─────────────────────────┐
│ admin_users              │
├─────────────────────────┤
│ id                  PK  │
│ user_id             FK  │  → references users table
│ role                    │  'super_admin' | 'finance_admin' | 'curriculum_admin'
│ two_factor_enabled      │  boolean
│ two_factor_method       │  'sms' | 'totp'
│ last_login_at           │  timestamp
│ created_at              │  timestamp
└─────────────────────────┘

┌─────────────────────────┐
│ admin_audit_log          │
├─────────────────────────┤
│ id                  PK  │
│ admin_user_id       FK  │
│ action                  │  'create_coach' | 'reassign_student' | 'update_pricing' | etc.
│ target_type             │  'coach' | 'student' | 'family' | 'session' | 'pricing' | etc.
│ target_id               │
│ details              JSON│  Snapshot of what changed (before/after)
│ ip_address              │
│ created_at              │  timestamp
└─────────────────────────┘

┌─────────────────────────┐
│ admin_alerts             │
├─────────────────────────┤
│ id                  PK  │
│ alert_type              │  'payment_failed' | 'churn_risk' | 'coach_no_show' | etc.
│ severity                │  'critical' | 'high' | 'medium' | 'info'
│ title                   │
│ message                 │
│ target_type             │  'family' | 'student' | 'coach' | 'session'
│ target_id               │
│ status                  │  'active' | 'acknowledged' | 'resolved'
│ acknowledged_by     FK  │  admin_user_id (nullable)
│ acknowledged_at         │  timestamp (nullable)
│ resolved_at             │  timestamp (nullable)
│ pushed_to_phone         │  boolean
│ created_at              │  timestamp
└─────────────────────────┘

┌─────────────────────────┐
│ admin_notes              │
├─────────────────────────┤
│ id                  PK  │
│ admin_user_id       FK  │
│ target_type             │  'student' | 'family' | 'coach'
│ target_id               │
│ note_text               │
│ is_pinned               │  boolean
│ created_at              │  timestamp
│ updated_at              │  timestamp
└─────────────────────────┘

┌─────────────────────────┐
│ pricing_plans            │
├─────────────────────────┤
│ id                  PK  │
│ name                    │  'Group Term' | '1-on-1 Monthly' | 'Home Visit Term' | 'Elite Annual'
│ description             │
│ delivery_type           │  'group' | 'one_on_one' | 'home_visit' | 'annual'
│ billing_period          │  'monthly' | 'term' | 'annual'
│ price_kes               │  integer (in KES)
│ sessions_included       │  integer
│ tracks_included         │  'single' | 'multi' | 'unlimited'
│ features             JSON│  List of included features
│ is_active               │  boolean
│ created_at              │
│ updated_at              │
└─────────────────────────┘

┌─────────────────────────┐
│ invoices                 │
├─────────────────────────┤
│ id                  PK  │
│ family_id           FK  │
│ pricing_plan_id     FK  │
│ amount_kes              │
│ tax_amount_kes          │
│ total_kes               │
│ billing_period_start    │  date
│ billing_period_end      │  date
│ due_date                │  date
│ status                  │  'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded'
│ sent_at                 │  timestamp (nullable)
│ paid_at                 │  timestamp (nullable)
│ created_at              │
│ updated_at              │
└─────────────────────────┘

┌─────────────────────────┐
│ payments                 │
├─────────────────────────┤
│ id                  PK  │
│ invoice_id          FK  │
│ family_id           FK  │
│ amount_kes              │
│ payment_method          │  'mpesa' | 'card' | 'bank_transfer' | 'cash'
│ payment_reference       │  M-Pesa confirmation code or card transaction ID
│ mpesa_phone             │  (nullable) phone number used for M-Pesa
│ status                  │  'pending' | 'completed' | 'failed' | 'refunded'
│ failure_reason          │  (nullable) 'insufficient_funds' | 'timeout' | 'cancelled' | etc.
│ processed_at            │  timestamp
│ created_at              │
└─────────────────────────┘

┌─────────────────────────┐
│ announcements            │
├─────────────────────────┤
│ id                  PK  │
│ admin_user_id       FK  │
│ title                   │
│ body                    │  Markdown/rich text
│ target_roles         [] │  ['student', 'parent', 'coach'] — who sees it
│ is_active               │  boolean
│ starts_at               │  timestamp
│ expires_at              │  timestamp (nullable)
│ created_at              │
└─────────────────────────┘

┌─────────────────────────────┐
│ churn_risk_scores            │
├─────────────────────────────┤
│ id                      PK  │
│ family_id               FK  │
│ score                       │  0–100
│ risk_level                  │  'low' | 'medium' | 'high'
│ attendance_score            │  component score
│ practice_score              │  component score
│ parent_engagement_score     │  component score
│ payment_score               │  component score
│ coach_satisfaction_score    │  component score
│ calculated_at               │  timestamp
└─────────────────────────────┘

┌─────────────────────────┐
│ referral_sources         │
├─────────────────────────┤
│ id                  PK  │
│ family_id           FK  │
│ source_type             │  'referral' | 'school_partnership' | 'instagram' | 'whatsapp' | 'google' | 'event' | 'other'
│ source_detail           │  e.g., "Referred by Kamau family" or "Brookhouse demo session"
│ referrer_family_id  FK  │  (nullable) if referred by another family
│ created_at              │
└─────────────────────────┘

┌─────────────────────────┐
│ platform_announcements   │
│ (read receipts)          │
├─────────────────────────┤
│ id                  PK  │
│ announcement_id     FK  │
│ user_id             FK  │
│ read_at                 │  timestamp
└─────────────────────────┘

┌──────────────────────────┐
│ whatsapp_digest_log       │
├──────────────────────────┤
│ id                   PK  │
│ family_id            FK  │
│ sent_at                  │  timestamp
│ opened_at                │  timestamp (nullable, if tracking available)
│ message_template_id      │
│ delivery_status          │  'sent' | 'delivered' | 'read' | 'failed'
└──────────────────────────┘

┌──────────────────────────┐
│ report_exports            │
├──────────────────────────┤
│ id                   PK  │
│ admin_user_id        FK  │
│ report_type              │  'weekly_pulse' | 'monthly_review' | 'student_progress' | etc.
│ format                   │  'pdf' | 'csv' | 'json'
│ filters_applied      JSON│
│ file_url                 │  S3/storage path
│ created_at               │
└──────────────────────────┘
```

### 6.2 Fields to Add to Existing Tables

```
── users table ──
+ role                    'student' | 'parent' | 'coach' | 'admin'
+ last_login_at           timestamp
+ is_active               boolean (default true)

── families table ──
+ neighborhood            'karen' | 'runda' | 'lavington' | 'muthaiga' | 'westlands' | etc.
+ primary_school          text (e.g., 'Brookhouse Karen')
+ enrollment_date         date
+ referral_source_id      FK → referral_sources

── students table ──
+ status                  'trial' | 'active' | 'inactive' | 'churned'
+ inactive_since          date (nullable) — set when no activity for 14+ days

── coaches table ──
+ employment_type         'full_time' | 'part_time' | 'contract'
+ background_check_date   date
+ background_check_status 'pending' | 'cleared' | 'flagged'
+ is_accepting_students   boolean

── sessions table ──
+ check_in_at             timestamp (nullable) — when coach actually started
+ check_out_at            timestamp (nullable) — when session actually ended
+ no_show                 boolean (default false)
+ cancellation_reason     text (nullable)
+ cancelled_by            'parent' | 'coach' | 'admin' (nullable)
+ parent_rating           integer 1–5 (nullable)
+ parent_feedback         text (nullable)
+ admin_flagged           boolean (default false)
+ admin_flag_reason       text (nullable)

── enrollments table ──
+ pricing_plan_id         FK → pricing_plans
+ term                    text (e.g., 'Term 2 2025')
+ is_trial                boolean (default false)
+ trial_expires_at        date (nullable)
```

### 6.3 Materialized Views / Aggregation Tables

For dashboard performance, pre-compute these:

```
── daily_metrics (computed nightly) ──
  date, total_students, active_students, total_sessions, attendance_rate,
  xp_earned, practice_activities, new_enrollments, churns

── monthly_revenue_metrics (computed monthly) ──
  month, mrr, total_revenue, revenue_by_track (JSON), revenue_by_tier (JSON),
  arps, collection_rate, outstanding_receivables

── coach_weekly_stats (computed weekly) ──
  coach_id, week, sessions_delivered, utilization_rate, avg_rating,
  notes_completion_rate, on_time_rate, student_count

── family_health_scores (computed daily) ──
  family_id, date, churn_risk_score, risk_level, component_scores (JSON)
```

---

## 7. Phase Recommendations

### Phase 1: MVP Admin Dashboard (Build First — Weeks 1–4)

**Goal:** Give the founder basic operational visibility and the ability to manage coaches and students. Ship this alongside or immediately after the Student + Parent + Coach dashboards.

**Includes:**
- ✅ Admin login with 2FA
- ✅ Overview page with 4 vital-sign KPI cards (MRR, students, attendance, retention)
- ✅ Alerts feed (payment failures, churn risk — basic rules, not scoring model yet)
- ✅ Student roster with search/filter and basic drill-down
- ✅ Coach roster with create-coach form
- ✅ Assign/reassign students to coaches
- ✅ Session list view (this week / this month) with attendance tracking
- ✅ Payment tracking: simple invoice table with status (Paid/Overdue/Pending)
- ✅ Manual payment recording (founder enters M-Pesa confirmation code)
- ✅ Basic CSV export (students, sessions, payments)
- ✅ Audit log (all admin actions)

**Why this first:** With 10–15 founding families, you don't need sophisticated analytics. You need to know who's enrolled, who's paying, who's showing up, and which coach is going where. Everything else is noise at this stage.

**Data model:** admin_users, admin_audit_log, admin_alerts (basic), pricing_plans, invoices, payments, referral_sources. Add fields to existing tables as listed in §6.2.

---

### Phase 2: Financial Intelligence (Weeks 5–8)

**Goal:** Stop tracking revenue in a spreadsheet.

**Includes:**
- ✅ Revenue page with MRR/ARR charts and trends
- ✅ Automated invoice generation based on pricing plans
- ✅ M-Pesa integration (STK Push for payments, auto-reconciliation)
- ✅ Card payment integration (Paystack or Flutterwave)
- ✅ Payment reminder automation (WhatsApp message at 3/7/14 days overdue)
- ✅ Revenue by track / by tier breakdown
- ✅ Outstanding receivables dashboard
- ✅ PDF invoice generation (branded, professional — these parents expect it)
- ✅ Monthly financial report (auto-generated PDF)

**Why second:** Once you have 20+ families, manual payment tracking breaks. M-Pesa auto-reconciliation is a massive time-saver. And a professional invoice is table stakes for a premium brand.

---

### Phase 3: Engagement & Churn Analytics (Weeks 9–12)

**Goal:** See engagement problems before families leave.

**Includes:**
- ✅ Churn risk scoring model (per family, updated daily)
- ✅ Engagement metrics: attendance trends, practice rates, XP trends
- ✅ Student activity heatmaps (when are students most active?)
- ✅ Coach performance dashboard (ratings, utilization, notes completion)
- ✅ Churn risk alerts with recommended actions
- ✅ Re-enrollment tracking (term-over-term retention)
- ✅ WhatsApp digest open tracking (delivery + read status)
- ✅ Family health dashboard on Families page
- ✅ Weekly Pulse automated report (email to founder every Monday)

**Why third:** With 30+ families, you can't personally know every family's status. The churn risk model becomes your early warning system. This is when data starts earning its keep.

---

### Phase 4: Curriculum Management (Weeks 13–16)

**Goal:** Manage curriculum without editing code or spreadsheets.

**Includes:**
- ✅ Curriculum page with full hierarchy (Track → Tier → Level → Module → Session)
- ✅ CRUD for all curriculum elements
- ✅ Badge and achievement management
- ✅ Practice content management (chess puzzle library, coding challenges)
- ✅ Student distribution view (how many students at each level?)
- ✅ Curriculum preview as student (see skill tree)

**Why fourth:** The curriculum is defined up front (Virgil, Turk, and Livingston have done this). You don't need a CMS until you start iterating — adding new levels, adjusting modules based on feedback, or adding new tracks. That happens after the first 1–2 terms of delivery.

---

### Phase 5: Advanced Operations & Growth (Weeks 17–24)

**Goal:** Scale the business with confidence.

**Includes:**
- ✅ Full calendar-based session management (admin creates/moves any session)
- ✅ Coach availability and scheduling system
- ✅ Home visit route optimization (minimize travel time between Karen/Runda/Lavington visits)
- ✅ Platform announcements system
- ✅ Referral tracking and attribution
- ✅ NPS survey automation (quarterly)
- ✅ Advanced reporting: LTV analysis, cohort retention curves, revenue concentration
- ✅ Waitlist management
- ✅ Multi-admin support with role-based access
- ✅ PDF term-end reports for parents (auto-generated, branded)
- ✅ Data export API for future BI tools

**Why last:** This is operational sophistication you need at 50+ families with 5+ coaches. Building it earlier is over-engineering. Building it later than this creates operational chaos.

---

## 8. Design Notes for Linus

The admin dashboard follows the same brand language (navy + gold + premium typography) but with key differences:

1. **Information density is higher.** Admins are data-literate; don't fear tables and charts. The student dashboard is spacious and playful. The admin dashboard is dense and efficient.

2. **No gamification.** No badges, streaks, or celebrations on the admin dashboard. This is a business tool.

3. **Desktop-first.** Unlike the student (tablet-first) and parent (mobile-first) dashboards, the admin dashboard is desktop-first. The founder manages the business on a laptop. Mobile should work (responsive) but isn't the primary target.

4. **Charts over cards.** Line charts, bar charts, and donut charts are the primary data visualization. Sparklines in table rows. Color-coded status indicators everywhere.

5. **Consistent color semantics:**
   - 🟢 Green: healthy, on track, paid, active
   - 🟡 Yellow: warning, needs attention, overdue (7 days)
   - 🔴 Red: critical, churn risk high, overdue (14+ days), coach no-show
   - 🔵 Blue: informational, new, trial
   - 🟣 Purple: none — reserve for future use

6. **Print-friendly.** Reports and exports should be print-friendly. The founder may print the monthly report for a board meeting or investor conversation.

7. **Fast.** Every page must load in <2 seconds. Pre-compute metrics nightly. Cache aggressively. Paginate tables at 50 rows.

---

## 9. Technical Recommendations for Rusty

1. **Auth:** Extend the existing auth system to support `role: 'admin'` with 2FA. Use middleware to gate all `/admin/*` routes.

2. **API Design:** Every admin page maps to a REST API endpoint. Keep admin APIs separate from student/parent/coach APIs for security and maintainability.
   ```
   GET  /api/admin/overview          → Overview KPIs + alerts
   GET  /api/admin/students          → Paginated, filterable student list
   GET  /api/admin/students/:id      → Full student profile
   GET  /api/admin/coaches           → Coach roster
   POST /api/admin/coaches           → Create coach
   GET  /api/admin/revenue           → Revenue metrics
   GET  /api/admin/sessions          → Session list with filters
   GET  /api/admin/families          → Family roster
   GET  /api/admin/alerts            → Active alerts
   PATCH /api/admin/alerts/:id       → Acknowledge/resolve alert
   POST /api/admin/exports           → Generate export
   GET  /api/admin/audit-log         → Audit trail
   ```

3. **Aggregation Jobs:** Use scheduled jobs (cron or Supabase edge functions) to pre-compute:
   - `daily_metrics` — runs at 1:00 AM EAT
   - `family_health_scores` — runs at 2:00 AM EAT
   - `coach_weekly_stats` — runs Monday 3:00 AM EAT
   - `monthly_revenue_metrics` — runs 1st of month 4:00 AM EAT

4. **Payments:** Integrate M-Pesa via Safaricom Daraja API (STK Push for collections, C2B for confirmations). Cards via Paystack Kenya. Both webhook-driven for real-time status updates.

5. **WhatsApp:** Use the WhatsApp Business API (via 360dialog or official Meta Cloud API) for automated messages. Message templates must be pre-approved by Meta. Plan templates for: weekly digest, payment reminder, session reminder, milestone notification.

6. **Security:** Admin endpoints must validate both JWT auth AND admin role. Rate-limit admin APIs. Log all state-changing operations to `admin_audit_log`. Never expose raw financial data in client-side code — server-render or aggregate.

7. **Charts:** Use a lightweight charting library (Chart.js or Recharts for React). Keep chart data payloads small — send pre-aggregated data from the API, not raw rows.

---

## 10. Open Questions

| # | Question | Owner | Decision Needed By |
|---|----------|-------|-------------------|
| 1 | Will there be multiple admins from day one, or just the founder? This affects whether we need role-based sub-admin now or later. | Founder | Phase 1 |
| 2 | M-Pesa Business Till or Paybill? Affects the Daraja API integration path. | Founder + Rusty | Phase 2 |
| 3 | Do we track referral commissions (e.g., "Refer a friend, get 1 free session"), or just track the source for attribution? | Danny + Founder | Phase 2 |
| 4 | What's the definition of "churned"? Missing one full term? Missing 3+ consecutive weeks? Need a clear business rule. | Danny + Tess | Phase 3 |
| 5 | Do coaches see their own performance metrics (ratings, utilization), or is this admin-only? Transparency builds trust but can cause anxiety. | Danny + Tess | Phase 3 |
| 6 | For home visits, do we use GPS check-in (coach's phone location) or manual confirmation (parent/house manager confirms)? | Founder + Rusty | Phase 1 |
| 7 | How should we handle mid-term plan changes (e.g., family upgrades from Group to Home Visit)? Pro-rate? Credit? | Founder + Danny | Phase 2 |

---

*This spec should be reviewed alongside Linus's dashboard design doc, Tess's user needs document, and the curriculum structures from Virgil, Turk, and Livingston. The admin dashboard is the control plane that makes everything else run smoothly. Build it lean, but build it right — the founder's ability to make fast, informed decisions is Cognitron's competitive advantage as a bootstrapped startup.*

*— Danny, Lead Strategist*
