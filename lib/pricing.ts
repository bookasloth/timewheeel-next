// ponytail: all numbers are PLACEHOLDERS — edit here when real pricing lands.
// Currency ₹ assumed from timewheel.co.in; swap freely.

export const standardPlan = {
  name: "Standard",
  tagline: "Pay-as-you-go. No setup fees, no monthly platform tax.",
  price: "2.5% + ₹5",
  unit: "per successful transaction",
  points: [
    "Every product, ready to use",
    "Unlimited team members",
    "Community support",
  ],
  cta: "Get started for free",
};

export const customPlan = {
  name: "Custom",
  tagline: "Tailored rates for high-volume businesses.",
  price: "Let's talk",
  unit: "volume-based pricing",
  points: [
    "Dedicated account manager",
    "Volume-based rates",
    "Priority implementation & SLA",
  ],
  cta: "Contact sales",
};

export type ProductPrice = {
  slug: string;
  price: string;
  unit: string;
  points: string[];
};

// keyed by product slug (see lib/products.ts)
export const productPricing: ProductPrice[] = [
  {
    slug: "book-a-sloth",
    price: "₹19",
    unit: "/ month",
    points: ["Up to 500 bookings/mo", "Automated reminders", "Custom booking pages"],
  },
  {
    slug: "ticket-dino",
    price: "2%",
    unit: "per ticket sold",
    points: ["Unlimited events", "Real-time attendee analytics", "QR check-in"],
  },
  {
    slug: "the-parliament",
    price: "₹29",
    unit: "/ month",
    points: ["Unlimited members", "Recurring billing", "Access & role control"],
  },
  {
    slug: "coffee-for-me",
    price: "3%",
    unit: "per contribution",
    points: ["Instant payouts", "Supporter messages", "Zero monthly fee"],
  },
  {
    slug: "link-lantern",
    price: "Free",
    unit: "forever",
    points: ["Unlimited links", "Custom profile page", "Basic analytics"],
  },
  {
    slug: "marketing-bug",
    price: "₹9",
    unit: "/ month",
    points: ["Curated failure case studies", "Weekly teardown", "Searchable archive"],
  },
  {
    slug: "alluminaty",
    price: "₹49",
    unit: "/ month",
    points: ["Alumni directory", "Event & fundraising tools", "Verified school badges"],
  },
  {
    slug: "whatsloom",
    price: "₹25",
    unit: "/ month",
    points: ["Automated WhatsApp flows", "Broadcast campaigns", "Template library"],
  },
  {
    slug: "serp-sutra",
    price: "₹15",
    unit: "/ month",
    points: ["Daily rank tracking", "Competitor watch", "Weekly reports"],
  },
  {
    slug: "2b-navodian",
    price: "Free",
    unit: "for schools",
    points: ["Guided JNV enrolment", "Document checklist", "Deadline reminders"],
  },
];
