# Implementation Plan: Podcast Website

**Branch**: `001-podcast-website` | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

## Summary

Build an elegant, distinctive, fully responsive podcast website with four pages
(Landing with one featured episode, Episodes with exactly 20 mocked episodes,
About, FAQ) as a statically exported Next.js site. All episode data lives in a
single embedded typed data module — no databases, no feeds, no server runtime.
Accessibility (WCAG 2.1 AA, keyboard, JS-off readability) and a LCP < 2.5s
performance budget are enforced by the project constitution.

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js (App Router) — per user:
Next.js with static site configuration

**Primary Dependencies**: Next.js (static export), React, Tailwind CSS
(decided in research.md; zero-runtime styling), see
[research.md](./research.md) for justification of every dependency

**Storage**: N/A — no databases; all 20 episodes embedded as typed data in the
repository (user constraint, FR-005)

**Testing**: Vitest + React Testing Library (units), Playwright (end-to-end
smoke + axe accessibility checks) — see [research.md](./research.md) D7

**Target Platform**: Static hosting; modern mobile & desktop browsers
(responsive, user-confirmed)

**Project Type**: web app (static site via Next.js `output: 'export'`)

**Performance Goals**: LCP < 2.5s on simulated slow-4G (constitution III);
pages readable within 3s (SC-003)

**Constraints**: Constitution v1.0.0 — static-only, WCAG 2.1 AA, no secrets in
output, no ungated external CDN dependencies, single source of truth for
episode data

**Scale/Scope**: 4 pages, 20 mocked episodes, 1 featured episode, ~6+ FAQ
items; no auth, no user data, no backend

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle / Constraint | Gate | Status |
|---|------------------------|------|--------|
| I | Static-Only Delivery | Output MUST be plain static files; no server runtime, API routes, middleware, or ISR | ✅ PASS — Next.js static export (`output: 'export'`), no server features |
| II | Accessibility & Responsiveness | Semantic HTML, alt text, WCAG 2.1 AA contrast, keyboard operable, responsive, core content readable without JS | ✅ PASS — prerendered HTML for all content; native `<audio controls>`; responsive enforced (FR-008/009/011) |
| III | Lightweight & Fast | Every dependency justified; LCP < 2.5s slow-4G; compressed modern assets | ✅ PASS — deps justified in research.md D1–D7; local SVG artwork; self-hosted fonts |
| IV | Additional Constraints | No secrets in client output; external resources degrade gracefully; single source of truth for episode data | ✅ PASS — one typed `data/episodes.ts` module; no third-party CDNs |
| V | Development Workflow | Lint/format gate, browser smoke test at mobile+desktop widths, no console errors, verified vs spec acceptance scenarios | ✅ PASS — encoded as setup/polish tasks and quickstart.md validation scenarios |

**Gate result**: No violations; no Complexity Tracking entries required.

**Post-design re-check (Phase 1)**: PASS — static export, embedded data
module, local assets, native audio, and prerendered HTML in
research.md/data-model.md/contracts preserve every gate above; still no
violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md                  # This file
├── spec.md                  # Feature specification
├── research.md              # Phase 0 output
├── data-model.md            # Phase 1 output
├── quickstart.md            # Phase 1 output
├── contracts/
│   └── pages.md             # Phase 1 output (UI/route contracts)
├── checklists/
│   └── requirements.md      # Spec quality checklist
└── tasks.md                 # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Root layout: nav, footer, fonts, metadata
│   ├── page.tsx             # Landing page (featured episode)
│   ├── episodes/page.tsx    # Episodes page (20 episodes)
│   ├── about/page.tsx       # About page
│   └── faq/page.tsx         # FAQ page
├── components/
│   ├── EpisodeCard.tsx      # Episode list item
│   ├── FeaturedEpisode.tsx  # Landing hero
│   ├── Artwork.tsx          # Artwork + branded failure placeholder
│   ├── AudioPlayer.tsx      # Native audio wrapper
│   ├── Navigation.tsx       # Site nav (all pages)
│   └── FAQItem.tsx          # Question/answer pair
├── data/
│   ├── types.ts             # Episode / ShowInformation / FAQItem interfaces
│   ├── episodes.ts          # Single source of truth: 20 episodes + show info
│   └── faq.ts               # Single source of truth: FAQ Q/A pairs
├── lib/
│   └── format.ts            # formatDate / formatDuration helpers
├── app/
│   └── globals.css          # Tailwind entry + design tokens
└── (tests under tests/unit, tests/e2e)

public/
├── audio/                   # Placeholder episode audio files
└── artwork/                 # Episode artwork (local, no external CDN)

next.config.ts               # output: 'export', images.unoptimized: true
vitest.config.ts
playwright.config.ts
```

**Structure Decision**: Single Next.js project (Option 1 — static site, no
backend/frontend split). All content under `src/app` routes; episode data in
`src/data/episodes.ts` as the constitution-mandated single source of truth.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations — table intentionally empty.
