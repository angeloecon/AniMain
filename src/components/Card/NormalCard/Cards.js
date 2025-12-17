export default function AnimeCard({ title, image }) {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg group">
 
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
 
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
 
      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight drop-shadow-md">
          {title}
        </h3>
      </div>
    </div>
  );
}
