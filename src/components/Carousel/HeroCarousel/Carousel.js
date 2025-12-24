"use client";

import LoadingIndicator from "../../Loading/loadingIndicator";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";

const Carousel = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-[90vh] md:h-[700px] flex items-center justify-center">
        <LoadingIndicator size={200} />
      </div>
    );
  }

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
      className={`h-[50vh] lg:h-[70vh]`}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.625h1.92a6.753 6.753 0 006.138-5.625.75.75 0 00-.584-.859c-1.012-.214-2.036-.395-3.071-.543V2.62a.75.75 0 00-.75-.75h-5.25a.75.75 0 00-.75.75zm-2.702 8.426a8.25 8.25 0 0119.073 0 1.5 1.5 0 01-1.66 1.708 7.48 7.48 0 00-6.101 2.973 11.233 11.233 0 01-1.78.694V19.5h3.402a.75.75 0 01.53 1.28l-3.374 3.375a.75.75 0 01-1.06 0l-3.375-3.375a.75.75 0 01.53-1.28h3.402v-3.078a11.233 11.233 0 01-1.78-.694 7.48 7.48 0 00-6.101-2.973 1.5 1.5 0 01-1.66-1.708z"
                          clipRule="evenodd"
                        />
                      </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-green-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75V9zm5.25-.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.008zM12 16.5a4.5 4.5 0 01-3.666-1.928.75.75 0 111.228-.885 3 3 0 004.876 0 .75.75 0 111.228.885A4.5 4.5 0 0112 16.5z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
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

export default Carousel;
