import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request) {
  try {
 
    const { tracking_id } = await request.json();

    if (!tracking_id) {
      return NextResponse.json({ message: 'Missing tracking_id' }, { status: 400 });
    }
 
    const [result] = await db.execute(
      'DELETE FROM user_watchlist WHERE tracking_id = ?',
      [tracking_id]
    );

    if (result.affectedRows === 0) {

      return NextResponse.json({ message: 'Watchlist item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Anime removed from watchlist successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Remove Watchlist Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
// export async function POST(request){
//   try {
//     const { user_id, anime_id } = await request.json();

//     if(!user_id || !anime_id){
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }
    
//     const [watchlistRows] = await db.execute(
//       "SELECT tracking_id FROM user_watchlist WHERE user_id = ? AND anime_id = ?",
//       [ user_id, anime_id ]
//     );

    

//     if(watchlistRows.length > 0){
//       await db.execute(
//         "DELETE FROM user_watchlist WHERE user_id = ? AND anime_id = ?",
//         [ user_id, anime_id ]
//       );
//     }

//     if(watchlistRows.length === 0){
//       return NextResponse.json({ message: "Anime not found in watchlist" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { 
//         message: "Anime deleted from watchlist successfully!"
//       },
//       { status: 200 } 
//     );
     
//   } catch (error) {
//     console.error("Delete from Watchlist Error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }