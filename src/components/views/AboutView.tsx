"use client";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExperienceCanvas from "@/components/sections/ExperienceCanvas";
import Intro from "@/components/about/Intro";
import Stats from "@/components/about/Stats";
import ThingsAboutMe from "@/components/about/ThingsAboutMe";
import RoamingCursor from "@/components/about/RoamingCursor";

export default function AboutView() {
  return (
    <SmoothScroll>
      <div className="min-h-svh bg-cream text-ink selection:bg-pop/30">
        <Header />

        {/* data-cursor-note sets what the roaming cursor says over each section */}
        <div data-cursor-note="Yep, that's me">
          <Intro />
        </div>
        <div data-cursor-note="Some fun numbers">
          <Stats />
        </div>
        <div data-cursor-note="Where I've been">
          <ExperienceCanvas />
        </div>
        <div data-cursor-note="Wait… where am I?">
          <ThingsAboutMe />
        </div>
        <div data-cursor-note="Come say hi!">
          <Footer />
        </div>

        <RoamingCursor />
      </div>
    </SmoothScroll>
  );
}
