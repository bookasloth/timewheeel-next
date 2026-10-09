// Shared rate limit for the public API routes. Counts live in Supabase
// (public.rate_limit_hit, supabase/migrations/0004_rate_limits.sql) so every
// Vercel instance sees the same numbers.
//
// Fails open to an in-memory count on this instance (the old behaviour) when
// Supabase is unconfigured, slow, or the function isn't there yet: a limiter
// outage must never block a real lead.

type Limit = { windowSeconds: number; max: number };

const memory = new Map<string, number[]>();
let warned = false;

function memoryHit(key: string, { windowSeconds, max }: Limit): boolean {
  const now = Date.now();
  const recent = (memory.get(key) ?? []).filter((t) => now - t < windowSeconds * 1000);
  recent.push(now);
  memory.set(key, recent);
  return recent.length > max;
}

/** Records one hit for `key`; resolves true when the caller should be refused. */
export async function isRateLimited(key: string, limit: Limit): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (url && secret) {
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/rate_limit_hit`, {
        method: "POST",
        headers: { apikey: secret, Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
        body: JSON.stringify({ p_key: key, p_window_seconds: limit.windowSeconds, p_max: limit.max }),
        cache: "no-store",
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) return (await res.json()) === true;
      if (!warned) console.error("Rate limit RPC failed, using per-instance count:", res.status, await res.text().catch(() => ""));
    } catch (err) {
      if (!warned) console.error("Rate limit RPC error, using per-instance count:", err);
    }
    warned = true;
  }
  return memoryHit(key, limit);
}

/** Client IP as set by Vercel's edge ("unknown" locally). */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
