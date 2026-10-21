// Marketing Bug product page content.
// Marketing Bug is Timewheel's daily AI marketing newsletter. The copy below
// is original; the layout follows the same section structure the page was
// built with. No subscriber counts, ratings or testimonials with named
// individuals, so none of it goes into structured data
// (see app/products/marketing-bug/page.tsx).

export const mb = {
  path: "/products/marketing-bug",
  meta: {
    title: "Marketing Bug: Daily AI Marketing Newsletter",
    description:
      "Marketing Bug is Timewheel's free daily AI marketing newsletter. Every weekday: one story that matters in AI and marketing, a prompt you can run today, and one move to make — in a seven-minute read.",
  },
  hero: {
    eyebrow: "Marketing Bug, by Timewheel",
    logo: {
      src: "/products/marketing-bug-logo.png",
      alt: "Marketing Bug mascot",
      width: 1536,
      height: 1024,
    },
    title: "Everything happening in AI marketing,",
    titleAccent: "in your inbox weekly.",
    // Answer-first block (the passage AI answers lift). Keep it under 60 words.
    answer:
      "Marketing Bug is Timewheel's free daily AI marketing newsletter. Every weekday you get one story that matters in AI and marketing, a prompt you can run today, and one move to make — all in a seven-minute read. No spam, unsubscribe anytime.",
    formLabel: "Email address",
    formCta: "Subscribe free",
    image: {
      src: "/marketing-bug/bug7.png",
      alt: "The Marketing Bug mascot, delivering AI marketing news to your inbox",
      width: 1536,
      height: 1024,
    },
    poses: [{ src: "/marketing-bug/bug1.png", width: 1092, height: 1440 }],
  },
  valueProps: {
    label: "WHY IT WORKS",
    title: "Built for marketers who need to stay ahead",
    items: [
      {
        name: "One story that matters",
        bug: { src: "/marketing-bug/bug1.png", width: 1092, height: 1440 },
        desc: "Not a wall of links. Every issue picks the one thing that happened in AI and marketing that day, and explains what it actually means for your work.",
      },
      {
        name: "A prompt you can run today",
        bug: { src: "/marketing-bug/bug3.png", width: 1254, height: 1254 },
        desc: "Each issue ships with a practical AI prompt you can copy and use the same morning — for content, campaigns, research or analysis.",
      },
      {
        name: "One move to make",
        bug: { src: "/marketing-bug/bug4.png", width: 1254, height: 1254 },
        desc: "News without a next step is trivia. Every issue ends with a single move you can make this week, so reading turns into results.",
      },
    ],
  },
  about: {
    label: "THE NEWSLETTER",
    title: "A seven-minute read that keeps you",
    titleAccent: "ahead.",
    body: [
      "AI is rewriting marketing faster than any channel shift before it. Tools appear, platforms change the rules, and what worked last quarter quietly stops working. Staying on top of it usually means ten tabs and a doomscroll.",
      "Marketing Bug does the filtering for you. One editor reads what happened, cuts what does not matter, and hands you the story, the prompt and the move — before your first meeting of the day.",
    ],
    points: [
      "One story, one prompt, one move — every weekday",
      "Written by marketers, for marketers, in plain language",
      "Free forever, and unsubscribe in one click",
    ],
    image: {
      src: "/marketing-bug/bug2.png",
      alt: "The Marketing Bug mascot, reading the day's AI marketing news",
      width: 1254,
      height: 1254,
    },
  },
  services: {
    label: "WHAT YOU GET",
    title: "Every issue, built the same way",
    ctaLabel: "Read the blog",
    ctaHref: "/blog",
    items: [
      {
        icon: "keyword",
        name: "The story",
        desc: "The one development in AI and marketing that matters today — launches, policy shifts, research, platform updates — reported in context, not just linked.",
      },
      {
        icon: "content",
        name: "Why it matters",
        desc: "A short, honest read on what the story means for people who run campaigns, write content or own growth, and what it changes for them.",
      },
      {
        icon: "technical",
        name: "The daily prompt",
        desc: "A copy-paste AI prompt tuned to a real marketing task: briefs, landing page copy, audience research, analysis. Run it before your coffee cools.",
      },
      {
        icon: "links",
        name: "Worth reading",
        desc: "The best pieces, threads and reports from around the web — curated so you never have to wonder what you missed.",
      },
      {
        icon: "migration",
        name: "Tools & resources",
        desc: "New tools, templates and datasets worth your time, tested before they are recommended, with an honest note on who they are for.",
      },
      {
        icon: "ecommerce",
        name: "The move",
        desc: "One concrete action to take this week. Small enough to actually do, specific enough to matter.",
      },
    ],
  },
  momentum: {
    label: "STAY AHEAD",
    title: "AI marketing moves fast. You will",
    titleAccent: "keep up.",
    body: [
      "The marketers who win with AI are not the ones who read the most; they are the ones who notice what changed first and act on it while it is still an edge.",
      "Read Marketing Bug daily and the compound effect is real: you spot shifts weeks before they become common knowledge, and you always have a prompt ready to move.",
    ],
    ctaLabel: "See what you have been missing",
    ctaHref: "/blog",
    image: {
      src: "/marketing-bug/bug6.png",
      alt: "The Marketing Bug mascot, keeping pace with AI marketing",
      width: 1254,
      height: 1254,
    },
  },
  process: {
    label: "HOW IT WORKS",
    title: "A daily habit, without the work",
    steps: [
      {
        icon: "audit",
        tag: "Every weekday",
        name: "It lands in your inbox",
        bug: { src: "/marketing-bug/bug5.png", width: 1159, height: 1357 },
        desc: "One email, every weekday morning. No digests of digests, no re-sends — just that day's issue, ready when you are.",
      },
      {
        icon: "fix",
        tag: "7-minute read",
        name: "Story, prompt, move",
        bug: { src: "/marketing-bug/bug7.png", width: 1254, height: 1254 },
        desc: "Read it end to end on a coffee break. Copy the prompt, note the move, and you are done — smarter than the people who skipped it.",
      },
      {
        icon: "track",
        tag: "On your terms",
        name: "Read, reply, or leave",
        bug: { src: "/marketing-bug/bug8.png", width: 1254, height: 1254 },
        desc: "Read it in your inbox or on the web, hit reply to reach the editor, and unsubscribe in one click if it stops earning its place.",
      },
    ],
  },
  integrations: {
    label: "WHERE TO READ",
    title: "Read it wherever you already are",
    body: "Marketing Bug meets you in the tools you open every day. Subscribe by email, browse every past issue on the web, or follow along in the feeds and platforms you already check.",
    items: [
      { icon: "search", name: "Email inbox", hint: "Every weekday morning" },
      { icon: "analytics", name: "Web archive", hint: "Every past issue" },
      { icon: "cms", name: "RSS feed", hint: "Read in your reader" },
      { icon: "shop", name: "Slack", hint: "Share with your team" },
      { icon: "sheet", name: "LinkedIn", hint: "Snippets and takes" },
      { icon: "headless", name: "X / Twitter", hint: "Daily highlights" },
      { icon: "speed", name: "YouTube", hint: "Weekly recap" },
      { icon: "message-circle", name: "WhatsApp", hint: "Get updates on WhatsApp" },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Marketing Bug, answered",
    items: [
      {
        q: "What is Marketing Bug?",
        a: "Marketing Bug is Timewheel's free daily AI marketing newsletter. Every weekday you get one story that matters in AI and marketing, a prompt you can run that day, and one move to make — all in about a seven-minute read.",
      },
      {
        q: "Who is it for?",
        a: "Marketers who need to keep up with AI without drowning in it: growth and demand gen teams, content marketers, founders who do their own marketing, and agency people serving clients across industries.",
      },
      {
        q: "How much does it cost?",
        a: "Nothing. Marketing Bug is free, and it stays free. There is no paid tier hiding the good issues — every subscriber gets the full newsletter.",
      },
      {
        q: "How often will I hear from you?",
        a: "One issue every weekday. No re-sends, no drip sequences, no promotional blasts in between. When something big happens we may send an extra issue, and that is all.",
      },
      {
        q: "How is it different from other marketing newsletters?",
        a: "Most marketing newsletters are link dumps. Marketing Bug is edited: one story chosen because it matters, explained in plain language, paired with a prompt you can run and a move you can make. If an issue does not earn its seven minutes, it does not ship.",
      },
      {
        q: "How do I unsubscribe?",
        a: "One click, at the bottom of every issue. No forms, no guilt-trip survey, no waiting for the next billing cycle — you are off the list immediately.",
      },
    ],
  },
  final: {
    title: "Ready to stay ahead of AI marketing?",
    body: "Join the marketers who start their day with Marketing Bug. One story, one prompt, one move — free, every weekday.",
    primaryLabel: "Subscribe free",
    primaryHref: "/products/marketing-bug#mb-subscribe",
    secondaryLabel: "Read the blog",
    secondaryHref: "/blog",
  },
};
