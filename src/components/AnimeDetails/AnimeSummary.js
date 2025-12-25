 import React from "react";

const AnimeSummary = ({ anime }) => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ">
        {anime.title.english || anime.title.romaji}
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <span
          className={`px-3 py-1 rounded  ${
            anime.averageScore >= 80
              ? "bg-green-600"
              : anime.averageScore == null
              ? "bg-gray-500"
              : "bg-yellow-500"
          }`}
        >
          {anime.averageScore ? `${anime.averageScore}% Score` : "No Score Yet"}
        </span>
        <span
          className={`bg-gray-800 px-3 py-1 rounded capitalize  ${
            !anime.season && "hidden"
          }`}
        >
          {anime.season} • {anime.seasonYear}
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
    </>
  );
};

export default AnimeSummary;
