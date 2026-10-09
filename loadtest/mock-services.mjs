// Local stand-ins for the external services the API routes call, so a load test
// exercises our code without touching real data:
//
//   Supabase REST   POST /rest/v1/leads, POST /rest/v1/payments
//   SEO audit tool  POST /seo-audit/start, POST /seo-audit/step, GET /seo-audit/:id
//
// The audit mock answers "crawling" until MOCK_AUDIT_MS has passed for that job
// (the real tool takes ~15 s), so /api/seo-audit holds connections open the way
// it does in production. GET /__stats returns request counts.
//
// Run directly:  node loadtest/mock-services.mjs   (port MOCK_PORT, default 4010)
// Or let loadtest/serve.mjs start it alongside the app.

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";

const AUDIT_MS = Number(process.env.MOCK_AUDIT_MS ?? 12_000);
const DB_MS = Number(process.env.MOCK_DB_MS ?? 40); // typical Supabase insert latency

const jobs = new Map(); // audit id -> started at
const stats = { leads: 0, payments: 0, auditsStarted: 0, auditSteps: 0, auditResults: 0, other: 0 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const auditResult = (id) => ({
  id,
  url: "https://example.com/",
  domain: "example.com",
  pageCount: 12,
  scores: { overall: 58, ai: 41, seo: 72, color: "#f59e0b" },
  findings: [
    { title: "Missing meta descriptions on 6 pages", severity: "high", category: "Content", recommendation: "Write unique 150-160 character descriptions." },
    { title: "No LocalBusiness structured data", severity: "medium", category: "AI / AEO", recommendation: "Add LocalBusiness JSON-LD." },
    { title: "Render-blocking scripts in head", severity: "low", category: "Technical", recommendation: "Defer non-critical scripts." },
  ],
  findingsTotal: 12,
});

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(body === undefined ? "" : JSON.stringify(body));
}

export function startMockServices(port = Number(process.env.MOCK_PORT ?? 4010)) {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");

    if (req.method === "POST" && pathname === "/rest/v1/leads") {
      await readJson(req);
      await sleep(DB_MS);
      stats.leads++;
      return send(res, 201);
    }
    if (req.method === "POST" && pathname === "/rest/v1/payments") {
      const body = await readJson(req);
      await sleep(DB_MS);
      stats.payments++;
      return send(res, 201, [{ id: randomUUID(), ...body, status: "pending", created_at: new Date().toISOString(), paid_at: null }]);
    }

    if (req.method === "POST" && pathname === "/seo-audit/start") {
      await readJson(req);
      const id = randomUUID();
      jobs.set(id, Date.now());
      stats.auditsStarted++;
      return send(res, 200, { id });
    }
    if (req.method === "POST" && pathname === "/seo-audit/step") {
      const { id } = await readJson(req);
      stats.auditSteps++;
      const started = jobs.get(id);
      if (started === undefined) return send(res, 404, { error: "unknown job" });
      const elapsed = Date.now() - started;
      return send(res, 200, elapsed >= AUDIT_MS
        ? { status: "ready", progress: 100 }
        : { status: "crawling", progress: Math.round((elapsed / AUDIT_MS) * 100) });
    }
    if (req.method === "GET" && pathname.startsWith("/seo-audit/")) {
      const id = pathname.slice("/seo-audit/".length);
      if (!jobs.has(id)) return send(res, 404, { error: "unknown job" });
      jobs.delete(id);
      stats.auditResults++;
      return send(res, 200, auditResult(id));
    }

    if (pathname === "/__stats") return send(res, 200, stats);
    stats.other++;
    return send(res, 404, { error: `mock has no ${req.method} ${pathname}` });
  });
  server.listen(port, "127.0.0.1");
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startMockServices();
  console.log(`[mock] Supabase + SEO audit stand-ins on http://127.0.0.1:${process.env.MOCK_PORT ?? 4010}`);
}
