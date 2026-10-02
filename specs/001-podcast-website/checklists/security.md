# Security Checklist: Podcast Website

**Purpose**: Validate security posture of the static podcast website
**Created**: 2026-10-02
**Feature**: [spec.md](../spec.md)

## Secrets & Data

- [x] No API keys, tokens, passwords, or secrets in source (audited)
- [x] No secrets present in exported `out/` (pattern scan: 0 matches)
- [x] No user data collected, stored, or transmitted (no forms, no cookies, no analytics)
- [x] All content is public mock data from `src/data/` (single source of truth)

## Injection & Code Safety

- [x] No `dangerouslySetInnerHTML`, `eval`, or `new Function` anywhere in `src/`
- [x] No user-controlled input rendered (static content only)
- [x] JSX text escaping covers all rendered content (React auto-escapes;
      literal apostrophes written as `&apos;` in AudioPlayer)
- [x] External links (if any) use `rel` defaults; no `target=_blank` tab-nabbing surface

## Supply Chain

- [x] `npm audit --omit=dev` — 0 vulnerabilities
- [x] `package-lock.json` committed; installs reproducible
- [x] No runtime CDNs or third-party origins (constitution): fonts, artwork,
      scripts, audio all served from same origin
- [x] Exported HTML external-origin scan — 0 matches

## Static Hosting Surface

- [x] No server code, env files, or `.map` sources shipped in `out/` (0 matches)
- [x] No `.env*` files in repository
- [x] Directory traversal impossible (no server; flat static files only)

## Headers & Transport (deploy-time — cannot be set by the app)

- [ ] HSTS / `Content-Security-Policy` / `X-Content-Type-Options` headers —
      must be configured by the hosting platform (GitHub Pages, Netlify,
      nginx). Recommendation: strict CSP with `default-src 'self'`.
- [ ] HTTPS enforcement — hosting platform responsibility

## Notes

- Static export removes entire classes of server-side risk (no DB, no auth,
  no request handling). Residual risk is limited to dependencies and hosting
  configuration.
- Header items are intentionally unchecked: the app ships no server runtime
  (constitution I), so these are documented as deploy-platform obligations
  in the deployment target configuration, not code.
