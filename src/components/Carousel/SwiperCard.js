"use client";

import { EffectCoverflow, Autoplay, Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "../Cards/UpcomingCard";
import Link from "next/link";

import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css";

export default function TopAnimeSlider({ data }) {

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full py-8">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
         autoplay={{
          delay: 3500,
          pauseOnMouseEnter: true,
        }}
        freeMode={{
          enabled:true,
          minimumVelocity: 0.2,
          momentumBounce: true,
          momentum: true,
          momentumRatio: 3,
          momentumBounceRatio: 3
        }}
        // onSlideChange={handleSlideChange}
        navigation={{
          addIcons: true
        }}
        modules={[EffectCoverflow, Autoplay, Navigation,FreeMode]}
        className="mySwiper rounded-xl "
      >
        {data.map((anime, index) => (
          <SwiperSlide
            key={`${anime.id}-${index}`}
            className="!w-[280px] sm:!w-[320px] rounded-xl overflow-hidden"
          >
            
            <Link href={`/anime-detail/${anime.id}`} className="block">
              <div className="h-[450px] w-full rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500/50 transition-all duration-300">
                <Card
                  title={anime.title.english || anime.title.romaji}
                  content={anime.title.romaji || anime.title.english || ""}
                  image={anime.coverImage.extraLarge || anime.coverImage.large}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
