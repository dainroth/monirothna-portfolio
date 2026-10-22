"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/sections/ProjectCard";

// Filter by the first part of each label, e.g. "Web app · In progress" -> "Web app".
const category = (label: string) => label.split(" · ")[0];
const filters = ["All", ...new Set(projects.map((p) => category(p.label)))];

/** /work: every project, filterable by type. */
export default function WorkView() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => category(p.label) === filter);

  return (
    <SmoothScroll>
      <div className="min-h-svh bg-cream text-ink selection:bg-pop/30">
        <Header />

        <main className="bg-grid px-4 pb-24 pt-32 sm:px-6 md:pb-32 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
                  Work · {projects.length} projects
                </p>
                <h1 className="mt-3 font-display text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
                  Everything
                  <br />
                  I&apos;ve built
                </h1>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-mute">
                Web apps, design work, school projects and the odd game. Pick one
                to see how it came together.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-2">
              {filters.map((f) => {
                const count = f === "All" ? projects.length : projects.filter((p) => category(p.label) === f).length;
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`rounded-full border-2 border-ink px-4 py-1.5 font-display text-sm font-semibold transition-all ${
                      active ? "bg-ink text-cream shadow-none" : "bg-cream text-ink shadow-brutal hover:-translate-y-0.5"
                    }`}
                  >
                    {f}
                    <span className={`ml-1.5 font-mono text-xs ${active ? "text-cream/60" : "text-mute"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </Reveal>

            <motion.div layout className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {shown.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: (i % 2) * 0.08 }}
                  >
                    <ProjectCard project={project} index={i} total={shown.length} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
