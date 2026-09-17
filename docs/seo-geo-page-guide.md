# SEO + GEO Page Guide

**Every service / landing page ships against this checklist. No page merges until it passes the gate at the bottom.**

Goal: rank in Google *and* get cited by AI answers (ChatGPT, Gemini, Perplexity, Google AI Overviews) for one target query — e.g. "digital marketing company in nagpur", "seo company in nagpur".

Rule of the whole doc: **one page = one query = one intent.** If a page tries to rank for three things it ranks for none and AI can't quote it.

---

## 0. Before you write a line

| Decide | Example |
|---|---|
| **Target query** (exactly how people type it) | `digital marketing company in nagpur` |
| **URL slug** = the query, hyphenated, no fluff | `/digital-marketing-nagpur` |
| **Search intent** | commercial / local — they want to *hire* |
| **The one-sentence answer** AI will quote | "A digital marketing company in Nagpur handles SEO, social media, Google Ads and web design for local businesses." |

Put the content in a model file under `lib/` (pattern: `lib/seo.ts`). Page file stays thin, content is data. Reuse `lib/seo.ts` as the template — it already has hero, services, faq, localities, pricing, comparison.

---

## 1. Metadata (copy the pattern from `app/(public)/about/page.tsx`)

```ts
import type { Metadata } from "next";
import { site } from "@/lib/site";

const description = "…150–160 chars, contains the query + Nagpur + a real hook, no fluff…";

export const metadata: Metadata = {
  title: "Digital Marketing Company in Nagpur | Timewheel", // query first, ≤60 chars
  description,
  alternates: { canonical: `${site.url}/digital-marketing-nagpur` }, // ALWAYS set canonical
  openGraph: {
    type: "website",
    url: `${site.url}/digital-marketing-nagpur`,
    siteName: site.name,
    title: "Digital Marketing Company in Nagpur | Timewheel",
    description,
  },
  twitter: { card: "summary_large_image", title: "Digital Marketing Company in Nagpur", description },
};
```

Checklist:
- [ ] `title` — target query at the **front**, ≤ 60 chars, brand at end
- [ ] `description` — 150–160 chars, contains query + "Nagpur", reads like a promise not a keyword stuff
- [ ] `alternates.canonical` set (self-canonical) — non-negotiable
- [ ] OpenGraph + Twitter present

---

## 2. On-page structure (this is what AI quotes)

- [ ] **Exactly one `<h1>`** and it *is* the query — "Digital Marketing Company in Nagpur"
- [ ] **Answer-first opener** — first paragraph, 40–60 words, plainly defines/answers the query. This is the block AI lifts verbatim. No preamble, no "Welcome to". Lead with the answer.
- [ ] **H2s = the questions people ask** — "What services…", "How much does it cost", "How to choose", "Areas we serve"
- [ ] **Scannable** — short paragraphs, bullet lists, a comparison table. AI extracts lists and tables far more than prose.
- [ ] **Local signals** — city + real localities (see `seo.localities`: Dharampeth, Sitabuldi, Ramdaspeth…), Hindi/English search reality. Generic national copy does not rank locally.
- [ ] **Real proof, no invented numbers** — no fake ranking tables / fake testimonials. Live audit, real deliverable, honest timelines (see `seo.expectations`).
- [ ] **FAQ block** — 6–10 Q&As, each answer self-contained and quotable (pattern: `seo.faq`).

---

## 3. Schema (JSON-LD) — render with `<JsonLd data={…} />`

Every service page ships **three** blocks minimum. Use helpers in `lib/jsonld.ts`.

| Block | Helper | Status |
|---|---|---|
| BreadcrumbList | `breadcrumbLd([...])` | ✅ exists |
| Organization (with `sameAs`) | `organizationLd()` | ✅ exists — keep GBP/LinkedIn/Instagram in `site.social` |
| **Service** (name, areaServed: Nagpur, provider) | `serviceLd(...)` | ⚠️ ADD to `lib/jsonld.ts` |
| **FAQPage** (mirror the on-page FAQ) | `faqLd(faq)` | ⚠️ ADD to `lib/jsonld.ts` |
| **LocalBusiness / ProfessionalService** (address, geo, hours from `site.contact`) | `localBusinessLd()` | ⚠️ ADD — needed for the Google-Business-style AI answers |

Checklist:
- [ ] Breadcrumb + Organization + Service on every service page
- [ ] FAQPage whenever the page has a visible FAQ (it should)
- [ ] `sameAs` in Organization points to **real** GBP, LinkedIn, Instagram URLs (fix the `#` placeholders in `lib/site.ts`)
- [ ] Validate: paste rendered JSON-LD into search.google.com/test/rich-results — zero errors

> The three ⚠️ helpers don't exist yet. Add them once to `lib/jsonld.ts`; then every page reuses them.

---

## 4. GEO / AEO (get cited by AI, not just ranked)

- [ ] Answer-first paragraph present (see §2) — the single biggest citation lever
- [ ] Content is server-rendered HTML (it is — Next.js) so AI crawlers read it without JS
- [ ] AI crawlers allowed: `robots.txt` present, GPTBot / ClaudeBot / PerplexityBot / Google-Extended not blocked
- [ ] `llms.txt` at site root lists key pages (currently 404 — add once, site-wide)
- [ ] Entity clarity: consistent NAP (name/address/phone from `site.contact`) across site + GBP + directories

---

## 5. Internal linking

- [ ] Linked from a **hub** (home, /services, footer) with anchor text = the query
- [ ] Links **out** to 2–3 related pages (case study, related service, contact) with descriptive anchors
- [ ] Added to `app/sitemap.ts`

---

## The gate — pass every page through this before merge

**A page is not "done" until it clears both:**

### A. Manual 60-second check
- [ ] `<h1>` == target query, exactly one
- [ ] First paragraph answers the query in ≤ 60 words
- [ ] canonical + OG set
- [ ] Breadcrumb + Organization + Service + FAQPage schema render
- [ ] "nagpur" appears in title, h1, and body; localities present
- [ ] no fake stats / guarantees
- [ ] in `app/sitemap.ts`

### B. Automated score (run the geo skill on the built page)
```
/geo citability https://timewheel.co.in/<slug>
```
Then, for the full page grade:
```
/geo page https://timewheel.co.in/<slug>
```
- [ ] Citability score ≥ 70 — if lower, fix the flagged passages and re-run
- [ ] Schema section reports no missing/invalid blocks

Ship only when A is all ticked and B clears 70. Put the score in the PR description.

---

## Quick reference — files you touch per page

| File | What |
|---|---|
| `lib/<page>.ts` | content model (copy `lib/seo.ts`) |
| `app/(public)/<slug>/page.tsx` | thin page: metadata + sections + `<JsonLd>` |
| `lib/jsonld.ts` | shared schema helpers (add serviceLd/faqLd/localBusinessLd once) |
| `lib/site.ts` | NAP, real social URLs for `sameAs` |
| `app/sitemap.ts` | add the new route |
