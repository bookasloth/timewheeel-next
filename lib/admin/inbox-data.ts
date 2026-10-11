import "server-only";
import { createAdminClient, supabaseEnv } from "@/lib/supabase/server";

// Contact-form enquiries (the `leads` table, migration 0001) for the admin
// inbox. Callers check requireAdmin() first.

export const LEAD_STATUSES = ["new", "contacted", "delivered", "upsell", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string | null;
  service: string;
  message: string;
  budget: string | null;
  category: string | null;
  location: string | null;
  marketing_consent: boolean | null;
  source: string;
  status: LeadStatus;
  delivered_url: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landing_path: string | null;
};

const configured = () => Boolean(supabaseEnv().url && supabaseEnv().secret);

export async function countNewMessages(): Promise<number> {
  if (!configured()) return 0;
  const { count } = await createAdminClient().from("leads").select("id", { count: "exact", head: true }).eq("status", "new");
  return count ?? 0;
}

export async function listLeads({ q = "", status = "all", source = "" } = {}) {
  if (!configured()) return { leads: [] as Lead[], sources: [] as string[], counts: {} as Record<string, number> };
  const db = createAdminClient();
  let query = db
    .from("leads")
    .select("id, created_at, name, business, email, phone, service, message, source, status, location, budget")
    .order("created_at", { ascending: false })
    .limit(300);
  if ((LEAD_STATUSES as readonly string[]).includes(status)) query = query.eq("status", status);
  if (source) query = query.eq("source", source);
  const term = q.trim().replace(/[%,()]/g, " ").slice(0, 80);
  if (term) query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,business.ilike.%${term}%,phone.ilike.%${term}%,message.ilike.%${term}%`);
  const [{ data, error }, { data: all }] = await Promise.all([query, db.from("leads").select("status, source").limit(5000)]);
  if (error) console.error("listLeads:", error.message);
  const counts: Record<string, number> = { all: all?.length ?? 0 };
  const sources = new Set<string>();
  for (const r of all ?? []) {
    counts[r.status] = (counts[r.status] ?? 0) + 1;
    if (r.source) sources.add(r.source);
  }
  return { leads: (data ?? []) as Lead[], sources: [...sources].sort(), counts };
}

export async function getLead(id: string): Promise<Lead | null> {
  if (!configured() || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await createAdminClient().from("leads").select("*").eq("id", id).maybeSingle();
  return (data as Lead | null) ?? null;
}
