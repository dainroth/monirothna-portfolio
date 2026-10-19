"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Folder from "@/components/ui/Folder";
import Link from "next/link";

type FolderKey = "webapps" | "uidesign" | "school";

const folders: {
  key: FolderKey;
  label: string;
  color: string;
  items: number[];
}[] = [
  {
    key: "webapps",
    label: "Web Application",
    color: "#648dca",
    items: [1, 2, 3],
  },
  {
    key: "uidesign",
    label: "UI / Design",
    color: "#1a2b56",
    items: [1, 2],
  },
  {
    key: "school",
    label: "School Projects",
    color: "#edf1f6",
    items: [1, 2],
  },
];

interface ProjectCardProps {
  name: string;
  desc: string;
  tags: string[];
  category: string;
  link: string;
}

const projects: Record<
  FolderKey,
  { name: string; desc: string; tags: string[]; link: string }[]
> = {
  webapps: [
    {
      name: "Ey Kor Ban Project (In Progress)",
      desc: "A Full Stack Web Application for fun decision making.",
      link: "https://eykorban.vercel.app/",
      tags: ["Next.js", "TypeScript", "Node.js"],
    },
    {
      name: "NTX (Private)",
      desc: "E-commerce admin dashboard for managing products, orders, and users.",
      link: "",
      tags: ["TypeScript", "Tailwind", "Next.js", "GraphQL"],
    },
    {
      name: "Sakhan Monirothna Portfolio",
      desc: "Personal portfolio website showcasing projects, skills, and contact info.",
      link: "https://sakhanmonirothna.vercel.app/",
      tags: ["Next.js", "Tailwind", "Framer Motion", "TypeScript", "Figma"],
    },
  ],
  uidesign: [
    {
      name: "The KOI ",
      desc: "Research and Redesign the user experience of the KOI.",
      link: "https://www.figma.com/design/9IXfoziQVTHEVGKxXmKX5s/KOI-Final?node-id=0-1&t=HQRy67vvMuzi5yBv-1",
      tags: ["Figma", "Adobe Illustrator"],
    },
    {
      name: "Motion Playground",
      desc: "Experiments with Framer Motion — page transitions, scroll effects, micro-interactions.",
      link: "",
      tags: ["Framer Motion", "React"],
    },
  ],
  school: [
    {
      name: "Coffee Shop Management System (In progress)",
      desc: "A full-stack application for managing orders, inventory, and staff scheduling at a local coffee shop.",
      link: "",
      tags: ["REST", "PostgreSQL", "Next.js"],
    },
    {
      name: "Data Visualizer",
      desc: "Final year capstone — interactive data visualization tool for CSV datasets.",
      link: "",
      tags: ["D3.js", "TypeScript", "PowerBI"],
    },
  ],
};
function ProjectCard({ name, desc, tags, category, link }: ProjectCardProps) {
  const isClickable = link !== "";

  return (
    <motion.div
      whileHover={isClickable ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`bg-white border border-[#e0dbd3]/80 rounded-2xl p-6 shadow-sm transition-all duration-300 group h-full flex flex-col ${
        isClickable
          ? "hover:shadow-xl hover:border-[#C4763A]/30 cursor-pointer"
          : "cursor-default"
      }`}
    >
      <Link
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={!isClickable ? "pointer-events-none" : ""}
        onClick={(e) => !isClickable && e.preventDefault()}
      >
        <div className="flex justify-between items-start mb-4">
          <span className="font-comic-relief text-[9px] tracking-[0.2em] uppercase text-[#1a2b56] bg-[#8fb3e2]/10 px-2 py-1 rounded">
            {category}
          </span>
          {isClickable && (
            <svg
              className="w-4 h-4 text-[#1a2b56] opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </div>
        <h3 className="font-comic-relief text-[#1a2b56] text-lg mb-2 group-hover:text-[#4464a8] transition-colors">
          {name}
        </h3>
        <p className="font-comic-relief text-[13px] text-[#666] leading-relaxed mb-6 grow">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f0ede8]">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wide uppercase text-mauve-600 bg-[#F7F5F0] px-2.5 py-1 rounded-md border border-[#e0dbd3]/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
export default function Projects() {
  const [open, setOpen] = useState<FolderKey | null>(null);

  const toggle = (key: FolderKey) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <section className="bg-[#FAFAFA] py-28 px-6 min-h-screen selection:bg-[#C4763A]/20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-comic-relief text-[#1a2b56] tracking-tight mb-6">
              My <span className="italic font-comic-relief">Projects</span>
            </h2>
            <div className="w-12 h-px bg-[#C4763A] mx-auto opacity-40" />
          </motion.div>
        </header>

        {/* Folders Row - Interactive Navigation */}
        <div className="flex justify-center gap-12 md:gap-20 flex-wrap mb-28">
          {folders.map((f) => (
            <motion.div
              key={f.key}
              layout
              className="flex flex-col items-center gap-5 cursor-pointer group relative"
              onClick={() => toggle(f.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Folder
                  color={open === f.key ? f.color : "#d1ccc0"}
                  size={1.1}
                  items={f.items.map(String)}
                  className={`transition-all duration-500 ${
                    open === f.key
                      ? "drop-shadow-2xl"
                      : "grayscale-[0.4] group-hover:grayscale-0"
                  }`}
                />

                {/* Visual Glow Indicator */}
                <AnimatePresence>
                  {open === f.key && (
                    <motion.div
                      layoutId="folderGlow"
                      className="absolute inset-0 bg-current rounded-full blur-3xl opacity-10 -z-10"
                      style={{ color: f.color }}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span
                  className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-all duration-300 ${
                    open === f.key
                      ? "text-[#1a2b56] font-bold"
                      : "text-[#aaa] group-hover:text-[#666]"
                  }`}
                >
                  {f.label}
                </span>
                <span className="text-[10px] font-mono text-[#ccc] group-hover:text-[#bbb] transition-colors">
                  / 0{projects[f.key].length}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Display Area */}
        <div className="max-w-5xl mx-auto min-h-50">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key={open}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects[open].map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: i * 0.08,
                      }}
                    >
                      <ProjectCard
                        name={p.name}
                        desc={p.desc}
                        tags={p.tags}
                        link={p.link}
                        category={
                          folders.find((f) => f.key === open)?.label ?? ""
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-start rounded-xl border border-dashed border-[#e0dbd3]/60 bg-white/60 backdrop-blur-sm py-8 px-4 min-h-30"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="w-7 h-7 mb-2 opacity-15"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-[0.2em] mt-1">
                  Exploration Awaits
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
