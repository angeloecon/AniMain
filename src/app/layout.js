import { FirebaseAuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/context/themeContext";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Layout/NavBar";
import Footer from "@/components/Layout/Footer";
import localFont from "next/font/local";

import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const animeFonts = localFont({
  src: "./fonts/animeace2_reg.ttf",
  variable: "--font-anime",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "AniMain",
    template: "%s | AniMain"
  },
  description:`Your ultimate destination for discovering, tracking, and managing
              your favorite anime series. Join our community of anime
              enthusiasts today.`,
  icons: {
    icon: '/favicon.ico',
    shorcut: '/icons/android-chrome-192x192.png',
    apple: '/icons/apple-touch-icon.png',
    other: {
      rel: 'manifest',
      url: '/icons/site.webmanifest'
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AniMain"
  },
  verification: {
    google: "Lmvb8ETr9LWp9lR2uwVgPaDdlor1SBGE_l-tp4o3dNk"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${animeFonts.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FirebaseAuthProvider>
            <Suspense fallback={null}>
            <Navbar />
            </Suspense>
            {children}
            <Footer />
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
