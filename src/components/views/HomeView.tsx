"use client";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Stack from "@/components/sections/Stack";
import ExperienceRoadmap from "@/components/sections/WorkExperience";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";

export default function HomeView() {
  return (
    <SmoothScroll>
      <div className="bg-[#FAFAFA] min-h-[200vh] text-white selection:bg-blue-500/30">
        {/* <MobileIntroOverlay /> */}
        <Header />

        {/* Added IDs to match your navigation */}
        <div id="home">
          <Hero />
        </div>

        <section>
          <About />
        </section>

        <Stack />

        <section id="experience">
          <ExperienceRoadmap />
          <Projects />
        </section>

        <section id="contact">
          <Footer />
        </section>
      </div>
    </SmoothScroll>
  );
}
