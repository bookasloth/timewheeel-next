// The Parliament product page content. Target query: "online community platform"
// (India). Every feature claim maps to shipped code in the bookasloth/the-parliament
// repo; no customer counts, ratings or testimonials until real ones exist.
// Alumni wording stays off this page: that query belongs to /products/alluminaty.

export const tp = {
  path: "/products/the-parliament",
  meta: {
    title: "Online Community Platform for India | The Parliament",
    description:
      "The Parliament is an online community platform for groups that outgrew WhatsApp: feed, groups, paid events and memberships via Razorpay, DMs and video calls.",
  },
  hero: {
    eyebrow: "The Parliament, by Timewheel",
    title: "The online community platform for groups that",
    titleAccent: "outgrew WhatsApp.",
    // Answer-first block (the passage AI answers lift). Keep it under 60 words.
    answer:
      "The Parliament is an online community platform, built in India, that gives a community run on WhatsApp groups an app of its own: a member feed, sub-groups, events with paid registration, direct messages, video calls, paid memberships and moderation tools. Payments run on Razorpay, and announcements can still reach members on WhatsApp.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "How we built it",
    secondaryHref: "/case-studies/the-parliament",
    chips: [
      "Razorpay: UPI, cards, netbanking",
      "WhatsApp broadcasts",
      "Installs on phones from the browser",
      "Roles, reports and moderation",
    ],
  },
  problem: {
    number: "01",
    label: "THE PROBLEM",
    title: "When your WhatsApp group has outgrown itself",
    body: "WhatsApp works brilliantly for small, close-knit groups. But as your community grows, the very things that made it easy start working against you. If you're juggling multiple groups, spreadsheets and payment screenshots just to keep things running, it's a sign your community has outgrown the chat.",
    items: [
      {
        name: "Critical updates get lost in the noise",
        desc: "Announcements, decisions and important links disappear under a flood of replies. There's no central feed for members to catch up on later.",
      },
      {
        name: "You don't have a real member directory",
        desc: "A list of phone numbers isn't enough. Members can't easily find each other by profession, city, batch or area of interest.",
      },
      {
        name: "Payments, RSVPs and data are scattered",
        desc: "Events run on Google Forms, money comes in as UPI screenshots, and admins spend hours reconciling everything manually.",
      },
      {
        name: "Moderation isn't built for scale",
        desc: "With only an all-or-nothing 'remove member' option, admins are left with blunt tools. There's no way to warn, report, or delegate safely.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "Your community deserves a home of its own",
    body: "Stop patching together WhatsApp, Google Forms, spreadsheets and UPI screenshots. The Parliament brings everything your community needs into one beautifully simple platform—so you can focus on building connections, not chasing payments or lost updates.",
    cards: [
      {
        icon: "feed",
        name: "Content and connections",
        items: [
          "A permanent, searchable feed where every update stays findable",
          "A member directory that helps people connect meaningfully",
        ],
      },
      {
        icon: "groups",
        name: "Conversations, organised",
        items: [
          "Public and private groups to keep conversations organised",
          "Direct messages, video calls and live AMA rooms",
        ],
      },
      {
        icon: "events",
        name: "Events and memberships",
        items: [
          "Events with RSVPs, paid tickets, check-ins and feedback",
          "Paid membership tiers with automatic renewals and invoices",
        ],
      },
      {
        icon: "admin",
        name: "Safety and reach",
        items: [
          "Smart moderation with roles, report queue and audit logs",
          "WhatsApp, email and push notifications that actually reach people",
        ],
      },
    ],
  },
  compare: {
    number: "03",
    label: "HONEST COMPARISON",
    title: "WhatsApp group vs a community app",
    body: "WhatsApp is the right tool for a small group that mostly chats. A community app is the right tool once you need structure, money or moderation. Here is where each one wins.",
    columns: ["", "WhatsApp group", "The Parliament"],
    rows: [
      ["Members already have it", "Yes, nothing to install", "No. Members sign up once, then add it to the home screen"],
      ["Cost to start", "Free", "Set up by Timewheel; ask us for a quote"],
      ["End-to-end encrypted chats", "Yes", "No. Messages are stored on the server so moderators can act on reports"],
      ["Posts stay findable", "Scroll and search one chat", "Feed with saved posts, hashtags and search across posts, people, groups and events"],
      ["Member directory", "Contact list only", "Member profiles and a searchable directory"],
      ["Sub-groups", "Separate groups, or a WhatsApp Community", "Public and private groups, each with its own feed, events and moderators"],
      ["Events", "Event messages with RSVPs", "RSVPs, paid registration, attendance check-in and feedback"],
      ["Collecting money", "UPI screenshots, matched by hand", "Paid memberships and event tickets through Razorpay, with membership invoices"],
      ["Moderation", "Remove members, admin-only messages", "Report queue, warnings, suspensions, role-based admin permissions and an audit log"],
      ["Video", "Group calls", "One-to-one video calls and live Ask-Me-Anything rooms"],
      ["Reaching everyone", "Every message notifies", "Push and email notifications, plus WhatsApp template broadcasts to members who opt in"],
    ],
    verdict:
      "Stay on WhatsApp if your group is small and mostly chat. Move when announcements get lost, money is tracked in screenshots, or admins can't keep up.",
  },
  features: {
    number: "04",
    label: "WHAT'S INSIDE",
    title: "All the tools you need. Built to work together.",
    body: "Every piece is designed to solve real community headaches. Hover or tap any feature to see how it fits into your day-to-day.",
    items: [
      {
        icon: "feed",
        name: "Feed and discussions",
        desc: "A ranked feed where text, photo, poll, question, quote and link posts stay easy to find.",
        bullets: ["Reactions, comments and awards", "@mentions and #hashtags", "Saved posts and drafts"],
      },
      {
        icon: "groups",
        name: "Groups",
        desc: "Public or private groups for every sub-topic, city or team, each with its own feed and events.",
        bullets: ["Group admins and moderators", "Join and leave in a tap", "Requests to group admins"],
      },
      {
        icon: "events",
        name: "Events",
        desc: "Create an event, collect RSVPs or sell tickets, check people in at the door and ask for feedback after.",
        bullets: ["Paid registration via Razorpay", "Attendance check-in", "Invites sent in waves by member tier"],
      },
      {
        icon: "messages",
        name: "Messages and video calls",
        desc: "One-to-one direct messages with photos and reactions, plus video calls and live Ask-Me-Anything rooms.",
        bullets: ["Read status and reactions", "Video calls by membership tier", "AMA rooms for hosts"],
      },
      {
        icon: "membership",
        name: "Paid memberships",
        desc: "Membership tiers with their own perks, paid through Razorpay, with renewals, expiry and invoices handled for you.",
        bullets: ["UPI, cards and netbanking", "Perks unlocked by tier", "Invoices and receipts"],
      },
      {
        icon: "admin",
        name: "Admin and moderation",
        desc: "An admin console where moderators review reports, warn or suspend members and broadcast updates.",
        bullets: ["Role-based admin permissions", "Report queue and audit log", "WhatsApp and email broadcasts"],
      },
    ],
    alsoLabel: "Also inside",
    also: [
      "Member directory",
      "Business directory",
      "Photo gallery albums",
      "Site-wide search",
      "Push and email notifications",
      "Karma reputation",
      "Badges and leaderboards",
      "Daily games",
      "Scheduled announcements",
      "Google sign-in",
    ],
  },
  process: {
    number: "05",
    label: "HOW TO MOVE",
    title: "How to move a WhatsApp group to an app",
    body: "You don't have to shut the WhatsApp group down on day one. Most communities move in four steps and keep WhatsApp for alerts.",
    steps: [
      {
        icon: "setup",
        name: "Set it up",
        desc: "Book a demo. We walk through how your community runs today and set up The Parliament for it.",
      },
      {
        icon: "invite",
        name: "Bring members in",
        desc: "Import your member list from a CSV and send everyone an invite to set a password, or let them sign in with Google.",
      },
      {
        icon: "structure",
        name: "Rebuild the structure",
        desc: "Create a group for each topic or city, post your rules and schedule the first event.",
      },
      {
        icon: "announce",
        name: "Announce it on WhatsApp",
        desc: "Share the link in the old group. Members who opt in keep getting updates on WhatsApp, and memberships and tickets bring money in without screenshots.",
      },
    ],
    notes: ["No app-store download", "Members keep WhatsApp for alerts", "Set up by Timewheel"],
  },
  audiences: {
    number: "06",
    label: "WHO IT'S FOR",
    title: "Built for any community that has outgrown a group chat",
    items: [
      {
        name: "Event creators",
        desc: "Meetup hosts, workshop runners and organisers who sell tickets and want attendees to stay connected between events.",
      },
      {
        name: "Clubs and associations",
        desc: "Sports clubs, societies and member associations that collect fees, run committees and need a members-only space.",
      },
      {
        name: "Interest groups",
        desc: "Hobby circles, professional networks and city communities that have split into too many WhatsApp groups.",
      },
      {
        name: "Creator communities",
        desc: "Creators who want a paid membership, a feed of their own and live AMA sessions with their audience.",
      },
    ],
    crossLink: {
      text: "Running an alumni association instead?",
      label: "See Alluminaty",
      href: "/products/alluminaty",
    },
  },
  capabilities: {
    number: "07",
    label: "WHAT TIMEWHEEL BUILT",
    title: "Built and run in production by Timewheel.",
    body: "Timewheel designed and built The Parliament end to end, and it runs in production today for a registered membership association in Nagpur.",
    items: [
      { icon: "compass", label: "Product strategy" },
      { icon: "pen", label: "UX and UI design" },
      { icon: "code", label: "Next.js web app" },
      { icon: "database", label: "PostgreSQL database" },
      { icon: "shield", label: "Auth and admin roles" },
      { icon: "wallet", label: "Razorpay payments" },
      { icon: "video", label: "LiveKit video calls" },
      { icon: "bell", label: "Web push and email" },
      { icon: "message", label: "WhatsApp broadcasts" },
    ],
    linkLabel: "Read the case study",
    linkHref: "/case-studies/the-parliament",
  },
  faq: {
    number: "08",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is The Parliament?",
        a: "The Parliament is an online community platform for communities in India, built by Timewheel in Nagpur. It gives a community its own app with a feed, groups, events with paid registration, direct messages, video calls, paid membership tiers and an admin console for moderation. Payments run on Razorpay.",
      },
      {
        q: "Is The Parliament a good WhatsApp group alternative for communities?",
        a: "Yes, for communities that need more than chat. WhatsApp is better for small groups that mostly talk, because everyone already has it and chats are end-to-end encrypted. The Parliament is better once you need a findable feed, a member directory, sub-groups, paid events, memberships and real moderation tools.",
      },
      {
        q: "How do I move my WhatsApp group to an app?",
        a: "Set up The Parliament, import your members from a CSV so each one gets an invite, recreate your topics as groups, then share the link in the WhatsApp group. You can keep the WhatsApp group for alerts, and send template broadcasts to members who opt in to WhatsApp updates.",
      },
      {
        q: "Can I run a paid community on The Parliament?",
        a: "Yes. You can sell membership tiers with different perks and sell tickets to events. Members pay in rupees through Razorpay with UPI, cards or netbanking. Renewals, expiry, receipts and membership invoices are handled by the platform, so nobody matches UPI screenshots by hand.",
      },
      {
        q: "Does The Parliament work for event-led communities?",
        a: "Yes. Organisers can create events, collect RSVPs or paid registrations, check attendees in, collect feedback after the event, and send invites in waves by membership tier. Attendees stay in the community feed and groups between events.",
      },
      {
        q: "Do members need to install an app?",
        a: "No app store download is needed. The Parliament is a web app that works in any phone or desktop browser and can be added to the home screen like an app. Members get push notifications on supported browsers and email notifications for the rest.",
      },
      {
        q: "How do moderators keep the community safe?",
        a: "Members can report posts and comments, and reports land in a moderation queue. Admins can warn, suspend or ban members, members can block each other, and admin powers are split by role so a moderator can handle reports without access to payments. Admin actions are recorded in an audit log.",
      },
      {
        q: "How much does The Parliament cost?",
        a: "Pricing depends on your community's size and what you need set up, so we quote after a short demo. Book a demo and tell us how your community runs today.",
      },
      {
        q: "Is The Parliament used by a real community?",
        a: "Yes. It runs in production today for a registered membership association in Nagpur, which uses its feed, groups, events, paid memberships, messaging and video calls.",
      },
    ],
  },
  final: {
    title: "Give your community a home beyond the group chat.",
    body: "Tell us how your community runs today, on WhatsApp, forms and spreadsheets, and we'll show you the same community on The Parliament.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "How we built it",
    secondaryHref: "/case-studies/the-parliament",
  },
};
