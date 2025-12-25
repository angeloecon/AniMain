import { NextResponse } from "next/server";
import { fetchAniList } from "@/lib/anilist";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const queryText = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const perPage = parseInt(searchParams.get("perPage")) || 10;

  if(!queryText){
    return NextResponse.json({ data: []});
  }

  const query = `
    query($search: String, $page: Int, $perPage: Int){
      Page(page: $page, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          format
          seasonYear
          averageScore
        }
        pageInfo {
          currentPage
          hasNextPage
          lastPage
          perPage
          total
        }
      }
    }
  `;
  const variable = {
    search: queryText,
    page: page,
    perPage: perPage,
  };

  try {
    const data = await fetchAniList(query, variable);
    return NextResponse.json(
      { data: data.Page.media, pagination: data.Page.pageInfo },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
