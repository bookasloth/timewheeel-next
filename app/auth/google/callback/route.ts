import { NextResponse, type NextRequest } from "next/server";
import { createClient, membersConfigured } from "@/lib/supabase/server";
import { MEMBER_HINT_COOKIE, safeNext } from "@/lib/members/config";
import { GOOGLE_STATE_COOKIE, GOOGLE_STATE_PATH, exchangeGoogleCode, googleConfigured } from "@/lib/members/google";
import { requestOrigin } from "@/lib/members/session";

// Google sends people back here (our own domain, see lib/members/google.ts).
// Check the state cookie, swap the code for an ID token, sign in to Supabase.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  let saved: { state?: string; next?: string } = {};
  try {
    saved = JSON.parse(request.cookies.get(GOOGLE_STATE_COOKIE)?.value ?? "{}");
  } catch {}
  const next = safeNext(saved.next);

  const finish = (to: string) => {
    const res = NextResponse.redirect(new URL(to, request.url));
    res.cookies.set(GOOGLE_STATE_COOKIE, "", { path: GOOGLE_STATE_PATH, maxAge: 0 });
    return res;
  };
  const fail = (reason: string) => finish(`/login?error=${reason}&next=${encodeURIComponent(next)}`);

  if (!membersConfigured() || !googleConfigured()) return fail("unavailable");
  // They backed out on Google's screen.
  if (searchParams.get("error") === "access_denied") return finish(`/login?next=${encodeURIComponent(next)}`);

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code || !state || !saved.state || state !== saved.state) return fail("google");

  const idToken = await exchangeGoogleCode(code, await requestOrigin());
  if (!idToken) return fail("google");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({ provider: "google", token: idToken });
  if (error) {
    console.error("Supabase Google ID token sign-in failed:", error.code, error.message);
    return fail("google");
  }

  const res = finish(next);
  res.cookies.set(MEMBER_HINT_COOKIE, "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
