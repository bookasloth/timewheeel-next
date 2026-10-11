import { NextResponse, type NextRequest } from "next/server";
import { createClient, membersConfigured } from "@/lib/supabase/server";
import { MEMBER_HINT_COOKIE, safeNext } from "@/lib/members/config";

// Where Google sign-in and the links in auth emails land. Supabase sends a
// one-time ?code=, we swap it for a session (cookies), then go to ?next=.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");
  const fail = (reason: string) => NextResponse.redirect(new URL(`/login?error=${reason}&next=${encodeURIComponent(next)}`, request.url));

  if (!membersConfigured()) return fail("unavailable");
  if (searchParams.get("error")) {
    console.error("Auth callback error:", searchParams.get("error_code"), searchParams.get("error_description"));
    return fail(searchParams.get("error_code") === "otp_expired" ? "expired" : "link");
  }
  if (!code) return fail("link");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    // Usually an email link opened in a different browser from the one that
    // asked for it. The account is confirmed; they just need to log in.
    console.error("Code exchange failed:", error.code, error.message);
    return fail(error.code === "flow_state_not_found" || error.code === "bad_code_verifier" ? "other-browser" : "link");
  }

  const res = NextResponse.redirect(new URL(next, request.url));
  res.cookies.set(MEMBER_HINT_COOKIE, "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
