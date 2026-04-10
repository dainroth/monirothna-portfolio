"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Folder from "@/src/components/Folder";

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
    color: "#C4763A",
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
    color: "#5227FF",
    items: [1, 2],
  },
];

interface ProjectCardProps {
  name: string;
  desc: string;
  tags: string[];
  category: string;
}

const projects: Record<
  FolderKey,
  { name: string; desc: string; tags: string[] }[]
> = {
  webapps: [
    {
      name: "Ey Kor Ban Project (In Progress)",
      desc: "A Full Stack Web Application for fun decision making.",
      tags: ["Next.js", "TypeScript", "Node.js"],
    },
    // {
    //   name: "Project Beta",
    //   desc: "E-commerce storefront with cart, checkout flow, and Stripe payment integration.",
    //   tags: ["React", "Tailwind", "Stripe"],
    // },
    // {
    //   name: "Project Gamma",
    //   desc: "Dashboard for tracking analytics with charts, filters, and exportable reports.",
    //   tags: ["Next.js", "GraphQL", "Apollo"],
    // },
  ],
  uidesign: [
    {
      name: "The KOI ",
      desc: "Research and Redesign the user experience of the KOI.",
      tags: ["Figma", "Adobe Illustrator"],
    },
    {
      name: "Motion Playground",
      desc: "Experiments with Framer Motion — page transitions, scroll effects, micro-interactions.",
      tags: ["Framer Motion", "React"],
    },
  ],
  school: [
    {
      name: "Student Portal",
      desc: "University class project — schedule management and grade tracking portal.",
      tags: ["React", "Firebase"],
    },
    {
      name: "Data Visualizer",
      desc: "Final year capstone — interactive data visualization tool for CSV datasets.",
      tags: ["D3.js", "TypeScript"],
    },
  ],
};

function ProjectCard({ name, desc, tags, category }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white border border-[#e0dbd3]/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#C4763A]/30 transition-all duration-300 group h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C4763A] bg-[#C4763A]/5 px-2 py-1 rounded">
          {category}
        </span>
      </div>

      <h3 className="font-medium text-[#1a2b56] text-lg mb-2 group-hover:text-[#C4763A] transition-colors">
        {name}
      </h3>

      <p className="text-[13px] text-[#666] leading-relaxed mb-6 grow">
        {desc}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f0ede8]">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-wide uppercase text-[#999] bg-[#F7F5F0] px-2.5 py-1 rounded-md border border-[#e0dbd3]/50"
          >
            {tag}
          </span>
        ))}
      </div>
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
            <h2 className="text-5xl font-light text-[#1a2b56] tracking-tight mb-6">
              My <span className="italic font-serif">Projects</span>
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
        <div className="max-w-5xl mx-auto min-h-[200px]">
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
                className="flex flex-col items-center justify-center h-80 rounded-[2rem] border-2 border-dashed border-[#e0dbd3]/50 bg-white/30 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-10 h-10 mb-6 opacity-20"
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
                <p className="font-mono text-[11px] text-[#999] uppercase tracking-[0.3em]">
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
