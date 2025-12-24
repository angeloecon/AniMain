"use client";

import Link from "next/link";
import Image from "next/image";
import logoName from "../../../public/images/logo_light.png";
import darkLogoName from "../../../public/images/logo_dark.png";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";

export default function Footer() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
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

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`${
                    !user && "cursor-not-allowed pointer-events-none opacity-50"
                  } text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/browse/top"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Top Anime
                </Link>
              </li>
              <li>
                <Link
                  href="/browse/seasonal"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Seasonal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} AniMain. All rights reserved. Data
            provided by{" "}
            <a
              href="https://anilist.co"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
            >
              Anilist GraphQL API
            </a>
            .
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
