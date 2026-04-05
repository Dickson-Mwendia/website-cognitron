# Livingston — History

> Session log for Livingston (Chess Academy Lead)

## Sessions

### 2026-04-04: Chess Curriculum Structure for Dashboard
- Defined chess track: rating-mapped tiers (Pawn → Knight → Bishop → Rook → Queen → King), aligned with FIDE/national rating system.
- 144 sessions covering opening theory, tactics, endgame, positional play, tournament preparation.
- Tournament prep track with online vs in-person hybrid guidance.
- Progress tracking: puzzles solved, rating progression, games analyzed.
- Contributed to cross-track Fusion Lab projects and unified badge framework.
- Deliverable (joint with Virgil & Turk): `.squad/decisions/inbox/curriculum-dashboard-structures.md`

### 2026-04-04: Chess Playground — Live Practice Feature Specification
- Designed comprehensive spec for `/dashboard/practice` route with 4 game modes: Tactical Puzzles, Practice vs Engine, Game Review, Student vs Student (Phase 2).
- Evaluated and recommended production stack: chess.js (logic), react-chessboard (UI), Stockfish.js (engine via Web Worker/WASM).
- Defined Stockfish difficulty mapping: Skill 0-2 (Learn tier), 3-6 (Play), 7-12 (Compete), 13-20 (Excel) with UCI_Elo targeting.
- Designed puzzle system sourcing 10,000 puzzles from Lichess open database (CC0), categorized by rating and 15 tactical themes.
- Implemented dual rating system (puzzle rating + game rating) using Glicko-2 algorithm with separate K-factors.
- Defined XP rewards: 10 XP per puzzle (first try), 25 XP per game win, puzzle-of-the-day 2x multiplier, streak bonuses (5/10/30 days).
- Created 16 chess-specific achievement badges (First Move → Master Candidate) tied to curriculum tiers.
- Specified data model: 7 Supabase tables (puzzles, puzzle_attempts, games, game_moves, ratings, rating_history, game_reviews) with RLS policies and GIN indexes for performance.
- Detailed UI/UX: responsive board sizing, tap-tap mobile controls, 8 sound effects, evaluation bar, notation panel, kid-friendly Learn tier design.
- Defined coach visibility features: view student games/puzzles, assign positions, add private notes, track tactical weaknesses.
- Integrated chess practice with parent dashboard: rating charts, term stats, milestone tracking, monthly email summaries.
- Cross-track Fusion Lab projects: Build Your Own Chess Bot (Python), AI Opening Trainer (ML), Puzzle Generator (Stockfish API).
- Deliverable: `.squad/decisions/inbox/livingston-chess-playground.md` — 45KB specification ready for Rusty to implement.

## Learnings

**Architecture Decisions:**
- **Web Worker + WASM for Stockfish:** Only viable approach for browser-based chess engine. Main thread blocking would destroy UX. Load lazily (1.2MB) with loading state.
- **PGN storage over JSONB move array:** PGN is portable, human-readable, and chess.js has built-in parsing. No need to reinvent the wheel. Store in TEXT column.
- **Separate puzzle rating and game rating:** Prevents conflation of tactical pattern recognition (puzzles) with strategic game skills. Industry standard (Lichess, Chess.com).
- **Glicko-2 over Elo:** Accounts for rating deviation and volatility. More accurate for players with <20 games. Lichess uses this.

**Key File Paths:**
- `/dashboard/practice` — Chess playground route (code-split, lazy load)
- `/lib/stockfish-worker.ts` — Web Worker wrapper for Stockfish UCI communication
- `/hooks/useStockfish.ts` — React hook for engine analysis (eval, best move)
- `/lib/chess/puzzle-import.ts` — Script to import Lichess CSV into Supabase `puzzles` table
- `/components/chess/ChessBoard.tsx` — Wrapper around react-chessboard with touch controls
- `/app/(dashboard)/practice/page.tsx` — Main playground page with mode selector

**User Preferences (Nairobi Context):**
- **Learn tier (5-8) needs heavy scaffolding:** Bigger pieces, cartoon design, no scary "rating" numbers (show "Level 3" instead), encouragement messages ("You're a chess superstar!").
- **Parents care about tangible outcomes:** Rating progression charts, term-over-term comparisons, benchmarks vs. age-tier average. Monthly email summaries are critical for retention.
- **Coaches need assignment tools:** Can't just be free-play. Coaches must be able to assign specific puzzles/positions and review student work with private notes.
- **Cross-track integration is a differentiator:** Fusion Lab projects (build a chess bot, train an opening AI) justify the "coding + AI + chess" premium positioning. This isn't just a chess academy.

**Performance Patterns:**
- **Bundle size matters:** chess.js (21KB) + react-chessboard (50KB) acceptable. Stockfish (1.2MB) MUST be lazy-loaded only when entering engine/review modes.
- **Database indexes are non-negotiable:** GIN index on `puzzles.themes` array, composite index on `puzzle_attempts(student_id, puzzle_id, created_at DESC)` for "already solved" check. Without these, queries will crawl at 1000+ students.
- **Real-time for multiplayer only:** Supabase Realtime subscriptions add latency overhead. Only use for student-vs-student mode. Puzzle/engine modes don't need it.

**Rating System Insights:**
- **400-800 rating (Learn tier) is realistic for ages 5-8:** Beginner kids hang pieces constantly. Stockfish Skill 0-2 (~800 ELO) is appropriate challenge.
- **1400 internal ≈ 1000-1200 FIDE:** Our internal rating will run ~200 points higher than real-world FIDE because we're not factoring in tournament nerves, time pressure psychology, etc. Need to set parent expectations in UI ("Your Cognitron rating translates to approximately...").
- **Separate K-factors for puzzles (20) vs games (32):** Puzzles are shorter, less indicative of overall skill. Lower K-factor prevents puzzle rating from swinging wildly.

**Puzzle Sourcing:**
- **Lichess database is a goldmine:** 3.8M puzzles, CC0 license, tagged with 50+ themes. We filter to 15 core themes and 10K puzzles across 4 tiers. Sufficient for years of usage.
- **Puzzle of the day drives engagement:** 2x XP + leaderboard = daily habit formation. Streak mechanics (5/10/30 days) create retention.

**Next Dependencies:**
- Rusty needs this spec to build the feature (ready to go)
- Linus should design high-fidelity board mockups (especially Learn tier kid-friendly version)
- Frank should write QA test plan for rating calculations and engine difficulty
- Dickson should approve Phase 2 timeline for student-vs-student multiplayer (not MVP)
