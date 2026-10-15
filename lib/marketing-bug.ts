// Marketing Bug product page content.
// The Masco template was used only as a structural reference; every string
// below is original copy for Marketing Bug. No customer counts, ratings or
// testimonials with named individuals, so none of it goes into structured data
// (see app/products/marketing-bug/page.tsx).

export const mb = {
  path: "/products/marketing-bug",
  meta: {
    title: "Marketing Bug: SEO & Growth Marketing Software",
    description:
      "Marketing Bug is Timewheel's SEO and growth marketing platform. Map the keywords that matter, fix what blocks search engines, and turn organic demand into qualified leads and revenue.",
  },
  hero: {
    eyebrow: "Marketing Bug, by Timewheel",
    title: "Grow the search traffic that",
    titleAccent: "actually converts.",
    // Answer-first block (the passage AI answers lift). Keep it under 60 words.
    answer:
      "Marketing Bug is Timewheel's SEO and growth marketing platform. It finds the queries your buyers already type, fixes what holds your pages back, and tracks every ranking, so the organic demand you earn turns into pipeline instead of just visits.",
    primaryLabel: "Sign up free",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to our team",
    secondaryHref: "/contact",
    formLabel: "Work email",
    formCta: "Subscribe",
    trust: [
      "No lock-in contracts",
      "Keyword-to-revenue reporting",
      "Set up with our team",
    ],
    image: {
      src: "/hero/seo.png",
      alt: "Marketing Bug search performance dashboard",
      width: 1536,
      height: 1024,
    },
  },
  valueProps: {
    label: "WHY IT WORKS",
    title: "Where search effort turns into revenue",
    items: [
      {
        icon: "awareness",
        name: "Grows your share of voice",
        desc: "Own the searches your buyers make before they ever hear your name, and show up as the obvious answer in your category.",
      },
      {
        icon: "ppc",
        name: "Makes paid search go further",
        desc: "Organic and paid feed each other. The keyword data behind your SEO plan sharpens every ad you run and lowers cost per lead.",
      },
      {
        icon: "trust",
        name: "Earns trust before the first call",
        desc: "Pages that answer real questions and rank for real terms are proof you know the problem, and that shortens the sales cycle.",
      },
    ],
  },
  about: {
    label: "THE PLATFORM",
    title: "SEO that compounds instead of resetting each quarter",
    titleAccent: "compounds",
    body: [
      "Search is the one channel that keeps paying after the campaign ends. Every page you improve and every query you win stays won, so results stack up instead of starting from zero each month.",
      "Marketing Bug keeps the whole plan in one place, from the keyword map to the technical fixes to the report your team actually reads, so nothing gets lost between tools.",
    ],
    points: [
      "Keyword maps tied to revenue, not vanity terms",
      "Technical fixes that unblock crawling and speed",
      "One report for rankings, traffic and conversions",
    ],
    image: {
      src: "/digital-marketing-hero1.png",
      alt: "Search performance dashboard showing organic growth",
      width: 1671,
      height: 941,
    },
  },
  services: {
    label: "WHAT WE DO",
    title: "Every part of SEO, handled in one place",
    ctaLabel: "Learn more",
    ctaHref: "/seo-company-in-nagpur",
    items: [
      {
        icon: "keyword",
        name: "Keyword strategy",
        desc: "We start from the queries your buyers actually use, then map intent, difficulty and revenue potential, so you always know what to write next.",
      },
      {
        icon: "content",
        name: "Content optimization",
        desc: "Every page gets the structure search engines reward: clear headings, matching intent and internal links that pass authority to the pages that sell.",
      },
      {
        icon: "technical",
        name: "Technical SEO",
        desc: "Crawlability, indexation, speed and Core Web Vitals, audited and fixed so the content you publish can actually be found.",
      },
      {
        icon: "links",
        name: "Link building & audits",
        desc: "We earn relevant links and run full audits that surface the ranking gaps holding your best pages back, then close them.",
      },
      {
        icon: "migration",
        name: "Website migrations",
        desc: "Domain, design or platform moves are the fastest way to lose traffic. We map redirects and validate every step to protect what you have.",
      },
      {
        icon: "ecommerce",
        name: "E-commerce SEO",
        desc: "Category, product and filter pages tuned for the way shoppers search, so more of the right visits reach your checkout.",
      },
    ],
  },
  momentum: {
    label: "COMPOUNDING GROWTH",
    title: "SEO gets stronger the longer you keep at it",
    body: [
      "Most channels stop the moment you stop paying. Search keeps working. Pages that rank stay ranked, and each improvement builds on the last, so the curve bends upwards over time.",
      "Marketing Bug makes that long game visible: which pages are climbing, which keywords are close, and where your next win is.",
    ],
    ctaLabel: "See how it works",
    ctaHref: "/contact",
    image: {
      src: "/digital-marketing-hero.png",
      alt: "Compounding organic traffic growth over time",
      width: 1672,
      height: 941,
    },
  },
  process: {
    label: "HOW WE WORK",
    title: "A simple process that keeps rankings moving",
    steps: [
      {
        icon: "audit",
        tag: "Week 1",
        name: "Audit and keyword map",
        desc: "We crawl your site, find what is blocking search, and map the queries worth winning, ranked by intent and opportunity.",
      },
      {
        icon: "fix",
        tag: "Weeks 2-4",
        name: "Fix and publish",
        desc: "Technical issues get fixed, and pages get written and optimised around the terms that matter, on a schedule you can follow.",
      },
      {
        icon: "track",
        tag: "Every month",
        name: "Track and compound",
        desc: "Rankings, traffic and conversions land in one dashboard, so each month builds on the last instead of starting over.",
      },
    ],
  },
  integrations: {
    label: "INTEGRATIONS",
    title: "Plugs into the tools you already run",
    body: "Marketing Bug sits on top of your stack. Pull data from search and analytics, sync the pages you publish, and push what matters into the tools your team already uses.",
    items: [
      { icon: "search", name: "Google Search Console", hint: "Rankings and queries" },
      { icon: "analytics", name: "Google Analytics 4", hint: "Traffic and conversions" },
      { icon: "cms", name: "WordPress", hint: "Publish and optimise" },
      { icon: "shop", name: "Shopify", hint: "Product and category SEO" },
      { icon: "sheet", name: "Google Sheets", hint: "Keyword maps and exports" },
      { icon: "headless", name: "Headless CMS", hint: "Contentful, Sanity, Payload" },
      { icon: "speed", name: "PageSpeed Insights", hint: "Core Web Vitals" },
      { icon: "api", name: "Webhooks & API", hint: "Send data anywhere" },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Marketing Bug, answered",
    items: [
      {
        q: "What is Marketing Bug?",
        a: "Marketing Bug is Timewheel's SEO and growth marketing platform. It maps the keywords your buyers search, fixes what blocks search engines from ranking your pages, and reports every ranking, visitor and conversion in one place.",
      },
      {
        q: "Who is Marketing Bug for?",
        a: "Growing businesses that depend on organic search: SaaS and B2B teams, e-commerce stores, and service brands that want a steady stream of qualified leads instead of one-off traffic spikes.",
      },
      {
        q: "How is it different from hiring an SEO agency?",
        a: "An agency leaves you with a monthly report and little visibility into the work. Marketing Bug keeps the whole plan in your account: the keyword map, the technical fixes and the results, so you can see exactly what is being done and why.",
      },
      {
        q: "Do I need to rebuild my website to use it?",
        a: "No. Marketing Bug works with the site you already have, including WordPress, Shopify and headless setups. It audits what is live, recommends the fixes that matter, and syncs changes as you publish.",
      },
      {
        q: "How long before I see results?",
        a: "Technical fixes and quick on-page wins often move things within a few weeks. Content and authority compound over months. The dashboard shows progress from the first crawl, so you can see the curve building rather than waiting in the dark.",
      },
      {
        q: "How much does Marketing Bug cost?",
        a: "Plans scale with the number of pages and keywords you manage. Start with a free account to see your keyword map and audit, then move up when you want the full workflow. There are no lock-in contracts.",
      },
    ],
  },
  final: {
    title: "Ready to make search your best channel?",
    body: "Tell us what you sell and who buys it. We'll show you the queries worth winning, and how Marketing Bug turns them into revenue.",
    primaryLabel: "Start free",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to our team",
    secondaryHref: "/contact",
  },
};
