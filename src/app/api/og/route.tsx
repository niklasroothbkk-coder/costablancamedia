import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Costa Blanca Media";
  const subtitle = searchParams.get("subtitle") || "";

  const fontData = await fetch(
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&display=swap"
  ).then((res) => res.text());

  const fontUrl = fontData.match(
    /src: url\((.+?)\) format\('woff2'\)/
  )?.[1];

  let font: ArrayBuffer | undefined;
  if (fontUrl) {
    font = await fetch(fontUrl).then((res) => res.arrayBuffer());
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #2c3e50 0%, #1a252f 50%, #4AACB3 100%)",
          fontFamily: font ? '"DM Sans"' : "sans-serif",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "#4AACB3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              color: "white",
              fontWeight: 700,
            }}
          >
            CBM
          </div>
          <span
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 700,
            }}
          >
            Costa Blanca Media
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 30 ? "52px" : "64px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: subtitle ? "20px" : "0",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "8px",
            background: "#4AACB3",
          }}
        />

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "80px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          costablancamedia.es
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(font
        ? {
            fonts: [
              {
                name: "DM Sans",
                data: font,
                style: "normal" as const,
                weight: 700 as const,
              },
            ],
          }
        : {}),
    }
  );
}
