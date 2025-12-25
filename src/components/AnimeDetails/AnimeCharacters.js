import Image from "next/image";

const AnimeCharacters = ({characters}) => {
  return (
    <div className="pt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Characters
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 ">
        {characters.map((char) => (
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
  );
};

export default AnimeCharacters;
