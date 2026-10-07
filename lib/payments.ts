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

export type PaymentRow = {
  id: string;
  purpose: string;
  amount: number;
  currency: string;
  name: string;
  email: string;
  phone: string | null;
  status: "pending" | "paid";
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

const inr = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Receipt to the payer + alert to the team, via Resend. Best-effort: a failed
// email must never undo a confirmed payment.
async function notifyPaid(p: PaymentRow) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const from = process.env.RESEND_FROM || "Timewheel <team@timewheel.co.in>";
  const team = process.env.PAYMENTS_NOTIFY_TO || process.env.LEAD_TO || site.contact.email;
  const lines = [
    ["Amount", inr(p.amount)],
    ["For", p.purpose],
    ["Zoho payment ID", p.provider_payment_id ?? ""],
    ["Reference", p.id],
  ];
  const table = lines.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#77736C">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join("");
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");

  const send = (to: string, subject: string, intro: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: "team@timewheel.co.in",
        subject,
        html: `<p>${esc(intro)}</p><table>${table}</table><p style="color:#77736C">Timewheel Internet Pvt. Ltd. · ${site.url}</p>`,
        text: `${intro}\n\n${text}`,
      }),
    });

  await Promise.all([
    send(p.email, `Payment received: ${inr(p.amount)}`, `Hi ${p.name.split(/\s+/)[0]}, we've received your payment. Thank you!`),
    send(team, `Paid ${inr(p.amount)}: ${p.purpose}`, `${p.name} (${p.email}${p.phone ? `, ${p.phone}` : ""}) paid via Zoho Payments.`),
  ]);
}
