"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigRightDash } from "lucide-react";

export default function MobileIntroOverlay() {
  const [stage, setStage] = useState<"warning" | "kidding">("warning");
  const [isExiting, setIsExiting] = useState(false);

  // Split text for the staggered animation
  const kiddingText = "Just kidding XD".split("");

  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth < 768) {
        setShowIntro(true);
      }
    }, 0);
  }, []);

  // Don't render anything until we've measured
  if (showIntro === null) return null;
  // Measured, but not mobile
  if (!showIntro) return null;

  const handleEnter = () => {
    setIsExiting(true);
    // Let the circle expand animation play, then unmount
    setTimeout(() => setShowIntro(false), 800);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-overlay"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={
            isExiting
              ? {
                  clipPath: "circle(0% at 50% 85%)",
                  transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
                }
              : { clipPath: "circle(150% at 50% 50%)" }
          }
          className="fixed inset-0 z-100 bg-[#FAFAFA] flex flex-col items-center justify-center p-8 text-center touch-none"
        >
          {/* Friendly floating blobs for warmth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-16 left-8 w-24 h-24 rounded-full bg-blue-100 opacity-50"
            />
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6.5,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-24 right-6 w-32 h-32 rounded-full bg-indigo-100 opacity-40"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-sky-100 opacity-50"
            />
          </div>

          <AnimatePresence mode="wait">
            {stage === "warning" ? (
              <motion.div
                key="warning-stage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-6 relative"
              >
                <h2 className="font-comic-relief text-[#1a2b56] text-3xl leading-snug">
                  uhhh, This site is for big screen only...
                </h2>

                <button
                  onClick={() => setStage("kidding")}
                  className="text-gray-400 font-mono text-sm underline underline-offset-4 cursor-pointer hover:text-gray-600 transition-colors"
                >
                  (I dont have a laptop)
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="kidding-stage"
                className="flex flex-col items-center gap-8 relative"
              >
                {/* Staggered Letter Pop Animation */}
                <div className="flex justify-center">
                  {kiddingText.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: i * 0.06,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="font-comic-relief text-[#1a2b56] text-4xl inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="text-gray-400 font-mono text-sm"
                >
                  its a joke, please dont be mad
                </motion.p>

                {/* Enter button — circle collapses from here */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.85,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleEnter}
                  disabled={isExiting}
                  className="relative bg-[#091f5b] text-white px-10 py-4 rounded-full font-comic-relief text-xl shadow-xl cursor-pointer overflow-hidden group"
                >
                  {/* Shimmer on hover */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
                  <span className="relative flex items-center gap-2">
                    Lets go
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowBigRightDash />
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
