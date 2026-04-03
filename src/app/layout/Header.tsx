"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowBigUpDashIcon } from "lucide-react";
import Navbar from "./Navigation";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
    setShowBackToTop(latest > 400);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        // CHANGE: Added 'flex justify-center' and 'p-4' (the floating gap)
        // REMOVED: 'w-full' and 'border-b-4'
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none"
      >
        <Navbar />
      </motion.header>

      {/* Back to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showBackToTop ? 1 : 0,
          opacity: showBackToTop ? 1 : 0,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#1a2b56] border-4 border-[#2D2D2D] rounded-full shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] flex items-center justify-center text-white text-xl md:text-2xl hover:translate-y-1 active:translate-y-0 transition-transform"
      >
        <ArrowBigUpDashIcon />
      </motion.button>
    </>
  );
}
