# Load testing (k6)

Load tests run against a local production build that is cut off from every real
service. Never point them at timewheel.co.in or a Vercel preview: `/api/lead`
saves leads, sends emails and fires Meta conversions, `/api/pay/order` creates
payment orders, and `/api/seo-audit` drives the crawler on shubhamdatarkar.com.
The k6 script refuses any host other than `localhost`, `127.0.0.1` or
`host.docker.internal`.

## Run it

```bash
npm run build
```

```bash
npm run loadtest:serve
```

Then, in a second terminal:

```bash
npm run loadtest:smoke
```

```bash
npm run loadtest
```

`loadtest:serve` starts the app on http://localhost:3200 and the mocks on
http://127.0.0.1:4010. It blanks every key named in `.env`, `.env.local`,
`.env.production(.local)` and `.env.example` (Next never lets a `.env` file
overwrite a variable already set in the process, even to `""`), then points
`SUPABASE_URL` and `SEO_AUDIT_BASE` at `mock-services.mjs`. Mock request counts:
http://127.0.0.1:4010/__stats.

Without k6 installed, Docker works too:

```bash
docker run --rm -i grafana/k6 run -e BASE_URL=http://host.docker.internal:3200 - < loadtest/k6/api.js
```

## Options

| Variable | Default | Meaning |
| --- | --- | --- |
| `PROFILE` | `load` | `smoke` (0.2x for 20s), `load` (1x for 1m), `stress` (4x for 2m) |
| `ONLY` | all | Comma list of scenarios, e.g. `-e ONLY=seo_audit,leads` |
| `BASE_URL` | `http://localhost:3200` | Local only |
| `MOCK_AUDIT_MS` | `12000` | How long the mock crawl takes (set on `loadtest:serve`) |
| `MOCK_DB_MS` | `40` | Mock Supabase insert latency |
| `LOADTEST_PORT`, `MOCK_PORT` | `3200`, `4010` | Ports |

## Scenarios (load profile)

| Scenario | Shape | Pass if |
| --- | --- | --- |
| `pages` | 20 browsing users, 70% static pages, 30% `/case-studies` and `/pay` | p95 static < 300 ms, dynamic < 800 ms |
| `leads` | 5 submissions/s, a different client IP each | 200 `ok`, p95 < 1 s |
| `rate_limit` | one IP sends 7 leads | first 5 accepted, 6th and 7th get 429 |
| `seo_audit` | 20 users each holding a ~12 s audit open | 200 with scores, p95 < 20 s, no 504s |
| `pay_order` | 2 orders/s | `orderId` returned, p95 < 800 ms |
| `newsletter` | 2 signups/s | 200, p95 < 500 ms |

Global: under 1% failed requests, over 99% of checks passing.

## Reading the results

- Page numbers come from a single local Node process with no CDN. In
  production Vercel serves the static pages from its edge, so treat them as a
  floor for the two dynamic routes, not a forecast for static ones.
- The lead rate limit is an in-memory map per server instance
  (`app/api/lead/route.ts`). `rate_limit` proves it works on one instance; on
  Vercel each running instance keeps its own count, so the real ceiling per IP
  is higher.
- Not covered: `/api/comment` (needs a working SMTP server), the Zoho session,
  verify and webhook routes (need Zoho), and `/api/lifecycle` (secret-protected).
