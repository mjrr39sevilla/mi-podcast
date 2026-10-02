<!-- Sync Impact Report
- Version change: (unfilled template) → 1.0.0
- Modified principles: [PRINCIPLE_1..5] (template placeholders) → 3 principles
  (I. Static-Only Delivery, II. Accessibility & Responsiveness,
  III. Lightweight & Fast). Count reduced from template's 5 slots to the bare
  minimum requested for a static web app.
- Added sections: none beyond template slots; SECTION_2 → "Additional
  Constraints", SECTION_3 → "Development Workflow".
- Removed sections: unused template slots PRINCIPLE_4/PRINCIPLE_5 merged away;
  example comments removed once replaced.
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (Constitution Check gate text is
    generic; aligns with Governance gate wording — no edit needed)
  - .specify/templates/spec-template.md ✅ (no constitution-mandated spec
    sections added)
  - .specify/templates/tasks-template.md ✅ (optional-tests policy unchanged;
    workflow quality gates covered by setup/polish tasks)
  - .specify/templates/commands/*.md ✅ (all references generic, no
    agent-specific names)
  - README.md / docs/quickstart.md ⚠ pending — files do not exist yet; create
    them referencing this constitution when docs are added
- Follow-up TODOs: none; RATIFICATION_DATE set to first adoption date
  (2026-10-02).
-->

# mi-podcast Constitution

## Core Principles

### I. Static-Only Delivery (NON-NEGOTIABLE)

- The deliverable MUST be a static web app: HTML, CSS, and client-side
  JavaScript only.
- No server-side runtime, application server, or database MAY be required to
  serve the site. If a build step is used, it MUST output plain static files.
- The built output MUST deploy to any static host (GitHub Pages, Netlify, S3,
  plain nginx) without modification.

Rationale: Static hosting is cheap, auditable, and nearly zero-ops; this rule
prevents accidental backend creep in a project that does not need one.

### II. Accessibility & Responsiveness

- Every page MUST be usable on both mobile and desktop viewports.
- HTML MUST be semantic; images MUST have alt text; text contrast MUST meet
  WCAG 2.1 AA.
- Core content (episode titles, descriptions, links) MUST be readable with
  JavaScript disabled; interactive behavior (audio playback, filtering) MAY
  require JavaScript but MUST degrade to readable content when scripts fail.

Rationale: Podcast listeners browse on varied devices and networks; accessible,
responsive markup is a baseline product requirement, not an enhancement.

### III. Lightweight & Fast

- Every third-party dependency MUST be justified in the plan; prefer vanilla
  implementations when they meet the requirement.
- Pages MUST avoid render-blocking resources and meet a performance budget of
  LCP < 2.5s on a simulated slow-4G mobile profile.
- Images and audio MUST be compressed and served in modern formats/sizes.

Rationale: Most visitors arrive on mobile networks; performance directly affects
consumption of the content the site exists to deliver.

## Additional Constraints

- No secrets, API keys, or private data MAY be committed to the repo or shipped
  in client-side code — everything in the built output is public.
- External resources (CDNs, embedded players, fonts) MUST degrade gracefully
  when blocked or offline and MUST NOT gate core content.
- Episode/content data MUST have a single source of truth (feed or data files);
  duplicated hand-maintained copies across pages are forbidden.

## Development Workflow

- Every change MUST pass the project lint/format checks before commit.
- Before delivery, the site MUST be smoke-tested in a browser at mobile and
  desktop widths, and pages MUST load with no console errors.
- Each feature MUST be verified against its spec's acceptance scenarios before
  it is considered done.

## Governance

- This constitution supersedes all other practices and templates; conflicts
  MUST be resolved in favor of this document.
- Amendments MUST update the Sync Impact Report above, bump the version per
  semantic rules (MAJOR: principle removal/redefinition; MINOR: new principle
  or materially expanded guidance; PATCH: wording/clarification only), and
  propagate changes to dependent templates in the same change.
- Every plan MUST pass the Constitution Check gate before Phase 0 research and
  re-check after Phase 1 design; violations MUST be fixed or explicitly
  justified in the plan's Complexity Tracking table.
- All implementation work MUST be checked against these principles at spec,
  plan, and task-generation time; discovered violations are CRITICAL and block
  until resolved or formally amended here.
- Runtime development guidance lives in `AGENTS.md`, which points at the active
  plan.

**Version**: 1.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
