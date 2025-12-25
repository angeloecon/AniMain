import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/themeContext";
import { FirebaseAuthProvider } from "@/context/authContext";
import Navbar from "@/components/Layout/NavBar";
import Footer from "@/components/Layout/Footer";
import localFont from "next/font/local";
import "./globals.css";


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
  title: "Anime Watchlist",
  description: "Track and manage your favorite anime series with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${animeFonts.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FirebaseAuthProvider>
            <Navbar />
            {children}
            <Footer />
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
