"use client";

import LoadingIndicator from "../LoadingAnim/loadingIndicator";

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
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        stopOnLastSlide: false,
      }}
      loop={true}
      parallax={true}
      speed={3000}
      className={`h-[90vh] md:h-[700px]`}
    >
      {slicedData.map((value, index) => {
        return (
          <SwiperSlide key={index}>
            <Link
              href={`/anime-detail?id=${value.mal_id}`}
              className="block w-full h-full relative overflow-hidden"
            >
              <div
                data-swiper-parallax="-25%"
                className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover blur-sm contrast-[0.9]"
                style={{
                  backgroundImage: `url(${value.images.webp.large_image_url})`,
                }}
              >
                <div className="absolute inset-0 bg-white/40"></div>
              </div>

              <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-between p-6 md:px-20 lg:px-32 gap-4 md:gap-8">
                <div className="w-full md:w-1/2 flex justify-start sm:justify-center flex-shrink-0 pt-10 md:pt-0">
                  <h2 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-sm text-center md:text-left leading-tight">
                    {value.title.split("").map((char, index) => {
                      const isSpace = char === " ";
                      return (
                        <span
                          data-swiper-parallax={`-${index * 50}`}
                          data-swiper-parallax-opacity={`${
                            isSpace ? "0" : `-${index * 0.1}`
                          }`}
                          key={index}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </h2>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-start flex-1 min-h-0 md:h-[70vh]">
                  <div
                    data-swiper-parallax="-100"
                    data-swiper-parallax-opacity="0"
                    className="relative h-full w-full flex items-center justify-center md:justify-center"
                  >
                    <img
                      src={value.images.webp.large_image_url}
                      alt={value.title}
                      className="max-h-full w-auto object-contain md:object-cover rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-1000`"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
