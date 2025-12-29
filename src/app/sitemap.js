import { useAniList } from "@/hooks/useAnime";

const sitemap = async () => {
  const baseUrl = "animain.vercel.app";

  const routes = ["", "/search", "/dashboard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const topAnime = useAniList("score", 1, 50);
  const animeUrl = topAnime.map(anime => ({
    url: `${baseUrl}/anime-detail/${anime}`,
    lastModified: new Date(),
  }))

  return [...routes, ...animeUrl];
};

export default sitemap;
