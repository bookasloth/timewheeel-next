# Landing Page Blueprint — Nagpur Service Pages

Reference for every new service landing page (digital marketing, SEO, web dev, vertical
niches like restaurant). Derived from a SERP teardown of the pages that currently rank for
`digital marketing / SEO / web development company in Nagpur` (research date 2026-09-12).

**Rule of thumb:** build the chassis once, swap four slots per keyword. Price and the
sample deliverable are the two slots almost no competitor fills — that's where the market
is won.

---

## 1. Portfolio strategy (before you build a single page)

- **One URL per keyword.** A homepage cannot align H1 ↔ proof ↔ FAQ ↔ CTA to one query.
  Three purpose-built LPs beat one good homepage on all three queries at once.
- **No duplicate pages targeting the same keyword.** Two near-identical pages on the same
  term cannibalise each other — Google splits ranking and picks one. If you have a variant,
  repoint it at a *different* keyword or `noindex`/301 it.
- **Priority order to build:** SEO first (weakest competition, highest local intent, fits
  our AEO/GEO edge) → Web Dev second (long-tail cluster; directories own the head term) →
  Digital Marketing last (hub page; links into the two spokes).

---

## 2. Master section order (the chassis)

```
 1. BREADCRUMB                Home › Nagpur › <Service>            SEO
 2. HERO                      H1 + subhead + 2 CTAs + trust line   Intent match  (CRITICAL)
 3. LOCAL PROOF STRIP         Named Nagpur clients                 Trust         (HIGH)
 4. STAT BAR                  4 numbers, keyword-specific          Scale
 5. PROBLEM / LOCAL INSIGHT   Demonstrate local expertise          Qualify + resonate
 6. SERVICE BREAKDOWN         5–6 sub-services + internal links    Scope + SEO
 7. PROOF BLOCK  ◄── keyword-specific (see §4)                     Proof         (CRITICAL)
 8. DIFFERENTIATION / COMPARISON   "Us vs typical agency" table    Reframe category
 9. PROCESS                   4 steps                              De-risk
10. PRICING BANDS             3 tiers + what's included            Trust + qualify (DIFF.)
11. DELIVERABLES PREVIEW      Sample audit / report / wireframe    Make it tangible (DIFF.)
12. TESTIMONIALS             Named + company + metric              Social proof
13. INDUSTRIES               8 tiles, internal links              Relevance
14. NAGPUR LOCALITY CLUSTER  8–10 neighbourhood internal links    Local SEO      (HIGH)
15. FAQ (8–10)               Accordion + FAQPage schema           AEO + objections (CRITICAL)
16. FINAL CTA + FORM         Band + real lead form + WhatsApp     Convert        (CRITICAL)
17. MAP + NAP + FOOTER HUB   Office, hours, phone, link hub       Local trust
```

Also add a **mid-page form** (not only the footer one) and a **sticky header CTA**.

---

## 3. Build once, swap per keyword

**Shared chassis (reuse):** hero shell · named-client proof strip · stat bar · process ·
testimonials · industries · Nagpur locality cluster · contact + map · footer hub ·
`LocalBusiness`/`ProfessionalService` schema.

**Swap these 4 slots every time (never reuse):**

| Slot | Digital Marketing | SEO | Web Development |
|---|---|---|---|
| **Proof block (§7)** | Business-outcome case studies (leads, cost/lead) | Before/after ranking table (#47→#3) | Live portfolio + Lighthouse scores |
| **Service breakdown (§6)** | SEO, ads, social, content, email, web | Local, technical, content, GBP, ecommerce, **AEO/GEO** | Business sites, ecommerce, web apps, WP/Shopify, redesign, maintenance |
| **FAQ set (§15)** | Cost, channel mix, reporting, contract | Timeline honesty, guarantees (no), local vs national, GBP, AEO | Timeline, ownership/handover, maintenance, tech stack, revisions |
| **CTA offer (§16)** | Free 30-min growth audit | Free keyword + current-rank report | Fixed quote in 24h / free homepage concept |

**H1 pattern:** keyword **+ a benefit**, never a bare superlative.
- DM: *Digital Marketing Agency in Nagpur That's Measured on Leads, Not Likes*
- SEO: *SEO Company in Nagpur — We Show You the Rankings Before We Ask for the Retainer*
- Web: *Web Development Company in Nagpur — Fixed Scope, Fixed Price, Launched in 6 Weeks*

**Depth:** DM 1,800–2,300 · SEO 2,000–2,500 · Web 1,600–2,000 words. Length comes from
structured evidence (tables, metrics, case cards), not more prose.

---

## 4. Checklist for a new page

**MUST HAVE** — omit and you lose to pages that have them:
- [ ] Own URL for the keyword (not the homepage, not a duplicate)
- [ ] H1 = keyword + benefit; page `<title>` matches the H1's promise
- [ ] Named Nagpur clients above or just below the fold (real, not placeholder names)
- [ ] Keyword-specific proof block (case studies / ranking table / portfolio) — **real data**
- [ ] Service breakdown, 5–6 sub-services, each internally linked
- [ ] 4-step process section
- [ ] 8–10 FAQ with `FAQPage` schema whose text **matches the visible FAQ**
- [ ] Nagpur locality internal-link cluster (8–10)
- [ ] Map embed + consistent NAP + GBP link
- [ ] A working lead **form** on the page (render it — don't leave it imported-but-unused)
- [ ] WhatsApp deep link w/ pre-filled message as persistent secondary CTA
- [ ] `ProfessionalService`/`LocalBusiness` + `BreadcrumbList` schema, correct company name
- [ ] Sticky header CTA

**SHOULD HAVE** — real lift in trust/conversion:
- [ ] Comparison table vs "typical agency" (replaces generic "why choose us")
- [ ] Team photos + real names
- [ ] Keyword-specific stat counters (not generic company stats)
- [ ] Industry tiles that link to industry pages
- [ ] Mid-page form in addition to footer form
- [ ] Google review count + live GBP link
- [ ] 3-post blog feed
- [ ] `geo.region` / `geo.placename` meta

**DIFFERENTIATORS** — competitors absent/weak; this is where you win:
- [ ] **Pricing bands stated openly** (8/10 competitors hide price)
- [ ] **Show the actual deliverable** — sample audit PDF / report / wireframe / sprint plan
- [ ] **Honest-expectations section** ("what SEO can and cannot do in 90 days")
- [ ] **AEO/GEO section** on the SEO page (AI-search visibility — our existing edge)
- [ ] **Ownership & handover block** on the web-dev page ("you own code, domain, hosting")
- [ ] **Local search-behaviour insight** (Hindi vs English queries, neighbourhood intent)
- [ ] **Service diagnostic** on the DM page (route the unsure buyer)
- [ ] Free tool as lead magnet (rank checker / speed test)
- [ ] Qualification section ("we're probably not a fit if…")
- [ ] Third-party rating aggregation (Google + Clutch + GoodFirms in one strip)

**AVOID** — common in this market and actively harmful:
- [ ] ✗ Keyword marquees / scrolling keyword tickers (reads as stuffing)
- [ ] ✗ "Best / Top / #1" with no evidence
- [ ] ✗ City/tehsil names stuffed into the `<title>`
- [ ] ✗ Repeating the exact keyword phrase 6–8× in body copy
- [ ] ✗ Ranking guarantees ("#1 guaranteed")
- [ ] ✗ Stock-avatar / anonymous testimonials with no company name
- [ ] ✗ Placeholder copy and `#` links in the portfolio/proof
- [ ] ✗ "Clients in 53+ countries" global positioning on a city page
- [ ] ✗ Generic "why choose us" virtue cards
- [ ] ✗ Single conversion point at the page bottom only

---

## 5. Central rule

> Order: intent match → local credibility → proof → scope → differentiation → process →
> **price** → tangible deliverable → social proof → local links → FAQ → convert.
>
> Build one chassis; swap proof block, service breakdown, FAQ set, and CTA offer per
> keyword. Price and the sample deliverable are the two slots almost nobody fills.

*Source: `nagpur-landing-page-research.md` SERP teardown — TELZON (DM + SEO LPs), Advexity,
VowelWeb read in full; ~20 more ranking pages at snippet level.*
