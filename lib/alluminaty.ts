// Alluminaty product page content. Primary query: "alumni management software"
// (schools + colleges, India). Every feature claim maps to code in the live
// NNAWCA deployment (The Parliament codebase); no invented stats or quotes.
export const az = {
  meta: {
    title: "Alumni Management Software: Schools & Colleges | Alluminaty",
    description:
      "Alumni management software for Indian schools and colleges: verified alumni directory, batch groups, events, Razorpay memberships and fundraising in one portal.",
  },
  hero: {
    titleLine1: "Alumni Management Software",
    titleAccent: "for Schools & Colleges",
    body: "Alluminaty is alumni management software for schools, colleges and universities in India. It gives your alumni association one branded portal with a verified alumni database, a directory searchable by batch, house, city and profession, events with paid registration and check-in, membership fees through Razorpay, fundraising, and an admin console to run it all.",
    primaryLabel: "Get A Demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "See it live",
    secondaryHref: "https://nnawca.vercel.app",
  },
  // Product facts from the code, not usage numbers.
  stats: [
    { value: "9", label: "Directory filters" },
    { value: "4", label: "Membership tiers" },
    { value: "500", label: "Alumni per CSV import" },
    { value: "1", label: "Network you own" },
  ],
  ticker: [
    "Verified Alumni Database",
    "Directory by Batch & City",
    "Batch & House Groups",
    "Events & Reunions",
    "Membership Fees",
    "Fundraising",
    "WhatsApp & Email Broadcasts",
    "Admin Console",
  ],
  problem: {
    number: "01",
    label: "THE CHALLENGE",
    title: "Why schools and colleges lose touch with their alumni.",
    body: "Every batch leaves as a future mentor, recruiter and donor. Then the records go stale, the chat groups go quiet, and the alumni association is left with a spreadsheet nobody trusts.",
    items: [
      {
        name: "Contact fades after graduation",
        desc: "Within a few batches most former students have changed numbers, emails and cities, and nobody has the new ones.",
      },
      {
        name: "The alumni database is a spreadsheet",
        desc: "Records sit in old Excel files and inboxes. You cannot search them by batch, city or profession, or tell who is genuine.",
      },
      {
        name: "Fees and donations are collected by hand",
        desc: "Membership fees and event payments come in over UPI screenshots and bank transfers, with receipts made one by one.",
      },
      {
        name: "Everything rests on a few volunteers",
        desc: "Reunions, outreach and fundraising depend on a handful of people. When they step back, the network stalls.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE ANSWER",
    title: "What is alumni management software?",
    body: "Alumni management software is a private online platform where a school, college or university keeps a verified database of its former students and runs its alumni association: directory, groups, communication, events, membership fees and fundraising. Alluminaty does all of this in one portal under your institution's name.",
    items: [
      "Verified alumni database",
      "Directory by batch, house & city",
      "Batch and house groups",
      "Events with paid registration",
      "Membership fees via Razorpay",
      "Fundraising & sponsor wall",
    ],
  },
  features: {
    number: "03",
    label: "FEATURES",
    title: "Alumni management features for schools and colleges.",
    body: "Everything below runs today on the live NNAWCA alumni network, the deployment Alluminaty is built from.",
    items: [
      {
        icon: "users",
        name: "Alumni Database & Directory",
        desc: "A searchable alumni directory built on verified records. Import your existing alumni list by CSV, then let members keep their own profiles up to date.",
        bullets: [
          "Filter by batch, house, division, city, profession and industry",
          "Admin verification, backed by batch-mate vouches",
          "Private profiles stay hidden; CSV import and export",
        ],
      },
      {
        icon: "message",
        name: "Batch Groups & Alumni Feed",
        desc: "New members join their batch and house groups automatically, so classmates find each other on day one.",
        bullets: [
          "Auto-joined batch and house groups",
          "Posts, polls, comments and reactions",
          "Job openings and referrals posted by members",
        ],
      },
      {
        icon: "calendar",
        name: "Events & Reunions",
        desc: "Plan reunions, founders' day and city meetups with registration, payments and attendance in one place.",
        bullets: [
          "RSVP or paid registration via Razorpay",
          "Check-in and attendee lists",
          "Email reminders and post-event feedback",
        ],
      },
      {
        icon: "store",
        name: "Messaging & Engagement",
        desc: "Reasons for alumni to come back every week, not just at the annual reunion.",
        bullets: [
          "Direct messages and video calls",
          "Alumni business directory and photo gallery",
          "Karma points and badges for contribution",
        ],
      },
      {
        icon: "heart",
        name: "Membership Fees & Fundraising",
        desc: "Collect alumni membership fees and contributions online, with invoices and certificates issued automatically and a public wall to thank sponsors.",
        bullets: [
          "Free, annual and life membership tiers you set",
          "Razorpay checkout with invoices and receipts",
          "Contributions, sponsor wall and member ID cards",
        ],
      },
      {
        icon: "shield",
        name: "Admin Console & Broadcasts",
        desc: "Your alumni office or committee runs the network from one console, with roles that control who can do what.",
        bullets: [
          "Role-based admin access and verification queue",
          "Report queue, suspensions and moderation",
          "WhatsApp and email broadcasts to members",
        ],
      },
    ],
  },
  process: {
    number: "04",
    label: "HOW IT WORKS",
    title: "How to build an alumni network\nfor your school or college.",
    body: "Five steps take you from a contact spreadsheet to an alumni association that runs and funds itself.",
    steps: [
      {
        name: "Import and invite",
        stop: "IMPORT",
        desc: "Upload your existing alumni list by CSV or invite members by email. Everyone else signs up with their batch details.",
      },
      {
        name: "Verify every member",
        stop: "VERIFY",
        desc: "Admins review new members from one queue and can ask verified batch-mates or house-mates to vouch for them with one click.",
      },
      {
        name: "Organise by batch and house",
        stop: "ORGANISE",
        desc: "Members land in their batch and house groups automatically and show up in the directory for their classmates.",
      },
      {
        name: "Engage all year",
        stop: "ENGAGE",
        desc: "Events, the alumni feed, messages and WhatsApp or email broadcasts keep the network active between reunions.",
      },
      {
        name: "Sustain with fees and giving",
        stop: "SUSTAIN",
        desc: "Membership fees and contributions paid online fund the association, so it does not depend on a few volunteers.",
      },
    ],
  },
  // Not rendered on the page (components/alluminaty/pricing.tsx is unused); kept for that component.
  pricing: {
    number: "06",
    label: "MEMBERSHIP",
    title: "Belong, and give back.",
    body: "Every tier keeps the network alive and funds scholarships, welfare drives, events and mentorship. Each institution chooses what its alumni pay.",
    footnote: "Secured by Razorpay · Non-refundable contributions · Each institution sets its own tiers",
    plans: [
      {
        name: "Member",
        tagline: "Stay connected forever",
        price: "₹0",
        unit: "free",
        highlight: false,
        features: [
          "Directory & profiles",
          "Join events & chapters",
          "Post, comment & poll",
          "Voting rights (verified + 30 days)",
        ],
      },
      {
        name: "Associate",
        tagline: "Give back & get more",
        price: "₹499",
        unit: "/ year",
        highlight: true,
        features: [
          "Full, uncapped feed",
          "Reduced ads",
          "Post jobs & referrals",
          "Video calling · 30 min/call",
          "1 GB gallery storage",
          "Verified Associate badge",
        ],
      },
      {
        name: "Premium",
        tagline: "Lead the network",
        price: "₹999",
        unit: "/ year",
        highlight: false,
        features: [
          "Everything in Associate",
          "Ad-free feed",
          "Highlighted profile",
          "List your business",
          "Video calling · 60 min/call",
          "Earlier event invitations",
        ],
      },
      {
        name: "Life Member",
        tagline: "A lifetime of belonging",
        price: "₹9,999",
        unit: "one-time",
        highlight: false,
        features: [
          "Everything in Premium, forever",
          "Never renews or expires",
          "Permanent Life Member badge",
          "Video calling · 90 min/call",
          "Eligible for Committee invitation",
        ],
      },
    ],
  },
  matrix: {
    heading: "Benefit Matrix",
    note: "Voting in decisions is open to any verified member with 30+ days active, regardless of paid tier.",
    columns: ["Benefit", "Member", "Associate", "Premium", "Life"],
    rows: [
      { name: "Alumni feed", values: ["Preview", "Full", "Full", "Full"] },
      { name: "Feed ads", values: ["Standard", "Reduced", "Ad-free", "Ad-free"] },
      { name: "Video calling", values: ["Pass", "30 min", "60 min", "90 min"] },
      { name: "Gallery storage", values: ["200 MB", "1 GB", "5 GB", "10 GB"] },
      { name: "Highlighted profile", values: ["–", "–", "Yes", "Yes"] },
      { name: "Business listing", values: ["–", "–", "Yes", "Yes"] },
      { name: "Committee eligibility", values: ["–", "–", "–", "Yes"] },
    ],
  },
  capabilities: {
    number: "05",
    label: "WHAT TIMEWHEEL BUILT",
    title: "A complete alumni platform,\nend to end.",
    body: "Timewheel designed, built and runs Alluminaty, from product strategy to production, so your institution gets a working alumni portal, not a software project.",
    items: [
      { icon: "compass", label: "Product Strategy" },
      { icon: "pen", label: "UX / UI Design" },
      { icon: "layout", label: "Design System" },
      { icon: "code", label: "Frontend Development" },
      { icon: "server", label: "Backend & APIs" },
      { icon: "database", label: "Database & Storage" },
      { icon: "shield", label: "Auth & Verification" },
      { icon: "wallet", label: "Payments (Razorpay)" },
      { icon: "message", label: "Feeds, Groups & Events" },
    ],
  },
  testimonials: {
    number: "06",
    label: "LIVE DEPLOYMENT",
    title: "In use at NNAWCA, the JNV Nagpur alumni association.",
    body: "Alluminaty is built from the platform Timewheel runs for the Nagpur Navodaya Alumni Welfare and Charitable Association (NNAWCA), the alumni body of Jawahar Navodaya Vidyalaya, Nagpur. Alumni there sign up by batch and house, get verified, and pay memberships online.",
    linkLabel: "Visit the NNAWCA network",
    linkHref: "https://nnawca.vercel.app",
    items: [
      {
        quote:
          "NNAWCA turned a scattered batch into a living network, the platform where every Navodian finds their way home.",
        name: "Pranav Kadoo",
        role: "NNAWCA alumnus · Batch 2006–13, Shiwalik House",
        initials: "PK",
      },
    ],
  },
  faq: {
    number: "07",
    label: "FAQ",
    title: "Alumni management software: questions, answered.",
    items: [
      {
        q: "What is alumni management software?",
        a: "Alumni management software is an online platform where a school, college or university keeps a verified database of its former students and runs its alumni association. Alluminaty covers the alumni directory, batch groups, messaging, events, membership fees and fundraising in one portal under the institution's name.",
      },
      {
        q: "How do you build an alumni network for a school?",
        a: "Start with the records you have: import your alumni list, invite those batches, and verify everyone who joins. Group members by batch and house so classmates find each other, then keep them active with events and regular updates. Alluminaty handles each of these steps, and online membership fees keep the association funded.",
      },
      {
        q: "Can colleges and universities use Alluminaty?",
        a: "Yes. Alluminaty works for schools, colleges, universities and their alumni associations or alumni cells. Members are organised by batch and, where your institution uses them, by house or division, and the directory filters by city, profession and industry, which suits college and university alumni as well as school batches.",
      },
      {
        q: "How are alumni verified?",
        a: "Your admins verify every new member from one queue. Alluminaty ranks unverified members by profile completeness and peer vouches, suggests verified alumni from the same batch or house, and sends them a link to confirm they studied together. Only members your admins approve carry the verified badge in the alumni directory.",
      },
      {
        q: "Can we import our existing alumni database?",
        a: "Yes. Admins can import alumni from a CSV file, up to 500 records per upload, and invite people by email. You can also export the member list to CSV at any time, so your alumni data never gets locked inside the platform.",
      },
      {
        q: "How does an alumni association collect membership fees and donations online?",
        a: "Alluminaty takes payments through Razorpay, so alumni can pay by UPI, card or netbanking for memberships, paid event registrations and contributions. Membership payments issue an invoice and receipt automatically, contributors receive a certificate by email, and they can choose to appear on a public sponsor wall.",
      },
      {
        q: "How much does alumni management software cost?",
        a: "Alluminaty is set up for each institution, so pricing depends on your size and needs; book a demo for a quote. You also decide what your alumni pay. NNAWCA, for example, offers free basic membership, ₹499 a year for Associate, ₹999 a year for Premium and ₹9,999 one-time for Life membership.",
      },
      {
        q: "Does our institution own the alumni data?",
        a: "Yes. The alumni network runs under your institution's name, your admins control who joins and what is allowed, and the member list can be exported to CSV whenever you need it. Timewheel builds and runs the platform; the alumni community and its data belong to your institution.",
      },
      {
        q: "Does it work on mobile phones?",
        a: "Yes. Alluminaty runs in any mobile browser and can be installed on the home screen as an app. Members also get updates by email, and admins can send WhatsApp broadcasts to members who have opted in.",
      },
    ],
  },
  final: {
    title: "Give your alumni a home your institution owns.",
    body: "Alluminaty keeps every batch reachable, verified and giving back, under your school's or college's name.",
    primaryLabel: "Get A Demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Read the build story",
    secondaryHref: "/case-studies/alluminaty",
    relatedText: "Running an online community that isn't an alumni association?",
    relatedLabel: "See The Parliament",
    relatedHref: "/products/the-parliament",
  },
};
