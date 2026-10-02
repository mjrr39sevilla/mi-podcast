# Testing Checklist: Podcast Website

**Purpose**: Validate test coverage and quality of the implemented feature
**Created**: 2026-10-02
**Feature**: [spec.md](../spec.md)

## Unit Tests (Vitest + Testing Library) — 28 passing

- [x] Episode data validation (shape, required fields, ordering, uniqueness)
- [x] Date/duration formatters (`lib/format.ts`: ISO→en-US, min/hr edge cases)
- [x] Landing featured episode (content, player, browse link)
- [x] Episode list (renders 20 rows, expand/collapse metadata)
- [x] FAQ (≥6 items, question/answer rendering)
- [x] AudioPlayer error state (FR-010: media failure → visible alert)
- [x] Artwork failure state (edge case: branded placeholder, layout intact)
- [x] aria-labels and accessible names asserted in component queries

## End-to-End Tests (Playwright) — 20 passing

- [x] Quickstart V1: landing → featured play → browse episodes
- [x] Quickstart V2: episode catalogue reaches all 20 episodes, playback
- [x] Quickstart V3: about + faq content reachable and complete
- [x] Quickstart V4: JavaScript-disabled navigation and audio present
- [x] Quickstart V5: axe clean on all 4 routes; keyboard reaches nav + player
- [x] SC-007: `<title>` + meta description asserted on all 4 routes (e2e)
- [x] Quickstart V6: static-output audit (no server code/secrets/external origins)
- [x] Deep links direct-load (no client router dependency)
- [x] Desktop + Pixel 7 viewport profiles (320px+ included)

## Constitution / Quality Gates

- [x] `npm run lint` — 0 errors, 0 warnings
- [x] `npm run format:check` — all files Prettier-clean
- [x] `npm run build` — static export succeeds (postbuild payload fix)
- [x] No console errors on any route (asserted in e2e)

## Known Gaps / Follow-ups

- [ ] Visual regression testing (screenshots) — not set up; design reviewed manually
- [ ] Cross-browser e2e (Firefox/WebKit) — chromium only; `playwright install` extras needed
- [ ] SC-005 design rating ≥ 4/5 — requires human reviewers
- [ ] Real-device performance validation (SC-003) — lab metrics only; see plan.md perf notes

## Notes

- Coverage assessment drove two additions during review: `format.test.ts` and
  `audio-player.test.tsx` (previously untested paths).
- jsdom does not expose ARIA roles for native media elements; audio tests
  assert via element/attribute queries instead of `getByRole`.
