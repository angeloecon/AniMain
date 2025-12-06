"use client";
import Link from "next/link";
import Card from "../../Card/NormalCard/Cards";  
 
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

 
import {EffectCoverflow, Pagination, Autoplay , Navigation, FreeMode } from "swiper/modules";

export default function TopAnimeSlider({ animeList }) {
  if (!animeList || animeList.length === 0) return null;

  return (
    <div className="w-full py-8">
      <Swiper
     
        centeredSlides={true}
        slidesPerView={"auto"}
        
    
        coverflowEffect={{
          rotate: 30,
          stretch: 1,
          depth: 100,
          modifier: 10,
          slideShadows: false,
        }}
        
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}

        freeMode={{
          enabled:true,
          minimumVelocity: 0.2,
          momentumBounce: true,
          momentum: true,
          momentumRatio: 3,
          momentumBounceRatio: 3
        }}

        navigation={{
          addIcons: true
        }}

     
        modules={[Navigation,EffectCoverflow , Pagination, Autoplay, FreeMode]}
        className="mySwiper !pb-12"
      >
        {animeList.map((anime, index) => (
          <SwiperSlide
            key={`${anime.mal_id}-${index}`}
            className="!w-[280px] sm:!w-[320px]"
          >
            <Link href={`/anime-detail?id=${anime.mal_id}`} className="block">
              <div className="h-[450px] w-full rounded-xl overflow-hidden shadow-xl border-2 border-transparent hover:border-blue-500/50 transition-all duration-300">
                <Card
                  title={anime.title}
                  content={anime.title_japanese || anime.title_english || ""}
                  image={anime.images.jpg.large_image_url}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
