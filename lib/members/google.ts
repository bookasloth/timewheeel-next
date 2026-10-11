import "server-only";

// "Continue with Google" on our own domain.
//
// With Supabase's hosted OAuth, Google's account picker says "to continue to
// <project>.supabase.co", and that domain can't be brand-verified because we
// don't own it. Instead Google returns to https://timewheel.co.in/auth/google/callback,
// we swap the code for Google's ID token server-side, and hand that token to
// Supabase (signInWithIdToken). Same Supabase user, same session cookies.
//
// Env (server only):
//   GOOGLE_CLIENT_ID      the "Timewheel" OAuth client (same one Supabase's Google provider uses)
//   GOOGLE_CLIENT_SECRET  its secret
// Unset -> falls back to Supabase's hosted Google flow.
//
// Google Cloud > Clients > Timewheel > Authorized redirect URIs must include
//   https://timewheel.co.in/auth/google/callback  (and http://localhost:3000/auth/google/callback)

export const GOOGLE_STATE_COOKIE = "tw_google_oauth";
export const GOOGLE_STATE_PATH = "/auth/google";

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

const redirectUri = (origin: string) => `${origin}${GOOGLE_STATE_PATH}/callback`;

export function googleAuthUrl(origin: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri(origin),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

/** Authorization code -> Google ID token (a signed JWT Supabase verifies itself). */
export async function exchangeGoogleCode(code: string, origin: string): Promise<string | null> {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        redirect_uri: redirectUri(origin),
        grant_type: "authorization_code",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => ({}))) as { id_token?: string; error?: string; error_description?: string };
    if (!res.ok || !data.id_token) {
      console.error("Google code exchange failed:", res.status, data.error, data.error_description);
      return null;
    }
    return data.id_token;
  } catch (e) {
    console.error("Google code exchange error:", e);
    return null;
  }
}
