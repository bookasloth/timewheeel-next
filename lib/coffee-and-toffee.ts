// Content model for /coffee-and-toffee.
// Target query: "buy me a coffee alternative india" (commercial, "X alternative").
// Every product fact below is checked against the product code (hosted platform
// `platform` branch, licence store, single-creator repo). Competitor facts are
// from their public pricing pages, October 2026. No invented stats or quotes.

// Hosted platform (beta). The bare *.vercel.app host is the live beta until the
// platform gets its own domain; swap this one constant when it does.
const APP_URL = "https://coffee-and-toffee-khaki.vercel.app";
const SIGNUP_URL = `${APP_URL}/login`;

export const cf = {
  meta: {
    title: "Buy Me a Coffee Alternative for India | Coffee & Toffee",
    description:
      "Coffee & Toffee is a Buy Me a Coffee alternative for India: 0% platform fee on tips, UPI, cards and net banking, and payouts by Razorpay to your bank.",
    keywords: [
      "buy me a coffee alternative india",
      "ko-fi alternative india",
      "accept tips from fans india upi",
      "upi tip jar for creators",
      "zero fee donation page for creators",
      "creator membership upi autopay",
      "creator support website india",
    ],
  },
  appUrl: APP_URL,
  hero: {
    badge: "Now in beta",
    titleLine1: "Buy Me a Coffee alternative for India,",
    titleAccent: "with 0% fee on tips.",
    body:
      "Coffee & Toffee is a creator support page built for India. Fans tip you or become monthly members by UPI, card or net banking, in rupees, and Razorpay transfers the money to your own bank account. Tips carry no platform fee, there is no monthly fee, and your only cost is Razorpay's processing fee.",
    primaryLabel: "Create my free page",
    primaryHref: SIGNUP_URL,
    secondaryLabel: "Compare with BMC & Ko-fi",
    secondaryHref: "#compare",
    proof: "Free to start · 0% platform fee on tips · now in beta",
  },
  // Live demo widget copy (components/coffee-and-toffee/support-widget.tsx).
  widget: {
    name: "Coffee & Toffee",
    sub: "Buy me a coffee or a toffee.",
    items: [
      { id: "coffee", name: "Coffee", price: 20, unit: "cup" },
      { id: "toffee", name: "Toffee", price: 5, unit: "piece" },
    ],
    anonymousLabel: "Show me as anonymous.",
    namePlaceholder: "Name (optional)",
    emailPlaceholder: "Email (optional)",
    messagePlaceholder: "Say something nice…",
    noteMax: 250,
    defaults: { coffee: 1, toffee: 0 },
    cta: "Support with ₹{total}",
    sent: "Thanks, that's the moment supporters feel!",
    demoNote: "This is a demo. On a real page, checkout runs on Razorpay.",
  },
  // Facts, not vanity numbers. All static (no count-up).
  stats: [
    { value: "0%", label: "Platform fee on tips" },
    { value: "₹0", label: "Monthly fee" },
    { value: "UPI", label: "Plus cards and net banking" },
    { value: "2 days", label: "To your bank (7 in month one)" },
  ],
  problem: {
    number: "01",
    label: "WHY SWITCH",
    title: "Why Indian creators look for a Buy Me a Coffee alternative",
    body:
      "Global tip jars were built for card-paying supporters and dollar pricing. Indian fans pay by UPI, tips are often ₹20 to ₹100, and every percentage point taken off a small tip is felt.",
    items: [
      {
        name: "Your fans pay by UPI",
        desc: "A support page that leads with a card form loses the supporter who only wants to scan and pay. Coffee & Toffee checkout runs on Razorpay, so UPI is right there.",
      },
      {
        name: "Small tips, big cuts",
        desc: "A 5% platform fee on top of processing fees takes a real share of a ₹50 coffee. On Coffee & Toffee, tips carry no platform fee at all.",
      },
      {
        name: "Rupees in, rupees out",
        desc: "Supporters see prices in rupees and pay in rupees. Razorpay transfers each payment to your Indian bank account, with no currency conversion in between.",
      },
      {
        name: "Supporters, not transactions",
        desc: "Every tip can carry a note, shows up on your supporter wall and triggers an automatic thank-you post, so giving feels like a conversation.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "WHAT IT IS",
    title: "What is Coffee & Toffee?",
    body:
      "Coffee & Toffee is a creator support page for India where fans tip or become monthly members by UPI, and Razorpay transfers the money to the creator's own bank account, with no platform fee on tips.",
    items: [
      "A tip menu with two items you name and price",
      "Monthly memberships by UPI AutoPay or card",
      "Members-only posts, updates and comments",
      "A supporter wall with lifetime tiers",
      "Payouts to your bank through Razorpay Route",
      "Your supporter list, exportable to CSV",
    ],
  },
  features: {
    number: "03",
    label: "WHAT'S INSIDE",
    title: "What you get on a free Coffee & Toffee page",
    body:
      "Everything below is live on the hosted platform today, at no monthly cost. Your page sits at its own link, picked from your name.",
    items: [
      {
        name: "Tip menu",
        desc: "Two items, your names and your prices, from ₹1 to ₹10,000 each.",
        bullets: ["Notes from supporters", "Anonymous support", "Optional 'cover the fee'"],
      },
      {
        name: "Memberships",
        desc: "Recurring income from your most loyal fans.",
        bullets: ["₹10 to ₹5,000 a month", "UPI AutoPay or card", "Members cancel any time"],
      },
      {
        name: "Supporter wall",
        desc: "Public thanks that encourages the next supporter.",
        bullets: ["Pillars ₹2,500+", "Guardians ₹1,000+", "Torchbearers for everyone else"],
      },
      {
        name: "Updates & comments",
        desc: "Post for everyone or for members only.",
        bullets: ["Text, images, YouTube, Vimeo", "Auto thank-you post per payment", "Email-verified comments"],
      },
      {
        name: "Your supporter list",
        desc: "The people who back you stay yours.",
        bullets: ["CSV export any time", "Monthly earnings statement", "One email a day to opted-in fans"],
      },
      {
        name: "Share kit",
        desc: "Put your page everywhere your audience is.",
        bullets: ["Page link", "Printable QR code", "'Buy me a coffee' button for your site"],
      },
    ],
  },
  compare: {
    number: "04",
    label: "COMPARE",
    title: "Coffee & Toffee vs Buy Me a Coffee vs Ko-fi",
    body:
      "Buy Me a Coffee and Ko-fi are good global products. Coffee & Toffee is narrower on purpose: Indian creators, Indian supporters, rupees and Razorpay.",
    caption: "Fees and payments: Coffee & Toffee compared with Buy Me a Coffee and Ko-fi",
    columns: ["Coffee & Toffee", "Buy Me a Coffee", "Ko-fi"],
    rows: [
      { label: "Platform fee on one-off tips", values: ["0%", "5%", "0%"] },
      {
        label: "Platform fee on memberships",
        values: ["0% in beta; never more than 1%, capped at ₹25", "5%", "5% on the free plan, 0% on paid Ko-fi Gold"],
      },
      { label: "Monthly fee to use it", values: ["₹0", "None", "None on the free plan"] },
      {
        label: "Payment processor",
        values: ["Razorpay: UPI, cards, net banking", "Stripe", "PayPal or Stripe"],
      },
      {
        label: "Processing fee",
        values: ["Razorpay's fee (about 2% + GST); supporters can choose to cover it", "Processor fees on top", "Processor fees on top"],
      },
      { label: "Built for", values: ["Indian creators, paid in rupees", "Creators worldwide", "Creators worldwide"] },
    ],
    note:
      "Buy Me a Coffee and Ko-fi details come from their public pricing information, checked in October 2026. Fees change, so confirm on buymeacoffee.com and ko-fi.com before you decide.",
  },
  benefits: {
    number: "05",
    label: "PRICING",
    title: "How much does it cost to accept tips in India?",
    body:
      "Here is the full cost of a Coffee & Toffee page. Nothing is added at payout time.",
    items: [
      {
        name: "Tips: 0% platform fee",
        desc: "No platform fee on tips, ever. The full tip, minus Razorpay's processing fee, is transferred to your bank.",
      },
      {
        name: "Memberships: 0% in beta",
        desc: "No platform fee on memberships during the beta. If one is switched on, it is at most 1% of a payment, capped at ₹25, plus GST.",
      },
      {
        name: "Razorpay's fee",
        desc: "About 2% + GST per payment, paid by the creator. Supporters can tick 'cover the fee' at checkout to pay it for you.",
      },
      {
        name: "₹0 a month",
        desc: "No subscription, no setup fee, no card needed to start. You pay only when a supporter pays you.",
      },
    ],
  },
  process: {
    number: "06",
    label: "HOW IT WORKS",
    title: "How to accept support from fans in India",
    body: "Four steps from sign-up to your first tip.",
    steps: [
      {
        name: "Sign up with your email",
        stop: "01",
        desc: "Log in with a one-time code sent to your inbox. No password, no card.",
      },
      {
        name: "Create your page",
        stop: "02",
        desc: "Pick your page link, add a photo and bio, and name and price your two tip items.",
      },
      {
        name: "Set up payouts",
        stop: "03",
        desc: "Add your PAN, bank account and address. Razorpay verifies the account, usually within minutes.",
      },
      {
        name: "Share and get paid",
        stop: "04",
        desc: "Share your link, QR code or button. Each payment reaches your bank 2 days later (7 days in your first month).",
      },
    ],
  },
  capabilities: {
    number: "07",
    label: "BUILT FOR INDIA",
    title: "Built around Indian payments",
    body:
      "Coffee & Toffee is made by Timewheel, a product studio in Nagpur. These are the pieces that matter when your supporters are in India.",
    items: [
      { icon: "wallet", label: "Razorpay checkout: UPI, cards, net banking" },
      { icon: "repeat", label: "Memberships by UPI AutoPay or card" },
      { icon: "zap", label: "Payouts to your bank via Razorpay Route" },
      { icon: "receipt", label: "GST invoices for GST-registered creators" },
      { icon: "download", label: "CSV export of supporters and statements" },
      { icon: "upload", label: "Import supporters from BMC or Ko-fi" },
      { icon: "chart", label: "Page analytics without cookies" },
      { icon: "bell", label: "Optional WhatsApp receipts" },
      { icon: "eye", label: "Anonymous support for shy fans" },
    ],
  },
  licence: {
    number: "08",
    label: "YOUR OWN SITE",
    title: "Want your own support website instead?",
    body:
      "Some creators want a support site on their own domain, with supporters paying straight into their own Razorpay account. For them, Timewheel sells a single-creator Coffee & Toffee site licence.",
    includesTitle: "What the site licence gives you",
    includes: [
      "Your own support site on your own domain, for one creator",
      "Tips, monthly memberships, updates, comments and a supporter wall",
      "Payments go to your own Razorpay account; no platform in the middle and no platform fee",
      "Owner dashboard with payments, members, CSV exports and a share kit",
      "Premium: 12 months of updates and email support, then ₹999 a year",
      "Optional 'Install for me' set-up on your domain for ₹1,999",
    ],
    priceLabel: "Premium licence",
    price: "₹3,650",
    priceNote:
      "First year, including GST. Founding-creator price ₹2,499 for the first 100 seats, with renewals at ₹999 a year for life. A free edition (no updates, 'Made with Coffee and Toffee' footer) is also available.",
    ctaLabel: "Ask about a site licence",
    ctaHref: "/contact",
    fit: "Sales open soon. You need your own Razorpay account (KYC done) and a domain.",
  },
  faq: {
    number: "09",
    label: "FAQ",
    title: "Questions Indian creators ask",
    items: [
      {
        q: "Is there a Buy Me a Coffee alternative made for India?",
        a: "Yes. Coffee & Toffee is a creator support page built for India by Timewheel. Supporters pay in rupees by UPI, card or net banking through Razorpay, the money is transferred to the creator's Indian bank account, and tips carry no platform fee.",
      },
      {
        q: "How do I accept tips from fans in India by UPI?",
        a: "Create a free Coffee & Toffee page, set up payouts with your PAN and bank account, and share your page link or QR code. Fans tap a coffee or toffee, pay by UPI, card or net banking on Razorpay checkout, and can leave a note.",
      },
      {
        q: "Is Coffee & Toffee really free?",
        a: "Tips carry a 0% platform fee and there is no monthly fee. Memberships also carry no platform fee during the beta; if one is switched on, it is capped at 1% of a payment and ₹25, plus GST. Razorpay's processing fee (about 2% + GST) is the creator's only cost, and supporters can choose to cover it.",
      },
      {
        q: "When does the money reach my bank account?",
        a: "Each payment is transferred to your linked bank account through Razorpay Route and released 2 days after the payment. During your first 30 days on the platform the hold is 7 days.",
      },
      {
        q: "What do I need to set up payouts?",
        a: "An individual PAN, an Indian bank account with IFSC, a 10-digit Indian mobile number, an email address and your full address. Razorpay verifies the bank account, usually within a few minutes.",
      },
      {
        q: "Can I run monthly memberships?",
        a: "Yes. Set a monthly price between ₹10 and ₹5,000. Members pay by UPI AutoPay or card, unlock your members-only posts with their verified email, and can cancel any time.",
      },
      {
        q: "Can supporters outside India pay me?",
        a: "Not at the moment. Coffee & Toffee charges in Indian rupees only and does not accept international cards, because it is built for Indian creators and Indian supporters.",
      },
      {
        q: "How is Coffee & Toffee different from Ko-fi?",
        a: "Both charge no platform fee on one-off tips. Ko-fi charges 5% on memberships and shop sales on its free plan and runs on PayPal or Stripe. Coffee & Toffee runs on Razorpay with UPI, works in rupees, and charges no platform fee on memberships during the beta.",
      },
      {
        q: "Can I move my supporters from Buy Me a Coffee or Ko-fi?",
        a: "Yes. Upload the supporters CSV you export from Buy Me a Coffee or Ko-fi. Imported supporters only receive emails from you if you confirm they agreed to it, and an unsubscribe always wins.",
      },
      {
        q: "Can I have my own support website instead of a hosted page?",
        a: "Yes. Timewheel sells a single-creator Coffee & Toffee site licence for your own domain, with payments going to your own Razorpay account. Premium is ₹3,650 for the first year including GST (₹2,499 for the first 100 founding creators), then ₹999 a year. Sales open soon.",
      },
    ],
  },
  final: {
    number: "10",
    label: "YOUR MOVE",
    title: "Start your page.",
    titleAccent: "It's free.",
    body:
      "Sign up with your email, name your coffee and toffee, and connect your bank account through Razorpay. Coffee & Toffee is in beta, so tell us if anything feels off and a person will reply.",
    primaryLabel: "Create my free page",
    primaryHref: SIGNUP_URL,
    secondaryLabel: "Talk to a human",
    secondaryHref: "/contact",
    builtIn: "0% platform fee on tips · UPI, cards, net banking · paid to your bank",
  },
} as const;

type WidenStr<T> =
  T extends readonly (infer U)[]
    ? readonly WidenStr<U>[]
    : T extends string
      ? string
      : T extends number
        ? number
        : T extends boolean
          ? boolean
          : { [K in keyof T]: WidenStr<T[K]> };

export type CfData = WidenStr<typeof cf>;
