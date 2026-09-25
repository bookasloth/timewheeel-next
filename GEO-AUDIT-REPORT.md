# GEO Audit Report: Timewheel

**Audit Date:** 2026-09-25
**URL:** http://localhost:50077 (local dev build of timewheel.co.in)
**Business Type:** Local Agency / Services (Nagpur digital agency) + own SaaS products
**Pages Analyzed:** 8 sampled from 39-URL sitemap

> **Scope note:** Audited against the local dev server, so off-site signals (Reddit / YouTube / Wikipedia / LinkedIn mentions, live AI-platform citations, real crawler hits) cannot be measured. Brand Authority and Platform Optimization are scored from on-page proxies only and flagged **[verify on live domain]**. Everything else (HTML, schema, content, SSR, technical) is measured directly and is real.

---

## Executive Summary

**Overall GEO Score: 72/100 (Fair — top of range, near Good)**

Timewheel is technically excellent and already GEO-aware: server-side rendered, all major AI crawlers explicitly allowed, a rich `llms.txt`, a complete sitemap, and deep schema (FAQPage, ProfessionalService with real address + geo, Service, Article, SoftwareApplication, BreadcrumbList). Money pages carry 5,000+ words with FAQ/answer blocks that AI engines quote well. The score is held back by **entity-recognition gaps** — the Organization schema ships with an empty `sameAs` and no logo, so AI systems have nothing to resolve "Timewheel" against — and a **self-declared AggregateRating (4.9/180) with no visible individual reviews**, which is a trust and Google-policy risk.

### Score Breakdown

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Citability | 82/100 | 25% | 20.5 |
| Brand Authority | 45/100 | 20% | 9.0 |
| Content E-E-A-T | 68/100 | 20% | 13.6 |
| Technical GEO | 90/100 | 15% | 13.5 |
| Schema & Structured Data | 85/100 | 10% | 8.5 |
| Platform Optimization | 70/100 | 10% | 7.0 |
| **Overall GEO Score** | | | **72/100** |

---

## Critical Issues (Fix Immediately)

_None._ No crawler blocks, no noindex, content is server-rendered, structured data present.

## High Priority Issues (Fix This Week)

1. **Empty `sameAs` — no entity anchor.** `lib/site.ts` sets `twitter/linkedin/youtube` to `"#"`, so `organizationLd()` drops `sameAs` entirely ([lib/jsonld.ts:13,32](lib/jsonld.ts:13)). `sameAs` is the strongest signal AI systems use to recognize a brand as a real entity. Create LinkedIn / X / YouTube (and a Google Business Profile) and wire their real URLs in. Add Crunchbase/Instagram if they exist. Affects every page (Org + LocalBusiness both gated on this).

2. **Unbacked AggregateRating (4.9 / 180 reviews).** Sourced from marketing copy in [lib/book-a-sloth.ts:380](lib/book-a-sloth.ts:380) and emitted as `AggregateRating` on `/products/book-a-sloth`, but no individual `Review` markup (author, reviewBody, date) or visible review list backs it. Google's review-snippet policy requires the ratings to come from reviews visible on the same page; self-serving aggregate ratings can trigger a manual action and read as untrustworthy to AI. Either (a) add real, visible reviews with `Review` schema, or (b) remove `AggregateRating` until real reviews exist.

3. **No Organization `logo`.** Confirmed TODO in [lib/jsonld.ts:33](lib/jsonld.ts:33). A logo image in Organization schema feeds knowledge-panel and AI entity cards. Ship `/logo.png` (square, ≥112px) and add `logo`.

## Medium Priority Issues (Fix This Month)

4. **About page H1 spacing bug.** Renders as "We build digital​experiences that​move businesses forward." — missing spaces between spans ([components/about/hero.tsx:35](components/about/hero.tsx:35) and preceding spans). Hurts both the human read and the parsed H1. Add spaces at span boundaries.

5. **No author attribution on blog.** The flagship article `/blog/top-10-digital-marketing-companies-nagpur` has `Article` schema but no visible author byline/bio or `author` `Person` with credentials. E-E-A-T "Experience/Expertise" is thin without a named, credentialed author. Add author bio + `author` to Article schema.

6. **Homepage Organization has no postal address.** `ProfessionalService` (localBusiness) carries the real address + geo, but the homepage `Organization` node does not. Low effort to add `address` to `organizationLd()` for consistency across the entity graph.

## Low Priority Issues

7. `og:image` present but verify a real branded 1200×630 image ships (not a placeholder) once the logo/brand assets land.
8. Confirm `openingHours` in schema ([lib/jsonld.ts:143](lib/jsonld.ts:143)) stays in sync with the human hours string in `site.contact.hours` (ponytail comment already flags this).
9. Blog is thin (1 article + tag pages). Publisher/topical-authority signals grow with volume — add depth over time.

---

## Category Deep Dives

### AI Citability (82/100)
Strong. FAQPage + Question/Answer blocks on service, product, and blog pages give AI engines clean extractable answers. Money pages are deep (SEO page 5.4k words, blog 5.4k, About 4.5k). H1s are clear and declarative. SSR delivers the full text to crawlers with no JS dependency. Deduct for: some marketing-voice hero copy that is not directly quotable, and the About H1 spacing bug degrading one key heading.

### Brand Authority (45/100) [verify on live domain]
On-page proxy only. The concrete, fixable gap: `sameAs` is empty and there is no logo — the site currently gives AI systems zero external identity anchors. Off-site mention volume (Reddit/YouTube/Wikipedia/press) cannot be measured from localhost; for a young brand assume low and build deliberately. This category is the single biggest lever on the composite score.

### Content E-E-A-T (68/100)
Good foundation: real NAP (phone, street address, geo coords), case studies with specific metrics (+212% orders, etc.), full legal suite (privacy/terms/cookies/refund), and honest, non-hyped copy ("no ranking guarantees we can't keep") which reads as trustworthy. Weak on: no visible author credentials on the blog, and the unbacked AggregateRating actively dents Trust.

### Technical GEO (90/100)
Excellent. Next.js 16 SSR, `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Meta-ExternalAgent and more; `llms.txt` is present and genuinely rich (services, products, company, resources with descriptions); sitemap complete with lastmod; canonical + full Open Graph + Twitter card meta on pages. Little to fix here.

### Schema & Structured Data (85/100)
Broad and well-typed: Organization, WebSite, ProfessionalService (with PostalAddress + GeoCoordinates + hasMap + openingHours), Service, FAQPage, BreadcrumbList, Article, SoftwareApplication, AggregateOffer. Typed builders in `lib/jsonld.ts` keep it maintainable. Deduct for empty `sameAs`, missing `logo`, and the policy-risk AggregateRating.

### Platform Optimization (70/100) [verify on live domain]
Structurally ready: FAQ/answer blocks suit Google AI Overviews and Perplexity; `llms.txt` + clean SSR suit ChatGPT search; local schema suits "near me" / map-pack answers. Actual citation presence across platforms needs live-domain testing once deployed and indexed.

---

## Quick Wins (This Week)

1. Create real social profiles + GBP, wire URLs into `lib/site.ts` → instantly populates `sameAs` on Organization **and** LocalBusiness. (Biggest score lever.)
2. Ship `/logo.png` and add `logo` to `organizationLd()`.
3. Fix the About H1 span spacing.
4. Decide on reviews: add visible `Review` markup, or pull `AggregateRating` from the Book A Sloth product schema.
5. Add an author byline + `author` `Person` to the blog article and its `Article` schema.

## 30-Day Action Plan

### Week 1: Entity identity
- [ ] Stand up LinkedIn, X, YouTube, Google Business Profile
- [ ] Replace `"#"` social placeholders with real URLs in `lib/site.ts`
- [ ] Ship logo, add `logo` to Organization schema

### Week 2: Trust & reviews
- [ ] Collect/publish real customer reviews for Book A Sloth with visible author + text
- [ ] Add `Review` schema, or remove `AggregateRating` until reviews exist
- [ ] Add postal address to homepage Organization node

### Week 3: Content authority
- [ ] Add named author + credential bio across the blog; wire `author` into Article schema
- [ ] Fix About H1 spacing; audit other multi-span headings
- [ ] Publish 2–3 more blog articles on core service topics

### Week 4: Live verification (post-deploy)
- [ ] Re-run this audit against https://timewheel.co.in
- [ ] Test brand queries in ChatGPT / Perplexity / Google AIO for citation presence
- [ ] Submit sitemap in Search Console; confirm crawler hits from GPTBot/ClaudeBot/PerplexityBot in logs

---

## Appendix: Pages Analyzed

| URL | Title | Notable |
|---|---|---|
| / | Timewheel, Build on systems you control forever | Org+WebSite+SoftwareApp graph; empty sameAs; no logo |
| /seo-company-in-nagpur | SEO Company in Nagpur \| Local + AI Search Visibility | Full local schema (ProfessionalService, Geo, FAQ, Service); 5.4k words |
| /blog/top-10-digital-marketing-companies-nagpur | Top 10 Digital Marketing Companies in Nagpur (2026) | Article+FAQ; no visible author |
| /about | About, Digital Design & Development | H1 span spacing bug |
| /products/book-a-sloth | Book A Sloth — Appointment Booking & Scheduling | SoftwareApp + AggregateOffer + unbacked AggregateRating |
| /robots.txt | — | All AI crawlers allowed |
| /llms.txt | — | Present, rich, well-structured |
| /sitemap.xml | — | 39 URLs, lastmod present |
