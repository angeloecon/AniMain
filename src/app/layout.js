import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/authcontext";
import Navbar from "./components/NavBar/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Watchlist",
  description: "Track and manage your favorite anime series with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          </AuthProvider>
      </body>
    </html>
  );
}

