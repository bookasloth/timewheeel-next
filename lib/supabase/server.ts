import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Supabase clients for member accounts (supabase/migrations/0006_members.sql).
//
// The browser never talks to Supabase directly: sign-in, sign-up and every
// member read/write go through server components, server actions and route
// handlers. That lets the auth cookies be httpOnly, so page scripts (GTM, ad
// pixels) can never read a session token.
//
// Env (server):
//   NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY   the anon/publishable key; RLS applies
//   SUPABASE_SECRET_KEY                    service role, admin + webhook work only

export const AUTH_COOKIE_OPTIONS = { httpOnly: true, sameSite: "lax" as const, path: "/", secure: process.env.NODE_ENV === "production" };

export function supabaseEnv() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";
  return { url, publishable, secret: process.env.SUPABASE_SECRET_KEY || "" };
}

export function membersConfigured() {
  const { url, publishable } = supabaseEnv();
  return Boolean(url && publishable);
}

/** Per-request client acting as the signed-in member (RLS applies). */
export async function createClient() {
  const { url, publishable } = supabaseEnv();
  if (!url || !publishable) throw new Error("Member accounts need NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  const store = await cookies();
  return createServerClient(url, publishable, {
    cookieOptions: AUTH_COOKIE_OPTIONS,
    cookies: {
      getAll: () => store.getAll(),
      setAll(toSet) {
        // Server components can't set cookies; the proxy refreshes the session
        // for them, so a write attempted during render is safe to drop.
        try {
          toSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {}
      },
    },
  });
}

/** Service-role client. Bypasses RLS: only call after checking who is asking. */
export function createAdminClient() {
  const { url, secret } = supabaseEnv();
  if (!url || !secret) throw new Error("Admin actions need SUPABASE_URL and SUPABASE_SECRET_KEY");
  return createSupabaseClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
