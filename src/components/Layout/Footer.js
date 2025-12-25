"use client";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";

import Link from "next/link";
import Image from "next/image";
import logoName from "../../../public/images/logo_light.png";
import darkLogoName from "../../../public/images/logo_dark.png";

// Final

const footerNavigation = [
  {
    title: "Navigation",
    links: [
      {
        name : "Home", 
        href: "/"
      }, {
        name: "Dashboard",
        href: "/dashboard"
      }, {
        name: "Popular",
        href: "/browse/score"
      }, {
        name: "Trending",
        href: "/browse/trending"
      }, {
        name: "Upcoming",
        href: "/browse/upcoming"
      }
    ]
  }, {
    title: "Connect",
    links: [
      {
        name: "Github", 
        href: "#"
      }, {
        name: "Discord", 
        href: "#"
      },{
        name: "Twitter", 
        href: "#"
      }
    ]
  }
]

const Footer = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <div className="w-26 ">
                <Image
                  src={theme === "dark" ? darkLogoName : logoName}
                  alt="aniMain Logo"
                  className="object-contain block"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Your ultimate destination for discovering, tracking, and managing
              your favorite anime series. Join our community of anime
              enthusiasts today.
            </p>
          </div>

            {footerNavigation.map((section) => (
              <div key={section.title}>

                <h3  className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((item)=> (
                    <li key={item.name}>

                      <Link
                        href={`${item.href}`}
                        className={`text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors 
                          ${item.name == 'Dashboard' &&  !user && "cursor-not-allowed pointer-events-none opacity-50"}`}
                      >
                        {item.name}
                      </Link>
                      
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className=" text-gray-900 dark:text-gray-100">Gelo Econ</span>. All rights reserved. Data
            provided by{" "}
            <a
              href="https://anilist.co"
              className="underline text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
            >
              Anilist GraphQL API
            </a>
            .
          </p>

            {/* For Display Purposes */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-not-allowed pointer-events-none opacity-50"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-not-allowed pointer-events-none opacity-50"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer