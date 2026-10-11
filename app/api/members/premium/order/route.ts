import { createPayment } from "@/lib/payments";
import { getMember } from "@/lib/members/session";
import { PREMIUM_SOURCE, premiumOffer, premiumPurpose } from "@/lib/members/premium";

// Creates the pending payment for a Premium upgrade. The price comes from env
// (PREMIUM_PRICE_INR) and the member from the session, never from the browser.
// The rest of checkout is the shared Zoho flow (/api/zoho/session + verify).
// When markPaid() flips the row to paid, the payments_grant_premium trigger
// (migration 0006) upgrades the member in the same transaction.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const member = await getMember();
  if (!member) return Response.json({ error: "Log in to upgrade." }, { status: 401 });
  const offer = premiumOffer();
  if (!offer.price) return Response.json({ error: "Online checkout for Premium isn't open yet." }, { status: 404 });

  const b = (await req.json().catch(() => ({}))) as { phone?: unknown };
  try {
    const row = await createPayment({
      purpose: premiumPurpose(offer.period),
      amount: offer.price,
      name: member.name,
      email: member.email,
      phone: typeof b.phone === "string" ? b.phone.trim().slice(0, 20) : undefined,
      source: PREMIUM_SOURCE,
      user_id: member.id,
      premium_days: offer.days,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? undefined,
    });
    return Response.json({ orderId: row.id, amount: row.amount });
  } catch (e) {
    console.error("Premium order failed:", e);
    return Response.json({ error: "Payments are unavailable right now. Please try again shortly." }, { status: 503 });
  }
}
