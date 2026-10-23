import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Comic_Relief,
  Geist,
  Geist_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";
import { siteDescription, siteName, siteUrl } from "@/data/site";

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
  // Only the About page polaroid uses it, so don't make every page download it first.
  preload: false,
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Developer & Designer`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comicRelief.variable} ${geistSans.variable} ${bricolage.variable}`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <PageTransition />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
