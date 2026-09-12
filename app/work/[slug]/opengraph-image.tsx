import { ImageResponse } from "next/og";
import { caseStudies, person } from "@/content/profile";

export const alt = `Project record — ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

/** Share card for one project: record number, title, thesis line. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.id === slug) ?? caseStudies[0];
  const record = `PRJ-${c.index}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#E9EAE4",
          color: "#15171A",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 26,
            letterSpacing: "0.08em",
            color: "#3A4046",
            borderBottom: "2px solid #CDD0C8",
            paddingBottom: 24,
          }}
        >
          <span style={{ color: "#1B3D8F" }}>{record}</span>
          <span>{c.timeframe.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 1000 }}>{c.title}</div>
          <div style={{ marginTop: 28, fontSize: 32, lineHeight: 1.35, color: "#3A4046", maxWidth: 960, fontFamily: "sans-serif" }}>
            {c.kicker}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.06em",
            color: "#5A6066",
          }}
        >
          <span>{person.name.toUpperCase()}</span>
          <span>{person.siteUrl.replace(/^https?:\/\//, "")}/work/{c.id}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
