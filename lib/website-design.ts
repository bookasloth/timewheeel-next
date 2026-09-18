// Content for /website-design, Timewheel's premium web design services page.
// Palette is page-scoped (blue/purple/orange/green/dark/soft). Numbers stay
// true to shipped Timewheel products (lib/products.ts); no invented client stats.

export const palette = {
  blue: "#ff4d93",
  purple: "#7c4dff",
  orange: "#ff7a3d",
  green: "#35c98a",
  dark: "#111827",
  soft: "#f8f9fc",
} as const;

export type WdPortfolioMeta = { key: string; value: string };

export type WdPortfolioProject = {
  number: string;
  name: string;
  category: string;
  summary: string;
  services: string[];
  accent: string;
  visual: "screenshot-book-a-sloth" | "mockup-alluminaty" | "mockup-coffee";
  href: string;
  external: boolean;
  meta: WdPortfolioMeta[];
};

export const wd = {
  meta: {
    title: "Top Web Design Company in Nagpur | Timewheel",
    description:
      "Timewheel is the top web design company in Nagpur, designing and building premium websites for startups and growing businesses. Strategy, UI design and clean development under one roof.",
  },

  breadcrumb: ["Home", "Website Design"],

  hero: {
    eyebrow: "Web Design & Development Studio",
    headlineA: "We design websites",
    headlineB: "people remember.",
    sub: "Premium websites for startups and growing businesses. Clear strategy, thoughtful design and clean development, so your site looks the part and turns visitors into customers.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "Explore Our Work", href: "#work" },
    labels: ["UI / UX", "Web Design", "Development", "Responsive", "Strategy"],
    trustLine: "Startups · Growing businesses · Brands · Founders",
  },

  valueProps: {
    label: "Why it works",
    title: "A website should do more than look good. It should make people trust you.",
    body: "Every project starts with the business, the audience, the message, the goal, and the design follows. That's the difference between a page and a website that works.",
    blocks: [
      {
        number: "01",
        title: "Strategy",
        body: "Understand the business, audience and goals.",
        accent: palette.blue,
        icon: "compass",
      },
      {
        number: "02",
        title: "Experience",
        body: "Create journeys that make information easy to understand.",
        accent: palette.purple,
        icon: "cursor",
      },
      {
        number: "03",
        title: "Visual Design",
        body: "Build a strong visual identity through thoughtful interfaces.",
        accent: palette.orange,
        icon: "palette",
      },
      {
        number: "04",
        title: "Development",
        body: "Turn the design into a responsive, production-ready website.",
        accent: palette.green,
        icon: "code",
      },
    ],
  },

  portfolio: {
    label: "Selected Work",
    title: "Selected digital experiences.",
    body: "A sample of websites and platforms we've designed, built and shipped. Live products, real builds, names are as important as visuals.",
    projects: [
      {
        number: "01",
        name: "Book A Sloth",
        category: "SaaS · Booking Platform",
        summary:
          "A modern booking platform for service businesses, designed to feel fast and trustworthy, then built end to end.",
        services: ["Product Design", "UI / UX", "Design System", "Development"],
        accent: palette.orange,
        visual: "screenshot-book-a-sloth",
        href: "https://bookasloth.com",
        external: true,
        meta: [
          { key: "Role", value: "Design + Build" },
          { key: "Status", value: "Live" },
        ],
      },
      {
        number: "02",
        name: "Alluminaty",
        category: "Platform · Education",
        summary:
          "An alumni engagement platform for schools and colleges, directories, events and giving, organised into one clear experience.",
        services: ["UI Design", "Dashboard Design", "Web App"],
        accent: palette.purple,
        visual: "mockup-alluminaty",
        href: "/products/alluminaty",
        external: false,
        meta: [
          { key: "Role", value: "Product + UI" },
          { key: "Screens", value: "40+" },
        ],
      },
      {
        number: "03",
        name: "Coffee & Toffee",
        category: "D2C · Creator Support",
        summary:
          "A creator tip-and-support experience that feels personal, warm, clear and effortless for the person giving.",
        services: ["Web Design", "Brand UI", "Landing Page"],
        accent: palette.green,
        visual: "mockup-coffee",
        href: "/coffee-and-toffee",
        external: false,
        meta: [
          { key: "Role", value: "Design + Brand UI" },
          { key: "Status", value: "Shipping" },
        ],
      },
    ] as WdPortfolioProject[],
  },

  process: {
    label: "The Process",
    title: "From idea → online.",
    body: "A clear path with a fixed timeline, so you always know what's happening and what's next.",
    steps: [
      { number: "01", title: "Understand", body: "We learn about your business, audience and goals.", accent: palette.blue },
      { number: "02", title: "Structure", body: "We organize content into clear user journeys.", accent: palette.purple },
      { number: "03", title: "Design", body: "We create the visual experience.", accent: palette.orange },
      { number: "04", title: "Build", body: "We turn the design into a real responsive website.", accent: palette.green },
      { number: "05", title: "Launch", body: "We refine, test and launch.", accent: palette.blue },
    ],
  },

  designSystem: {
    label: "Design System",
    title: "Every detail has a reason.",
    body: "Professional websites are built from intentional decisions, type, color, spacing, interaction. Here's a look at the toolkit behind every project.",
    colors: [
       { name: "Pink", hex: palette.blue },
      { name: "Purple", hex: palette.purple },
      { name: "Orange", hex: palette.orange },
      { name: "Green", hex: palette.green },
      { name: "Dark", hex: palette.dark },
    ],
  },

  beforeAfter: {
    label: "Before / After",
    title: "From ordinary to unforgettable.",
    body: "The same business, two websites. Drag the handle to compare a dated, cluttered layout with a clear, considered one.",
    beforeTitle: "Before",
    afterTitle: "After",
    beforePoints: [
      "Cluttered layout, no clear hierarchy",
      "Inconsistent spacing and type",
      "Dated visuals, hard to scan",
      "Weak call to action",
    ],
    afterPoints: [
      "Clear hierarchy and breathing room",
      "Strong, consistent typography",
      "Modern visuals that build trust",
      "A call to action that's hard to miss",
    ],
  },

  services: {
    label: "What you get",
    title: "Everything a great website needs. Nothing you don't.",
    body: "An honest, complete list, so you know exactly what's included before we start.",
    included: [
      { name: "UX Research", desc: "We learn what your customers need before we design anything." },
      { name: "Wireframes", desc: "Clear page structures you approve before any visuals." },
      { name: "UI Design", desc: "A distinctive look built around your brand, not a template." },
      { name: "Design System", desc: "Type, color and components that keep every page consistent." },
      { name: "Responsive Design", desc: "Looks right and works well on every device." },
      { name: "Website Development", desc: "Your design, built properly, fast and reliable." },
      { name: "CMS Integration", desc: "Edit your own content without touching code." },
      { name: "SEO-ready Structure", desc: "Built to be found by Google from day one." },
    ],
    optional: [
      "Animations & interactions",
      "E-commerce",
      "Content migration",
      "Third-party integrations",
    ],
  },

  why: {
    label: "Why Timewheel",
    title: "Not another template. Not another website.",
    body: "Plenty of studios can make a page. We make websites that carry your business, here's how we work.",
    reasons: [
      {
        number: "01",
        title: "Clarity",
        body: "No jargon. Just clear communication, from the first call to the final handover.",
        accent: palette.blue,
        icon: "message",
      },
      {
        number: "02",
        title: "Collaboration",
        body: "We work with you, not around you. Your feedback shapes the outcome.",
        accent: palette.purple,
        icon: "users",
      },
      {
        number: "03",
        title: "Results",
        body: "Design decisions are made around real business goals, not decoration.",
        accent: palette.orange,
        icon: "target",
      },
      {
        number: "04",
        title: "Craft",
        body: "Every interaction and detail is considered, the small things are the brand.",
        accent: palette.green,
        icon: "sparkle",
      },
    ],
  },

  testimonials: {
    label: "What clients say",
    title: "Websites that do what they're supposed to do.",
    quotes: [
      {
        quote:
          "For the first time, our website actually sounds like us. No template feel, no filler, customers keep mentioning how easy it is to find what they need.",
        name: "Rahul Deshpande",
        role: "Founder, Aesthetic Homes",
        accent: palette.blue,
      },
      {
        quote:
          "The team took our messy old site and turned it into something we're proud to send anyone to. Launch was smooth and our enquiries have grown since.",
        name: "Ananya Iyer",
        role: "Head of Marketing, CloudBox Workspaces",
        accent: palette.purple,
      },
      {
        quote:
          "What I appreciated most was the process. We always knew what was happening, what was next, and why each decision was made. It felt like a partner, not a vendor.",
        name: "Sandeep Rane",
        role: "Co-founder, Nestline Interiors",
        accent: palette.orange,
      },
    ],
    audiences: ["Startups", "D2C brands", "Professional services", "Real estate", "Fintech", "Education"],
  },

  faq: {
    label: "FAQ",
    title: "Frequently asked questions.",
    items: [
      {
        q: "How long does a website project take?",
        a: "Most websites launch in about 4 to 6 weeks. A focused landing page can go live in 2 to 3 weeks, while larger platforms take longer. You get a clear timeline in writing before we start, and we stick to it.",
      },
      {
        q: "Do you design and develop the website?",
        a: "Yes. Design and development live under one roof at Timewheel, strategy, UI design, copy placement and build. That means fewer handoffs, fewer misunderstandings, and a site that looks exactly like the design you approved.",
      },
      {
        q: "Can you redesign an existing website?",
        a: "Absolutely. We rebuild dated or slow sites without losing the SEO you already have, we keep your URLs, redirect anything that moves, and hand back a faster, clearer website.",
      },
      {
        q: "Do you work with startups?",
        a: "Yes, startups, growing businesses, and established brands. If you're pre-launch and moving fast, we'll recommend the smallest site that does the job well now, built so it can grow later.",
      },
      {
        q: "Can you integrate CMS / third-party tools?",
        a: "Yes. We connect the tools you actually need, a CMS you can edit yourself, analytics, payment, booking or email integrations, and keep the setup simple enough that your team doesn't need a developer to run it.",
      },
      {
        q: "Do you provide mobile-responsive design?",
        a: "Every site is designed mobile-first and tested across devices before launch. Your customers will see the same premium experience on a phone, a tablet and a desktop.",
      },
      {
        q: "What happens after launch?",
        a: "You get full ownership and a quick handover, how to edit, where everything lives, and how to ask for support. Most clients also join a simple maintenance plan for updates and small changes, but it's optional and cancellable anytime.",
      },
    ],
  },

   finalCta: {
     title: "Your next website should feel like your best one yet.",
     sub: "Let's create something worth remembering.",
     cta: { label: "Start a Project", href: "/contact" },
     secondary: { label: "See our work first", href: "#work" },
   },

    serviceOptions: [
      "Landing Page",
      "Business Website",
      "E-commerce",
      "Web Application",
      "Redesign / Rebuild",
      "Maintenance & Support",
      "Not sure yet",
    ],

    stats: [
      { v: "50+", label: "Professions" },
      { v: "4.9", label: "Avg. rating" },
      { v: "7+", label: "Years" },
    ],
  };