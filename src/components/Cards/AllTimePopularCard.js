import Link from "next/link";
import Image from "next/image";

const AllTimePopularCard = ({
  animeId,
  animeImage,
  animeTitle,
  animeScore,
  animeSeason,
  animeYear,
}) => {
  return (
    <Link href={`/anime-detail/${animeId}`}>
      <div className="relative w-full group">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
 
          <Image
            src={animeImage}
            alt={animeTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            priority={false}
          />
          
          {animeScore && (
            <div
              className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold text-white shadow-sm ${
                animeScore >= 80 ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {animeScore}%
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-500 transition-colors">
            {animeTitle}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {animeSeason} • {animeYear || "TBA"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AllTimePopularCard;
