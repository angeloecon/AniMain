import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1'; 
  const JIKAN_URL = `https://api.jikan.moe/v4/top/anime?page=${page}`;

  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); 

  try {
    console.log(`Attempting to fetch: ${JIKAN_URL}`);

    const response = await fetch(JIKAN_URL, { 
      cache: 'no-store',
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId); 

    if (!response.ok) {
      throw new Error(`Jikan API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data.data, { status: 200 }); 

  } catch (error) {
    console.error(" FETCH ERROR DETAILS:", error);

    if (error.name === 'AbortError') {
      return NextResponse.json({ message: 'Request timed out. Your internet might be slow or down.' }, { status: 504 });
    }
    
    if (error.cause && error.cause.code === 'ENOTFOUND') {
      return NextResponse.json({ message: 'Network Error: Could not connect to the internet.' }, { status: 502 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}