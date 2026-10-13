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
    body:"Alluminaty helps schools, colleges, and universities manage alumni through one branded platform.Connect alumni, organize events, collect memberships, raise funds, and manage everything from one place.",
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
    "Batch & Year Groups",
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
    body: "Alumni management software is a private online platform where a school, college or university keeps a verified record of its former students and runs its alumni association from one place: the alumni database and directory, batch groups, events, membership fees and fundraising. Your institution owns the data and runs it under its own name, instead of a volunteer's spreadsheet and scattered WhatsApp groups.",
    items: [
      {
        icon: "database",
        name: "Verified alumni database",
        desc: "Import your existing list, keep every profile current and searchable, and trust that each member is a genuine alumnus.",
      },
      {
        icon: "directory",
        name: "Directory & search",
        desc: "Find alumni by batch, house or division, city, profession and industry in a few taps.",
      },
      {
        icon: "groups",
        name: "Batch and year groups",
        desc: "Members land in their own batch groups automatically, so classmates reconnect on day one.",
      },
      {
        icon: "events",
        name: "Events & reunions",
        desc: "RSVP or sell tickets, check attendees in and collect feedback after every reunion.",
      },
      {
        icon: "money",
        name: "Fees & fundraising",
        desc: "Collect membership fees and contributions by UPI, card or netbanking, with invoices and receipts handled for you.",
      },
      {
        icon: "admin",
        name: "Admin console",
        desc: "Your alumni office verifies members, moderates and broadcasts from one console with role-based access.",
      },
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
          "Filter by batch, house or division, city, profession and industry",
          "Admin verification, backed by batch-mate vouches",
          "Private profiles stay hidden; CSV import and export",
        ],
      },
      {
        icon: "message",
        name: "Batch Groups & Alumni Feed",
        desc: "New members join their batch groups automatically, and house or division groups where the institution uses them, so classmates find each other on day one.",
        bullets: [
          "Auto-joined batch groups (house or division where used)",
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
        name: "Organise by batch and year",
        stop: "ORGANISE",
        desc: "Members land in their batch groups automatically and show up in the directory for their classmates.",
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
  capabilities: {
    number: "05",
    label: "WHAT TIMEWHEEL BUILT",
    title: "A complete alumni platform,\nend to end.",
    body: "Timewheel took Alluminaty from first workshop to a running production network, covering strategy, design, engineering, launch and ongoing support, so your institution ends up with a working alumni portal, not a software project.",
    items: [
      {
        icon: "compass",
        name: "Strategy & scoping",
        desc: "We define the network with your team before any code is written: who joins, how members are verified and how the association funds itself.",
        points: ["Requirements & roadmap", "Membership & fee model", "Success metrics"],
      },
      {
        icon: "pen",
        name: "UX/UI & design system",
        desc: "A branded, mobile-first portal your alumni can use without a manual, built on a reusable component and design system.",
        points: ["Alumni-facing UX", "Design system & components", "Accessible, responsive UI"],
      },
      {
        icon: "code",
        name: "Full-stack engineering",
        desc: "The whole platform, built and shipped: the alumni web app, its APIs, database, authentication and online payments.",
        points: ["Next.js frontend", "Backend, APIs & database", "Auth, verification & Razorpay"],
      },
      {
        icon: "shield",
        name: "Launch, run & support",
        desc: "We deploy the network, monitor it and keep improving it, so your committee is never left maintaining software on its own.",
        points: ["Production deployment", "Monitoring & backups", "Ongoing iterations"],
      },
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
        a: "Alluminaty is set up for each institution, so pricing depends on your size and what you need; book a demo for a quote. You also decide what your alumni pay: each institution sets its own membership tiers, and those fees and contributions fund the association.",
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
