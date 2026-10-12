import { REVIEW_SAMPLES } from "@/lib/review-samples";

// /review: a customer picks the service they used and gets a sample review
// to edit, copy and paste into Timewheel's Google review form.

export const BRAND = "Timewheel";

// Google Business "write a review" link. Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to the
// real deep link (Google Business Profile -> Ask for reviews -> copy the short
// link, or search.google.com/local/writereview?placeid=YOUR_PLACE_ID). Until it
// is set we fall back to a Google search for the business so the button still
// goes somewhere sensible in dev.
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://www.google.com/search?q=Timewheel+reviews";

// ── Two-step flow: pick a service, copy a sample review ─────────────────────
// 30 samples per service live in lib/review-samples. Each is copied at most
// once across all customers (see /api/review/samples).

export type ReviewService = { id: string; label: string; samples: string[] };

const SERVICE_LABELS: [keyof typeof REVIEW_SAMPLES, string][] = [
  ["website-design", "Website Design"],
  ["website-development", "Website Development"],
  ["shopify", "Shopify Development"],
  ["social-media", "Social Media Marketing"],
  ["seo", "SEO"],
  ["digital-marketing", "Digital Marketing"],
];

export const REVIEW_SERVICES: ReviewService[] = SERVICE_LABELS.map(([id, label]) => ({
  id,
  label,
  samples: REVIEW_SAMPLES[id],
}));
