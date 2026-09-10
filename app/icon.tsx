import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#ff6a3d",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          borderRadius: 6,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
