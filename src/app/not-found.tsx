"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCF9F3] flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* MASSIVE BACKGROUND TEXT: Using your brand color with low opacity */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.05, y: 0 }}
        className="absolute font-mono text-[20rem] md:text-[40rem] text-[#1a2b56] select-none pointer-events-none z-0"
      >
        404
      </motion.h1>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* PLAYFUL ELEMENT: A floating "lost" badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 px-4 py-1 rounded-full border-2 border-[#1a2b56] bg-white shadow-[4px_4px_0px_0px_rgba(26,43,86,1)]"
        >
          <span className="font-mono text-xs font-bold text-[#1a2b56] uppercase tracking-tighter">
            Error: Way off track
          </span>
        </motion.div>

        <h2 className=" text-5xl font-gamja-flower md:text-7xl text-[#1a2b56] mb-4">
          Whoops! You &apos;re lost.
        </h2>

        <p className="text-gray-500 font-gamja-flower max-w-md mb-10 text-xl leading-relaxed">
          The page you&apos;re looking for has wandered off into the digital
          void. Let&apos;s get you back to the studio.
        </p>

        {/* PRIMARY ACTION: Matching your "Let's Go!" button style */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.8 }}
            className="px-10 py-4 bg-[#1a2b56] text-[#FCF9F3] rounded-full font-gamja-flower text-2xl shadow-[0_10px_20px_rgba(26,43,86,0.2)] transition-all cursor-pointer"
          >
            Back to Home
          </motion.button>
        </Link>
      </div>

      {/* DECORATIVE: Floating "!" mark to match your Hero aesthetics */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 md:right-40 opacity-20"
      >
        <span className="text-8xl font-bold text-[#1a2b56]">!</span>
      </motion.div>
    </div>
  );
}
