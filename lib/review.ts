// /review — a 3-step funnel that turns a happy customer's own words into a
// natural, first-person Google review they can copy and post in one tap.
//
//   1. Stars       — set the tone with a single tap.
//   2. Write       — one line about their experience (or, for low ratings, a
//                    private note that never goes to Google).
//   3. Copy & post — the cleaned-up review plus one button that copies it and
//                    opens Google's "write a review" dialog.
//
// Design rule that keeps this honest (not a review-manipulation tool):
// generateReview() ONLY ever reuses what the customer typed. It never invents
// claims, numbers, features or outcomes. The only text it may add is a short,
// neutral opener that names the brand and echoes the rating they chose.

export const BRAND = "Timewheel";

// Ratings at or above this go to Google; below it we collect private feedback
// instead of sending an unhappy customer to a public review.
export const HAPPY_THRESHOLD = 4;

// Google "write a review" deep link. This opens the 5-star dialog directly on
// Timewheel's listing (users must be signed in to Google to post). Override with
// NEXT_PUBLIC_GOOGLE_REVIEW_URL, e.g. a g.page/r/.../review short link from
// Google Business Profile -> Ask for reviews.
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://search.google.com/local/writereview?placeid=0x3bd4c1477f8d5f53:0xbfbb0365a3ce8a8f";

// How long to let the "Copied" confirmation show before we treat the hand-off as
// done (the Google dialog opens immediately on tap; this is just UI timing).
export const COPIED_RESET_MS = 2600;

// One word per star, shown as the rating is picked.
export const RATING_LABELS = ["", "Poor", "Not great", "Okay", "Great", "Excellent"];

export function ratingLabel(rating: number): string {
  return RATING_LABELS[rating] || "";
}

export function isHappy(rating: number): boolean {
  return rating >= HAPPY_THRESHOLD;
}

export type ReviewAnswers = {
  rating: number; // 1..5, 0 = unset
  experience: string; // their own words
};

export const EMPTY_ANSWERS: ReviewAnswers = {
  rating: 0,
  experience: "",
};

// ── copy for each step ───────────────────────────────────────────────────────
export const COPY = {
  rating: {
    title: "How was your experience with Timewheel?",
    help: "Tap to rate. It only takes a second.",
  },
  // Shown at step 2 when they are happy (>= HAPPY_THRESHOLD).
  write: {
    title: "In a line or two, what stood out?",
    help: "Your own words. We will tidy them into a review you can post.",
    placeholder: "e.g. They rebuilt our site and we finally show up on Google and get real enquiries.",
    cta: "Create my review",
  },
  // Shown at step 2 when they are not happy (< HAPPY_THRESHOLD). Private, never
  // posted publicly.
  feedback: {
    title: "Sorry we missed the mark. What went wrong?",
    help: "This comes straight to us, it is not posted anywhere.",
    placeholder: "e.g. The timeline slipped and updates were slow to come back.",
    cta: "Send feedback",
  },
  result: {
    title: "Your review is ready",
    help: "Edit anything, then tap once to copy it and open Google.",
    primary: "Copy & post on Google",
    copied: "Copied, opening Google",
  },
  thanks: {
    title: "Thank you, this really helps",
    body: "We have your feedback and we will use it to put things right. If anything else comes up, reach us any time.",
  },
} as const;

// ── sentence helpers ─────────────────────────────────────────────────────────
function clean(s: string): string {
  return (s || "").replace(/\s+/g, " ").trim();
}

// Tidy free text into a clean standalone passage: trim, capitalise the first
// letter, and give it a closing full stop if it has no ending punctuation.
function tidy(s: string): string {
  const t = clean(s);
  if (!t) return "";
  const capped = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?]$/.test(capped) ? capped : `${capped}.`;
}

// ── the generator ────────────────────────────────────────────────────────────
// Deterministic: it reuses the customer's words and, if they never named the
// brand, prepends one short neutral line that reflects the rating they chose.
export function generateReview(a: ReviewAnswers): string {
  const body = tidy(a.experience);
  if (!body) return "";

  const namesBrand = new RegExp(BRAND, "i").test(body);
  if (namesBrand) return body;

  const opener = a.rating >= 5 ? `Great experience with ${BRAND}.` : `Good experience with ${BRAND}.`;
  return `${opener} ${body}`.replace(/\s+/g, " ").trim();
}

// Enough to produce something worth posting.
export function hasEnoughToGenerate(a: ReviewAnswers): boolean {
  return clean(a.experience).length > 1;
}

// Ask the server to polish the review with Claude, and fall back to the
// deterministic generator if the endpoint is unavailable or errors. Always
// resolves to usable text, so the funnel never dead-ends.
export async function requestReview(a: ReviewAnswers): Promise<string> {
  try {
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: a.rating, experience: a.experience }),
    });
    if (res.ok) {
      const data = (await res.json()) as { review?: string };
      if (data.review && data.review.trim()) return data.review.trim();
    }
  } catch {
    /* network/parse error: fall through to deterministic */
  }
  return generateReview(a);
}
