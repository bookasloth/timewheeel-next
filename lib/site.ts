// Central site config. Swap URLs when real assets land.
export const site = {
  name: "Timewheel",
  url: "https://timewheel.co.in",
  demoUrl: "https://timewheel.co.in/book-a-demo",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://timewheel.co.in/book-a-demo",
  tagline: "Build on systems you control forever",
  social: {
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
};
