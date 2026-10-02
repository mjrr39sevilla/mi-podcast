# Quickstart: Podcast Website (Validation Guide)

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Purpose**: Runnable checks proving the feature works end-to-end before
delivery. References [contracts/pages.md](./contracts/pages.md) and
[data-model.md](./data-model.md) instead of duplicating them.

## Prerequisites

- Node.js ≥ 20 installed
- Repository root as working directory
- No environment variables or secrets required (Constitution IV)

## Setup & Build

```bash
npm install          # install dependencies
npm run lint         # Constitution V gate: ESLint
npm run format:check # Constitution V gate: Prettier formatting
npm test             # unit tests: data validation + components (Vitest)
npm run build        # static export → out/ directory (Next.js output: 'export')
```

**Expected**: `lint` and `test` exit 0; `build` produces `out/` containing
`index.html`, `episodes.html`, `about.html`, `faq.html` —
proof of Constitution I (static-only).

## Serve Locally

```bash
npx serve out         # clean-URL aware; `python -m http.server` cannot route /episodes
```

Open `http://localhost:3000` (or printed port).

## Validation Scenarios

Run each in a desktop viewport and a mobile viewport (≤ 375px wide).

### V1 — Landing & featured episode (spec US1, SC-001)

1. Open `/`.
2. **Expect**: exactly one episode featured with artwork, title, description,
   date, duration; play control present; nav shows all four pages.
3. Press play → audio starts; pause/seek work; keyboard Tab reaches the
   control (FR-009, SC-004).
4. **Timing**: content readable < 3s on throttled "Slow 4G" (SC-003);
   Lighthouse LCP < 2.5s.

### V2 — Episodes catalogue (spec US2, SC-007)

1. Open `/episodes`.
2. **Expect**: exactly 20 entries, newest-first, unique numbers 1–20, every
   entry shows number/title/date/duration/description excerpt.
3. Select any episode → full detail + play control appear; audio plays.
4. Navigate away and back via nav → no console errors (FR-006, V-contract).

### V3 — About & FAQ (spec US3/US4, SC-006)

1. Open `/about` → premise, host(s), expectations render; branding matches
   landing page.
2. Open `/faq` → ≥ 6 Q/A pairs; answers cover release schedule, subscription,
   contact; each question visually distinct.

### V4 — No-JS readability (FR-011)

1. Disable JavaScript in devtools (or `curl` the built HTML).
2. **Expect**: all page text, nav links, and native audio controls present in
   the raw HTML for all four routes.

### V5 — Accessibility (FR-009, SC-004)

```bash
npm run test:e2e     # Playwright + @axe-core/playwright across 4 routes
```

**Expect**: zero axe violations (critical/serious); all four core journeys
completable by keyboard only.

### V6 — Static output audit (Constitution I, IV)

1. Inspect `out/`: no server code, no API routes, no secrets.
2. Grep built HTML for external origins: only intentional, self-degrading
   references (ideally none).
3. Broken artwork/audio references → build/unit tests fail (data-model
   validation rules 4).

## Pass Criteria

All scenarios V1–V6 pass with zero console errors → feature verified against
spec acceptance scenarios (Constitution V) and ready for delivery.

## Out of Scope for This Guide

Implementation code, full test suites, and deployment configuration details
belong to `tasks.md` and the implementation phase.
