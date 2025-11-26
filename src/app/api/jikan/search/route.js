import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  if (!query) {
    return NextResponse.json({ message: 'Missing search query' }, { status: 400 });
  }

  const JIKAN_URL = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`;

  try {
    const response = await fetch(JIKAN_URL, { cache: 'no-store' });
    
    if (!response.ok) throw new Error('Failed to fetch search results');

    const data = await response.json();
    return NextResponse.json(data.data, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Search Error' }, { status: 500 });
  }
}