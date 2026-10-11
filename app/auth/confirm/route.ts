import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient, membersConfigured } from "@/lib/supabase/server";
import { MEMBER_HINT_COOKIE, safeNext } from "@/lib/members/config";

// Token-hash email links (the templates in docs/members-setup.md). Unlike the
// ?code= flow these work even when the email is opened on another device.
const TYPES: EmailOtpType[] = ["signup", "invite", "magiclink", "recovery", "email_change", "email"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(searchParams.get("next"), type === "recovery" ? "/reset-password" : "/members?welcome=1");
  const fail = (reason: string) => NextResponse.redirect(new URL(`/login?error=${reason}`, request.url));

  if (!membersConfigured()) return fail("unavailable");
  if (!tokenHash || !type || !TYPES.includes(type)) return fail("link");

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) {
    console.error("Email link verify failed:", error.code, error.message);
    return fail(error.code === "otp_expired" ? "expired" : "link");
  }

  const res = NextResponse.redirect(new URL(next, request.url));
  res.cookies.set(MEMBER_HINT_COOKIE, "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
