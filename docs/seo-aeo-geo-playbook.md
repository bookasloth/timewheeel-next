# SEO / AEO / GEO Playbook (portable)

_Written 2026-10-09 from what Book A Sloth (BAS) actually built and measured. Use it to set up the same system on another site. The other site is on **Next.js (App Router, SSR)**, so every BAS technique comes with its Next.js equivalent._

**How to use this file:** copy it into the other repo (e.g. `docs/seo-aeo-geo-playbook.md`) and give your coding agent the prompt in [§12](#12-prompt-to-paste-into-the-other-codebase). Work through the [§11 checklist](#11-execution-checklist-phased) in order.

> **Incomplete copy.** Only §0, §1 and the start of §2 (up to the §2.1 intent table) have been added to this repo so far. Sections 2.2 to 12, including the §11 checklist and the §12 prompt linked above, are still to come. Timewheel's audit against the sections that are here: `docs/seo-playbook-audit.md`.

---

## 0. Definitions and the one goal

| Term | Means | Where you win it |
|---|---|---|
| **SEO** | Rank in normal search results | Google, Bing |
| **AEO** (Answer Engine Optimization) | Get chosen for answer boxes, rich results, featured snippets, voice answers | Google AI Overviews, snippets, People Also Ask |
| **GEO** (Generative Engine Optimization) | Get cited inside AI-written answers | ChatGPT search, Perplexity, Gemini, Claude, Copilot |

**Goal:** organic traffic from people who then book, start a trial or pay. Traffic without a path to conversion doesn't count.

Every page should go: **Intent → Experience → Trust → Conversion.**

---

## 1. The hard lessons (read these first)

BAS learned these by measuring. They matter more than any single technique below.

1. **Good technical SEO doesn't get you rankings; it only gets you a chance.** BAS built prerendering, sitemaps, JSON-LD and canonicals, and passed every technical audit. Even so, **50 of 51 blog posts got 0 impressions in 6 months.** The forensic audit put the causes at roughly **65% topic choice, 20% authority (0 backlinks), 10% young domain, 5% internal linking. Technical problems accounted for about 0%.**
2. **Write for queries people actually search, not for yourself.** About 78% of posts were changelog or brand-voice pieces with no search demand. Put product updates on `/changelog`. The blog is only for topics with real search volume.
3. **The pages that ranked were the money pages:** host profile pages (user-generated, local, specific). Expect the same on the new site: entity pages (profiles, listings, locations, products) and commercial pages ("X for Y", "Z alternative") get traffic before blog posts do.
4. **Order of work:** commercial-intent pages → industry/profession pages → feature pages → blog posts. Every blog post must link to one of the first three.
5. **Never fake trust signals.** Only add `aggregateRating` when real reviews are visible on the page. Only add FAQ schema when the Q&A is visible on the page. Never invent statistics. Google penalises these, and so does the BAS scoring engine.
6. **Toxic backlinks hurt.** BAS found PBN and Fiverr links. Audit backlinks early and disavow bad ones.
7. **Thin or empty pages that return HTTP 200 become soft-404s.** Unknown slugs must return a real 404 status with `noindex`. Never redirect a dead URL to the homepage; Google treats that as a soft-404 too.

---

## 2. Strategy

### 2.1 Classify intent before writing anything

| Intent | Example | Page goal |
|---|---|---|
| Informational | "how to reduce appointment no-shows" | Teach, then link to a feature or commercial page |
| Commercial | "best scheduling software", "calendly alternative" | Convince (comparison, alternatives, "for X" pages) |
| Transactional | "appointment software india pricing" | Convert (pricing, signup) |
| Navigational | "brand login" | Send the visitor to the right page |
