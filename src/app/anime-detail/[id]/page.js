"use client";
import { useParams } from "next/navigation";
import { useAnimeDetail } from "@/hooks/useAnime";
import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import { addToWatchlist } from "@/lib/watchlist";
import { useUserWatchlist } from "@/lib/watchlist";

import VideoPlayer from "@/components/VideoPlayer/videoPlayer";
import LoadingAnimation from "../../../components/Loading/loadingIndicator";
import Image from "next/image";

import Link from "next/link";

const MENU_ITEMS = ["Overview", "Characters"];

export default function AnimeDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const animeId = params.id;
  const { anime, isLoading: loadAnimeData, error } = useAnimeDetail(animeId);
  const { watchlistData, isLoading: loadUserData } = useUserWatchlist(
    user?.uid
  );

  const [addStatus, setAddStatus] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [menu, setMenu] = useState(0);

  useEffect(() => {
    setIsClient(true);
  });

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

  if (isChecking || !isClient)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <LoadingAnimation size={200} />
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  if (!anime) return null;

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
              alt={anime.title?.english}
              width={260}
              height={370}
              priority={false}
              className="w-64 h-auto rounded-lg mb-4 shadow-2xl border-4 border-gray-900 dark:border-gray-200 object-cover bg-gray-100 dark:bg-gray-900"
            />

            <button
              onClick={() => {
                handleAddToWatchlist();
              }}
              disabled={!user || addStatus === "Adding..." || isAlreadyAdded}
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

          {/* Right Side section == */}
          <div className="flex-grow pt-8 md:pt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ">
              {anime.title.english || anime.title.romaji}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded font-bold ${
                  anime.averageScore >= 80
                    ? "bg-green-600"
                    : anime.averageScore == null
                    ? "bg-gray-500"
                    : "bg-yellow-500"
                }`}
              >
                {anime.averageScore
                  ? `${anime.averageScore}% Score`
                  : "No Score Yet"}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded capitalize">
                {anime.season} {anime.seasonYear}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded capitalize">
                {anime.status.replaceAll("_", " ")}
              </span>
            </div>

            <div
              className="text-gray-900 dark:text-gray-100 leading-relaxed mb-8 max-w-3xl [&>p]:mb-4 [&>a]:text-blue-500 [&>a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: anime.description }}
            />

            <div className="flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className={`text-sm border dark:border-gray-200 border-gray-700 px-3 py-1 rounded-full text-gray-200`}
                  style={{ backgroundColor: anime.coverImage.color }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Menu ---- */}
            <div className="flex space-x-2 overflow-x-auto mt-6">
              {MENU_ITEMS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => {
                    setMenu(i);
                  }}
                  className={`text-l m:text-sm text-gray-100 px-4 py-2  rounded-sm
                    ${menu == i ? "bg-gray-700" : "bg-gray-500"}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Overview / Characters sections ------------------*/}
            {!menu ? (
              <div className="pt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Trailer
                </h3>
                <VideoPlayer anime={anime} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  Recommendations
                </h3>
                {console.log(
                  anime.recommendations.nodes[0].mediaRecommendation
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {anime.recommendations.nodes.map((recommend) => (
                    <Link
                      key={recommend.mediaRecommendation.id}
                      href={`/anime-detail/${recommend.mediaRecommendation.id}`}
                      className="group relative w-full flex flex-col items-center cursor-pointer"
                    >
                      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={
                            recommend.mediaRecommendation.coverImage?.large ||
                            recommend.mediaRecommendation.coverImage?.medium
                          }
                          alt={
                            recommend.mediaRecommendation.title.english ||
                            recommend.mediaRecommendation.title.romaji
                          }
                          width={240}
                          height={360}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="mt-2 w-full text-center px-1">
                        <span className="block text-sm md:text-base text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">
                          {recommend.mediaRecommendation.title.english ||
                            recommend.mediaRecommendation.title.romaji}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Characters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 ">
                  {anime.characters.edges.map((char) => (
                    <div key={char.node.name.full} className="relative w-full">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={`${char.node.image?.medium}`}
                          width={80}
                          height={80}
                          alt={char.node.name.full}
                          loading="lazy"
                          className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover"
                        />
                        <div className=" flex flex-col justify-center">
                          <span className="text-sm md:text-lg text-black dark:text-white font-bold">
                            {char.node.name.full}
                          </span>
                          <span className="text-xs md:text-xs text-black dark:text-white font-light">
                            {char.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
