"use client";

import Link from "next/link";
import LoadingAnimation from "./components/LoadingAnim/loadingIndicator";
import Carousel from "./components/Carousel/HeroCarousel/Carousel";
import SwiperCard from "./components/Carousel/SwiperCarousel/SwiperCard";
import { useJikan } from "@/hooks/useAnime";
import { useEffect } from "react";


export default function HomePage() {
  const { data: topAnime, loading: topLoading } = useJikan("/top-anime", 100);
  const { data: upcomingAnime, loading: upcomingAniLoading } = useJikan(
    "/seasonal-upcoming",
    200
  );
  const { data: seasonalAnime, loading: seasonLoading } = useJikan(
    "/seasonal-anime",
    700
  );
 

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 ">
      <Carousel data={seasonalAnime} isLoading={seasonLoading} />

      {/* -------------------------------- */}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-600 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Upcoming Anime
          </h2>
          {upcomingAniLoading ? (
            <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
              <LoadingAnimation size={200} />
              <p className="mt-4 text-sm text-gray-400 animate-pulse">
                Loading upcoming charts...
              </p>
            </div>
          ) : (
            <div className="mb-16">
              <SwiperCard animeList={upcomingAnime} />
              <div className="text-center mt-6">
                <Link
                  href="/browse/upcoming"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  View Upcoming Anime
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------- */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Top Anime
          </h2>
          {topLoading ? (
            <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
              <LoadingAnimation size={200} />
              <p className="mt-4 text-sm text-gray-400 animate-pulse">
                Loading top charts...
              </p>
            </div>
          ) : (
            <div className="mb-16">
              <SwiperCard animeList={topAnime } />
              <div className="text-center mt-6">
                <Link
                  href="/browse/top"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  View All Top Anime
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------- */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Seasonal Anime
          </h2>
          {seasonLoading ? (
            <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
              <LoadingAnimation size={200} />
              <p className="mt-4 text-sm text-gray-400 animate-pulse">
                Loading seasonal charts...
              </p>
            </div>
          ) : (
            <div className="mb-16">
              <SwiperCard animeList={seasonalAnime} />
              <div className="text-center mt-6">
                <Link
                  href="/browse/seasonal"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  View Seasonal Anime
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
