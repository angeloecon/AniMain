"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";
import Marquee from "../../components/3dMarquee/3dMarquee";
import Logo from "../../../public/images/ic_main.png";
import Image from "next/image";

import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        console.log("Login successful:", data);

        router.push("/");
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Marquee>
      <main>
        <div className="w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-lg border border-black/20 shadow-2xl rounded-lg shadow-md">
          <div className="w-full flex justify-center">
            <Image src={Logo} alt="onlyWeebs Logo" width={100} />
          </div>
          <h1
            className={`font-anime text-2xl font-bold text-center text-gray-900`}
          >
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-800 text-black focus:bg-white/30 backdrop-blur-lg shadow-2xl"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-800 text-black focus:bg-white/30 backdrop-blur-lg shadow-2xl"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="text-sm text-center text-gray-600 dark:text-gray-200">
              Don't have an account?{" "}
              <Link
                href={"/register"}
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </main>
    </Marquee>
  );
}
