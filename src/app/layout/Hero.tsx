/* eslint-disable @next/next/no-img-element */
"use client";
import RotatingText from "@/src/components/RotatingText";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSpinner = () => {
    const element = document.getElementById("spinner");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* FLOATING CARDS: Repositioned to hug the text more closely */}
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

      {/* Main Text Content */}
      <div className="text-center z-10 max-w-4xl px-4 flex flex-col items-center">
        <motion.h1
          className="font-comic-relief text-5xl sm:text-[75px] md:text-[95px] lg:text-[100px] leading-[1.1] sm:leading-[0.8] text-[#1a2b56] mb-4 flex flex-col items-center text-center px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block">Developer &</span>

          {/* The 'h-[1.2em]' is relative to the font size, 
    so it scales automatically from mobile to desktop.
  */}
          <div className="relative flex items-center justify-center overflow-hidden h-[1.5em] py-1 w-full">
            <RotatingText
              texts={["Designer", "Editor"]}
              staggerFrom={"last"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              staggerDuration={0.035}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 300,
              }}
              rotationInterval={2500}
            />
          </div>
        </motion.h1>

        {/* Reduced mb-10 to mb-6 to bring the button closer */}
        <motion.p className="text-gray-600 font-mono text-base mb-6 max-w-md">
          A fun and simple decision maker to playfully navigate life&apos;s
          choices.
        </motion.p>

        <motion.button
          onClick={scrollToSpinner}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#091f5b] font-comic-relief text-white px-8 py-3 rounded-full font-medium text-xl flex items-center gap-3 shadow-xl cursor-pointer"
        >
          Let&apos;s Go!
        </motion.button>
      </div>

      {/* scroll indicator */}
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
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-gray-300 to-transparent" />
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
      // Removed: shadow-2xl, rounded-[24px], aspect-3/4, overflow-hidden
      className={`absolute ${sizeClasses[size]} pointer-events-none z-0 ${className}`}
    >
      <img
        src={img}
        className="w-full h-auto object-contain drop-shadow-md" // Added drop-shadow for subtle depth
        alt="Floating decoration"
      />
    </motion.div>
  );
}
