import { AnimeRecommend, AnimeCharacters, AnimeTrailer, AnimeSummary, AnimeStreaming } from "@/components/AnimeDetails";
import { getClient } from "../../../../ApolloClient";
import { GET_ANIME_DETAILS } from "@/lib/queries";

import WatchListButton from "@/components/Buttons/WatchListButton";
import Image from "next/image";

export const generateMetadata = async({ params }) => {
  const { id } = await params;
  
  const { data } = await getClient().query({
    query: GET_ANIME_DETAILS,
    variables: { id: parseInt(id) },
  });

  const anime = data?.Media;

  if (!anime) {
    return {
      title: "Anime Not Found",
    };
  }

  return {
    title: anime.title.english || anime.title.romaji,
    description: anime.description?.slice(0, 160).replace(/<[^>]*>/g, "") + "...",
    openGraph: {
      images: [anime.coverImage.extraLarge || anime.coverImage.large], 
      title: anime.title.english || anime.title.romaji,
      description: `Watch ${anime.title.english} on AniMain. Track your progress and discover new anime.`,
    },
    twitter: {
        card: "summary_large_image",
        title: anime.title.english,
        description: `Check out ${anime.title.english} on AniMain!`,
        images: [anime.coverImage.extraLarge], 
    }
  };
}



const page = async ({ params }) => {
  const { id } = await params;
  const { data } = await getClient().query({
    query: GET_ANIME_DETAILS,
    variables: { id: parseInt(id) },
  });

  const anime = data.Media;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": anime.title.english || anime.title.romaji,
    "image": anime.coverImage.extraLarge,
    "description": anime.description?.replace(/<[^>]*>/g, ""),
    "startDate": `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "0",  
      "bestRating": "10",
      "ratingCount": anime.popularity  
    }
  };

  return (
    <main className="min-h-screen dark:bg-black bg-gray-50 text-white pb-20 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Banner - Image - Big Image --------------------------------*/}
      <div
        className="h-[40vh] w-full bg-cover bg-center relative mask-gradient"
        style={{
          backgroundImage: `url(${
            anime.bannerImage || anime.coverImage.extraLarge
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 dark:from-black dark:via-black/50 to-transparent" />
      </div>
      {/* Content Container/Area ------------------------------------*/}

      <div className="w-full max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={anime.coverImage?.extraLarge || anime.coverImage?.large}
              alt={anime.title.english || anime.title.romaji}
              width={260}
              height={370}
              className="w-64 h-auto rounded-lg mb-4 shadow-2xl border-4 border-gray-900 dark:border-gray-200 object-cover bg-gray-100 dark:bg-gray-900"
            />

            <WatchListButton anime={anime}/>
          </div>

          <div className="flex-grow pt-8 md:pt-32">
            <AnimeSummary
              animeTitle={anime.title.english || anime.title.romaji}
              animeAveScore={anime.averageScore}
              animeStatus={anime.status}
              animeDescription={anime.description}
              animeColor={anime.coverImage.color}
              animeSeason={anime.season}
              animeSeasonYear={anime.seasonYear}
              animeGenres={anime.genres}
            />

            <AnimeCharacters characters={anime.characters.edges} />

            <AnimeTrailer
              animeId={anime.trailer?.id}
              animeSource={anime.trailer?.site}
            />
            <AnimeStreaming externalLinks={anime.externalLinks} />
            <AnimeRecommend anime={anime.recommendations.nodes} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
