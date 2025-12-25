"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ParallaxCard from "@/components/Card/ParallaxCard/ParallaxCard";
import LoadingState from "@/components/UI/LoadingState/LoadingState";
import ErrorState from "@/components/UI/ErrorState";

import { useAniList } from "@/hooks/useAnime";

const BrowsePage = ({params}) => {
  const { type } = use(params);

  const categoryType = type;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const {
    animeList: animeData,
    pagination: animePagination,
    isLoading: animeLoading,
    error: animeError,
  } = useAniList(categoryType, page, 30);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    router.push(`/browse/${categoryType}?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (animeLoading) return <LoadingState message="Loading..."/>
  

  if (!categoryType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Category not found.</h1>
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  if (animeError) return <ErrorState message={animeError} onRetry={() => window.location.reload()}/>

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 ">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)} anime
          </h1>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back Home
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center mb-6">
          {animeData.map((anime, index) => (
            <Link
              key={`${anime.id}-${index}`}
              href={`/anime-detail/${anime.id}`}
              className="w-full"
            >
              <div className="w-full aspect-[2/3]">
                <ParallaxCard
                  title={anime.title.english || anime.title.romaji}
                  content={
                    anime.season && anime.seasonYear ?
                    (anime.season + " - " + anime.seasonYear) : "TBA"
                  }
                  image={anime.coverImage?.large}
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
            {animePagination.currentPage}
          </span>

          {animePagination.hasNextPage && (
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!animePagination.hasNextPage}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              {page + 1}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default BrowsePage

