// Pure renderer for the lead notification email. No framework imports, so it
// can be unit-tested / previewed standalone.

export type LeadFinding = {
  title: string;
  severity: string;
  category: string;
  recommendation: string;
};

export type LeadEmail = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
  source: string;
  when: string;
  // Challenge signups name their own price (₹0+). Only set for that flow.
  budget?: string;
  // Qualification fields (free-website campaign + richer lead forms).
  category?: string;
  location?: string;
  consent?: boolean;
  // One-line campaign summary built from first-touch attribution, when present.
  campaign?: string;
  // Admin-only: the full audit findings + exact fixes. Never shown in the
  // public report; the team gets them here to action the lead.
  findings?: LeadFinding[];
  // Set when the bot trap was filled slowly (likely autofill): eyeball it first.
  flag?: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Branded HTML email, table layout + inline CSS so it renders in every client.
export function renderLeadEmailHtml(l: LeadEmail): string {
  const brand = "#fe5100";
  const ink = "#17130e";
  const muted = "#6e675c";
  const line = "#eceae6";
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${line};font:600 12px/1.4 Arial,sans-serif;color:${muted};text-transform:uppercase;letter-spacing:.04em;width:120px;vertical-align:top">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${line};font:400 15px/1.5 Arial,sans-serif;color:${ink};vertical-align:top">${value}</td>
    </tr>`;
  const websiteCell = l.website
    ? `<a href="${esc(l.website)}" style="color:${brand};text-decoration:none">${esc(l.website)}</a>`
    : `<span style="color:${muted}">–</span>`;

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3f0">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">New ${esc(l.service)} lead from ${esc(l.business)}, ${esc(l.source)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${line};border-radius:14px;overflow:hidden">
        <tr><td style="background:${ink};padding:22px 28px">
          <div style="font:800 18px/1 Arial,sans-serif;letter-spacing:.5px;color:#fff">TIME<span style="color:${brand}">WHEEL</span></div>
        </td></tr>
        <tr><td style="padding:28px 28px 8px">
          <div style="display:inline-block;background:${brand};color:#fff;font:700 11px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;padding:6px 10px;border-radius:999px">New lead</div>
          <h1 style="margin:16px 0 4px;font:800 22px/1.25 Arial,sans-serif;color:${ink}">${esc(l.service)}, ${esc(l.business)}</h1>
          <p style="margin:0;font:400 13px/1.5 Arial,sans-serif;color:${muted}">via ${esc(l.source)} · ${esc(l.when)}</p>
        </td></tr>
        <tr><td style="padding:12px 28px 4px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${l.flag ? row("Check", `<strong style="color:#b45309">${esc(l.flag)}</strong>`) : ""}
            ${row("Name", esc(l.name))}
            ${row("Business", esc(l.business))}
            ${row("Email", `<a href="mailto:${esc(l.email)}" style="color:${brand};text-decoration:none">${esc(l.email)}</a>`)}
            ${row("Phone", `<a href="tel:${esc(l.phone)}" style="color:${brand};text-decoration:none">${esc(l.phone)}</a>`)}
            ${row("Website", websiteCell)}
            ${row("Service", esc(l.service))}
            ${l.category ? row("Category", esc(l.category)) : ""}
            ${l.location ? row("Location", esc(l.location)) : ""}
            ${l.budget ? row("Their price", `<strong style="color:${brand}">${esc(l.budget)}</strong>`) : ""}
            ${typeof l.consent === "boolean" ? row("Marketing consent", l.consent ? `<strong style="color:#29a66f">Yes</strong>` : `<span style="color:${muted}">No</span>`) : ""}
            ${l.campaign ? row("Campaign", esc(l.campaign)) : ""}
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 4px">
          <div style="font:600 12px/1.4 Arial,sans-serif;color:${muted};text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Message</div>
          <div style="background:#faf9f7;border:1px solid ${line};border-left:3px solid ${brand};border-radius:8px;padding:16px 18px;font:400 15px/1.6 Arial,sans-serif;color:${ink};white-space:pre-wrap">${esc(l.message)}</div>
        </td></tr>
        ${l.findings && l.findings.length ? `
        <tr><td style="padding:20px 28px 4px">
          <div style="font:600 12px/1.4 Arial,sans-serif;color:${muted};text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Full audit findings + fixes (admin only)</div>
          ${l.findings.map((f, i) => `
            <div style="background:#faf9f7;border:1px solid ${line};border-radius:8px;padding:14px 16px;margin-bottom:8px">
              <div style="font:700 14px/1.4 Arial,sans-serif;color:${ink}">${i + 1}. ${esc(f.title)} <span style="font:600 11px/1 Arial,sans-serif;color:${muted}">(${esc(f.severity)} · ${esc(f.category)})</span></div>
              <div style="margin-top:6px;font:400 13px/1.55 Arial,sans-serif;color:${ink}"><strong>Fix:</strong> ${esc(f.recommendation || "—")}</div>
            </div>`).join("")}
        </td></tr>` : ""}
        <tr><td style="padding:24px 28px 28px">
          <a href="mailto:${esc(l.email)}?subject=Re:%20your%20enquiry%20to%20Timewheel" style="display:inline-block;background:${brand};color:#fff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:14px 26px;border-radius:10px">Reply to ${esc(l.name)}</a>
        </td></tr>
        <tr><td style="padding:16px 28px;background:#faf9f7;border-top:1px solid ${line}">
          <p style="margin:0;font:400 12px/1.5 Arial,sans-serif;color:${muted}">This lead was submitted on timewheel.co.in. Reply directly to this email to reach ${esc(l.name)}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── Lead-facing "your SEO audit is ready" email ────────────────────────────

export type ReportEmail = {
  name: string;
  domain: string;
  scores: { overall: number | null; ai: number | null; seo: number | null };
  reportUrl: string;
};

function scoreCell(label: string, value: number | null): string {
  const ink = "#17130e";
  const muted = "#6e675c";
  const v = value ?? null;
  const color = v === null ? muted : v >= 70 ? "#29a66f" : v >= 45 ? "#f59e0b" : "#ef4444";
  return `
    <td align="center" style="padding:8px;width:33%">
      <div style="font:800 30px/1 Arial,sans-serif;color:${color}">${v ?? "–"}</div>
      <div style="margin-top:6px;font:600 12px/1.3 Arial,sans-serif;color:${ink}">${label}</div>
    </td>`;
}

export function renderReportEmailHtml(r: ReportEmail): string {
  const brand = "#fe5100";
  const ink = "#17130e";
  const muted = "#6e675c";
  const line = "#eceae6";
  const first = r.name.split(" ")[0] || "there";
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3f0">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">Your SEO audit for ${esc(r.domain)} is ready — see every fix.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${line};border-radius:14px;overflow:hidden">
        <tr><td style="background:${ink};padding:22px 28px">
          <div style="font:800 18px/1 Arial,sans-serif;letter-spacing:.5px;color:#fff">TIME<span style="color:${brand}">WHEEL</span></div>
        </td></tr>
        <tr><td style="padding:28px 28px 8px">
          <h1 style="margin:0 0 8px;font:800 22px/1.3 Arial,sans-serif;color:${ink}">Your SEO audit is ready, ${esc(first)}</h1>
          <p style="margin:0;font:400 15px/1.6 Arial,sans-serif;color:${muted}">Here's how <strong style="color:${ink}">${esc(r.domain)}</strong> scored across SEO, AI search and technical health. Open the full report to see every issue and the fix.</p>
        </td></tr>
        <tr><td style="padding:18px 28px 4px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;border:1px solid ${line};border-radius:12px">
            <tr>
              ${scoreCell("SEO Health", r.scores.overall)}
              ${scoreCell("AI Search", r.scores.ai)}
              ${scoreCell("Technical", r.scores.seo)}
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 28px 28px" align="center">
          <a href="${esc(r.reportUrl)}" style="display:inline-block;background:${brand};color:#fff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:15px 30px;border-radius:10px">See all fixes in your full report</a>
          <p style="margin:14px 0 0;font:400 12px/1.5 Arial,sans-serif;color:${muted}">Or paste this link into your browser:<br><a href="${esc(r.reportUrl)}" style="color:${brand};text-decoration:none">${esc(r.reportUrl)}</a></p>
        </td></tr>
        <tr><td style="padding:16px 28px;background:#faf9f7;border-top:1px solid ${line}">
          <p style="margin:0;font:400 12px/1.5 Arial,sans-serif;color:${muted}">You asked for your SEO fixes from timewheel.co.in. Reply to this email if you'd like our team to walk you through the plan.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function renderReportEmailText(r: ReportEmail): string {
  return [
    `Your SEO audit for ${r.domain} is ready.`,
    "",
    `SEO Health: ${r.scores.overall ?? "–"}`,
    `AI Search:  ${r.scores.ai ?? "–"}`,
    `Technical:  ${r.scores.seo ?? "–"}`,
    "",
    "See all fixes in your full report:",
    r.reportUrl,
    "",
    "Reply to this email if you'd like our team to walk you through the plan.",
  ].join("\n");
}

export function renderLeadEmailText(l: LeadEmail): string {
  return [
    `New lead from ${l.source}`,
    ...(l.flag ? [`CHECK: ${l.flag}`] : []),
    "",
    `Name:     ${l.name}`,
    `Business: ${l.business}`,
    `Email:    ${l.email}`,
    `Phone:    ${l.phone}`,
    `Website:  ${l.website || "–"}`,
    `Service:  ${l.service}`,
    ...(l.category ? [`Category: ${l.category}`] : []),
    ...(l.location ? [`Location: ${l.location}`] : []),
    ...(l.budget ? [`Price:    ${l.budget}`] : []),
    ...(typeof l.consent === "boolean" ? [`Consent:  ${l.consent ? "Yes" : "No"}`] : []),
    ...(l.campaign ? [`Campaign: ${l.campaign}`] : []),
    `When:     ${l.when}`,
    "",
    "Message:",
    l.message,
    ...(l.findings && l.findings.length
      ? ["", "Full audit findings + fixes (admin only):",
         ...l.findings.map((f, i) => `${i + 1}. ${f.title} (${f.severity} · ${f.category})\n   Fix: ${f.recommendation || "—"}`)]
      : []),
  ].join("\n");
}

// ── Lead-facing welcome email (free-website Nagpur campaign) ────────────────
// Sent automatically to every new free-website lead right after they submit:
// confirms the request, sets expectations, and asks for assets/timing to speed
// up the build and keep them warm for the later upsell.

const CONTACT_LINE = "team@timewheel.co.in · +91 79041 09359 · Nagpur, Maharashtra";

export function renderWelcomeEmailHtml(firstName: string): string {
  const brand = "#fe5100";
  const ink = "#17130e";
  const muted = "#6e675c";
  const line = "#eceae6";
  const name = esc(firstName || "there");
  const step = (n: number, text: string) => `
    <tr>
      <td style="padding:6px 0;vertical-align:top;width:34px">
        <span style="display:inline-block;width:24px;height:24px;border-radius:999px;background:${brand};color:#fff;font:700 13px/24px Arial,sans-serif;text-align:center">${n}</span>
      </td>
      <td style="padding:6px 0;font:400 15px/1.55 Arial,sans-serif;color:${ink};vertical-align:top">${text}</td>
    </tr>`;
  const bullet = (text: string) => `
    <tr><td style="padding:4px 0 4px 2px;font:400 15px/1.5 Arial,sans-serif;color:${ink}">
      <span style="color:${brand};font-weight:700">•</span>&nbsp; ${text}
    </td></tr>`;

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3f0">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">Your free website spot is reserved. Here's what happens next.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${line};border-radius:14px;overflow:hidden">
        <tr><td style="background:${ink};padding:22px 28px">
          <div style="font:800 18px/1 Arial,sans-serif;letter-spacing:.5px;color:#fff">TIME<span style="color:${brand}">WHEEL</span></div>
        </td></tr>
        <tr><td style="padding:30px 28px 6px">
          <h1 style="margin:0 0 10px;font:800 23px/1.3 Arial,sans-serif;color:${ink}">We've got your free website request</h1>
          <p style="margin:0;font:400 15px/1.65 Arial,sans-serif;color:${muted}">Hi ${name}, thanks for requesting your free website from Timewheel. We have your details and a spot is reserved for your business.</p>
        </td></tr>
        <tr><td style="padding:18px 28px 4px">
          <div style="font:700 12px/1.4 Arial,sans-serif;color:${muted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">What happens next</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${step(1, "We'll call or WhatsApp you within one business day to confirm a few details.")}
            ${step(2, "We design and build your website.")}
            ${step(3, "You review, we refine, and it goes live. You own it fully.")}
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 4px">
          <div style="background:#faf9f7;border:1px solid ${line};border-left:3px solid ${brand};border-radius:8px;padding:16px 18px">
            <div style="font:700 14px/1.4 Arial,sans-serif;color:${ink};margin-bottom:8px">To get you live faster, reply to this email with:</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${bullet("A link to your current Instagram, Facebook, or Google listing (if you have one)")}
              ${bullet("A few photos of your business, products, or work")}
              ${bullet("The best time and number to reach you")}
            </table>
          </div>
        </td></tr>
        <tr><td style="padding:24px 28px 6px">
          <a href="https://wa.me/917904109359" style="display:inline-block;background:${brand};color:#fff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:14px 26px;border-radius:10px">Message us on WhatsApp</a>
        </td></tr>
        <tr><td style="padding:16px 28px 28px">
          <p style="margin:0;font:400 15px/1.6 Arial,sans-serif;color:${ink}">Talk soon,<br><strong>The Timewheel Team</strong></p>
        </td></tr>
        <tr><td style="padding:16px 28px;background:#faf9f7;border-top:1px solid ${line}">
          <p style="margin:0;font:400 12px/1.6 Arial,sans-serif;color:${muted}">${esc(CONTACT_LINE)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function renderWelcomeEmailText(firstName: string): string {
  return [
    `Hi ${firstName || "there"},`,
    "",
    "Thanks for requesting your free website from Timewheel. We have your details and a spot is reserved for your business.",
    "",
    "What happens next:",
    "1. We'll call or WhatsApp you within one business day to confirm a few details.",
    "2. We design and build your website.",
    "3. You review, we refine, and it goes live. You own it fully.",
    "",
    "To get you live faster, reply to this email with:",
    "- A link to your current Instagram, Facebook, or Google listing (if you have one)",
    "- A few photos of your business, products, or work",
    "- The best time and number to reach you",
    "",
    "Talk soon,",
    "The Timewheel Team",
    CONTACT_LINE,
  ].join("\n");
}

// ── Lifecycle emails (delivered / upsell), sent when the team advances a lead ──
// Shared branded shell so the lifecycle emails match the welcome without repeating
// the whole table layout each time.

function shell(opts: {
  preheader: string;
  headline: string;
  intro: string;
  innerHtml?: string;
  ctaHref?: string;
  ctaLabel?: string;
}): string {
  const brand = "#fe5100";
  const ink = "#17130e";
  const muted = "#6e675c";
  const line = "#eceae6";
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3f0">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${line};border-radius:14px;overflow:hidden">
        <tr><td style="background:${ink};padding:22px 28px">
          <div style="font:800 18px/1 Arial,sans-serif;letter-spacing:.5px;color:#fff">TIME<span style="color:${brand}">WHEEL</span></div>
        </td></tr>
        <tr><td style="padding:30px 28px 6px">
          <h1 style="margin:0 0 10px;font:800 23px/1.3 Arial,sans-serif;color:${ink}">${opts.headline}</h1>
          <p style="margin:0;font:400 15px/1.65 Arial,sans-serif;color:${muted}">${opts.intro}</p>
        </td></tr>
        ${opts.innerHtml ?? ""}
        ${opts.ctaHref ? `<tr><td style="padding:24px 28px 6px">
          <a href="${esc(opts.ctaHref)}" style="display:inline-block;background:${brand};color:#fff;font:700 15px/1 Arial,sans-serif;text-decoration:none;padding:14px 26px;border-radius:10px">${esc(opts.ctaLabel || "Get in touch")}</a>
        </td></tr>` : ""}
        <tr><td style="padding:16px 28px 28px">
          <p style="margin:0;font:400 15px/1.6 Arial,sans-serif;color:${ink}">Talk soon,<br><strong>The Timewheel Team</strong></p>
        </td></tr>
        <tr><td style="padding:16px 28px;background:#faf9f7;border-top:1px solid ${line}">
          <p style="margin:0;font:400 12px/1.6 Arial,sans-serif;color:${muted}">${esc(CONTACT_LINE)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function bulletBox(title: string, items: string[]): string {
  const brand = "#fe5100";
  const ink = "#17130e";
  const line = "#eceae6";
  const rows = items
    .map(
      (t) => `<tr><td style="padding:4px 0 4px 2px;font:400 15px/1.5 Arial,sans-serif;color:${ink}"><span style="color:${brand};font-weight:700">•</span>&nbsp; ${t}</td></tr>`,
    )
    .join("");
  return `<tr><td style="padding:20px 28px 4px">
    <div style="background:#faf9f7;border:1px solid ${line};border-left:3px solid ${brand};border-radius:8px;padding:16px 18px">
      <div style="font:700 14px/1.4 Arial,sans-serif;color:${ink};margin-bottom:8px">${title}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>
  </td></tr>`;
}

const WA = "https://wa.me/917904109359";

// "Your website is live" — sent when a lead's status moves to `delivered`.
export function renderDeliveredEmailHtml(firstName: string, siteUrl?: string): string {
  const name = esc(firstName || "there");
  const url = siteUrl && /^https?:\/\//i.test(siteUrl) ? siteUrl : "";
  return shell({
    preheader: "Your website is live. Take a look and share it with your customers.",
    headline: "Your website is live 🚀",
    intro: `Hi ${name}, your new website is live and ready to meet your customers. Have a look and tell us what you think.`,
    innerHtml:
      (url
        ? `<tr><td style="padding:16px 28px 4px"><a href="${esc(url)}" style="font:700 15px/1.5 Arial,sans-serif;color:#fe5100;text-decoration:none">${esc(url.replace(/^https?:\/\//i, ""))}</a></td></tr>`
        : "") +
      bulletBox("A couple of quick things that help a lot:", [
        "Share it with your customers: WhatsApp, your Instagram bio, your Google listing.",
        "Happy with it? A quick Google review or a short testimonial means the world to a small Nagpur team like ours.",
        "Need a tweak? Just reply to this email, it's yours and we're here for it.",
      ]),
    ctaHref: WA,
    ctaLabel: "Message us on WhatsApp",
  });
}

export function renderDeliveredEmailText(firstName: string, siteUrl?: string): string {
  const url = siteUrl && /^https?:\/\//i.test(siteUrl) ? siteUrl : "";
  return [
    `Hi ${firstName || "there"},`,
    "",
    "Your new website is live and ready to meet your customers. Have a look and tell us what you think.",
    ...(url ? ["", url] : []),
    "",
    "A couple of quick things that help a lot:",
    "- Share it with your customers: WhatsApp, your Instagram bio, your Google listing.",
    "- Happy with it? A quick Google review or a short testimonial means the world to a small Nagpur team like ours.",
    "- Need a tweak? Just reply to this email, it's yours and we're here for it.",
    "",
    "Talk soon,",
    "The Timewheel Team",
    CONTACT_LINE,
  ].join("\n");
}

// "Let's get you more customers" — sent when a lead's status moves to `upsell`.
export function renderUpsellEmailHtml(firstName: string): string {
  const name = esc(firstName || "there");
  return shell({
    preheader: "Your site is live. Here's how to turn it into real enquiries.",
    headline: "Your site looks great, now let's get you found",
    intro: `Hi ${name}, your website is live and looking sharp. If you'd like it to actually bring in customers, this is where we can help.`,
    innerHtml: bulletBox("Ways we grow Nagpur businesses:", [
      "<strong>SEO</strong> so you show up on Google when people search locally.",
      "<strong>Google &amp; Meta ads</strong> to drive enquiries now, not months from now.",
      "<strong>Social media</strong> content and management that keeps you visible.",
      "<strong>Maintenance &amp; hosting</strong> so your site stays fast, secure and online.",
    ]),
    ctaHref: WA,
    ctaLabel: "Book a free growth chat",
  });
}

export function renderUpsellEmailText(firstName: string): string {
  return [
    `Hi ${firstName || "there"},`,
    "",
    "Your website is live and looking sharp. If you'd like it to actually bring in customers, this is where we can help.",
    "",
    "Ways we grow Nagpur businesses:",
    "- SEO so you show up on Google when people search locally.",
    "- Google & Meta ads to drive enquiries now, not months from now.",
    "- Social media content and management that keeps you visible.",
    "- Maintenance & hosting so your site stays fast, secure and online.",
    "",
    "Want a quick, no-pressure chat about what would move the needle? Reply here or message us on WhatsApp.",
    "",
    "Talk soon,",
    "The Timewheel Team",
    CONTACT_LINE,
  ].join("\n");
}
