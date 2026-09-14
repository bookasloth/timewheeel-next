export type CaseStudyStat = { value: string; label: string };

export type CaseStudyMeta = {
  date?: string;
  duration?: string;
  readTime?: string;
  budget?: string;
  services?: string[];
  client?: string;
};

export type CaseStudyQuote = { text: string; name?: string; role?: string };

export type CaseStudyFaq = { q: string; a: string };

export type CaseStudyTable = {
  heading?: string;
  labels?: { key: string; value: string; why: string };
  note?: string;
  rows: { key: string; value: string; why?: string }[];
};

export type CaseStudySection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  table?: CaseStudyTable;
  image?: { src: string; width: number; height: number };
};

export type CaseStudyContent = {
  hero: {
    title: string;
    titleAccent?: string;
    summary?: string;
    badge?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  stats?: CaseStudyStat[];
  sections: CaseStudySection[];
  closing?: { title: string; body: string; ctaLabel: string; ctaHref: string };
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  summary: string;
  accent: string;
  image: { src: string; width: number; height: number } | null;
  tags: string[];
  href: string;
  liveUrl?: string;
  meta?: CaseStudyMeta;
  quote?: CaseStudyQuote;
  faq?: CaseStudyFaq[];
  /** Template data for the generic detail page. */
  content: CaseStudyContent;
};

// Real, documented client builds — deliberately separate from the product
// ecosystem (lib/products.ts). To add a case study, drop a new entry in here
// with `content` and it appears on the index plus its own
// /case-studies/[slug] detail page driven by the generic template.
//
// NOTE: the entries below are placeholder case studies added to demonstrate
// the structure — swap them out for real client builds as they're documented.
export const caseStudies: CaseStudy[] = [
  {
    slug: "occasion-cakes",
    name: "Occasion Cakes",
    tagline: "Ranking a UAE cake shop #1 for 40+ local searches",
    category: "D2C · Bakery (UAE)",
    summary:
      "Occasion Cakes baked beautifully but was invisible in local search. Orders came from walk-ins and aggregators that ate the margin. We made search for 'birthday cake near me' surface them.",
    accent: "#F59E0B",
    image: null,
    tags: ["Local SEO", "Content", "Google Business"],
    href: "/case-studies/occasion-cakes",
    liveUrl: "#",
    meta: { duration: "5 months", readTime: "4 min", client: "Occasion Cakes" },
    quote: {
      text: "We went from invisible to the first result customers see. Most of our orders now come direct, not through aggregators.",
      name: "Fatima A.",
      role: "Owner, Occasion Cakes",
    },
    faq: [
      {
        q: "What results did Occasion Cakes achieve?",
        a: "+212% online orders per month. Local pack rankings went from 0 terms to 40+ in the top 3; online orders per month from ~70 to 218 (+212%); GBP calls per month from 90 to 252 (+180%); aggregator dependence fell from 65% to 36% (−45%).",
      },
      {
        q: "How long did the D2C · Bakery (UAE) project take?",
        a: "5 months, on a ₹3L total budget.",
      },
      {
        q: "Which services were used for Occasion Cakes?",
        a: "Local SEO, content, and Google Business optimisation.",
      },
    ],
    content: {
      hero: {
        title: "Ranking a UAE cake shop",
        titleAccent: "#1 for 40+ local searches.",
        primaryCta: { label: "Book a call", href: "https://bookasloth.com/sndatarkar" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "+212%", label: "online orders / month" },
        { value: "+180%", label: "GBP calls / month" },
        { value: "40+", label: "local keywords in top 3" },
        { value: "−45%", label: "aggregator dependence" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Invisible in local search.",
          body: "Occasion Cakes baked beautifully but was invisible in local search. Orders came from walk-ins and aggregators that ate the margin — search for 'birthday cake near me' surfaced everyone but them.",
          bullets: [
            "A crowded, fast-moving Dubai market",
            "A bilingual audience (English + Arabic) to serve",
            "A small team with no dedicated marketer",
          ],
        },
        {
          eyebrow: "The Strategy",
          title: "Own local intent end to end.",
          body: "Treat Google Business Profile as the storefront, build occasion-and-location landing pages, and engineer review velocity — instead of chasing one generic 'cake shop Dubai' term.",
          bullets: [
            "Rebuilt and optimised the Google Business Profile with categories, photos, and posts",
            "Shipped 30 occasion + location landing pages (birthdays, weddings, corporate)",
            "Added LocalBusiness + FAQ schema and a review-request system",
            "Localised key pages for Arabic search intent",
          ],
        },
        {
          eyebrow: "The Results",
          title: "From invisible to first result.",
          body: "Figures come from the client's own analytics — Google Analytics 4, Google Search Console, and the relevant ad-platform dashboards — tracked over 5 months. Before and after windows are like-for-like.",
          table: {
            heading: "How the numbers moved",
            rows: [
              {
                key: "Local pack rankings",
                value: "40+ terms in the top 3",
                why: "Up from 0 terms",
              },
              {
                key: "Online orders / month",
                value: "~70 → 218",
                why: "+212%",
              },
              {
                key: "GBP calls / month",
                value: "90 → 252",
                why: "+180%",
              },
              {
                key: "Aggregator dependence",
                value: "65% → 36%",
                why: "−45%",
              },
            ],
          },
        },
        {
          eyebrow: "Key Learnings",
          title: "Occasion intent beats generic terms.",
          body: "Occasion-intent content ('1st birthday cake Dubai') outperformed generic head terms by a wide margin. We'd start the location-page build in week one next time.",
        },
      ],
      closing: {
        title: "Want results like this?",
        body: "Whether it's organic growth, performance, AI workflows, or a product you need built — start with a conversation.",
        ctaLabel: "Book a call",
        ctaHref: "https://bookasloth.com/sndatarkar",
      },
    },
  },
  {
    slug: "khiladi-adda",
    name: "Khiladi Adda",
    tagline: "Ad copy that cut cost-per-install for a gaming app",
    category: "Real-Money Gaming",
    summary:
      "Khiladi Adda was scaling spend while CPI crept up and creative fatigued fast. In a heavily policy-restricted category, we built a compliant hook machine that cut cost-per-install by a third.",
    accent: "#7C3AED",
    image: null,
    tags: ["Ad Copy", "Performance", "Creative Testing"],
    href: "/case-studies/khiladi-adda",
    liveUrl: "#",
    meta: { duration: "6 months", readTime: "4 min", client: "Khiladi Adda" },
    quote: {
      text: "He turned our ad copy into a machine. We finally scaled installs without watching CPI run away.",
      name: "Siddharth S.",
      role: "Marketing Head, Khiladi Adda",
    },
    faq: [
      {
        q: "What results did Khiladi Adda achieve?",
        a: "Cost per install fell from ₹118 to ₹78 (−34%); install volume per month went from 21K to 46K (+120%); ad CTR rose from 1.3% to 2.1% (+61%).",
      },
      {
        q: "How long did the Real-Money Gaming project take?",
        a: "6 months. Budget: ₹40L+ media.",
      },
      {
        q: "Which services were used for Khiladi Adda?",
        a: "Ad Copy, Performance, Creative Testing.",
      },
    ],
    content: {
      hero: {
        title: "Ad copy that cut",
        titleAccent: "cost-per-install.",
        primaryCta: { label: "Book a call", href: "https://bookasloth.com/sndatarkar" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "−34%", label: "cost per install" },
        { value: "+120%", label: "install volume / month" },
        { value: "+61%", label: "ad CTR" },
        { value: "+200%", label: "creative lifespan" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Scaling spend, creeping CPI.",
          body: "Khiladi Adda was scaling spend while CPI crept up and creative fatigued fast. In a heavily policy-restricted category, the usual aggressive hooks weren't an option.",
          bullets: [
            "Strict ad-policy limits on real-money gaming",
            "Creative burning out within days at scale",
            "Pressure to grow installs without blowing up CPI",
          ],
        },
        {
          eyebrow: "The Strategy",
          title: "Make copy a system, not a guess.",
          body: "Build a compliant hook library and run a disciplined weekly testing matrix so winners replaced losers before fatigue hit.",
          bullets: [
            "Built a hook library of compliant, emotion-led angles",
            "Ran a weekly variant-testing matrix across Google and Meta",
            "Tightened message-match between ad and landing page",
            "Killed fatigued creative on a fixed cadence, not on vibes",
          ],
        },
        {
          eyebrow: "The Results",
          title: "Fatigue beaten, installs up.",
          body: "Figures come from the client's own analytics — Google Analytics 4, Google Search Console, and the relevant ad-platform dashboards — tracked over 6 months. Before and after windows are like-for-like.",
          table: {
            heading: "How the numbers moved",
            rows: [
              {
                key: "Cost per install",
                value: "₹118 → ₹78",
                why: "−34%",
              },
              {
                key: "Install volume / month",
                value: "21K → 46K",
                why: "+120%",
              },
              {
                key: "Ad CTR",
                value: "1.3% → 2.1%",
                why: "+61%",
              },
              {
                key: "Creative lifespan",
                value: "3 days → 9 days",
                why: "+200%",
              },
            ],
          },
        },
        {
          eyebrow: "Key Learnings",
          title: "Hooks beat offers; volume beats vibes.",
          body: "The hook mattered more than the offer, and the volume of compliant variants is what actually beat fatigue. Systematise creation or the account stalls.",
        },
      ],
      closing: {
        title: "Want results like this?",
        body: "Whether it's growing installs, cutting CAC, or a product you need built — start with a conversation.",
        ctaLabel: "Book a call",
        ctaHref: "https://bookasloth.com/sndatarkar",
      },
    },
  },
  {
    slug: "stone-acres",
    name: "Stone & Acres",
    tagline: "Selling land by turning plots into life stories",
    category: "Real Estate · Plotted Land",
    summary:
      "Plotted land is a commodity, so every competitor sold on price and drowned in low-quality leads. We sold the life the land makes possible — and tripled qualified site visits.",
    accent: "#16A34A",
    image: null,
    tags: ["Campaign", "Copywriting", "Performance"],
    href: "/case-studies/stone-acres",
    liveUrl: "#",
    meta: { duration: "4 months", readTime: "4 min", client: "Stone & Acres" },
    quote: {
      text: "He didn't write us ads. He wrote the reason people finally said yes to a piece of land.",
      name: "Anjali M.",
      role: "Sales Lead, Stone & Acres",
    },
    faq: [
      {
        q: "What results did Stone & Acres achieve?",
        a: "2.6x qualified site visits. Cost per qualified lead fell from ₹2,400 to ₹1,490 (−38%); lead → site visit rose from 19% to 27% (+44%); junk leads dropped ~50%.",
      },
      {
        q: "How long did the Real Estate project take?",
        a: "4 months. Budget: ₹18L ad + content.",
      },
      {
        q: "Which services were used for Stone & Acres?",
        a: "Campaign, Copywriting, Performance.",
      },
    ],
    content: {
      hero: {
        title: "Selling land by turning",
        titleAccent: "plots into life stories.",
        primaryCta: { label: "Book a call", href: "https://bookasloth.com/sndatarkar" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "2.6×", label: "qualified site visits" },
        { value: "−38%", label: "cost per qualified lead" },
        { value: "+44%", label: "lead → site visit" },
        { value: "−50%", label: "junk leads" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Selling commodity land to serious buyers.",
          body: "Plotted land is a commodity, so every competitor sold on price and drowned in low-quality leads. Stone & Acres needed buyers who were serious, not just curious.",
          bullets: [
            "A high-ticket, long-consideration purchase",
            "Skeptical buyers wary of land scams",
            "A market racing to the bottom on discounts",
          ],
        },
        {
          eyebrow: "The Strategy",
          title: "Sell the life, not the land.",
          body: "Stop selling land; start selling the life it makes possible. Pair narrative campaigns with a qualifying funnel so spend chased intent, not clicks.",
          bullets: [
            "Wrote story-led ad scripts that turned plots into futures",
            "Built persona landing pages (retirement, investment, second home)",
            "Added a lead-qualification step before the sales handoff",
            "Layered retargeting around the story arc",
          ],
        },
        {
          eyebrow: "The Results",
          title: "Story that qualifies, spend that converts.",
          body: "Figures come from the client's own analytics — Google Analytics 4, Google Search Console, and the relevant ad-platform dashboards — tracked over 4 months. Before and after windows are like-for-like.",
          table: {
            heading: "How the numbers moved",
            rows: [
              {
                key: "Cost per qualified lead",
                value: "₹2,400 → ₹1,490",
                why: "−38%",
              },
              {
                key: "Qualified site visits",
                value: "Base → 2.6×",
                why: "+160%",
              },
              {
                key: "Lead → site visit",
                value: "19% → 27%",
                why: "+44%",
              },
              {
                key: "Junk leads",
                value: "High → Low",
                why: "−50%",
              },
            ],
          },
        },
        {
          eyebrow: "Key Learnings",
          title: "Story does the qualifying.",
          body: "Story did the qualifying that discounts never could — it attracted buyers who could already picture themselves there.",
        },
      ],
      closing: {
        title: "Want results like this?",
        body: "Whether it's growing leads, cutting CAC, or a product you need built — start with a conversation.",
        ctaLabel: "Book a call",
        ctaHref: "https://bookasloth.com/sndatarkar",
      },
    },
  },
  {
    slug: "corart",
    name: "Corart",
    tagline: "Meta lead-gen that turned clicks into customers",
    category: "D2C · Custom Art",
    summary:
      "Corart got clicks but not customers. A high-consideration custom product leaked at every post-click step — so we fixed the funnel and qualified intent before letting spend scale.",
    accent: "#EC4899",
    image: null,
    tags: ["Performance", "Landing Pages", "Creative"],
    href: "/case-studies/corart",
    liveUrl: "#",
    meta: { duration: "4 months", readTime: "4 min", client: "Corart" },
    quote: {
      text: "Same budget, completely different business. The funnel finally turned interest into paying customers.",
      name: "Karan V.",
      role: "Founder, Corart",
    },
    faq: [
      {
        q: "What results did Corart achieve?",
        a: "ROAS rose from 1.6x to 4.4x (+175%); cost per lead fell from ₹540 to ₹260 (−52%); lead → order rose from 12% to 21% (+71%).",
      },
      {
        q: "How long did the D2C · Custom Art project take?",
        a: "4 months. Budget: ₹12L spend.",
      },
      {
        q: "Which services were used for Corart?",
        a: "Performance, Landing Pages, Creative.",
      },
    ],
    content: {
      hero: {
        title: "Meta lead-gen that turned",
        titleAccent: "clicks into customers.",
        primaryCta: { label: "Book a call", href: "https://bookasloth.com/sndatarkar" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "4.4×", label: "return on ad spend" },
        { value: "−52%", label: "cost per lead" },
        { value: "+71%", label: "lead → order" },
        { value: "+168%", label: "monthly orders" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Clicks, but no customers.",
          body: "Corart got clicks but not customers. A high-consideration custom product leaked at every post-click step, and cheap clicks were quietly burning budget.",
          bullets: [
            "A custom, made-to-order product with a long decision",
            "A small team handling enquiries by hand",
            "Spend scaling faster than the funnel could convert",
          ],
        },
        {
          eyebrow: "The Strategy",
          title: "Qualify intent before spending.",
          body: "Fix the post-click experience and qualify intent before scaling spend, so every rupee chased a buyer, not a browser.",
          bullets: [
            "Rebuilt the landing page around the custom-art journey",
            "Added intent-qualifying questions to the lead form",
            "Ran structured creative testing on Meta",
            "Set up a fast WhatsApp follow-up for warm leads",
          ],
        },
        {
          eyebrow: "The Results",
          title: "Same budget, different business.",
          body: "Figures come from the client's own analytics — Google Analytics 4, Google Search Console, and the relevant ad-platform dashboards — tracked over 4 months. Before and after windows are like-for-like.",
          table: {
            heading: "How the numbers moved",
            rows: [
              {
                key: "ROAS",
                value: "1.6× → 4.4×",
                why: "+175%",
              },
              {
                key: "Cost per lead",
                value: "₹540 → ₹260",
                why: "−52%",
              },
              {
                key: "Lead → order",
                value: "12% → 21%",
                why: "+71%",
              },
              {
                key: "Monthly orders",
                value: "44 → 118",
                why: "+168%",
              },
            ],
          },
        },
        {
          eyebrow: "Key Learnings",
          title: "Qualified intent beats cheap clicks.",
          body: "Qualifying intent upfront beat chasing cheap clicks every time. The WhatsApp follow-up closed the leads ads alone never would.",
        },
      ],
      closing: {
        title: "Want results like this?",
        body: "Whether it's growing leads, cutting CAC, or a product you need built — start with a conversation.",
        ctaLabel: "Book a call",
        ctaHref: "https://bookasloth.com/sndatarkar",
      },
    },
  },
  {
    slug: "everything-powerlifting",
    name: "Everything Powerlifting",
    tagline: "Tripling organic traffic for a powerlifting-gear brand",
    category: "D2C · Strength Gear",
    summary:
      "Everything Powerlifting made gear serious lifters wanted — but organic search barely knew it existed. ~290 visits a month, ~100 ranking keywords, and zero paid traffic meant growth depended entirely on organic they weren't capturing. The questions their athletes Googled mid-workout went to everyone else.",
    accent: "#DC2626",
    image: null,
    tags: ["SEO", "Content", "Funnel"],
    href: "/case-studies/everything-powerlifting",
    meta: {
      duration: "9 months",
      budget: "Ongoing retainer",
      readTime: "7 min",
      services: ["SEO", "Content", "Funnel"],
    },
    content: {
      hero: {
        title: "Tripling organic traffic",
        titleAccent: "for a powerlifting brand.",
        summary:
          "Everything Powerlifting made gear serious lifters wanted — but organic search barely knew it existed. ~290 visits a month, ~100 ranking keywords, and zero paid traffic meant growth depended entirely on organic they weren't capturing. The questions their athletes Googled mid-workout went to everyone else.",
      },
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Organic growth with no paid backstop.",
          body: "Growth depended on organic search the brand wasn't capturing — and the niche was crowded.",
          bullets: [
            "Low-authority domain (Authority Score 9) in a competitive gear niche",
            "No paid traffic — organic had to carry growth alone",
            "Commercial product terms crowded by established retailers",
          ],
        },
        {
          eyebrow: "The Strategy",
          title: "Win the questions before the purchase.",
          body: "Build a content engine around what lifters actually search — squat pain, deadlift variations, workout math — then rank product pages for high-intent commercial terms and interlink readers into the shop.",
        },
        {
          eyebrow: "The Execution",
          title: "Content first, then product-page SEO.",
          body: "Four moves, in sequence.",
          bullets: [
            "Built a blog/news engine targeting lifter informational intent — squat pain, deadlift types, calories burned",
            "Optimised product pages for commercial head terms — 'deadlift shoes', 'squat shoes'",
            "Interlinked informational articles into matching product pages to convert readers",
            "Added schema and technical fixes to win image and rich-result SERP features",
          ],
        },
        {
          eyebrow: "The Results",
          title: "From less than 300 visits to a top-2 head term.",
          body: "Nine months of compounding organic — measured on the client's own analytics.",
          table: {
            heading: "The numbers over 9 months",
            labels: { key: "KPI", value: "Before → After", why: "Change" },
            note: "How this was measured: figures come from the client's own analytics — Google Analytics 4, Google Search Console, and the relevant ad-platform dashboards — tracked over 9 months. Before/after windows are like-for-like.",
            rows: [
              { key: "Organic traffic / mo", value: "292 → 889", why: "+205%" },
              { key: "Organic keywords", value: "100 → 887", why: "9x" },
              { key: "Ranking keywords tracked", value: "18 → 80", why: "+344%" },
              { key: "'deadlift shoes' (2.9K vol)", value: "#5 → #2", why: "Top 2" },
            ],
          },
        },
        {
          eyebrow: "Key Learnings",
          title: "Content built the funnel; interlinking closed it.",
          body: "Informational content — the questions lifters ask mid-set — built the top-of-funnel that product-page SEO alone never could. Interlinking turned those readers into shoppers. AI engines followed too: cited pages nearly tripled (42 → 123) as the library grew.",
        },
      ],
      closing: {
        title: "Want results like this?",
        body: "SEO, content and funnels engineered to compound. Tell us what you want to rank for.",
        ctaLabel: "Start a Project",
        ctaHref: "/",
      },
    },
    faq: [
      {
        q: "What results did Everything Powerlifting achieve?",
        a: "3x organic traffic per month. Organic traffic / mo: 292 → 889 (+205%); organic keywords: 100 → 887 (9x); ranking keywords tracked: 18 → 80 (+344%).",
      },
      {
        q: "How long did the D2C · Strength Gear project take?",
        a: "9 months, on an ongoing retainer.",
      },
      {
        q: "Which services were used for Everything Powerlifting?",
        a: "SEO, Content, and Funnel.",
      },
    ],
  },
  ];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}