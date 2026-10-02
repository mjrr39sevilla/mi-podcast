# Phase 0: Research — Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Input**: plan.md Technical Context; spec.md; constitution v1.0.0

All Technical Context unknowns are resolved below. No NEEDS CLARIFICATION
markers remain.

## D1. Static delivery with Next.js

**Decision**: Use Next.js App Router with `output: 'export'` in
`next.config.ts`. Disable every server-only feature: no API routes, no
middleware, no ISR/revalidation, no server actions. `next build` emits a
plain `out/` directory deployable to any static host.

**Rationale**: User mandated "Next.js with static site configuration, no
databases". Satisfies Constitution I (Static-Only) — output is plain
HTML/CSS/JS with no runtime.

**Alternatives considered**:
- Vite + vanilla/React SPA — rejected: user explicitly chose Next.js;
  prerendered HTML also required for FR-011 (JS-off readability).
- Next.js server rendering — rejected: violates Constitution I.

## D2. Styling approach

**Decision**: Tailwind CSS (v4, zero-config Next.js integration) plus a small
set of custom design tokens (CSS custom properties for palette, type scale,
spacing) in `globals.css`. No runtime CSS-in-JS.

**Rationale**: Utilities make the responsive/elegant design consistent across
four pages with minimal authored CSS; emitted CSS is static and small
(Constitution III). Design tokens enforce the cohesive, distinctive identity
required by FR-007.

**Alternatives considered**:
- CSS Modules — rejected: more boilerplate for a multi-page design system;
  still viable fallback if Tailwind is rejected during implementation.
- styled-components / emotion — rejected: runtime cost and hydration overhead
  work against Constitution III and JS-off requirements.
- Full component library (MUI, Chakra) — rejected: heavy bundle, generic
  look — directly contrary to "stand out" requirement (FR-007).

## D3. Mock data strategy

**Decision**: All 20 episodes live in a single typed TypeScript module
`src/data/episodes.ts`, exporting `episodes: Episode[]`, `getFeaturedEpisode()`
(lookup by constant id), and `showInfo`. No fetch calls, no feed parsers,
no CMS, no database. Artwork: locally generated SVG/gradient images in
`public/artwork/`; audio: short local placeholder clips in `public/audio/`.

**Rationale**: User: "data is embedded in the content for the mock episodes."
Constitution IV mandates a single source of truth — one module prevents
duplication across pages. Constitution IV also frowns on ungated external
resources; local assets guarantee graceful behavior offline.

**Alternatives considered**:
- Markdown/MDX content files — rejected: 20 flat records need structure, not
  prose; a typed module gives compile-time validation (data-model.md).
- External RSS/JSON feed — rejected: user explicitly said no real feed
  (FR-005).
- JSON files in `public/` + client fetch — rejected: violates single source
  of truth (multiple loading paths) and JS-off readability (FR-011).

## D4. Routing & page structure

**Decision**: Four App Router routes, all statically prerendered:
`/` (landing/featured), `/episodes`, `/about`, `/faq`. Shared root layout
provides `Navigation`, footer, self-hosted fonts, and page metadata.
Episode details render inline on `/episodes` (selection state), keeping the
route count at the spec's four pages.

**Rationale**: Matches spec scope (Assumption: exactly four pages). Layout
reuse keeps branding consistent (FR-007); full prerendering satisfies
FR-011 and SC-003.

**Alternatives considered**:
- Per-episode routes `/episodes/[slug]` — deferred: not required by spec;
  can be added later without breaking this plan.
- Hash-based single-page app — rejected: weaker JS-off behavior, worse
  deep-link semantics (edge cases require deep links to work).

## D5. Images & artwork in a static export

**Decision**: Configure `images.unoptimized: true` (the Next.js image
optimizer requires a server). Serve locally generated SVG artwork with
explicit width/height and `alt` text; lazy-load below-the-fold images.

**Rationale**: Static export cannot run `/_next/image` optimization;
`unoptimized` is the documented path. Local SVGs are tiny and crisp at every
viewport (Constitution III).

**Alternatives considered**:
- next/image with default optimizer — rejected: unavailable without server.
- External image CDN — rejected: Constitution IV requires external resources
  to degrade gracefully; local assets trivially comply.
- Photography placeholders — rejected: adds payload, licensing concerns.

## D6. Audio playback without a backend

**Decision**: Ship short placeholder WAV clips under `public/audio/` (swappable for MP3/OGG at content time) and
use the native `<audio controls>` element (lightly styled wrapper
`AudioPlayer`). Playback requires no JavaScript beyond the browser's built-in
player.

**Rationale**: FR-010 (play/pause/seek + visible error state via the `error`
event) and FR-011 (JS-off: playback still works, content always readable).
Native controls are keyboard accessible out of the box (FR-009).

**Alternatives considered**:
- Custom JS player (Wavesurfer, Howler) — rejected: JS dependency for a
  constitution-critical path; extra bundle weight.
- Streaming endpoints — rejected: no server (Constitution I).

## D7. Testing, linting, and quality gates

**Decision**:
- **Unit**: Vitest + React Testing Library for components and data
  validation (exactly 20 episodes, unique sequential numbers — SC-007).
- **E2E**: Playwright smoke covering the four quickstart journeys
  (SC-001/002/004/006) plus `@axe-core/playwright` scans (FR-009).
- **Lint/format**: ESLint (Next.js config) + Prettier — Constitution V gate.
- **Console errors**: Playwright fails on browser console errors
  (Constitution V workflow).

**Rationale**: Vitest/Playwright are the de-facto standards for Next.js;
axe gives objective WCAG 2.1 AA evidence (Constitution II).

**Alternatives considered**:
- Cypress — rejected: heavier for a four-page smoke suite.
- No e2e — rejected: quickstart mandates browser validation across
  mobile + desktop widths.

## D8. Responsive & performance technique

**Decision**: Mobile-first breakpoints (Tailwind defaults), fluid type scale
via `clamp()`, self-hosted fonts through `next/font` (no external font CDN),
critical content server-prerendered, no client-side data fetching anywhere.
Budget: LCP < 2.5s slow-4G verified with Lighthouse in quickstart.

**Rationale**: Directly implements Constitution III and SC-003; `next/font`
eliminates render-blocking third-party font requests (Constitution IV).

**Alternatives considered**:
- Google Fonts `<link>` — rejected: external dependency, render-blocking.
- Client-side rendering of episode lists — rejected: breaks FR-011 and
  hurts LCP.

## NEEDS CLARIFICATION resolution log

None opened — the user message (Next.js static config, embedded mock data,
no databases, responsive/mobile) resolved all Technical Context unknowns.
