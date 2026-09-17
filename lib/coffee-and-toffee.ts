export const cf = {
  meta: {
    title: "Coffee & Toffee — Fund Your Creative Work",
    description:
      "A creator monetization platform that turns casual fans into warm supporters. Accept coffees, toffees, memberships, and shop sales from one friendly page — with instant payouts and 100% ownership of your supporter list.",
  },
  hero: {
    badge: "Loved by creators on Timewheel",
    titleLine1: "Turn casual fans",
    titleAccent: "into warm supporters.",
    body:
      "One friendly page for coffees, toffees, memberships, and shop sales. Supporters tap, leave a note, and you get paid instantly — no platform rents your audience.",
    primaryLabel: "Start my page",
    primaryHref: "#start",
    secondaryLabel: "How it works",
    secondaryHref: "#how",
    proof: "Free to start · 3% on contributions",
  },
  widget: {
    name: "Coffee & Toffee",
    sub: "Buy me a coffee or a toffee.",
    items: [
      { id: "coffee", name: "Coffee", price: 5, unit: "cup" },
      { id: "toffee", name: "Toffee", price: 10, unit: "piece" },
    ],
    feeRate: 0.03,
    feeLabel: "Cover the 3% fee so I get the full amount.",
    feeNote: "to cover gateway fees",
    anonymousLabel: "Show me as anonymous.",
    namePlaceholder: "Name (optional)",
    emailPlaceholder: "Email (optional)",
    messagePlaceholder: "Say something nice…",
    noteMax: 250,
    defaults: { coffee: 1, toffee: 0 },
    cta: "Support with ₹{total}",
    sent: "Thanks — that's the moment supporters feel!",
    demoNote:
      "This is a live demo — the checkout connects to Razorpay in the real product.",
  },
  stats: [
    { value: 20000, suffix: "+", label: "Creators earning" },
    { value: 12, prefix: "₹", suffix: "L+", label: "Raised for creators" },
    { value: 80000, suffix: "+", label: "Supporters giving" },
    { value: 0, static: "Instant", label: "Payout — no 30-day holds" },
  ],
  problem: {
    number: "01",
    label: "THE CHALLENGE",
    title: "Scattered links, rented audiences, slow money",
    body:
      "Creators don't have a monetization problem — they have a collection of disconnected payment links, payroll-dollars platforms, and zero ownership.",
    items: [
      {
        name: "One-off links, zero relationship",
        desc: "A tip link buried in your bio turns giving into a transaction. Fans forget it exists, and you never hear from them again.",
      },
      {
        name: "Platforms rent your audience",
        desc: "You build the following — the platform keeps the list, the data, and the connection. Leave, and every relationship stays behind.",
      },
      {
        name: "Slow, withheld payouts",
        desc: "Thirty-day holds and payout floors mean your work funds someone else's float before you ever see a rupee.",
      },
      {
        name: "Built for businesses, not creators",
        desc: "Dashboards tuned for ecommerce treat supporters like customers. No notes, no warmth, no community — just transactions.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "Support that feels human",
    body:
      "Coffee & Toffee brings giving, membership, and sales onto one page your fans actually enjoy using — while you keep every relationship.",
    items: [
      "Coffee & Toffee — one friendly tap to say thanks",
      "Memberships — a recurring income from your biggest fans",
      "Shop — ebooks, calls, and commissions, made for creators",
      "Posts, audio & email — publish free or members-only",
      "Instant payouts — straight to your bank account",
      "100% ownership — export your supporter list any time",
    ],
  },
  features: {
    number: "03",
    label: "WHAT'S INSIDE",
    title: "Everything a creator needs to earn",
    body:
      "One page, one payment rail, one supporter list. The six pieces that turn a following into income — without a single SaaS subscription.",
    items: [
      {
        name: "Support widget",
        desc: "Giving that feels like a gift, not a checkout.",
        bullets: ["Coffee ₹5 & Toffee ₹10", "Notes up to 250 characters", "Anonymous support"],
      },
      {
        name: "Memberships",
        desc: "Recurring income from your most loyal fans.",
        bullets: ["Monthly or yearly", "Members-only posts", "Email alerts on new content"],
      },
      {
        name: "Creator shop",
        desc: "Sell what creators sell — ebooks, calls, art.",
        bullets: ["One-tap checkout", "Digital and physical", "Ratings on your products"],
      },
      {
        name: "Posts, audio & email",
        desc: "Publish free or exclusive, reach everyone.",
        bullets: ["Audio and text posts", "Members-only gating", "No marketing tool needed"],
      },
      {
        name: "Supporter wall",
        desc: "Social proof that keeps contributions coming.",
        bullets: ["Names and notes in real time", "Coffee & toffee icons", "Replies to supporters"],
      },
  
    ],
  },
  benefits: {
    number: "04",
    label: "WHY CREATORS STAY",
    title: "Designed for creators, not for businesses",
    body:
      "We don't call them customers or transactions. They are your supporters — and the product is built around that.",
    items: [
      {
        name: "Supporters, not customers",
        desc: "Every contribution carries a note and a name. The warmest conversion rate on the internet is a thank-you.",
      },
      {
        name: "You own your list",
        desc: "We never email your supporters. Export the list to CSV any time — the relationship is yours, full stop.",
      },
      {
        name: "A human answers",
        desc: "Get help from a person who cheers for you — not a ticket bot. Advice included on hitting the ground running.",
      },
      {
        name: "Paid instantly",
        desc: "Contributions land straight in your bank. No 30-day delay, no payout floor, no float.",
      },
    ],
  },
  process: {
    number: "05",
    label: "HOW IT WORKS",
    title: "From coffee money to steady income",
    body:
      "Four steps between a creator and an audience that pays them back for the work they already do.",
    steps: [
      {
        name: "Create your page",
        stop: "01",
        desc: "Pick your coffee and toffee prices, add your story — it's free and takes under a minute.",
      },
      {
        name: "Share your link",
        stop: "02",
        desc: "Drop it in your bio, video descriptions, and newsletter. It looks like a page fans want to open.",
      },
      {
        name: "Support flows in",
        stop: "03",
        desc: "Fans tap coffee or toffee, leave a note, or join a membership. You see it in real time.",
      },
      {
        name: "Get paid & stay close",
        stop: "04",
        desc: "Money hits your bank instantly while you publish updates back to the people who back you.",
      },
    ],
  },
  capabilities: {
    number: "06",
    label: "BUILT BY TIMEWHEEL",
    title: "The full stack, already done",
    body:
      "Payments, memberships, content, and payouts — engineered once by Timewheel so you never stitch five tools together.",
    items: [
      { icon: "wallet", label: "Razorpay — UPI, cards, net-banking" },
      { icon: "repeat", label: "Memberships & recurring billing" },
      { icon: "bag", label: "Creator shop with one-tap checkout" },
      { icon: "mail", label: "Posts, audio & free emails" },
      { icon: "download", label: "Supporter list with CSV export" },
      { icon: "zap", label: "Instant payouts to your bank" },
      { icon: "percent", label: "3% per contribution, zero monthly" },
      { icon: "eye", label: "Anonymous support & privacy" },
      { icon: "bell", label: "Email alerts for every sale" },
    ],
  },
  testimonials: {
    number: "07",
    label: "FROM THE COMMUNITY",
    title: "Creators who stopped depending on luck",
    body:
      "Writers, artists, educators, and indie builders — posting less, earning more, and staying close to the people who matter.",
    items: [
      {
        quote:
          "I replaced three platforms with one page. Followers who never clicked a Patreon link now buy me coffees every week.",
        name: "Ananya R.",
        role: "Newsletter writer",
        initials: "AR",
      },
      {
        quote:
          "The tip link paid my server bill on day one. Then a supporter joined a membership — and it's been quiet, steady income since.",
        name: "Dev K.",
        role: "Indie developer",
        initials: "DK",
      },
      {
        quote:
          "Supporting creators finally feels like buying them a coffee. The notes make it human — I actually get a reply.",
        name: "Meera S.",
        role: "Supporter & superfan",
        initials: "MS",
      },
    ],
  },
  faq: {
    number: "08",
    label: "FAQ",
    title: "Questions creators ask",
    items: [
      {
        q: "Is the page free to start?",
        a: "Yes — 100%. Create your page free and start receiving support immediately. There's no setup fee and no monthly cost; Timewheel only takes 3% on each contribution, which supporters can choose to cover so you get the full amount.",
      },
      {
        q: "How do creators get paid?",
        a: "Payouts go straight to your linked bank account through Razorpay. Supporters can pay with UPI, cards, or net-banking, and creators get paid instantly — no 30-day holds or payout minimums.",
      },
      {
        q: "What's the difference between a Coffee and a Toffee?",
        a: "A Coffee is the classic ₹5 contribution — a quick way to say thanks. A Toffee is a ₹10 contribution, usually for a stronger thank-you or a shout-out. Both take one tap, let fans leave a note, and land on your supporter wall.",
      },
      {
        q: "Can I run memberships and a shop too?",
        a: "Absolutely. The same page powers one-off coffees and toffees, monthly memberships, and a shop for ebooks, calls, commissions, or physical goods — all under one supporter list you own.",
      },
      {
        q: "Do I own my supporter list?",
        a: "Yes. Names, notes, and emails export to CSV any time. Timewheel never emails your supporters and never sells your data — the relationship is yours, even if you leave.",
      },
      {
        q: "What payment methods do supporters use?",
        a: "UPI, credit and debit cards, and net-banking — processed by Razorpay in the supporter's own currency, so contributing feels effortless whether they're across the street or across the world.",
      },
    ],
  },
  final: {
    number: "09",
    label: "YOUR MOVE",
    title: "Start your page.",
    titleAccent: "It's free.",
    body:
      "Sixty seconds to set up, zero monthly cost, and a payment rail your fans actually want to use. Your audience is ready to support — make it easy for them.",
    primaryLabel: "Start my page",
    primaryHref: "#start",
    secondaryLabel: "Talk to a human",
    secondaryHref: "#contact",
    builtIn: "Payments, memberships, shop, posts · instant payouts · 3% only when you earn",
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