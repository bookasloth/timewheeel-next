# GEO Audit Report: Timewheel

**Audit Date:** 2026-09-25 (post-fix re-evaluation)
**URL:** https://timewheel.co.in
**Business Type:** Local Agency / Services (Nagpur digital agency) + own SaaS products
**Pages Analyzed:** 8 sampled from 39-URL sitemap
**Status:** Fixes from this cycle shipped and verified live on production.

---

## Executive Summary

**Overall GEO Score: 78/100 (Good)** — up from 72 at first audit.

Timewheel is technically excellent and now carries a real entity identity: server-side rendered, all major AI crawlers explicitly allowed, a rich `llms.txt`, complete sitemap, and deep, clean schema. This cycle closed every on-page gap from the first audit — the Organization schema now ships a logo, postal address, and `sameAs` links to LinkedIn / Instagram / Google; the flagship blog article is attributed to a credentialed Person; and the unverifiable AggregateRating was removed. The remaining ceiling is **Brand Authority**, which is entirely off-page (third-party mentions and AI-index presence) and grows with time and promotion, not code.

### Score Breakdown

| Category | Score | Weight | Weighted | Change |
|---|---|---|---|---|
| AI Citability | 83/100 | 25% | 20.75 | +1 |
| Brand Authority | 62/100 | 20% | 12.40 | +17 |
| Content E-E-A-T | 74/100 | 20% | 14.80 | +6 |
| Technical GEO | 90/100 | 15% | 13.50 | — |
| Schema & Structured Data | 93/100 | 10% | 9.30 | +8 |
| Platform Optimization | 72/100 | 10% | 7.20 | +2 |
| **Overall GEO Score** | | | **78/100** | **+6** |

---

## Fixed This Cycle (Verified Live)

- ✅ **`sameAs` populated** — LinkedIn, Instagram, and Google profiles now in Organization + LocalBusiness schema. Entity anchor exists where there was none.
- ✅ **Organization `logo`** — `/logo.webp` (1254×1254) ships and is wired into schema; feeds knowledge-panel / AI entity cards.
- ✅ **Homepage Organization postal address** — full address now on the Org node, consistent with LocalBusiness.
- ✅ **Blog author is a credentialed Person** — flagship article attributed to Shubham N Datarkar ("Founder, Timewheel") with bio, in both the visible byline and `Article` schema (`author` → `Person`, `worksFor` → Org).
- ✅ **Unbacked AggregateRating removed** — Book A Sloth no longer emits a self-declared 4.9/180 rating (Google review-snippet policy risk). `AggregateOffer` (real pricing) retained.
- ✅ **About H1 spacing** — now parses as one line: "We build digital experiences that move businesses forward."
- ✅ **Dead social links removed** — footer and website-design hero now render only real profiles (LinkedIn, Instagram); placeholder X / YouTube links are filtered out until real URLs are added.

---

## Critical Issues
_None._

## High Priority Issues
_None remaining._ All high-priority items from the first audit are resolved and live.

## Medium Priority Issues

1. **Off-page brand authority is thin.** New social profiles are live but have little published presence yet, and there are no notable third-party mentions (Reddit, YouTube, press, directories). This is the single biggest remaining lever on the score. Not a code fix — requires publishing and outreach over time.
2. **Blog depth.** One flagship article plus tag pages. Topical authority grows with volume; add 2–3 more core-topic articles.

## Low Priority Issues

3. **Missing X / YouTube profiles.** Both are still `"#"` in `lib/site.ts`; the footer/hero now hide them automatically, but real profiles would add two more `sameAs` anchors. Add URLs when the accounts exist.
4. **Author has no personal `sameAs`.** The `Person` author carries no personal profile link (e.g. a personal LinkedIn); adding one strengthens author-entity recognition.
5. **`openingHours` sync.** Keep schema `openingHours` in sync with the human hours string in `site.contact.hours` (already flagged in code).

---

## Category Deep Dives

### AI Citability (83/100)
Strong. FAQPage + Question/Answer blocks on service, product, and blog pages give AI engines clean extractable answers. Money pages are deep (SEO page 5.4k words, blog 5.4k, About 4.5k). H1s are clear and now all parse cleanly (About H1 spacing fixed). SSR delivers full text with no JS dependency.

### Brand Authority (62/100)
The on-page entity foundation is now solid: `sameAs` links to LinkedIn, Instagram, and Google, plus a logo, give AI systems something to resolve "Timewheel" against — a jump from the previous zero-anchor state. Off-site mention volume remains low for a young brand and needs deliberate building. This is the category holding the composite back and the clear focus for the next 30–90 days.

### Content E-E-A-T (74/100)
Good and improved. Real NAP (phone, street address, geo), case studies with specific metrics, full legal suite, and honest, non-hyped copy. The flagship blog article now has a named, credentialed author (Experience/Expertise signal), and the trust-denting fake rating is gone. Further gains come from author depth across more articles.

### Technical GEO (90/100)
Excellent. Next.js SSR, `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Meta-ExternalAgent and more; `llms.txt` present and rich; sitemap complete with lastmod; canonical + full Open Graph + Twitter meta.

### Schema & Structured Data (93/100)
Excellent and now near-complete: Organization (with logo, address, sameAs), WebSite, ProfessionalService (PostalAddress + GeoCoordinates + hasMap + openingHours), Service, FAQPage, BreadcrumbList, Article (with Person author), SoftwareApplication, AggregateOffer. Typed builders in `lib/jsonld.ts` keep it maintainable. The policy-risk AggregateRating is gone.

### Platform Optimization (72/100)
Structurally ready: FAQ/answer blocks suit Google AI Overviews and Perplexity; `llms.txt` + clean SSR suit ChatGPT search; local schema suits "near me" / map-pack answers; logo + sameAs feed entity cards. Actual citation presence across platforms will build as AI crawlers re-index the new signals.

---

## Next 30–90 Days (Off-Page Focus)

### Now that on-page is done
- [ ] Publish regularly to the new LinkedIn / Instagram; make the Google Business Profile complete and active
- [ ] Earn third-party mentions: local directories, relevant Reddit threads, guest posts, press
- [ ] Add a personal profile link to the author `Person` schema
- [ ] Publish 2–3 more core-topic blog articles with named authors
- [ ] Add real X / YouTube URLs (or remove the dead footer links)

### Verify indexing (allow days to weeks)
- [ ] Submit sitemap in Search Console; confirm GPTBot / ClaudeBot / PerplexityBot hits in server logs
- [ ] Test brand queries in ChatGPT / Perplexity / Google AI Overviews for citation and entity-card presence
- [ ] Re-run this audit in ~30 days to measure Brand Authority movement

---

## Appendix: Pages Analyzed

| URL | Title | Notable |
|---|---|---|
| / | Timewheel, Build on systems you control forever | Org+WebSite+SoftwareApp graph; logo + address + sameAs ✅ |
| /seo-company-in-nagpur | SEO Company in Nagpur \| Local + AI Search Visibility | Full local schema (ProfessionalService, Geo, FAQ, Service); 5.4k words |
| /blog/top-10-digital-marketing-companies-nagpur | Top 10 Digital Marketing Companies in Nagpur (2026) | Article + FAQ; Person author (Shubham N Datarkar) ✅ |
| /about | About, Digital Design & Development | H1 spacing fixed ✅ |
| /products/book-a-sloth | Book A Sloth — Appointment Booking & Scheduling | SoftwareApp + AggregateOffer; AggregateRating removed ✅ |
| /robots.txt | — | All AI crawlers allowed |
| /llms.txt | — | Present, rich, well-structured |
| /sitemap.xml | — | 39 URLs, lastmod present |
