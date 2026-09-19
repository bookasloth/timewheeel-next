import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
  Robot,
  ChatCircleDots,
  Target,
  PenNib,
  EnvelopeSimple,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";

export const aimStats = [
  { value: 7, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Happy Customers" },
  { value: 20, suffix: "+", label: "Projects Completed" },
];

export const aimIntroSteps = [
  { step: "Business", note: "Your goals, audience & data" },
  { step: "AI Strategy", note: "Where automation moves the needle" },
  { step: "Automation", note: "Campaigns, replies & journeys that run themselves" },
  { step: "Leads", note: "Qualified interest, scored and routed" },
];

export const aimWhy = [
  {
    number: "01",
    title: "AI-First, Human-Guided",
    body: "We pair marketing automation with real strategy, so the AI works toward your goals instead of running on autopilot with no direction.",
    accent: "#8b5cf6",
  },
  {
    number: "02",
    title: "Automation Built Around You",
    body: "Every business runs differently. We design custom AI workflows for your funnel, tools, and audience, not a one-size template.",
    accent: "#269cef",
  },
  {
    number: "03",
    title: "Transparent & Measurable",
    body: "You see what the automation does and what it delivers, with clear reporting on leads, replies, and conversions, no black box.",
    accent: "#4ab765",
  },
];

export type AimService = {
  icon: Icon;
  tag: string;
  title: string;
  body: string;
  accent: string;
};

export const aimServices: AimService[] = [
  {
    icon: Target,
    tag: "AI Ads",
    title: "AI Ad Optimization",
    body: "AI-assisted campaigns that adjust targeting, budget, and creative toward the audiences and placements actually converting.",
    accent: "#8b5cf6",
  },
  {
    icon: ChatCircleDots,
    tag: "Chatbots",
    title: "AI Chatbots & WhatsApp Automation",
    body: "Always-on assistants that answer, qualify, and book, capturing enquiries on WhatsApp and your site around the clock.",
    accent: "#25D366",
  },
  {
    icon: Robot,
    tag: "Lead Scoring",
    title: "Predictive Lead Scoring",
    body: "Score and prioritize leads by how likely they are to convert, so your team spends time on the enquiries that matter.",
    accent: "#fe5100",
  },
  {
    icon: PenNib,
    tag: "Content",
    title: "AI Content Generation",
    body: "Draft posts, emails, and ad copy at scale with AI, then refine to your brand voice, faster output without losing quality.",
    accent: "#ff4d93",
  },
  {
    icon: EnvelopeSimple,
    tag: "Journeys",
    title: "Email & Journey Automation",
    body: "Behaviour-triggered email and message journeys that nurture leads automatically, from first touch to repeat business.",
    accent: "#269cef",
  },
  {
    icon: ChartLineUp,
    tag: "Analytics",
    title: "Marketing Analytics & Insights",
    body: "AI-surfaced insights across channels, so you know what to scale, what to cut, and where the next win is coming from.",
    accent: "#ffcc1c",
  },
];

export const aimAudience = [
  {
    number: "01",
    title: "Local businesses & startups in Nagpur",
    body: "Automate enquiries and follow-ups so no lead slips through, even when you are busy running the business.",
  },
  {
    number: "02",
    title: "Small & mid-sized companies",
    body: "Do more with a lean team, let automation handle the repetitive marketing work while you focus on growth.",
  },
  {
    number: "03",
    title: "E-commerce & retail brands",
    body: "Recover carts, re-engage buyers, and personalize offers automatically across email, WhatsApp, and ads.",
  },
  {
    number: "04",
    title: "Real estate & property",
    body: "Qualify and route serious enquiries instantly, with AI chat that responds the moment interest comes in.",
  },
  {
    number: "05",
    title: "Clinics & service businesses",
    body: "Book appointments and answer common questions automatically, freeing your front desk for real conversations.",
  },
  {
    number: "06",
    title: "SaaS & technology companies",
    body: "Activate and nurture users with AI-driven journeys, scoring, and content tuned to each stage of the funnel.",
  },
];

export const aimTestimonials = [
  {
    quote:
      "Automating our WhatsApp and email follow-ups changed how we handle leads, enquiries get answered instantly and nothing falls through the cracks anymore. Timewheel set it all up clearly and kept us in control.",
  },
  {
    quote:
      "The AI lead scoring meant our sales team finally stopped chasing cold contacts. We focus on the enquiries most likely to close, and it shows in our numbers.",
  },
  {
    quote:
      "We were skeptical about AI marketing, but the team made it practical, real automations that save us hours every week without feeling robotic to our customers.",
  },
  {
    quote:
      "Content that used to take days now takes hours. The AI drafts, we refine, and our brand voice stays intact. It has genuinely sped up our marketing.",
  },
  {
    quote:
      "Everything is transparent. We can see exactly what the automation is doing and what it delivers. That trust is why we keep working with Timewheel.",
  },
];

export const aimFaq = [
  {
    q: "What is AI marketing automation?",
    a: "AI marketing automation uses artificial intelligence to run and improve marketing tasks, things like ad targeting, lead scoring, chat responses, content drafting, and email journeys, with less manual work and smarter decisions. It helps you reach the right people, respond faster, and focus your team on what actually drives growth.",
  },
  {
    q: "Will automation make my marketing feel robotic to customers?",
    a: "No. Good automation feels timely and relevant, not robotic. We design workflows around real customer journeys and keep your brand voice throughout, so people get fast, helpful responses while you stay in control of the experience.",
  },
  {
    q: "Which tools and platforms do you work with?",
    a: "We work with the platforms you already use, including WhatsApp Business, Meta and Google Ads, popular CRMs, email tools, and automation platforms like Zapier. We connect them into one system rather than adding scattered tools.",
  },
  {
    q: "Which locations do you serve?",
    a: "We are based in Nagpur and serve businesses across Nagpur, Pune, Mumbai, the entire state of Maharashtra, and many cities across India.",
  },
  {
    q: "How do you measure results from AI marketing?",
    a: "We track clear metrics, leads captured, response times, qualified enquiries, and conversions, and report them transparently. You always see what the automation is doing and the impact it has on your business.",
  },
];

export const aimServiceOptions = [
  "AI Ad Optimization",
  "AI Chatbots & WhatsApp Automation",
  "Predictive Lead Scoring",
  "AI Content Generation",
  "Email & Journey Automation",
  "Marketing Analytics & Insights",
  "Other",
];
