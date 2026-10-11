// Blog SEO scoring, shared by the editor (live checklist) and the posts table
// (S/G/E chips). Pure functions, safe on the server and in the browser.
// Ported from the adetc blog admin (components/admin/SeoAnalysis, lib/seo-score).

export type SeoCheck = { ok: boolean; warn: boolean; label: string };

export type SeoInput = {
  title: string;
  slug: string;
  contentHtml: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  coverAlt: string;
};

const textOf = (html: string) => String(html || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const imageAlts = (html: string) => [...String(html || "").matchAll(/<img[^>]*\balt="([^"]*)"/gi)].map((m) => m[1]);
const imagesMissingAlt = (html: string) =>
  [...String(html || "").matchAll(/<img[^>]*>/gi)].some((m) => !/\balt="[^"]+"/i.test(m[0]));

/** Live on-page checks, in the spirit of RankMath/Yoast. */
export function analyzeSeo({ title, slug, contentHtml, metaTitle, metaDescription, focusKeyword, coverAlt }: SeoInput): SeoCheck[] {
  const kw = focusKeyword.trim().toLowerCase();
  const text = textOf(contentHtml);
  const words = text ? text.split(" ").length : 0;
  const firstChunk = text.slice(0, Math.max(120, Math.floor(text.length * 0.1))).toLowerCase();
  const alts = [...imageAlts(contentHtml), coverAlt].join(" ").toLowerCase();
  const has = (h: string) => Boolean(h && kw && h.toLowerCase().includes(kw));
  const density = kw && words ? ((text.toLowerCase().split(kw).length - 1) / words) * 100 : 0;
  const mt = metaTitle || title;

  const out: SeoCheck[] = [];
  const push = (ok: boolean, label: string, warn = false) => out.push({ ok, warn, label });

  if (kw) {
    push(has(title) || has(mt), "Focus keyphrase in the title");
    push(slug.toLowerCase().includes(kw.replace(/\s+/g, "-")), "Focus keyphrase in the URL slug");
    push(has(metaDescription), "Focus keyphrase in the meta description");
    push(firstChunk.includes(kw), "Focus keyphrase early in the content");
    push(alts.includes(kw), "Focus keyphrase in an image alt text");
    push(density >= 0.3 && density <= 2.5, `Keyphrase density ${density.toFixed(1)}% (aim for 0.3 to 2.5%)`, density > 0 && (density < 0.3 || density > 2.5));
  } else {
    push(false, "Set a focus keyphrase", true);
  }
  push(words >= 300, `Content length ${words} words (at least 300)`, words > 0 && words < 300);
  push(mt.length >= 30 && mt.length <= 60, `SEO title ${mt.length} characters (30 to 60)`, true);
  push(metaDescription.length >= 120 && metaDescription.length <= 160, `Meta description ${metaDescription.length} characters (120 to 160)`, true);
  push(/<h2[\s>]/i.test(contentHtml), "At least one H2 subheading", true);
  push(/<a\s[^>]*href=/i.test(contentHtml), "At least one link", true);
  push(!imagesMissingAlt(contentHtml), "Every inline image has alt text");
  push(Boolean(coverAlt.trim()), "Featured image has alt text", true);
  return out;
}

export function seoScore(input: SeoInput) {
  const checks = analyzeSeo(input);
  return Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);
}

export const scoreTone = (score: number) => (score >= 80 ? "good" : score >= 50 ? "fair" : "poor");

// ------------------------------------------------------------ S / G / E
// Per-post completeness for three tracks, as a 0 to 4 stage:
//   0 red (not started), 1 orange, 2 yellow, 3 green, 4 blue (complete).

export const STAGE_COLORS = ["#dc2626", "#f97316", "#ca8a04", "#16a34a", "#2563eb"];
export const STAGE_LABELS = ["Not started", "Basic", "Fair", "Good", "Complete"];

export type Stage = { stage: number; passed: number; total: number };

function stage(checks: boolean[]): Stage {
  const total = checks.length;
  const passed = checks.filter(Boolean).length;
  const ratio = total ? passed / total : 0;
  const s = passed === total ? 4 : ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : ratio >= 0.25 ? 1 : 0;
  return { stage: s, passed, total };
}

export type SegRow = {
  content_html: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  cover_alt: string;
  tags: string[];
  tldr: string;
  takeaways: string[];
  secondary_keywords: string[];
  faq: unknown;
  author_id: string | null;
};

export function segScores(p: SegRow): { s: Stage; g: Stage; e: Stage } {
  const html = p.content_html || "";
  const words = textOf(html) ? textOf(html).split(" ").length : 0;
  const faqLen = Array.isArray(p.faq) ? p.faq.length : 0;
  return {
    // SEO: classic on-page
    s: stage([!!p.meta_title, !!p.meta_description, !!p.focus_keyword, !!p.cover_alt, (p.tags ?? []).length > 0]),
    // GEO: generative engines, E-E-A-T and depth
    g: stage([!!p.tldr || (p.takeaways ?? []).length > 0, !!p.author_id, (p.secondary_keywords ?? []).length > 0, words >= 600, faqLen > 0]),
    // AEO: answer engines and structured answers
    e: stage([faqLen > 0, !!p.meta_description, /<h2[\s>]/i.test(html), !!p.tldr, !!p.focus_keyword]),
  };
}
