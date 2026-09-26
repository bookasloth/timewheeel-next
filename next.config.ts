import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 301s from the pre-rename URLs so inbound links + rankings survive the move
  // to the unified <service>-company-in-nagpur structure.
  async redirects() {
    return [
      { source: "/website-design", destination: "/website-design-company-in-nagpur", permanent: true },
      { source: "/web-app-development", destination: "/web-app-development-company-in-nagpur", permanent: true },
      { source: "/web-development-company-in-india", destination: "/web-development-company-in-nagpur", permanent: true },
      { source: "/digital-marketing2", destination: "/digital-marketing-company-in-nagpur", permanent: true },
      { source: "/performance-marketing-company-in-nagpur", destination: "/digital-marketing-company-in-nagpur", permanent: true },
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
