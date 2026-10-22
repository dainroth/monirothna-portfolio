"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import CanvasCursor from "@/components/ui/CanvasCursor";

const SELECT = "#3b82f6";
const SEARCH_DURATION = 4.2;

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-cream bg-grid px-4 py-24">
      <LostRoute reduce={!!reduce} />

      <div className="relative z-10 w-full max-w-xl">
        {/* Frame labels */}
        <div className="mb-2 flex items-end justify-between text-sm">
          <span className="font-medium" style={{ color: SELECT }}>
            Frame 404
          </span>
          <span className="inline-flex items-center gap-2 text-mute">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e5484d]" />
            Page not found
          </span>
        </div>

        <div className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white px-6 py-10 text-center shadow-[0_30px_60px_-30px_rgba(14,26,43,0.25)] sm:px-10 md:py-14"
            style={{ outline: `1.5px solid ${SELECT}` }}
          >
            <p className="flex items-center justify-center font-display text-[8rem] font-extrabold leading-none tracking-tighter text-ink md:text-[11rem]">
              4
              <motion.span
                aria-hidden
                animate={reduce ? {} : { rotate: [0, -12, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mx-1 inline-flex h-[0.72em] w-[0.6em] items-center justify-center rounded-full border-[0.12em] border-pop"
              />
              4
              <span className="sr-only">404</span>
            </p>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              This page wandered off the canvas.
            </h1>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-mute">
              The link might be broken, or the page has moved. Let&apos;s get
              you back somewhere real.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 font-display font-semibold text-cream shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-navy"
              >
                <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                Back home
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-display font-semibold text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-sun"
              >
                See my work
                <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </motion.div>

          {/* Selection handles */}
          {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map(
            (pos, i) => (
              <motion.span
                key={pos}
                aria-hidden
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 500, damping: 20 }}
                className={`absolute h-2.5 w-2.5 border-[1.5px] bg-white ${pos}`}
                style={{ borderColor: SELECT }}
              />
            ),
          )}

          <SearchingCursor reduce={!!reduce} />
        </div>
      </div>
    </main>
  );
}

/** Cursor flies in, searches around the frame, then settles on "Back home". */
function SearchingCursor({ reduce }: { reduce: boolean }) {
  // Final resting spot, roughly on the "Back home" button (% of the frame).
  const end = { left: "34%", top: "84%" };

  if (reduce) {
    return (
      <div className="pointer-events-none absolute z-20" style={end}>
        <CanvasCursor note="Home is right here" />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      initial={{ left: "-40%", top: "-30%", opacity: 0 }}
      animate={{
        left: ["-40%", "8%", "92%", "70%", "18%", "52%", end.left],
        top: ["-30%", "12%", "20%", "58%", "40%", "30%", end.top],
        opacity: [0, 1, 1, 1, 1, 1, 1],
      }}
      transition={{
        duration: SEARCH_DURATION,
        times: [0, 0.15, 0.35, 0.5, 0.68, 0.82, 1],
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{ x: [0, 5, 0], y: [0, -4, 0] }}
        transition={{ delay: SEARCH_DURATION, duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <CanvasCursor
          note={
            <motion.span
              className="block"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: SEARCH_DURATION + 0.1, duration: 0.3 }}
            >
              Found it. Home is right here
            </motion.span>
          }
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * A dashed route that draws itself across the page, gets lost in a loop and
 * dead-ends at an ✕ — plus a gradient squiggle in the corner.
 */
function LostRoute({ reduce }: { reduce: boolean }) {
  const route =
    "M -40 620 C 120 600, 180 470, 300 480 S 470 640, 560 560 S 520 360, 640 330 C 760 300, 820 420, 760 470 C 700 520, 640 430, 700 380 C 780 310, 900 280, 980 200 S 1120 150, 1100 90";

  const draw = (delay: number, duration: number) =>
    reduce
      ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { delay, duration, ease: "easeInOut" as const },
        };

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      fill="none"
    >
      <defs>
        {/* Dashes can't animate with pathLength directly, so a solid stroke reveals them through a mask */}
        <mask id="route-reveal">
          <motion.path d={route} stroke="white" strokeWidth="14" strokeLinecap="round" {...draw(0.2, 2.6)} />
        </mask>
        <linearGradient id="squiggle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3355D6" />
          <stop offset="100%" stopColor="#A9C1EE" />
        </linearGradient>
      </defs>

      {/* Start dot */}
      <circle cx="40" cy="606" r="9" fill="#0E1A2B" opacity="0.8" />

      <path
        d={route}
        stroke="#3355D6"
        strokeWidth="4"
        strokeDasharray="14 12"
        strokeLinecap="round"
        mask="url(#route-reveal)"
      />

      {/* Dead end ✕ */}
      <motion.g
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2.8, type: "spring", stiffness: 400, damping: 12 }}
        style={{ transformOrigin: "1100px 90px" }}
        stroke="#e5484d"
        strokeWidth="7"
        strokeLinecap="round"
      >
        <path d="M 1084 74 L 1116 106 M 1116 74 L 1084 106" />
      </motion.g>

      {/* Corner squiggle */}
      <motion.path
        d="M 1240 560 C 1120 600, 1080 700, 1140 740 C 1200 780, 1240 700, 1180 680 C 1100 650, 1040 760, 1000 840"
        stroke="url(#squiggle)"
        strokeWidth="44"
        strokeLinecap="round"
        {...draw(0, 1.6)}
      />
    </svg>
  );
}
