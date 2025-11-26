"use client";

import React, { useEffect, useState } from "react";
import styles from "./3dMarquee.module.css";
import LoadingAnim from "../LoadingAnim/loadingIndicator";

export default function Marquee3D({ children }) {
  const [isLoading, setIsLoading] = useState(false);
let arr = [];
  const [topAnimeImage, setTopAnimeImage] = useState([]);

  const fetchTopAnime = async () => {
    const res = await fetch("/api/jikan/top-anime");
    const data = await res.json();
    return data;
  };

  const fetchSeasonalAnime = async () => {
    const res = await fetch("/api/jikan/seasonal-anime");
    const data = await res.json();
    return data;
  };

  const fetchCombinedImages = async () => {
    const topAnime = await fetchTopAnime();
    const seasonalAnime = await fetchSeasonalAnime();
    return { topAnime, seasonalAnime };
  };

  useEffect(() => {
    setIsLoading(true);
    
    fetchCombinedImages().then(({ topAnime, seasonalAnime }) => {
      arr = [
        ...topAnime.slice(0, 8).map((anime) => anime.images.webp.large_image_url),
        ...seasonalAnime.slice(0, 8).map((anime) => anime.images.webp.large_image_url)
      ];
      
      setTopAnimeImage(arr);
      
      console.log("Fetched images for 3D Marquee:", arr);
    }).catch((error) => {
      console.error("Error fetching images for 3D Marquee:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if(isLoading){
    return (
      <div className="w-full h-screen flex justify-center bg-gray-50">
        <LoadingAnim size={200} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden   flex items-center justify-center">
      <div className={`absolute inset-0 overflow-hidden ${styles.wrapper} bg-gray-50`}>
        <div className="absolute inset-0 flex items-center justify-center perspective-[600px]">
          <div className="w-[250vmin] h-[250vmin] min-w-[1500px] min-h-[1500px] flex-shrink-0 origin-center">
            <div
              className={`relative w-full h-full grid grid-cols-5 gap-8 origin-center ${styles.marqueeGrid}`}
            >
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex flex-col gap-8 relative ${
                    colIndex % 2 === 0 ? styles.animateDown : styles.animateUp
                  }`}
                  style={{ animationDelay: `${colIndex * 0.5}s` }}
                >
                  <div
                    className={`absolute -left-[1px] -top-20 w-[1px] h-[150%] z-30 ${styles.gridLineVertical}`}
                  ></div>

                  {topAnimeImage.slice(0, 11).map((src, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative group transition-transform duration-300 ease-in-out hover:-translate-y-2"
                    >
                      <div
                        className={`absolute -top-4 -left-5 w-[120%] h-[1px] z-30 ${styles.gridLineHorizontal}`}
                      ></div>

                      <img
                        src={
                          topAnimeImage[
                            (colIndex * 2 + imgIndex) % topAnimeImage.length
                          ]
                        }
                        alt={`Grid item ${imgIndex}`}
                        className="w-full h-auto rounded-lg object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-2xl bg-white "
                        style={{ aspectRatio: "970/700" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-50 w-full max-w-md p-6">{children}</div>
    </div>
  );
}
