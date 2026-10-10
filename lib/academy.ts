// Timewheel Digital Marketing Academy. Single source of truth: every Academy
// page, the interest form's program list, the API's slug check, the sitemap and
// the JSON-LD read from here, so a program is only ever edited in one place.
// To add or change a program, edit `programs` below; the pages follow.
//
// Honesty rules for this file: no placement claims, student counts, reviews,
// instructor bios or invented prices. A program only says "enrolling" when a
// cohort is genuinely open (see ProgramStatus).

export type ProgramStatus =
  /** A cohort is open and taking applications. */
  | "enrolling"
  /** First cohort is being planned; students register interest. */
  | "interest"
  /** Later; students can ask to be told when it opens. */
  | "upcoming";

export type ProgramIcon = "search" | "content" | "ai" | "performance" | "analytics";

/** Platforms whose online certifications we help students prepare for and complete. */
export const CERT_PLATFORMS = ["Google", "Meta", "HubSpot", "LinkedIn"] as const;
export type CertPlatform = (typeof CERT_PLATFORMS)[number];

export type ProgramModule = { title: string; summary: string; topics: string[] };

export type ProgramAssignment = { title: string; brief: string; deliverable: string };

export type Faq = { q: string; a: string };

export type Program = {
  slug: string;
  title: string;
  /** Tight spots: nav pills, related cards, the form select. */
  shortTitle: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  /** Opening paragraphs on the detail page. */
  description: string[];
  audience: string[];
  skills: string[];
  outcomes: string[];
  modules: ProgramModule[];
  assignments: ProgramAssignment[];
  deliverables: string[];
  level: string;
  duration: string;
  effort: string;
  format: string;
  prerequisites: string[];
  status: ProgramStatus;
  /** What we can honestly say about price today. */
  pricing: string;
  /** Online certification platforms most relevant to this program. */
  certPlatforms: CertPlatform[];
  accent: string;
  icon: ProgramIcon;
  /** Optional cover; cards fall back to a typographic cover when unset. */
  image?: { src: string; alt: string };
  /** Program-specific questions, shown on the detail page. */
  faqs: Faq[];
};

export const STATUS_META: Record<ProgramStatus, { label: string; cta: string; formTitle: string; note: string }> = {
  enrolling: {
    label: "Enrolling now",
    cta: "Apply to enroll",
    formTitle: "Apply for the next cohort",
    note: "Applications are open for the current cohort.",
  },
  interest: {
    label: "First cohort in planning",
    cta: "Register interest",
    formTitle: "Register your interest",
    note: "Not open for enrollment yet. Register interest and we will email you the cohort dates, format and fees before anyone is asked to commit or pay.",
  },
  upcoming: {
    label: "Coming later",
    cta: "Notify me",
    formTitle: "Get notified when it opens",
    note: "This program is planned for after the first launch. The curriculum below is a draft and may change.",
  },
};

const DEFAULT_PRICING = "Fees will be announced with the first cohort. Registering interest is free and does not commit you to anything.";
const DEFAULT_FORMAT = "Online and cohort-based: short lessons, a weekly assignment, and written feedback on what you submit.";

export const programs: Program[] = [
  {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    shortTitle: "SEO",
    summary:
      "Learn how search works, audit real websites, and plan content that can earn rankings, from keyword research to technical fixes and AI search.",
    description: [
      "Most SEO courses stop at definitions. This program starts with how search engines and AI answer engines actually find, read and rank pages, then puts you to work on websites straight away.",
      "Every module ends in something you produce: an audit, a keyword map, a rewritten page, a measurement plan. By the end you have an SEO case study you can walk an interviewer or a client through, step by step.",
    ],
    audience: [
      "College students curious about how websites get found on Google.",
      "Graduates aiming for SEO executive, content or digital marketing roles.",
      "Beginners who want a skill they can prove with a real piece of work, not a quiz score.",
    ],
    skills: [
      "Keyword research and search intent",
      "Technical SEO auditing",
      "On-page optimization",
      "Local SEO and Google Business Profile",
      "Content clusters and internal linking",
      "Reading Google Search Console data",
      "How AI answers choose their sources",
    ],
    outcomes: [
      "Run a structured SEO audit and rank the fixes by impact.",
      "Turn a business goal into a keyword map and a content plan.",
      "Rewrite a page so it serves both the reader and the search engine.",
      "Read Search Console data and explain what changed and why.",
    ],
    modules: [
      {
        title: "How search works",
        summary: "Crawling, indexing and ranking, and how AI answers pick the pages they quote.",
        topics: ["Crawling and indexing", "Search intent", "Ranking signals that matter", "AI Overviews and answer engines"],
      },
      {
        title: "Keyword research and intent",
        summary: "Find what people search for, group it by intent, and decide what is worth chasing.",
        topics: ["Free and freemium research tools", "Intent mapping", "Keyword clustering", "Prioritising by effort and value"],
      },
      {
        title: "On-page SEO",
        summary: "Titles, headings, copy and internal links that help readers first and rankings second.",
        topics: ["Titles and meta descriptions", "Heading structure", "Internal linking", "Structured data basics"],
      },
      {
        title: "Technical SEO",
        summary: "Find what stops a site from being crawled, indexed or loaded quickly.",
        topics: ["Site audits", "Indexability and canonicals", "Sitemaps and robots.txt", "Core Web Vitals"],
      },
      {
        title: "Local SEO",
        summary: "How local businesses show up in maps and \"near me\" searches, done ethically.",
        topics: ["Google Business Profile", "Local citations", "Earning genuine reviews", "Location pages"],
      },
      {
        title: "Measuring SEO",
        summary: "Prove what changed with data instead of screenshots of rankings.",
        topics: ["Google Search Console", "GA4 basics for SEO", "Before and after comparisons", "Writing an SEO report"],
      },
    ],
    assignments: [
      {
        title: "SEO audit of a business website",
        brief: "Audit a public website of a local business you choose, or our practice site. Find what holds it back and rank every fix by impact.",
        deliverable: "A prioritised audit report",
      },
      {
        title: "Keyword research and a content cluster",
        brief: "For a sample physiotherapy clinic, research what patients search for and plan a pillar page with supporting articles.",
        deliverable: "A keyword map and cluster plan",
      },
      {
        title: "On-page rewrite",
        brief: "Rewrite three pages of a practice site to match search intent, then explain each change.",
        deliverable: "Before and after pages with notes",
      },
    ],
    deliverables: [
      "A prioritised SEO audit report",
      "A keyword map and content cluster plan",
      "Rewritten pages with a change log",
      "A portfolio case study of one SEO project",
    ],
    level: "Beginner",
    duration: "About 8 weeks (estimated)",
    effort: "5 to 6 hours a week",
    format: DEFAULT_FORMAT,
    prerequisites: ["Comfortable with a browser and Google Sheets", "No coding needed", "A laptop or desktop"],
    status: "interest",
    pricing: DEFAULT_PRICING,
    certPlatforms: ["Google", "HubSpot", "LinkedIn"],
    accent: "#29a66f",
    icon: "search",
    faqs: [
      {
        q: "Do I need to know how to code for the SEO program?",
        a: "No. You will read a little HTML and use free tools, but nothing in the program requires writing code.",
      },
      {
        q: "Which tools will I use?",
        a: "Free or free-tier tools wherever possible: Google Search Console, Google Analytics, PageSpeed Insights, Google Sheets and the free plans of common keyword tools. You will not be asked to buy software.",
      },
    ],
  },
  {
    slug: "content-social-media-marketing",
    title: "Content and Social Media Marketing",
    shortTitle: "Content and Social",
    summary:
      "Plan, write and measure content that people actually read, from audience research to a 30-day calendar and the numbers that show whether it worked.",
    description: [
      "Good content starts long before the first post. This program teaches you to research an audience, decide what to say and where, write clearly, and then check whether any of it moved the needle.",
      "You will plan and write for sample businesses across Instagram, LinkedIn and the web, and learn to tell reach apart from results.",
    ],
    audience: [
      "Students who enjoy writing, design or video and want to use it for marketing.",
      "Graduates aiming for content writer, social media executive or content marketing roles.",
      "Freelancers who want a repeatable process instead of posting and hoping.",
    ],
    skills: [
      "Audience and competitor research",
      "Writing headlines, hooks and captions",
      "Content strategy and pillars",
      "Building a content calendar",
      "Short-form video planning",
      "Reading social and content analytics",
    ],
    outcomes: [
      "Build a content strategy from audience research, not guesswork.",
      "Write clear, on-brand copy for the web and social platforms.",
      "Plan a month of content that ties back to a business goal.",
      "Report on content performance in terms a business owner cares about.",
    ],
    modules: [
      {
        title: "Audience and strategy",
        summary: "Who you are talking to, what they need, and what the business wants from it.",
        topics: ["Audience research", "Competitor content review", "Content pillars", "Goals and metrics"],
      },
      {
        title: "Writing for the web",
        summary: "Clear, specific writing that holds attention and earns the next click.",
        topics: ["Headlines and hooks", "Editing for clarity", "Brand voice", "Calls to action"],
      },
      {
        title: "Platforms and formats",
        summary: "What works where, and why the same post does not belong everywhere.",
        topics: ["Instagram", "LinkedIn", "YouTube Shorts and Reels", "Blogs and newsletters"],
      },
      {
        title: "Planning and calendars",
        summary: "Turn a strategy into a calendar a small team can actually keep up with.",
        topics: ["Monthly planning", "Batching and workflows", "Repurposing content", "Approval checklists"],
      },
      {
        title: "Visual and video basics",
        summary: "Enough design and video sense to brief, review and make simple assets yourself.",
        topics: ["Layout and hierarchy", "Free design tools", "Scripting short videos", "Accessibility basics"],
      },
      {
        title: "Measuring content",
        summary: "Separate vanity numbers from the ones that tell you something.",
        topics: ["Reach versus engagement versus outcomes", "Platform insights", "UTM links", "Monthly content reports"],
      },
    ],
    assignments: [
      {
        title: "A 30-day content calendar",
        brief: "For a sample family bakery with two outlets, plan a month of posts tied to a clear goal, with captions for the first week.",
        deliverable: "A content calendar with sample captions",
      },
      {
        title: "Audience and competitor research",
        brief: "Research the audience and three competitors for a sample business and turn the findings into content pillars.",
        deliverable: "A short strategy document",
      },
      {
        title: "Content performance review",
        brief: "Analyse a month of sample social data and recommend what to keep, cut and test next.",
        deliverable: "A one-page performance report",
      },
    ],
    deliverables: [
      "A content strategy built on research",
      "A 30-day content calendar with written posts",
      "A content performance report",
      "A portfolio case study of one content project",
    ],
    level: "Beginner",
    duration: "About 8 weeks (estimated)",
    effort: "5 to 6 hours a week",
    format: DEFAULT_FORMAT,
    prerequisites: ["Comfortable writing in English", "A smartphone and a laptop", "No design experience needed"],
    status: "interest",
    pricing: DEFAULT_PRICING,
    certPlatforms: ["Meta", "HubSpot", "LinkedIn"],
    accent: "#f45b0a",
    icon: "content",
    faqs: [
      {
        q: "Do I need to be good at design?",
        a: "No. The program focuses on strategy, writing and measurement. You will learn enough visual basics to make simple posts with free tools and to brief a designer well.",
      },
      {
        q: "Will I post on my own social accounts?",
        a: "Only if you want to. Assignments use sample businesses, and you can present the work as a plan and mock-ups rather than live posts.",
      },
    ],
  },
  {
    slug: "ai-for-digital-marketing",
    title: "AI for Digital Marketing",
    shortTitle: "AI for Marketing",
    summary:
      "Use AI tools to research, draft and automate marketing work responsibly, with the fact-checking and human judgement that keep the output trustworthy.",
    description: [
      "AI tools can speed up research, drafting and reporting, and they can also produce confident nonsense. This program teaches you to use them for real marketing work while keeping a human firmly in charge of quality and truth.",
      "You will build an AI-assisted workflow for a sample business, document where the tool helped and where it failed, and learn how search is changing as AI answers more questions directly.",
    ],
    audience: [
      "Students who already use AI tools and want to use them professionally.",
      "Beginners in SEO or content who want to work faster without cutting corners.",
      "Anyone who wants to understand how AI search is changing marketing.",
    ],
    skills: [
      "Prompting for marketing tasks",
      "Fact-checking and editing AI output",
      "AI-assisted research",
      "Designing human-in-the-loop workflows",
      "No-code automation basics",
      "Optimising for AI search answers",
    ],
    outcomes: [
      "Write prompts that produce usable first drafts for common marketing tasks.",
      "Spot and correct AI errors before they reach an audience.",
      "Design a workflow that saves time without losing quality.",
      "Explain how AI answer engines choose what to cite.",
    ],
    modules: [
      {
        title: "How AI language tools work",
        summary: "What these tools are good at, where they fail, and why they make things up.",
        topics: ["How models generate text", "Hallucinations", "Context and instructions", "Choosing the right tool"],
      },
      {
        title: "Prompting for marketing",
        summary: "Get useful drafts for research, copy, briefs and summaries.",
        topics: ["Structured prompts", "Examples and constraints", "Iterating on output", "Building a prompt library"],
      },
      {
        title: "Research and verification",
        summary: "Use AI to speed up research, then check every claim that matters.",
        topics: ["AI-assisted research", "Source checking", "Fact-check logs", "When not to use AI"],
      },
      {
        title: "Workflows and automation",
        summary: "Connect tools so repetitive work runs itself, with a person reviewing the output.",
        topics: ["Mapping a workflow", "No-code automation tools", "Review checkpoints", "Measuring time saved"],
      },
      {
        title: "Search in the AI era",
        summary: "How AI Overviews and chat assistants change what it means to be found.",
        topics: ["Answer engines", "Writing quotable content", "Structured data", "Tracking AI visibility"],
      },
      {
        title: "Responsible use",
        summary: "Privacy, disclosure and copyright, and what a business can safely put into a tool.",
        topics: ["Data privacy", "Disclosure", "Copyright and originality", "Brand safety"],
      },
    ],
    assignments: [
      {
        title: "An AI-assisted marketing workflow",
        brief: "For a sample handmade soap brand, design a workflow that drafts product descriptions with AI and routes them through human review.",
        deliverable: "A documented workflow with a fact-check log",
      },
      {
        title: "Fix an AI draft",
        brief: "Take an AI-written article full of errors, verify each claim and edit it into something publishable.",
        deliverable: "The edited article with tracked corrections",
      },
      {
        title: "A prompt library",
        brief: "Build and test a set of prompts a small marketing team could reuse every week.",
        deliverable: "A tested prompt library with examples",
      },
    ],
    deliverables: [
      "A documented AI-assisted workflow",
      "An edited, fact-checked article with corrections shown",
      "A tested prompt library",
      "A portfolio case study of one AI project",
    ],
    level: "Beginner to intermediate",
    duration: "About 6 weeks (estimated)",
    effort: "4 to 5 hours a week",
    format: DEFAULT_FORMAT,
    prerequisites: [
      "Basic familiarity with any AI chat tool",
      "Some SEO or content basics help, but are not required",
      "A laptop or desktop",
    ],
    status: "interest",
    pricing: DEFAULT_PRICING,
    certPlatforms: ["Google", "HubSpot", "LinkedIn"],
    accent: "#3987c9",
    icon: "ai",
    faqs: [
      {
        q: "Will I need paid AI subscriptions?",
        a: "No. The assignments are designed to work with the free tiers of common AI tools. If a paid feature is ever useful, it will be optional.",
      },
      {
        q: "Is this program about replacing marketers with AI?",
        a: "No. It is about using AI as a tool while a person stays responsible for accuracy, judgement and quality. Fact-checking is part of every assignment.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    summary:
      "Learn how paid campaigns on Meta and Google are planned, tracked and improved, using sample data and campaign briefs before real money is involved.",
    description: [
      "Performance marketing is where marketing meets a budget. This program will cover how paid campaigns are structured, how conversions are tracked, and how to read results without fooling yourself.",
      "It is planned for after the first launch. The curriculum below is a draft.",
    ],
    audience: [
      "Students interested in paid ads and campaign management.",
      "Graduates aiming for performance marketing or ads executive roles.",
      "Learners who have finished the SEO or Content program and want to add paid channels.",
    ],
    skills: [
      "Campaign structure",
      "Audience targeting",
      "Conversion tracking and UTMs",
      "Landing page basics",
      "Budget pacing",
      "Campaign reporting",
    ],
    outcomes: [
      "Plan a campaign structure from a business goal.",
      "Set up tracking so results can be trusted.",
      "Read campaign data and recommend changes.",
    ],
    modules: [
      { title: "Paid media foundations", summary: "How auctions, budgets and objectives work.", topics: ["Auctions", "Objectives", "Budgets", "Attribution basics"] },
      { title: "Meta Ads", summary: "Campaign structure, audiences and creative on Facebook and Instagram.", topics: ["Campaign setup", "Audiences", "Creative testing", "Ads Manager reports"] },
      { title: "Google Ads", summary: "Search campaigns, keywords and match types.", topics: ["Search campaigns", "Keywords and match types", "Ad copy", "Quality signals"] },
      { title: "Tracking and conversions", summary: "Pixels, tags and UTMs so results can be trusted.", topics: ["UTM links", "Conversion events", "Tag Manager basics", "Common tracking mistakes"] },
      { title: "Reporting and optimisation", summary: "Read the numbers and decide what to change.", topics: ["Key metrics", "Diagnosing a campaign", "Testing", "Writing a campaign report"] },
    ],
    assignments: [
      {
        title: "Analyse a sample campaign",
        brief: "Review a sample ad campaign dataset for a fictional gym and recommend what to change.",
        deliverable: "A campaign review with recommendations",
      },
    ],
    deliverables: ["A campaign plan", "A tracking plan", "A campaign review with recommendations"],
    level: "Beginner to intermediate",
    duration: "To be confirmed",
    effort: "To be confirmed",
    format: DEFAULT_FORMAT,
    prerequisites: ["Comfortable with spreadsheets", "SEO or Content basics recommended"],
    status: "upcoming",
    pricing: "Not announced yet.",
    certPlatforms: ["Google", "Meta", "LinkedIn"],
    accent: "#ff4d93",
    icon: "performance",
    faqs: [],
  },
  {
    slug: "analytics-growth-marketing",
    title: "Analytics and Growth Marketing",
    shortTitle: "Analytics and Growth",
    summary:
      "Learn to measure what marketing actually does for a business: analytics setup, funnels, experiments and the habits of data-led growth.",
    description: [
      "Every other program ends with measurement. This one makes it the main subject: setting up analytics properly, reading funnels, running fair experiments and turning numbers into decisions.",
      "It is planned for after the first launch. The curriculum below is a draft.",
    ],
    audience: [
      "Students who like numbers and want to apply them to marketing.",
      "Graduates aiming for marketing analyst or growth roles.",
      "Marketers who want to back their work with data.",
    ],
    skills: ["GA4 fundamentals", "Tag Manager basics", "Funnel analysis", "A/B testing", "Spreadsheet analysis", "Growth reporting"],
    outcomes: [
      "Set up and audit basic analytics for a website.",
      "Find where a funnel leaks and suggest fixes.",
      "Design an experiment that gives a trustworthy answer.",
    ],
    modules: [
      { title: "Metrics that matter", summary: "Choosing measures that reflect business outcomes.", topics: ["North-star metrics", "Leading and lagging indicators", "Vanity metrics"] },
      { title: "Analytics setup", summary: "GA4 and Tag Manager fundamentals.", topics: ["GA4 events", "Tag Manager", "Consent and privacy", "Auditing a setup"] },
      { title: "Funnels and cohorts", summary: "Where people drop off and who comes back.", topics: ["Funnel reports", "Cohorts", "Retention"] },
      { title: "Experiments", summary: "Testing ideas without fooling yourself.", topics: ["Hypotheses", "A/B testing basics", "Sample size", "Reading results"] },
      { title: "Growth reporting", summary: "Turning analysis into decisions people act on.", topics: ["Dashboards", "Narrative reports", "Recommendations"] },
    ],
    assignments: [
      {
        title: "Funnel analysis on sample data",
        brief: "Find where a sample online store loses visitors and propose three tests to fix it.",
        deliverable: "A funnel analysis with an experiment plan",
      },
    ],
    deliverables: ["An analytics audit", "A funnel analysis", "An experiment plan"],
    level: "Intermediate",
    duration: "To be confirmed",
    effort: "To be confirmed",
    format: DEFAULT_FORMAT,
    prerequisites: ["Comfortable with spreadsheets", "One other Academy program, or equivalent experience, recommended"],
    status: "upcoming",
    pricing: "Not announced yet.",
    certPlatforms: ["Google", "HubSpot", "LinkedIn"],
    accent: "#c9a100",
    icon: "analytics",
    faqs: [],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export const programPath = (p: Pick<Program, "slug">) => `/academy/programs/${p.slug}`;

/** Launch programs first (enrolling, then interest), later ones after. */
export const launchPrograms = programs.filter((p) => p.status !== "upcoming");
export const upcomingPrograms = programs.filter((p) => p.status === "upcoming");

/** Other programs to suggest on a detail page, launch programs first. */
export function relatedPrograms(slug: string, limit = 3): Program[] {
  return [...launchPrograms, ...upcomingPrograms].filter((p) => p.slug !== slug).slice(0, limit);
}

// ── Interest form ────────────────────────────────────────────────────────────

/** Education or career stage options. The API and the DB check accept only these. */
export const STAGES = [
  "In college",
  "Recent graduate",
  "Working, moving into marketing",
  "Freelancer or self-taught",
  "Other",
] as const;

export type Stage = (typeof STAGES)[number];

/** Analytics form_source for a program's interest form. */
export const academySource = (slug: string) => `academy-${slug}`;

// ── Landing and shared content ───────────────────────────────────────────────

export const LEARNING_LOOP = [
  {
    step: "Learn",
    text: "Understand the concept and study worked examples from real-world marketing.",
    example: "How search intent changes what a page should say.",
  },
  {
    step: "Execute",
    text: "Apply it to an assignment or a business brief, the way the work is done on the job.",
    example: "Map the intent behind 40 keywords for a sample clinic.",
  },
  {
    step: "Measure",
    text: "Check the work against data or a clear standard, find what is weak, and improve it.",
    example: "Compare your page plan against what already ranks.",
  },
  {
    step: "Prove",
    text: "Document the problem, your process and the result as a portfolio case study.",
    example: "A two-page case study you can walk an interviewer through.",
  },
] as const;

export const VALUE_PROPS = [
  {
    title: "Project-based learning",
    text: "Every module ends in something you make: an audit, a plan, a rewritten page. Theory only where it helps the work.",
  },
  {
    title: "Skills the industry uses",
    text: "SEO, content, AI and analytics taught the way a working agency practises them, with the tools teams actually use.",
  },
  {
    title: "Structured learning paths",
    text: "Clear modules in a sensible order, so you always know what to learn next and why it matters.",
  },
  {
    title: "A portfolio, not just notes",
    text: "You finish with case studies that show your thinking and your output, which says more than a list of courses.",
  },
  {
    title: "Feedback that improves the work",
    text: "Submitted assignments get written feedback, and you revise. Improving a piece of work is a skill in itself.",
  },
  {
    title: "Briefs modelled on real problems",
    text: "Assignments are built on the kinds of problems local businesses bring to an agency. They are sample briefs, not client work.",
  },
] as const;

export const OUTCOMES = [
  {
    title: "A practical marketing portfolio",
    text: "Case studies that document a problem, what you did and what you measured.",
  },
  {
    title: "Demonstrable SEO and content skills",
    text: "Audits, keyword maps and content plans you can show rather than describe.",
  },
  {
    title: "Experience analysing marketing data",
    text: "Comfort reading Search Console, analytics and campaign numbers and drawing conclusions from them.",
  },
  {
    title: "A clearer view of business growth",
    text: "How marketing connects to enquiries, sales and decisions a business owner actually makes.",
  },
  {
    title: "Preparation for entry-level and freelance work",
    text: "The vocabulary, habits and work samples that entry-level marketing roles and first freelance projects ask for, plus internships at Timewheel and our sister companies.",
  },
  {
    title: "Certificates to show for it",
    text: "A Timewheel certificate, and help completing online certifications from Google, Meta, HubSpot and LinkedIn.",
  },
] as const;

export const NO_PROMISES =
  "We do not guarantee jobs, income or search rankings. Nobody honestly can. What we can do is help you build skills, evidence of them, and a first step into the work through our internships.";

// ── Certificates and internships ─────────────────────────────────────────────
// Real offerings (confirmed by Timewheel, 2026-10-10). Online certifications are
// issued by the platforms themselves; we help students prepare and complete them.

export const CERTIFICATE_LINE = "Timewheel Digital Marketing Academy certificate on completion";

export const CAREER_SUPPORT = [
  {
    key: "certificate",
    title: "A Timewheel certificate",
    text: "Complete your program and receive a Timewheel Digital Marketing Academy certificate, backed by the portfolio work that shows what you learned.",
  },
  {
    key: "online",
    title: "Help with online certifications",
    text: "We guide you through preparing for and completing online certifications from Google, Meta, HubSpot and LinkedIn alongside your program. Those certificates are issued by the platforms themselves.",
  },
  {
    key: "internships",
    title: "Internships",
    text: "Internships in-house at Timewheel and at our sister companies, so you can put what you learned to work with a working team.",
  },
] as const;

// ── Sample projects ──────────────────────────────────────────────────────────

export type SampleProject = {
  slug: string;
  title: string;
  /** Two or three words, for the on-page index. */
  label: string;
  program: string; // program slug
  /** Who the brief is for. Always a sample or a public site, never a client. */
  setting: string;
  brief: string;
  tasks: string[];
  deliverable: string;
  skills: string[];
};

export const SAMPLE_PROJECT_NOTE =
  "These are sample exercises. The businesses in them are fictional, or are public websites you choose to study. None of this is client work for Timewheel or for the businesses named. Real client work happens in our internships.";

export const sampleProjects: SampleProject[] = [
  {
    slug: "seo-audit",
    title: "Conduct an SEO audit of a business website",
    label: "SEO audit",
    program: "seo",
    setting: "A public website of a local business you choose, or our practice site",
    brief:
      "Find what is stopping the site from being found: crawl problems, slow pages, weak titles, thin content, missing local signals. Then decide what to fix first.",
    tasks: ["Crawl the site and check indexing", "Review on-page basics on key pages", "Check speed and mobile usability", "Rank every issue by impact and effort"],
    deliverable: "A prioritised audit report with the top five fixes explained",
    skills: ["Technical SEO", "On-page SEO", "Prioritisation"],
  },
  {
    slug: "content-cluster",
    title: "Research keywords and develop a content cluster",
    label: "Content cluster",
    program: "seo",
    setting: "A fictional physiotherapy clinic that wants more appointment enquiries",
    brief:
      "Work out what patients search for before they book, group the searches by intent, and plan a pillar page with supporting articles that link together.",
    tasks: ["Collect and clean a keyword list", "Group keywords by intent", "Choose a pillar topic and supporting articles", "Plan the internal links between them"],
    deliverable: "A keyword map and a content cluster plan",
    skills: ["Keyword research", "Search intent", "Content planning"],
  },
  {
    slug: "content-calendar",
    title: "Create a 30-day content calendar",
    label: "30-day content calendar",
    program: "content-social-media-marketing",
    setting: "A fictional family bakery with two outlets and a small Instagram following",
    brief:
      "The bakery wants more weekday orders. Plan a month of content across Instagram and Google Business Profile that supports that goal.",
    tasks: ["Define the audience and content pillars", "Plan 30 days of posts by format and goal", "Write captions for the first week", "Pick the numbers that show it worked"],
    deliverable: "A content calendar with first-week captions and a measurement plan",
    skills: ["Content strategy", "Copywriting", "Planning"],
  },
  {
    slug: "landing-page-plan",
    title: "Design a landing-page optimization plan",
    label: "Landing-page plan",
    program: "content-social-media-marketing",
    setting: "A fictional coaching institute whose admissions page gets visits but few enquiries",
    brief:
      "Review the page as a visitor would, find where it loses people, and plan changes to the message, structure and form that you could test.",
    tasks: ["Review the page against the visitor's questions", "Rewrite the headline and key sections", "Simplify the enquiry form", "Plan an A/B test for the biggest change"],
    deliverable: "An annotated optimization plan with rewritten copy",
    skills: ["Conversion copy", "UX review", "Testing"],
  },
  {
    slug: "ai-workflow",
    title: "Develop an AI-assisted marketing workflow",
    label: "AI workflow",
    program: "ai-for-digital-marketing",
    setting: "A fictional handmade soap brand launching 20 new products",
    brief:
      "Product descriptions take the founder hours. Design a workflow where AI drafts them, a person checks every claim, and the brand voice stays consistent.",
    tasks: ["Map the current process", "Write and test prompts against a style guide", "Add a fact-check and approval step", "Measure time saved and errors caught"],
    deliverable: "A documented workflow with prompts, a fact-check log and results",
    skills: ["Prompting", "Workflow design", "Quality control"],
  },
  {
    slug: "campaign-analysis",
    title: "Analyse a sample marketing campaign and recommend improvements",
    label: "Campaign analysis",
    program: "performance-marketing",
    setting: "A sample dataset from a fictional gym's month-long lead campaign",
    brief:
      "The campaign spent its budget but the gym says the leads were poor. Dig into the numbers, find out why, and recommend what to change.",
    tasks: ["Clean and summarise the campaign data", "Compare audiences, ads and placements", "Check whether tracking can be trusted", "Write three prioritised recommendations"],
    deliverable: "A one-page campaign review with recommendations",
    skills: ["Data analysis", "Campaign diagnosis", "Reporting"],
  },
];

// ── FAQ (/academy/faq) ───────────────────────────────────────────────────────

export const academyFaqs: Faq[] = [
  {
    q: "Who is the Timewheel Digital Marketing Academy for?",
    a: "College students, fresh graduates and beginners who want to become digital marketers, especially in SEO, content, AI-assisted marketing and growth. No marketing background is needed for the launch programs.",
  },
  {
    q: "Is the Academy open for enrollment now?",
    a: "Not yet. We are planning the first cohort of the SEO, Content and Social Media, and AI for Digital Marketing programs. Register your interest and we will email you the dates, format and fees before anyone is asked to commit or pay.",
  },
  {
    q: "How much will the programs cost?",
    a: "Fees have not been set yet. They will be announced with the first cohort. Registering interest is free and does not commit you to anything.",
  },
  {
    q: "Do I need any experience?",
    a: "No. The SEO and Content programs start from the basics. You need to be comfortable with a laptop, a browser and Google Sheets, and willing to do weekly assignments.",
  },
  {
    q: "Is it online or in person?",
    a: "The first cohort is being planned as online so students can join from anywhere. Timewheel is based in Nagpur; if we add in-person sessions, the program page will say so.",
  },
  {
    q: "Will I work on real client projects?",
    a: "Not in the program assignments. They use sample briefs for fictional businesses, practice websites, or public websites you choose to study, and are clearly labelled as exercises. Real work happens in our internships, in-house at Timewheel and at our sister companies.",
  },
  {
    q: "Do you offer internships?",
    a: "Yes. We offer internships in-house at Timewheel and at our sister companies. They are a chance to put what you learned to work with a working team, on top of the portfolio you build in the program.",
  },
  {
    q: "Will the Academy get me a job?",
    a: "We do not guarantee jobs or income. The programs are designed to help you build real skills, a portfolio that shows them and internship experience, which is what entry-level roles and freelance clients tend to ask for. Open roles at Timewheel are always listed on our careers page.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. You receive a Timewheel Digital Marketing Academy certificate when you complete your program. Your portfolio of case studies and work samples sits alongside it as proof of what you can do.",
  },
  {
    q: "Can you help me get Google, Meta, HubSpot or LinkedIn certifications?",
    a: "Yes. We help you prepare for and complete online certifications from Google, Meta, HubSpot and LinkedIn, and each program page lists the platforms most relevant to it. Those certificates are issued by the platforms themselves, and some may have their own requirements or exam fees set by the platform.",
  },
  {
    q: "Which program should I start with?",
    a: "If you are new to marketing, start with SEO or Content and Social Media Marketing. AI for Digital Marketing works best once you know the basics of one of them, though it is not required.",
  },
  {
    q: "Can I register interest in more than one program?",
    a: "Yes. Register once for each program you are interested in. We only keep one registration per program for each email address.",
  },
  {
    q: "What happens after I register interest?",
    a: "You get a confirmation email. When cohort details are ready, we email you with the dates, format and fees. You decide then whether to join.",
  },
  {
    q: "How is my information used?",
    a: "Only to contact you about the Academy. We do not sell or share it, and it is never shown publicly. Email team@timewheel.co.in to have it deleted at any time.",
  },
];
