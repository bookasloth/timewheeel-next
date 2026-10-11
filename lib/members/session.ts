import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createAdminClient, createClient, membersConfigured } from "@/lib/supabase/server";
import { site } from "@/lib/site";

// Data access layer for member pages. Every page, server action and route that
// shows or changes member data calls one of these; the proxy's redirects are
// only a convenience on top.

export type Member = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  avatarUrl: string | null;
  /** "email", "google", ... */
  providers: string[];
  joinedAt: string;
  role: "member" | "writer" | "admin";
  isAdmin: boolean;
  /** Admins and writers can use the blog editor in the admin console. */
  canWriteBlog: boolean;
  premiumUntil: string | null;
  /** Admins always count as premium so they can check premium pages. */
  isPremium: boolean;
  /** Paid or granted Premium that hasn't expired (admins excluded). */
  hasPaidPremium: boolean;
  profile: { headline: string; business_name: string; website: string; city: string; bio: string };
  emailPrefs: { replies: boolean; announcements: boolean };
};

export const getUser = cache(async (): Promise<User | null> => {
  if (!membersConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
});

/** Addresses that are always admins (comma-separated). Defaults to the team mailbox. */
function adminEmails() {
  return (process.env.MEMBERS_ADMIN_EMAILS || site.contact.email)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export const getMember = cache(async (): Promise<Member | null> => {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const [{ data: profile }, { data: membership }] = await Promise.all([
    supabase.from("profiles").select("full_name, avatar_url, headline, business_name, website, city, bio").eq("id", user.id).maybeSingle(),
    supabase.from("memberships").select("role, premium_until, email_prefs").eq("user_id", user.id).maybeSingle(),
  ]);

  const meta = (user.user_metadata ?? {}) as Record<string, string | undefined>;
  const email = (user.email ?? "").toLowerCase();
  const name = (profile?.full_name || meta.full_name || meta.name || email.split("@")[0] || "Member").trim();
  // An address only counts once it's verified (Google always is; email
  // sign-ups after they click the confirmation link).
  const envAdmin = Boolean(user.email_confirmed_at) && adminEmails().includes(email);
  const isAdmin = membership?.role === "admin" || envAdmin;
  const role = isAdmin ? "admin" : membership?.role === "writer" ? "writer" : "member";
  // Record team accounts as admins in the database too, so the community can
  // label them and admin lists stay accurate. One write, the first time only.
  if (envAdmin && membership?.role !== "admin") {
    try {
      await createAdminClient().from("memberships").upsert({ user_id: user.id, role: "admin", updated_at: new Date().toISOString() });
    } catch {}
  }
  const premiumUntil: string | null = membership?.premium_until ?? null;
  const paid = Boolean(premiumUntil && new Date(premiumUntil) > new Date());

  return {
    id: user.id,
    email,
    name,
    firstName: name.split(/\s+/)[0],
    avatarUrl: profile?.avatar_url || meta.avatar_url || meta.picture || null,
    providers: (user.app_metadata?.providers as string[] | undefined) ?? [user.app_metadata?.provider ?? "email"],
    joinedAt: user.created_at,
    role,
    isAdmin,
    canWriteBlog: isAdmin || role === "writer",
    premiumUntil,
    isPremium: isAdmin || paid,
    hasPaidPremium: paid,
    profile: {
      headline: profile?.headline ?? "",
      business_name: profile?.business_name ?? "",
      website: profile?.website ?? "",
      city: profile?.city ?? "",
      bio: profile?.bio ?? "",
    },
    emailPrefs: {
      replies: (membership?.email_prefs as { replies?: boolean } | null)?.replies !== false,
      announcements: (membership?.email_prefs as { announcements?: boolean } | null)?.announcements === true,
    },
  };
});

export async function requireMember(next = "/members"): Promise<Member> {
  const member = await getMember();
  if (!member) redirect(`/login?next=${encodeURIComponent(next)}`);
  return member;
}

/** Admin pages 404 for everyone else rather than revealing they exist. */
export async function requireAdmin(): Promise<Member> {
  const member = await requireMember("/admin");
  if (!member.isAdmin) notFound();
  return member;
}

/** The admin console shell: admins, plus writers (who only see the blog). */
export async function requireStaff(): Promise<Member> {
  const member = await requireMember("/admin");
  if (!member.canWriteBlog) notFound();
  return member;
}

/** Blog editor pages and actions. */
export async function requireBlogEditor(): Promise<Member> {
  const member = await requireMember("/admin/blog");
  if (!member.canWriteBlog) notFound();
  return member;
}

/** The origin this request came in on, for auth email and OAuth return links.
 * Supabase only honours URLs on its redirect allow list, so a forged Host
 * header can't send anyone elsewhere. */
export async function requestOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  if (!host) return site.url;
  const proto = h.get("x-forwarded-proto") || (/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
}

export async function requestIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
