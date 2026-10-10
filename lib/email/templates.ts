// Every email the site sends, as data for lib/email/layout.ts. Pure functions
// (no I/O), so they can be previewed or tested standalone. Senders live in
// lib/resend-email.ts (lead-facing, Resend) and app/api/lead (team, SMTP).
import { site } from "@/lib/site";
import { COMPANY, renderEmail, renderNote, type Block, type Rendered, type Row } from "@/lib/email/layout";

const WA = `https://wa.me/${site.contact.whatsappDigits}`;
const first = (name: string) => (name || "").trim().split(/\s+/)[0] || "there";
const inr = (n: number, paise = false) =>
  `₹${n.toLocaleString("en-IN", paise ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 })}`;
const ist = (d: Date) =>
  d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
const host = (url: string) => url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

export const CHALLENGE = "30 Days, 30 Websites";

// Link that reopens /pay prefilled for a challenge spot.
export function challengePayUrl(price: number, business: string) {
  const q = new URLSearchParams({ amount: String(price), for: `${CHALLENGE}: ${business}`.slice(0, 200) });
  return `${site.url}/pay?${q}`;
}

// ── Lead-facing ──────────────────────────────────────────────────────────────

// Challenge signup. Free and paid spots share the welcome; a paid price adds the
// pay-any-time button, because checkout opens after this email is sent.
export function challengeWelcome(o: { name: string; business: string; price: number }): Rendered {
  const paid = o.price > 0;
  const blocks: Block[] = [
    { type: "p", text: `Thanks for joining ${CHALLENGE}. Your spot is saved and ${o.business || "your website"} is in the build queue.` },
    { type: "callout", label: "Your price", value: paid ? inr(o.price) : "Free (₹0)", tone: paid ? "brand" : "success" },
    ...(paid
      ? ([
          { type: "p", text: "Paid already? Your receipt arrives in a separate email. If checkout didn't go through, or you'd rather pay later, use this button any time." },
          { type: "button", href: challengePayUrl(o.price, o.business), label: `Pay ${inr(o.price)} securely` },
        ] as Block[])
      : []),
    {
      type: "steps",
      title: "What happens next",
      items: [
        "We call or WhatsApp you within one business day to confirm a few details.",
        "We design and build your website.",
        "You review, we refine, and it goes live. You own it fully.",
      ],
    },
    {
      type: "list",
      title: "To get you live faster, reply with:",
      items: [
        "A link to your Instagram, Facebook or Google listing, if you have one",
        "A few photos of your business, products or work",
        "The best time and number to reach you",
      ],
    },
    ...(paid ? [] : ([{ type: "button", href: WA, label: "Message us on WhatsApp" }] as Block[])),
  ];
  return renderEmail({
    subject: paid ? `Your ${CHALLENGE} spot is reserved` : `Your free website spot is reserved`,
    preheader: "Your spot is saved. Here's what happens next.",
    hero: { tone: "brand", icon: "spark", title: "Your spot is reserved", subtitle: CHALLENGE },
    title: `Hi ${first(o.name)},`,
    blocks,
    footnote: `You're receiving this because you signed up for ${CHALLENGE} on timewheel.co.in.`,
  });
}

// Every other lead form. The growth blueprint quiz gets its own framing, since
// the modal promised a 7-week plan by email.
export function enquiryReceived(o: { name: string; service: string; business: string; message: string; blueprint?: boolean }): Rendered {
  if (o.blueprint) {
    // The quiz message opens with an internal "[HOT LEAD]" scoring line: never show it.
    const answers = o.message.split("\n").filter((l) => !/^\[\w+ LEAD\]/.test(l)).join("\n").trim();
    return renderEmail({
      subject: "Your growth blueprint is on its way",
      preheader: "We're putting together your 7-week action plan.",
      hero: { tone: "brand", icon: "spark", title: "Your growth blueprint is on its way", subtitle: o.service },
      title: `Hi ${first(o.name)},`,
      blocks: [
        { type: "p", text: "Thanks for answering the questions. We're putting together your 7-week action plan from your answers and will email it to you shortly." },
        { type: "quote", label: "Your answers", text: answers },
        { type: "p", text: "Want to talk it through sooner? We're on WhatsApp." },
        { type: "button", href: WA, label: "Message us on WhatsApp" },
      ],
      footnote: "You're receiving this because you requested a growth blueprint on timewheel.co.in.",
    });
  }
  return renderEmail({
    subject: "We've got your enquiry",
    preheader: `Thanks for reaching out about ${o.service}. A real person replies within one business day.`,
    title: `Hi ${first(o.name)},`,
    blocks: [
      { type: "p", text: `Thanks for reaching out to Timewheel. We've got your enquiry and a real person will reply within one business day (${site.contact.hours}).` },
      { type: "rows", rows: [["Service", o.service], ["Business", o.business], ["Sent on", ist(new Date())]] },
      { type: "quote", label: "Your message", text: o.message },
      { type: "p", text: "Need a faster answer? We're on WhatsApp." },
      { type: "button", href: WA, label: "Message us on WhatsApp" },
    ],
    footnote: "You're receiving this because you sent an enquiry on timewheel.co.in.",
  });
}

export function seoReport(o: {
  name: string;
  domain: string;
  scores: { overall: number | null; ai: number | null; seo: number | null };
  reportUrl: string;
}): Rendered {
  return renderEmail({
    subject: `Your SEO audit for ${o.domain} is ready`,
    preheader: `See how ${o.domain} scored, and every fix.`,
    hero: { tone: "brand", icon: "check", title: "Your SEO audit is ready", subtitle: o.domain },
    title: `Hi ${first(o.name)},`,
    blocks: [
      { type: "p", text: `Here's how ${o.domain} scored across SEO, AI search and technical health. Open the full report to see every issue and the exact fix.` },
      { type: "scores", items: [{ label: "SEO Health", value: o.scores.overall }, { label: "AI Search", value: o.scores.ai }, { label: "Technical", value: o.scores.seo }] },
      { type: "button", href: o.reportUrl, label: "See all fixes in your full report" },
      { type: "p", text: "Want our team to walk you through the plan? Just reply to this email.", muted: true },
    ],
    footnote: "You're receiving this because you asked for your SEO fixes on timewheel.co.in.",
  });
}

export function paymentReceipt(o: {
  name: string;
  amount: number;
  purpose: string;
  paymentId: string | null;
  reference: string;
  paidAt: Date;
  challenge?: boolean;
}): Rendered {
  return renderEmail({
    subject: `Payment received: ${inr(o.amount, true)}`,
    preheader: `We've received ${inr(o.amount, true)} for ${o.purpose}. Thank you!`,
    hero: { tone: "success", icon: "check", title: `Paid ${inr(o.amount, true)} INR`, subtitle: `to ${COMPANY}` },
    title: `Hi ${first(o.name)},`,
    blocks: [
      {
        type: "p",
        text: o.challenge
          ? `Thank you! Your payment for your ${CHALLENGE} spot is confirmed. We'll be in touch about your website within one business day.`
          : "Thank you, we've received your payment. Keep this email for your records.",
      },
      { type: "rows", rows: [["Payment ID", o.paymentId ?? "-"], ["Paid on", ist(o.paidAt)], ["Reference", o.reference], ["Paid via", "Zoho Payments"]] },
      { type: "box", title: "Payment details", rows: [["For", o.purpose]], total: ["Total paid", `${inr(o.amount, true)} INR`] },
    ],
    footnote: `You're receiving this email because you made a payment to ${COMPANY} via Zoho Payments, which processes it securely.`,
  });
}

export function newsletterWelcome(): Rendered {
  return renderEmail({
    subject: "You're subscribed to Timewheel notes",
    preheader: "Practical growth notes for Indian businesses. No spam.",
    hero: { tone: "brand", icon: "check", title: "You're subscribed", subtitle: "Timewheel notes" },
    title: "Welcome aboard,",
    blocks: [
      { type: "p", text: "Thanks for subscribing. You'll get our notes on what's actually working for small and growing businesses in India." },
      {
        type: "list",
        title: "What to expect",
        items: [
          ["SEO and AI search:", "how to show up when people search for what you sell."],
          ["Ads that pay back:", "Google and Meta campaigns, without the waste."],
          ["Websites that convert:", "small changes that turn visits into enquiries."],
        ],
      },
      { type: "p", text: "A couple of emails a month at most. Reply \"unsubscribe\" any time and we'll take you off the list.", muted: true },
      { type: "button", href: `${site.url}/blog`, label: "Read the latest posts" },
    ],
    footnote: "You're receiving this because you subscribed at timewheel.co.in.",
  });
}

// Academy interest registration (/api/academy/interest). Written as a plain
// personal note (renderNote) so it lands in Primary, not Promotions: students
// need to see it. Nothing is open for payment yet, so it promises only what's
// true: details come first.
export function academyInterest(o: { name: string; program: string; programUrl: string; enrolling: boolean }): Rendered {
  return renderNote({
    subject: `Your interest in ${o.program}`,
    greeting: `Hi ${first(o.name)},`,
    lines: [
      o.enrolling
        ? `Thanks for applying to ${o.program} at Timewheel Digital Marketing Academy. We've got your details and will email you about next steps.`
        : `Thanks for registering your interest in ${o.program} at Timewheel Digital Marketing Academy. We've got your details.`,
      ...(o.enrolling
        ? []
        : ["The program isn't open for enrollment yet. When the first cohort is ready, we'll email you the dates, format and fees, and you can decide then. Registering doesn't commit you to anything."]),
      "Every program includes a Timewheel certificate, help completing Google, Meta, HubSpot and LinkedIn certifications, and internships at Timewheel and our sister companies.",
      `The full curriculum and sample projects are here: [${o.programUrl.replace(/^https?:\/\//, "")}](${o.programUrl})`,
      "If you have a question, just reply to this email. A person reads every reply.",
    ],
    signature: ["Thanks,", "Timewheel Digital Marketing Academy", "Timewheel Internet Private Limited, Nagpur"],
    footnote: "You're getting this because you registered on timewheel.co.in/academy. We only use your email for Academy updates; reply \"remove me\" and we'll delete your details.",
  });
}

// Lifecycle: lead status -> delivered.
export function websiteLive(o: { name: string; siteUrl?: string }): Rendered {
  const url = o.siteUrl && /^https?:\/\//i.test(o.siteUrl) ? o.siteUrl : "";
  return renderEmail({
    subject: "Your website is live",
    preheader: "Your website is live. Take a look and share it with your customers.",
    hero: { tone: "success", icon: "check", title: "Your website is live", subtitle: url ? host(url) : undefined },
    title: `Hi ${first(o.name)},`,
    blocks: [
      { type: "p", text: "Your new website is live and ready to meet your customers. Have a look and tell us what you think." },
      ...(url ? ([{ type: "callout", label: "Live website", value: host(url), href: url, tone: "success" }] as Block[]) : []),
      {
        type: "list",
        title: "A few quick things that help a lot",
        items: [
          "Share it with your customers: WhatsApp, your Instagram bio, your Google listing.",
          "Happy with it? A quick Google review or a short testimonial means the world to a small Nagpur team like ours.",
          "Need a tweak? Just reply to this email. It's yours and we're here for it.",
        ],
      },
      { type: "button", href: url || WA, label: url ? "Open your website" : "Message us on WhatsApp" },
    ],
    footnote: "You're receiving this because Timewheel built your website.",
  });
}

// Lifecycle: lead status -> upsell.
export function growthUpsell(o: { name: string }): Rendered {
  return renderEmail({
    subject: "Your site looks great, now let's get you found",
    preheader: "Your site is live. Here's how to turn it into real enquiries.",
    title: `Hi ${first(o.name)},`,
    blocks: [
      { type: "p", text: "Your website is live and looking sharp. If you'd like it to actually bring in customers, this is where we can help." },
      {
        type: "list",
        title: "Ways we grow Nagpur businesses",
        items: [
          ["SEO", "so you show up on Google when people search locally."],
          ["Google and Meta ads", "to drive enquiries now, not months from now."],
          ["Social media", "content and management that keeps you visible."],
          ["Maintenance and hosting", "so your site stays fast, secure and online."],
        ],
      },
      { type: "p", text: "Want a quick, no-pressure chat about what would move the needle? Reply here or message us on WhatsApp." },
      { type: "button", href: WA, label: "Book a free growth chat" },
    ],
    footnote: "You're receiving this because Timewheel built your website.",
  });
}

// ── Team-facing ──────────────────────────────────────────────────────────────

export type LeadFinding = { title: string; severity: string; category: string; recommendation: string };

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
  budget?: string; // challenge "name your price"
  category?: string;
  location?: string;
  consent?: boolean;
  campaign?: string; // one-line first-touch attribution summary
  findings?: LeadFinding[]; // admin-only SEO audit findings + fixes
  flag?: string; // set when the bot trap was filled slowly (likely autofill)
};

export function teamLead(l: LeadEmail): Rendered {
  const rows: Row[] = [
    ["Name", l.name],
    ["Business", l.business],
    ["Email", l.email, `mailto:${l.email}`],
    ["Phone", l.phone, `tel:${l.phone.replace(/\s/g, "")}`],
    ["Website", l.website || "-", l.website || undefined],
    ["Service", l.service],
  ];
  if (l.category) rows.push(["Category", l.category]);
  if (l.location) rows.push(["Location", l.location]);
  if (l.budget) rows.push(["Their price", l.budget]);
  if (typeof l.consent === "boolean") rows.push(["Marketing consent", l.consent ? "Yes" : "No"]);
  if (l.campaign) rows.push(["Campaign", l.campaign]);

  const blocks: Block[] = [
    ...(l.flag ? ([{ type: "callout", label: "Check", value: l.flag, tone: "danger" }] as Block[]) : []),
    { type: "rows", rows },
    { type: "quote", label: "Message", text: l.message },
    ...(l.findings?.length
      ? ([
          {
            type: "list",
            title: "Full audit findings and fixes (admin only)",
            items: l.findings.map((f, i) => [`${i + 1}. ${f.title} (${f.severity}, ${f.category}).`, `Fix: ${f.recommendation || "-"}`] as [string, string]),
          },
        ] as Block[])
      : []),
    { type: "button", href: `mailto:${l.email}?subject=${encodeURIComponent("Re: your enquiry to Timewheel")}`, label: `Reply to ${first(l.name)}` },
  ];
  return renderEmail({
    subject: `${l.flag ? "[Check] " : ""}New lead: ${l.service}, ${l.business} (${l.source})`,
    preheader: `New ${l.service} lead from ${l.business}, ${l.source}`,
    kicker: "New lead",
    title: `${l.service}, ${l.business}`,
    blocks: [{ type: "p", text: `via ${l.source} · ${l.when}`, muted: true }, ...blocks],
    signoff: false,
    help: false,
    footnote: `Submitted on timewheel.co.in. Reply to this email to reach ${l.name}.`,
  });
}

export function teamAcademyInterest(o: {
  name: string;
  email: string;
  institution?: string;
  stage?: string;
  program: string;
  campaign?: string;
  saved: boolean; // false = the DB missed it, this email is the only copy
  flag?: string;
}): Rendered {
  const rows: Row[] = [
    ["Name", o.name],
    ["Email", o.email, `mailto:${o.email}`],
    ["Program", o.program],
    ["Institution", o.institution || "-"],
    ["Stage", o.stage || "-"],
  ];
  if (o.campaign) rows.push(["Campaign", o.campaign]);
  const callouts: Block[] = [
    ...(o.flag ? ([{ type: "callout", label: "Check", value: o.flag, tone: "danger" }] as Block[]) : []),
    ...(!o.saved
      ? ([{ type: "callout", label: "Not in the database", value: "Supabase didn't take this row (not configured, or migration 0005 not applied). This email is the only copy.", tone: "danger" }] as Block[])
      : []),
  ];
  return renderEmail({
    subject: `${o.flag ? "[Check] " : ""}Academy interest: ${o.program}, ${o.name}`,
    preheader: `${o.name} registered interest in ${o.program}.`,
    kicker: "Academy interest",
    title: `${o.program}, ${o.name}`,
    blocks: [...callouts, { type: "rows", rows }],
    signoff: false,
    help: false,
    footnote: `Submitted on timewheel.co.in/academy. Reply to this email to reach ${o.name}.`,
  });
}

export function teamPayment(o: { name: string; email: string; phone: string | null; amount: number; purpose: string; paymentId: string | null; reference: string }): Rendered {
  return renderEmail({
    subject: `Paid ${inr(o.amount, true)}: ${o.purpose}`,
    preheader: `${o.name} paid ${inr(o.amount, true)} via Zoho Payments.`,
    hero: { tone: "success", icon: "check", title: `${inr(o.amount, true)} received`, subtitle: o.purpose },
    blocks: [
      {
        type: "rows",
        rows: [
          ["From", o.name],
          ["Email", o.email, `mailto:${o.email}`],
          ...(o.phone ? ([["Phone", o.phone, `tel:${o.phone.replace(/\s/g, "")}`]] as Row[]) : []),
          ["Zoho payment ID", o.paymentId ?? "-"],
          ["Reference", o.reference],
        ],
      },
    ],
    signoff: false,
    help: false,
    footnote: "Paid via Zoho Payments on timewheel.co.in.",
  });
}
