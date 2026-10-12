// All /review sample reviews, keyed by service id. Index order inside each
// file is permanent because copied indexes are stored in review_samples_used.
import websiteDesign from "./website-design.js";
import websiteDevelopment from "./website-development.js";
import shopify from "./shopify.js";
import socialMedia from "./social-media.js";
import seo from "./seo.js";
import digitalMarketing from "./digital-marketing.js";

export const REVIEW_SAMPLES = {
  "website-design": websiteDesign,
  "website-development": websiteDevelopment,
  shopify,
  "social-media": socialMedia,
  seo,
  "digital-marketing": digitalMarketing,
};
