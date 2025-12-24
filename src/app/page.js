"use client";

import { useAniList } from "@/hooks/useAnime";
import { useEffect, useState } from "react";

import Link from "next/link";
import LoadingAnimation from "../components/Loading/loadingIndicator";
import Carousel from "../components/Carousel/HeroCarousel/Carousel";
import SwiperCard from "../components/Carousel/SwiperCarousel/SwiperCard";


export default function HomePage() {
  const { animeList: topAnime, isLoading: topAnimeLoading } =
    useAniList("score", 1, 15);
  const { animeList: popularAnime, isLoading: popularLoading } = useAniList(
    "popular",
    1,
    12
  );
  const { animeList: trendingData, isLoading: trendingLoading } = useAniList(
    "trending",
    1,
    8
  );
  const { animeList: upcomingList, loading: upcomingLoading } = useAniList(
    "upcoming",
    1,
    20
  );

  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    if (trendingData.length > 0) {
      setBannerImage(
        `url(${
          trendingData[0].bannerImage
            ? trendingData[0].bannerImage
            : trendingData[0].coverImage.large
        })`
      );
    }
  }, [trendingData]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* // HERO CAROUSEL ---------------- */}
      <Carousel data={topAnime} isLoading={topAnimeLoading} />

      {/* // POPULAR SECTION --------------- */}
 
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide uppercase">
              All Time Popular
            </h2>
            <div className="h-1 w-20 bg-blue-500 rounded mt-1"></div>
          </div>
          <Link
            href="/browse/score"
            className="text-sm font-semibold text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            View All Collection &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularAnime.map((anime) => (
            <Link key={anime.id} href={`/anime-detail/${anime.id}`} className="group">
              <div className="relative w-full">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img
                    src={anime.coverImage?.extraLarge}
                    alt={anime.title.romaji}
                    className="h-full w-full object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold text-white shadow-sm ${
                      anime.averageScore >= 80 ? "bg-green-500" : "bg-yellow-500"
                  }`}>
                    {anime.averageScore}%
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {anime.title.english || anime.title.romaji}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {anime.season} • {anime.seasonYear || "TBA"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* // TRENDING SECTION -------------- */}

      <section className="relative w-full py-24 overflow-hidden">
        
        <div
          className="absolute inset-0 z-0 transition-all duration-700 ease-in-out transform scale-105"
          style={{
            backgroundImage: bannerImage,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center 20%", 
          }}
        />
        
        <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent z-10" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10" />

        {/* // TRENDING - CONTENT LAYER --- */}

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10 border-b border-white/20 pb-4">
            <div>
               <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
                Trending Now
              </h2>
              <p className="text-gray-200 text-sm mt-1">Buzzing in the community</p>
            </div>

            <Link
              href="/browse/trending"
              className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-bold transition-all hover:scale-105"
            >
              Explore Trending
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {trendingData.map((anime) => (
              <Link
                key={anime.id}
                href={`/anime-detail/${anime.id}`}
                className="group relative block"
                onMouseEnter={() =>
                  setBannerImage(
                    `url(${
                      anime.bannerImage
                        ? anime.bannerImage
                        : anime.coverImage.extraLarge
                    })`
                  )
                }
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl bg-gray-800 ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-300 transform group-hover:-translate-y-2">
                  <img
                    src={anime.coverImage?.extraLarge || anime.coverImage?.large}
                    alt={anime.title.romaji}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                     <p className="text-white text-xs font-bold line-clamp-2">
                        {anime.title.english || anime.title.romaji}
                     </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      

      {/* // UPCOMING SECTION ---------------- */}

      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-500 mb-4 text-center">
            Upcoming Anime
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-xl">
            Get ready for the next wave of animation. Here is what is scheduled to air soon.
          </p>
        </div>

        {upcomingLoading ? (
          <div className="text-center py-20">
            <LoadingAnimation size={150} />
          </div>
        ) : (
          <div className="relative">
            <SwiperCard data={upcomingList} />

            <div className="mt-12 text-center">
              <Link
                href="/browse/upcoming"
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-lg group focus:outline-none focus:ring focus:ring-indigo-300 active:scale-95"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-800 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-800 rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-700 rounded-md group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  View Full Schedule
                </span>
              </Link>
            </div>
          </div>
        )}
      </section>
      
    </main>
  );
}