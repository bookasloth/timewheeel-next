import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // our own placeholder screenshots in /public/hero are trusted SVGs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
