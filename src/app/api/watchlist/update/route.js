import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request) {
  try {
    
    const { tracking_id, status } = await request.json();

    if (!tracking_id || !status) {
        return NextResponse.json({ message: 'Missing tracking_id or status.' }, { status: 400 });
    }
    
    const [result] = await db.execute(
        `
        UPDATE user_watchlist
        SET status = ?
        WHERE tracking_id = ?
        `,
        [status, tracking_id]
    );

    if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'Tracking record not found or status already set.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Watchlist status updated successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Update Status Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}