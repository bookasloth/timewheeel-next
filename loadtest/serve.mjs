// Starts the production build for load testing, cut off from every real service.
//
// Next.js never lets a .env file overwrite a variable that is already set in
// the process, even to "". So we set every key named in any .env* file to ""
// (no SMTP, Resend, Meta CAPI, Zoho, Supabase keys survive), then point the two
// services the API needs to answer at local mocks (loadtest/mock-services.mjs):
//   SUPABASE_URL   -> mock, so /api/lead and /api/pay/order get a 2xx "insert"
//   SEO_AUDIT_BASE -> mock, so /api/seo-audit never hits the real audit tool
//
//   npm run build            (once, or after code changes)
//   npm run loadtest:serve   (app on http://localhost:3200, mocks on :4010)

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { startMockServices } from "./mock-services.mjs";

const root = join(import.meta.dirname, "..");
const PORT = process.env.LOADTEST_PORT ?? "3200";
const MOCK_PORT = Number(process.env.MOCK_PORT ?? 4010);

if (!existsSync(join(root, ".next", "BUILD_ID"))) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

const envFiles = [".env", ".env.local", ".env.production", ".env.production.local", ".env.example"];
const keys = new Set();
for (const f of envFiles) {
  const path = join(root, f);
  if (!existsSync(path)) continue;
  for (const m of readFileSync(path, "utf8").matchAll(/^\s*(?:export\s+)?([A-Za-z_][\w.-]*)\s*=/gm)) keys.add(m[1]);
}

const env = { ...process.env, NODE_ENV: "production" };
for (const k of keys) env[k] = "";
const mock = `http://127.0.0.1:${MOCK_PORT}`;
Object.assign(env, {
  SUPABASE_URL: mock,
  SUPABASE_SECRET_KEY: "loadtest-not-a-real-key",
  SEO_AUDIT_BASE: `${mock}/seo-audit`,
});

const mockServer = startMockServices(MOCK_PORT);
console.log(`[loadtest] blanked ${keys.size} env keys from ${envFiles.filter((f) => existsSync(join(root, f))).join(", ")}`);
console.log(`[loadtest] mocks (Supabase REST + SEO audit) on ${mock}, stats at ${mock}/__stats`);
console.log(`[loadtest] app on http://localhost:${PORT}`);

const next = spawn(process.execPath, [join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", PORT], {
  cwd: root,
  env,
  stdio: "inherit",
});

const stop = () => {
  next.kill();
  mockServer.close();
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
next.on("exit", (code) => {
  mockServer.close();
  process.exit(code ?? 0);
});
