"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Marquee from "../../components/3dMarquee/3dMarquee";
import Image from "next/image";
import Logo from "../../../public/images/ic_main.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        router.push("/login");
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
            className={`font-anime text-2xl font-bold text-center text-black`}
          >
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-800 text-black focus:bg-white/30 backdrop-blur-lg shadow-2xl"
                autoComplete="name"
              />
            </div>

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
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
            <div className="text-sm text-center text-gray-600 dark:text-gray-200">
              Already have an account?{" "}
              <Link href={"/login"} className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </Marquee>
  );
}
