// Open roles. Single source of truth: the careers index, the role detail page,
// the apply form's `service`/`source` values and the JobPosting JSON-LD all read
// from here, so a role is only ever edited in one place.

export type JobFaq = { q: string; a: string };

/** A titled bullet list. Used for the extra blocks a role may carry. */
export type JobSection = { title: string; items: string[] };

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  workType: string;
  experience: string;
  employmentType: string;
  /** ISO date the role went live, used by JobPosting's datePosted. */
  postedAt: string;
  /** Short line for the card on the careers index. */
  summary: string;
  /** The opening paragraph on the role detail page. */
  intro: string;
  responsibilities: string[];
  requirements: string[];
  /** Extra sub-lists inside the "what we're looking for" block, e.g. "Good to have". */
  requirementsExtra?: JobSection[];
  /** Standalone blocks rendered after compensation, e.g. "Eligibility", "Terms". */
  sections?: JobSection[];
  compensation: string[];
  /** The big line above the compensation list. */
  compensationHeadline: string;
  /** The small line under the compensation headline. */
  compensationNote: string;
  /** Rendered as the "at a glance" rows on the detail page. */
  facts: { k: string; v: string }[];
  faqs: JobFaq[];
  /** Schema.org employmentType, e.g. FULL_TIME, INTERN. */
  employmentTypeSchema: string;
  /** Schema.org jobLocationType, e.g. onsite, hybrid. */
  locationType: string;
  /** Schema.org occupationalCategory for the JobPosting. */
  occupationalCategory: string;
  /** Copy that only the apply form needs. Omitted fields fall back to generic text. */
  apply?: {
    experienceLabel?: string;
    experienceOptions?: string[];
    messagePlaceholder?: string;
  };
};

export const jobs: Job[] = [
  {
    slug: "sales-executive",
    title: "Sales Executive",
    department: "Sales",
    location: "Greater Nagpur Area, Maharashtra",
    workType: "On-site",
    experience: "Freshers and experienced candidates can apply",
    employmentType: "Full-time",
    postedAt: "2026-10-06",
    summary:
      "Grow our client base through online and offline sales. Find prospects, meet business owners across Nagpur, and close digital product deals.",
    intro:
      "We're looking for a Sales Executive to help us grow our client base through online and offline sales. You'll be the person business owners in Nagpur meet, and the person who keeps our pipeline honest.",
    responsibilities: [
      "Find and contact potential customers through calls, WhatsApp, social media, and local outreach.",
      "Meet businesses in Nagpur and explain our digital products and services.",
      "Generate leads, follow up with prospects, and close sales.",
      "Maintain relationships with existing and new clients.",
      "Keep track of leads, follow-ups, meetings, and sales.",
      "Work with the marketing and product teams to improve sales campaigns.",
    ],
    requirements: [
      "Good communication and convincing skills.",
      "Comfortable talking to business owners and meeting clients.",
      "Ability to generate leads and close deals.",
      "Self-motivated and target-oriented.",
      "Basic understanding of digital products, websites, or digital marketing is a plus.",
      "Must be willing to travel locally for client meetings.",
    ],
    compensation: [
      "₹10,000/month base",
      "Sales bonus on target",
      "Commission on closed deals",
      "No fixed ceiling on incentives, earnings rise with performance",
    ],
    compensationHeadline: "₹10,000/month + Sales Bonus + Commission",
    compensationNote:
      "Your earnings increase with performance. There is no fixed ceiling on incentives.",
    facts: [
      { k: "Location", v: "Greater Nagpur Area" },
      { k: "Work type", v: "On-site" },
      { k: "Experience", v: "Freshers and experienced candidates can apply" },
      { k: "Employment", v: "Full-time" },
      { k: "Compensation", v: "₹10,000/month + Sales Bonus + Commission" },
    ],
    faqs: [
      {
        q: "Can a fresher apply for this role?",
        a: "Yes. The role is open to freshers and experienced candidates. You'll be trained on our digital products and how we pitch them. What we can't train is the habit of following up.",
      },
      {
        q: "How is the pay structured?",
        a: "₹10,000 per month as base, plus a sales bonus, plus commission on every deal you close. There is no fixed ceiling on incentives, so your earnings rise with your performance.",
      },
      {
        q: "Do I need to know digital marketing to apply?",
        a: "No, a basic understanding of digital products, websites or digital marketing is a plus, not a requirement. You do need to be comfortable explaining what we do to a business owner.",
      },
      {
        q: "Is there travel involved?",
        a: "Local travel within the Greater Nagpur Area for client meetings is part of the role. You'll be meeting business owners in person, so a local travel radius is something you need to be willing to cover.",
      },
      {
        q: "How long does the hiring process take?",
        a: "A short conversation, a practical discussion about how you'd approach selling to a local business, and a decision. We move quickly because the role is open now.",
      },
    ],
    employmentTypeSchema: "FULL_TIME",
    locationType: "onsite",
    occupationalCategory: "Sales",
    apply: {
      experienceLabel: "Sales experience",
      messagePlaceholder:
        "Tell us how you'd approach a business owner in Nagpur, and what you'd want to be doing a year from now.",
    },
  },
  {
    slug: "full-stack-developer-intern",
    title: "Full Stack Developer Intern",
    department: "Development",
    location: "Nagpur, Maharashtra",
    workType: "Hybrid",
    experience: "Final-year students, recent graduates, or self-taught developers",
    employmentType: "Internship",
    postedAt: "2026-10-22",
    summary:
      "Ship live features across Next.js, React and Supabase. One-month probation, then extendable based on business needs and management approval.",
    intro:
      "You'll join the Development Team as a Full Stack Developer Intern and work on live products across frontend, backend, and database layers. You'll build features, fix bugs, and ship code under the direct guidance of the reporting manager.",
    responsibilities: [
      "Build and maintain responsive UI components and pages using Next.js, React, and Tailwind CSS.",
      "Develop backend features: API routes, server actions, auth flows, and business logic.",
      "Design and query database tables in Supabase (PostgreSQL), including RLS policies.",
      "Integrate third-party services such as payment gateways, email/SMS, and webhooks.",
      "Debug issues, fix bugs, and improve performance across products.",
      "Use Git/GitHub for version control: branches, commits, and pull requests.",
      "Use AI coding tools (e.g. Claude Code) to speed up development, while reviewing and understanding the code you ship.",
      "Test features before delivery and document what you build.",
      "Join daily updates with the reporting manager and complete tasks within deadlines.",
    ],
    requirements: [
      "Solid fundamentals in HTML, CSS, and JavaScript (ES6+).",
      "Working knowledge of React and Next.js.",
      "Basic understanding of REST APIs and async/await.",
      "Basic SQL and relational database concepts.",
      "Familiarity with Git and GitHub.",
      "Ability to read documentation and debug independently.",
    ],
    requirementsExtra: [
      {
        title: "Good to have",
        items: [
          "TypeScript.",
          "Supabase, PostgreSQL, or Firebase experience.",
          "Tailwind CSS, shadcn/ui.",
          "Experience with payment gateway or auth integration.",
          "Deployed projects (portfolio, GitHub, or live links).",
          "Basic knowledge of SEO and web performance.",
        ],
      },
    ],
    compensation: [
      "₹5,000 to ₹20,000 per month stipend, based on performance and scope of work.",
      "Credited on the 1st of every month.",
      "One-month probation period, then extendable based on business needs and management approval.",
    ],
    compensationHeadline: "₹5,000 – ₹20,000 / month stipend",
    compensationNote:
      "Credited on the 1st of every month. One-month probation, then extendable based on business needs and management approval.",
    facts: [
      { k: "Location", v: "Nagpur, Maharashtra" },
      { k: "Office", v: "Eureka Coworking, Mate Square, Nagpur 440022" },
      { k: "Work type", v: "Hybrid (onsite + remote)" },
      { k: "Experience", v: "Final-year students, recent graduates, or self-taught developers" },
      { k: "Employment", v: "Internship" },
      { k: "Hours", v: "Monday to Saturday, 10:00 AM – 6:00 PM" },
      { k: "Probation", v: "1 month, extendable" },
      { k: "Compensation", v: "₹5,000 – ₹20,000 / month stipend" },
    ],
    faqs: [
      {
        q: "Who can apply for this internship?",
        a: "Final-year students, recent graduates and self-taught developers. If you're a BE/BTech/MCA student in your final year, or you've been learning on your own and shipping small projects, you qualify. Commercial experience is not required.",
      },
      {
        q: "Is this a paid internship?",
        a: "Yes. The stipend runs from ₹5,000 to ₹20,000 a month depending on your performance and the scope of work you take on, and it's credited on the 1st of every month.",
      },
      {
        q: "What does the probation period involve?",
        a: "The first month is a probation period. You're assessed on the quality of what you deliver, attendance and punctuality, how you communicate, and how quickly you pick things up. If it works for both sides, the internship extends.",
      },
      {
        q: "What are the working hours and the setup?",
        a: "Monday to Saturday, 10:00 AM to 6:00 PM. The role is hybrid, so you'll be at our Eureka Coworking office in Mate Square on onsite days and remote on the rest. You need to be based in Nagpur.",
      },
      {
        q: "What stack will I work on?",
        a: "Next.js and React on the frontend, Tailwind CSS for styling, and Supabase (PostgreSQL) on the database with RLS policies. You'll also integrate payment gateways, email/SMS providers and webhooks.",
      },
      {
        q: "Does the internship guarantee a job?",
        a: "No. It doesn't. The internship is designed to give you real production experience and a portfolio worth showing, and it can extend based on business needs and management approval, but permanent employment is never guaranteed.",
      },
    ],
    employmentTypeSchema: "INTERN",
    locationType: "hybrid",
    occupationalCategory: "Engineering",
    apply: {
      experienceLabel: "Relevant experience",
      experienceOptions: [
        "Final-year student",
        "Recent graduate",
        "Self-taught developer",
        "1+ years of project experience",
      ],
      messagePlaceholder:
        "Tell us what you've built, what you'd like to work on, and what you'd want to be doing a year from now.",
    },
    sections: [
      {
        title: "About Timewheel",
        items: [
          "We build and run multiple web products: appointment booking and payments, creator monetization, community management, and event ticketing.",
          "We ship fast, work lean, and give interns real production work.",
        ],
      },
      {
        title: "Eligibility",
        items: [
          "Final-year student, recent graduate, or self-taught developer (BE/BTech/MCA or equivalent).",
          "Able to work from Nagpur for onsite days.",
          "Available Monday to Saturday, 10:00 AM to 6:00 PM.",
        ],
      },
      {
        title: "What you'll learn",
        items: [
          "Building and shipping production SaaS products end to end.",
          "A modern stack: Next.js + Supabase.",
          "Real payment, auth, and multi-tenant app workflows.",
          "AI-assisted development workflows.",
          "Ownership, speed, and working in a lean product team.",
        ],
      },
      {
        title: "Evaluation (1-month probation)",
        items: [
          "Performance and quality of delivered work.",
          "Attendance and punctuality.",
          "Professionalism and communication.",
          "Learning ability and initiative.",
          "Overall suitability for the role.",
        ],
      },
      {
        title: "Terms",
        items: [
          "Confidentiality of source code, client data, and business processes during and after the internship.",
          "Return of all company property, credentials, and files on completion or termination.",
          "The internship does not guarantee permanent employment.",
        ],
      },
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getJobSlugs(): string[] {
  return jobs.map((j) => j.slug);
}

/**
 * Lead-pipeline source for a role's applications. Kept here so the form and
 * any future posting stay in step; the /api/lead validator keys off the
 * "careers-" prefix to know this is an application, not a sales enquiry.
 */
export function jobLeadSource(job: Job): string {
  return `careers-${job.slug}`;
}