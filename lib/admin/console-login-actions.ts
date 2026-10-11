"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CONSOLE_COOKIE, checkConsoleCredentials, consoleCookieOptions, consoleLoginConfigured, consoleSessionValue } from "@/lib/admin/console-auth";
import { isRateLimited } from "@/lib/rate-limit";
import { requestIp } from "@/lib/members/session";
import { safeNext } from "@/lib/members/config";
import { createClient, membersConfigured } from "@/lib/supabase/server";

export type ConsoleLoginState = { error?: string; email?: string };

export async function consoleLogin(_prev: ConsoleLoginState, fd: FormData): Promise<ConsoleLoginState> {
  const email = String(fd.get("email") ?? "").slice(0, 200);
  const password = String(fd.get("password") ?? "").slice(0, 200);
  if (!consoleLoginConfigured()) return { error: "Admin login isn't set up on this server yet (ADMIN_CONSOLE_* env vars).", email };
  if (await isRateLimited(`admin-login:${await requestIp()}`, { windowSeconds: 15 * 60, max: 8 })) {
    return { error: "Too many attempts. Wait 15 minutes and try again.", email };
  }
  if (!checkConsoleCredentials(email, password)) return { error: "That email and password don't match.", email };
  (await cookies()).set(CONSOLE_COOKIE, consoleSessionValue(email), consoleCookieOptions);
  redirect(safeNext(fd.get("next"), "/admin"));
}

/** Signs out of the console: the /admin/login session and any member session. */
export async function consoleLogout() {
  (await cookies()).delete(CONSOLE_COOKIE);
  if (membersConfigured()) await (await createClient()).auth.signOut();
  redirect("/admin/login?signedout=1");
}
