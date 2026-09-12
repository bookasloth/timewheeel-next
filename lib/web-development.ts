// Content for /web-development-company-in-india.
// Structure follows docs/landing-page-blueprint.md §6.3 (web-dev), adapted
// India-wide: web-dev buyers accept remote vendors, so national not hyperlocal.
// Numbers here are deliberately modest and true — no invented client metrics.

export const wd = {
  meta: {
    title: "Web Development Company in India | Fixed Price, 6 Weeks",
    description:
      "Web development company in India building fast, SEO-ready websites and web apps on Next.js, WordPress and Shopify. Fixed scope, fixed price, launched in about six weeks — and you own the code.",
  },

  hero: {
    eyebrow: "Web Development Company in India",
    h1a: "Web Development Company in India —",
    h1b: "Fixed Scope, Fixed Price, Launched in 6 Weeks",
    sub: "Fast, SEO-ready websites and web apps built on Next.js, WordPress and Shopify. You get the code, the timeline in writing, and a site that loads in under two seconds.",
    primaryCta: { label: "Get a Fixed Quote in 24 Hours", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
    trustLine: "10+ products shipped · Code ownership always yours · Avg. launch in 6 weeks",
  },

  // Keyword-specific stat bar.
  stats: [
    { v: "10+", label: "Products shipped" },
    { v: "~6 wks", label: "Average time to launch" },
    { v: "100%", label: "Code & data you own" },
    { v: "<2s", label: "Target load time" },
  ],

  // Build-quality proof. Framed as the standard we build to, not client claims.
  standards: {
    title: "Built to a measurable standard, not a vibe",
    body: "Every site we ship is held to the same technical bar before launch. These are the scores we build to — verifiable in Lighthouse and PageSpeed Insights on the day we hand it over.",
    cards: [
      { score: "95+", label: "Lighthouse Performance", note: "Core Web Vitals in the green on mobile" },
      { score: "100", label: "Accessibility & SEO", note: "Semantic markup, metadata, schema" },
      { score: "<2s", label: "Largest Contentful Paint", note: "On a mid-range phone, real network" },
      { score: "SSR", label: "Server-rendered by default", note: "Crawlable by Google and AI engines" },
    ],
  },

  // Portfolio order (slugs into lib/products.ts). Real products we've built.
  portfolio: {
    title: "Recent work",
    body: "A sample of products we've designed, built and shipped. Book A Sloth is live today; the rest are in active rollout.",
    // Each references a product slug + optional live URL + one-line result.
    items: [
      { slug: "book-a-sloth", live: "https://bookasloth.com", result: "Booking platform — full product build, live in production." },
      { slug: "alluminaty", result: "Alumni engagement platform — directories, events, giving." },
      { slug: "ticket-dino", result: "Event ticketing at scale — sales, check-in, analytics." },
      { slug: "coffee-for-me", result: "Creator monetization — tipping and audience support." },
      { slug: "the-parliament", result: "Community & membership platform." },
      { slug: "link-lantern", result: "Link-in-bio and profile pages." },
    ],
  },

  services: [
    { name: "Business Websites", desc: "Marketing sites and landing pages that load fast, rank, and turn visitors into enquiries." },
    { name: "E-commerce", desc: "Shopify and custom storefronts built for conversion, speed and easy catalogue management." },
    { name: "Web Applications", desc: "Dashboards, portals and SaaS products on Next.js and Node — from MVP to scale." },
    { name: "WordPress & Shopify", desc: "Themes, plugins and stores your team can actually edit without calling a developer." },
    { name: "Redesign & Rebuild", desc: "Modern, faster rebuilds of dated or slow sites — without losing your SEO." },
    { name: "Maintenance & Support", desc: "Ongoing updates, security, backups and changes on a predictable monthly plan." },
  ],

  techStack: [
    { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { group: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "REST / API"] },
    { group: "CMS & Commerce", items: ["WordPress", "Shopify", "Headless CMS"] },
    { group: "Infra & Quality", items: ["Vercel", "Cloudflare", "Lighthouse CI", "Analytics"] },
  ],

  // Three open pricing bands — the biggest gap in this SERP.
  pricing: {
    title: "What a website costs in India",
    body: "Honest bands, not a mystery quote. Final price depends on scope — but you'll never be surprised. Exact figures confirmed in your 24-hour quote.",
    note: "Prices exclude GST and third-party costs (domain, hosting, paid plugins). One-off build; maintenance is optional and separate.",
    tiers: [
      {
        name: "Starter",
        price: "₹25,000 – ₹60,000",
        blurb: "A fast, professional presence for a new or small business.",
        timeline: "2–3 weeks",
        features: [
          "Up to 5 pages",
          "Mobile-first responsive design",
          "Contact form + WhatsApp",
          "On-page SEO + schema",
          "Analytics + basic training",
        ],
        cta: "Get a Starter quote",
      },
      {
        name: "Business",
        price: "₹75,000 – ₹2,00,000",
        blurb: "A conversion-focused site or store for a growing company.",
        timeline: "4–6 weeks",
        features: [
          "Up to 15 pages or a Shopify store",
          "Custom design system",
          "Blog / CMS you can edit",
          "E-commerce or booking flows",
          "Performance tuning to 95+ Lighthouse",
          "30 days post-launch support",
        ],
        cta: "Get a Business quote",
        highlight: true,
      },
      {
        name: "Custom / Web App",
        price: "From ₹2,50,000",
        blurb: "A bespoke web application or platform, built to scale.",
        timeline: "8+ weeks",
        features: [
          "Custom app architecture",
          "User accounts, dashboards, payments",
          "Third-party & API integrations",
          "Staging + CI/CD pipeline",
          "Scoped in a discovery sprint",
        ],
        cta: "Book a discovery call",
      },
    ],
  },

  process: {
    title: "From kickoff to launch in 4–6 weeks",
    body: "A clear, six-step path with a fixed timeline in writing — so you're never left wondering where your project is.",
    steps: [
      { title: "Discovery", desc: "We map goals, scope, pages and success metrics. You get a fixed quote and timeline." },
      { title: "Wireframe", desc: "Low-fi structure and content plan, approved before any design work begins." },
      { title: "Design", desc: "A custom design system and page designs you sign off on, screen by screen." },
      { title: "Build", desc: "We develop on a live staging URL you can watch update in real time." },
      { title: "QA", desc: "Cross-device, speed, accessibility and SEO checks against our launch standard." },
      { title: "Launch & Handover", desc: "We go live and hand over full ownership — code, domain, hosting, analytics." },
    ],
  },

  ownership: {
    title: "You own everything. Always.",
    body: "The single biggest fear for Indian businesses hiring a web developer is being locked in or left stranded. We remove it in writing.",
    points: [
      "Full source code, handed over on launch",
      "Your domain and hosting, in your own accounts",
      "Your analytics, search console and data",
      "No lock-in — move to any developer, any time",
      "Written scope, timeline and revision count up front",
    ],
    amc: {
      title: "After launch",
      body: "Optional maintenance keeps your site fast, secure and current — updates, backups, security patches and small changes on a predictable monthly plan. Cancel anytime.",
    },
  },

  industries: [
    "Manufacturing", "Healthcare", "Education", "Retail & D2C",
    "Real Estate", "Hospitality", "Professional Services", "Startups & SaaS",
  ],

  faq: [
    {
      q: "How much does a website cost in India?",
      a: "A professional small-business website typically ranges from ₹25,000 to ₹60,000, a larger business site or Shopify store from ₹75,000 to ₹2,00,000, and a custom web application from ₹2,50,000 upward. Your exact price is fixed in a 24-hour quote before any work starts.",
    },
    {
      q: "How long does it take to build a website?",
      a: "Most business websites launch in about 4 to 6 weeks. A simple starter site can go live in 2 to 3 weeks, while a custom web application usually takes 8 weeks or more. You get the timeline in writing at kickoff.",
    },
    {
      q: "Do I own the code, domain and hosting?",
      a: "Yes — completely. On launch we hand over full source code and set up the domain, hosting and analytics in your own accounts. There is no lock-in; you can move to any other developer at any time.",
    },
    {
      q: "WordPress or a custom-built website — which is right for me?",
      a: "WordPress or Shopify suits teams who want to edit content themselves and need a proven, lower-cost path. A custom Next.js build suits businesses that need top speed, unique features or a web app. We recommend the right one for your goals in the discovery call, not the one that bills the most.",
    },
    {
      q: "Is SEO included in the website?",
      a: "On-page SEO — clean semantic markup, metadata, structured data (schema), fast load times and a crawlable server-rendered build — is included in every project. Ongoing SEO campaigns and content are a separate service.",
    },
    {
      q: "Will my website work on mobile and load fast?",
      a: "Every site is mobile-first and built to a measurable standard: 95+ Lighthouse performance and a largest-contentful-paint under two seconds on a mid-range phone. We verify it in PageSpeed Insights before handover.",
    },
    {
      q: "How many revisions do I get?",
      a: "Revision rounds are agreed in your written scope up front — typically two rounds at the design stage and one at build — so expectations are clear on both sides from day one.",
    },
    {
      q: "What happens after the site launches?",
      a: "You own it outright and can run it yourself. If you'd like us to keep it updated, maintenance plans cover updates, security, backups and small changes on a predictable monthly fee — optional and cancellable anytime.",
    },
    {
      q: "Do you work with businesses outside your city?",
      a: "Yes. We're based in India and work with clients across the country and abroad. Web projects run smoothly remotely over calls, a shared staging link and clear written milestones.",
    },
    {
      q: "Can you redesign or speed up my existing website?",
      a: "Yes. We rebuild dated or slow sites on a modern stack while preserving your existing URLs and SEO, so you get a faster, better site without losing the rankings you already have.",
    },
  ],

  serviceOptions: [
    "Business Website",
    "E-commerce / Shopify",
    "Web Application",
    "WordPress",
    "Redesign / Rebuild",
    "Maintenance & Support",
    "Not sure yet",
  ],
};
