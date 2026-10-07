import { createPayment } from "@/lib/payments";
import { PAY_MAX, PAY_MIN } from "@/lib/zoho-checkout";

// Creates a pending payment row. Its id becomes the Zoho reference_number, and its
// amount is the ONLY amount Zoho will be asked to charge (see /api/zoho/session).
export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== "object") return Response.json({ error: "Invalid request" }, { status: 400 });
  if (b.company_website) return Response.json({ error: "Invalid request" }, { status: 400 }); // honeypot

  const name = String(b.name ?? "").trim().slice(0, 120);
  const email = String(b.email ?? "").trim().slice(0, 200);
  const phone = String(b.phone ?? "").trim().slice(0, 20);
  const purpose = String(b.purpose ?? "").trim().slice(0, 200);
  const amount = Math.round(Number(b.amount) * 100) / 100;

  if (!name) return Response.json({ error: "Enter your name." }, { status: 400 });
  if (!EMAIL.test(email)) return Response.json({ error: "Enter a valid email." }, { status: 400 });
  if (!purpose) return Response.json({ error: "Tell us what this payment is for." }, { status: 400 });
  if (!Number.isFinite(amount) || amount < PAY_MIN || amount > PAY_MAX) {
    return Response.json({ error: `Amount must be between ₹${PAY_MIN} and ₹${PAY_MAX.toLocaleString("en-IN")}.` }, { status: 400 });
  }

  try {
    const row = await createPayment({
      purpose,
      amount,
      name,
      email,
      phone,
      source: typeof b.source === "string" ? b.source.slice(0, 60) : "pay-page",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? undefined,
    });
    return Response.json({ orderId: row.id, amount: row.amount });
  } catch (e) {
    console.error("Create payment failed:", e);
    return Response.json({ error: "Payments are unavailable right now. Please try again shortly." }, { status: 503 });
  }
}
