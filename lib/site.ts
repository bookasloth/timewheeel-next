// Central site config. Swap URLs when real assets land.
export const site = {
  name: "Timewheel",
  url: "https://timewheel.co.in",
  demoUrl: "https://timewheel.co.in/book-a-demo",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://timewheel.co.in/book-a-demo",
  tagline: "Build on systems you control forever",
  contact: {
    email: "hello@timewheel.co.in",
    phone: "+91 79041 09359",
    whatsappDigits: "917904109359",
    city: "Nagpur",
    region: "Maharashtra, India",
    responseTime: "Within 1 business day",
    hours: "Mon–Sat · 10:00–19:00 IST",
  },
  social: {
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
};
