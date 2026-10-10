import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Baseline security headers (live site only sent HSTS). No CSP on purpose:
  // a strict policy would break GTM and the Meta pixel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
  // 301s from the pre-rename URLs so inbound links + rankings survive the move
  // to the unified <service>-company-in-nagpur structure.
  async redirects() {
    return [
      { source: "/website-design", destination: "/website-design-company-in-nagpur", permanent: true },
      { source: "/web-app-development", destination: "/web-app-development-company-in-nagpur", permanent: true },
      { source: "/web-development-company-in-india", destination: "/web-development-company-in-nagpur", permanent: true },
      { source: "/digital-marketing2", destination: "/digital-marketing-company-in-nagpur", permanent: true },
      { source: "/performance-marketing-company-in-nagpur", destination: "/digital-marketing-company-in-nagpur", permanent: true },
      // Free-website offer consolidated onto the 30-days challenge page.
      { source: "/free-website-nagpur", destination: "/30-days-30-websites", permanent: true },
      // Retired pages, sent to their closest live equivalent (2026-10-10).
      // /ai-automation-agency-in-nagpur has none, so it 404s instead.
      { source: "/digital-marketing-nagpur", destination: "/digital-marketing-company-in-nagpur", permanent: true },
      { source: "/ai-marketing-automation-company-in-nagpur", destination: "/digital-marketing-company-in-nagpur", permanent: true },
      { source: "/creators", destination: "/coffee-and-toffee", permanent: true },
    ];
  },
  images: {
    // our own placeholder screenshots in /public/hero are trusted SVGs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
