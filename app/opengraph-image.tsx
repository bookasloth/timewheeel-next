import { ImageResponse } from "next/og";

// Default brand OG/Twitter card. Applies to every route that doesn't ship its
// own opengraph-image, so shared/AI-cited cards are never imageless.
export const alt = "Timewheel, build on systems you control forever";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1d24",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <span style={{ color: "#fe5100", fontSize: 30, fontWeight: 800 }}>◆</span>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6 }}>
            TIMEWHEEL
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 100px",
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800 }}>Build on systems</span>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#fe5100" }}>
            you control forever
          </span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: 4,
          }}
        >
          BOOKINGS · PAYMENTS · EVENTS · COMMUNITIES
        </div>
      </div>
    ),
    { ...size }
  );
}
