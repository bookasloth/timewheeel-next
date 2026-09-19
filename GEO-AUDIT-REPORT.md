# GEO + SEO Audit — Timewheel

**Site:** https://timewheel.co.in
**Scope:** All routes (31 static pages + dynamic blog & case-study routes)
**Date:** 2026-09-18
**Stack:** Next.js 16.3.1 (App Router, Turbopack, SSR)

---

## Composite GEO Score: 79 / 100  (was ~68 before fixes)

| Category | Weight | Score | Notes |
|---|---|---|---|
| AI Citability & Visibility | 25% | 90 | SSR content, llms.txt, all AI crawlers allowed, FAQ schema |
| Brand Authority Signals | 20% | 55 | No live social profiles, no logo asset, no external mentions wired |
| Content Quality & E-E-A-T | 20% | 75 | Candid, specific copy + local expertise; thin on author credentials |
| Technical Foundations | 15% | 90 | SSR, sitemap, robots, metadataBase, canonicals (now fixed) |
| Structured Data | 10% | 88 | Full JSON-LD graph; logo still missing |
| Platform Optimization | 10% | 85 | Clean answer-structured content, good for AIO/ChatGPT/Perplexity |

Business type detected: **Agency** (services + products + case studies).

---

## Fixes Applied This Pass

### 1. Canonical bug — CRITICAL (fixed)
Root layout sets `alternates.canonical: siteUrl`. In Next 16 metadata, `alternates`
is inherited by child routes unless overridden. 8 pages set their own `metadata`
but no canonical, so every one emitted `<link rel="canonical" href="https://timewheel.co.in">`
— telling Google and AI crawlers they are duplicates of the homepage. Those pages
would be dropped from indexes and never cited.

Added a correct per-page canonical to:
`/blog`, `/blog/tag/[tag]`, `/pricing`, `/solutions`, `/legal/cookies`,
`/legal/privacy`, `/legal/refund`, `/legal/terms`.

Verified rendered: `/pricing` now emits `href="https://timewheel.co.in/pricing"`.

### 2. Missing OG / Twitter images — HIGH (fixed)
Twitter card was `summary_large_image` but only 2 of 31 pages shipped an image, so
~28 pages produced imageless share/AI cards. Added one root `app/opengraph-image.tsx`
(branded, generated via `next/og`). By file-convention inheritance it now covers
every page that doesn't ship its own. Verified rendered on `/pricing`.

### 3. Homepage OG title leaking onto other pages — MEDIUM (fixed on key pages)
9 pages inherited the homepage's `og:title`/`og:url`. Set correct `openGraph` on the
3 shared-heavily pages: `/blog`, `/pricing`, `/solutions`. Verified `/pricing` now
shows `og:title = "Pricing, Timewheel"`. (Legal pages left on canonical-only — they
are not shared.)

### 4. Organization JSON-LD enriched — MEDIUM (fixed)
Added `legalName` ("Timewheel Internet Pvt. Ltd.") and a `contactPoint`
(email, phone, `areaServed: IN`, languages en/hi) to `organizationLd()`. Strengthens
AI entity recognition for "who is Timewheel" answers.

### 5. llms.txt corrected + expanded — LOW/MEDIUM (fixed)
- Fixed stale "Web Development Company in **India**" → "Nagpur".
- Added 5 missing service pages (performance, social, Shopify, AI-marketing-automation,
  AI-automation-agency) and 2 products (Alluminaty, Ticket Dino) so AI crawlers see
  the full service set.

All changes typecheck clean (`tsc --noEmit`, exit 0).

---

## Remaining Recommendations (not done — need assets or decisions)

| # | Item | Severity | Why it needs you |
|---|---|---|---|
| 1 | Ship a real `/logo.png` and add `logo` to Organization + LocalBusiness JSON-LD | HIGH | AI "top agencies" answers and rich results favor entities with a logo. Needs a brand asset. |
| 2 | Fill real social URLs in `lib/site.ts` (twitter/linkedin/youtube are `#`) | HIGH | `sameAs` is empty, so AI can't cross-verify the entity. Brand-authority is the lowest score and this is the biggest lever. Brand mentions correlate ~3x stronger than backlinks for AI citation. |
| 3 | Replace placeholder phone `+91 98765 43210` in `lib/site.ts` | HIGH | It's echoed into LocalBusiness + contactPoint schema. A fake number damages trust and local-pack eligibility. |
| 4 | Add real `streetAddress` + `postalCode` to `localBusinessLd()` | MEDIUM | Full PostalAddress improves map-pack and "near me" AI answers. |
| 5 | Author bios + `Person`/`author` schema on blog posts | MEDIUM | E-E-A-T "Experience/Expertise" signal; currently no visible credentials. |
| 6 | Set `openGraph` on `/case-studies` and legal pages | LOW | Same og:title-leak as #3 above; low traffic. |
| 7 | Real per-URL `lastModified` in `sitemap.ts` (currently `new Date()` on every build) | LOW | Freshness signal; use blog post dates. |

---

## What's Already Strong (keep it)

- Server-side rendered content — AI crawlers read it without JS execution.
- Full JSON-LD graph: Organization, WebSite, Service, FAQPage, BreadcrumbList,
  ProfessionalService (LocalBusiness), SoftwareApplication per product.
- `robots.ts` allows all crawlers (including AI bots) + points to sitemap.
- `llms.txt` present and curated.
- Candid, answer-structured copy (the "what SEO can/cannot do" and FAQ blocks are
  exactly the passage shape AI engines quote).
- `metadataBase` set, per-page titles/descriptions on 30/31 pages.

---

## Priority Order

1. Real phone number (#3) — remove the fake before anything else ships.
2. Social URLs + logo (#1, #2) — unlocks the weakest category (Brand Authority).
3. Author schema on blog (#5) — compounding E-E-A-T as content grows.
