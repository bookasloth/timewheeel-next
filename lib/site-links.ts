// Grouped site links. One list drives the footer and the /sitemap page, so a
// page added here shows up in both.

export type SiteLink = { label: string; href: string };
export type SiteLinkGroup = { title: string; links: SiteLink[] };

// The six services in the main nav (no Restaurant Marketing).
export const serviceLinks: SiteLink[] = [
  { label: "Website Design", href: "/website-design-company-in-nagpur" },
  { label: "Website Development", href: "/web-development-company-in-nagpur" },
  { label: "Shopify Development", href: "/shopify-development-company-in-nagpur" },
  { label: "Social Media Marketing", href: "/social-media-marketing-company-in-nagpur" },
  { label: "SEO", href: "/seo-company-in-nagpur" },
  { label: "Digital Marketing", href: "/digital-marketing-company-in-nagpur" },
];

export const productLinks: SiteLink[] = [
  { label: "Book A Sloth", href: "/products/book-a-sloth" },
  { label: "Alluminaty", href: "/products/alluminaty" },
  { label: "EZShop", href: "/products/ezshop" },
  { label: "Ticket Dino", href: "/products/ticket-dino" },
  { label: "The Parliament", href: "/products/the-parliament" },
  { label: "Coffee and Toffee", href: "/coffee-and-toffee" },
];

export const companyLinks: SiteLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const initiativeLinks: SiteLink[] = [
  { label: "30 Days, 30 Websites", href: "/30-days-30-websites" },
  { label: "Academy", href: "/academy" },
];

export const communityLinks: SiteLink[] = [
  { label: "Member Login", href: "/login" },
  { label: "Join Free", href: "/register" },
  { label: "Free Downloads", href: "/members/free-downloads" },
  { label: "Community", href: "/members/community" },
  { label: "Go Premium", href: "/members/premium" },
  { label: "Write for Us", href: "/write-for-us" },
];

export const otherLinks: SiteLink[] = [
  { label: "Newsletter", href: "/newsletter" },
  { label: "Free SEO Report", href: "/seo-report" },
  { label: "Book a Demo", href: "/book-a-demo" },
  { label: "Partner with Us", href: "/partners" },
  { label: "Leave a Review", href: "/review" },
  { label: "Sitemap", href: "/sitemap" },
];

export const legalLinks: SiteLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Refund & SLA", href: "/legal/refund" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "GST & Company Details", href: "/legal/company" },
];

export const footerRows: SiteLinkGroup[][] = [
  [
    { title: "Services", links: serviceLinks },
    { title: "Products", links: productLinks },
    { title: "Company", links: companyLinks },
  ],
  [
    { title: "Initiatives", links: initiativeLinks },
    { title: "Community", links: communityLinks },
    { title: "Others", links: otherLinks },
    { title: "Legals", links: legalLinks },
  ],
];
