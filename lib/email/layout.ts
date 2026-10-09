// The Timewheel email design system. Every email (lead-facing and team) is a
// plain data object rendered here into an HTML body and a text twin, so they
// all share one look: centred wheel header, optional status band with an icon
// badge, label/value rows, a tinted details box, a bordered callout, one solid
// button, a quiet help + fine-print footer and the four-colour brand stripe.
//
// Email-client rules followed throughout: table layout, inline styles only,
// 600px max, web fonts with Arial fallbacks (Gmail drops the web fonts), PNG
// logo (no SVG), unicode glyphs instead of icon images.
import { site } from "@/lib/site";

const C = {
  brand: "#f45b0a",
  brandText: "#b83f00",
  ink: "#171717",
  muted: "#6c685f",
  line: "#e7e0d3",
  page: "#f5f0e7",
  tint: "#faf6ef",
  success: "#29a66f",
  danger: "#d64545",
  blue: "#3987c9",
  pink: "#ff4d93",
};
const BODY = "'Plus Jakarta Sans',Arial,Helvetica,sans-serif";
const HEAD = "'Poppins',Arial,Helvetica,sans-serif";
const LOGO = `${site.url}/brand/png/timewheel-icon-128.png`;
export const COMPANY = "Timewheel Internet Pvt. Ltd.";
const WA = `https://wa.me/${site.contact.whatsappDigits}`;

export type Tone = "brand" | "success" | "danger";
const toneColor: Record<Tone, string> = { brand: C.brand, success: C.success, danger: C.danger };
const glyph = { check: "&#10003;", cross: "&#10005;", spark: "&#10022;" };

// [label, value, optional link]
export type Row = [string, string, string?];

export type Block =
  | { type: "p"; text: string; muted?: boolean }
  | { type: "rows"; rows: Row[] }
  | { type: "box"; title: string; rows: Row[]; total?: Row }
  | { type: "callout"; label: string; value: string; href?: string; tone?: Tone }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "list"; title?: string; items: (string | [string, string])[] }
  | { type: "quote"; label: string; text: string }
  | { type: "button"; href: string; label: string }
  | { type: "scores"; items: { label: string; value: number | null }[] };

export type Email = {
  subject: string;
  preheader: string;
  hero?: { tone: Tone; icon: keyof typeof glyph; title: string; subtitle?: string };
  kicker?: string;
  title?: string;
  blocks: Block[];
  signoff?: boolean; // "Regards, The Timewheel Team" (default on)
  help?: boolean; // "Questions? Reply, email or call" line (default on)
  footnote?: string; // why they got this email
};

export type Rendered = { subject: string; html: string; text: string };

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const font = (size: number, weight = 400, color = C.ink, family = BODY, lh = 1.6) =>
  `font-family:${family};font-size:${size}px;font-weight:${weight};line-height:${lh};color:${color}`;
const link = (href: string, text: string, color = C.brandText) =>
  `<a href="${esc(href)}" style="color:${color};text-decoration:underline">${esc(text)}</a>`;
const cell = (inner: string, pad = "0 32px 20px") => `<tr><td style="padding:${pad}">${inner}</td></tr>`;

function rowsTable(rows: Row[], labelColor = C.muted) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows
    .map(
      ([k, v, href]) => `<tr>
        <td style="padding:7px 16px 7px 0;width:38%;vertical-align:top;${font(14, 400, labelColor)}">${esc(k)}</td>
        <td style="padding:7px 0;vertical-align:top;${font(14, 600)}">${href ? link(href, v, C.ink) : esc(v)}</td>
      </tr>`,
    )
    .join("")}</table>`;
}

function blockHtml(b: Block): string {
  switch (b.type) {
    case "p":
      return cell(`<p style="margin:0;${font(15, 400, b.muted ? C.muted : C.ink)}">${esc(b.text)}</p>`, "0 32px 16px");
    case "rows":
      return cell(rowsTable(b.rows));
    case "box":
      return cell(`<div style="background:${C.tint};border:1px solid ${C.line};border-radius:10px;padding:16px 18px">
        <div style="${font(11, 700, C.muted, BODY, 1.4)};text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">${esc(b.title)}</div>
        ${rowsTable(b.rows)}
        ${b.total ? `<div style="border-top:1px solid ${C.line};margin-top:6px">${rowsTable([b.total], C.ink)}</div>` : ""}
      </div>`);
    case "callout": {
      const tone = toneColor[b.tone ?? "brand"];
      return cell(`<div style="border:1px solid ${C.line};border-left:3px solid ${tone};border-radius:10px;padding:14px 18px">
        <div style="${font(13, 600, tone, BODY, 1.4)}">${esc(b.label)}</div>
        <div style="margin-top:4px;${font(16, 700, C.ink, BODY, 1.45)}">${b.href ? link(b.href, b.value, C.ink) : esc(b.value)}</div>
      </div>`);
    }
    case "steps":
      return cell(`${b.title ? `<div style="${font(15, 700)};margin-bottom:6px">${esc(b.title)}</div>` : ""}
        <table role="presentation" cellpadding="0" cellspacing="0">${b.items
          .map(
            (t, i) => `<tr>
            <td style="padding:5px 12px 5px 0;vertical-align:top"><div style="width:24px;height:24px;border-radius:12px;background:${C.brand};text-align:center;${font(12, 700, "#ffffff", BODY, 2)}">${i + 1}</div></td>
            <td style="padding:6px 0;vertical-align:top;${font(15)}">${esc(t)}</td>
          </tr>`,
          )
          .join("")}</table>`);
    case "list":
      return cell(`${b.title ? `<div style="${font(15, 700)};margin-bottom:6px">${esc(b.title)}</div>` : ""}
        <table role="presentation" cellpadding="0" cellspacing="0">${b.items
          .map((it) => {
            const body = Array.isArray(it) ? `<strong>${esc(it[0])}</strong> ${esc(it[1])}` : esc(it);
            return `<tr><td style="padding:4px 10px 4px 0;vertical-align:top;${font(15, 700, C.brand)}">&bull;</td><td style="padding:4px 0;${font(15)}">${body}</td></tr>`;
          })
          .join("")}</table>`);
    case "quote":
      return cell(`<div style="${font(11, 700, C.muted, BODY, 1.4)};text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">${esc(b.label)}</div>
        <div style="background:${C.tint};border-left:3px solid ${C.brand};border-radius:8px;padding:14px 16px;white-space:pre-wrap;${font(15)}">${esc(b.text)}</div>`);
    case "button":
      return cell(`<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${C.brand};border-radius:8px">
        <a href="${esc(b.href)}" style="display:inline-block;padding:13px 26px;${font(15, 700, "#ffffff", BODY, 1)};text-decoration:none">${esc(b.label)}</a>
      </td></tr></table>`, "4px 32px 24px");
    case "scores":
      return cell(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tint};border:1px solid ${C.line};border-radius:10px"><tr>${b.items
        .map(({ label, value }) => {
          const color = value === null ? C.muted : value >= 70 ? C.success : value >= 45 ? "#d98a00" : C.danger;
          return `<td align="center" style="padding:16px 8px;width:${Math.floor(100 / b.items.length)}%">
            <div style="${font(30, 800, color, HEAD, 1)}">${value ?? "&ndash;"}</div>
            <div style="margin-top:6px;${font(12, 600, C.ink, BODY, 1.3)}">${esc(label)}</div>
          </td>`;
        })
        .join("")}</tr></table>`);
  }
}

function blockText(b: Block): string {
  const rows = (rs: Row[]) => rs.map(([k, v, href]) => `${k}: ${v}${href && !href.startsWith("mailto:") && !href.startsWith("tel:") && href !== v ? ` (${href})` : ""}`).join("\n");
  switch (b.type) {
    case "p":
      return b.text;
    case "rows":
      return rows(b.rows);
    case "box":
      return [b.title.toUpperCase(), rows(b.rows), ...(b.total ? [rows([b.total])] : [])].join("\n");
    case "callout":
      return `${b.label}: ${b.value}${b.href && b.href !== b.value ? ` (${b.href})` : ""}`;
    case "steps":
      return [...(b.title ? [b.title] : []), ...b.items.map((t, i) => `${i + 1}. ${t}`)].join("\n");
    case "list":
      return [...(b.title ? [b.title] : []), ...b.items.map((it) => `- ${Array.isArray(it) ? `${it[0]} ${it[1]}` : it}`)].join("\n");
    case "quote":
      return `${b.label}:\n${b.text}`;
    case "button":
      return `${b.label}: ${b.href}`;
    case "scores":
      return b.items.map(({ label, value }) => `${label}: ${value ?? "-"}`).join("\n");
  }
}

export function renderEmail(e: Email): Rendered {
  const signoff = e.signoff ?? true;
  const help = e.help ?? true;
  const { email, phone } = site.contact;
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  const hero = e.hero
    ? `<tr><td align="center" style="background:${toneColor[e.hero.tone]};padding:32px 28px 28px;border-radius:14px 14px 0 0">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="width:56px;height:56px;border-radius:28px;background:#ffffff;${font(26, 700, toneColor[e.hero.tone], BODY, 1)}">${glyph[e.hero.icon]}</td></tr></table>
        <div style="margin-top:16px;${font(24, 700, "#ffffff", HEAD, 1.3)}">${esc(e.hero.title)}</div>
        ${e.hero.subtitle ? `<div style="margin-top:6px;${font(14, 500, "#ffffff", BODY, 1.5)};opacity:.9">${esc(e.hero.subtitle)}</div>` : ""}
      </td></tr>`
    : "";

  const heading = [
    e.kicker ? `<div style="${font(12, 700, C.brandText, BODY, 1.4)};text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px">${esc(e.kicker)}</div>` : "",
    e.title ? `<h1 style="margin:0;${font(e.hero ? 18 : 24, 700, C.ink, HEAD, 1.3)}">${esc(e.title)}</h1>` : "",
  ].join("");

  const footer = [
    signoff ? cell(`<p style="margin:0;${font(15)}">Regards,<br><strong>The Timewheel Team</strong><br>${link(site.url, site.url.replace(/^https?:\/\//, ""))}</p>`, "4px 32px 24px") : "",
    help
      ? cell(`<div style="border-top:1px solid ${C.line};padding-top:18px;${font(13, 400, C.muted)}">Questions? Just reply to this email, write to ${link(`mailto:${email}`, email)}, call ${link(phoneHref, phone)} or ${link(WA, "WhatsApp us")}.</div>`, "0 32px 24px")
      : "",
    e.footnote ? cell(`<div style="${font(12, 400, C.muted, BODY, 1.6)}">${esc(e.footnote)}</div>`, "0 32px 28px") : "",
  ].join("");

  const stripe = [C.brand, C.blue, C.pink, C.success].map((c) => `<td width="25%" height="4" style="background:${c};font-size:0;line-height:0">&nbsp;</td>`).join("");

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
<title>${esc(e.subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${esc(e.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page}"><tr><td align="center" style="padding:28px 12px 32px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">
    <tr><td align="center" style="padding:0 0 22px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px"><img src="${LOGO}" width="34" height="34" alt="" style="display:block;border:0"></td>
        <td style="${font(19, 800, C.ink, HEAD, 1)};letter-spacing:.06em">TIME<span style="color:${C.brand}">WHEEL</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="background:#ffffff;border:1px solid ${C.line};border-radius:14px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${hero}
        ${heading ? cell(heading, `${e.hero ? 26 : 32}px 32px 16px`) : `<tr><td style="height:24px"></td></tr>`}
        ${e.blocks.map(blockHtml).join("")}
        ${footer}
      </table>
    </td></tr>
    <tr><td style="padding:22px 24px 18px" align="center">
      <div style="${font(12, 400, C.muted, BODY, 1.6)}">${esc(COMPANY)} &middot; ${esc(site.contact.city)}, ${esc(site.contact.region)}<br>${link(site.url, site.url.replace(/^https?:\/\//, ""), C.muted)}</div>
    </td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${stripe}</tr></table></td></tr>
  </table>
</td></tr></table>
</body></html>`;

  const text = [
    ...(e.hero ? [e.hero.title + (e.hero.subtitle ? `\n${e.hero.subtitle}` : ""), ""] : []),
    ...(e.title ? [e.title, ""] : []),
    ...e.blocks.map((b) => blockText(b) + "\n"),
    ...(signoff ? ["Regards,", "The Timewheel Team", site.url, ""] : []),
    ...(help ? [`Questions? Reply to this email, write to ${email}, call ${phone} or WhatsApp ${WA}`, ""] : []),
    ...(e.footnote ? [e.footnote, ""] : []),
    `${COMPANY} · ${site.contact.city}, ${site.contact.region}`,
  ].join("\n");

  return { subject: e.subject, html, text };
}
