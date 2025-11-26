"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authcontext";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import LoadingAnimation from '../components/LoadingAnim/loadingIndicator';
import Link from "next/link";
import Image from "next/image";

export default function AnimeDetailPage() {
  const { user } = useAuth();
  const router = useRouter();

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("id");

  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addStatus, setAddStatus] = useState(null);

  const [isClient, setIsClient] = useState(false);

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !animeId) {
      if (isClient && !animeId) setIsLoading(false);
      return;
    }

    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/jikan/anime-details?id=${animeId}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch anime details.");
        }

        const data = await response.json();
        setAnime(data);
      } catch (err) {
        console.error("Detail Page Fetch Error:", err);
        setError("Could not load anime details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetails();
    isAddedAlready();
  }, [animeId, isClient]);

  const isAddedAlready = async () => {
    try {
      const response = await fetch(
        `/api/watchlist/view?user_id=${user.userId}`
      );
      const data = await response.json();

      for (const item of data) {
        if (item.anime_id == animeId) {
          setAlreadyAdded(true);
        }
      }

      if (!response.ok) {
        console.log("Failed to retrieve data.");
      }
    } catch (e) {
      
    }
  };

  const handleAddToWatchlist = async () => {
    setAlreadyAdded(true);
    try {
      const response = await fetch("/api/watchlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.userId,
          anime_id: anime.mal_id,
          anime_title: anime.title,
          status: "Plan to Watch",
        }),
      });

      const data = response.json();

      if (!response.ok) throw new Error(data.message || "Failed to add");

      setAddStatus("✅ Added to Watchlist!");
    } catch (e) {
      console.error(e);
      setAddStatus(`Error: ${e.message}`);
      setAlreadyAdded(false);
    }
  };

  if (!isClient || isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <LoadingAnimation size={200} />
      </main>
    );
  }

  if (error || !anime) {
    return (
      <main className="min-h-screen p-8 text-center text-red-600">
        Error: {error || "Anime not found."}
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Go back home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </button>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">
          {anime.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center space-y-4">
            <Image
              width={1200}
              height={1200}
              src={anime.images?.jpg?.large_image_url}
              alt={anime.title}
              blurDataURL="data:image/jpeg;base64,..."
              className="w-full max-w-xs rounded-lg shadow-lg object-cover"
            />

            <button
              onClick={handleAddToWatchlist}
              disabled={(!user || addStatus === "Adding...") || alreadyAdded}
              className="w-full max-w-xs py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {addStatus === "Adding..."
                ? "Adding..."
                : alreadyAdded
                ? "Added to Watchlist"
                : "Add to Watchlist"}
            </button>

            {addStatus && (
              <p
                className={`text-sm font-medium ${
                  addStatus.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {addStatus}
              </p>
            )}

            {!user && (
              <p className="text-sm text-red-500">
                You must be{" "}
                <Link href="/login" className="font-semibold hover:underline">
                  logged in
                </Link>{" "}
                to add anime.
              </p>
            )}
          </div>

          <div className="md:w-2/3 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Type:</strong> {anime.type}
              </p>
              <p>
                <strong>Episodes:</strong> {anime.episodes || "N/A"}
              </p>
              <p>
                <strong>Score:</strong> {anime.score || "N/A"}
              </p>
              <p>
                <strong>Rank:</strong> #{anime.rank || "N/A"}
              </p>
              <p>
                <strong>Source:</strong> {anime.source}
              </p>
              <p>
                <strong>Status:</strong> {anime.status}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Synopsis
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {anime.synopsis || "Synopsis not available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
