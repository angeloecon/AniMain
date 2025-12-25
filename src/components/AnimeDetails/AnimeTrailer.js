import React from "react";
import VideoPlayer from "../UI/VideoPlayer";

const AnimeTrailer = ({ animeId, animeSource }) => {
  return (
    <div className="pt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Trailer
      </h3>
      {!animeId || !animeSource ? (
        <div className="w-full max-w-lg h-40 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            No Trailer Available
          </span>
        </div>
      ) : (
        <VideoPlayer link={`https://www.youtube.com/watch?v=${animeId}`} />
      )}
    </div>
  );
};

export default AnimeTrailer;
