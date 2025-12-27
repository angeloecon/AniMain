"use client";
import SafeIcon from "../UI/SafeIcon";
import { useState } from "react";

const ExternalLinkButton = ({ url, color, icon, site }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="items-center rounded-lg border-1 border-transparent dark:border-gray-500 hover:-translate-y-1  transition-all duration-300"
      style={{
        backgroundColor: color ? color : `#2563EB`,
        boxShadow: hovered ? `0 10px 15px -3px ${color || "#2563EB"}99` : "",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={url} target="_blank">
        <SafeIcon
          link={icon}
          alt={site}
          h={20}
          w={20}
          className={"w-10 h-10 p-1  "}
        />
      </a>
    </div>
  );
};

export default ExternalLinkButton;
