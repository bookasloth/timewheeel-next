// Content for /social-media-marketing-company-in-nagpur.
// Blueprint-style service page following the existing lib/<service>.ts pattern.
// Everything here is Timewheel capability copy; no fabricated stats, clients,
// testimonials, case studies or awards are claimed anywhere on the page.
import {
  CalendarCheck,
  ChartBar,
  ChatCircle,
  Compass,
  ImageSquare,
  Megaphone,
  Strategy,
  Target,
  TextAa,
} from "@phosphor-icons/react/dist/ssr";

// Rotating multi-hue palette layered across the page (blue stays dominant).
const B = "#2563eb"; // brand blue
const V = "#7c3aed"; // violet
const P = "#ff4d93"; // pink
const O = "#f45b0a"; // orange
const Y = "#ffcc1c"; // honey
const G = "#29a66f"; // green
const T = "#14b8a6"; // teal

export const smm = {
  meta: {
    title: "Social Media Marketing Company in India | Timewheel",
    description:
      "Social media marketing company in India, strategy, content, creative, community and paid social under one roof. One consistent brand voice, clear reporting and honest timelines.",
  },

  hero: {
    eyebrow: "Social Media Marketing",
    h1a: "Social media that builds",
    h1b: "brands",
    h1c: "people remember.",
    sub: "Timewheel plans, creates and runs social media that earns attention and turns it into trust. Strategy, content, creative, community and performance, one consistent brand voice across every platform that matters to you.",
    primaryCta: { label: "Let's Talk", href: "#contact" },
    secondaryCta: { label: "See What We Do", href: "#services" },
    trustLine: "Strategy-led · Platform-specific · Clear monthly reporting",
  },

  intro: {
    eyebrow: "Why it works",
    heading: "Posting is easy. Building a presence is not.",
    body: "Most brands post because they feel they should. Timewheel treats social media as a discipline: a clear strategy, a defined position, and content engineered to serve a business goal, not just to fill a feed.",
    pillars: [
      { title: "Strategy first", note: "A channel plan before any content is made", tone: B },
      { title: "Positioning", note: "A clear point of view your audience can remember", tone: V },
      { title: "Consistency", note: "One voice, one look, across every profile", tone: P },
      { title: "Audience understanding", note: "Content built around real people, not guesses", tone: Y },
      { title: "Creative storytelling", note: "Design and copy that work as one", tone: O },
      { title: "Platform-specific", note: "Shaped for how each platform actually works", tone: G },
      { title: "Measurable goals", note: "Every post pointed at a business outcome", tone: T },
    ],
  },

  services: {
    label: "What we do",
    heading: "The complete social media capability, under one roof.",
    body: "From strategy to reporting, every piece of your social presence is designed to work together toward one measurable goal, instead of a handful of disconnected one-off posts.",
    items: [
      {
        icon: Strategy,
        title: "Social Media Strategy",
        body: "Audience research, positioning and a channel plan that aligns social media with your real business goals.",
        tone: B,
      },
      {
        icon: Compass,
        title: "Content Strategy",
        body: "A content roadmap that decides what to say, to whom, and in what order, so every post has a job to do.",
        tone: V,
      },
      {
        icon: CalendarCheck,
        title: "Social Media Management",
        body: "Day-to-day management of your profiles, publishing, scheduling, bios, highlights and platform upkeep.",
        tone: P,
      },
      {
        icon: ImageSquare,
        title: "Creative & Visual Content",
        body: "Design-led posts, reels, carousels and stories built on templates your brand owns and can reuse.",
        tone: O,
      },
      {
        icon: TextAa,
        title: "Copywriting",
        body: "On-voice captions, hooks and scripts written for each platform, never copy-pasted across all of them.",
        tone: Y,
      },
      {
        icon: ChatCircle,
        title: "Community Management",
        body: "Comments, DMs and mentions handled with care, so your audience always gets a response, not silence.",
        tone: G,
      },
      {
        icon: Megaphone,
        title: "Campaign Management",
        body: "Integrated campaigns around launches, offers and events, coordinated across every active channel.",
        tone: T,
      },
      {
        icon: Target,
        title: "Social Media Advertising",
        body: "Paid placements on the platforms that matter, audiences built on real data and budgets kept honest.",
        tone: B,
      },
      {
        icon: ChartBar,
        title: "Analytics & Reporting",
        body: "Monthly scorecards that show reach, engagement and what it actually earned your business.",
        tone: V,
      },
    ],
  },

  platforms: {
    label: "Platform expertise",
    heading: "We go deeper than one feed at a time.",
    body: "Each platform rewards a different way of thinking. We recommend where your audience actually shows up, and would rather run fewer platforms well than a presence everywhere, half-heartedly.",
    items: [
      { name: "Instagram", note: "Reels, Stories and feed for brands that build visual trust.", tone: "#ff4d93", chip: "linear-gradient(135deg, #f9ce34 0%, #ff4d93 45%, #fe5100 100%)" },
      { name: "Facebook", note: "Community and conversation for local and service businesses.", tone: "#3987c9", chip: "#1877f2" },
      { name: "LinkedIn", note: "Authority and lead generation for B2B and professional brands.", tone: "#0a66c2", chip: "#0a66c2" },
      { name: "YouTube", note: "Long-form and Shorts for brands that sell by demonstrating.", tone: "#ff2d2d", chip: "#ff0000" },
      { name: "X", note: "Real-time conversation and thought leadership, newsroom style.", tone: "#171717", chip: "#171717" },
    ],
  },

  approach: {
    label: "Our approach",
    heading: "Six steps from first conversation to consistent growth.",
    body: "A repeatable system, so the second month is stronger than the first, and the sixth stronger still.",
    steps: [
      { title: "Discover", body: "Understand the brand, its audience and the business goals social exists to serve.", tone: B },
      { title: "Strategize", body: "Build the channel plan, positioning and content direction, in writing.", tone: V },
      { title: "Create", body: "Design and write platform-specific content that reflects the brand.", tone: P },
      { title: "Publish", body: "Maintain a consistent rhythm your audience can rely on.", tone: O },
      { title: "Engage", body: "Manage the conversations and grow a community around the brand.", tone: G },
      { title: "Optimize", body: "Use performance data to keep improving what works and cutting what doesn't.", tone: Y },
    ],
  },

  why: {
    label: "Why Timewheel",
    heading: "A social partner, not just another poster.",
    body: "Lots of people can schedule posts. Very few build a presence that compounds. This is how we think about the work.",
    points: [
      { title: "Strategy before content", body: "We decide why before we decide what. Every post has a purpose connected to a business goal.", tone: B },
      { title: "Brand consistency", body: "One voice and one visual language across every platform, no scattered, disconnected profiles.", tone: P },
      { title: "Platform-specific thinking", body: "Content shaped for how each platform actually works, not duplicated across all of them.", tone: Y },
      { title: "Creative backed by purpose", body: "Design and copy exist to serve the strategy, not to decorate it.", tone: G },
      { title: "Transparent communication", body: "Regular check-ins and clear reporting, you always know what we did and why.", tone: V },
      { title: "Continuous optimization", body: "We test, measure and improve, so performance compounds month after month.", tone: T },
    ],
  },

  contentPurpose: {
    label: "Content with a purpose",
    heading: "Every piece of content we make has a job.",
    body: "Not filler, not noise. Content is built around the outcome it exists to create.",
    items: [
      { title: "Build Awareness", body: "Make your brand discoverable to the right people, on the platforms they already trust.", tone: B },
      { title: "Build Trust", body: "Demonstrate expertise and consistency until your brand becomes the obvious choice.", tone: P },
      { title: "Create Engagement", body: "Give your audience reasons to interact, respond and come back.", tone: Y },
      { title: "Drive Action", body: "Turn attention into enquiries, visits and purchases, pointed at a clear outcome.", tone: G },
    ],
  },

  workflow: {
    label: "How an engagement runs",
    heading: "A working rhythm, not a one-off project.",
    body: "From research to reporting, this is the system behind every Timewheel social media engagement.",
    steps: [
      { title: "Research", body: "Brand, audience and competitor landscape understood before anything is made.", tone: B },
      { title: "Strategy", body: "Channels, positioning and goals agreed, in writing.", tone: V },
      { title: "Content Planning", body: "Editorial calendars that keep every post purposeful and on time.", tone: P },
      { title: "Creative Production", body: "Design and copy produced for each platform's format.", tone: O },
      { title: "Publishing", body: "Consistent scheduling across every active profile.", tone: Y },
      { title: "Community", body: "Comments, DMs and mentions handled every day.", tone: G },
      { title: "Analytics", body: "Reach, engagement and conversions tracked against the plan.", tone: T },
      { title: "Optimization", body: "Insights feed back into the next cycle, every month.", tone: B },
    ],
  },

  faq: [
    {
      q: "What does your social media marketing service include?",
      a: "Strategy, content planning, creative and copy, publishing, community management and monthly reporting. Social advertising is available as an add-on. Each engagement is scoped to what your business actually needs, so nothing is ever just 'posting for the sake of it'.",
      tone: B,
    },
    {
      q: "Which social media platforms do you manage?",
      a: "Instagram, Facebook, LinkedIn, YouTube and X. We recommend the platforms that matter for your audience and goals, and we'd rather run fewer platforms well than a presence everywhere, half-heartedly.",
      tone: V,
    },
    {
      q: "Do you create social media content?",
      a: "Yes, design and copywriting are part of the service. We build templates your brand owns, so content stays consistent and reusable, not a one-off batch of posts that ends the week it starts.",
      tone: P,
    },
    {
      q: "Can you manage our entire social media presence?",
      a: "Yes. We can run the full presence, or handle specific platforms while your team keeps the rest, depending on your needs and budget.",
      tone: O,
    },
    {
      q: "Do you provide social media advertising?",
      a: "Yes, paid campaigns are available as an add-on to organic management. Targeting is built from real audience data, budgets stay transparent, and you always know what each rupee is doing.",
      tone: Y,
    },
    {
      q: "How do you measure social media performance?",
      a: "Reach, engagement and audience growth measure the attention; enquiries, traffic and sales measure the value. You get a clear monthly scorecard of both, not a wall of vanity numbers.",
      tone: G,
    },
    {
      q: "Can you create a custom social media strategy?",
      a: "Yes, every engagement starts with one. We research your brand, audience and competitors first, then put a written plan in front of you before any content is produced.",
      tone: T,
    },
    {
      q: "How soon will we see results?",
      a: "Social media compounds. Expect strong foundations in the first month, growing engagement and reach from the second, and results that keep building as your content library, community and data mature.",
      tone: B,
    },
  ],

  finalCta: {
    heading: "Ready to Build a Stronger Social Presence?",
    body: "Let's create a social media strategy that gives your brand something worth following.",
    primaryCta: { label: "Let's Talk", href: "#contact" },
    secondaryCta: { label: "Book a Meeting" },
  },

  serviceOptions: [
    "Social Media Strategy",
    "Social Media Management",
    "Content & Creative",
    "Social Media Advertising",
    "Community Management",
    "Analytics & Reporting",
    "Not sure yet",
  ],
};