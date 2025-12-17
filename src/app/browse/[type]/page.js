"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LoadingAnimation from "@/components/LoadingAnim/loadingIndicator";
import ParallaxCard from "@/components/Card/ParallaxCard/ParallaxCard";

const CATEGORY_CONFIG = {
  top: {
    title: "🔥 Top Anime",
    endpoint: "/api/jikan/top-anime",
  },
  seasonal: {
    title: "🍂 Seasonal Anime",
    endpoint: "/api/jikan/seasonal-anime",
  },
  upcoming: {
    title: "📅 Upcoming Anime",
    endpoint: "/api/jikan/seasonal-upcoming",
  },
};

export default function BrowsePage({ params }) {
  const { type } = use(params);
  const categoryType = type;

  const router = useRouter();
  const searchParams = useSearchParams();
  const config = CATEGORY_CONFIG[categoryType];

  const page = parseInt(searchParams.get("page")) || 1;
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!config) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${config.endpoint}?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAnimeList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setAnimeList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryType, page, config]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    router.push(`/browse/${categoryType}?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Category not found.</h1>
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 ">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {config.title}
          </h1>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back Home
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingAnimation size={150} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8 justify-items-center">
              {animeList.map((anime, index) => (
                <Link
                  key={`${anime.mal_id}-${index}`}
                  href={`/anime-detail?id=${anime.mal_id}`}
                >
                  <div className="h-[320px]">
                    <ParallaxCard
                      title={anime.title}
                      content={
                        anime.title_japanese || anime.title_english || ""
                      }
                      image={anime.images.jpg.large_image_url}
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 pb-8">
              {page - 1 > 0 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                >
                  {page - 1}
                </button>
              )}

              <span className="px-4 py-2 bg-blue-600 border border-gray-300 rounded-md text-white hover:bg-blue-700 font-medium">
                {page}
              </span>

              {animeList.length === 25 && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={animeList.length === 0}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                >
                  {page + 1}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
