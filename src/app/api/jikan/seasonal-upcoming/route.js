import { NextResponse } from "next/server";

export async function GET() {
  const JIKAN_URL = "https://api.jikan.moe/v4/seasons/upcoming";

  try {
    const res = await fetch(JIKAN_URL, { cache: "no-store" });
    if (!res.status) {
      throw new Error("Failed to fetch data from Jikan API");
    }

    const data = await res.json();

    return NextResponse.json(data.data, { status: 200 });
  } catch (e) {
    console.error("Jikan API Error:", error);
    return NextResponse.json(
      { message: "External API Error" },
      { status: 500 }
    );
  }
}
