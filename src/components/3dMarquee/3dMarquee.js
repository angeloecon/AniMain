"use client";

import React, { useEffect, useState } from "react";
import styles from "./3dMarquee.module.css";
import LoadingAnim from "../Loading/loadingIndicator";
import { useAniList } from "@/hooks/useAnime";

export default function Marquee3D({ children }) {
  const { animeList, pagination, isLoading, error } = useAniList(
    "score",
    1,
    16
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center bg-gray-50 dark:bg-gray-600">
        <LoadingAnim size={200} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-600 relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div
        className={` absolute inset-0 overflow-hidden ${styles.wrapper} bg-gray-50 dark:bg-gray-600`}
      >
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

                  {animeList.map((src, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative group transition-transform duration-300 ease-in-out hover:-translate-y-2"
                    >
                      <div
                        className={`absolute -top-4 -left-5 w-[120%] h-[1px] z-30 ${styles.gridLineHorizontal}`}
                      ></div>

                      <img
                        src={
                          animeList[
                            (colIndex * 4 + imgIndex) % animeList.length
                          ].coverImage.extraLarge ||
                          animeList[
                            (colIndex * 4 + imgIndex) % animeList.length
                          ].coverImage.large
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

      <div className="relative z-40 w-full max-w-md p-6">{children}</div>
    </div>
  );
}
