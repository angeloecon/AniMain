"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAnimeSearch } from "@/hooks/useAnime";

import Link from "next/link";
import LoadingIndicator from "@/components/UI/LoadingState/LoadingAnimation";
import ParallaxCard from "@/components/Card/ParallaxCard/ParallaxCard";
import LoadingState from "@/components/UI/LoadingState/LoadingState";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const { animeData, isLoading, pagination, error } = useAnimeSearch(
    query,
    page
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <LoadingState message={`Searching for ${query}...`}/>
  
  if (animeData.length === 0 && !isLoading) {
    return (
      <main className="h-screen bg-gray-50 dark:bg-gray-600 flex justify-center flex-col items-center">
        <div className="text-center py-10">
          <p className="text-gray-500">No anime found.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-600 hover:underline"
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8 text-center text-red-600">
        Error: {error}
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Go back home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 ">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Results for "{query}"
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center mb-6">
          {animeData.map((anime) => (
            <Link
              key={anime.id}
              href={`/anime-detail/${anime.id}`}
              className="w-full"
            >
              <div className="w-full aspect-[2/3]">
                <ParallaxCard
                  title={
                    anime.title.english ||
                    anime.title.romaji ||
                    anime.title.native
                  }
                  content={
                    anime.title.english
                      ? anime.title.romaji
                      : anime.title.native
                  }
                  image={anime.coverImage.large || anime.coverImage.medium}
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
            {pagination.currentPage}
          </span>

          {pagination.hasNextPage && (
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              {page + 1}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchContent;
