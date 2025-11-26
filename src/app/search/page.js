// Inside src/app/search/page.js

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

import LoadingIndicator from "../components/LoadingAnim/loadingIndicator";
import ParallaxCard from "../components/ParallaxCard/ParallaxCard";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const data = await (await fetch(`/api/jikan/search?q=${query}&page=${page}`)).json();
      setAnimeList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      
    }
  };
//animeList.length <= 24?  setNextButton(false) : setNextButton(true)
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (!query) return;
    
    fetchResults();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${search}&page=1`);
  };

  return (
    <main className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Results for "{query}"
          </h1>

          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anime..."
              className="text-black px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-xl text-gray-500">
            <div>
              <LoadingIndicator size={200} />
              <p className="text-black">Searching for "{query}"...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8 justify-items-center">
              {animeList.map((anime, index) => (
                <Link key={index} href={`/anime-detail?id=${anime.mal_id}`}>
                  <ParallaxCard
                    title={anime.title}
                    content={anime.title_japanese || anime.title_english || ""}
                    image={anime.images.jpg.large_image_url}
                  ></ParallaxCard>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 pb-8">
              {page - 1 > 0 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
                >
                  {page + 1}
                </button>
              )}
            </div>
          </>
        )}

        {!isLoading && animeList.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No anime found.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
