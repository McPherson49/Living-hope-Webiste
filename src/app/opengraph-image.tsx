import { ImageResponse } from "next/og";

export const alt = "Living Hope Hospital — Compassionate, quality healthcare in Parakin, Ile-Ife";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share card (WhatsApp, Facebook, X…) used by every page without its own image. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a1d3d 0%, #142f5c 55%, #1a54a6 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#ffffff" />
            <path
              d="M20 8.5v13M13.5 15h13"
              stroke="#1a54a6"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M11 31.5a9 9 0 0 1 18 0"
              fill="none"
              stroke="#0aa9c9"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>Living Hope</div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                color: "#8ec3f9",
                textTransform: "uppercase",
              }}
            >
              Hospital · Ile-Ife
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            Compassionate, quality healthcare in Parakin, Ile-Ife
          </div>
          <div style={{ fontSize: 30, color: "#5fe0f3" }}>
            Emergency · Maternity · Pediatrics · General care
          </div>
        </div>
      </div>
    ),
    size,
  );
}
