import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
  Camera,
  ChartLineUp,
  FilmStrip,
  Lightbulb,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";

export const rmStats = [
  { value: 200, suffix: "+", label: "Restaurant brands served" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "+", label: "Cities across India" },
];

export const rmIntroSteps = [
  { step: "Discover", note: "Your menu, brand & local market" },
  { step: "Attract", note: "Local search, reels & targeted ads" },
  { step: "Visit", note: "Walk-ins and table bookings" },
  { step: "Retain", note: "Loyal guests who keep coming back" },
];

export const rmStrengths = [
  {
    number: "01",
    title: "Specialized in Marketing Excellence",
    body: "We understand the restaurant industry inside out, crafting marketing strategies that align with your brand identity and goals to maintain a digital presence that helps you build a loyal customer base.",
    accent: "#fe5100",
  },
  {
    number: "02",
    title: "Exclusive Marketing Solutions",
    body: "From strategic digital marketing and social media management to influencer collaborations, we create unique campaigns that drive engagement and conversions.",
    accent: "#269cef",
  },
  {
    number: "03",
    title: "Thrive More to Serve More",
    body: "Our restaurant marketing strategies focus on long-term growth, ensuring you consistently attract, retain, and delight customers.",
    accent: "#4ab765",
  },
];

export type RmService = {
  icon: Icon;
  tag: string;
  title: string;
  body: string;
  accent: string;
};

export const rmServices: RmService[] = [
  {
    icon: ShareNetwork,
    tag: "Social Media Marketing",
    title: "Social Media Marketing",
    body: "Our marketing team creates engaging content to captivate your target audience at the right time. We help drive traffic to your restaurant website and physical location through highly targeted campaigns, ensuring your brand stays top-of-mind.",
    accent: "#269cef",
  },
  {
    icon: ChartLineUp,
    tag: "Digital Marketing Strategy",
    title: "Digital Marketing Strategy",
    body: "A strong marketing plan is essential for restaurants to stay ahead. We develop customized digital strategies with measurable goals and results, utilizing channels like PPC, email marketing, and search engines to help your business thrive.",
    accent: "#fe5100",
  },
  {
    icon: PenNib,
    tag: "Content Creation",
    title: "Engaging Content Creation",
    body: "Content is key to captivating diners and boosting brand positioning. From mouthwatering visuals to compelling storytelling, our team ensures your brand's story resonates with potential customers and loyal guests.",
    accent: "#ff4d93",
  },
  {
    icon: Lightbulb,
    tag: "Creative Solutions",
    title: "Creative Solutions",
    body: "As a specialized agency, we craft innovative campaigns that make an impact. Through immersive branding and strategic advertising, we focus on helping your business stand out in a competitive market.",
    accent: "#ffcc1c",
  },
  {
    icon: FilmStrip,
    tag: "Video Production",
    title: "Video Recording & Editing",
    body: "Video is an essential part of modern restaurant digital marketing. We create stunning, long-lasting visuals that showcase your dishes and dining experience, helping to attract new customers and strengthen your brand positioning.",
    accent: "#4ab765",
  },
  {
    icon: Camera,
    tag: "Website Design",
    title: "Web Design & Development",
    body: "Your restaurant website is your online storefront. Our website design team builds user-friendly, visually appealing sites optimized for search engines and online reviews, ensuring your restaurant's digital presence is strong.",
    accent: "#fe5100",
  },
  {
    icon: MagnifyingGlass,
    tag: "Market Research",
    title: "Digital Market Research",
    body: "We analyze trends, customer behavior, and competitive insights to unlock opportunities for your brand. Our data-driven approach ensures you stay ahead of the curve while optimizing campaigns for a fraction of the cost.",
    accent: "#8b5cf6",
  },
];

export const rmApproach = [
  {
    number: "01",
    title: "First-Time Visitors",
    body: "We capture attention with local search visibility, social proof, and irresistible offers.",
    accent: "#fe5100",
  },
  {
    number: "02",
    title: "Regular Guests",
    body: "Engaging content, loyalty campaigns, and community building turn visits into habits.",
    accent: "#269cef",
  },
  {
    number: "03",
    title: "Loyal Advocates",
    body: "Word-of-mouth, referrals, and reviews turn your happiest diners into your best marketers.",
    accent: "#4ab765",
  },
];

export const rmTestimonials = [
  {
    quote:
      "As a restaurant owner in Mumbai, I struggled to get the right visibility for my brand. This team truly understands what restaurants need—their expertise in digital marketing helped my business thrive. Thanks to their strategies, we've seen a significant boost in brand awareness and more repeat guests.",
    name: "Rahul Mehta",
    role: "Owner",
    brand: "Spice Haven",
    city: "Mumbai",
    emoji: "🍛",
  },
  {
    quote:
      "Working with this team has been a game-changer! They know how to prioritize the right strategies for restaurants' needs, and their approach is backed by real case studies. Our online presence has grown tremendously, and our restaurant now attracts more guests than ever.",
    name: "Priya Sharma",
    role: "Founder",
    brand: "Urban Bites",
    city: "Mumbai",
    emoji: "🍔",
  },
  {
    quote:
      "If you want to increase brand awareness and make your restaurant stand out, look no further! Their tailored approach ensures that restaurants' needs are met with precision. Since partnering with them, we've gained more visibility, improved customer engagement, and seen our business thrive. Highly recommended!",
    name: "Amit Verma",
    role: "CEO",
    brand: "Delhi Dine",
    city: "Delhi",
    emoji: "🥘",
  },
];

export const rmProcess = [
  {
    step: "01",
    course: "Starter",
    emoji: "🎙️",
    title: "Taste & Tour",
    body: "We sit with you, learn your menu, brand, audience, and local market — the recipe for what comes next.",
    keys: ["Brand & menu audit", "Review & reputation check", "Local SEO baseline"],
  },
  {
    step: "02",
    course: "Main course",
    emoji: "📋",
    title: "Build the Menu",
    body: "A custom marketing plan that picks the right channels — social, search, content, and paid — for your goals.",
    keys: ["Channel strategy", "Content & campaign calendar", "Booking & funnel setup"],
  },
  {
    step: "03",
    course: "Chef's table",
    emoji: "🔥",
    title: "Cook & Serve",
    body: "We launch reels, posts, ads, and campaigns that make your dishes irresistible to the right diners.",
    keys: ["Content production", "Paid & local visibility", "Community engagement"],
  },
  {
    step: "04",
    course: "Dessert",
    emoji: "📈",
    title: "Refine & Repeat",
    body: "We measure footfall, bookings, and repeat visits — then refine what works for compounding growth.",
    keys: ["Performance reports", "Funnel optimization", "Loyalty & retention"],
  },
];

export const rmResults = [
  {
    emoji: "🚶",
    accent: "#fe5100",
    title: "More Walk-Ins",
    body: "Optimized local SEO and map visibility put your restaurant in front of hungry diners searching nearby.",
    stat: "2.4x",
    statLabel: "avg. local visibility lift",
  },
  {
    emoji: "📅",
    accent: "#269cef",
    title: "More Table Bookings",
    body: "High-performing paid ads and booking funnels turn interest into confirmed reservations.",
    stat: "+52%",
    statLabel: "avg. booking growth",
  },
  {
    emoji: "💛",
    accent: "#ff4d93",
    title: "More Repeat Guests",
    body: "Engaging content and loyalty campaigns turn first-time visitors into regulars who keep coming back.",
    stat: "1.9x",
    statLabel: "avg. repeat visits",
  },
];

export const rmFaq = [
  {
    q: "Why do restaurants need a dedicated digital marketing agency?",
    a: "Restaurants compete on visibility, footfall, and repeat visits. A dedicated agency understands dining trends, local search behavior, and social media appetite — helping you turn searches and scrolls into tables and loyal guests.",
  },
  {
    q: "Which locations do you serve for restaurant marketing?",
    a: "We are an advertising agency based in Mumbai and we help restaurants build their brand presence across India — from local eateries to established F&B brands in every major city.",
  },
  {
    q: "What digital marketing services do you offer for restaurants?",
    a: "We offer social media marketing, digital marketing strategy, engaging content creation, creative solutions, video recording and editing, web design and development, and digital market research.",
  },
  {
    q: "How quickly can restaurant marketing show results?",
    a: "Visibility and engagement improvements often show within the first month or two, while sustained strategies around local SEO, content, and paid campaigns build lasting footfall and repeat business over time.",
  },
  {
    q: "Can you market a small or single-location restaurant?",
    a: "Absolutely. Our strategies scale to your goals — whether you run a local eatery or an established F&B brand, we tailor the plan to your budget, location, and growth ambitions.",
  },
];

export const rmServiceOptions = [
  "Social Media Marketing",
  "Digital Marketing Strategy",
  "Content Creation",
  "Creative Solutions",
  "Video Recording & Editing",
  "Web Design & Development",
  "Digital Market Research",
  "Other",
];
