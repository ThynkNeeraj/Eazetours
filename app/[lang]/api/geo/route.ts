import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let countryCode = "+91"; // fallback

  try {
    // Get client IP from headers
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIP = forwarded ? forwarded.split(",")[0] : req.ip || "";

    // Fetch geolocation info
    const res = await fetch(`https://ipapi.co/${clientIP}/json/`, { cache: "no-store" });
    const data = await res.json();

    if (data?.country_calling_code) {
      countryCode = data.country_calling_code;
    }
  } catch (err) {
    console.warn("GeoIP lookup failed:", err);
  }

  return NextResponse.json({ countryCode });
}
