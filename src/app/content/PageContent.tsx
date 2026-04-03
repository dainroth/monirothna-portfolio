"use client";

import SmoothScroll from "@/src/components/SmoothScroll";
import Header from "../layout/Header";
import Hero from "../layout/Hero";

export default function PageContent() {
  return (
    <SmoothScroll>
      <div className="bg-[#FAFAFA] min-h-[200vh] text-white selection:bg-blue-500/30">
        <Header />
        <Hero />
      </div>
    </SmoothScroll>
  );
}
