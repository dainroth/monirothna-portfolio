"use client";

import SmoothScroll from "@/src/components/SmoothScroll";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Stack from "../roadMap/StackSection";
import ExperienceRoadmap from "../roadMap/WorkExperience";
import Projects from "../roadMap/ProjectExperience";
import About from "../aboutMe/AboutMe";
import Footer from "../layout/Footer";

export default function PageContent() {
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
