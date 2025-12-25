 import AllSectionCard from "../Card/AllSectionCard";

const OverView = ({ anime }) => {
  return (
    <div className="pt-8">
      {anime.length > 0 && (
        <>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
            Recommendations
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {anime.map((recommend) => (
              <AllSectionCard 
                key={recommend.mediaRecommendation.id}
                animeId={recommend.mediaRecommendation.id}
                animeImage={recommend.mediaRecommendation.coverImage?.large || recommend.mediaRecommendation.coverImage?.medium}
                animeTitle={recommend.mediaRecommendation.title.english || recommend.mediaRecommendation.title.romaji}
                animeScore={recommend.mediaRecommendation.averageScore}
                animeSeason={recommend.mediaRecommendation.season}
                animeYear={recommend.mediaRecommendation.seasonYear}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OverView;