"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    date: "May 2026 — Present",
    title: "Internship Developer",
    company: "Floresta",
    description:
      "As an Internship Developer, I contribute to building a user-friendly web application using React Router.",
  },
  {
    date: "Jan 2026 — Apr 2026",
    title: "Junior Developer",
    company: "Nano Sound Co. Ltd",
    description:
      "Worked as a Junior Developer, building state-aware UI features and integrating data using Apollo GraphQL with React, Next.js, and TypeScript.",
  },
  {
    date: "Sep 2025 — Dec 2025",
    title: "Freelance Front-end Developer",
    company: "Bong IT Solutions",
    description:
      "Started as a freelance front-end developer, building internal applications using React, Next.js, and TypeScript.",
  },
  {
    date: "2024 - 2025 ",
    title: "Upskilling Project",
    company: "Tux Global Institute ",
    description:
      "Completed a data science and machine learning course, gaining proficiency in Python, data analysis, and machine learning algorithms.",
  },
  {
    date: "2023 ",
    title: "Started University",
    company: "Setec Institute",
    description:
      "Start my journey in software development, learning the fundamentals of programming and web technologies. ",
  },
];

const WorkFlow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={ref}
      className="py-24 px-6 max-w-4xl mx-auto font-comic-relief"
    >
      <h2 className="text-4xl text-[#1a2b56] mb-16 text-center italic">
        My Journey
      </h2>

      <div className="relative">
        {/* The Animated Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full bg-[#C4763A] origin-top"
        />

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* The Dot on the line */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#1a2b56] rounded-full -translate-x-1.25 md:-translate-x-1.5 mt-1.5 shadow-[0_0_0_4px_white]" />

              {/* Content Card */}
              <div className="md:w-1/2 pl-10 md:pl-0">
                <div
                  className={`${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-right"}`}
                >
                  <span className="text-sm font-mono text-[#C4763A] uppercase tracking-widest">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl text-[#1a1410] font-semibold mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-[#1a2b56]/60 text-sm mb-4">
                    {exp.company}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
