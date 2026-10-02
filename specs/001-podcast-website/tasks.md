---

description: "Task list template for feature implementation"
---

# Tasks: Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories),
research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included because quickstart.md validation scenarios (V2, V5, V6)
and Constitution V require `npm test` and `npm run test:e2e` to exist as
runnable gates — they are part of the delivered validation contract, not
optional TDD.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js static app: `src/app/`, `src/components/`, `src/data/`, `public/` at
  repository root (per plan.md Structure Decision)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js + TypeScript project per plan.md: create
  `package.json`, `next.config.ts` with `output: 'export'` and
  `images.unoptimized: true`, `tsconfig.json`, and `src/app/` skeleton
- [X] T002 [P] Configure Tailwind CSS v4 with design tokens (palette, type
  scale, spacing) in `src/app/globals.css` per research.md D2
- [X] T003 [P] Configure ESLint + Prettier gates (Constitution V) in
  `eslint.config.mjs` and `.prettierrc`
- [X] T004 [P] Configure Vitest + React Testing Library in
  `vitest.config.ts` and `tests/setup.ts` per research.md D7
- [X] T005 [P] Configure Playwright in `playwright.config.ts` with mobile and
  desktop projects per research.md D7

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data, layout, and components ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Define `Episode`, `ShowInformation`, `Host`, `FAQItem` TypeScript
  types in `src/data/types.ts` per data-model.md
- [X] T007 Create `src/data/episodes.ts` — single source of truth: exactly 20
  mock episodes, `showInfo`, `featuredEpisodeId` per data-model.md (FR-005,
  FR-001)
- [X] T008 [P] Create `src/data/faq.ts` with ≥ 6 FAQ items covering release
  schedule, subscription, and contact per data-model.md (FR-004, SC-006)
- [X] T009 [P] Generate placeholder episode artwork SVGs in
  `public/artwork/` — one per episode; landing hero reuses the featured artwork (FR-007, no
  external CDN)
- [X] T010 [P] Add short placeholder audio clips in `public/audio/` — one per
  episode per research.md D6
- [X] T011 Create root layout `src/app/layout.tsx`: self-hosted fonts via
  `next/font`, site metadata, `Navigation`, footer (FR-006, FR-007)
- [X] T012 Implement `Navigation` component in
  `src/components/Navigation.tsx` — same four links on every page (FR-006)
- [X] T013 Implement `AudioPlayer` component in
  `src/components/AudioPlayer.tsx`: native `<audio controls>` + visible
  error state on playback failure per research.md D6 (FR-010, FR-011)
- [X] T014 [P] Data validation unit tests in
  `tests/unit/data-validation.test.ts` enforcing data-model.md validation
  rules 1–7 (exactly 20 episodes, unique ids/numbers/dates, featured id
  resolves, assets exist, newest-first, ≥ 6 FAQ) (SC-007)

**Checkpoint**: Foundation ready — user story implementation can now begin
in parallel

---

## Phase 3: User Story 1 - Discover the Featured Episode (Priority: P1) 🎯 MVP

**Goal**: Landing page presents one featured episode with playback and
navigation to all other pages

**Independent Test**: Open `/` in isolation — featured episode with artwork,
title, description, working play control; nav reaches Episodes, About, FAQ

### Tests for User Story 1

- [X] T015 [P] [US1] Unit test `FeaturedEpisode` rendering in
  `tests/unit/featured-episode.test.tsx` (artwork alt, title, description,
  play control present)

### Implementation for User Story 1

- [X] T016 [P] [US1] Create `FeaturedEpisode` component in
  `src/components/FeaturedEpisode.tsx` (hero, artwork, metadata, `AudioPlayer`)
- [X] T017 [US1] Implement landing page in `src/app/page.tsx` wiring
  `FeaturedEpisode` + distinctive hero styling per FR-007 and quickstart V1
- [X] T018 [US1] Verify quickstart V1 on `/` at desktop and ≤ 375px widths:
  featured episode, playback, nav, keyboard access, no console errors

**Checkpoint**: User Story 1 fully functional and testable independently
(MVP — site now delivers discover-and-listen value)

---

## Phase 4: User Story 2 - Browse All Episodes (Priority: P2)

**Goal**: Episodes page lists exactly 20 episodes newest-first with details
and playback

**Independent Test**: Open `/episodes` directly — 20 complete entries,
selection reveals detail + working player

### Tests for User Story 2

- [X] T019 [P] [US2] Unit test episode list in
  `tests/unit/episode-list.test.tsx` (20 items, newest-first, unique numbers
  1–20, full metadata) (SC-007)

### Implementation for User Story 2

- [X] T020 [P] [US2] Create `EpisodeCard` component in
  `src/components/EpisodeCard.tsx` (number, title, date, duration, excerpt,
  artwork placeholder fallback)
- [X] T021 [US2] Implement episodes page in `src/app/episodes/page.tsx`
  listing 20 episodes newest-first per contracts/pages.md (FR-002, FR-012)
- [X] T022 [US2] Add in-page episode detail view + `AudioPlayer`
  integration in `src/app/episodes/page.tsx` per research.md D4
- [X] T023 [US2] Verify quickstart V2: 20 entries, ordering, playback,
  navigation round-trip with zero console errors

**Checkpoint**: User Stories 1 AND 2 both work independently

---

## Phase 5: User Story 3 - Learn About the Show (Priority: P3)

**Goal**: About page presents show premise and hosts with consistent branding

**Independent Test**: Open `/about` directly — premise, host(s), expectations
readable, styling matches landing page

### Implementation for User Story 3

- [X] T024 [P] [US3] Implement About page in `src/app/about/page.tsx` from
  `showInfo` (premise, hosts with name/role/bio) per FR-003 and
  contracts/pages.md
- [X] T025 [US3] Verify quickstart V3 About portion: content present,
  branding/typography consistent with `/`, responsive at ≤ 375px

**Checkpoint**: US1–US3 independently functional

---

## Phase 6: User Story 4 - Find Answers in the FAQ (Priority: P3)

**Goal**: FAQ page answers common questions as scannable Q/A pairs

**Independent Test**: Open `/faq` directly — ≥ 6 Q/A pairs, required topics
covered, readable on mobile

### Tests for User Story 4

- [X] T026 [P] [US4] Unit test FAQ rendering in `tests/unit/faq.test.tsx`
  (≥ 6 items, question visually distinct, topics for SC-006 present)

### Implementation for User Story 4

- [X] T027 [P] [US4] Create `FAQItem` component in
  `src/components/FAQItem.tsx` — question heading + associated answer
  (FR-004)
- [X] T028 [US4] Implement FAQ page in `src/app/faq/page.tsx` rendering
  `src/data/faq.ts` items per contracts/pages.md
- [X] T029 [US4] Verify quickstart V3 FAQ portion: ≥ 6 pairs, topics
  (schedule/subscribe/contact), mobile readable, no console errors

**Checkpoint**: All user stories independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Constitution gates and cross-story quality (Constitution II, III, V)

- [X] T030 [P] Add per-page metadata (title, description) exports in
  `src/app/*/page.tsx` and `src/app/layout.tsx`
- [X] T031 [P] Responsive sweep across all four routes (`src/app/page.tsx`,
  `src/app/episodes/page.tsx`, `src/app/about/page.tsx`,
  `src/app/faq/page.tsx`) at 320px → desktop: remove horizontal scroll,
  verify fluid type/spacing (FR-008, edge cases)
- [X] T032 [P] Accessibility sweep: alt text on all images, WCAG 2.1 AA
  contrast, semantic landmarks, visible focus states (FR-009)
- [X] T033 Implement E2E suite in `tests/e2e/smoke.spec.ts` covering
  quickstart V1–V3 journeys plus `@axe-core/playwright` scans on all four
  routes (quickstart V5, SC-004)
- [X] T034 Verify quickstart V4 no-JS readability: all text, links, and
  native audio controls present in served HTML of `out/` (FR-011)
- [X] T035 Performance pass: Lighthouse LCP < 2.5s on simulated slow-4G for
  all routes (`out/index.html` + flat `out/episodes.html`, `out/about.html`, `out/faq.html`); optimize
  `public/artwork/`, `public/audio/`, and fonts if over budget
  (Constitution III, SC-003)
- [X] T036 Final gates: run `npm run lint`, `npm run format:check`, `npm test`, `npm run build`;
  audit `out/` for static-only output, no secrets, no ungated external
  origins (quickstart V6, Constitution I/IV/V)
- [X] T037 [P] Create `README.md` with setup, dev, test, build, and static
  deploy instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user
  stories (shared data, layout, nav, player)
- **User Story 1 (Phase 3)**: Depends on Foundational — MVP
- **User Story 2 (Phase 4)**: Depends on Foundational; uses T018-proven nav
  but no code dependency on US1
- **User Story 3 (Phase 5)**: Depends on Foundational only
- **User Story 4 (Phase 6)**: Depends on Foundational only
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: After Foundational — no dependencies on other stories
- **US2 (P2)**: After Foundational — independent of US1 (may link to featured
  episode but is independently testable)
- **US3 (P3)**: After Foundational — independent of US1/US2
- **US4 (P3)**: After Foundational — independent of US1/US2/US3

### Within Each User Story

- Tests first (fail before implementation) where tests are included
- Components before pages
- Page wiring before story verification (quickstart V-scenario)
- Story checkpoint before moving to next priority

### Parallel Opportunities

- Setup: T002, T003, T004, T005 all parallel after T001
- Foundational: T008, T009, T010 parallel; T014 parallel once T006–T010 exist
- US1: T015 (test) ∥ T016 (component)
- US2: T019 (test) ∥ T020 (component)
- US4: T026 (test) ∥ T027 (component)
- US3 and US4 phases can run concurrently with each other (separate files)
- Polish: T030, T031, T032 parallel

---

## Parallel Example: User Story 1

```bash
# Launch together (different files, no dependencies):
Task: "Unit test FeaturedEpisode in tests/unit/featured-episode.test.tsx"
Task: "Create FeaturedEpisode component in src/components/FeaturedEpisode.tsx"

# Then sequentially:
Task: "Implement landing page in src/app/page.tsx"
Task: "Verify quickstart V1"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: quickstart V1 on `/` at mobile + desktop
5. Deploy `out/` if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → verify V1 → deploy/deliver (MVP!)
3. Add US2 → verify V2 → deliver
4. Add US3 and US4 (parallelizable) → verify V3 → deliver
5. Polish phase → verify V4–V6 → final delivery

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (P1, MVP path)
   - Developer B: US2 (P2)
   - Developer C: US3 + US4 (P3, smallest)
3. Stories complete and verify independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable (no cross-story
  code dependencies; all share only Foundational phase artifacts)
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Every task names exact file paths; data lives ONLY in `src/data/` — never
  duplicate episode/FAQ content (Constitution IV single source of truth)
