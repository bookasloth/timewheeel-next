import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { MEMBER_HINT_COOKIE, MEMBERS_HOME, safeNext } from "@/lib/members/config";

// Runs only on the member and auth pages (see matcher), never on the marketing
// site. It refreshes the Supabase session cookies and does the quick
// signed-in/signed-out redirects. Real access checks still happen in every page,
// action and route (lib/members/session.ts); this is only the fast path.

const AUTH_PAGES = new Set(["/login", "/register"]);

export async function proxy(request: NextRequest) {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookieOptions: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(toSet, headers) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  // getClaims validates the JWT (refreshing it when needed). Don't put code
  // between creating the client and this call.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims?.sub);
  const { pathname, search } = request.nextUrl;

  let out = response;
  if (!signedIn && (pathname === MEMBERS_HOME || pathname.startsWith(`${MEMBERS_HOME}/`))) {
    const to = new URL("/login", request.url);
    to.searchParams.set("next", `${pathname}${search}`);
    out = redirectKeepingCookies(to, response);
  } else if (signedIn && AUTH_PAGES.has(pathname)) {
    const to = new URL(safeNext(request.nextUrl.searchParams.get("next")), request.url);
    out = redirectKeepingCookies(to, response);
  }

  if (signedIn) out.cookies.set(MEMBER_HINT_COOKIE, "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  else if (request.cookies.has(MEMBER_HINT_COOKIE)) out.cookies.delete(MEMBER_HINT_COOKIE);
  return out;
}

function redirectKeepingCookies(to: URL, from: NextResponse) {
  const res = NextResponse.redirect(to);
  from.cookies.getAll().forEach((c) => res.cookies.set(c));
  const cc = from.headers.get("cache-control");
  if (cc) res.headers.set("cache-control", cc);
  return res;
}

export const config = {
  matcher: ["/members", "/members/:path*", "/login", "/register", "/forgot-password", "/reset-password", "/api/members/:path*"],
};
