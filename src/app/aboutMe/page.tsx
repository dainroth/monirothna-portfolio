"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "../layout/Header";
import Projects from "../roadMap/ProjectExperience";

const personalityCards = [
  {
    label: "Currently obsessing over",
    value: "Motion design & micro-interactions",
  },

  {
    label: "Always up for",
    value: "Weird side projects or just catching up over coffee",
  },
  {
    label: "My Favorite song right now",
    value: "God was showing off by Bruno Mars",
  },
  {
    label: "Editing",
    value: "Currently making a return back to editing videos for fun",
  },
  {
    label: " Favorite TV show",
    value: "Here some of favorite shows",
  },
];
const edit = [
  {
    label: "edit 1",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const AboutSection = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-[#FAFAFA] min-h-screen text-white selection:bg-blue-500/30">
      <Header />
      <section className="w-full max-w-5xl mx-auto px-6 py-28 font-comic-relief">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest uppercase text-[#9b8ea0] mb-10 font-medium"
        >
          About me
        </motion.p>

        {/* Main split */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-center mb-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-65 w-full mx-auto md:mx-0"
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-3/4 bg-[#e8e0d8]">
              <Image
                src="/assets/me-3.jpg"
                alt="A photo of me"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#c97b3a]/10 mix-blend-multiply" />
            </div>

            {/*  available badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/5 flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Open to work
              </span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.6rem] leading-[1.22] font-semibold text-[#1a1410] tracking-tight"
            >
              Hey, I&apos;m{" "}
              <span className="italic font-normal text-[#1a2b56]">
                Monirothna
              </span>{" "}
              or <span className="italic font-normal text-[#1a2b56]">roth</span>
              <br />A designer who codes
              <br />& a developer who{" "}
              <span className="relative inline-block">
                feels.
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path
                    d="M0,4 Q25,0 50,4 Q75,8 100,4"
                    stroke="#c97b3a"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[1.05rem] text-[#5a5047] leading-[1.8]"
            >
              I live in the space between design and engineering — the part
              where a pixel decision actually ships, and a coded interaction
              finally feels{" "}
              <em className="text-[#1a1410] not-italic font-medium">right</em>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.22,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[1.05rem] text-[#5a5047] leading-[1.8]"
            >
              In my free time, I get a kick out of editing videos—it&apos;s a
              fun way for me to express my creativity and enjoy a break from
              coding. When I&apos;m not at my desk, you can usually find me
              sketching or sipping on what I promise will be my last coffee
              (let&apos;s hope it doesn&apos;t keep me up all night!).
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 pt-2"
            >
              <Link
                href="/assets/Sakhan-wb.pdf"
                className="bg-[#1a1410] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#2e2520] transition-colors duration-200"
              >
                My CV →
              </Link>
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  projectsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#5a5047] underline underline-offset-4 decoration-[#1a2b56]/50 hover:text-[#1a1410] transition-colors duration-200"
              >
                See My work
              </Link>
            </motion.div>
          </div>
        </div>

        {/*  detail cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-black/8 pt-12"
        >
          <p className="text-s uppercase tracking-widest text-mauve-700 mb-6 font-medium">
            * A few things about me
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {personalityCards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i}
                // variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group border border-black/8 rounded-2xl px-5 py-4 hover:border-[#1a2b56]/40 hover:bg-[#d2dde4] transition-all duration-200 cursor-default"
              >
                <p className="text-[11px] text-[#2a6d96] uppercase tracking-wider mb-1.5 font-medium">
                  {card.label}
                </p>
                <p className="text-sm font-medium text-[#1a1410] leading-snug">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div id="projects" ref={projectsRef}>
          <Projects />
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
