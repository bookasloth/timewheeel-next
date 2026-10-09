# Perceived-speed and interaction audit (2026-10-09)

Scope: the whole public site. Stack: Next.js 16 App Router (Turbopack), React 19,
Tailwind v4 + shadcn primitives, GSAP (`Reveal`, `RevealHeading`), framer-motion,
no client data library (plain `fetch` in client components), no global state.

## What the site actually is

78 routes; `next build` prerenders all but two as static HTML (`○`/`●`). The only
dynamic pages are `/case-studies` (reads `?page=`) and `/pay` (reads `?amount=`,
`?for=`). There are no dashboards, tables, booking calendars, saved items or
other reversible user state, so the parts of a loading-state system aimed at
those (optimistic toggles, list skeletons fed by APIs, stale-while-revalidate
caches) have nothing to attach to. Client-side work is limited to:

| Flow | Where | Latency |
| --- | --- | --- |
| SEO audit | `components/seo/hero.tsx`, `components/seo/report-client.tsx` -> `/api/seo-audit` | ~15 s (upstream crawl) |
| Lead forms | `shared/lead-form`, `challenge/challenge-form`, `seo/audit-lead-modal`, `shared/growth-blueprint-modal` -> `/api/lead` | ~1 s (SMTP + Supabase) |
| Comments, newsletter | `blog/comments`, `newsletter-form` | < 1 s |
| Payments | `pay/pay-form` -> `/api/pay/order` + Zoho widget | 1-3 s (script + order) |

## Findings, ranked by impact

1. **Hero content blinks out on every hard page load.** `Reveal`
   (`components/reveal.tsx`), `RevealHeading` (`components/anim/reveal-heading.tsx`)
   and the home hero (`components/home/hero.tsx`) run `gsap.from({ opacity: 0 })`
   on hydration. The server HTML has already painted by then, so above-the-fold
   content the visitor is reading vanishes and fades back in. 14 `Reveal`-wrapped
   heroes plus the home hero. Every ad click is a hard load. Measured with
   headless Chromium (elements in the viewport hidden after first paint):
   home 4, SEO 7, about 2, web-dev 1. `Reveal` also ignored
   `prefers-reduced-motion`.
2. **`/seo-report` flashes "No site to report on" to every visitor who has a site.**
   The page is static, `site` started as `""`, so the server HTML rendered the
   empty state until the client effect read `?site=`. Then a lone spinner for
   ~15 s. The header date was rendered at build time (stale date, hydration
   mismatch).
3. **Buttons give no press feedback, and stick on touch.** `.btn` had no `:active`
   or `:focus-visible` state. `.btn-primary:hover` flips to white, and on phones
   `:hover` sticks after a tap, so the primary CTA turned white after being
   tapped and stayed that way. Disabled (submitting) buttons still flipped on hover.
4. **Newsletter failures are silent.** On a non-200 the form re-enabled with no
   message (`components/newsletter-form.tsx`), and the busy state was a bare "…".
5. **Dynamic routes have no instant navigation state.** `/case-studies` and `/pay`
   render per request with no `loading.tsx`, so a click waits on the server with
   no feedback (Next only prefetches up to the nearest loading boundary).
6. **Submit feedback is inconsistent.** Some forms show text-only "Sending…",
   errors aren't announced (`role="alert"` missing in comments, audit modal,
   blueprint modal), no `aria-busy`. The pay form relied on React state alone to
   block a second submit, and each submit creates a payment order.
7. **Checkout waits on a third-party script after the click.** The Zoho widget
   script only started loading when "Pay" was pressed.
8. **Deprecated image API.** 10 `next/image` usages pass `priority`, deprecated in
   Next 16 in favour of `preload`. The 32px navbar logo was preloaded on every
   page, spending a preload slot alongside each hero image. Blog cards rendered
   every cover eagerly.
9. **Minor:** the review page's "Copied" timer stacked on repeat clicks and could
   fire after unmount; the SEO hero audit could resolve into an unmounted page.

Not changed, worth a look: case-study cards fall back to `picsum.photos`
placeholders (third-party images on a trust page); `/seo-report` sets state in a
mount effect (pre-existing lint error).

## What was done

- `components/anim/entrance.ts`: `skipEntrance(el, clientMount)` skips an
  entrance animation when we're hydrating server HTML that has already painted
  and the element is in the viewport, or under reduced motion. Client-side
  navigations and below-the-fold reveals animate as before. Wired into
  `Reveal`, `RevealHeading` and the home hero. Re-measured: 0 blinks on all five
  pages; below-fold headings still armed 13/13; client nav to /about still animates.
- `components/ui/skeleton.tsx` + `.skeleton`/`.skeleton-delay` in `globals.css`:
  pulse placeholder that only fades in after 150 ms (pure CSS, so no timers or
  races, no minimum display time), static under reduced motion,
  `role="status"` for screen readers.
- `/seo-report`: unknown-site state renders a report-shaped skeleton (score card,
  sub-scores, finding cards) instead of the empty state; date rendered client-side;
  error is an alert.
- `app/(public)/case-studies/loading.tsx`, `app/(public)/pay/loading.tsx`: route
  fallbacks with the real heading and a skeleton shaped like the grid / form.
- `.btn`: instant `:active` darken (no movement, per the no-lift rule),
  `:focus-visible` ring, hover only under `(hover: hover)`, no hover reaction
  while disabled, `cursor: progress` when `aria-busy`.
- Forms: spinner + label on submit, `aria-busy`, `role="alert"` errors, early
  return while submitting; values are kept on failure (unchanged). Pay form has
  a ref lock against a second order and preloads the Zoho script on first focus.
- Images: `priority` -> `preload`; navbar logo `loading="eager"` without preload;
  blog thumbnails lazy + async decode (featured stays eager); category tabs expose
  `aria-pressed`.

## Next phases (not done)

1. Swap `picsum.photos` fallbacks for local images.
2. Run Lighthouse / field Web Vitals (Vercel Analytics Speed Insights) on the ad
   landing pages after deploy to confirm LCP/INP, then decide on any further
   hero-image or JS-weight work with real numbers.
3. Check the growth-blueprint modal's full-screen WebGL canvas on low-end phones.
