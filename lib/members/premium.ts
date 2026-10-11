import "server-only";

// Premium membership settings, all from env so nothing is invented in code.
//   PREMIUM_PRICE_INR  price of one Premium period, in rupees. Unset = online
//                      checkout is off and the page asks people to contact us.
//   PREMIUM_DAYS       length of one period in days (default 365).
// Admins can also grant Premium by hand from /members/admin/members.

export const PREMIUM_SOURCE = "premium-membership";

export function premiumOffer() {
  const price = Number(process.env.PREMIUM_PRICE_INR);
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
