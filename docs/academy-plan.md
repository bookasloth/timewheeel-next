# Timewheel Digital Marketing Academy: audit and plan

Written before implementation (2026-10-10). The shipped result is summarised at
the bottom.

## What the codebase already has

| Area | Finding | Academy decision |
| --- | --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript, Tailwind v4 tokens in `app/globals.css`, npm | Same stack, no new dependencies |
| Public chrome | `app/(public)/layout.tsx` wraps every page in `Navbar` + `Footer` | Academy lives at `app/(public)/academy/*` |
| Design system | Cream paper, ink text, orange `--brand`; `.btn .btn-primary/.btn-outline`; `Reveal`, `RevealHeading`; lucide + Phosphor icons; plain uppercase eyebrows; no shadows, no hover lift | Reuse all of it. No new palette. |
| Content model | Data files in `lib/*.ts` drive pages (`lib/jobs.ts` -> careers list + detail + form + JSON-LD) | `lib/academy.ts` is the single source for programs, projects, FAQs |
| Auth / users / dashboards | None. No auth library, no sessions, no user table | No student dashboard in this phase (see "Next phase") |
| Forms + backend | `/api/lead` -> Supabase `leads` (PostgREST, service key) + SMTP team email + Resend confirmation; honeypot (`lib/honeypot.ts`), shared rate limit (`lib/rate-limit.ts`), attribution cookie | New `/api/academy/interest` reusing honeypot, rate limit, attribution and Resend. Own table because `/api/lead` requires business, phone and a message, and student signups must not count as business leads in Meta/GA4 |
| SEO | Per-page `alternates.canonical`, `social()` OG helper, JSON-LD builders in `lib/jsonld.ts`, `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` | Same helpers, sitemap and llms.txt entries. No Course/EducationalOrganization/Review schema (not eligible yet) |
| Analytics | Event bus `lib/analytics`, `useFormTracking` | New `academy_interest` event instead of `lead_captured` |
| Tests | No test runner. `npm run lint`, `tsc`, `npm run build`; `loadtest/serve.mjs` runs the prod build against local mocks with every real key blanked | Verify with lint, tsc, build, then the mock harness for the API |

## Routes

- `/academy` landing
- `/academy/programs` all programs
- `/academy/programs/[slug]` program detail (static params, unknown slugs 404)
- `/academy/projects` sample projects and assignments
- `/academy/about` mission and approach
- `/academy/faq` questions (FAQPage JSON-LD mirrors the visible list)
- `POST /api/academy/interest` register interest

## Enrollment status, honestly

Nothing is open for paid enrollment yet: there is no course delivery, schedule
or fee. Programs carry a status:

- `interest`: first cohort being planned, students register interest (SEO,
  Content and Social, AI for Digital Marketing)
- `upcoming`: later, students can ask to be notified (Performance, Analytics)
- `enrolling`: supported by the data model and UI for when a cohort opens

No placement or job guarantees, student counts, testimonials, instructor bios or prices.

Confirmed real offerings (2026-10-10): a Timewheel certificate on completion,
help completing Google, Meta, HubSpot and LinkedIn online certifications
(issued by those platforms), and internships in-house at Timewheel and at
sister companies. Copy lives in `CAREER_SUPPORT` / `CERT_PLATFORMS` in
`lib/academy.ts`; each program has `certPlatforms`.

## Data

`supabase/migrations/0005_academy_interest.sql`: `academy_interest` table,
unique `(email, program_slug)` to stop duplicates, checks on lengths and the
stage list, indexes on program, status and created_at, RLS on with no policies
(service key only). Until it is applied the route falls back to the SMTP team
email so no registration is lost.

## Shipped (2026-10-10)

- Content: `lib/academy.ts` (programs, statuses, sample projects, FAQs, form
  stages). Edit this file to add or change a program; pages, sitemap, form
  options and API validation follow.
- Pages: `app/(public)/academy/**` (static, `dynamicParams = false` on
  `[slug]`), components in `components/academy/`.
- API: `app/api/academy/interest/route.ts` -> `lib/academy-store.ts` (Supabase),
  `lib/smtp.ts` (team email), `sendAcademyInterest` (student confirmation via
  Resend). Shared `lib/attribution-server.ts` now also used by `/api/lead`.
- Navigation: navbar Resources (desktop mega menu rail + mobile accordion),
  footer Company column, Academy section bar on every /academy page.
- SEO: unique titles/descriptions, canonicals, OG/Twitter via `social()`,
  breadcrumbs (visible + BreadcrumbList), CollectionPage/WebPage/AboutPage,
  FAQPage only where questions are visible, sitemap, llms.txt.

### Ops steps before relying on it in production

1. Apply `supabase/migrations/0005_academy_interest.sql` in the Supabase SQL
   editor (project nefmwittrybufjqhpxip). Until then registrations still reach
   the team by email (flagged "Not in the database") but duplicates are not
   detected.
2. No new env vars. Uses the existing `SUPABASE_URL`, `SUPABASE_SECRET_KEY`,
   `SMTP_*`, `LEAD_TO`, `RESEND_API_KEY`.
3. View registrations: Supabase Table Editor -> `academy_interest`. Move
   `status` through new -> contacted -> enrolled / withdrawn.
4. When a cohort opens: set the program's `status` to `"enrolling"`, update
   `duration`, `format` and `pricing` with the real details.

## Next phase (not built)

Student accounts (Supabase Auth would fit the existing project), a dashboard
for registered programs and status, assignment submission, an admin view for
the interest list. Each needs auth first.
