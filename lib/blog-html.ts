import "server-only";
import sanitizeHtml from "sanitize-html";
import { site } from "@/lib/site";

// Rich-text (Tiptap) HTML for blog posts. cleanBlogHtml runs on every save so a
// tampered payload can't store script; prepareBlogHtml runs again at render so
// rule changes (link targets, heading ids) apply to older posts too.

const SITE_HOST = new URL(site.url).hostname.replace(/^www\./, "");

function isInternal(href: string) {
  if (!/^https?:\/\//i.test(href)) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === SITE_HOST;
  } catch {
    return false;
  }
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;|&#\d+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function cleanBlogHtml(dirty: string): string {
  return sanitizeHtml(String(dirty || ""), {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s", "blockquote", "code", "pre",
      "h2", "h3", "h4", "ul", "ol", "li", "a", "img", "hr",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "colgroup", "col",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // The post title is the page's only H1, so an H1 in the body becomes an H2.
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        const { target: _t, rel: _r, ...rest } = attribs;
        void _t;
        void _r;
        // The link prompt pre-fills "https://", so a pasted full URL can arrive doubled.
        if (rest.href) rest.href = rest.href.replace(/^(?:https?:\/\/)+(?=https?:\/\/)/i, "");
        return {
          tagName,
          attribs: rest.href && !isInternal(rest.href) ? { ...rest, target: "_blank", rel: "noopener noreferrer" } : rest,
        };
      },
    },
  });
}

const textOf = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();

/** Sanitized HTML with heading ids (for the table of contents) and scrollable tables. */
export function prepareBlogHtml(html: string): string {
  const used = new Map<string, number>();
  const idFor = (inner: string) => {
    const base = slugify(textOf(inner)) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
  return cleanBlogHtml(html)
    .replace(/<(h2|h3)>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => `<${tag} id="${idFor(inner)}">${inner}</${tag}>`)
    .replace(/<table>/g, '<div class="blog-table"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<img /g, '<img loading="lazy" ');
}

/** H2 headings, in order, with the same ids prepareBlogHtml gives them. */
export function extractHeadings(preparedHtml: string): { text: string; id: string }[] {
  return [...preparedHtml.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({ id: m[1], text: textOf(m[2]) }));
}

export function wordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  return text ? text.split(/\s+/).length : 0;
}
