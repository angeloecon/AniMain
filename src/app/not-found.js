"use client";

import Lottie from "lottie-react";
import LOTTIE_URL from "../../public/animations/manheraresize.json";
import Link from "next/link";

import React from "react";

const notFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen bg-white text-white">
      <div className="flex flex-col items-center mt-20 md:mt-32">
        <h1
          className="
          text-3xl sm:text-5xl 
          font-extrabold 
          text-red-500 
          mb-6    
          whitespace-nowrap
        "
        >
          404 NOT FOUND
        </h1>

        <Link href="/" passHref>
          <button
            className="
            px-6 py-3 
            text-lg font-semibold 
            text-white 
            bg-blue-600 
            rounded-lg 
            shadow-lg 
            hover:bg-blue-700 
            transition-colors
           "
          >
            Go Back Home
          </button>
        </Link>
      </div>

      <div
        className="
        w-full max-w-xs sm:max-w-sm md:max-w-md 
        
      "
      >
        <Lottie animationData={LOTTIE_URL} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default notFoundPage;
