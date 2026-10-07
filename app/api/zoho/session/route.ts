import { createPaymentSession } from "@/lib/zoho-payments";
import { getPaymentOrder } from "@/lib/payments";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { orderId } = await req.json().catch(() => ({}));
  const order = typeof orderId === "string" && orderId.length <= 50 ? await getPaymentOrder(orderId) : null;
  if (!order) return Response.json({ error: "Unknown order" }, { status: 404 });
  if (order.status === "paid") return Response.json({ error: "Already paid" }, { status: 409 });

  const sessionId = await createPaymentSession({
    amount: order.amount,
    description: order.purpose,
    referenceNumber: orderId,
  });
  return Response.json({ sessionId, amount: order.amount.toFixed(2), description: order.purpose });
}
