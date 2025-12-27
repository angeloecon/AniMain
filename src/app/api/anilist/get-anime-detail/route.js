import { NextResponse } from "next/server";
import { fetchAniList } from "@/lib/anilist";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Id must be provided" },
      { status: 400 }
    );
  }

  const query = `
    query($id: Int, $perPage: Int){
      Media(id: $id, type: ANIME) {
        id
        title{
          english
          romaji
          native
        }

        coverImage{
          extraLarge
          large
          color
        }

        studios (isMain: true){
          nodes {
            name
          }
        }
        characters(sort: ROLE) {
          edges{ 
            role
            node {
              name { full }
              image { medium }
            }
          }
        }

        trailer { id, site }

        startDate { year month day }

        description
        bannerImage
        averageScore
        episodes
        status
        genres
        season
        seasonYear
        type
        source
        recommendations(perPage: $perPage, sort: RATING_DESC) {
          nodes {
            mediaRecommendation {
              id
              title {
                english
                native
                romaji
              }
              coverImage {
                large
                medium
                extraLarge
              }
              averageScore
              seasonYear
              season
            }
          }
        }
        externalLinks {
          siteId
          site
          color
          icon
          id
          url
          type
          language
          isDisabled
          notes
        }
      }
    }
  `;

  try {
    const variables = {
      id: parseInt(id),
      perPage: 6
    };
    const data = await fetchAniList(query, variables);
    return NextResponse.json({ data: data.Media }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch anime details", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
