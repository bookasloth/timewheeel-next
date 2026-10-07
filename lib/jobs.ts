// Open roles. Single source of truth: the careers index, the role detail page,
// the apply form's `service`/`source` values and the JobPosting JSON-LD all read
// from here, so a role is only ever edited in one place.

export type JobFaq = { q: string; a: string };

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
  compensation: string[];
  /** Rendered as the "at a glance" rows on the detail page. */
  facts: { k: string; v: string }[];
  faqs: JobFaq[];
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