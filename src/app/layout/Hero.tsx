/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSpinner = () => {
    const element = document.getElementById("spinner");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden pb-10">
      <FloatingCard
        img="https://i.pinimg.com/736x/a0/44/70/a044704b725888b51b1eb5a978bf0d77.jpg"
        className="top-12 left-4 rounded-2xl md:top-24 md:left-[18%] rotate-[-10deg]"
        delay={0.2}
      />
      <FloatingCard
        img="/assets/macro.png"
        className="top-6 right-4 md:top-36 md:right-[15%] rotate-12"
        size="sm"
        delay={0.4}
      />
      <FloatingCard
        img="/assets/!-icon.png"
        className="hidden md:block bottom-24 md:left-[28%] rotate-[5deg]"
        size="sm"
        delay={0.6}
      />
      <FloatingCard
        img="/assets/tablet.png"
        className="bottom-32 right-4 md:bottom-40 md:right-[22%] rotate-[-8deg]"
        size="md"
        delay={0.8}
      />

      {/* Main content */}
      <div className="text-center z-10 max-w-3xl px-4 flex flex-col items-center">
        <motion.p
          className="font-mono text-xs tracking-[0.2em] text-[#aaa9a5] uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Based in Cambodia
        </motion.p>

        <motion.h1
          className="font-comic-relief text-5xl sm:text-[70px] md:text-[88px] lg:text-[96px] leading-[1.05] text-[#1a2b56] mb-6 tracking-tight"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Developer
          <br />
          <span className="text-[#C4763A]">&</span> Designer
        </motion.h1>

        <motion.p
          className="text-[#888885] text-base leading-relaxed max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          University student specializing in building performant, well-crafted
          web applications.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#5AB870] inline-block" />
          <span className="text-xs font-mono text-[#aaa9a5] tracking-widest uppercase">
            Open to work
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={scrollToSpinner}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#bbb]">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-[#ccc] to-transparent" />
      </motion.div>
    </section>
  );
}

function FloatingCard({
  img,
  className,
  delay,
  size = "md",
}: {
  img: string;
  className: string;
  delay: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-14 sm:w-20 md:w-28",
    md: "w-20 sm:w-28 md:w-40",
    lg: "w-24 sm:w-36 md:w-48",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 1 },
        y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay },
      }}
      className={`absolute ${sizeClasses[size]} pointer-events-none z-0 ${className}`}
    >
      <img
        src={img}
        className="w-full h-auto object-contain"
        style={{ filter: "saturate(0.85) sepia(0.08)" }}
        alt="Floating decoration"
      />
    </motion.div>
  );
}
