// Server half of lib/attribution: read first-touch attribution off a form post.
// Shared by the public form routes (/api/lead, /api/academy/interest).
import type { Attribution } from "@/lib/attribution";

// Merge client-sent attribution with the tw_attribution cookie (client wins).
// Every value is string-cleaned and length-capped before it touches the DB.
export function resolveAttribution(fromBody: Attribution | undefined, cookieHeader: string | null): Attribution {
  let fromCookie: Attribution = {};
  const raw = cookieHeader ? /(?:^|;\s*)tw_attribution=([^;]+)/.exec(cookieHeader)?.[1] : undefined;
  if (raw) {
    try {
      fromCookie = JSON.parse(decodeURIComponent(raw)) as Attribution;
    } catch {
      /* malformed cookie, ignore */
    }
  }
  const merged = { ...fromCookie, ...(fromBody && typeof fromBody === "object" ? fromBody : {}) };
  const out: Attribution = {};
  for (const [k, v] of Object.entries(merged)) {
    if (typeof v === "string" && v.trim()) out[k as keyof Attribution] = v.trim().slice(0, 200);
  }
  return out;
}

// One-line human summary for notification emails (source/medium/campaign).
export function summarizeCampaign(a: Attribution): string {
  const parts = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean);
  const base = parts.length ? parts.join(" / ") : "";
  const click = a.gclid ? " · gclid" : a.fbclid ? " · fbclid" : "";
  return base ? base + click : click ? click.replace(/^ · /, "") : "";
}
