import type { MetadataRoute } from "next";

// Brand assets live in public/brand (source kit: logo-final). Keep icon paths
// pointed there so the manifest, favicon, and header all draw from one place.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Timewheel",
    short_name: "Timewheel",
    description:
      "Run bookings, payments, events, and communities on systems you own.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e7",
    theme_color: "#f45b0a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/png/timewheel-app-icon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/png/timewheel-app-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/png/timewheel-app-icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
