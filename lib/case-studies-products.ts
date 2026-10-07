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
    image: {
      src: "/portfolio/Alumni Connections Campus Collage.png",
      width: 1200,
      height: 675,
    },
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
    image: {
      src: "/portfolio/Sloth Booking App Celebration (1).png",
      width: 1200,
      height: 675,
    },
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
    image: {
      src: "/portfolio/coffee.png",
      width: 1200,
      height: 675,
    },
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
    image: {
      src: "/portfolio/ticket.png",
      width: 1200,
      height: 675,
    },
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
    image: {
      src: "/portfolio/Alumni Connections Campus Collage.png",
      width: 1200,
      height: 675,
    },
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
    slug: "leo-coffee",
    name: "Leo Coffee",
    tagline: "Subscriptions, horeca bulk and a store locator in one Shopify build",
    category: "D2C · Subscription Coffee",
    summary:
      "A specialty roaster's Shopify store covering everything under one roof: collection pages, 3 to 24 month subscriptions, horeca bulk ordering for businesses, and a store locator for walk-in buyers.",
    accent: "#ff7a3d",
    image: {
      src: "/portfolio/Leo-coffee.png",
      width: 1200,
      height: 675,
    },
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
