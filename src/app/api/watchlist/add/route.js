import {NextResponse} from "next/server";
import db from "@/lib/db"; 

export async function POST(request){
  try {
    const { user_id, anime_id, anime_title, status} = await request.json();

    if(!user_id || !anime_id || !anime_title || !status){
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    } 

    const [animeRows] = await db.execute(
      'SELECT anime_id FROM anime WHERE anime_id = ?',
      [ anime_id ]
    );

    if(animeRows.length === 0){
      await db.execute(
        'INSERT INTO anime (anime_id, anime_title) VALUES (?, ?)',
        [ anime_id, anime_title ]
      );
    }

    const [watchlistRows] = await db.execute(
      'SELECT tracking_id FROM user_watchlist WHERE user_id = ? AND anime_id = ?',
      [ user_id, anime_id ]
    );

    if(watchlistRows.length > 0){
      return NextResponse.json({ message: 'Anime already in watchlist' }, { status: 409 });
    }

    const [result] = await db.execute(
      'INSERT INTO user_watchlist (user_id, anime_id, status) VALUES (?, ?, ?)',
      [ user_id, anime_id, status ]
    );

    return NextResponse.json(
      { 
        message: 'Anime added to watchlist successfully!', 
        trackingId: result.insertId 
      }, 
      { status: 201 } 
    );

  } catch (error){
    console.error('Add to Watchlist Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}