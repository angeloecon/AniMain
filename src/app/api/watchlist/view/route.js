import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: 'Missing user_id parameter' }, { status: 400 });
    }

    const [rows] = await db.execute(
      `
      SELECT
          wl.tracking_id,
          a.anime_id,
          a.anime_title,
          wl.status AS status
      FROM user_watchlist wl
      JOIN anime a ON wl.anime_id = a.anime_id
      WHERE wl.user_id = ?
      ORDER BY wl.tracking_id DESC
      `,
      [user_id]
    );

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    console.error('View Watchlist Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
