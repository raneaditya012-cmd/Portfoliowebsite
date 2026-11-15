import { ImageResponse } from "next/og";

export const alt = "Aditya Rane, Software Engineer at ICICI Lombard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0c0c0d", color: "#ededec", padding: 80 }}>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a3a9" }}>Software Engineer, ICICI Lombard</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -3 }}>Aditya Rane</div>
          <div style={{ display: "flex", width: 120, height: 6, background: "#e5a550", marginTop: 28 }} />
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a3a9" }}>Mumbai, India</div>
      </div>
    ),
    size
  );
}
