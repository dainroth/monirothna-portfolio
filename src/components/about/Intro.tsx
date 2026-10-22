"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import CanvasCursor from "@/components/ui/CanvasCursor";
import { tags } from "@/data/about";
import Polaroid from "./Polaroid";

export default function Intro() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-grid px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40"
    >
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
            About me
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <motion.li
                key={t.label}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 15 }}
                className="rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold text-ink"
                style={{ backgroundColor: t.bg }}
              >
                {t.label}
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
            Hey, I&apos;m Monirothna{" "}
            <span className="text-mute">— or just</span>{" "}
            <span data-cursor-anchor className="relative inline-block text-pop">
              Roth.
              {reduce && <PointingCursor />}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl font-display text-2xl font-bold text-navy md:text-4xl">
            A developer who codes & a designer who{" "}
            <span className="relative inline-block">
              feels.
              <svg
                aria-hidden
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-pop"
              >
                <motion.path
                  d="M2 6 Q 25 1, 50 6 T 98 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                />
              </svg>
            </span>
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Reveal delay={0.2} className="max-w-xl space-y-5 text-lg leading-relaxed text-mute">
            <p>
              I live in the space between design and engineering — the part
              where a pixel decision actually ships, and a coded interaction
              finally feels <em className="font-semibold not-italic text-ink">right</em>.
            </p>
            <p>
              In my free time, I get a kick out of editing videos — it&apos;s a
              fun way for me to express my creativity. When I&apos;m not at my
              desk, you can find me sketching or sipping on what I promise will
              be my last coffee.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="/assets/Sakhan-wb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 font-display text-base font-semibold text-cream shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-navy"
              >
                My CV <FiDownload />
              </a>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-display text-base font-semibold text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-sun"
              >
                See my work
                <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </Reveal>

          <Polaroid constraintsRef={sectionRef} />
        </div>
      </div>
    </section>
  );
}

/** Static stand-in for the roaming cursor when motion is reduced. */
function PointingCursor() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-[85%] top-[70%] z-20 hidden font-sans text-base font-normal tracking-normal md:block"
    >
      <CanvasCursor note={<span className="block whitespace-nowrap">Yep, that&apos;s me</span>} />
    </span>
  );
}
