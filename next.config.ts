import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // our own placeholder screenshots in /public/hero are trusted SVGs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "company-assets.bookasloth.in", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
