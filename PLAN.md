# TIMEWHEEL — Website Build Plan

Marketing site for TIMEWHEEL. Bold-startup, dark-only, orange/black, rich GSAP motion. Heavy Whop.com inspiration, own identity.

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, latest) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | GSAP (+ ScrollTrigger) |
| Email | Resend (contact + newsletter) |
| Scheduling | Calendly (external link) |
| Analytics | Vercel Analytics + Google Analytics (GA4) |
| Content | MDX files (blog) |
| Host | Vercel |
| Theme | Dark only |

## 2. Folder structure

```
timewheel/
  app/
    layout.tsx                 # root, dark, fonts, analytics
    page.tsx                   # homepage
    solutions/page.tsx
    pricing/page.tsx
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx       # MDX post
    legal/privacy/page.tsx
    legal/terms/page.tsx
    legal/cookies/page.tsx
    legal/refund/page.tsx
    api/contact/route.ts       # Resend
    api/newsletter/route.ts    # Resend
    sitemap.ts
    robots.ts
  components/
    nav/megamenu.tsx
    nav/navbar.tsx
    footer.tsx
    home/hero.tsx
    home/products-grid.tsx
    home/why-ownership.tsx
    home/social-proof-wall.tsx # the shuffling logo wall
    home/stats-band.tsx
    home/cta-band.tsx
    feature-block.tsx          # Whop-style text + floating mock cards
    pricing/product-pricing.tsx
    ui/*                       # shadcn
    cookie-banner.tsx
  content/blog/*.mdx
  lib/products.ts              # 10 products data
  lib/pricing.ts               # per-product pricing data
  lib/seo.ts
  public/logos/                # placeholder customer logos
  public/products/             # 10 product icons (you supply)
  public/brand/                # logo, fonts
```

## 3. Data (single source of truth)

**lib/products.ts** — array of 10:
`{ slug, name, tagline, icon, href (external app URL), accent }`
Products: Book A Sloth, Ticket Dino, The Parliament, Link Lantern, Marketing Bug, Coffee & Toffee, Alluminaty, WhatsLoom, SERP Sutra, 2B Navodian.

**lib/pricing.ts** — per-product pricing (you provide numbers; I stub first).

## 4. Pages

### Homepage (sections, top→bottom)
1. **Navbar** + **Megamenu** (product grid dropdown, like screenshot).
2. **Hero** — "Let's build on systems you control forever" + subtext + 2 CTAs (Explore Ecosystem / Book a Demo → Calendly). Animated.
3. **Products grid** — 10 cards, icon + name + tagline, link out.
4. **Why-ownership** — Whop-style feature blocks (text + floating mock-UI cards): ditch SaaS rent, no commissions, own infra.
5. **Social-proof wall** — shuffling logo wall (see §5). Placeholder logos.
6. **Powered By** — circuit section (see §5b).
7. **Stats band** — big numbers + CTA.
8. **CTA band** — final "Book a Demo".
9. **Footer** — products, company+legal, newsletter (Resend), social.

### Solutions — use-case blocks (Whop feature-block style).
### Pricing — **per-product pricing**, Whop-inspired transparent cards/tables per product + Custom/Contact card.
### About — story: dependency → ownership, team.
### Blog — MDX list + post pages.
### Legal — Privacy, Terms, Cookies, Refund/SLA (placeholder copy) + cookie consent banner.

## 5. Hero component: shuffling social-proof wall

- Two columns, logos split by a rotating pair of joke headers.
- Header pairs cycle: `Real words / Not real words`, `≤7 letters / easily mistype`, `yell easily / breath control`, `>$1B / everyone else`, `Colorful / Sleek`, `Builds planes / Doesn't (yet)`.
- Center **shuffle button** re-partitions logos + swaps header pair. GSAP FLIP for smooth re-layout.
- "Open Customers" button below.
- Data-driven: `{ logo, tags: {...bool per category} }` decides column per header pair.
- Placeholder logos now; swap real later.

## 5b. Powered By circuit section

- Heading: "Built on a foundation of fast, production-grade tooling".
- Center chip node ("Powered By") with pin details.
- SVG traces route chip → 3 cards below.
- **Animated flowing current**: colored light pulses travel along each trace (cyan / pink / orange). GSAP animates a moving gradient / dash pulse on each `<path>`. Continuous loop, staggered.
- 3 cards: icon + title + ↗ external link + description.
- Card set (default = real stack): **React**, **Next.js / Turbopack**, **Tailwind + shadcn** (or your pick — see question).
- Component: `components/home/powered-by.tsx`. Traces as one SVG, pulses = animated `<circle>`/gradient along `offsetPath` or stroke-dash.
- Respects `prefers-reduced-motion` (pulses freeze).

## 6. Integrations

- **Calendly**: all "Book a Demo" → your Calendly URL (env `NEXT_PUBLIC_CALENDLY_URL`).
- **Resend**: `/api/contact` + `/api/newsletter`, env `RESEND_API_KEY`, from-domain.
- **Analytics**: `@vercel/analytics` + GA4 script (env `NEXT_PUBLIC_GA_ID`).

## 7. SEO (full)

Per-page metadata, Open Graph + Twitter cards, `sitemap.ts`, `robots.ts`, JSON-LD Organization + Product structured data, OG images.

## 8. Build order (phased, review each)

1. **Scaffold** — Next.js + TS + Tailwind + shadcn + fonts + dark theme + analytics.
2. **Layout** — navbar, megamenu, footer.
3. **Homepage** — hero → products grid → why-ownership → **shuffle wall** → stats → CTA.
4. **Pricing** page (per-product).
5. **Solutions + About**.
6. **Blog** (MDX) + sample post.
7. **Legal** pages + cookie banner.
8. **Integrations** — Calendly, Resend, GA.
9. **SEO** pass + OG images.
10. **Polish** — responsive, a11y, perf, motion tuning.
11. **Deploy** — Vercel.

## 9. You provide (blockers marked ⚠)

- ⚠ Logo SVG, 10 product icons, font files/names → `public/`.
- ⚠ 10 external product URLs.
- ⚠ Calendly URL.
- ⚠ Resend API key + verified send domain, GA4 measurement ID.
- Per-product pricing numbers (else I stub).
- Real customer logos (later; placeholders now).
- Copy for Solutions/About/legal (else placeholders).

I can start scaffold + build with placeholders for anything not yet supplied, swap real assets as they arrive.
