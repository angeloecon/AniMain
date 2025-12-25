"use client";
import { AnimeRecommend, AnimeCharacters, AnimeTrailer, AnimeSummary } from '@/components/AnimeDetails/OverView'
import { useParams } from "next/navigation";
import { useAnimeDetail } from "@/hooks/useAnime";
import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import { addToWatchlist } from "@/lib/watchlist";
import { useUserWatchlist } from "@/lib/watchlist";

import LoadingState from "@/components/UI/LoadingState/LoadingState";
import ErrorState from "@/components/UI/ErrorState";
import Image from "next/image";
import Link from "next/link";

const AnimeDetailPage = () => {
  const { user, authLoading } = useAuth();
  const params = useParams();
  const animeId = params.id;
  const { anime, isLoading: loadAnimeData, error } = useAnimeDetail(animeId);
  const { watchlistData, isLoading: loadUserData } = useUserWatchlist(
    user?.uid
  );

  const [addStatus, setAddStatus] = useState(null);
  const [errorAdd, setErrorAdd] = useState(false);

  const isAlreadyAdded = watchlistData?.some(
    (item) => item.id == parseInt(params.id)
  );
  const isChecking = loadUserData || loadAnimeData;

  const handleAddToWatchlist = async () => {
    setAddStatus("Adding...");
    try {
      await addToWatchlist(user.uid, anime);
    } catch (err) {
      console.error("Failed to Add", err);
      setErrorAdd(true);
    } finally {
      setAddStatus(" ");
    }
  };

  if (authLoading) return <LoadingState message="Loading..." />;
  if (loadUserData) return <LoadingState message="Loading User..." />;
  if (loadAnimeData) return <LoadingState message="Loading Details..." />;
  if (error || errorAdd)
    return (
      <ErrorState
        message={"It might be a permission issue or network error."}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50 text-white pb-20 transition-colors duration-300">
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

      <div className="container mx-auto px-6 -mt-32 relative z-10 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side Section == */}

          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={anime.coverImage?.extraLarge || anime.coverImage?.large}
              alt={anime.title?.english || anime.title.romaji}
              width={260}
              height={370}
              priority={false}
              className="w-64 h-auto rounded-lg mb-4 shadow-2xl border-4 border-gray-900 dark:border-gray-200 object-cover bg-gray-100 dark:bg-gray-900"
            />

            <button
              onClick={() => {
                handleAddToWatchlist();
              }}
              disabled={
                !user ||
                addStatus === "Adding..." ||
                isChecking ||
                isAlreadyAdded
              }
              className="w-full max-w-xs py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {addStatus === "Adding..."
                ? "Adding..."
                : isAlreadyAdded
                ? "Added to Watchlist"
                : "Add to Watchlist"}
            </button>

            {!user && (
              <p className="text-sm text-red-500 mt-2 text-center">
                You must be{" "}
                <Link href="/login" className="font-semibold hover:underline">
                  logged in
                </Link>{" "}
                to add anime.
              </p>
            )}
          </div>

          <div className="flex-grow pt-8 md:pt-32">
            <AnimeSummary anime={anime}/>

            <AnimeCharacters characters={anime.characters.edges} />

            <AnimeTrailer
              animeId={anime.trailer?.id}
              animeSource={anime.trailer?.site}
            />
            <AnimeRecommend anime={anime.recommendations.nodes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;
