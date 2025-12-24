'use client'
import React from "react";
import ReactPlayer from 'react-player'

export default function videoPlayer ({anime}) {
  return (
    <>
      {!anime.trailer?.id || !anime.trailer?.site ? (
        <div className="w-full max-w-lg h-40 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            No Trailer Available
          </span>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
              width="100%"
              height="100%"
              controls={true}
              playing={false}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    origin:
                      typeof window !== "undefined"
                        ? window.location.origin
                        : undefined,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

