import { NextResponse, type NextRequest } from "next/server";
import { createClient, membersConfigured } from "@/lib/supabase/server";
import { MEMBER_HINT_COOKIE } from "@/lib/members/config";

// POST only (a form button), so a link or prefetch can never sign anyone out.
export async function POST(request: NextRequest) {
  if (membersConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  const res = NextResponse.redirect(new URL("/login?signedout=1", request.url), 303);
  res.cookies.delete(MEMBER_HINT_COOKIE);
  return res;
}
