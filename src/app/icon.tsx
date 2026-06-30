import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Placeholder monogram favicon — swap for a real logo-derived icon once
// brand assets are supplied.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#121212",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f1e7",
          fontSize: 19,
          fontFamily: "Georgia, serif",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
