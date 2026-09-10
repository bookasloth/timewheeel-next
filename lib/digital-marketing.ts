import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
  ChartBar,
  ChatCircle,
  Envelope,
  MagnifyingGlass,
  ShareNetwork,
  TextAa,
} from "@phosphor-icons/react/dist/ssr";

export const dmStats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Happy Customers" },
  { value: 20, suffix: "+", label: "Projects Completed" },
];

export const dmIntroSteps = [
  { step: "Business", note: "Your goals, audience & market" },
  { step: "Strategy", note: "A plan built around your growth" },
  { step: "Traffic", note: "The right people, at the right time" },
  // { step: "Engagement", note: "Content and conversations that connect" },
  { step: "Leads", note: "Qualified interest that converts" },
  // { step: "Growth", note: "Measurable, sustainable results" },
];

export const dmWhy = [
  {
    number: "01",
    title: "Proven Track Record of Success",
    body: "Our experts have a history of delivering impressive results, helping businesses achieve higher search engine rankings and increased organic traffic.",
    accent: "#fe5100",
  },
  {
    number: "02",
    title: "Customized Digital Marketing Solutions",
    body: "At Timewheel, we understand that each business is unique, so we develop personalized Digital Marketing plans that cater to your business goals.",
    accent: "#269cef",
  },
  {
    number: "03",
    title: "Transparent & Ethical Practices",
    body: "We prioritize transparency and integrity. We keep you informed with regular updates and detailed reports, ensuring you understand the progress.",
    accent: "#4ab765",
  },
];

export type DmService = {
  icon: Icon;
  tag: string;
  title: string;
  body: string;
  accent: string;
};

export const dmServices: DmService[] = [
  {
    icon: ChartBar,
    tag: "Paid Advertising",
    title: "Paid Advertising",
    body: "We optimize targeted ad campaigns to reach your ideal audience, driving immediate traffic and conversions.",
    accent: "#fe5100",
  },
  {
    icon: MagnifyingGlass,
    tag: "SEO",
    title: "Search Engine Optimization (SEO)",
    body: "We enhance your online visibility through strategic keyword integration and technical optimizations, ensuring higher search rankings.",
    accent: "#4ab765",
  },
  {
    icon: TextAa,
    tag: "Content",
    title: "Content Marketing",
    body: "We create engaging, high-quality content that resonates with your audience, building brand authority and fostering customer loyalty.",
    accent: "#ff4d93",
  },
  {
    icon: Envelope,
    tag: "Email",
    title: "Email Marketing",
    body: "We design personalized email campaigns that nurture relationships, increase engagement, and drive repeat business.",
    accent: "#269cef",
  },
  {
    icon: ChatCircle,
    tag: "WhatsApp",
    title: "WhatsApp Marketing",
    body: "We create personalized campaigns on WhatsApp, directly engaging your customers, driving higher interaction, and delivering real-time results.",
    accent: "#4ab765",
  },
  {
    icon: ShareNetwork,
    tag: "Social Media",
    title: "Social Media Marketing",
    body: "We build and manage your social media presence, creating tailored content and engaging with your audience.",
    accent: "#ffcc1c",
  },
];

export const dmEcosystemNodes = [
  "SEO",
  "Paid Ads",
  "Content",
  "Social Media",
  "Email",
  "WhatsApp",
  "Analytics",
  "Conversions",
];

export const dmProcess = [
  {
    step: "01",
    title: "Discover",
    body: "Understand your business, audience, competitors, and goals.",
    keys: ["Business & goals alignment", "Audience research", "Competitor analysis"],
    deliverables: "Discovery brief",
  },
  {
    step: "02",
    title: "Strategize",
    body: "Build a customized digital marketing strategy.",
    keys: ["Custom marketing plan", "Channel selection", "KPI definition"],
    deliverables: "Strategy roadmap",
  },
  {
    step: "03",
    title: "Execute",
    body: "Launch campaigns, content, SEO, advertising, and social initiatives.",
    keys: ["Campaign launch", "Content & SEO rollout", "Paid & social setup"],
    deliverables: "Live campaigns",
  },
  {
    step: "04",
    title: "Optimize",
    body: "Track performance and continuously improve what works.",
    keys: ["Performance tracking", "AB testing", "Reporting updates"],
    deliverables: "Performance reports",
  },
  {
    step: "05",
    title: "Grow",
    body: "Scale successful channels and create sustainable growth.",
    keys: ["Scale winning channels", "Expand reach", "Compounding growth loops"],
    deliverables: "Growth plan",
  },
];

export const dmChallenges = [
  {
    question: "Is your business invisible when customers search locally?",
    answer:
      "From SEO to local visibility, we help brands in Nagpur and across Maharashtra get found by the right people at the right moment.",
  },
  {
    question: "Are you getting traffic that never turns into customers?",
    answer:
      "We connect content, paid advertising, and conversion-focused journeys so attention becomes leads — not just visits.",
  },
  {
    question: "Do you actually know which marketing works?",
    answer:
      "Every channel is tracked against clear metrics, so your budget goes toward what delivers — with transparent, regular reporting.",
  },
];

export const dmAudience = [
  {
    number: "01",
    title: "Local businesses & startups in Nagpur",
    body: "Build visibility in your community and turn local searches into loyal customers.",
  },
  {
    number: "02",
    title: "Small & mid-sized companies",
    body: "A complete digital presence without juggling scattered tools and agencies.",
  },
  {
    number: "03",
    title: "E-commerce & retail brands",
    body: "Drive traffic, engagement, and repeat purchases across every channel.",
  },
  {
    number: "04",
    title: "Real estate & property",
    body: "Attract serious enquiries with search-led visibility and trusted local positioning.",
  },
  {
    number: "05",
    title: "Healthcare & clinics",
    body: "Reach patients searching for your services with clear, credible digital presence.",
  },
  {
    number: "06",
    title: "SaaS & technology companies",
    body: "Acquire and activate users with strategic content, paid campaigns, and SEO.",
  },
];

export const dmMetrics = [
  { label: "Organic Traffic", value: "Visits from search", accent: "#fe5100" },
  { label: "Search Visibility", value: "Keyword reach", accent: "#4ab765" },
  { label: "Engagement", value: "Likes, clicks & shares", accent: "#ff4d93" },
  { label: "Leads", value: "Qualified enquiries", accent: "#269cef" },
  { label: "Conversions", value: "Desired actions", accent: "#ffcc1c" },
  { label: "Campaign Performance", value: "ROAS & CTR tracking", accent: "#4ab765" },
];

// Placeholder case study data — replace with real stories.
export const dmCaseStudies = [
  {
    brand: "Growth story 01",
    industry: "Industry placeholder",
    challenge:
      "Replace this placeholder with the challenge the client faced before partnering with us.",
    services: ["SEO", "Content"],
    outcome: "Add a clear, verifiable outcome when real results are available.",
    href: "#",
  },
  {
    brand: "Growth story 02",
    industry: "Industry placeholder",
    challenge:
      "Replace this placeholder with the challenge the client faced before partnering with us.",
    services: ["Paid Ads", "Social Media"],
    outcome: "Add a clear, verifiable outcome when real results are available.",
    href: "#",
  },
  {
    brand: "Growth story 03",
    industry: "Industry placeholder",
    challenge:
      "Replace this placeholder with the challenge the client faced before partnering with us.",
    services: ["Email", "WhatsApp"],
    outcome: "Add a clear, verifiable outcome when real results are available.",
    href: "#",
  },
];

export const dmTestimonials = [
  {
    quote:
      "I highly recommend Timewheel, a digital marketing firm in Nagpur! They offer diverse digital marketing services that help my business grow online. Their digital strategies, including SEO services and online marketing, have given us a strong online presence across various digital channels.",
  },
  {
    quote:
      "If you're looking for a digital marketing agency that delivers results, this is the one! Their comprehensive digital marketing services helped us reach new heights. The team's marketing skills and expertise in internet marketing set them apart.",
  },
  {
    quote:
      "Timewheel digital marketing firm is top-notch! They provide the best digital marketing strategies, including SEO and social media campaigns. Their innovative approach helped us achieve our marketing goals and elevate our business online.",
  },
  {
    quote:
      "I've worked with a few marketing service providers, but Timewheel is the best. Their range of digital marketing services, from SEO to content marketing, has helped our business grow in the digital world. Their expertise and commitment to our marketing goals have been invaluable.",
  },
  {
    quote:
      "A fantastic digital marketing agency! They've helped us with everything from traditional marketing to innovative digital strategies. Their comprehensive digital marketing services have been key to our business growth and strong online presence.",
  },
  {
    quote:
      "We chose this digital marketing firm for its reputation, and they delivered! Their experienced digital marketing professionals crafted strategies that helped us improve our online visibility and business growth. I'm so glad I hired them.",
  },
  {
    quote:
      "I trust this marketing firm for all my digital marketing needs. They offer a diverse range of digital marketing services, from SEO to full-scale digital campaigns. Their expertise and commitment to quality have helped our business reach new heights.",
  },
];

export const dmFaq = [
  {
    q: "Is digital marketing necessary for every business?",
    a: "Yes, every business can benefit from digital marketing. Whether you're a small startup or a large corporation, digital marketing helps you reach a wider audience, increase brand visibility, and drive sales through online platforms. It's an essential part of any modern business strategy.",
  },
  {
    q: "Why should I consider hiring a digital marketing agency?",
    a: "Hiring a digital marketing agency allows businesses to leverage the expertise of professionals who specialize in various digital marketing techniques. It saves time and effort, ensures the use of the latest tools and strategies, and helps your business grow by reaching a larger audience.",
  },
  {
    q: "Which locations do you serve with your business solutions?",
    a: "We deliver the best solutions to your business needs in the city of Nagpur, Pune, Mumbai and the Entire State of Maharashtra and a lot of cities in India.",
  },
  {
    q: "What services do you offer in digital marketing and website development?",
    a: "We offer a wide range of services digital media planning, web design, and web development services including e-commerce and social media content marketing.",
  },
  {
    q: "How can marketing techniques improve business growth?",
    a: "Effective marketing techniques, such as search engine optimization (SEO), social media advertising, and email campaigns, help businesses connect with potential customers, drive traffic to their websites, and increase conversions. Using the right techniques can significantly impact business growth and success.",
  },
];

export const dmServiceOptions = [
  "SEO",
  "Paid Advertising",
  "Social Media Marketing",
  "Content Marketing",
  "Email Marketing",
  "WhatsApp Marketing",
  "Web Design & Development",
  "Other",
];