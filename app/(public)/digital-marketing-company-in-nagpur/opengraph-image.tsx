import { ImageResponse } from "next/og";

export const alt = "Digital Marketing Agency in Nagpur, Timewheel";
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
          {/* Drawn as a rotated square, not the ◆ glyph: Satori's fallback
              fonts do not cover U+25C6 and it fails the dynamic font fetch. */}
          <span
            style={{
              display: "flex",
              width: 18,
              height: 18,
              flexShrink: 0,
              backgroundColor: "#fe5100",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6 }}
          >
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
          <span style={{ fontSize: 68, fontWeight: 800, color: "#fe5100" }}>
            Digital Marketing Agency
          </span>
          <span style={{ fontSize: 68, fontWeight: 800 }}>in Nagpur</span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: 4,
          }}
        >
          SEO · PAID ADS · SOCIAL · CONTENT · EMAIL · WHATSAPP
        </div>
      </div>
    ),
    { ...size }
  );
}