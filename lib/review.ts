// /review: a customer picks the service they used and gets a sample review
// to edit, copy and paste into Timewheel's Google review form.

export const BRAND = "Timewheel";

// Google Business "write a review" link. Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to the
// real deep link (Google Business Profile -> Ask for reviews -> copy the short
// link, or search.google.com/local/writereview?placeid=YOUR_PLACE_ID). Until it
// is set we fall back to a Google search for the business so the button still
// goes somewhere sensible in dev.
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://www.google.com/search?q=Timewheel+reviews";

// ── Two-step flow: pick a service, copy a sample review ─────────────────────
// Each service has a few short sample reviews. "Try another" cycles them, and
// the reviewer can edit before copying. Keep them plain and claim no numbers.

export type ReviewService = { id: string; label: string; samples: string[] };

export const REVIEW_SERVICES: ReviewService[] = [
  {
    id: "website-design",
    label: "Website Design",
    samples: [
      "Timewheel designed our new website and it finally looks like the business we are. The team listened, shared clear options and turned feedback around quickly. Customers now compliment the site. Highly recommend Timewheel Internet.",
      "Great experience getting our website designed by Timewheel. Clean layout, easy to use on mobile, and they explained every decision. The process was smooth from start to launch.",
      "We wanted a website that looks professional and is easy to update. Timewheel delivered exactly that, on time and without fuss. Thank you to the whole team.",
    ],
  },
  {
    id: "website-development",
    label: "Website Development",
    samples: [
      "Timewheel built our website and it is fast, clean and works perfectly on mobile. They kept us updated through the project and delivered on the agreed timeline. Very professional team.",
      "Very happy with the website Timewheel developed for us. Quick loading, well structured and easy for our team to manage. Support after launch has been just as good.",
      "Reliable developers who actually understand business needs. Timewheel delivered a solid website and handled every request patiently. Would work with them again.",
    ],
  },
  {
    id: "shopify",
    label: "Shopify Development",
    samples: [
      "Timewheel set up our Shopify store and made the whole thing simple for us. The store looks great, checkout is smooth and they trained us on managing products. Highly recommended.",
      "Excellent Shopify work by Timewheel. They understood our products, built a clean store and sorted payments and shipping without any headache.",
      "We moved our online store to Shopify with Timewheel and it was the right call. Easy to manage, looks premium and the team was always responsive.",
    ],
  },
  {
    id: "social-media",
    label: "Social Media Marketing",
    samples: [
      "Timewheel handles our social media and the quality of content has improved a lot. Posts are consistent, on brand and our audience engages more. Great team to work with.",
      "Very happy with Timewheel's social media management. They plan ahead, share content for approval on time and actually understand our customers.",
      "Our Instagram finally feels professional thanks to Timewheel. Creative ideas, regular posting and clear monthly reports. Recommended.",
    ],
  },
  {
    id: "seo",
    label: "SEO",
    samples: [
      "Timewheel has been working on our SEO and we now show up for searches that matter to our business. They explain what they are doing in plain language and share regular updates.",
      "Honest and knowledgeable SEO team. Timewheel fixed our website issues, improved our Google Business Profile and we are getting more enquiries from search.",
      "Great SEO service from Timewheel. No false promises, just steady work and clear reports. Our visibility on Google has improved noticeably.",
    ],
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    samples: [
      "Timewheel runs our digital marketing and the leads we get are much better than before. They track everything and are always open about what is working.",
      "Professional digital marketing team. Timewheel planned our ads, landing pages and content as one system and the results speak for themselves.",
      "Working with Timewheel on our marketing has been easy. Clear strategy, quick execution and honest reporting. Highly recommend them to any business in Nagpur.",
    ],
  },
];
