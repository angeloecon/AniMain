"use client";

import LoadingIndicator from "../../LoadingAnim/loadingIndicator";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";

const Carousel = ({ data, isLoading }) => {
  const slicedData = data.slice(0, 5);

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
      className={`h-[90vh] md:h-[700px]`}
    >
      {slicedData.map((value, index) => {
        return (
          <SwiperSlide
            key={index}
            className="block w-full h-full relative overflow-hidden"
          >
            <div
              data-swiper-parallax="-0.5%"
              className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover blur-sm contrast-[0.9]"
              style={{
                backgroundImage: `url(${value.images.webp.large_image_url})`,
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
            </div>

            <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:px-20 lg:px-32 gap-6 md:gap-8">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start flex-shrink-0 order-2 md:order-1 space-y-6">
                <h2
                  className={`font-anime text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-sm text-center md:text-left leading-tight`}
                >
                  {value.title
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
                  data-swiper-parallax='-200'
                  data-swiper-parallax-duration="800"
                  data-swiper-parallax-opacity="0.6"
                >
                  <span className="px-4 py-2 text-sm md:text-base font-bold bg-blue-600 text-white rounded-full shadow-lg">
                    {value.score ? `⭐ ${value.score}` : "New Season"}
                  </span>

                  <span
                    className="px-4 py-2 text-sm md:text-base border border-gray-600/50 text-gray-800 rounded-full bg-white/40 backdrop-blur-sm"
                    data-swiper-parallax="-500"
                    data-swiper-parallax-duration="1000"
                    data-swiper-parallax-opacity="0.6"
                  >
                    {value.episodes ? `${value.episodes} Episodes` : "Ongoing"}
                  </span>

                  <Link
                    href={`/anime-detail?id=${value.mal_id}`}
                    className="group flex items-center gap-2 px-5 py-2 text-sm md:text-base font-semibold text-white bg-black/80 hover:bg-black rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    data-swiper-parallax='-800'
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
                    src={value.images.webp.large_image_url}
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
