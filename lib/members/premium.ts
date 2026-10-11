import "server-only";

// Premium membership settings. ₹999 a year is the price the team set
// (2026-10-11); env can override either value without a code change.
//   PREMIUM_PRICE_INR  price of one Premium period, in rupees (default 999).
//                      "0" or "off" turns online checkout off ("Ask us about Premium").
//   PREMIUM_DAYS       length of one period in days (default 365).
// Checkout also needs the Zoho Payments env (NEXT_PUBLIC_ZOHO_PAY_ACCOUNT_ID etc.).
// Admins can also grant Premium by hand from /members/admin/members.

export const PREMIUM_SOURCE = "premium-membership";
const DEFAULT_PRICE_INR = 999;

export function premiumOffer() {
  const raw = (process.env.PREMIUM_PRICE_INR ?? "").trim();
  const price = raw === "" ? DEFAULT_PRICE_INR : raw.toLowerCase() === "off" ? 0 : Number(raw);
  const days = Math.max(1, Math.round(Number(process.env.PREMIUM_DAYS) || 365));
  const checkout = Number.isFinite(price) && price >= 1 && Boolean(process.env.NEXT_PUBLIC_ZOHO_PAY_ACCOUNT_ID);
  return {
    price: checkout ? Math.round(price * 100) / 100 : null,
    days,
    period: days === 365 ? "1 year" : days === 30 ? "1 month" : `${days} days`,
  };
}

export function premiumPurpose(period: string) {
  return `Timewheel Premium membership (${period})`;
}
