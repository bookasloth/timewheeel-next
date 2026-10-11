import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/server";

// Cookie-free client with the publishable key, for public content (the blog).
// No session, so pages that use it can stay static and revalidate (ISR). RLS
// decides what it may read: published posts whose publish time has passed.
export function createPublicClient() {
  const { url, publishable } = supabaseEnv();
  if (!url || !publishable) return null;
  return createClient(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
