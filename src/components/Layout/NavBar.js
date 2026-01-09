"use client";
import { SunIcon , MoonIcon, SearchIcon, DashboardIcon, CloseIcon, HamburgerIcon} from "../Icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

import darkLogoName from "../../../public/images/logo_dark.png";
import logoName from "../../../public/images/logo_light.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme()
  const { user, signout } = useAuth();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (!searchQuery.trim()) return
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    
  };

  const handleLogout = () => {
    signout();
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex justify-center items-center w-36 h-18d">
                <Image
                  src={theme === 'dark' ? (darkLogoName) : (logoName)}
                  alt="Animain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <form
              onSubmit={handleSearch}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-gray-700 dark:text-gray-200 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SearchIcon/>
              </button>
            </form>

            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
                >
                  <DashboardIcon/>
                </Link>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  prefetch={false}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  prefetch={false}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <SunIcon/>
              ) : (
                <MoonIcon/>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <HamburgerIcon/>
              ) : (
                <CloseIcon/>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 pt-2 pb-3 space-y-1 shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" text-gray-700 dark:text-gray-200 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <SearchIcon/>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <SunIcon/>
              ) : (
                <MoonIcon/>
              )}
            </button>
          </form>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                Signed in as: {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                href="/register"
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar