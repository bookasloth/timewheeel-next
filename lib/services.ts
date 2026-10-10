import { caseStudies, type CaseStudy } from "@/lib/case-studies";

// Service landing pages, in the order they're cross-linked, and which case-study
// tags count as proof for each. Drives the "Related services" / "Results"
// blocks on service pages, the service links on case studies and the footer.

// `name` is the link text on service pages; `short` is for tight spots like the footer.
export type ServicePage = { name: string; short: string; href: string; blurb: string; tags: string[] };

export const servicePages: ServicePage[] = [
  {
    name: "SEO Company in Nagpur",
    short: "SEO",
    href: "/seo-company-in-nagpur",
    blurb: "Local, technical and AI-search SEO, starting with a free audit.",
    tags: ["SEO", "Local SEO", "Google Business", "Content"],
  },
  {
    name: "Digital Marketing Company in Nagpur",
    short: "Digital Marketing",
    href: "/digital-marketing-company-in-nagpur",
    blurb: "Paid ads, SEO, social and content run as one growth system.",
    tags: ["Performance", "Ad Copy", "Campaign", "Copywriting", "Creative", "Creative Testing", "Landing Pages", "Funnel"],
  },
  {
    name: "Social Media Marketing in Nagpur",
    short: "Social Media Marketing",
    href: "/social-media-marketing-company-in-nagpur",
    blurb: "Content and campaigns that stop the scroll.",
    tags: [],
  },
  {
    name: "Website Design in Nagpur",
    short: "Website Design",
    href: "/website-design-company-in-nagpur",
    blurb: "Conversion-focused design for local businesses.",
    tags: ["Web Design", "Portfolio"],
  },
  {
    name: "Web Development in Nagpur",
    short: "Web Development",
    href: "/web-development-company-in-nagpur",
    blurb: "Fast, SEO-ready websites on a fixed price.",
    tags: ["Web Design"],
  },
  {
    name: "Web App Development in Nagpur",
    short: "Web App Development",
    href: "/web-app-development-company-in-nagpur",
    blurb: "Custom software built around how your business works.",
    tags: ["Web App", "Product Design", "Design System", "Dashboard", "Membership", "Subscriptions", "Payments", "Payouts", "Scheduling", "Ticketing", "Analytics", "Access Control", "Creator Tools"],
  },
  {
    name: "Shopify Development in Nagpur",
    short: "Shopify Development",
    href: "/shopify-development-company-in-nagpur",
    blurb: "Shopify stores designed and tuned to sell.",
    tags: ["Shopify"],
  },
  {
    name: "Restaurant Marketing",
    short: "Restaurant Marketing",
    href: "/restaurant-marketing",
    blurb: "Footfall and online orders for restaurants and cafes.",
    tags: [],
  },
];

// Case studies that are real builds; placeholders aren't promoted by links.
export const realCaseStudies = caseStudies.filter((c) => !c.placeholder);

/** Service pages a case study is proof for, by its tags. */
export function servicesFor(cs: CaseStudy): ServicePage[] {
  return servicePages.filter((s) => s.tags.some((t) => cs.tags.includes(t)));
}

/** Real case studies that back a service page. */
export function caseStudiesFor(href: string, limit = 3): CaseStudy[] {
  return realCaseStudies.filter((c) => servicesFor(c).some((s) => s.href === href)).slice(0, limit);
}
