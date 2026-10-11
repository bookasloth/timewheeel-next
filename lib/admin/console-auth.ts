import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Separate admin console login at /admin/login, independent of member accounts.
// Credentials live only in env (never in the repo):
//   ADMIN_CONSOLE_EMAIL          the login email
//   ADMIN_CONSOLE_PASSWORD_HASH  "scrypt:<salt hex>:<hash hex>" from scripts/hash-admin-password.mjs
//   ADMIN_CONSOLE_SECRET         32+ random chars, signs the session cookie
// The session is an HMAC-signed cookie, valid for 12 hours.

export const CONSOLE_COOKIE = "tw_admin";
const MAX_AGE = 60 * 60 * 12;

export function consoleLoginConfigured() {
  return Boolean(process.env.ADMIN_CONSOLE_EMAIL && process.env.ADMIN_CONSOLE_PASSWORD_HASH && (process.env.ADMIN_CONSOLE_SECRET ?? "").length >= 32);
}

function sign(payload: string) {
  return createHmac("sha256", process.env.ADMIN_CONSOLE_SECRET!).update(payload).digest("base64url");
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkConsoleCredentials(email: string, password: string) {
  if (!consoleLoginConfigured()) return false;
  const [scheme, salt, hash] = process.env.ADMIN_CONSOLE_PASSWORD_HASH!.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const emailOk = safeEqual(Buffer.from(email.trim().toLowerCase()), Buffer.from(process.env.ADMIN_CONSOLE_EMAIL!.trim().toLowerCase()));
  const passOk = safeEqual(scryptSync(password, Buffer.from(salt, "hex"), 64), Buffer.from(hash, "hex"));
  return emailOk && passOk;
}

export function consoleSessionValue(email: string) {
  const payload = Buffer.from(JSON.stringify({ e: email.trim().toLowerCase(), x: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export const consoleCookieOptions = { httpOnly: true, sameSite: "lax" as const, path: "/", secure: process.env.NODE_ENV === "production", maxAge: MAX_AGE };

/** The signed-in console email, or null. */
export async function getConsoleSession(): Promise<string | null> {
  if (!consoleLoginConfigured()) return null;
  const raw = (await cookies()).get(CONSOLE_COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || !safeEqual(Buffer.from(sig), Buffer.from(sign(payload)))) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; x: number };
    if (Date.now() > x || e !== process.env.ADMIN_CONSOLE_EMAIL!.trim().toLowerCase()) return null;
    return e;
  } catch {
    return null;
  }
}
