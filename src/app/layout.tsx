import type { Metadata } from "next";
import { Comic_Relief, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const comicRelief = Comic_Relief({
  variable: "--font-comic-relief",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
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
    <html lang="en" className={`${comicRelief.variable} ${geistSans.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/keyboard.webp"
          type="image/webp"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
