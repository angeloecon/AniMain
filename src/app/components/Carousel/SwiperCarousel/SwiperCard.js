"use client";
import Link from "next/link";
import Card from "../../Card/NormalCard/Cards";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Autoplay,
  Navigation,
  FreeMode,
} from "swiper/modules";

export default function TopAnimeSlider({ animeList }) {
  // const handleSlideChange = (index) => {
  //   console.log('active: ',index)
  // }

  if (!animeList || animeList.length === 0) return null;

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
        {animeList.map((anime, index) => (
          <SwiperSlide
            key={`${anime.mal_id}-${index}`}
            className="!w-[280px] sm:!w-[320px] rounded-xl overflow-hidden"
          >
            
            <Link href={`/anime-detail?id=${anime.mal_id}`} className="block">
              <div className="h-[450px] w-full rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500/50 transition-all duration-300">
                <Card
                  title={anime.title}
                  content={anime.title_japanese || anime.title_english || ""}
                  image={anime.images.webp.large_image_url}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
