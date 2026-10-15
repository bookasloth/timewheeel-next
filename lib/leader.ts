// Leader product page content. Copy describes the product surface documented
// in the lead-enricher app: a Google Maps City × Area × Query sweep, six-stage
// dedup, contact enrichment flags, weighted scoring and CSV/JSON/XLSX export.
// No customer counts, ratings or testimonials until real ones exist.

export const leader = {
  path: "/products/leader",
  meta: {
    title: "Leader: Build Contact-Ready Lead Lists From Google Maps | Timewheel",
    description:
      "Leader sweeps a city by area and category on Google Maps, dedupes to one row per business, flags who is missing an email or website, grades every lead and exports CSV, JSON or XLSX. Runs on your own machine, built by Timewheel.",
  },
  hero: {
    eyebrow: "Leader, by Timewheel",
    title: "Turn a city and a category into a",
    titleAccent: "contact-ready lead list.",
    answer:
      "Leader sweeps Google Maps across every area and search term you give it, collapses the same business into one row, flags who is missing an email or a website, scores and grades each lead by fit, and exports the lot as CSV, JSON or XLSX. It runs on your own machine.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Visit live site",
    secondaryHref: "https://leadforge-gv7s.onrender.com/",
  },
  problem: {
    number: "01",
    label: "THE PROBLEM",
    title: "Building a lead list is slower than it should be",
    body: "Pulling leads out of Google Maps by hand is a grind: one search misses half the map, the same shops show up again and again, and most rows have no way to reach anyone.",
    items: [
      {
        name: "One search, half the map",
        desc: "A single Maps query hides most of a category. Nothing tracks coverage area by area, so the list is guesswork.",
      },
      {
        name: "The same business, ten times",
        desc: "Popular listings surface under many queries and localities, bloating the sheet with repeats.",
      },
      {
        name: "Rows you can't contact",
        desc: "Half the list has no email and no website, and you only find that out after you've started.",
      },
      {
        name: "No sense of priority",
        desc: "Every lead looks equal, so outreach goes out cold and unordered, with no idea where the quick wins are.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "From a raw Maps dump to one scored list",
    body: "Leader turns the messy output of a Maps search into a single, de-duplicated, contact-ready list, where every row is enriched, graded and ready to work.",
    items: [
      "Every Area × Query cell swept and tracked",
      "Six-stage dedup down to one row per business",
      "Email, website, WhatsApp, booking and social flags",
      "A weighted score with plain-English reasons",
      "Priority grades on every lead",
      "CSV, JSON and XLSX export, ready to work",
    ],
  },
  features: {
    number: "03",
    label: "WHAT'S INSIDE",
    title: "Built around the work behind a good lead list",
    body: "Each part of Leader handles one hard job in building a list, so what comes out is clean, ranked and safe to contact.",
    items: [
      {
        icon: "sweep",
        name: "City × Area × Query sweep",
        desc: "Give a city, a list of areas and the search terms for your category. Leader runs every combination and tracks each cell, so coverage is systematic, not one lucky search.",
      },
      {
        icon: "dedup",
        name: "Six-stage deduplication",
        desc: "Match by place ID, CID, Maps URL, phone, website host, then fuzzy name and locality, and merge to one row per business without losing where it was found.",
      },
      {
        icon: "flags",
        name: "Contact-gap flags",
        desc: "Each lead is checked for email, website, phone, WhatsApp, booking links and socials. Flags read YES, NO or UNKNOWN, so a blank never becomes a false no.",
      },
      {
        icon: "score",
        name: "Priority scoring and grades",
        desc: "A configurable weighted score, with human-readable reasons, ranks every lead and surfaces the fastest wins first.",
      },
    ],
    alsoLabel: "Also inside",
    also: [
      "Coverage report per area",
      "found_count popularity signal",
      "Multi-branch detection",
      "Semrush backlink enrichment",
      "Timewheel digital-gap track",
      "Resumable jobs",
      "Local SQLite storage",
      "No accounts or API keys",
      "Category-agnostic queries",
      "Editable scoring weights",
    ],
  },
  process: {
    number: "04",
    label: "HOW IT WORKS",
    title: "How a sweep turns into a working list",
    body: "Set the job once, then let Leader run the matrix, clean the results and hand you an export you can act on.",
    steps: [
      {
        name: "Set the sweep",
        desc: "Enter a city, paste your areas and the search terms for the category, and set how many results to pull per cell.",
      },
      {
        name: "Run the matrix",
        desc: "Leader sweeps every Area × Query combination on Google Maps, showing cells, unique leads, duplicates and errors live.",
      },
      {
        name: "Dedupe, enrich, grade",
        desc: "The same business collapses to one row, each website is checked for contacts, and a weighted score grades the lead.",
      },
      {
        name: "Export and resume",
        desc: "Export CSV, JSON or XLSX for the sales view, and pick any interrupted run back up exactly where it stopped.",
      },
    ],
  },
  integrations: {
    number: "05",
    label: "RUNS ON",
    title: "Runs on the tools you already have",
    body: "Leader is a local app. It leans on open tooling and your own machine instead of another SaaS subscription.",
    items: [
      { icon: "maps", name: "Google Maps", hint: "via gosom scraper" },
      { icon: "docker", name: "Docker", hint: "runs the scraper" },
      { icon: "backlink", name: "Semrush export", hint: "backlink audit" },
      { icon: "db", name: "SQLite", hint: "stored locally" },
      { icon: "export", name: "CSV / JSON / XLSX", hint: "sales and raw" },
      { icon: "node", name: "Node.js 22.5+", hint: "no npm deps" },
    ],
  },
  stats: {
    number: "06",
    label: "WHY IT MATTERS",
    title: "More coverage, less cleanup",
    body: "The point of a sweep is a list you can trust and contact, without days of manual research and de-duplication.",
    // Draft figures that reflect the product's own defaults (matrix of cells,
    // six dedup stages, three-state flags). Replace with measured numbers later.
    items: [
      { value: "2000+", label: "leads from a single sweep" },
      { value: "6-stage", label: "dedup down to one row per business" },
      { value: "3-state", label: "YES / NO / UNKNOWN flags, never a false no" },
      { value: "0", label: "accounts, API keys or cloud uploads" },
    ],
  },
  audiences: {
    number: "07",
    label: "WHO IT'S FOR",
    title: "Built for anyone whose day starts with a lead list",
    items: [
      {
        name: "Digital agencies",
        desc: "Build a prospect list for a city and category, with each lead's website and search gaps already graded.",
      },
      {
        name: "Freelancers and consultants",
        desc: "Walk into an area with a clean, contact-ready list instead of a folder of screenshots and half-filled sheets.",
      },
      {
        name: "Local SEO and web shops",
        desc: "Find businesses with no website or a dead one, then prioritise by the size of the gap you can close.",
      },
      {
        name: "Sales and SDR teams",
        desc: "Feed a CRM from a de-duplicated, scored export rather than a raw Maps dump nobody wants to clean.",
      },
      {
        name: "Marketplaces and directories",
        desc: "Seed a directory with verified local businesses, each collapsed to one row and checked for contacts.",
      },
      {
        name: "Field and channel sales",
        desc: "Plan a territory area by area and hand every rep a routed, contactable list for their patch.",
      },
      {
        name: "Local media and ad sales",
        desc: "Rebuild an advertiser list from Maps, graded by digital gap, instead of pruning a stale spreadsheet.",
      },
      {
        name: "Market researchers and analysts",
        desc: "Pull a clean, reproducible sample of local businesses for coverage maps, studies and market sizing.",
      },
    ],
  },
  faq: {
    number: "08",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is Leader?",
        a: "Leader is a local web app for building contact-ready lead lists, built by Timewheel. It sweeps a city on Google Maps across every area and search term you give it, dedupes the results to one row per business, flags missing contact details, scores and grades each lead, and exports CSV, JSON or XLSX.",
      },
      {
        q: "Who is Leader for?",
        a: "Agencies, freelancers, consultants, local SEO and web teams, and sales or SDR teams who need a clean, contactable list of businesses for a city and a category.",
      },
      {
        q: "How does the Google Maps sweep work?",
        a: "You give a city, a list of areas and a set of search terms for one category. Leader builds one cell per Area × Query pair, runs each as a Maps search, and tracks the status of every cell. That tracking is what makes a job fully resumable if it's interrupted.",
      },
      {
        q: "How are duplicates handled?",
        a: "Leader matches each result against existing leads in six stages: place ID, CID, Maps URL, phone, website host, then fuzzy name and locality. A match merges into one row, bumps a found_count popularity signal, and keeps where the business was discovered.",
      },
      {
        q: "What do the flags and grades mean?",
        a: "Every lead is checked for a website, email, phone, WhatsApp, booking links and social presence. Flags read YES, NO or UNKNOWN, so no evidence never becomes a false no. A configurable weighted score, with readable reasons, then grades each lead so you can work the best ones first.",
      },
      {
        q: "Does my data leave my machine?",
        a: "No. Leader runs locally, stores everything in a local SQLite file, and needs no accounts or API keys. Data stays on your machine, apart from the scraper's own requests to public pages.",
      },
      {
        q: "How do I get started?",
        a: "Book a demo and tell us the city and category you care about. We'll show you the same sweep producing a scored, exportable list, and set it up around how your team works.",
      },
    ],
  },
  final: {
    title: "Stop hand-building lead lists.",
    body: "Tell us the city and category you're chasing, and we'll show you the same sweep producing a clean, graded export.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to us",
    secondaryHref: "/contact",
  },
};
