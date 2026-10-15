// Indian Sports Club product page content. Target: an online + offline sports
// community app for clubs in India (India-first community software, in the same
// family as The Parliament). Every claim describes the product surface; no
// customer counts, ratings or testimonials until real ones exist.
// Palette note: the Indian tricolour (saffron, white, green) over deep navy is
// the page accent scheme, used in equal proportion.

export const isc = {
  path: "/products/indian-sports-club",
  meta: {
    title: "Indian Sports Club: Online & Offline Sports Community App | Timewheel",
    description:
      "Indian Sports Club is a community app for sports clubs in India: fixtures and results, teams and rosters, tournaments with paid registration via Razorpay, ground and slot bookings, a member directory, club memberships and moderation.",
  },
  hero: {
    eyebrow: "Indian Sports Club, by Timewheel",
    title: "The app for clubs that live",
    titleAccent: "online and on the ground.",
    // Answer-first block (the passage AI answers lift). Keep it under 60 words.
    answer:
      "Indian Sports Club gives a sports club an app of its own: fixtures and results, teams and rosters, tournaments with paid registration, ground and slot bookings, a member directory, club memberships and moderation. Payments run on Razorpay, and the club can still reach everyone on WhatsApp.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to us",
    secondaryHref: "/contact",
    // Phone feed mock in the hero.
    panel: {
      app: "Indian Sports Club",
      season: "Sunday League · Week 6",
      items: [
        {
          kind: "result",
          label: "Full time",
          title: "Deccan XI 2 : 1 Riverside FC",
          meta: "Ground 2 · 7:30 pm",
        },
        {
          kind: "fixture",
          label: "Next up · Sat",
          title: "Lakeview Utd vs Old Boys",
          meta: "League · 7:30 pm",
        },
        {
          kind: "fees",
          label: "Fees due",
          title: "12 members for November",
          meta: "Season fee · Razorpay",
        },
      ],
      statLabel: "This season",
      stats: [
        { value: "18", label: "fixtures" },
        { value: "42", label: "members" },
        { value: "3", label: "teams" },
      ],
    },
  },
  problem: {
    number: "01",
    label: "THE PROBLEM",
    title: "When a sports club runs on five WhatsApp groups",
    body: "A group chat is fine for a Sunday match. It falls apart the moment the club has fixtures to schedule, fees to collect, teams to pick and a ground to book. If your season lives across screenshots, spreadsheets and a dozen groups, the club has outgrown the chat.",
    items: [
      {
        name: "Fixtures and results are scattered",
        desc: "The schedule is a photo in one group, the score is a message in another, and nobody can find the last result when they need it.",
      },
      {
        name: "Fees are tracked in screenshots",
        desc: "Subscriptions, tournament entries and ground charges come in as UPI screenshots, and someone reconciles them by hand every month.",
      },
      {
        name: "There is no real roster",
        desc: "A list of phone numbers is not a squad. Members cannot see who plays where, who is available, or who is due to renew.",
      },
      {
        name: "Picking teams and booking grounds is ad hoc",
        desc: "Team selection and slot booking run on memory and first-come replies, so the fairest and fastest are never the ones who get in.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "One club, one app, online and on the ground",
    body: "Stop patching together WhatsApp, Google Forms, spreadsheets and UPI screenshots. Indian Sports Club brings the whole club into one place, so the season runs itself and members show up to play.",
    lead: {
      icon: "play",
      name: "Play and compete",
      items: [
        "Fixtures, results and live points tables",
        "Tournaments with brackets and paid entry",
        "Online watch parties and score updates",
      ],
      tableLabel: "Points table",
      table: [
        { pos: "1", team: "Deccan XI", pts: 16 },
        { pos: "2", team: "Riverside FC", pts: 13 },
        { pos: "3", team: "Lakeview United", pts: 11 },
      ],
    },
    cards: [
      {
        icon: "teams",
        name: "Teams and rosters",
        items: [
          "Squads for every sport and age group",
          "Availability and selection in one place",
          "A searchable member directory",
        ],
      },
      {
        icon: "events",
        name: "Fees and bookings",
        items: [
          "Memberships and season fees via Razorpay",
          "Ground and slot bookings members can claim",
          "Invoices, receipts and reminders",
        ],
      },
      {
        icon: "admin",
        name: "Club admin and safety",
        items: [
          "Roles for captains, coaches and treasurers",
          "Report queue, warnings and an audit log",
          "WhatsApp, email and push announcements",
        ],
      },
    ],
  },
  compare: {
    number: "03",
    label: "HONEST COMPARISON",
    title: "WhatsApp group vs a club app",
    body: "WhatsApp is the right tool for a small group that mostly chats. A club app is the right tool once you have a season to run. Here is where each one wins.",
    columns: ["", "WhatsApp group", "Indian Sports Club"],
    score: { us: "9", them: "2", note: "criteria where a club app wins" },
    rows: [
      ["Members already have it", "Yes, nothing to install", "No. Members sign up once, then add it to the home screen"],
      ["Cost to start", "Free", "Set up by Timewheel; ask us for a quote"],
      ["Fixtures and results", "Photos and messages that scroll away", "A schedule and points table every member can open any time"],
      ["Picking teams", "Replies and memory", "Squads, availability and selection recorded on the app"],
      ["Collecting fees", "UPI screenshots, matched by hand", "Memberships, tournament entry and ground fees through Razorpay, with invoices"],
      ["Ground and slot booking", "First reply wins", "Members claim and pay for slots, with a booking record"],
      ["Member directory", "Contact list only", "Profiles, sports, squads and a searchable directory"],
      ["Online element", "Group calls and videos", "Live score updates, watch parties and one-to-one video calls"],
      ["Moderation", "Remove members, admin-only messages", "Report queue, warnings, suspensions, role-based permissions and an audit log"],
      ["Reaching everyone", "Every message notifies", "Push and email notifications, plus WhatsApp broadcasts to members who opt in"],
    ],
  },
  features: {
    number: "04",
    label: "WHAT'S INSIDE",
    title: "Everything a club needs. Built to work together.",
    body: "Each piece solves a real club headache, from the first fixture of the season to the last invoice of the year. Choose a part to see how it fits into your week.",
    items: [
      {
        icon: "fixtures",
        name: "Fixtures and results",
        desc: "Publish the season schedule, record results and let a points table update itself for every league and cup.",
        bullets: ["Home and away fixtures", "Result entry and standings", "Shareable match pages"],
      },
      {
        icon: "teams",
        name: "Teams and rosters",
        desc: "Build squads for every sport, age group and season, then track availability and selection in one place.",
        bullets: ["Squad and roster builder", "Availability and selection", "Captains and coaches per team"],
      },
      {
        icon: "tournaments",
        name: "Tournaments and leagues",
        desc: "Run a knockout or a league: publish brackets, take paid entries and keep everyone on the same schedule.",
        bullets: ["Brackets and group stages", "Paid entry via Razorpay", "Live standings and results"],
      },
      {
        icon: "membership",
        name: "Membership and fees",
        desc: "Membership tiers with their perks, paid through Razorpay, with renewals, expiry and invoices handled for you.",
        bullets: ["UPI, cards and netbanking", "Season fees and subscriptions", "Invoices, receipts and reminders"],
      },
      {
        icon: "bookings",
        name: "Ground and slot booking",
        desc: "List grounds and courts with their slots, let members claim and pay for them, and keep a clean booking record.",
        bullets: ["Ground and court schedules", "Slot claim and payment", "Coaching and net sessions"],
      },
      {
        icon: "admin",
        name: "Admin and moderation",
        desc: "An admin console where captains, coaches and treasurers get the powers they need, and reports get handled.",
        bullets: ["Role-based admin permissions", "Report queue and audit log", "WhatsApp and email broadcasts"],
      },
    ],
    alsoLabel: "Also inside",
    also: [
      "Member directory",
      "Team and club feeds",
      "Direct messages",
      "One-to-one video calls",
      "Online watch parties",
      "Score and result alerts",
      "Photo galleries",
      "Sponsor wall",
      "Badges and leaderboards",
      "Google sign-in",
    ],
  },
  process: {
    number: "05",
    label: "HOW TO MOVE",
    title: "How to move a sports club onto an app",
    body: "You don't have to shut the WhatsApp groups down on day one. Most clubs move in four steps and keep WhatsApp for alerts.",
    steps: [
      {
        name: "Set it up",
        desc: "Book a demo. We walk through how your club runs today and set up Indian Sports Club around it.",
      },
      {
        name: "Bring members in",
        desc: "Import your member list from a CSV and send each one an invite to set a password, or let them sign in with Google.",
      },
      {
        name: "Add the season",
        desc: "Create your teams, publish fixtures, list grounds and slots, and set up membership tiers and fees.",
      },
      {
        name: "Announce on WhatsApp",
        desc: "Share the link in the old groups. Members who opt in keep getting updates, and fees and entries come in without screenshots.",
      },
    ],
    notes: ["No app-store download", "Members keep WhatsApp for alerts", "Set up by Timewheel"],
  },
  audiences: {
    number: "06",
    label: "WHO IT'S FOR",
    title: "Built for every kind of sports club",
    items: [
      {
        tag: "Memberships",
        name: "Sports clubs and associations",
        desc: "Registered clubs with memberships, committees, a season and multiple sports that need a members-only space.",
      },
      {
        tag: "Batches & fees",
        name: "Academies and coaching centres",
        desc: "Coaches who run batches, take monthly fees and want parents and players to see schedules and progress in one place.",
      },
      {
        tag: "Brackets & entries",
        name: "Tournament and league organisers",
        desc: "Organisers who sell entries, publish brackets and need players and teams to follow the schedule between matches.",
      },
      {
        tag: "Internal leagues",
        name: "Corporate and apartment leagues",
        desc: "Companies and housing societies that run internal leagues and want offline matches with an online home.",
      },
    ],
  },
  faq: {
    number: "07",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is Indian Sports Club?",
        a: "Indian Sports Club is a community app for sports clubs in India, built by Timewheel. It gives a club its own platform for fixtures and results, teams and rosters, tournaments with paid registration, ground and slot bookings, a member directory, club memberships and an admin console for moderation. Payments run on Razorpay.",
      },
      {
        q: "Is Indian Sports Club good for clubs that meet offline?",
        a: "Yes. Indian Sports Club is built for clubs that are both online and offline. Members use the app for fixtures, selection, fees and announcements, then show up to play. Ground and slot bookings, tournament brackets and result entry all line up with what happens on the field.",
      },
      {
        q: "Can I collect club fees and tournament entries?",
        a: "Yes. You can sell membership tiers with different perks, charge season fees, and take paid entries for tournaments and leagues. Members pay in rupees through Razorpay with UPI, cards or netbanking, and renewals, receipts and invoices are handled by the platform.",
      },
      {
        q: "How does ground and slot booking work?",
        a: "Admins list grounds, courts or nets with the slots available. Members can see the schedule, claim a slot and pay for it where a charge applies, and every booking is recorded so there is no first-reply-wins scramble.",
      },
      {
        q: "How do fixtures and points tables work?",
        a: "You publish the season schedule, record results as matches are played, and the points table updates itself for each league and cup. Match pages are shareable, so members and families can follow along.",
      },
      {
        q: "Do members need to install an app?",
        a: "No app store download is needed. Indian Sports Club is a web app that works in any phone or desktop browser and can be added to the home screen like an app. Members get push notifications on supported browsers and email notifications for the rest.",
      },
      {
        q: "How do admins keep the club safe and organised?",
        a: "Members can report posts and comments, and reports land in a moderation queue. Admins can warn, suspend or ban members, and admin powers are split by role, so a captain or coach can manage their team without access to payments. Admin actions are recorded in an audit log.",
      },
      {
        q: "How much does Indian Sports Club cost?",
        a: "Pricing depends on your club's size and what you need set up, so we quote after a short demo. Book a demo and tell us how your club runs today.",
      },
      {
        q: "How do I move my club off WhatsApp?",
        a: "Set up Indian Sports Club, import your members from a CSV so each one gets an invite, add your teams and fixtures, then share the link in the WhatsApp groups. You can keep the groups for alerts and send template broadcasts to members who opt in.",
      },
    ],
  },
  final: {
    title: "Give your club a home beyond the group chat.",
    body: "Tell us how your club runs today, across groups, forms and spreadsheets, and we'll show you the same club on Indian Sports Club.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to us",
    secondaryHref: "/contact",
  },
};
