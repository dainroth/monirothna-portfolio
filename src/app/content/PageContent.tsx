"use client";

import SmoothScroll from "@/src/components/SmoothScroll";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Stack from "../roadMap/StackSection";
import ExperienceRoadmap from "../roadMap/WorkExperience";
import MobileIntroOverlay from "../showIntro/IntroOverlay";
import Projects from "../roadMap/ProjectExperience";
import About from "../aboutMe/AboutMe";

export default function PageContent() {
  return (
    <SmoothScroll>
      <div className="bg-[#FAFAFA] min-h-[200vh] text-white selection:bg-blue-500/30">
        <MobileIntroOverlay />
        <Header />
        <Hero />
        <About />
        <Stack />
        <ExperienceRoadmap />
        <Projects />
      </div>
    </SmoothScroll>
  );
}
