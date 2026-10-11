import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

// Reads for the admin pages (service key). Callers must have run requireAdmin().

export type AdminDownload = {
  id: string;
  created_at: string;
  title: string;
  category: string;
  tier: "free" | "premium";
  file_name: string;
  file_size: number | null;
  published: boolean;
  downloads: number;
};

export async function listAllDownloads(): Promise<AdminDownload[]> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("downloads")
    .select("id, created_at, title, category, tier, file_name, file_size, published, download_events(count)")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) console.error("listAllDownloads:", error.message);
  return ((data ?? []) as unknown as (Omit<AdminDownload, "downloads"> & { download_events: { count: number }[] })[]).map(
    ({ download_events, ...d }) => ({ ...d, downloads: download_events?.[0]?.count ?? 0 }),
  );
}

export type AdminMember = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  providers: string[];
  role: "member" | "admin";
  premium_until: string | null;
};

export async function listMembers(q = ""): Promise<{ members: AdminMember[]; total: number; premium: number }> {
  const db = createAdminClient();
  const { data, error } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) {
    console.error("listMembers:", error.message);
    return { members: [], total: 0, premium: 0 };
  }
  const users = data.users;
  const ids = users.map((u) => u.id);
  const [{ data: memberships }, { data: profiles }] = await Promise.all([
    db.from("memberships").select("user_id, role, premium_until").in("user_id", ids),
    db.from("profiles").select("id, full_name").in("id", ids),
  ]);
  const ms = new Map((memberships ?? []).map((r) => [r.user_id as string, r]));
  const ps = new Map((profiles ?? []).map((r) => [r.id as string, r.full_name as string | null]));
  const now = Date.now();

  const all: AdminMember[] = users
    .map((u) => ({
      id: u.id,
      email: u.email ?? "",
      name: ps.get(u.id) ?? (u.user_metadata?.full_name as string | undefined) ?? null,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      confirmed: Boolean(u.email_confirmed_at),
      providers: (u.app_metadata?.providers as string[] | undefined) ?? [],
      role: (ms.get(u.id)?.role === "admin" ? "admin" : "member") as AdminMember["role"],
      premium_until: (ms.get(u.id)?.premium_until as string | null) ?? null,
    }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  const needle = q.trim().toLowerCase();
  const members = needle ? all.filter((m) => m.email.toLowerCase().includes(needle) || (m.name ?? "").toLowerCase().includes(needle)) : all;
  return {
    members: members.slice(0, 200),
    total: all.length,
    premium: all.filter((m) => m.premium_until && new Date(m.premium_until).getTime() > now).length,
  };
}
