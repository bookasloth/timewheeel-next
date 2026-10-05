/** Homepage FAQ content. Single source for the visible accordion and the
 *  FAQPage JSON-LD on the home page, so the two can never drift. */

export type HomeFaqItem = { q: string; a: string };

export const homeFaq: {
  label: string;
  title: string;
  items: HomeFaqItem[];
} = {
  label: "FAQ",
  title: "Straight answers before you commit to anything",
  items: [
    {
      q: "What services does Timewheel actually offer?",
      a: "We build and run the systems a business depends on: website development, website design, search engine optimization, social media marketing, and digital marketing. Each one is a real service you can take on its own, or part of one connected system.",
    },
    {
      q: "Do I have to take all of them?",
      a: "No. Most clients start with the one problem costing them the most, usually the website or their search visibility, and add from there. The ecosystem is there so everything can share a single system when you are ready, not so you can buy everything on day one.",
    },
    {
      q: "Who owns the code, domains and accounts?",
      a: "You do. We build on systems you control forever: source code, domains, analytics, ad accounts and content stay in your name. Nothing we ship should be something you cannot take with you or keep running if we are no longer involved.",
    },
    {
      q: "Why replace tools we already pay for?",
      a: "Most businesses end up running on a stack of disconnected subscriptions that each hold a piece of their customers, revenue or operations. Consolidating means fewer monthly bills, fewer logins, and no platform deciding what you are allowed to do with your own audience and data.",
    },
    {
      q: "Can you work on an existing website or brand?",
      a: "Yes. We can start from what you already have, whether that is a live site, an existing brand, or a project that stalled halfway. We will tell you honestly when a rebuild is the better call rather than quietly patching something that needs replacing.",
    },
    {
      q: "How do we start?",
      a: "Book a demo. We walk through what you are trying to fix, what it is costing you today, and which parts of the ecosystem are genuinely worth doing first. There is no obligation, and you leave with a clear plan either way.",
    },
  ],
};