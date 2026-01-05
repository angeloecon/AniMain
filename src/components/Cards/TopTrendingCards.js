import Image from "next/image";

const TopTrendingCards = ({ image, title }) => {
  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl bg-gray-800 ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-300 transform group-hover:-translate-y-2">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <p className="text-white text-xs font-bold line-clamp-2">{title}</p>
      </div>
    </div>
  );
};

export default TopTrendingCards;
