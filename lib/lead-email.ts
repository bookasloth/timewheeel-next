// Pure renderer for the lead notification email. No framework imports, so it
// can be unit-tested / previewed standalone.

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
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Branded HTML email — table layout + inline CSS so it renders in every client.
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
    : `<span style="color:${muted}">—</span>`;

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3f0">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">New ${esc(l.service)} lead from ${esc(l.business)} — ${esc(l.source)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f0;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${line};border-radius:14px;overflow:hidden">
        <tr><td style="background:${ink};padding:22px 28px">
          <div style="font:800 18px/1 Arial,sans-serif;letter-spacing:.5px;color:#fff">TIME<span style="color:${brand}">WHEEL</span></div>
        </td></tr>
        <tr><td style="padding:28px 28px 8px">
          <div style="display:inline-block;background:${brand};color:#fff;font:700 11px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;padding:6px 10px;border-radius:999px">New lead</div>
          <h1 style="margin:16px 0 4px;font:800 22px/1.25 Arial,sans-serif;color:${ink}">${esc(l.service)} — ${esc(l.business)}</h1>
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
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 4px">
          <div style="font:600 12px/1.4 Arial,sans-serif;color:${muted};text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Message</div>
          <div style="background:#faf9f7;border:1px solid ${line};border-left:3px solid ${brand};border-radius:8px;padding:16px 18px;font:400 15px/1.6 Arial,sans-serif;color:${ink};white-space:pre-wrap">${esc(l.message)}</div>
        </td></tr>
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

export function renderLeadEmailText(l: LeadEmail): string {
  return [
    `New lead from ${l.source}`,
    "",
    `Name:     ${l.name}`,
    `Business: ${l.business}`,
    `Email:    ${l.email}`,
    `Phone:    ${l.phone}`,
    `Website:  ${l.website || "—"}`,
    `Service:  ${l.service}`,
    `When:     ${l.when}`,
    "",
    "Message:",
    l.message,
  ].join("\n");
}
