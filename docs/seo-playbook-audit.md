# Timewheel vs the SEO / AEO / GEO playbook (2026-10-10)

Audit of timewheel.co.in against `docs/seo-aeo-geo-playbook.md`. Only §0, §1
(the seven hard lessons) and §2.1 (intent) of the playbook are in the repo so
far, so this covers those. It builds on `GEO-AUDIT-REPORT.md` (2026-10-07),
whose open items (Wikidata entity, Bing/IndexNow, directories) still stand and
aren't repeated here.

Method: production build served locally. Every sitemap URL was fetched and
checked for status, canonical, robots and `<h1>`; unknown URLs in each section
were probed for real 404s; every FAQPage schema was compared with the visible
page text; trust claims were inventoried from the source.

## Scorecard

| Lesson | Status | Summary |
| --- | --- | --- |
| 1. Technical is table stakes | Pass, 2 fixed | All 56 sitemap URLs return 200 with their own canonical and no stray `noindex`. Fixed: duplicate `<h1>` on `/case-studies` and all 21 case-study pages; joined-up h1 on the digital-marketing page. |
| 2. Write for real queries | Pass, with a caution | The one blog post targets a real commercial query. See the "#1 vs 2nd Best" contradiction below. |
| 3. Money pages first | Open | 12 service pages, 21 case studies and 5 product pages exist, but 3 pages compete for the same query. |
| 4. Blog links to money pages | Fixed | The post linked to SEO and web development but not to digital marketing, its own topic. Added. |
| 5. Never fake trust signals | **Critical, open** | Invented testimonials, reviews, logos and case-study results are live. Needs your input on what's real. One FAQ schema mismatch fixed. |
| 6. Toxic backlinks | Not checked | Needs Search Console or a backlink tool; can't be seen from the code. |
| 7. Real 404s, no soft-404s | Fixed | `/case-studies/<unknown>` returned 200. Every other section already returned 404 + `noindex`. |

## Fixed in this PR

1. **Soft-404 and duplicate h1 on case studies.** The `/case-studies` loading screen
   (added in #23) sat above `[slug]`. Unknown slugs started streaming with a 200
   before the "not found" was known, and every case study's server HTML carried
   the list heading "Work we designed, built and shipped" as a first `<h1>`, read
   by crawlers that don't run JavaScript. The list page and its loading screen
   now live in a `(list)` route group (same URL), and loading-screen headings are
   plain blocks, not `<h1>`.
2. **FAQ schema that didn't match the page.** `/digital-marketing-company-in-nagpur`
   declared 5 FAQ questions in JSON-LD that appear nowhere on the page (the
   visible FAQ asks 5 different ones). Both now come from `lib/perf-marketing.ts`.
   The other 15 pages with FAQ schema match their visible questions exactly.
3. **Site-wide canonical default.** The root layout set the homepage as canonical
   for any page that didn't set one. No indexed page relied on it, but a new page
   that forgot would have told Google it's a duplicate of the homepage. Removed;
   the homepage now sets its own (unchanged URL).
4. **Out-of-range pagination.** `/case-studies?page=99` showed the last page under
   its own canonical. The canonical now points at the real last page.
5. **Careers missing from the sitemap.** `/careers` and each role page (which carry
   JobPosting schema for Google Jobs) are now listed.
6. **Broken h1 keyword.** The digital-marketing h1 rendered as
   "Digital Marketing**Company** in Nagpur" in raw HTML (two adjacent spans with no
   space). Fixed, plus two typos in the line below ("togethet", "enquires").
7. **Blog to money page.** The "top 10 digital marketing companies" post now links
   to `/digital-marketing-company-in-nagpur` where it names Timewheel #1.

## Critical: fabricated trust signals (lesson 5)

Several are labelled placeholder or "INVENTED" in the code but render as real on
production pages. Google's spam policies and the FTC/ASCI endorsement rules both
treat these as deceptive, and they are the opposite of the E-E-A-T signals AI
engines look for. Each needs one of: replace with the real thing, label it
honestly, or remove it.

| Where it shows | What | Evidence |
| --- | --- | --- |
| Case studies: Occasion Cakes, Khiladi Adda, Stone & Acres, Corart | Results (+212% orders, 4.4x ROAS, ...), named quotes, and "Figures come from the client's own analytics, GA4, Search Console" | `lib/case-studies.ts:92` says "placeholder case studies added to demonstrate the structure"; all four have `liveUrl: "#"`. Everything Powerlifting has a live URL and may be genuine. |
| Homepage | "Rated 4.5/5, from over 100 reviews" with stars, under three anonymous quotes | `components/home/testimonials.tsx:49` |
| `/social-media-marketing-company-in-nagpur` | Three testimonials | `lib/social-media-marketing.ts:199`: "DEMO DATA, every name, company and quote below is INVENTED" |
| `/digital-marketing` | Logo wall of invented brands (Northwind, Vertex Labs, ...) under "We've helped over 20+ brands" | `components/digital-marketing/trust.tsx:26` "Placeholder trusted-brand marks" |
| Several service pages and Book A Sloth | Testimonials reusing the same names (Priya Sharma, Rahul Mehta, Ananya Iyer) on unrelated businesses | `lib/restaurant-marketing.ts`, `lib/book-a-sloth.ts`, `lib/ai-automation-nagpur.ts`, `lib/website-design.ts` |
| `/social-media-marketing-company-in-nagpur` | "Companies we collaborate with" includes Disney+ Hotstar, Policy Bazar, ShareChat | `lib/seo-client-logos.ts`; fine if those engagements are real and you can show them |
| Stats blocks | 200+ restaurant brands / 98% retention / 40+ cities (`lib/restaurant-marketing.ts:13`); 200+ stores / 50+ global clients / 99% satisfaction (`lib/shopify-development.ts:34`); 4.9 avg rating (`lib/website-design.ts:316`); 40+ vs 50+ happy clients and 6+ vs 7+ years across pages (`components/perf-marketing/trust.tsx:5`, `lib/digital-marketing2.ts:11`) | Unlabelled and inconsistent with each other |
| Product microsites | 20,000+ creators / Rs 12L raised / 80,000+ supporters (Coffee and Toffee, Creators); 500+ verified alumni (Alluminaty); "-60% fewer no-shows" (Book A Sloth) | `lib/coffee-and-toffee.ts:37`, `lib/creator.ts:17`, `lib/alluminaty.ts:23`, `lib/book-a-sloth.ts:165` |

Already clean: no `aggregateRating` anywhere (it was removed from Book A Sloth
for this reason); the `/ai-automation-agency-in-nagpur` results are labelled
"Illustrative"; the home "Yes they actually use us" logo wall (Stripe, Netflix,
...) is commented out and should stay that way.

## Open: intent and cannibalization (§2.1, lesson 3)

**Three pages target "digital marketing company in Nagpur":**

| URL | Title | Linked from |
| --- | --- | --- |
| `/digital-marketing-company-in-nagpur` | Digital Marketing Agency in Nagpur: SEO & Ads | navbar |
| `/digital-marketing-nagpur` | Digital Marketing Company in Nagpur | (sitemap only) |
| `/digital-marketing` | 2nd Best Digital Marketing Company in Nagpur | footer |

**Update 2026-10-10:** `/digital-marketing-nagpur` and `/ai-marketing-automation-company-in-nagpur`
were retired and now 301 to `/digital-marketing-company-in-nagpur`; `/creators` 301s to
`/coffee-and-toffee`; `/ai-automation-agency-in-nagpur` was removed (404). Two pages still
overlap: `/digital-marketing` and `/digital-marketing-company-in-nagpur`.

They split ranking signals for one query. Recommendation: keep the navbar page,
301 the other two to it (after checking in Search Console which one has
impressions), and drop them from the sitemap. If one should stay, give it a
distinct intent (e.g. pricing, or an industry).

**"#1" vs "2nd Best".** The blog post ranks Timewheel the #1 digital marketing
company in Nagpur; `/digital-marketing` and `/ai-marketing-automation-company-in-nagpur`
headline "2nd Best ... in Nagpur". Pick one story. A self-ranked #1 in a "top 10"
list also reads as self-promotion to Google's reviews guidance; it's safer
framed as "how we'd choose, and where we fit".

**Intent coverage today:**

| Intent | Pages | Gap |
| --- | --- | --- |
| Commercial, local ("X company in Nagpur") | 9 service pages | Cannibalization above |
| Commercial, industry ("X for Y") | `/restaurant-marketing` only | Lesson 4's second tier: add industry pages only where you have real clients to show (e.g. the case-study verticals: cakes/food, real estate, fitness, coworking) |
| Transactional | `/pricing`, `/book-a-demo`, `/contact` | OK |
| Entity / proof | 21 case studies, 5 product pages | Proof needs to be real (lesson 5) |
| Informational | 1 blog post | Lesson 2: only add posts with search demand, each linking to a money page |

**Minor:** the `/website-design-company-in-nagpur` h1 contains the rotating
words, so raw HTML reads "...in Nagpur for Restaurants for Salons f o r S a l o n s".
Moving the rotating phrase out of the `<h1>` (same look) would give crawlers a
clean heading.

## Next steps, in order

1. **Fix the fabricated trust signals** (table above). Tell me which items are
   real; I'll replace or remove the rest.
2. **Consolidate the three digital-marketing pages** after a Search Console check.
3. **Resolve the "#1" vs "2nd Best" messaging.**
4. **Backlink audit** (lesson 6) in Search Console: Links report, plus disavow if
   anything toxic shows up.
5. **Industry pages** only where real case studies back them.
6. Carry on with `GEO-AUDIT-REPORT.md`'s off-page items (Wikidata, Bing
   Webmaster Tools + IndexNow, directory listings).
7. Re-audit against the rest of the playbook once §2.2 to §12 are added.
