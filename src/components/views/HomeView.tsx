"use client";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Stack from "@/components/sections/Stack";
import Footer from "@/components/layout/Footer";

export default function HomeView() {
  return (
    <SmoothScroll>
      <div className="min-h-svh bg-cream text-ink selection:bg-pop/30">
        <Header />

        <div id="home">
          <Hero />
        </div>

        <SelectedWork />

        <Stack />

        <section id="contact">
          <Footer />
        </section>
      </div>
    </SmoothScroll>
  );
}
