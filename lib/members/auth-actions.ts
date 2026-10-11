"use server";

import { randomBytes } from "node:crypto";
import { after } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient, membersConfigured } from "@/lib/supabase/server";
import { requestIp, requestOrigin } from "@/lib/members/session";
import { MEMBER_HINT_COOKIE, safeNext } from "@/lib/members/config";
import { isRateLimited } from "@/lib/rate-limit";
import { checkHoneypot } from "@/lib/honeypot";
import { syncNewsletterContact } from "@/lib/resend-contacts";
import { GOOGLE_STATE_COOKIE, GOOGLE_STATE_PATH, googleAuthUrl, googleConfigured } from "@/lib/members/google";

// Sign-up, login, Google, password reset. Each one runs on the server with the
// member's cookies, so session tokens never touch page JavaScript.

export type AuthState = {
  error?: string;
  field?: "name" | "email" | "password" | "confirm";
  /** Sign-up or reset accepted; tell them to check their inbox. */
  sent?: "confirm" | "reset" | "resent";
  email?: string;
  name?: string;
  /** Login failed because the address isn't confirmed yet. */
  unconfirmed?: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE = "Accounts aren't switched on yet. Please try again later.";
const SLOW_DOWN = "Too many attempts. Wait a few minutes and try again.";

const str = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

// The action's redirect renders the next page in the same request, so the
// proxy never sees it; set the navbar's signed-in hint here too.
async function markSignedIn() {
  (await cookies()).set(MEMBER_HINT_COOKIE, "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
}

function callback(origin: string, next: string) {
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export async function signInWithPassword(_: AuthState, fd: FormData): Promise<AuthState> {
  if (!membersConfigured()) return { error: UNAVAILABLE };
  const email = str(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const next = safeNext(fd.get("next"));

  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", field: "email", email };
  if (!password) return { error: "Enter your password.", field: "password", email };
  if (await isRateLimited(`login:${await requestIp()}`, { windowSeconds: 600, max: 15 })) return { error: SLOW_DOWN, email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") {
      return { error: `Confirm your email first. We sent a link to ${email}.`, email, unconfirmed: true };
    }
    if (error.code === "invalid_credentials") {
      return { error: "That email and password don't match. If you joined with Google, use Continue with Google.", email };
    }
    console.error("Login failed:", error.code, error.message);
    return { error: "We couldn't log you in just now. Please try again.", email };
  }
  await markSignedIn();
  redirect(next);
}

export async function signUp(_: AuthState, fd: FormData): Promise<AuthState> {
  if (!membersConfigured()) return { error: UNAVAILABLE };
  const name = str(fd, "name", 120);
  const email = str(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const newsletter = fd.get("newsletter") === "on";
  const next = safeNext(fd.get("next"));
  const fail = (error: string, field?: AuthState["field"]): AuthState => ({ error, field, email, name });

  if (!name) return fail("Enter your name.", "name");
  if (!EMAIL.test(email)) return fail("Enter a valid email address.", "email");
  if (password.length < 8) return fail("Use at least 8 characters for your password.", "password");
  if (password.length > 72) return fail("Keep your password under 72 characters.", "password");

  // Bots that fill the hidden field get the same "check your inbox" screen as
  // everyone else, so they learn nothing.
  const hp = checkHoneypot({ hp_x: fd.get("hp_x"), hp_t: fd.get("hp_t") });
  if (hp.verdict === "bot") return { sent: "confirm", email };
  if (await isRateLimited(`signup:${await requestIp()}`, { windowSeconds: 3600, max: 8 })) return fail(SLOW_DOWN);

  const origin = await requestOrigin();
  const welcome = `${next}${next.includes("?") ? "&" : "?"}welcome=1`;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: callback(origin, welcome), data: { full_name: name } },
  });
  if (error) {
    if (error.code === "user_already_exists") return fail("There's already an account with this email. Log in instead.", "email");
    if (error.code === "weak_password") return fail(error.message || "Choose a stronger password.", "password");
    if (error.code === "over_email_send_rate_limit") return fail("We've sent a lot of emails just now. Try again in a few minutes.");
    console.error("Sign-up failed:", error.code, error.message);
    return fail("We couldn't create your account just now. Please try again.");
  }

  if (newsletter) after(() => syncNewsletterContact(email).then(() => undefined));

  // Confirmations off (or already confirmed): straight in.
  if (data.session) {
    await markSignedIn();
    redirect(welcome);
  }
  return { sent: "confirm", email };
}

export async function resendConfirmation(_: AuthState, fd: FormData): Promise<AuthState> {
  if (!membersConfigured()) return { error: UNAVAILABLE };
  const email = str(fd, "email").toLowerCase();
  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", field: "email" };
  if (await isRateLimited(`resend:${await requestIp()}`, { windowSeconds: 3600, max: 5 })) return { error: SLOW_DOWN, email };
  const supabase = await createClient();
  const origin = await requestOrigin();
  const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: callback(origin, "/members?welcome=1") } });
  if (error && error.code !== "over_email_send_rate_limit") console.error("Resend confirmation failed:", error.code, error.message);
  return { sent: "resent", email };
}

export async function signInWithGoogle(fd: FormData) {
  const next = safeNext(fd.get("next"));
  if (!membersConfigured()) redirect(`/login?error=unavailable`);
  const origin = await requestOrigin();

  // Preferred: Google returns to our own domain (lib/members/google.ts), so the
  // account picker says timewheel.co.in instead of the Supabase project URL.
  if (googleConfigured()) {
    const state = randomBytes(24).toString("base64url");
    (await cookies()).set(GOOGLE_STATE_COOKIE, JSON.stringify({ state, next }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: GOOGLE_STATE_PATH,
      maxAge: 600,
    });
    redirect(googleAuthUrl(origin, state));
  }

  // Fallback: Supabase's hosted Google flow.
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback(origin, next), queryParams: { prompt: "select_account" } },
  });
  if (error || !data.url) {
    console.error("Google sign-in failed:", error?.code, error?.message);
    redirect(`/login?error=google&next=${encodeURIComponent(next)}`);
  }
  redirect(data.url);
}

export async function requestPasswordReset(_: AuthState, fd: FormData): Promise<AuthState> {
  if (!membersConfigured()) return { error: UNAVAILABLE };
  const email = str(fd, "email").toLowerCase();
  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", field: "email", email };
  if (await isRateLimited(`reset:${await requestIp()}`, { windowSeconds: 3600, max: 6 })) return { error: SLOW_DOWN, email };
  const supabase = await createClient();
  const origin = await requestOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: callback(origin, "/reset-password") });
  // Same answer whether or not the address has an account.
  if (error && error.code !== "over_email_send_rate_limit") console.error("Password reset failed:", error.code, error.message);
  return { sent: "reset", email };
}

export async function updatePassword(_: AuthState, fd: FormData): Promise<AuthState> {
  if (!membersConfigured()) return { error: UNAVAILABLE };
  const password = String(fd.get("password") ?? "");
  const confirm = String(fd.get("confirm") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters.", field: "password" };
  if (password.length > 72) return { error: "Keep it under 72 characters.", field: "password" };
  if (password !== confirm) return { error: "The two passwords don't match.", field: "confirm" };

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { error: "Your reset link has expired. Request a new one." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    if (error.code === "same_password") return { error: "That's your current password. Pick a new one.", field: "password" };
    if (error.code === "weak_password") return { error: error.message || "Choose a stronger password.", field: "password" };
    console.error("Password update failed:", error.code, error.message);
    return { error: "We couldn't update your password. Please try again." };
  }
  redirect("/members/account?updated=password");
}
