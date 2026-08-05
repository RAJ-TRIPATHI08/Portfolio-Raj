import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://gfgstatscard.vercel.app/rajtripz5vn?raw=true",
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // Return fallback data if the API is down
    return NextResponse.json({
      Easy: 29,
      Medium: 66,
      Hard: 1,
      Basic: 4,
      School: 0,
      total_problems_solved: 100,
      total_score: 332,
      pod_solved_longest_streak: 5,
      ProgressBar: 0,
    });
  }
}
