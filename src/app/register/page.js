"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

import Link from "next/link";
import Marquee from "../../components/3dMarquee/3dMarquee";
import Image from "next/image";
import Logo from "../../../public/images/ic_main.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(nickname, email, password);
      router.push("/");
    } catch (err) {
      if (!err.code === "auth/email-already-in-use") {
        setError("Failed to Create Account");
      }
      setError("Email is already taken.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Marquee>
      <main className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
        <div
          className="w-full max-w-sm md:max-w-md p-8 space-y-8 
        bg-white/55 dark:bg-black/40 
        backdrop-blur-xl 
        border border-white/30 dark:border-white/10 
        rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/30 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/30 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col items-center space-y-4 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Image
                src={Logo}
                alt="onlyWeebs Logo"
                width={100}
                height={100}
                className="relative z-10 drop-shadow-md transform transition-transform group-hover:scale-105"
              />
            </div>

            <h1 className="text-center font-anime text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm tracking-wide transition-colors">
              Welcome
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium transition-colors">
              Create login credentials to access the realm
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label
                htmlFor="nickname"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 ml-1 transition-colors"
              >
                Display Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  maxLength={15}
                  placeholder="OtakuKing99"
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl 
        bg-white/50 dark:bg-black/50 
        text-gray-900 dark:text-white 
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500/50 
        focus:bg-white/80 dark:focus:bg-black/70 
        transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 ml-1 transition-colors"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="senpai@example.com"
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl 
                  bg-white/50 dark:bg-black/50 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                  focus:bg-white/80 dark:focus:bg-black/70 
                  transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 ml-1 transition-colors"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl 
                  bg-white/50 dark:bg-black/50 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                  focus:bg-white/80 dark:focus:bg-black/70 
                  transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 animate-pulse">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Processing..." : "Register"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Already have account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <div className="text-xs text-center text-gray-500 dark:text-gray-400 px-4 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Disclaimer:{" "}
              </span>
              This is a non-commercial portfolio project. No personal data is
              harvested. Created by{" "}
              <span className="font-bold text-blue-500">Gelo</span>.
            </div>
          </form>
        </div>
      </main>
    </Marquee>
  );
}
