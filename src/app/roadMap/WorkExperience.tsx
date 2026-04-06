"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    date: "Jan 2026 - Present",
    title: "Junior Developer",
    company: "Nano Sound Co. Ltd",
    description:
      "Junior Developer capable in React, Next.js, and TypeScript. I build state-aware UI features and integrate data using Apollo GraphQL.",
    color: "#1a2b56",
    stack: ["React", "Next.js", "GraphQL", "Apollo", "Tailwind"],
  },
  {
    date: "Sep 2025 - Dec 2025",
    title: "Junior Front-End Developer",
    company: "Bong IT Solutions",
    description:
      "Engineered internal applications using React, Next.js, and TypeScript, focusing on seamless data integration.",
    color: "#1a2b56",
    stack: ["React", "Next.js", "Tailwind"],
  },
];
const ExperienceRoadmap = () => {
  return (
    <section className="py-12 bg-[#FCF9F3] relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-comic-relief text-4xl md:text-5xl text-[#1a2b56] mb-2">
            Work Experience
          </h2>
          <div className="h-1 w-16 bg-[#1a2b56] mx-auto rounded-full" />
        </div>

        {/*time-line */}
        <div className="relative border-l-[3px] border-[#2D2D2D]/10 ml-6 md:ml-12">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 pl-10"
            >
              {/*the dot */}
              <div className="absolute top-4 -left-3 w-6 h-6 rounded-full bg-[#1a2b56] border-2 border-white shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] z-10" />

              {/*card */}
              <div className="bg-white p-5 md:p-6 rounded-[20px] border-2 border-[#2D2D2D] shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <span
                    className="font-mono text-[12px] font-semibold px-2.5 py-1 rounded-full border border-[#2D2D2D] uppercase tracking-wider"
                    style={{
                      backgroundColor: item.color,
                      color: "#FCF9F3",
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                <div className="space-y-0.5 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-[#2D2D2D] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-semibold font-comic-relief text-[#1a2b56] text-base">
                    {item.company}
                  </p>
                  <p className="text-gray-500 font-comic-relief leading-snug text-sm pt-1">
                    {item.description}
                  </p>
                </div>

                {/*stack */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#2D2D2D]/5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-bold uppercase border border-[#2D2D2D] text-[#2D2D2D] rounded bg-[#FCF9F3]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceRoadmap;
