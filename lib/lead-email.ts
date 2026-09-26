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
  // Admin-only: the full audit findings + exact fixes. Never shown in the
  // public report; the team gets them here to action the lead.
  findings?: LeadFinding[];
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
            ${row("Name", esc(l.name))}
            ${row("Business", esc(l.business))}
            ${row("Email", `<a href="mailto:${esc(l.email)}" style="color:${brand};text-decoration:none">${esc(l.email)}</a>`)}
            ${row("Phone", `<a href="tel:${esc(l.phone)}" style="color:${brand};text-decoration:none">${esc(l.phone)}</a>`)}
            ${row("Website", websiteCell)}
            ${row("Service", esc(l.service))}
            ${l.budget ? row("Their price", `<strong style="color:${brand}">${esc(l.budget)}</strong>`) : ""}
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
    "",
    `Name:     ${l.name}`,
    `Business: ${l.business}`,
    `Email:    ${l.email}`,
    `Phone:    ${l.phone}`,
    `Website:  ${l.website || "–"}`,
    `Service:  ${l.service}`,
    ...(l.budget ? [`Price:    ${l.budget}`] : []),
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
