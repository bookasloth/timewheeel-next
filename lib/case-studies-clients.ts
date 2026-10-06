// Case studies for the live client sites in lib/client-sites.ts, kept separate
// from the product-ecosystem entries (lib/case-studies-products.ts) and the
// client-work placeholders in lib/case-studies.ts.
//
// Names, categories, accents, live URLs and descriptions are taken verbatim from
// lib/client-sites.ts, which is the single source of truth for this list. These
// are real, reachable client websites.
//
// As with the product entries, there are NO performance stats, no client quotes
// and no invented budgets or durations. The source material is one factual
// sentence per client, so each case study stays at the length the evidence
// supports rather than padding into claims. Add real metrics if you have them.
import type { CaseStudy } from "./case-studies";

export const clientSiteCaseStudies: CaseStudy[] = [
  {
    slug: "dru-foundation",
    name: "DRU Foundation",
    tagline: "An NGO site that makes its work findable",
    category: "NGO",
    summary:
      "Mumbai NGO founded in 2022, empowering underprivileged women through skills, education, food support and self-help groups.",
    accent: "#47143D",
    image: {
      src: "/portfolio/DRU Foundation Women Empowerment Poster.png",
      width: 1200,
      height: 675,
    },
    tags: ["NGO", "Web Design", "Nonprofit"],
    href: "/case-studies/dru-foundation",
    liveUrl: "https://drufoundation.org/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "A foundation site that",
        titleAccent: "explains the work clearly.",
        summary:
          "DRU Foundation empowers underprivileged women through skills, education, food support and self-help groups. The site has to carry four distinct programmes and still be usable by someone arriving on a phone, mid-crisis.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Four programmes, one audience in a hurry.",
          body: "An NGO website has a specific job: explain what you do well enough that a visitor understands it, and well enough that a donor, volunteer or prospective participant can act. DRU's work spans skills, education, food support and self-help groups, which is four different stories rather than one.",
          bullets: [
            "Each programme needs its own explanation, not a merged summary",
            "Volunteers, donors and participants arrive with different questions",
            "A large share of visitors will be on a phone, often on a slow connection",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Clear structure, fast pages, honest scope.",
          body: "We kept the page architecture close to how the organisation actually talks about its work, gave each programme a plain-language section, and kept the build light so the site loads quickly on the connections its audience tends to have.",
          bullets: [
            "One clear section per programme, written in plain language",
            "Distinct calls to action for volunteering, donating and participating",
            "Lightweight build tuned for mobile and low bandwidth",
          ],
        },
      ],
      closing: {
        title: "Working with an NGO?",
        body: "We build sites that explain the work and convert attention into volunteers and donors. Tell us what your organisation does.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does DRU Foundation do?",
        a: "It's a Mumbai NGO founded in 2022 that empowers underprivileged women through skills, education, food support and self-help groups.",
      },
      {
        q: "What did we build?",
        a: "The foundation's website, structured around its four programmes and designed to work on mobile and low-bandwidth connections.",
      },
    ],
  },
  {
    slug: "eureka-coworking",
    name: "Eureka Coworking",
    tagline: "A coworking brand built to convert enquiries",
    category: "Coworking",
    summary:
      "Flexible workspace brand in Nagpur and Pune, offering hot desks, dedicated desks, private cabins and meeting rooms.",
    accent: "#7c4dff",
    image: {
      src: "/portfolio/Eureka Coworking_ Good People, Better Ideas.png",
      width: 1200,
      height: 675,
    },
    tags: ["Coworking", "Web Design", "Local SEO"],
    href: "/case-studies/eureka-coworking",
    liveUrl: "https://eurekacoworking.in/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "Coworking space, sold",
        titleAccent: "on the facts that matter.",
        summary:
          "Eureka Coworking runs flexible workspace in Nagpur and Pune across hot desks, dedicated desks, private cabins and meeting rooms. Someone researching a desk has four different budgets in mind and needs to tell them apart fast.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Four products, one enquiry form.",
          body: "Hot desks, dedicated desks, private cabins and meeting rooms are different products with different decision-makers and different objections. A visitor who wants a single cabin for four people is not the same as someone who wants a desk for the day, and the page has to keep them distinguishable.",
          bullets: [
            "Four distinct offerings that shouldn't blur into one another",
            "Location matters more than branding, since the buyer is nearby",
            "Price and availability questions need an obvious path to ask",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Let the visitor self-select.",
          body: "We structured the site so each product has its own clear section with its own enquiry path, and made the two-city presence obvious from the top. Someone already searching for coworking in Nagpur should reach the right location without digging.",
          bullets: [
            "A distinct section per offering, each with its own enquiry path",
            "Nagpur and Pune presented clearly rather than merged",
            "Direct contact routes for pricing and availability questions",
          ],
        },
      ],
      closing: {
        title: "Running a local business with a website that doesn't get calls?",
        body: "Tell us what you sell and who buys it, and we'll show you what the page should say.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What is Eureka Coworking?",
        a: "A flexible workspace brand in Nagpur and Pune offering hot desks, dedicated desks, private cabins and meeting rooms.",
      },
      {
        q: "What did we build?",
        a: "Their website, structured so each offering and each location has its own clear section and enquiry path.",
      },
    ],
  },
  {
    slug: "rising-sun-electric",
    name: "Rising Sun Electric",
    tagline: "Solar EPC, explained without the jargon",
    category: "Solar EPC",
    summary:
      "Mumbai solar company delivering residential, commercial and industrial systems with end-to-end EPC and subsidy support.",
    accent: "#ff7a3d",
    image: {
      src: "/portfolio/rising-sun.png",
      width: 1200,
      height: 675,
    },
    tags: ["Solar", "EPC", "Web Design"],
    href: "/case-studies/rising-sun-electric",
    liveUrl: "https://solarrse.com/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "A solar company that explains",
        titleAccent: "subsidy, clearly.",
        summary:
          "Rising Sun Electric delivers residential, commercial and industrial solar with end-to-end EPC and subsidy support. The hardest part of a solar website is not selling panels, it's making the subsidy process feel navigable.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "The subsidy is the whole question.",
          body: "Most solar enquiries are not asking about panels. They are asking whether they qualify, what it costs after subsidy, and how long it takes. A site that buries that answers a question the visitor arrived with, and they leave to ask a competitor instead.",
          bullets: [
            "Three very different buyers: residential, commercial, industrial",
            "Subsidy eligibility is the first real question, not a footnote",
            "End-to-end EPC needs explaining, since most buyers don't know what it means",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Answer the qualification question first.",
          body: "We led with the subsidy path and split the three segments so a homeowner and a factory owner each land on relevant material. End-to-end EPC is presented as the process it is, so the buyer knows exactly who is handling what.",
          bullets: [
            "Subsidy eligibility and process surfaced early, not buried",
            "Residential, commercial and industrial handled as distinct journeys",
            "End-to-end EPC explained as a staged process",
          ],
        },
      ],
      closing: {
        title: "Selling something people need explained to them?",
        body: "Tell us what your customers misunderstand most, and we'll show you a page that answers it.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Rising Sun Electric do?",
        a: "It's a Mumbai solar company delivering residential, commercial and industrial systems with end-to-end EPC and subsidy support.",
      },
      {
        q: "What did we build?",
        a: "Their website, with subsidy eligibility addressed up front and residential, commercial and industrial enquiries handled as separate journeys.",
      },
    ],
  },
  {
    slug: "wecos",
    name: "WeCos",
    tagline: "Seven services, one front door",
    category: "Startup Services",
    summary:
      "One-stop startup support covering technology, marketing, hiring, compliance, accounting, funding and operations.",
    accent: "#269cef",
    image: {
      src: "/portfolio/wecos.png",
      width: 1200,
      height: 675,
    },
    tags: ["Startup", "Web Design", "Services"],
    href: "/case-studies/wecos",
    liveUrl: "https://wecos.online/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "One-stop, without",
        titleAccent: "reading like a list.",
        summary:
          "WeCos covers technology, marketing, hiring, compliance, accounting, funding and operations for startups. Seven services is a real advantage and also a navigation problem, because a founder usually needs one or two of them, not all seven.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Seven services compete for one homepage.",
          body: "A founder arriving at WeCos usually has a specific, urgent gap, not a shopping list. If all seven services get equal weight on one page, none of them is the obvious next step and the visitor bounces to pick a specialist for the one thing they need.",
          bullets: [
            "Technology, marketing, hiring, compliance, accounting, funding, operations",
            "Visitors typically arrive with one urgent gap, not seven needs",
            "Risk of looking like a directory of services rather than a partner",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Let people self-select, then look like one team.",
          body: "We gave each service enough detail to be chosen confidently, while keeping a single through-line so the offer still reads as one company rather than seven vendors. The breadth is the pitch; the structure is what makes it usable.",
          bullets: [
            "Each service explained well enough to choose confidently",
            "A single through-line so the offer still reads as one company",
            "Clear next step for founders arriving with a specific gap",
          ],
        },
      ],
      closing: {
        title: "Offering a lot of services?",
        body: "Tell us what you sell and we'll show you how to make it navigable without diluting it.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does WeCos do?",
        a: "One-stop startup support covering technology, marketing, hiring, compliance, accounting, funding and operations.",
      },
      {
        q: "What did we build?",
        a: "Their website, giving each of the seven services enough detail to be chosen confidently while keeping the offer readable as one company.",
      },
    ],
  },
  {
    slug: "shubham-datarkar",
    name: "Shubham Datarkar",
    tagline: "Turning a consultant into a product business",
    category: "Personal Brand",
    summary:
      "Founder-led brand site for an SEO, AEO and GEO consultant, packaging productised engagements and case studies.",
    accent: "#35c98a",
    image: {
      src: "/portfolio/shubham-datarkar.png",
      width: 1200,
      height: 675,
    },
    tags: ["Personal Brand", "SEO", "Web Design"],
    href: "/case-studies/shubham-datarkar",
    liveUrl: "https://shubhamdatarkar.com/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "A consultant who sells",
        titleAccent: "outcomes, not hours.",
        summary:
          "Shubham Datarkar consults on SEO, AEO and GEO. The site needed to package that expertise as productised engagements rather than hourly advice, and give the work somewhere to be shown.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Expertise has to become a product.",
          body: "A personal brand for a consultant has one job: convert a reputation into a pipeline. That means selling a defined engagement with a clear outcome, because a buyer comparing consultants cannot compare 'advice'. It also means the past work has to be visible as proof, not implied.",
          bullets: [
            "SEO, AEO and GEO is a wide brief that needs narrowing for buyers",
            "Hourly positioning invites price comparison; outcomes avoid it",
            "Case studies are the proof layer a personal brand cannot do without",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Defined engagements, visible proof.",
          body: "We built the site around productised engagements, each with a stated outcome, and gave the case studies a proper home so the work speaks for itself. The founder's authority is the hook; the packaging is what makes it buyable.",
          bullets: [
            "Productised engagements, each with a clear stated outcome",
            "A dedicated home for case studies as the proof layer",
            "Founder-led positioning that leads with credibility, not agency language",
          ],
        },
      ],
      closing: {
        title: "Selling your expertise?",
        body: "Tell us what you do and we'll show you how to package it as something a buyer can actually purchase.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "Who is Shubham Datarkar?",
        a: "A consultant specialising in SEO, AEO and GEO. The site packages that expertise as productised engagements alongside case studies.",
      },
      {
        q: "What did we build?",
        a: "A founder-led brand site built around productised engagements with defined outcomes, and a dedicated section for case studies.",
      },
    ],
  },
  {
    slug: "adetc-studios",
    name: "AdEtc Studios",
    tagline: "A production studio showing the work, not the studio",
    category: "Production Studio",
    summary:
      "Ahmedabad film studio delivering ad films, TV commercials, brand films and documentaries with in-house post-production.",
    accent: "#7c4dff",
    image: {
      src: "/portfolio/adetc-studios.png",
      width: 1200,
      height: 675,
    },
    tags: ["Video", "Production Studio", "Web Design"],
    href: "/case-studies/adetc-studios",
    liveUrl: "https://adetcstudios.com/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "A studio site where",
        titleAccent: "the work does the selling.",
        summary:
          "AdEtc Studios is an Ahmedabad film studio producing ad films, TV commercials, brand films and documentaries, with post-production in house. For a production company, the reel is the pitch.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Nobody hires a studio from a description.",
          body: "A production buyer is choosing on evidence of quality, and quality is visual. That puts an unusual constraint on the site: the structure is less important than making the work fast to reach and easy to judge, on whatever device the reel happens to open on.",
          bullets: [
            "The work has to be the first thing a visitor experiences",
            "Four distinct output types: ads, TV commercials, brand films, documentaries",
            "In-house post-production is a genuine differentiator worth stating",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Route by format, lead with the reel.",
          body: "We led with the work and split the portfolio by output type, so a buyer looking for a TV commercial is not scrolling past documentary work. Post-production being in house is called out plainly, because that's the part competitors outsource.",
          bullets: [
            "Portfolio leads the page, split by output type",
            "Ad films, TV commercials, brand films and documentaries each navigable",
            "In-house post-production called out as a differentiator",
          ],
        },
      ],
      closing: {
        title: "Studio, agency or production house?",
        body: "Tell us what you make and we'll show you a site that lets the work sell for you.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does AdEtc Studios do?",
        a: "It's an Ahmedabad film studio delivering ad films, TV commercials, brand films and documentaries, with in-house post-production.",
      },
      {
        q: "What did we build?",
        a: "Their website, leading with the portfolio and splitting the work by output type so buyers reach relevant films quickly.",
      },
    ],
  },
  {
    slug: "power-consilium",
    name: "Power Consilium",
    tagline: "A pan-India UPS supplier, reachable",
    category: "Power Systems",
    summary:
      "Pan-India UPS provider offering annual maintenance contracts, rental, multi-brand supply and battery replacement.",
    accent: "#ff7a3d",
    image: {
      src: "/portfolio/power-consilium.png",
      width: 1200,
      height: 675,
    },
    tags: ["Power Systems", "Web Design", "B2B"],
    href: "/case-studies/power-consilium",
    liveUrl: "https://power-consilium.com/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "Four different services,",
        titleAccent: "four different buyers.",
        summary:
          "Power Consilium supplies and services UPS systems pan-India: annual maintenance contracts, rental, multi-brand supply and battery replacement. Each is a separate purchase decision with a different urgency.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "An AMC and a battery are not the same enquiry.",
          body: "Annual maintenance contracts are a planned, recurring relationship. Battery replacement is usually urgent and often unplanned. Rental is a cash-flow decision. Supply is a specification exercise. A site that treats them as one list makes the urgent buyer work to be found.",
          bullets: [
            "AMCs, rental, supply and battery replacement are distinct decisions",
            "Urgency varies from planned spend to an emergency replacement",
            "Pan-India reach means the site has to work for a national customer base",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Route each service to its own conversation.",
          body: "We separated the four services so each has a clear explanation and its own contact path, and made national coverage evident for buyers who are not local.",
          bullets: [
            "A distinct section and enquiry path per service line",
            "National coverage made explicit for non-local buyers",
            "Plain language for service contracts and battery replacement",
          ],
        },
      ],
      closing: {
        title: "Serving customers across India?",
        body: "Tell us what you sell and who buys it, and we'll show you what the page should say.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Power Consilium do?",
        a: "It's a pan-India UPS provider offering annual maintenance contracts, rental, multi-brand supply and battery replacement.",
      },
      {
        q: "What did we build?",
        a: "Their website, with each of the four service lines given its own section and enquiry path, and national coverage made explicit.",
      },
    ],
  },
  {
    slug: "ashlar-studio",
    name: "Ashlar Studio",
    tagline: "Architecture work needs room on the page",
    category: "Architecture",
    summary:
      "Architecture and interior design studio presenting residential and commercial design work and project enquiries.",
    accent: "#35c98a",
    image: {
      src: "/portfolio/Ashlar-Studios.png",
      width: 1200,
      height: 675,
    },
    tags: ["Architecture", "Portfolio", "Web Design"],
    href: "/case-studies/ashlar-studio",
    liveUrl: "https://ashlar-studio.vercel.app/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "A portfolio that",
        titleAccent: "stays out of the way.",
        summary:
          "Ashlar Studio presents residential and commercial architecture and interior design work, and takes project enquiries. For a design practice, the presentation of the work is most of the argument.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "The site should not upstage the buildings.",
          body: "Design buyers are unusually sensitive to visual noise, because a cluttered page reads as an unconsidered practice. The work needs enough space to be judged properly, which tends to mean fewer effects, larger images, and typography that stays quiet.",
          bullets: [
            "Residential and commercial work need to be distinguishable",
            "Visual restraint matters more to this audience than in most industries",
            "Project enquiries have to be reachable without interrupting the work",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Space, hierarchy, restraint.",
          body: "We built around a portfolio that gives each project room, separates residential from commercial work, and keeps the enquiry path present without competing with the images.",
          bullets: [
            "Room-first project presentation, minimal chrome",
            "Residential and commercial work clearly separated",
            "Enquiry path available without pulling focus from the portfolio",
          ],
        },
      ],
      closing: {
        title: "Studio, practice or practice-with-a-brand?",
        body: "Tell us how you want to be perceived, and we'll show you how to make the site say it.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Ashlar Studio do?",
        a: "It's an architecture and interior design studio presenting residential and commercial design work and taking project enquiries.",
      },
      {
        q: "What did we build?",
        a: "Their website: a room-first portfolio presentation with residential and commercial work separated and a restrained visual treatment.",
      },
    ],
  },
  {
    slug: "alpha-adventures",
    name: "Alpha Adventures",
    tagline: "Selling a trek in a scrolling feed",
    category: "Travel & Adventure",
    summary:
      "Adventure operator running curated Sahyadri, Himalayan and Central India treks, fort cabins and camping.",
    accent: "#47143D",
    image: {
      src: "/portfolio/alpha-adventures.png",
      width: 1200,
      height: 675,
    },
    tags: ["Travel", "Adventure", "Web Design"],
    href: "/case-studies/alpha-adventures",
    liveUrl: "https://alphaadventures.in/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "Adventure sells on",
        titleAccent: "feeling, then logistics.",
        summary:
          "Alpha Adventures runs curated Sahyadri, Himalayan and Central India treks, plus fort cabins and camping. The emotional pitch and the practical details are doing very different jobs, and the page has to do both.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "Two audiences in one decision.",
          body: "Nobody books a Himalayan trek because of a spec sheet, but everybody needs one. The page has to create the pull first, then answer the questions that actually stop people booking: difficulty, season, what's included, and whether they can do it.",
          bullets: [
            "Sahyadri, Himalayan and Central India are very different trips",
            "Fort cabins and camping are a separate purchase from a trek",
            "Emotion sells it, logistics close it, and they arrive in that order",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Lead with the trip, back it with detail.",
          body: "We structured it so the character of each trip is felt first, with the practical detail one step away rather than buried in a single dense page. Itinerary and difficulty information stay close to the itinerary they belong to.",
          bullets: [
            "Each region and trip given its own distinct treatment",
            "Practical detail placed next to the trip it describes, not separated",
            "Cabins and camping presented as their own bookable options",
          ],
          // Screenshots live in /public/case-studies/alpha-adventures/. The
          // section renders only once both files exist on disk, so it is safe
          // to leave this in place while they are still being captured.
          comparison: {
            before: {
              src: "/case-studies/alpha-adventures/before.jpg",
              alt: "Alpha Adventures website before the redesign",
            },
            after: {
              src: "/case-studies/alpha-adventures/after.png",
              alt: "Alpha Adventures website after the redesign",
            },
            beforeLabel: "Before",
            afterLabel: "After",
            // Matches the 1905x932 capture, so neither side is cropped.
            aspect: "1905/932",
            caption:
              "Drag the handle: the same treks, led with the trip instead of the spec sheet.",
          },
        },
      ],
      closing: {
        title: "Running trips or tours?",
        body: "Tell us what you sell and we'll show you how to sell the feeling and the logistics at the same time.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Alpha Adventures do?",
        a: "It's an adventure operator running curated Sahyadri, Himalayan and Central India treks, along with fort cabins and camping.",
      },
      {
        q: "What did we build?",
        a: "Their website, leading with the character of each trip while keeping difficulty, itinerary and seasonal detail close to the trip it applies to.",
      },
    ],
  },
  {
    slug: "edulocus",
    name: "Edulocus",
    tagline: "Guiding a student through a decision that lasts years",
    category: "Education",
    summary:
      "Nagpur education consultancy offering career counselling, college planning and study-abroad guidance for MBBS students.",
    accent: "#7c4dff",
    image: {
      src: "/portfolio/edulocus-thmb.png",
      width: 1200,
      height: 675,
    },
    tags: ["Education", "Consulting", "Web Design"],
    href: "/case-studies/edulocus",
    liveUrl: "https://edulocus.vercel.app/",
    meta: { readTime: "2 min", services: ["Web Design", "Development"] },
    content: {
      hero: {
        title: "Advice for a decision",
        titleAccent: "a student has to live with.",
        summary:
          "Edulocus is a Nagpur education consultancy offering career counselling, college planning and study-abroad guidance for MBBS students. The audience is often deciding under pressure, and often with parents.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      sections: [
        {
          eyebrow: "The Brief",
          title: "One visitor, two decision-makers.",
          body: "An MBBS student researching study abroad is usually not the only reader. Parents are, and they are weighing different things: cost, recognition and safety, against what the student is optimising for, which is usually fit. Guidance that ignores half the audience only convinces half the audience.",
          bullets: [
            "Students and parents weigh the same decision differently",
            "Career counselling, college planning and study-abroad guidance are distinct services",
            "High-stakes, often time-pressured decisions for the family",
          ],
        },
        {
          eyebrow: "The Build",
          title: "Credibility for the student, clarity for the parent.",
          body: "We separated the three services so each is clearly explained, and wrote the content to address the practical questions parents raise alongside the aspirational ones students care about.",
          bullets: [
            "Career counselling, college planning and study-abroad guidance separated",
            "Content written for both the student and the parent",
            "Clear next step for a high-stakes, time-sensitive enquiry",
          ],
        },
      ],
      closing: {
        title: "Education consultancy or practice?",
        body: "Tell us who you're speaking to and we'll show you how to reach both halves of that audience.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Edulocus do?",
        a: "It's a Nagpur education consultancy offering career counselling, college planning and study-abroad guidance for MBBS students.",
      },
      {
        q: "What did we build?",
        a: "Their website, separating the three services and writing content that addresses both the student and the parent in the same decision.",
      },
    ],
  },
];
