# GEO Audit Report: Timewheel

**Audit Date:** 2026-10-07
**URL:** https://timewheel.co.in
**Business Type:** Local Agency / Services (Nagpur digital agency) + own products (Book A Sloth, Alluminaty, Ticket Dino, Coffee and Toffee)
**Pages Analyzed:** ~20 live pages sampled from the sitemap (home, about, contact, case studies, blog, product pages, 5 service microsites, campaign pages)
**Method:** 4 parallel audit streams (Technical, Schema, Content/Citability, Brand/Platform), with fixes applied on branch `fix/geo-audit-oct-2026`
**Previous audit:** 2026-09-25, 78/100 (see git history of this file)

---

## Executive Summary

**Overall GEO Score: 69/100 (Fair) live today, ~72/100 projected once this PR deploys.**

The on-site foundation is strong: every key page is server-rendered, all major AI crawlers are explicitly allowed, `llms.txt` and the sitemap are complete, and schema now links into a single Organization entity. The score is lower than last cycle's 78 because this audit was stricter in two places. First, the brand scan found that "Timewheel" on Wikipedia/Wikidata is a Budapest monument, so AI models have a competing entity and no Timewheel Internet entry to disambiguate it. Second, the content review found that `/about` was showing three invented team members with stock photos, a serious trust problem (now fixed). The remaining ceiling is almost entirely off-page: brand authority and Bing/AI-index discovery.

### Score Breakdown

| Category | Live score | After this PR | Weight | Weighted (after) | vs 09-25 |
|---|---|---|---|---|---|
| AI Citability | 79/100 | ~82 | 25% | 20.5 | -1 |
| Brand Authority | 36/100 | 36 | 20% | 7.2 | -26 (stricter scan) |
| Content E-E-A-T | 66/100 | ~72 | 20% | 14.4 | -2 |
| Technical GEO | 91/100 | ~95 | 15% | 14.25 | +5 |
| Schema & Structured Data | ~90/100 | 95 | 10% | 9.5 | +2 |
| Platform Optimization | 58/100 | 58 | 10% | 5.8 | -14 (stricter scan) |
| **Overall GEO Score** | **69/100** | **~72/100** | | **71.65** | |

"After this PR" scores are projections from the stream that made the fixes; they become real only after merge and deploy.

---

## Fixed In This PR

**Content / E-E-A-T**
- `/about` team: removed 3 invented people ("Devika Rao", "Arjun Mehta", "Isha Patil") with placeholder photos; now shows the real founder, Shubham N Datarkar (`components/about/team.tsx`).
- `/about` intro: new "What is Timewheel?" heading with an answer-first, self-contained definition (legal name, city, founder, services, products) (`components/about/intro.tsx`).
- Homepage FAQ: new first question "What is Timewheel?"; flows into FAQPage schema automatically (`lib/home-faq.ts`).
- Blog post: removed all 29 em-dashes from `content/blog/top-10-digital-marketing-companies-nagpur.md` (house style); empty table cells now read "n/a".

**Schema**
- `/contact`: the Organization node had no `@id` and a shorter address, so it read as a second company. Now `ContactPage` + Organization `@id` + BreadcrumbList.
- `/case-studies`: added `CollectionPage` + `ItemList` of all case studies.
- `/30-days-30-websites`: Event now has `location` (online), organizer linked to the Org `@id`, and a breadcrumb.
- `/coffee-and-toffee`, `/products/alluminaty`: author/publisher linked to Org `@id`, `url` added.
- `/creators`: breadcrumb added.
- LocalBusiness `openingHours` now sourced from `site.contact.openingHours` next to the human hours string (`lib/site.ts`, `lib/jsonld.ts`). New helpers `orgRef()`, `webPageLd()`, `itemListLd()`.

**Technical**
- Security headers added in `next.config.ts`: X-Content-Type-Options, Referrer-Policy, Permissions-Policy (no CSP, to avoid breaking GTM / Meta pixel).
- `app/sitemap.ts`: real per-group `lastModified` dates (blog posts use their own dates) instead of `new Date()` on every URL, plus `priority` / `changeFrequency`; added `/book-a-demo`.
- `public/llms.txt`: rewritten to cover every sitemap route, including all 22 case studies, `/30-days-30-websites`, `/coffee-and-toffee`, `/creators`, `/book-a-demo`, legal pages; real Alluminaty description replaces the placeholder.
- `/products/ticket-dino`: title no longer doubles the brand ("..., Timewheel, Timewheel").
- `/products/book-a-sloth`: title cleaned (no em-dash), og:url added.
- `/case-studies`: og:url pointed at the homepage; now correct. og:url also added on `/30-days-30-websites`, `/coffee-and-toffee`, `/creators`, `/contact`, `/products/alluminaty`.

---

## Critical Issues
_None remaining._ (The invented team on `/about` was critical and is fixed in this PR.)

## High Priority Issues

1. **Entity collision, no Wikidata item.** Wikipedia/Wikidata "Timewheel" (Q186596) is a Budapest monument. Create Wikidata items for Timewheel Internet Pvt. Ltd. (Nagpur, website, founder, CIN), Shubham N Datarkar, and Book A Sloth (linked as product), then add the Wikidata URLs to `sameAs` in `lib/site.ts`.
2. **No Bing verification / IndexNow.** Bing's index powers ChatGPT search and Copilot. Verify in Bing Webmaster Tools, submit the sitemap, add `metadata.verification.other["msvalidate.01"]` in `app/layout.tsx`, and add an IndexNow key file in `public/` with a post-deploy ping.
3. **Zero third-party directory presence.** Not found on Clutch, GoodFirms, DesignRush, Justdial, IndiaMART, Sulekha. List with identical NAP.
4. **Blog depth.** One post. Topical authority and the "Experience" signal need 3 to 5 first-hand posts (real project data from case studies and Book A Sloth).

## Medium Priority Issues

5. **`/30-days-30-websites` Event has no `startDate`.** Google will not treat it as an event. Add the real date, or downgrade the type to WebPage + Offer.
6. **`/case-studies` has no summary passage** above the cards (295 words total). Add a 2 to 3 sentence answer-first intro with real aggregate facts.
7. **`/about` stats section** ("Work that moved real numbers") was not verified against real data; confirm or soften.
8. **Google Business Profile `sameAs`** uses a `share.google` short link; replace with the full `?cid=` Maps URL.
9. **Team section now has one card** in a 3-column grid; add Aastha Nikhare and Durga (photos already in `public/team/`) once roles are confirmed.

## Low Priority Issues

10. Author `Person` has no personal `sameAs` (e.g. personal LinkedIn).
11. X and YouTube are still `"#"` in `lib/site.ts`; create @timewheelinternet handles (YouTube @timewheel is taken).
12. `/book-a-demo` title uses "|" instead of the site's ", Timewheel" pattern; `/products/book-a-sloth` emits two `twitter:card` tags.
13. HSTS lacks `includeSubDomains` (add only after checking every subdomain is HTTPS).
14. `/pricing`, `/blog` only carry breadcrumbs; legal pages and `/seo-report` carry no schema.
15. (Fixed in this PR) `lib/book-a-sloth.ts` title string em-dash cleaned to match page metadata.
16. Blog tag pages are not listed in `llms.txt`.

---

## Category Deep Dives

### AI Citability (79 live, ~82 after)
Homepage FAQ and `/seo-company-in-nagpur` are answer-first and highly quotable. Weak spots were slogan-only intros. Example rewrite on `/about`:
- Before: "We combine strategy, design, and technology to create digital experiences..."
- After (under "What is Timewheel?"): "Timewheel (Timewheel Internet Pvt. Ltd.) is a product studio and digital agency based in Nagpur, Maharashtra, founded and led by Shubham N Datarkar..."
`/case-studies` remains the thinnest key page.

### Brand Authority (36)
| Platform | Status |
|---|---|
| Google Business Profile | Found (linked in schema) |
| LinkedIn company | Found, 38 followers |
| Instagram | Found |
| YouTube | Not found (@timewheel belongs to another account) |
| X | Not found (Book A Sloth has x.com/bookasloth) |
| Wikipedia / Wikidata | Not found; name collides with Budapest monument |
| Clutch / GoodFirms / DesignRush / Justdial | Not found |
| Crunchbase, Reddit | Unverified (blocked during scan) |
| Press | Not found |
| Book A Sloth on PeerPush | Found |

### Content E-E-A-T (66 live, ~72 after)
Strengths: named, dated author on the blog; legal name and address present. Weaknesses: invented team (fixed), one blog post, no founder credentials or founding year on site, testimonials unverified.

### Technical GEO (91 live, ~95 after)
All key pages return 200, are SSR, carry self-referencing canonicals and meta descriptions. AI crawlers explicitly allowed in `robots.ts`. Gaps were security headers, stale sitemap dates, missing og:url, and one doubled title; all fixed here.

### Schema & Structured Data (~90 live, 95 after)
Organization (logo, address, sameAs), LocalBusiness, Person author, Service, FAQPage, BreadcrumbList across microsites. This PR links every page to the single `https://timewheel.co.in/#organization` entity and fills schema on the newer pages.

### Platform Optimization (58)
On-site readiness is high; discovery is the gap. No Bing verification tag, no IndexNow key, and the scripted web search could not surface timewheel.co.in for its own domain name. Fixing Bing + Wikidata is the highest-leverage move for ChatGPT, Copilot and Perplexity.

---

## Quick Wins (This Week)

1. Merge this PR (on-site fixes go live on deploy).
2. Bing Webmaster Tools: verify, submit sitemap, then add the `msvalidate.01` tag and an IndexNow key.
3. Create the 3 Wikidata items and add them to `sameAs`.
4. Send the `/review` link to 15+ past clients to grow Google reviews.
5. Add the real `/30-days-30-websites` start date and Aastha / Durga roles.

## 30-Day Action Plan

### Week 1: Discovery
- [ ] Merge + deploy this PR; re-check headers and JSON-LD live
- [ ] Bing Webmaster Tools + IndexNow
- [ ] Google Search Console: resubmit sitemap

### Week 2: Entity
- [ ] Wikidata: company, founder, Book A Sloth
- [ ] Replace GBP short link with full `?cid=` URL; add Wikidata + founder LinkedIn to `sameAs`
- [ ] Create YouTube and X @timewheelinternet; add to `lib/site.ts`

### Week 3: Directories + Reviews
- [ ] Clutch, GoodFirms, DesignRush, Justdial, IndiaMART, Sulekha (identical NAP)
- [ ] Book A Sloth on G2, Capterra India, Product Hunt
- [ ] 15+ Google reviews via `/review`

### Week 4: Content Depth
- [ ] 2 first-hand blog posts (a case study deep dive, a Book A Sloth build story)
- [ ] Answer-first intro on `/case-studies`
- [ ] Verify `/about` stats and testimonials; add founder credentials and founding year

---

## Appendix: Pages Analyzed

| URL | Notes |
|---|---|
| / | Strong FAQ; new "What is Timewheel?" Q |
| /about | Invented team (fixed); slogan intro (fixed); stats unverified |
| /contact | Duplicate Org node (fixed) |
| /case-studies (+1 case study) | og:url wrong (fixed); thin intro; schema added |
| /blog, 1 post | Single post; em-dashes (fixed) |
| /30-days-30-websites | Event missing startDate; location/organizer fixed |
| /coffee-and-toffee | Org link + og:url added |
| /creators | Breadcrumb + og:url added |
| /pricing | Breadcrumb only |
| /seo-company-in-nagpur | Highly citable; missing security headers (fixed) |
| /web-development-company-in-nagpur | Missing security headers (fixed) |
| /digital-marketing-company-in-nagpur | OK |
| /products/book-a-sloth | Title cleaned, og:url added |
| /products/alluminaty | Org link, og:url added |
| /products/ticket-dino | Doubled brand in title (fixed) |
| /robots.txt, /sitemap.xml, /llms.txt | All present; sitemap dates + llms.txt coverage fixed |
