// Server-side payments store (Supabase PostgREST), backing Zoho Payments checkout.
// Same dependency-free pattern as lib/supabase-leads.ts: direct fetch with the
// SECRET (service-role) key, table locked down by RLS with no policies.
//
// Unlike leads, payments REQUIRE the database: an order that can't be stored
// can't be verified, so createPayment throws and the API answers 503.
//
// Required env (server-only): SUPABASE_URL, SUPABASE_SECRET_KEY.
import type { ZohoPayment } from "@/lib/zoho-payments";
import { site } from "@/lib/site";
import { paymentReceipt, teamPayment } from "@/lib/email/templates";
import { sendEmail } from "@/lib/resend-email";

export type PaymentRow = {
  id: string;
  purpose: string;
  amount: number;
  currency: string;
  name: string;
  email: string;
  phone: string | null;
  status: "pending" | "paid";
  source?: string | null; // "pay-page", "30-days-challenge", "premium-membership", ...
  user_id?: string | null; // set for member purchases (Premium)
  provider_payment_id: string | null;
  paid_at: string | null;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Payments need SUPABASE_URL and SUPABASE_SECRET_KEY");
  return {
    endpoint: `${url.replace(/\/$/, "")}/rest/v1/payments`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  };
}

export async function createPayment(p: {
  purpose: string;
  amount: number;
  name: string;
  email: string;
  phone?: string;
  source?: string;
  user_id?: string;
  premium_days?: number; // Premium checkouts: the payments trigger grants this many days once paid
  ip?: string;
  user_agent?: string;
}): Promise<PaymentRow> {
  const { endpoint, headers } = db();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({ ...p, phone: p.phone || null, source: p.source || "pay-page" }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Payment insert failed: ${res.status} ${await res.text().catch(() => "")}`);
  const [row] = (await res.json()) as PaymentRow[];
  return { ...row, amount: Number(row.amount) };
}

// The amount ALWAYS comes from this row, never from the browser.
export async function getPaymentOrder(id: string): Promise<PaymentRow | null> {
  if (!UUID.test(id)) return null;
  const { endpoint, headers } = db();
  const res = await fetch(`${endpoint}?id=eq.${id}&select=*`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Payment lookup failed: ${res.status}`);
  const [row] = (await res.json()) as PaymentRow[];
  return row ? { ...row, amount: Number(row.amount) } : null;
}

// Called by both the verify route and the webhook. Idempotent: only flips a row
// that isn't paid yet, and only the call that flips it sends the notifications.
export async function markPaid(id: string, payment: ZohoPayment) {
  const { endpoint, headers } = db();
  const res = await fetch(`${endpoint}?id=eq.${id}&status=neq.paid`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({ status: "paid", paid_at: new Date().toISOString(), provider_payment_id: payment.payment_id }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Payment update failed: ${res.status}`); // webhook returns 500 -> Zoho redelivers
  const [flipped] = (await res.json()) as PaymentRow[];
  if (flipped) await notifyPaid({ ...flipped, amount: Number(flipped.amount) }).catch((e) => console.error("Payment notify failed:", e));
}

// Receipt to the payer + alert to the team, via Resend. Best-effort: a failed
// email must never undo a confirmed payment.
async function notifyPaid(p: PaymentRow) {
  // LEAD_TO / PAYMENTS_NOTIFY_TO may hold several comma-separated addresses.
  const team = (process.env.PAYMENTS_NOTIFY_TO || process.env.LEAD_TO || site.contact.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const reference = p.id;
  await Promise.all([
    sendEmail(
      p.email,
      paymentReceipt({
        name: p.name,
        amount: p.amount,
        purpose: p.purpose,
        paymentId: p.provider_payment_id,
        reference,
        paidAt: p.paid_at ? new Date(p.paid_at) : new Date(),
        challenge: p.source === "30-days-challenge",
      }),
    ),
    sendEmail(
      team,
      teamPayment({ name: p.name, email: p.email, phone: p.phone, amount: p.amount, purpose: p.purpose, paymentId: p.provider_payment_id, reference }),
      p.email,
    ),
  ]);
}
