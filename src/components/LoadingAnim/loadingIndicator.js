"use client";

import Lottie from "lottie-react";
import LOTTIE_URL from "../../../public/animations/loadingAnimation.json";


const defaultStyles = {
  width: 150,
  height: 150,
  margin: "0 auto",
};

const LoadingIndicator = ({ size = 150, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={LOTTIE_URL}
        loop={true}
        autoplay={true}
        style={{ width: size, height: size }} 
      />
    </div>
  )
};

export default LoadingIndicator;