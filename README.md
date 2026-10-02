# Midnight Ink — Podcast Website

An elegant, responsive, statically exported podcast website: landing page
with a featured episode, an Episodes catalogue (20 mock episodes), About,
and FAQ. All data is embedded — no databases, no feeds, no server runtime.

Built with Next.js (static export), TypeScript, and Tailwind CSS.

## Requirements

- Node.js ≥ 20

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:3000
npm run lint       # ESLint (quality gate)
npm run format:check # Prettier formatting check
npm test           # unit tests (Vitest): data validation + components
npm run build      # static export → out/ (+ RSC payload flatten fix)
npm run test:e2e   # Playwright E2E + axe accessibility (needs build first)
npm run format     # format the repository
```

## Serving the Static Build

```bash
npx serve out      # any static host works: GitHub Pages, Netlify, S3, nginx
```

`npm run build` emits a fully self-contained `out/` directory. A `postbuild`
step (`scripts/flatten-rsc-payloads.mjs`) works around a Next.js 16.3 static
export bug where RSC prefetch files are written nested but requested flat.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` runs on pushes to `main` and:

1. Runs lint, Prettier check, and unit tests
2. Builds at root path and runs the Playwright E2E suite
3. Rebuilds with `NEXT_PUBLIC_BASE_PATH=/<repo>` (Pages project sites serve
   from a subpath; `*.github.io` repos get an empty base path automatically)
4. Publishes `out/` via `actions/deploy-pages`

One-time repo setup: **Settings → Pages → Source: GitHub Actions**.

The base path is applied by `next.config.ts` and `src/lib/paths.ts`
(`withBase` for raw `<audio>`/`<img>` sources); `next/link` and metadata
handle themselves; font URLs in CSS are relative.

## Project Layout

- `src/app/` — routes: `/`, `/episodes`, `/about`, `/faq`
- `src/components/` — UI components (Navigation, FeaturedEpisode,
  EpisodeCard, Artwork, AudioPlayer, FAQItem)
- `src/lib/` — shared helpers (`format.ts`)
- `src/data/` — single source of truth: 20 mock episodes, show info, FAQ
  (constitution rule: never duplicate content)
- `public/artwork/`, `public/audio/` — local placeholder assets (no CDNs)
- `tests/unit/` — Vitest · `tests/e2e/` — Playwright + axe
- `specs/001-podcast-website/` — spec, plan, research, tasks, quickstart

## Governance

Project principles live in `.specify/memory/constitution.md` (v1.0.0):
static-only, WCAG 2.1 AA accessibility, responsive, lightweight
(LCP budget), single source of truth for content.

Validation scenarios: `specs/001-podcast-website/quickstart.md` (V1–V6).
