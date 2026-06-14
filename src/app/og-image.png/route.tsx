import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Krishna Inamdar
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#06b6d4",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Walmart Account Manager · Wholesale & Analytics
          </div>
          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#06b6d4" }}>8+</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>Years Experience</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#6366f1" }}>Walmart</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>National Account</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#10b981" }}>MS CIS</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>Data Foundation</div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#64748b",
              marginTop: "30px",
            }}
          >
            Wholesale · E-commerce · SQL & Excel
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
