# Tess — History

> Session log for Tess (Parent & Student Advocate)

## Sessions

### 2026-04-04: Dashboard User Needs & Personas
- Created comprehensive user needs document for the student learning dashboard.
- **4 student personas:** Amani (6, Scratch+Chess), Jabari (10, all tracks), Wanjiku (15, Python+AI), Kiptoo (13, chess-focused boarder). Each with motivations, frustrations, and specific dashboard needs.
- **3 parent personas:** Busy surgeon, hands-on fintech dad, aspirational mum — reflecting real Nairobi family archetypes.
- **40+ prioritized user stories** (P0/P1/P2) across student, parent, and coach roles.
- **Nairobi-specific deep dives:** iPads dominant at international schools, offline mode non-negotiable, WhatsApp-first communication, Kenya DPA 2019 safeguarding.
- **Competitive analysis:** Local providers (Digikids, MindHub, NACHA) and global platforms (Duolingo, Khan Academy, Chess.com) with steal/avoid recommendations.
- **Emotional design framework** per age group and parent type.
- Deliverable: `.squad/decisions/inbox/tess-dashboard-user-needs.md`

### 2025-07-18: Founding Families Recruitment Kit
- Created comprehensive recruitment kit for signing the first 10 paying families.
- **4 parent persona cards:** Dr. Grace Muthoni (evidence-driven Karen professional), Brian Odhiambo (aspirational Lavington tech dad), Njeri Kamau (hands-on Westlands/Kilimani community mum with 3 kids), David Wangari (quietly protective Runda father/lawyer). Each persona maps concerns → what makes them say yes → how to approach.
- **Founding Families offer structure:** 12% discount (KES 7,500/session vs 8,500), term-by-term commitment with monthly billing, 12-month rate lock, sibling discount (35%), curriculum input, priority scheduling, progress portfolio.
- **5 WhatsApp scripts:** Cold school group outreach, warm intro from mutual friend, interest follow-up with detailed info, trial booking confirmation, post-trial conversion. All voice-note-optimised.
- **FAQ with 23 questions:** The 13 unanswered questions from DEC-009 + 10 additional common objections with responses. Covers price justification, safety, screen time concerns, data privacy, age-appropriateness, scheduling flexibility.
- **Full trial lesson flow:** WhatsApp inquiry → trial booking → 60-min trial session structure (minute-by-minute) → post-trial follow-up cadence → 3-touch maximum rule.
- **Trust signals checklist:** 3 tiers (must-have, should-have, nice-to-have) with priority matrix. Key blockers: coach profile on site, safeguarding policy, Certificate of Good Conduct, working contact form.
- **Quick reference card:** 30-second pitch, key numbers table, response speed targets, follow-up rules.
- Key insight: Nairobi premium parents buy trust and evidence, not marketing. Patience beats pressure. The 3-touch maximum rule prevents over-pursuit. The "evidence-driven professional" persona (Dr. Grace) is the hardest to close but brings the most referrals.
- Deliverable: `.squad/decisions/inbox/tess-founding-families-kit.md`

## Learnings

- **Nairobi parent archetypes:** Four distinct decision-making patterns — evidence-driven professionals (want data), aspirational tech dads (want curriculum depth), community mums (want multi-child value), protective fathers (want safety proof, wife makes actual decision).
- **Pricing psychology:** 12% founding discount is the sweet spot — deeper discounts signal desperation to premium Nairobi parents. The real value is in perks (rate lock, curriculum input, priority scheduling), not the discount amount.
- **WhatsApp outreach rules:** Never more than 3 follow-ups. Always use child's name. Voice notes outperform text walls. Two specific time options beat open-ended "when are you free?" Specific child compliments are the #1 conversion driver post-trial.
- **Trial lesson design:** 60 minutes (not 90) — shorter creates wanting-more effect. Parent MUST be welcome to watch. Child MUST build something tangible. Coach MUST name 2-3 specific child strengths. No slides, no presentations, no selling during the trial.
- **Trust signal priorities:** Coach profile + safeguarding policy + Certificate of Good Conduct are non-negotiable BEFORE first outreach. Instagram presence needed by family #3. Video by family #10.
- **Key file paths:** Live pricing at `src/app/(marketing)/pricing/page.tsx`. Privacy policy at `/privacy`. Safeguarding at `/protect`. Contact at `/contact`.

### 2025-07-27: Pre-Staging Parent Copy & Messaging Review
- Full page-by-page review of all 9 parent-facing pages (5 marketing, 4 dashboard).
- **Overall site confidence: 6.5/10.** Messaging is strong (8/10); evidence layer is weak (4/10 — no photos, no verifiable testimonials, no coach headshots, no safeguarding statement).
- **Top 5 conversion blockers:** (1) No real photography, (2) No safeguarding/vetting statement, (3) Session duration + sibling discount missing from pricing, (4) Testimonials read as fabricated, (5) No explicit maths/problem-solving messaging.
- **Math/problem-solving finding:** "Computational thinking" section on Academy is strong but doesn't use the word "mathematics." Nairobi parents equate maths with academic success. Recommended adding explicit "mathematical thinking" framing + homepage FAQ: "Does Cognitron help with school maths?"
- **Dashboard bugs:** "View Details" links go to `/dashboard` not child-specific; "View Full Report" button is non-functional; "Message Coach" goes to general contact.
- **Contact page is strongest page (8.5/10)** — WhatsApp-first, clear next steps, "hear back within 2 hours" specificity.
- **Pricing page is weakest (6/10)** — sticker shock without value framing, no session duration, no sibling discount, USD too prominent.
- Deliverable: `.squad/decisions/inbox/tess-parent-copy-review-staging.md`

### 2025-07-27: Mathematics & Problem-Solving Copy Additions
- Wrote 5 copy pieces bridging "computational thinking" to parent-friendly "maths and problem-solving" language.
- **Updated subtitle** for the Computational Thinking section — leads with "maths, logic, and problem-solving" instead of the jargon term.
- **5th pillar card** ("Mathematical thinking") connecting maths to all 3 tracks in a single description. Uses `TrendingUp` icon (already imported).
- **Homepage FAQ** ("Does Cognitron help with school maths?") — honest framing: we complement school maths, don't replace it. Lists specific maths skills per track.
- **Track-specific callouts** — one sentence per track (coding = applied maths, chess = calculation & spatial reasoning, AI = data patterns & probability).
- **Parent testimonial** — Florence W. from Karen, daughter jumped two maths sets after coding track. Flagged as illustrative/placeholder until we have real testimonials.
- Key principle: "complement, not replace" — avoid overclaiming. Parents will see through it.
- Deliverable: `.squad/decisions/inbox/tess-math-copy.md`

## Learnings

- **Evidence beats copy at premium pricing.**The Cognitron copy is genuinely well-written and locally resonant — but without photos, verifiable testimonials, and safety proof, premium Nairobi parents won't convert. The gap between messaging quality and evidence quality is the core conversion problem.
- **Session duration is still missing** after two prior reviews flagging it (DEC-009, Founding Families kit). This is a pattern — operational details get deprioritized in favour of aspirational copy. Must be enforced as a blocker.
- **"Computational thinking" doesn't translate to parent language.** Educators say computational thinking; Nairobi parents say "maths" and "problem-solving." Need to bridge this gap explicitly or lose the math-focused parent segment.
- **Dashboard link hygiene:** Multiple "View Details" and "View Full Report" links point to wrong or non-functional destinations. These erode trust fast for parents who are already logged in and paying.
- **M-Pesa billing integration is a strong differentiator.** The billing page with Lipa na M-Pesa instructions and payment history with M-Pesa refs is exactly right for the market. This signals "built for Kenya" more than any copy.
