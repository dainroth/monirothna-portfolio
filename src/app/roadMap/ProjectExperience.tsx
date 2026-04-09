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

function ProjectCard({
  name,
  desc,
  tags,
  category,
}: {
  name: string;
  desc: string;
  tags: string[];
  category: string;
}) {
  return (
    <div className="bg-white border border-[#e0dbd3]/60 rounded-2xl p-5 hover:border-[#C4763A] transition-colors duration-150">
      <p className="font-mono text-[9px] tracking-widest uppercase text-[#C4763A] mb-2.5">
        {category}
      </p>
      <p className="font-medium text-[#1c1c1a] text-[15px] mb-1.5">{name}</p>
      <p className="text-[12px] text-[#999] leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-wide uppercase border border-[#e0dbd3] text-[#aaa] px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<FolderKey | null>(null);

  const toggle = (key: FolderKey) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <section className="bg-[#FAFAFA] py-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-medium text-[#1a2b56] mb-4">
            My <span className="italic font-light">Work</span>
          </h2>
          <div className="w-8 h-px bg-[#1a2b56]/20 mx-auto" />
        </div>

        {/* Folders Row */}
        <div className="flex justify-center gap-16 flex-wrap mb-20">
          {folders.map((f) => (
            <div
              key={f.key}
              className="flex flex-col items-center gap-4 cursor-pointer group"
              onClick={() => toggle(f.key)}
            >
              <div className="relative">
                <Folder
                  color={open === f.key ? f.color : "#d1ccc0"}
                  size={1}
                  items={f.items.map(String)}
                  className={`transition-all duration-300 transform ${
                    open === f.key ? "scale-110" : "group-hover:translate-y-1"
                  }`}
                />
                {/* Active Indicator Dot */}
                {open === f.key && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4763A]"
                  />
                )}
              </div>

              <div className="text-center">
                <span
                  className={`block font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    open === f.key
                      ? "text-[#1a2b56]"
                      : "text-[#aaa] group-hover:text-[#888]"
                  }`}
                >
                  {f.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Display Area */}
        <div className="max-w-4xl mx-auto min-h-100">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key={open}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects[open].map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }} // Staggered effect
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
                className="flex flex-col items-center justify-center h-64 rounded-3xl"
              >
                <p className="font-mono text-[11px] text-[#bbb] uppercase tracking-widest">
                  Select a category to view projects
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
