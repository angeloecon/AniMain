"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";

import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { RightArrowIcon, SmileIcon, TrophyIcon } from "../Icons";

const AllTimeTopAnime = ({ data }) => {
  
  return (
    <Swiper
      modules={[Autoplay, Pagination, Parallax]}
      slidesPerView={1}
      slidesPerGroup={1}
      centeredSlides={true}
      pagination={{ clickable: true, type: "progressbar" }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        stopOnLastSlide: false,
      }}
      loop={true}
      parallax={true}
      speed={2500}
      className={`h-[70vh]`}
    >
      {data.map((value, index) => {
        return (
          <SwiperSlide
            key={value.id}
            className="block w-full h-full relative overflow-hidden"
          >
            <div
              data-swiper-parallax="-0.5%"
              className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover blur-sm contrast-[0.9]"
              style={{
                backgroundImage: `url(${
                  value.bannerImage || value.coverImage.extraLarge
                })`,
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
            </div>

            <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:px-20 lg:px-32 gap-6 md:gap-8">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start flex-shrink-0 order-2 md:order-1 space-y-6">
                <h2
                  className={`font-anime text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-sm text-center md:text-left leading-tigh line-clamp-1t`}
                >
                  {(value.title?.english || value.title?.romaji || "Unknown")
                    .split("")
                    .slice(0, 45)
                    .map((char, index) => {
                      const isSpace = char === " ";
                      return (
                        <span
                          data-swiper-parallax={`-${index * 50}`}
                          data-swiper-parallax-duration="600"
                          data-swiper-parallax-opacity={`${
                            isSpace ? "0" : `-${index * 0.1}`
                          }`}
                          key={index}
                        >
                          {index === 45 - 1 ? "..." : char}
                        </span>
                      );
                    })}
                </h2>

                <div
                  className="flex flex-wrap justify-center md:justify-start items-center gap-3"
                  data-swiper-parallax="-200"
                  data-swiper-parallax-duration="800"
                  data-swiper-parallax-opacity="0.6"
                >
                  {index < 3 ? (
                    <span
                      className={`flex items-center gap-2 px-4 py-2 text-sm md:text-base font-bold text-white rounded-full shadow-lg ring-1 ring-white/20 ${
                        index === 0
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
                          : index === 1
                          ? "bg-gray-50/20 text-gray-300 border border-gray-400/50"
                          : "bg-orange-600/20 text-orange-400 border border-orange-500/50"
                      }`}
                    >
                      {/* Trophy Icon SVG/ pangit failed svg/ TEMPO*/}
                      <TrophyIcon/>
                      Top {index + 1}
                    </span>
                  ) : (
                    <span
                      className={`flex bg-gray-800/30 border border-gray-500/50 items-center gap-2 px-4 py-2 text-sm md:text-base font-bold text-white rounded-full shadow-lg ring-1 ring-white/30 `}
                    >
                      Top {index + 1}
                    </span>
                  )}

                  <span
                    className="flex px-4 py-2 text-sm md:text-base font-bold bg-gray-600 text-white rounded-full shadow-lg"
                    data-swiper-parallax="-350"
                    data-swiper-parallax-duration="800"
                    data-swiper-parallax-opacity="0.6"
                  >
                    {/* :) */}
                    <SmileIcon className="w-5 h-5 text-green-300"/>
                    {value.averageScore ? `${value.averageScore}%` : "New"}
                  </span>

                  <span
                    className="px-4 py-2 text-sm md:text-base border border-gray-600/50 text-gray-800 rounded-full bg-white/40 backdrop-blur-sm"
                    data-swiper-parallax="-500"
                    data-swiper-parallax-duration="1000"
                    data-swiper-parallax-opacity="0.6"
                  >
                    {value.episodes ? value.episodes === 1 ? "Movie" : `${value.episodes} Episodes` : "Ongoing"}
                  </span>

                  <Link
                    href={`/anime-detail/${value.id}`}
                    className="group flex items-center gap-2 px-5 py-2 text-sm md:text-base font-semibold text-white bg-black/80 hover:bg-black rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    data-swiper-parallax="-800"
                    data-swiper-parallax-duration="1200"
                    data-swiper-parallax-opacity="0.6"
                  >
                    See More
                    <RightArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center flex-1 min-h-[300px] md:h-[70vh] order-1 md:order-2">
                <div
                  data-swiper-parallax="-100"
                  data-swiper-parallax-opacity="0"
                  data-swiper-parallax-y="300"
                  className="relative h-full w-full flex items-center justify-center"
                >
                  <img
                    src={value.coverImage?.extraLarge}
                    alt={value.title}
                    className="max-h-[300px] md:max-h-full w-auto object-contain rounded-xl shadow-2xl hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default AllTimeTopAnime;
