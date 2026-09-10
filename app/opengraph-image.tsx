import { ImageResponse } from "next/og";
import { person, hero } from "@/content/profile";

export const alt = `${person.name} — Product & Systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#ecebe5",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a4a19a", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          <span>{person.name.toUpperCase()}</span>
          <span>{hero.eyebrow.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1.05, maxWidth: 900 }}>
            {hero.statement}
          </div>
          <div style={{ marginTop: 32, fontSize: 26, color: "#a4a19a", fontFamily: "sans-serif", maxWidth: 820 }}>
            Enterprise infrastructure at Bank of America → product, venture &amp; founder&rsquo;s office.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 4, background: "#ff6a3d" }} />
          <span style={{ fontSize: 22, color: "#6d6a63", fontFamily: "sans-serif" }}>
            {person.siteUrl.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
