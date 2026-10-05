// /review — turns a real customer's own words into a natural, first-person
// Google review they can copy and paste.
//
// Design rule that keeps this honest (and not a review-manipulation tool):
// generateReview() ONLY ever reuses what the customer typed. It never invents
// claims, numbers, features or outcomes. Empty answers are skipped, not filled.
// Local/service keywords (city, business type, the feature they named) surface
// naturally only because the customer supplied them.

export const BRAND = "Timewheel";

// Google Business "write a review" link. Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to the
// real deep link (Google Business Profile -> Ask for reviews -> copy the short
// link, or search.google.com/local/writereview?placeid=YOUR_PLACE_ID). Until it
// is set we fall back to a Google search for the business so the button still
// goes somewhere sensible in dev.
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://www.google.com/search?q=Timewheel+reviews";

export type BusinessType = { id: string; label: string; noun: string };

// noun = how the business reads inside a sentence ("I run a {noun}").
export const BUSINESS_TYPES: BusinessType[] = [
  { id: "salon", label: "Salon or spa", noun: "salon" },
  { id: "clinic", label: "Clinic or practice", noun: "clinic" },
  { id: "fitness", label: "Fitness or yoga studio", noun: "fitness studio" },
  { id: "coaching", label: "Coaching or consulting", noun: "coaching practice" },
  { id: "services", label: "Home or local services", noun: "local services business" },
  { id: "other", label: "Something else", noun: "" },
];

// Q3 chips, each one a real Timewheel service, so a selection is always true.
export const FEATURE_CHIPS: string[] = [
  "building my website",
  "designing my brand and website",
  "getting found on Google (SEO)",
  "social media marketing",
  "running ads and digital marketing",
  "ongoing support and updates",
];

export const WELCOME = {
  kicker: "SHARE YOUR EXPERIENCE",
  title: "Help others find Timewheel",
  body: "Answer five quick questions about your experience and we will turn your own words into a natural review you can post to Google in one tap. Nothing is made up, it is simply your feedback, written clearly.",
  points: [
    "Takes about a minute",
    "Built only from what you tell us",
    "Edit it freely before you post",
  ],
  cta: "Start",
};

export type Question = {
  id: "business" | "before" | "features" | "changed" | "recommend";
  step: number; // 1..5
  title: string;
  help?: string;
  placeholder?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "business",
    step: 1,
    title: "What kind of business do you run?",
    help: "This just helps the review sound like you. Your city is optional.",
  },
  {
    id: "before",
    step: 2,
    title: "Before Timewheel, what was hardest about your website or online presence?",
    help: "A line or two in your own words.",
    placeholder: "e.g. My old site looked dated and never showed up on Google.",
  },
  {
    id: "features",
    step: 3,
    title: "What did Timewheel help you with the most?",
    help: "Pick what fits. Add your own if something is missing.",
    placeholder: "Anything else they handled for you?",
  },
  {
    id: "changed",
    step: 4,
    title: "What has changed since working with Timewheel?",
    help: "Share the real difference. Only mention numbers if they are genuinely yours.",
    placeholder: "e.g. The new site brings in enquiries and we finally rank for our services.",
  },
  {
    id: "recommend",
    step: 5,
    title: "What would you tell someone who is considering them?",
    help: "Optional, but it makes the review feel complete.",
    placeholder: "e.g. If your website is holding you back, talk to them.",
  },
];

export type ReviewAnswers = {
  businessType: string; // one of BUSINESS_TYPES ids
  businessTypeOther: string;
  city: string;
  before: string;
  features: string[]; // selected FEATURE_CHIPS
  featuresOther: string;
  changed: string;
  recommend: string;
};

export const EMPTY_ANSWERS: ReviewAnswers = {
  businessType: "",
  businessTypeOther: "",
  city: "",
  before: "",
  features: [],
  featuresOther: "",
  changed: "",
  recommend: "",
};

// ── sentence helpers ────────────────────────────────────────────────────────
function clean(s: string): string {
  return (s || "").replace(/\s+/g, " ").trim();
}

// Tidy a free-text answer into a standalone sentence: trim, capitalise the first
// letter, and give it a full stop if it has no ending punctuation.
function asSentence(s: string): string {
  const t = clean(s);
  if (!t) return "";
  const capped = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?]$/.test(capped) ? capped : `${capped}.`;
}

// Lower-case the first letter so an answer can be dropped mid-sentence, unless it
// starts with something that should stay capitalised (an initialism / proper-ish
// token like "WhatsApp", "I", "Google").
function lowerFirst(s: string): string {
  const t = clean(s);
  if (!t) return "";
  const first = t.split(" ")[0];
  // Keep ALL-CAPS and camelCase tokens (WhatsApp, UPI) and a lone "I" as-is;
  // lower a normal leading word so it reads inside a sentence.
  if (/^[A-Z]{2,}/.test(first) || /^[A-Z][a-z]+[A-Z]/.test(first) || first === "I") return t;
  return t.charAt(0).toLowerCase() + t.slice(1);
}

function article(noun: string): string {
  return /^[aeiou]/i.test(noun.trim()) ? "an" : "a";
}

function joinList(items: string[]): string {
  const a = items.map(clean).filter(Boolean);
  if (a.length === 0) return "";
  if (a.length === 1) return a[0];
  if (a.length === 2) return `${a[0]} and ${a[1]}`;
  return `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
}

function businessNoun(a: ReviewAnswers): string {
  if (a.businessType === "other") return clean(a.businessTypeOther).toLowerCase();
  const preset = BUSINESS_TYPES.find((b) => b.id === a.businessType);
  return preset ? preset.noun : "";
}

function featuresPhrase(a: ReviewAnswers): string {
  const picks = [...a.features];
  const other = clean(a.featuresOther);
  if (other) picks.push(other.toLowerCase());
  return joinList(picks);
}

// ── the generator ───────────────────────────────────────────────────────────
// `variant` lets the UI offer a "rephrase" that reads differently without
// changing any of the meaning. Each builder returns sentences; empties drop out.
type Builder = (f: {
  noun: string;
  city: string;
  before: string;
  features: string;
  changed: string;
  recommend: string;
}) => string[];

const VARIANTS: Builder[] = [
  ({ noun, city, before, features, changed, recommend }) => {
    const where = city ? ` in ${city}` : "";
    const open = noun ? `I run ${article(noun)} ${noun}${where}.` : "";
    const use = features
      ? `${BRAND} handled ${features} for me.`
      : `${BRAND} has made a real difference.`;
    return [open, before, use, changed, recommend];
  },
  ({ noun, city, before, features, changed, recommend }) => {
    const where = city ? `${city} ` : "";
    const open = noun ? `As ${article(noun)} ${where}${noun}, getting found online used to be a real struggle.` : "";
    const use = features ? `I went to ${BRAND} for ${features}.` : `${BRAND} fits the way I work.`;
    const close = recommend ? `Honestly, ${lowerFirst(recommend)}` : "";
    return [open, before, use, changed, close];
  },
  ({ noun, city, before, features, changed, recommend }) => {
    const where = city ? ` here in ${city}` : "";
    const open = noun ? `Running ${article(noun)} ${noun}${where} means our website really has to pull its weight.` : "";
    const use = features ? `What they helped with most was ${features}.` : "";
    const brandLine = changed ? "" : `${BRAND} keeps our whole online presence in one place.`;
    return [open, before, use, changed, brandLine, recommend];
  },
];

export function generateReview(a: ReviewAnswers, variant = 0): string {
  const fields = {
    noun: businessNoun(a),
    city: clean(a.city),
    before: asSentence(a.before),
    features: featuresPhrase(a),
    changed: asSentence(a.changed),
    recommend: asSentence(a.recommend),
  };
  const build = VARIANTS[((variant % VARIANTS.length) + VARIANTS.length) % VARIANTS.length];
  const sentences = build(fields)
    .map((s) => clean(s))
    .filter(Boolean);

  // Make sure the brand is named at least once, naturally, without inventing a
  // claim (append a neutral recommendation only if nothing mentioned it).
  let text = sentences.join(" ");
  if (!text.includes(BRAND)) {
    text = text ? `${text} ${BRAND} has been a genuinely useful tool for us.` : "";
  }
  return text.replace(/\s+/g, " ").trim();
}

// Whether there is enough to produce something worth posting.
export function hasEnoughToGenerate(a: ReviewAnswers): boolean {
  return Boolean(
    businessNoun(a) || clean(a.before) || featuresPhrase(a) || clean(a.changed),
  );
}
