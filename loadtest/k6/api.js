// k6 load test for the parts of the site that do work per request.
// Run against the isolated server from `npm run loadtest:serve`, never the live
// site: /api/lead sends email and fires Meta conversions, /api/pay/order creates
// payment orders, /api/seo-audit drives a third-party crawler.
//
//   k6 run loadtest/k6/api.js                       (PROFILE=load)
//   k6 run -e PROFILE=smoke loadtest/k6/api.js      (quick sanity pass)
//   k6 run -e PROFILE=stress loadtest/k6/api.js     (find the breaking point)
//   k6 run -e ONLY=seo_audit loadtest/k6/api.js     (one scenario)
//
// Scenarios: pages (static + the two dynamic routes), leads, rate_limit,
// seo_audit, pay_order, newsletter. See loadtest/README.md.

import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const BASE = (__ENV.BASE_URL || "http://localhost:3200").replace(/\/$/, "");
const host = BASE.replace(/^https?:\/\//, "").split(/[:/]/)[0];
if (!["localhost", "127.0.0.1", "host.docker.internal"].includes(host)) {
  throw new Error(`Refusing to load-test ${BASE}. Point BASE_URL at the local loadtest server (npm run loadtest:serve).`);
}

const PROFILE = __ENV.PROFILE || "load";
// [scale, duration]: scale multiplies every scenario's rate / VU count.
const PROFILES = { smoke: [0.2, "20s"], load: [1, "1m"], stress: [4, "2m"] };
if (!PROFILES[PROFILE]) throw new Error(`Unknown PROFILE ${PROFILE}; use smoke, load or stress.`);
const [scale, duration] = PROFILES[PROFILE];
const n = (base) => Math.max(1, Math.round(base * scale));

const rateLimited = new Counter("lead_rate_limited");
const auditTimeouts = new Counter("seo_audit_timeouts");

const all = {
  pages: {
    executor: "ramping-vus",
    exec: "pages",
    stages: [
      { duration: "10s", target: n(20) },
      { duration, target: n(20) },
      { duration: "5s", target: 0 },
    ],
  },
  leads: { executor: "constant-arrival-rate", exec: "leads", rate: n(5), timeUnit: "1s", duration, preAllocatedVUs: n(10), maxVUs: n(50) },
  rate_limit: { executor: "per-vu-iterations", exec: "rateLimit", vus: 1, iterations: 1 },
  // Each audit holds a connection for the mock's ~12 s, like the real ~15 s crawl.
  seo_audit: { executor: "constant-vus", exec: "seoAudit", vus: n(20), duration },
  pay_order: { executor: "constant-arrival-rate", exec: "payOrder", rate: n(2), timeUnit: "1s", duration, preAllocatedVUs: n(5), maxVUs: n(20) },
  newsletter: { executor: "constant-arrival-rate", exec: "newsletter", rate: n(2), timeUnit: "1s", duration, preAllocatedVUs: n(5), maxVUs: n(20) },
};

const only = __ENV.ONLY ? __ENV.ONLY.split(",") : Object.keys(all);
export const options = {
  scenarios: Object.fromEntries(only.map((k) => {
    if (!all[k]) throw new Error(`Unknown scenario ${k}; one of ${Object.keys(all).join(", ")}.`);
    return [k, all[k]];
  })),
  thresholds: {
    // 429s in the rate_limit scenario are expected (see expectedStatuses there).
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
    "http_req_duration{name:page_static}": ["p(95)<300"],
    "http_req_duration{name:page_dynamic}": ["p(95)<800"],
    "http_req_duration{name:api_lead}": ["p(95)<1000"],
    "http_req_duration{name:api_pay_order}": ["p(95)<800"],
    "http_req_duration{name:api_newsletter}": ["p(95)<500"],
    // Mock crawl (~12 s) + the route's 800 ms polling; the route gives up at 55 s.
    "http_req_duration{name:api_seo_audit}": ["p(95)<20000"],
    seo_audit_timeouts: ["count==0"],
  },
};

const json = { headers: { "Content-Type": "application/json" } };
// Distinct client IP per request so the per-IP lead limit (5 per 10 min) doesn't
// turn a throughput test into a rate-limit test.
const fakeIp = () => `10.${__VU % 250}.${Math.floor(__ITER / 250) % 250}.${__ITER % 250}`;

const STATIC_PAGES = ["/", "/seo-company-in-nagpur", "/web-development-company-in-nagpur", "/blog", "/about"];
const DYNAMIC_PAGES = ["/case-studies", "/case-studies?page=2", "/pay?amount=499&for=Load%20test"];

export function pages() {
  const path = Math.random() < 0.7
    ? STATIC_PAGES[Math.floor(Math.random() * STATIC_PAGES.length)]
    : DYNAMIC_PAGES[Math.floor(Math.random() * DYNAMIC_PAGES.length)];
  const name = DYNAMIC_PAGES.includes(path) ? "page_dynamic" : "page_static";
  const res = http.get(BASE + path, { tags: { name } });
  check(res, { "page 200": (r) => r.status === 200 });
  sleep(1 + Math.random() * 2); // think time between page views
}

function leadBody(i) {
  return JSON.stringify({
    name: `Load Test ${i}`,
    business: "k6 Load Test",
    email: `loadtest+${i}@example.com`,
    phone: "+91 90000 00000",
    service: "SEO",
    message: "Automated load test submission, please ignore.",
    source: "k6-loadtest",
    hp_x: "",
    hp_t: 15000,
  });
}

export function leads() {
  const res = http.post(`${BASE}/api/lead`, leadBody(`${__VU}-${__ITER}`), {
    headers: { ...json.headers, "X-Forwarded-For": fakeIp() },
    tags: { name: "api_lead" },
  });
  if (res.status === 429) rateLimited.add(1);
  check(res, { "lead 200 ok": (r) => r.status === 200 && r.json("ok") === true });
}

// One client IP sends 7 leads: the route allows 5 per 10 minutes, then 429s.
export function rateLimit() {
  const ip = `10.255.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const statuses = [];
  for (let i = 0; i < 7; i++) {
    const res = http.post(`${BASE}/api/lead`, leadBody(`rl-${i}`), {
      headers: { ...json.headers, "X-Forwarded-For": ip },
      tags: { name: "api_lead_ratelimit" },
      responseCallback: http.expectedStatuses(200, 429),
    });
    statuses.push(res.status);
  }
  check(statuses, {
    "first 5 accepted": (s) => s.slice(0, 5).every((x) => x === 200),
    "6th and 7th rate limited": (s) => s[5] === 429 && s[6] === 429,
  });
}

export function seoAudit() {
  const res = http.get(`${BASE}/api/seo-audit?url=example.com`, { tags: { name: "api_seo_audit" }, timeout: "70s" });
  if (res.status === 504) auditTimeouts.add(1);
  check(res, { "audit 200 with scores": (r) => r.status === 200 && r.json("scores.overall") !== null });
}

export function payOrder() {
  const res = http.post(
    `${BASE}/api/pay/order`,
    JSON.stringify({ amount: 499, purpose: "k6 load test", name: "Load Test", email: "loadtest@example.com" }),
    { ...json, tags: { name: "api_pay_order" } },
  );
  check(res, { "order created": (r) => r.status === 200 && !!r.json("orderId") });
}

export function newsletter() {
  const res = http.post(`${BASE}/api/newsletter`, JSON.stringify({ email: `loadtest+${__VU}-${__ITER}@example.com` }), {
    ...json,
    tags: { name: "api_newsletter" },
  });
  check(res, { "newsletter 200": (r) => r.status === 200 });
}
