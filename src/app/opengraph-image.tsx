import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/data/site";

export const alt = `${siteName} — Developer & Designer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = [
  { label: "Developer", bg: "#F2CF63" },
  { label: "Designer", bg: "#F2A7B8" },
  { label: "Video editor", bg: "#9FD8C2" },
  { label: "Phnom Penh", bg: "#A9C1EE" },
];

/** Site-wide share preview: a selected Figma-style frame on the cream grid. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcf9f3",
          backgroundImage:
            "linear-gradient(to right, rgba(14,26,43,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,26,43,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1000,
            padding: "56px 64px",
            backgroundColor: "white",
            border: "3px solid #3b82f6",
            color: "#0E1A2B",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  padding: "6px 18px",
                  borderRadius: 999,
                  border: "3px solid #0E1A2B",
                  backgroundColor: t.bg,
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {t.label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 112, fontWeight: 800, letterSpacing: -4 }}>
            Hey, I&apos;m <span style={{ color: "#3355D6", marginLeft: 28 }}>Roth.</span>
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 32, lineHeight: 1.35, color: "#556070" }}>
            {siteDescription}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
