# Phase 1: Contracts — Podcast Website (UI / Route Contracts)

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Type**: UI contracts for a static web application (no external APIs —
Constitution I). Each contract item traces to spec FR/SC ids.

## Route Contracts

All routes are statically generated; each MUST render complete HTML with no
client-side data fetching.

### `GET /` — Landing (FR-001, SC-001)

| Element | Contract |
|---------|----------|
| Featured episode | Exactly one episode rendered with artwork (with `alt`), title, description, duration, release date |
| Play control | Native `<audio controls>` bound to featured episode's `audioSrc`; visible error state on playback failure (FR-010) |
| Navigation | Links to `/`, `/episodes`, `/about`, `/faq` — reachable from this page (FR-006) |
| Hero styling | Branded, distinctive presentation per design tokens (FR-007) |

### `GET /episodes` — Episodes (FR-002, FR-012, SC-007)

| Element | Contract |
|---------|----------|
| Episode list | Exactly 20 items, newest-first, each showing number, title, release date, duration, excerpt |
| Item interaction | Selecting an episode reveals full detail + play control in-page (Assumption: no separate detail route) |
| Ordering | Unique sequential numbers; descending dates |
| Empty/missing states | Not reachable with embedded data; artwork failure → branded placeholder (edge case) |

### `GET /about` — About (FR-003)

| Element | Contract |
|---------|----------|
| Content | Show premise, ≥ 1 host with name/role/bio, listener expectations |
| Consistency | Same nav, typography, palette tokens as other routes (FR-007) |

### `GET /faq` — FAQ (FR-004, SC-006)

| Element | Contract |
|---------|----------|
| Items | ≥ 6 question/answer pairs; question visually distinct; answer always associated (expanded or expandable) |
| Required topics | Release schedule, how to subscribe, how to make contact (SC-006) |

## Global Contracts (every route)

| Contract | Requirement | Source |
|----------|-------------|--------|
| Navigation | Identical nav links on all four routes | FR-006 |
| Responsive | Usable at 320px → desktop; no horizontal scroll | FR-008 |
| Accessibility | Semantic landmarks, keyboard operability, WCAG 2.1 AA contrast, alt text on all images | FR-009, SC-004 |
| No-JS | All text content, links, and native audio controls present in served HTML | FR-011 |
| Errors | No browser console errors on load or interaction | Constitution V |
| Performance | LCP < 2.5s simulated slow-4G | Constitution III, SC-003 |

## Component Contracts (selected)

```text
FeaturedEpisode(episode: Episode) -> hero section with play control
EpisodeCard(episode: Episode) -> number, title, date, duration, excerpt, artwork (expand via native <details>, no onSelect callback)
AudioPlayer(src: string, label: string) -> <audio controls> + error-state UI (FR-010)
Navigation() -> fixed four-item nav, identical on every page (FR-006)
FAQItem(item: FAQItem) -> question heading + associated answer (FR-004)
```

`Episode`, `ShowInformation`, `FAQItem` shapes are specified in
[data-model.md](../data-model.md).

## Explicit Non-Contracts

No HTTP APIs, webhooks, auth, or third-party integrations exist — anything
not listed above is out of scope for v1 (spec Assumptions).
