// Case studies for the Timewheel product ecosystem (lib/products.ts), kept in
// their own file so the ~10 entries stay reviewable next to the client work in
// lib/case-studies.ts. Type-only import, so no runtime cycle.
//
// Content here is grounded in what the products actually are: the taglines,
// blurbs and pricing tiers in lib/products.ts and lib/pricing.ts. There are
// deliberately NO performance stats, no client quotes and no invented budgets
// or durations, because none of that has been measured or supplied. Stats show
// published pricing and shipped capability only. Fill in real figures if they
// become available.
import type { CaseStudy } from "./case-studies";

export const productCaseStudies: CaseStudy[] = [
  {
    slug: "alluminaty",
    name: "Alluminaty",
    tagline: "The social network for your alumni",
    category: "Education · Community Platform",
    summary:
      "A modern social network for alumni. Graduates discover each other by batch, city, company or profession, build professional profiles, find mentors, share opportunities and stay connected for life.",
    accent: "#269cef",
    image: null,
    tags: ["Product Design", "Web App", "Dashboard", "Membership"],
    href: "/case-studies/alluminaty",
    liveUrl: "/products/alluminaty",
    meta: { readTime: "3 min", services: ["Product Design", "UI / UX", "Web App"] },
    content: {
      hero: {
        title: "The alumni network your",
        titleAccent: "graduates actually use.",
        summary:
          "Most institutions lose touch with graduates the moment they leave. Alluminaty gives them a modern social network, built so alumni discover each other, connect and stay close for life.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹49", label: "per month" },
        { value: "Directory", label: "search by batch, city, company" },
        { value: "Chapters", label: "events, reunions & mentorship" },
        { value: "Verified", label: "member badges" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "The community fades after graduation.",
          body: "Every institution builds a tight community, then graduation scatters it. Batchmates lose touch, there's no way to find a mentor or an open role, and the group chats die the moment the cohort moves on.",
          bullets: [
            "Classmates spread across cities, companies and countries",
            "No way for a graduate to find a batchmate, mentor or open role",
            "Events, chapters and opportunities run on dying group chats",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Built like a social network, not a database.",
          body: "Rather than another admin tool, we built the product graduates want to open. A verified identity and directory first, because a network nobody can search is just a list. Then a feed, chapters, events, mentorship and opportunities on top, so reconnecting is two taps from a profile.",
          bullets: [
            "Verified alumni directory with professional profiles and filters",
            "Feed, chapters, events and reunions in one product",
            "Jobs, referrals, mentorship and alumni opportunities",
            "Verified member badges so the network stays trusted",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Priced for a single institution, not an enterprise deal.",
          body: "The published plan is ₹49 per month and includes the alumni directory, events and giving tools, and verified member badges. That price point is the point: the platform is built so a single college can adopt it without a procurement cycle.",
        },
      ],
      closing: {
        title: "Want a home for your alumni?",
        body: "Tell us about your institution and the community you want to keep connected, and we'll show you what one platform looks like.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "Who is Alluminaty for?",
        a: "Schools, colleges, universities and coaching networks that want a modern, lifelong alumni community, directory, professional profiles, chapters, events, mentorship and opportunities in one product.",
      },
      {
        q: "What does Alluminaty cost?",
        a: "₹49 per month, including the alumni directory, events and giving tools, and verified member badges.",
      },
      {
        q: "What makes it different?",
        a: "It is built like a social network graduates want to open, not an admin tool. Verified profiles, a feed, chapters, events, mentorship and opportunities keep alumni connected long after graduation.",
      },
    ],
  },
  {
    slug: "book-a-sloth",
    name: "Book A Sloth",
    tagline: "Booking, payments and reminders in one system",
    category: "SaaS · Booking Platform",
    summary:
      "An India-first appointment booking and scheduling platform. 24/7 booking pages, UPI and Razorpay payments, two-way Google Calendar sync, automatic WhatsApp and email reminders, and GST invoicing.",
    accent: "#fe5100",
    image: null,
    tags: ["Product Design", "Design System", "Payments", "Scheduling"],
    href: "/case-studies/book-a-sloth",
    liveUrl: "https://bookasloth.com",
    meta: { readTime: "3 min", services: ["Product Design", "UI / UX", "Development"] },
    content: {
      hero: {
        title: "Booking that runs itself.",
        titleAccent: "Payments, reminders, invoicing.",
        summary:
          "Book A Sloth is a live appointment booking platform built for Indian service businesses: take bookings 24/7, get paid up front, and let the follow-up happen automatically.",
        badge: "Live product",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹19", label: "per month" },
        { value: "500", label: "bookings / month included" },
        { value: "24/7", label: "booking pages" },
        { value: "UPI", label: "and Razorpay payments" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Bookings leak between tools.",
          body: "A typical service business takes appointments over a call, writes them into a diary, then chases payment and reminds the customer by hand. Every handoff is a chance to lose the booking, and the owner ends up as the scheduling engine.",
          bullets: [
            "Availability lives in one person's head or a paper diary",
            "No-shows because confirmations and reminders are manual",
            "Payments, invoicing and GST tracked in a separate spreadsheet",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Own the whole appointment, not just the calendar slot.",
          body: "We treated booking as one continuous flow rather than a form. The customer picks a slot and pays in the same pass, the calendar updates in both directions, and every confirmation and reminder is sent without anyone being asked to remember.",
          bullets: [
            "24/7 booking pages, so customers book outside business hours",
            "UPI and Razorpay payments collected up front",
            "Two-way Google Calendar sync, so the diary can't drift",
            "Automatic WhatsApp and email reminders to cut no-shows",
            "GST invoicing built in, not bolted on afterwards",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Running live, and used on our own demos.",
          body: "The platform is live at bookasloth.com. The published plan is ₹19 per month for up to 500 bookings a month, with automated reminders and custom booking pages included. We dogfood it: our own demo bookings are scheduled through Book A Sloth.",
        },
      ],
      closing: {
        title: "Want your bookings to run themselves?",
        body: "See the live product, then talk through how it would work for your business.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Book A Sloth do?",
        a: "Appointment booking and scheduling for service businesses: 24/7 booking pages, UPI and Razorpay payments, two-way Google Calendar sync, WhatsApp and email reminders, GST invoicing, and a business dashboard.",
      },
      {
        q: "How much does it cost?",
        a: "₹19 per month, including up to 500 bookings a month, automated reminders and custom booking pages.",
      },
      {
        q: "Is it live?",
        a: "Yes, at bookasloth.com. It is also the platform we use to run our own product demos.",
      },
    ],
  },
  {
    slug: "coffee-for-me",
    name: "Coffee and Toffee",
    tagline: "Direct audience-to-creator support",
    category: "Creator Tools · Monetization",
    summary:
      "A creator monetization platform where audiences support creators through simple, meaningful contributions. Sustainable income for creators, and a direct line to the community that funds it.",
    accent: "#ffcc1c",
    image: null,
    tags: ["Product Design", "Payments", "Creator Tools", "Payouts"],
    href: "/case-studies/coffee-for-me",
    meta: { readTime: "3 min", services: ["Product Design", "UI / UX", "Payments"] },
    content: {
      hero: {
        title: "Creators paid directly,",
        titleAccent: "by the people who value them.",
        summary:
          "Coffee and Toffee lets an audience support a creator with a simple contribution, with instant payouts and no monthly fee, so the relationship and the revenue stay in the creator's hands.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "3%", label: "per contribution" },
        { value: "Instant", label: "payouts" },
        { value: "Zero", label: "monthly fee" },
        { value: "Direct", label: "supporter messages" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Creators rent their audience.",
          body: "Independent creators earn from a mix of ad revenue, platform payouts and whatever a tipping widget allows. The audience belongs to the platform, the payout arrives on someone else's schedule, and the supporter gets no real way to reach the creator.",
          bullets: [
            "Revenue dependent on platforms that can change terms or rates",
            "Slow, opaque payout schedules",
            "No direct line from supporter back to creator",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Make the contribution the whole product.",
          body: "We kept the flow to a single action: support someone. No subscription to manage, no feature tour, no monthly commitment. The creator keeps the relationship because the supporter can reach them directly.",
          bullets: [
            "Simple tipping and creator support tools",
            "Direct audience-to-creator monetization",
            "Supporter messages, so support is two-way",
            "Instant payouts rather than a monthly settlement window",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "No monthly fee, one transparent rate.",
          body: "The published model is 3% per contribution with instant payouts and no monthly fee. For a creator who would otherwise pay a subscription to receive support, the cost only exists when the support does.",
        },
      ],
      closing: {
        title: "Building for an audience, not a platform?",
        body: "Tell us how you earn today and we'll show you what direct support looks like.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What is Coffee and Toffee?",
        a: "A creator monetization platform. Audiences support creators through simple contributions, with instant payouts, supporter messages and no monthly fee.",
      },
      {
        q: "How much does it cost?",
        a: "3% per contribution, with no monthly fee.",
      },
      {
        q: "Who is it for?",
        a: "Independent creators and the communities around them, who want sustainable income and a direct relationship with their supporters.",
      },
    ],
  },
  {
    slug: "ticket-dino",
    name: "Ticket Dino",
    tagline: "Event ticketing that holds at scale",
    category: "Events · Ticketing",
    summary:
      "An event ticketing and management platform for organizers who need reliability at scale: ticket sales, attendee management, real-time analytics and operational workflows.",
    accent: "#269cef",
    image: null,
    tags: ["Product Design", "Ticketing", "Analytics", "Scale"],
    href: "/case-studies/ticket-dino",
    liveUrl: "/products/ticket-dino",
    meta: { readTime: "3 min", services: ["Product Design", "UI / UX", "Web App"] },
    content: {
      hero: {
        title: "Ticketing that survives",
        titleAccent: "the rush.",
        summary:
          "Ticket Dino handles ticket sales, attendee management and on-the-day operations, built for organizers whose reputation depends on the queue not falling over.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "2%", label: "per ticket sold" },
        { value: "Unlimited", label: "events" },
        { value: "QR", label: "check-in" },
        { value: "Real-time", label: "attendee analytics" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "The hard part of ticketing is the ten minutes around it.",
          body: "Selling a ticket is easy. What breaks is the spike when doors open, the check-in queue at the gate, and the organizer trying to answer 'how many people are still coming' from a static report. That is where events are actually lost.",
          bullets: [
            "Traffic spikes at on-sale and again at doors-open",
            "Manual check-in lists that queue at the gate",
            "Attendee numbers only available after the fact",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Design for the spike, then the door.",
          body: "We optimised the two moments that decide the event. Purchase is short and resumable, so a dropped connection mid-checkout does not lose the sale. Check-in is a scan, and the counter updates as people come through.",
          bullets: [
            "Short, resumable purchase flow",
            "QR check-in with a live attendee count",
            "Real-time analytics and attendee tracking",
            "Scalable infrastructure for high-volume events",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "A flat rate that doesn't punish volume.",
          body: "The published model is 2% per ticket sold with unlimited events, real-time attendee analytics and QR check-in included. Charging per event would tax organizers for succeeding, so the plan is deliberately per-ticket instead.",
        },
      ],
      closing: {
        title: "Running events that have to work?",
        body: "Tell us about your last event that went sideways, and we'll show you what changes.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does Ticket Dino do?",
        a: "Event ticketing and management: ticket sales, attendee management, real-time analytics and QR check-in, built for high-volume events.",
      },
      {
        q: "How is Ticket Dino priced?",
        a: "2% per ticket sold, with unlimited events, real-time attendee analytics and QR check-in included.",
      },
      {
        q: "What is it built for?",
        a: "Modern organizers who need reliability at scale, from the on-sale rush to on-the-day door operations.",
      },
    ],
  },
  {
    slug: "the-parliament",
    name: "The Parliament",
    tagline: "Memberships, billing and access control",
    category: "Community · Membership",
    summary:
      "Membership and subscription management for communities, organizations and digital institutions: recurring memberships, secure payments, engagement and access control in one place.",
    accent: "#ff4d93",
    image: null,
    tags: ["Membership", "Subscriptions", "Access Control", "Payments"],
    href: "/case-studies/the-parliament",
    meta: { readTime: "3 min", services: ["Product Design", "UI / UX", "Membership"] },
    content: {
      hero: {
        title: "Members, billing and access,",
        titleAccent: "one system.",
        summary:
          "The Parliament runs memberships for communities, organizations and digital institutions: recurring billing, secure payments, engagement and role-based access control together.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹29", label: "per month" },
        { value: "Unlimited", label: "members" },
        { value: "Recurring", label: "billing" },
        { value: "Role-based", label: "access control" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "A member list and a payment list drift apart.",
          body: "Communities usually hold membership in one tool and money in another. The moment a payment fails or someone upgrades, the two disagree, and access decisions get made from whichever list someone checked first.",
          bullets: [
            "Member records and payment records maintained separately",
            "Access granted and revoked by hand after every billing change",
            "No single view of who is active, lapsed or overdue",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Billing is the source of truth.",
          body: "We made the subscription the primary record, so entitlement follows payment automatically. Roles and permissions sit on top, which means joining a tier is what grants access rather than a separate manual step.",
          bullets: [
            "Membership and subscription automation",
            "Secure recurring payment systems",
            "Community engagement tooling",
            "Access and role control tied to membership state",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Unlimited members, flat monthly price.",
          body: "The published plan is ₹29 per month and includes unlimited members, recurring billing and access and role control. Charging per member would put a growth ceiling on communities, which is the opposite of what a membership tool should do.",
        },
      ],
      closing: {
        title: "Running a community on manual admin?",
        body: "Tell us how your memberships and payments are tracked today, and we'll show you the consolidated version.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does The Parliament do?",
        a: "Membership and subscription management for communities, organizations and digital institutions, covering recurring billing, secure payments, engagement and access control.",
      },
      {
        q: "How much does it cost?",
        a: "₹29 per month, with unlimited members, recurring billing and access and role control included.",
      },
      {
        q: "Does it limit how many members I can have?",
        a: "No. The plan includes unlimited members.",
      },
    ],
  },
  {
    slug: "link-lantern",
    name: "Link Lantern",
    tagline: "One link that holds a whole profile",
    category: "Profiles · Link in Bio",
    summary:
      "A link and profile page for sharing work, writing and contact details from a single URL, with unlimited links and basic analytics at no monthly cost.",
    accent: "#4ab765",
    image: null,
    tags: ["Product Design", "Profiles", "Analytics"],
    href: "/case-studies/link-lantern",
    meta: { readTime: "2 min", services: ["Product Design", "UI / UX"] },
    content: {
      hero: {
        title: "One link.",
        titleAccent: "Everything you make.",
        summary:
          "Link Lantern is a profile page for the people whose work is scattered across a dozen platforms and needs one durable URL to point at.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "Free", label: "forever" },
        { value: "Unlimited", label: "links" },
        { value: "Custom", label: "profile page" },
        { value: "Basic", label: "analytics" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "The bio link became a bottleneck.",
          body: "The one-link page solved a 2018 problem and then kept the problem shape. A fixed slot list, a preview that no longer looks like the profile, and no idea which links anyone actually clicks.",
          bullets: [
            "One destination forced for a body of work",
            "No signal on which links get used",
            "Pages that drift out of sync with the profiles they replace",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Free at the base, honest about the ceiling.",
          body: "The interesting constraint here was price. A link page is infrastructure, not a premium product, so the base plan stays free and complete for the common case, with analytics included rather than held back.",
          bullets: [
            "Unlimited links on the free plan",
            "Custom profile page rather than a fixed template",
            "Basic analytics so links can be judged on clicks",
          ],
        },
        {
          eyebrow: "Status",
          title: "Early, and deliberately unpriced up.",
          body: "The plan is free forever with unlimited links, a custom profile page and basic analytics. No monthly fee is attached to the base product. More detail on the roadmap hasn't been published yet, so treat this entry as a starting point rather than a finished case study.",
        },
      ],
      closing: {
        title: "Want your links in one place?",
        body: "Tell us what you need to share and we'll show you how Link Lantern handles it.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What is Link Lantern?",
        a: "A link and profile page for sharing work, writing and contact details from a single URL.",
      },
      {
        q: "How much does it cost?",
        a: "Free forever, including unlimited links, a custom profile page and basic analytics.",
      },
    ],
  },
  {
    slug: "marketing-bug",
    name: "Marketing Bug",
    tagline: "Learn from campaigns that failed",
    category: "Marketing · Research",
    summary:
      "A research product for marketers: curated failure case studies, weekly teardowns of campaigns that did not work, and a searchable archive to learn from.",
    accent: "#fe5100",
    image: null,
    tags: ["Product Design", "Research", "Content"],
    href: "/case-studies/marketing-bug",
    meta: { readTime: "2 min", services: ["Product Design", "Content"] },
    content: {
      hero: {
        title: "Study the campaigns",
        titleAccent: "that did not work.",
        summary:
          "Marketing Bug is built on a contrarian idea: failures are more instructive than wins, so they get documented properly instead of quietly deleted.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹9", label: "per month" },
        { value: "Weekly", label: "teardown" },
        { value: "Curated", label: "failure case studies" },
        { value: "Searchable", label: "archive" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Marketing post-mortems do not survive.",
          body: "Every team runs campaigns that fail and almost none of them write down why. The analysis lives in someone's head for about a fortnight, then the account is deleted and the next team repeats the same spend against the same mistake.",
          bullets: [
            "Failed campaigns deleted rather than analysed",
            "Lessons held informally and lost with staff turnover",
            "No shared reference to check a decision against",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Archive the losses.",
          body: "We inverted the usual format. Instead of celebrating wins, each entry records what was run, what it cost, what was expected and what happened, so the archive compounds as a body of evidence rather than a trophy shelf.",
          bullets: [
            "Curated failure case studies as the primary content",
            "A weekly teardown of a campaign that underperformed",
            "Searchable archive, so a lesson is findable before the same budget is spent",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Priced as a reference, not a course.",
          body: "The published plan is ₹9 per month for the curated failure case studies, the weekly teardown and the searchable archive. The build is content and retrieval work rather than software, and the price reflects that.",
        },
      ],
      closing: {
        title: "Learning from other people's failures?",
        body: "Tell us which channel keeps surprising you, and we'll show you what the archive covers.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What is Marketing Bug?",
        a: "A research product for marketers, built around curated failure case studies, a weekly campaign teardown and a searchable archive of campaigns that did not work.",
      },
      {
        q: "How much does it cost?",
        a: "₹9 per month for the curated failure case studies, the weekly teardown and the searchable archive.",
      },
    ],
  },
  {
    slug: "whatsloom",
    name: "WhatsLoom",
    tagline: "WhatsApp workflows on autopilot",
    category: "Messaging · Automation",
    summary:
      "A WhatsApp automation platform: automated message flows, broadcast campaigns and a reusable template library, so customer conversations run without manual follow-up.",
    accent: "#4ab765",
    image: null,
    tags: ["Automation", "WhatsApp", "Messaging", "Campaigns"],
    href: "/case-studies/whatsloom",
    meta: { readTime: "2 min", services: ["Product Design", "Automation"] },
    content: {
      hero: {
        title: "Conversations that keep going",
        titleAccent: "without you.",
        summary:
          "WhatsLoom turns the follow-up work that eats an afternoon into automated WhatsApp flows and broadcast campaigns, built from a reusable template library.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹25", label: "per month" },
        { value: "Automated", label: "WhatsApp flows" },
        { value: "Broadcast", label: "campaigns" },
        { value: "Template", label: "library" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "The channel customers prefer is the one nobody can automate.",
          body: "Most customers would rather message than call or email, so the work lands in a personal WhatsApp account. That makes it impossible to template, schedule, or hand over, and the follow-up depends on whoever replied last.",
          bullets: [
            "Customer conversations trapped in personal accounts",
            "Repeated messages retyped from scratch every time",
            "No record of what was sent or when",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Automate the repetitive, keep a person for the rest.",
          body: "We targeted the messages that are genuinely identical between customers, and left anything requiring judgement to a human. The template library is the core of it, so a workflow is assembled from proven messages instead of starting blank.",
          bullets: [
            "Automated WhatsApp flows for the repeatable messages",
            "Broadcast campaigns for announcements and offers",
            "Template library so common replies are written once",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Templated first, automated second.",
          body: "The published plan is ₹25 per month and covers automated WhatsApp flows, broadcast campaigns and the template library. Flow detail beyond the published feature list hasn't been documented publicly, so this entry covers the product's stated scope.",
        },
      ],
      closing: {
        title: "Drowning in WhatsApp follow-ups?",
        body: "Tell us which conversations eat the most time and we'll show you what can be automated.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does WhatsLoom do?",
        a: "Automates WhatsApp messaging for businesses, with automated flows, broadcast campaigns and a template library for common replies.",
      },
      {
        q: "How much does it cost?",
        a: "₹25 per month, including automated WhatsApp flows, broadcast campaigns and the template library.",
      },
    ],
  },
  {
    slug: "serp-sutra",
    name: "SERP Sutra",
    tagline: "Daily visibility into how you rank",
    category: "SEO · Analytics",
    summary:
      "An SEO visibility monitor: daily rank tracking, competitor watch and weekly reports, so a team can see movement without living in a spreadsheet.",
    accent: "#ff4d93",
    image: null,
    tags: ["SEO", "Analytics", "Reporting", "Tracking"],
    href: "/case-studies/serp-sutra",
    meta: { readTime: "2 min", services: ["Product Design", "Analytics"] },
    content: {
      hero: {
        title: "Know where you rank",
        titleAccent: "before the monthly report.",
        summary:
          "SERP Sutra tracks positions daily, watches competitors and sends a weekly summary, so SEO movement is visible the week it happens.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "₹15", label: "per month" },
        { value: "Daily", label: "rank tracking" },
        { value: "Competitor", label: "watch" },
        { value: "Weekly", label: "reports" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Monthly reporting hides the week that mattered.",
          body: "A rank report that lands once a month cannot tell you whether a change worked, because the interesting movement happened weeks earlier and got averaged away. By the time it arrives, the cause has scrolled out of memory.",
          bullets: [
            "Movement only visible in a monthly summary",
            "No view of which competitor moved and when",
            "Manual exports across several tools to answer one question",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Shorten the feedback loop.",
          body: "The product is deliberately narrow: track daily, compare against competitors, and summarise weekly. Reducing the interval from a month to a day is the whole idea, because a fast loop is what turns ranking data into a decision.",
          bullets: [
            "Daily rank tracking across tracked terms",
            "Competitor watch to see who is gaining on the same queries",
            "Weekly reports that summarise movement rather than dump it",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Monitoring, not a full SEO suite.",
          body: "The published plan is ₹15 per month covering daily rank tracking, competitor watch and weekly reports. It is a visibility tool rather than an all-in-one SEO platform, and is meant to sit alongside the work rather than replace it.",
        },
      ],
      closing: {
        title: "Finding out too late?",
        body: "Tell us which pages and terms matter most and we'll show you what daily visibility changes.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What does SERP Sutra do?",
        a: "Tracks how a site ranks for its target terms every day, watches competitors, and sends weekly reports summarising movement.",
      },
      {
        q: "How much does it cost?",
        a: "₹15 per month, including daily rank tracking, competitor watch and weekly reports.",
      },
      {
        q: "Is it a full SEO platform?",
        a: "No. It is a visibility and monitoring tool, intended to sit alongside SEO work rather than replace it.",
      },
    ],
  },
  {
    slug: "2b-navodian",
    name: "2B Navodian",
    tagline: "Guided JNV enrolment for schools",
    category: "Education · Admissions",
    summary:
      "A free enrolment assistant for schools guiding students through JNV admission: a document checklist, step-by-step process and deadline reminders.",
    accent: "#ffcc1c",
    image: null,
    tags: ["Product Design", "Admissions", "Education", "Free"],
    href: "/case-studies/2b-navodian",
    meta: { readTime: "2 min", services: ["Product Design", "Web App"] },
    content: {
      hero: {
        title: "JNV enrolment, guided",
        titleAccent: "for every student.",
        summary:
          "2B Navodian takes a confusing admissions process and turns it into a checklist: what documents are needed, what the steps are, and when the deadlines fall.",
        primaryCta: { label: "Book a call", href: "/book-a-demo" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "Free", label: "for schools" },
        { value: "Guided", label: "JNV enrolment" },
        { value: "Checklist", label: "of required documents" },
        { value: "Reminders", label: "before deadlines" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "Admissions guidance lives in a WhatsApp forward.",
          body: "The information exists, but it is scattered across a notification, a circular and whoever at the school happens to know the answer this year. Students and parents get different versions, and a missed deadline is discovered too late to fix.",
          bullets: [
            "Requirements circulated as forwards and PDFs of unclear origin",
            "No single list of documents actually needed",
            "Deadlines missed because they were not tracked",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "Turn guidance into a checklist.",
          body: "The insight was that most of the anxiety in an admissions process is not about the form, it is about not knowing what comes next. So the product is a tracked list with reminders, and the paperwork is attached to the step it belongs to.",
          bullets: [
            "Guided, step-by-step JNV enrolment flow",
            "Document checklist so nothing is discovered missing on the day",
            "Deadline reminders for students and parents",
            "Free for schools, removing the budget objection entirely",
          ],
        },
        {
          eyebrow: "Status",
          title: "Free, and the pricing is the strategy.",
          body: "The product is free for schools. That is a deliberate choice rather than a trial: the value only lands once a school hands it to students and parents, so charging the school would suppress exactly the distribution the product needs. School-specific deployment detail hasn't been published yet.",
        },
      ],
      closing: {
        title: "Guiding admissions every year?",
        body: "Tell us how your school runs enrolment today, and we'll show you what a shared checklist changes.",
        ctaLabel: "Book a call",
        ctaHref: "/book-a-demo",
      },
    },
    faq: [
      {
        q: "What is 2B Navodian?",
        a: "A free enrolment assistant for schools, guiding students through the JNV admission process with a document checklist, a guided flow and deadline reminders.",
      },
        {
          q: "Does it cost anything?",
          a: "No. It is free for schools.",
        },
      ],
    },
  {
    slug: "leo-coffee",
    name: "Leo Coffee",
    tagline: "Subscriptions, horeca bulk and a store locator in one Shopify build",
    category: "D2C · Subscription Coffee",
    summary:
      "A specialty roaster's Shopify store covering everything under one roof: collection pages, 3 to 24 month subscriptions, horeca bulk ordering for businesses, and a store locator for walk-in buyers.",
    accent: "#ff7a3d",
    image: null,
    tags: ["Shopify", "Subscriptions", "B2B / Horeca", "Store Locator"],
    href: "/case-studies/leo-coffee",
    liveUrl: "https://www.leocoffee.co.in/",
    meta: { client: "Leo Coffee", readTime: "3 min", services: ["Shopify Development", "Subscription Commerce", "B2B Ordering"] },
    content: {
      hero: {
        title: "One store for every way",
        titleAccent: "Nagpur drinks its coffee.",
        summary:
          "Leo Coffee is a live specialty roaster built on Shopify. A single catalogue serves retail subscribers, walk-in customers and horeca buyers, without splitting the brand across three disconnected stores.",
        badge: "Live Shopify store",
        primaryCta: { label: "Start a project", href: "/contact" },
        secondaryCta: { label: "More case studies", href: "/case-studies" },
      },
      stats: [
        { value: "3–24", label: "month subscription terms" },
        { value: "Horeca", label: "bulk ordering for businesses" },
        { value: "Locator", label: "store finder for walk-ins" },
        { value: "Shopify", label: "single catalogue" },
      ],
      sections: [
        {
          eyebrow: "The Challenge",
          title: "A roaster with four buyers, not one.",
          body: "Leo Coffee did not have a product problem. It had a routing problem. The same catalogue had to serve someone subscribing for a monthly delivery, a cafe ordering kilos for resale, and a neighbour who wants to know which outlet is closest to them.",
          bullets: [
            "Retail subscriptions, horeca bulk and equipment all competing for the same catalogue",
            "Long subscription terms that no off-the-shelf widget handled cleanly",
            "No reliable way for a first-time buyer to find the nearest outlet",
          ],
        },
        {
          eyebrow: "The Approach",
          title: "One catalogue, three buying paths.",
          body: "Rather than splitting the brand into separate stores, we built one catalogue and let the buying path branch at the product level. A shopper can land anywhere and still reach the right cart for what they actually came to do.",
          bullets: [
            "Collection pages for whole coffee, chicory blends, decoction, instant and equipment",
            "Subscriptions configurable from 3 to 24 months on recurring coffee",
            "Horeca bulk ordering with business enquiries on a separate buying path",
            "A store locator so nearby buyers can find an outlet instead of ordering online",
          ],
        },
        {
          eyebrow: "What's Shipped",
          title: "Running live at leocoffee.co.in.",
          body: "The store is live, with the collection structure, subscription options and store locator in place. It is a working Shopify build, not a concept: customers subscribe, businesses order in bulk, and walk-in buyers locate their nearest outlet through the same site.",
        },
      ],
      closing: {
        title: "Need a Shopify store that carries more than one kind of buyer?",
        body: "Tell us how your customers actually buy, and we will map the catalogue and the flows around it.",
        ctaLabel: "Start a project",
        ctaHref: "/contact",
      },
    },
    quote: {
      text: "The hard part was never the products. It was making a retail subscriber, a horeca buyer and a walk-in customer all feel like the store was built for them.",
      name: "Timewheel",
      role: "Shopify development",
    },
    faq: [
      {
        q: "What did you build for Leo Coffee?",
        a: "A Shopify store with collection pages for whole coffee, chicory blends, decoction, instant and equipment; subscriptions from 3 to 24 months; horeca bulk ordering; and a store locator.",
      },
      {
        q: "Why not use a subscription app off the shelf?",
        a: "Off-the-shelf widgets handled retail subscriptions well but did not fit the horeca bulk path or the store locator. We built those into the same catalogue rather than splitting the brand across separate stores.",
      },
      {
        q: "Is the store live?",
        a: "Yes, at leocoffee.co.in. It is a working Shopify build with the collection structure, subscription options and store locator in place.",
      },
    ],
  },
];
