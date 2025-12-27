"use client";
import Image from "next/image";
import { useState } from "react";

const SafeIcon = ({ link, alt, h, w, className }) => {
  const [isBroken, setIsBroken] = useState(false);
  const fallBack = !link || isBroken;

  if (fallBack) {
    return (
      <div className={`${className} `}>
        <div className="w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={link}
      alt={alt}
      height={h}
      width={w}
      className={`object-contain ${className}`}
      onError={() => setIsBroken(true)}
    />
  );
};

export default SafeIcon;
