const sitemap = async () => {
  const baseUrl = "https://animain.vercel.app";

  const routes = ["", "/search", "/dashboard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  try {
      const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            Page(page: 1, perPage: 25) {
              media(sort: TRENDING_DESC, type: ANIME) {
                id
                updatedAt
              }
            }
          }
        `,
      }),
      next: { revalidate: 86400 }
    });

    const json = await response.json();
    
    const animeUrls = (json.data?.Page?.media || []).map((anime) => ({
      url: `${baseUrl}/anime-detail/${anime.id}`,
      lastModified: anime.updatedAt ? new Date(anime.updatedAt * 1000) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...routes, ...animeUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
};

export default sitemap;
