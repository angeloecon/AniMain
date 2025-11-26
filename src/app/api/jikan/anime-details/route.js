
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
   
    const { searchParams } = new URL(request.url);
    const animeId = searchParams.get('id'); 

    if (!animeId || isNaN(parseInt(animeId))) {
      return NextResponse.json(
        { message: 'Missing or invalid anime ID parameter.' },
        { status: 400 }
      );
    }
     
    const JIKAN_URL = `https://api.jikan.moe/v4/anime/${animeId}`;

    const response = await fetch(JIKAN_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch anime details from Jikan API');
    }
      
    const data = await response.json();

    return NextResponse.json(data.data, { status: 200 });

  } catch (error) {
    console.error('Jikan Detail Proxy Error:', error);
    return NextResponse.json(
      { message: 'External API Error: Could not retrieve anime details.' },
      { status: 500 }
    );
  }
}