import type { Metadata } from "next";
import {
  Comic_Relief,
  Gamja_Flower,
  Geist,
  Geist_Mono,
  Indie_Flower,
  Inter,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicRelief = Comic_Relief({
  variable: "--font-comic-relief",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sakhan Monirothna",
  description: "Interactive portfolio",
  icons: {
    icon: "/assets/logo (2).png", // Point this to a file in your 'public' folder
    shortcut: "/assets/logo (2).png",
    apple: "/assets/logo (2).png", // Optional: For iOS home screen bookmarks
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${comicRelief.variable} ${inter.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
