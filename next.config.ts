import createBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The about page used to live at /aboutMe; keep old shared links working.
    return [{ source: "/aboutMe", destination: "/about", permanent: true }];
  },
  experimental: {
    optimizeCss: true,
  },
};

export default withBundleAnalyzer(nextConfig);
