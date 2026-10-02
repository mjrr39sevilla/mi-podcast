# Phase 1: Data Model — Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Source**: spec.md "Key Entities" + FR-001/002/005/012; research.md D3

All entities are immutable, embedded, and defined once in
`src/data/episodes.ts` (constitution single source of truth). No persistence
layer, no state transitions — data is read-only at runtime.

## Entity: Episode

The unit of content; exactly 20 instances exist.

| Field | Type | Constraints (validation rules) |
|-------|------|-------------------------------|
| `id` | string | Unique; kebab-case slug (e.g. `ep-020-future-of-audio`); stable for the site's lifetime |
| `number` | integer | Unique; 1–20; list ordered newest-first by `releaseDate`, numbering must read as sequential (FR-012, SC-007) |
| `title` | string | Non-empty; ≤ 80 chars |
| `description` | string | Non-empty; ≤ 500 chars; full text shown on detail view |
| `shortDescription` | string | Non-empty; ≤ 160 chars; list/card excerpt |
| `releaseDate` | string (ISO `YYYY-MM-DD`) | Valid date; unique across episodes; descending order defines "newest-first" |
| `durationSeconds` | integer | > 0; ≤ 7200 (2h cap); rendered humanized (`53 min`, `1 hr 30 min`) |
| `audioSrc` | string | Relative path to `/public/audio/*` file that MUST exist |
| `artworkSrc` | string | Relative path to `/public/artwork/*` file that MUST exist |
| `artworkAlt` | string | Non-empty (FR-009 alt-text rule) |

**Relationships**: `featuredEpisode` is a single `Episode` referenced by id
from `showInfo` — MUST resolve to one of the 20 instances (FR-001).

## Entity: ShowInformation

Podcast identity used on Landing and About pages (one instance).

| Field | Type | Constraints |
|-------|------|-------------|
| `title` | string | Non-empty; used in site metadata and nav |
| `tagline` | string | Non-empty; ≤ 100 chars; landing hero support text |
| `description` | string | Non-empty; podcast premise (FR-003) |
| `hosts` | array of `Host` | ≥ 1 entry |
| `featuredEpisodeId` | string | MUST match an existing `Episode.id` |

### Entity: Host (value object of ShowInformation)

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | string | Non-empty |
| `role` | string | Non-empty (e.g. "Host & Producer") |
| `bio` | string | Non-empty; ≤ 300 chars |
| `avatarAlt` | string | Non-empty (FR-009) |

## Entity: FAQItem

One question-answer pair on the FAQ page; ≥ 6 instances (FR-004).

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | string | Unique; kebab-case |
| `question` | string | Non-empty; ≤ 120 chars |
| `answer` | string | Non-empty; ≤ 600 chars; must cover release schedule, subscription, and contact topics (SC-006) |

## Validation Rules (enforced at build/test time)

1. `episodes.length === 20` exactly (FR-002, SC-007).
2. `number`, `id`, `releaseDate` are unique across all episodes.
3. `featuredEpisodeId` resolves to an existing episode (FR-001).
4. Every `audioSrc` / `artworkSrc` points to an existing file in `public/`.
5. `episodes` sorted by `releaseDate` descending before rendering
   (newest-first, FR-012).
6. `faq.length >= 6` (FR-004).
7. All string constraints above hold (tested by unit tests — research D7).

## State Transitions

None. Data is static after build; the only runtime state is ephemeral UI
state (selected episode on `/episodes`, native audio player position) which
is not persisted and requires no model.
