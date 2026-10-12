import { createHmac, timingSafeEqual } from "node:crypto";
import { site } from "@/lib/site";

// Private client link to one invoice: /invoice/<id>?t=<token>. The token is an
// HMAC of the id, so links can't be guessed and need no database column.
// Rotating INVOICE_LINK_SECRET (or ADMIN_CONSOLE_SECRET) invalidates old links.

function secret() {
  return process.env.INVOICE_LINK_SECRET || process.env.ADMIN_CONSOLE_SECRET || "";
}

export function invoiceToken(id: string) {
  const key = secret();
  if (!key) return "";
  return createHmac("sha256", key).update(`invoice:${id}`).digest("base64url").slice(0, 32);
}

export function checkInvoiceToken(id: string, token: string) {
  const want = invoiceToken(id);
  if (!want || token.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(want), Buffer.from(token));
}

export function invoiceUrl(id: string) {
  return `${site.url}/invoice/${id}?t=${invoiceToken(id)}`;
}
