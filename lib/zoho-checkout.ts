// Client-side Zoho Payments checkout: creates the order, opens the Zoho widget,
// then confirms server-side. The amount Zoho charges comes from the server-created
// payment session, never from this file. Safe to import from client components.

export const PAY_MIN = 1;
export const PAY_MAX = 500000;

export type Outcome = "paid" | "processing" | "cancelled" | "failed";

export const OUTCOME_TEXT: Record<Exclude<Outcome, "paid">, { tone: "info" | "bad"; text: string }> = {
  processing: { tone: "info", text: "Payment is processing. You'll get a receipt by email once your bank confirms." },
  cancelled: { tone: "info", text: "Payment cancelled. No charge was made, and your details are still here." },
  failed: { tone: "bad", text: "Payment failed. No charge was made, try again when you're ready." },
};

declare global {
  interface Window {
    ZPayments: new (config: object) => {
      requestPaymentMethod(options: object): Promise<{ payment_id: string }>;
      close(): Promise<void>;
    };
  }
}

const ZPAY_SRC = "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js";
let widget: Promise<void> | undefined;

function loadWidget() {
  widget ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = ZPAY_SRC;
    s.onload = () => resolve();
    s.onerror = () => {
      widget = undefined; // allow a retry
      reject(new Error("Couldn't load the payment window. Check your connection."));
    };
    document.head.appendChild(s);
  });
  return widget;
}

async function post(url: string, body: object) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong, please try again.");
  return data;
}

export type PayRequest = {
  purpose: string;
  amount: number;
  name: string;
  email: string;
  phone?: string;
  source?: string;
};

// Full flow: order -> Zoho session -> widget -> server verify.
export async function payWithZoho(req: PayRequest): Promise<Outcome> {
  const [{ orderId }] = await Promise.all([post("/api/pay/order", req), loadWidget()]);
  const zp = new window.ZPayments({
    account_id: process.env.NEXT_PUBLIC_ZOHO_PAY_ACCOUNT_ID,
    domain: "IN",
    otherOptions: {
      api_key: process.env.NEXT_PUBLIC_ZOHO_PAY_API_KEY,
      ...(process.env.NEXT_PUBLIC_ZOHO_PAY_SANDBOX === "true" && { is_test_mode: true }),
    },
  });
  try {
    const session = await post("/api/zoho/session", { orderId });
    const { payment_id } = await zp.requestPaymentMethod({
      amount: session.amount,
      currency_code: "INR",
      currency_symbol: "₹",
      payments_session_id: session.sessionId,
      business: "Timewheel",
      description: session.description,
      reference_number: orderId,
      address: { name: req.name, email: req.email },
    });
    const r = await post("/api/zoho/verify", { paymentId: payment_id });
    if (r.paid) return "paid";
    return r.status === "failed" || r.status === "canceled" ? "failed" : "processing"; // UPI can settle late
  } catch (e) {
    if ((e as { code?: string }).code === "widget_closed") return "cancelled";
    throw e;
  } finally {
    await zp.close();
  }
}
