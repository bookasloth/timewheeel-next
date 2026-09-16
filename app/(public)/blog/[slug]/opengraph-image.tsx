import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Timewheel blog";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.meta.title ?? "Timewheel Blog";
  const category = post?.meta.category ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fe5100",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 1, color: "#141110" }}>
          TIME<span style={{ color: "#ffffff" }}>WHEEL</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#141110",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              padding: "8px 18px",
              borderRadius: 999,
              marginBottom: 28,
            }}
          >
            {category}
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: "#141110" }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#141110" }}>
          timewheel.co.in
        </div>
      </div>
    ),
    size,
  );
}
