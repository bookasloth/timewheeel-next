export const creatorUi = {
  meta: {
    title: "Coffee & Toffee — A digital home for creators",
    description:
      "A warm, self-hostable, creator-first support platform. Profiles, updates, supporter walls, and instant payouts — designed to feel human, not transactional.",
  },
  hero: {
    eyebrow: "A digital home for creators & supporters",
    titleTop: "Supporting someone you admire,",
    titleEm: "not completing a transaction.",
    body: "Coffee & Toffee is a warm, self-hostable home for the people who back your work. Coffees, toffees, memberships, updates, and a supporter wall — one page, one community, 100% yours.",
    primary: "Create your page",
    primaryHref: "#start",
    secondary: "See the concept",
    secondaryHref: "#showcase",
    proof: "Free to start · 3% only when you earn · self-hostable",
    stats: [
      { value: 20, suffix: "k", label: "creators earning" },
      { value: 12, prefix: "₹", suffix: "L", label: "raised for creators" },
      { value: 80, suffix: "k", label: "supporters giving" },
      { value: 0, static: "Instant", label: "payouts, every time" },
    ],
  },
  demo: {
    name: "Aarohi",
    handle: "@aarohi",
    byline: "Painter · writes about slow living",
    supporters: "1,284",
    goalNow: 2140,
    goalMax: 3000,
    tiers: [
      { id: "coffee", name: "Coffee", price: 5, emoji: "☕" },
      { id: "toffee", name: "Toffee", price: 10, emoji: "🍬" },
      { id: "patron", name: "Patron", price: 199, emoji: "✦" },
    ],
    messagePlaceholder: "a note for Aarohi (optional)",
    noteMax: 250,
    send: "Send ₹{total} with love",
    sent: "Thank you — Aarohi is smiling right now.",
  },
  ticker: [
    "Writers",
    "Artists",
    "Musicians",
    "Developers",
    "Educators",
    "Photographers",
    "Designers",
    "Podcasters",
  ],
  screens: {
    eyebrow: "The screens",
    title: "Three screens, one feeling.",
    body: "A profile that feels like a gift, updates that feel like a diary, and a wall that makes supporters feel truly seen.",
    items: [
      {
        label: "Creator profile",
        title: "A page fans actually want to open",
        points: [
          "Bio, tiers & badges in one place",
          "Notes up to 250 characters",
          "Support that feels like a gift",
        ],
        mark: "☕",
      },
      {
        label: "Updates feed",
        title: "Supporters follow the journey",
        points: [
          "Image, text, audio & polls",
          "Milestones & public thank-yous",
          "Members-only posts & replies",
        ],
        mark: "✉",
      },
      {
        label: "Supporter wall",
        title: "Recognition that keeps giving",
        points: [
          "Tiers, top & recent supporters",
          "A public wall of notes",
          "Badges & achievements",
        ],
        mark: "♥",
      },
    ],
  },
  feed: {
    eyebrow: "Updates feed",
    title: "Part of the journey",
    body: "New work, polls, milestones, and thank-yous — supporters watch your story unfold, not just your tills.",
    points: [
      "Image, text & audio updates",
      "Polls your community actually votes in",
      "Milestone & thank-you posts",
    ],
    posts: [
      {
        kind: "image",
        label: "In progress",
        time: "2d ago",
        title: "New painting — evening chai",
        body: "First pass done. The light through the window took the whole afternoon.",
        art: ["#f2d8a9", "#df7248"],
      },
      {
        kind: "poll",
        label: "Let's decide",
        time: "5d ago",
        title: "What should the next print be?",
        options: [
          { label: "Chai stalls at dawn", votes: 214 },
          { label: "Neighborhood cats", votes: 158 },
          { label: "Grandmother gardens", votes: 121 },
        ],
      },
      {
        kind: "thanks",
        label: "Thank you",
        time: "1w ago",
        title: "214 coffees this month",
        body: "I keep the notes in a box and reread them on slow days. Thank you for being the reason I keep painting.",
        names: ["Meera", "Dev", "Anita", "+9"],
      },
    ],
  },
  wall: {
    eyebrow: "Supporters",
    title: "Visible, noticed, appreciated.",
    body: "Supporters aren't rows in a database. Tiers, top supporters, a public wall, and badges that make giving feel like belonging.",
    top: [
      { name: "Meera S.", amount: "₹499", tier: "Patron", initials: "MS" },
      { name: "Dev K.", amount: "₹310", tier: "Toffee", initials: "DK" },
      { name: "Anita R.", amount: "₹265", tier: "Toffee", initials: "AR" },
    ],
    items: [
      { name: "Rohit", tier: "Coffee", note: "Your landscape is hanging above my desk now.", initials: "Ro" },
      { name: "Tara", tier: "Patron", note: "Membership renewed before I even finished my tea.", initials: "Ta" },
      { name: "Kiran", tier: "Toffee", note: "Bought this for the note, stayed for the cats.", initials: "Ki" },
      { name: "Anju", tier: "Coffee", note: "Sent this on a bad day. Made mine better.", initials: "An" },
      { name: "Farah", tier: "Toffee", note: "Your chai series is my phone wallpaper.", initials: "Fa" },
      { name: "Leo", tier: "Coffee", note: "Keep going. The world needs your quiet work.", initials: "Le" },
      { name: "Mira", tier: "Patron", note: "Gifting a print to my mum — she cried.", initials: "Mi" },
      { name: "Sam", tier: "Toffee", note: "First ever coffee I've bought someone. 10/10.", initials: "Sa" },
      { name: "Noor", tier: "Coffee", note: "Seen your process from day one. So proud.", initials: "No" },
    ],
    badges: ["Day-one supporter", "Top supporter", "30-day streak", "Founding friend"],
  },
  admin: {
    eyebrow: "The admin, yours",
    title: "Self-hostable. Lightweight. Yours.",
    body: "Operate everything yourself. Runs on your own server, exports your list, pays out instantly, and never rents your audience back to you.",
    bullets: [
      "Own your supporter list — CSV export any time",
      "Instant payouts, straight to your bank",
      "3% per contribution, zero monthly fees",
      "White-label domain & your own theme",
    ],
    metrics: [
      { label: "This month", value: "₹12,480", delta: "+18%" },
      { label: "Supporters", value: "1,284" },
      { label: "Active members", value: "62" },
    ],
    recent: [
      { text: "Meera sent a Coffee", mark: "☕" },
      { text: "Dev joined Patron", mark: "✦" },
      { text: "Anita sent a Toffee", mark: "🍬" },
      { text: "Rohit left a note: “keep painting”", mark: "♥" },
    ],
  },
  values: {
    quote:
      "This is not a payment tool. It is a digital home for creators and the people who believe in them.",
    byline: "— the Coffee & Toffee idea",
  },
  process: {
    eyebrow: "How it works",
    title: "From follower to family",
    body: "Four steps between a creator and an audience that pays them back for the work they already do.",
    steps: [
      {
        name: "Make it yours",
        stop: "01",
        desc: "Your profile, your prices, your story. Self-hosted on your own domain if you like.",
      },
      {
        name: "Share one link",
        stop: "02",
        desc: "Bio, videos, newsletter — one warm page fans actually want to open.",
      },
      {
        name: "Support flows in",
        stop: "03",
        desc: "Coffees, toffees, memberships, notes — every contribution lands live.",
      },
      {
        name: "Own everything",
        stop: "04",
        desc: "Instant payouts, your supporter list, your community. No lock-in, ever.",
      },
    ],
  },
  quotes: {
    eyebrow: "Voices",
    title: "Made for real creators",
    body: "Writers, painters, coders, and educators — earning a little steadier, staying a lot closer.",
    items: [
      {
        quote:
          "My page feels like an extension of my diary, not a checkout. The notes make supporters part of the process.",
        name: "Reva M.",
        role: "Illustrator",
        initials: "RM",
      },
      {
        quote:
          "Self-hosted on a ₹400 server. My list, my emails, my community — nobody holds them hostage.",
        name: "Kabir S.",
        role: "Indie developer",
        initials: "KS",
      },
      {
        quote:
          "The wall made me feel like I'd joined something. Supporters post back, and it never feels transactional.",
        name: "Aisha N.",
        role: "Newsletter writer",
        initials: "AN",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered warmly",
    items: [
      {
        q: "Is it really self-hostable?",
        a: "Yes. Coffee & Toffee can run on your own server from day one — your domain, your data, your rules. If you'd rather not manage infrastructure, a hosted option is there too, but the controls always stay yours.",
      },
      {
        q: "What does it cost?",
        a: "Nothing to start, nothing monthly. Timewheel takes 3% only when a supporter contributes, and supporters can choose to cover it so you keep the full amount.",
      },
      {
        q: "Do I own my supporter list?",
        a: "Completely. Names, notes, and emails export to CSV any time. The platform never emails your supporters and never sells your data — the relationship is yours, even if you leave.",
      },
      {
        q: "How fast do payouts land?",
        a: "Instant, through Razorpay, straight to your linked bank account. No 30-day holds, no payout floors, no mystery floats.",
      },
      {
        q: "Can I run memberships and a shop too?",
        a: "The same page powers one-off coffees and toffees, monthly memberships, and a shop for ebooks, calls, commissions, or physical goods — beneath one supporter list you own.",
      },
      {
        q: "What does the supporter experience feel like?",
        a: "One tap, a warm page, and a note you can leave. It is designed to feel like buying someone you admire a coffee — not completing a transaction.",
      },
    ],
  },
  final: {
    eyebrow: "Your move",
    title: "Your audience is ready",
    titleEm: "to support you.",
    body: "Create your page in under a minute. Zero monthly cost, self-hosted when you want it, and a payment rail your fans actually enjoy using.",
    primary: "Create your page",
    primaryHref: "#start",
    secondary: "Talk to a human",
    secondaryHref: "/contact",
    builtIn: "Profiles · Updates · Supporter wall · Admin · Instant payouts · Self-hosted",
  },
} as const;

export type CreatorUi = typeof creatorUi;