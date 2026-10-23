"use client";
import { motion, useReducedMotion, type TargetAndTransition, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type RefObject } from "react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import RotatingText from "@/components/ui/RotatingText";
import CanvasCursor from "@/components/ui/CanvasCursor";

const SELECT = "#3b82f6"; // Figma-style selection blue
const DRAG_START = 0.3;
const DRAG_DURATION = 1.1;
const DRAG_END = DRAG_START + DRAG_DURATION;
const dragEase = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  // With reduced motion everything renders in its final state.
  const drag = (from: TargetAndTransition, to: TargetAndTransition) =>
    reduce
      ? { initial: to, animate: to }
      : {
          initial: from,
          animate: to,
          transition: { delay: DRAG_START, duration: DRAG_DURATION, ease: dragEase },
        };

  const after = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: DRAG_END + delay, duration: 0.4 },
        };

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-cream bg-grid px-4 pb-20 pt-32 sm:px-6">
      <Swirl reduce={!!reduce} />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Labels above the frame */}
        <div className="mb-2 flex items-end justify-between text-sm">
          <motion.span {...after()} className="font-medium" style={{ color: SELECT }}>
            Intro
          </motion.span>
          <motion.span {...after(0.1)} className="inline-flex items-center gap-2 text-mute">
            <span className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-1 w-1 animate-pulse rounded-full bg-[#2f9e5b]" style={{ animationDelay: `${i * 90}ms` }} />
              ))}
            </span>
            Available for work
          </motion.span>
        </div>

        {/* The frame being "drawn" */}
        <div className="relative">
          {/* Content, revealed by a clip that grows with the selection */}
          <motion.div
            {...drag({ clipPath: "inset(0% 100% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" })}
            className="grid gap-6 bg-white p-4 shadow-[0_30px_60px_-30px_rgba(14,26,43,0.25)] sm:p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8"
          >
            <DeskCollage reduce={!!reduce} />

            <div className="flex flex-col justify-end pb-1 md:pr-2">
              <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-6xl">
                Hey, I&apos;m Roth.
              </h1>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 font-display text-2xl font-bold text-navy md:text-3xl">
                I
                <RotatingText
                  texts={["build", "design", "animate"]}
                  rotationInterval={2200}
                  staggerDuration={0.03}
                  mainClassName="inline-flex overflow-hidden rounded-lg px-2"
                  style={{ backgroundColor: "#3355D6", color: "#fcf9f3" }}
                  elementLevelClassName="pb-[0.08em]"
                />
                for the web.
              </p>
              <p className="mt-5 max-w-sm leading-relaxed text-mute">
                Frontend developer and designer in Phnom Penh. I care about
                polish, motion and interfaces that are fun to use.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-display font-semibold text-cream shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-navy"
                >
                  See my work <FiArrowDown />
                </a>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2.5 font-display font-semibold text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-sun"
                >
                  About me
                  <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Selection rectangle that grows from the top-left corner. Each edge moves with
              transforms only, so the browser doesn't re-lay out the page every frame. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <motion.span
              {...drag({ scaleX: 0 }, { scaleX: 1 })}
              className="absolute left-0 top-0 h-[1.5px] w-full origin-left"
              style={{ backgroundColor: SELECT }}
            />
            <motion.span
              {...drag({ scaleY: 0 }, { scaleY: 1 })}
              className="absolute left-0 top-0 h-full w-[1.5px] origin-top"
              style={{ backgroundColor: SELECT }}
            />
            {/* Right and bottom edges ride along with the cursor */}
            <motion.div {...drag({ x: "-100%" }, { x: "0%" })} className="absolute inset-0">
              <motion.span
                {...drag({ scaleY: 0 }, { scaleY: 1 })}
                className="absolute right-0 top-0 h-full w-[1.5px] origin-top"
                style={{ backgroundColor: SELECT }}
              />
            </motion.div>
            <motion.div {...drag({ y: "-100%" }, { y: "0%" })} className="absolute inset-0">
              <motion.span
                {...drag({ scaleX: 0 }, { scaleX: 1 })}
                className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left"
                style={{ backgroundColor: SELECT }}
              />
            </motion.div>

            {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((pos, i) => (
              <motion.span
                key={pos}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: reduce ? 0 : DRAG_END + i * 0.04, type: "spring", stiffness: 500, damping: 20 }}
                className={`absolute h-2.5 w-2.5 border-[1.5px] bg-white ${pos}`}
                style={{ borderColor: SELECT }}
              />
            ))}
          </div>

          {/* Fake multiplayer cursor doing the dragging */}
          {!reduce && <DragCursor />}
        </div>
      </div>
    </section>
  );
}

/**
 * Cursor appears at the top-left, drags to the bottom-right, then drifts off and idles.
 * The wrapper is frame-sized, so translating it by % moves the cursor across the frame.
 */
function DragCursor() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      initial={{ x: "0%", y: "0%", opacity: 0 }}
      animate={{
        x: ["0%", "0%", "100%", "104%"],
        y: ["0%", "0%", "100%", "108%"],
        opacity: [0, 1, 1, 1],
      }}
      transition={{
        duration: DRAG_END + 0.6,
        times: [0, DRAG_START / (DRAG_END + 0.6), DRAG_END / (DRAG_END + 0.6), 1],
        ease: ["easeOut", dragEase, "easeOut"],
      }}
    >
      <motion.div
        className="absolute left-0 top-0"
        animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ delay: DRAG_END + 0.6, duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <CanvasCursor />
      </motion.div>
    </motion.div>
  );
}

/** Big gradient loop drawn behind the frame. */
function Swirl({ reduce }: { reduce: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 700"
      className="pointer-events-none absolute -left-24 -top-10 z-0 w-184 max-w-none opacity-90 md:-left-10 md:w-240"
      fill="none"
    >
      <defs>
        <linearGradient id="swirl" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3355D6" />
          <stop offset="100%" stopColor="#A9C1EE" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-40 640 C 180 600, 330 480, 420 330 C 520 160, 430 40, 320 60 C 200 80, 200 260, 330 340 C 460 420, 640 380, 720 250 C 790 140, 800 60, 820 -40"
        stroke="url(#swirl)"
        strokeWidth="64"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Desk objects layered like stickers. Positions are % of the panel.
const deskItems = [
  { img: "/assets/laptop.webp", alt: "Laptop", className: "left-[16%] top-[26%] w-[66%]", rotate: -3 },
  { img: "/assets/keyboard.webp", alt: "Keyboard", className: "-left-[6%] top-[4%] w-[50%]", rotate: -14 },
  { img: "/assets/tablet.webp", alt: "Tablet", className: "bottom-[5%] right-[2%] w-[40%]", rotate: 10 },
  { img: "/assets/macro.webp", alt: "Camera", className: "bottom-[7%] left-[6%] w-[30%]", rotate: -8 },
  { img: "/assets/!-icon.webp", alt: "", className: "right-[8%] top-[7%] w-[18%]", rotate: 14 },
];

type DeskItem = (typeof deskItems)[number];

// Picked up: lifts off the panel with a bigger shadow. Dropped: slaps back down and stays.
const stickerStates: Variants = {
  stuck: {
    scale: [1.08, 0.95, 1],
    rotate: 0,
    filter: "drop-shadow(6px 8px 0px rgba(0,0,0,0.25))",
    transition: { duration: 0.35, times: [0, 0.5, 1], ease: "easeOut" },
  },
  lifted: {
    scale: 1.08,
    rotate: 3,
    filter: "drop-shadow(16px 22px 0px rgba(0,0,0,0.3))",
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

/** Left half of the intro card: desk stickers you can peel off and stick somewhere else. */
function DeskCollage({ reduce }: { reduce: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Stacking order: the last sticker picked up stays on top.
  const [order, setOrder] = useState(() => deskItems.map((_, i) => i));
  const bringToFront = (i: number) => setOrder((o) => [...o.filter((j) => j !== i), i]);

  return (
    <div
      ref={panelRef}
      className="relative aspect-4/5 overflow-hidden bg-navy bg-size-[40px_40px] md:aspect-auto md:min-h-104"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(252 249 243 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(252 249 243 / 0.08) 1px, transparent 1px)",
      }}
    >
      {deskItems.map((item, i) => (
        <Sticker
          key={item.img}
          item={item}
          index={i}
          z={order.indexOf(i) + 1}
          reduce={reduce}
          panelRef={panelRef}
          onPickUp={() => bringToFront(i)}
        />
      ))}

      {!reduce && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: DRAG_END + 1 }}
          className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy"
        >
          Peel &amp; move the stickers
        </motion.span>
      )}
    </div>
  );
}

function Sticker({
  item,
  index,
  z,
  reduce,
  panelRef,
  onPickUp,
}: {
  item: DeskItem;
  index: number;
  z: number;
  reduce: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  onPickUp: () => void;
}) {
  const [lifted, setLifted] = useState(false);

  return (
    // Outer layer: entrance + dragging. No momentum, so it stays exactly where it's dropped.
    <motion.div
      drag={!reduce}
      dragConstraints={panelRef}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={() => {
        setLifted(true);
        onPickUp();
      }}
      onDragEnd={() => setLifted(false)}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      initial={reduce ? { rotate: item.rotate } : { opacity: 0, scale: 0.3, rotate: item.rotate - 20 }}
      animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
      // Pops in while the frame is still being drawn, so the hero is complete sooner (better LCP).
      transition={{ delay: reduce ? 0 : DRAG_START + 0.2 + index * 0.08, type: "spring", stiffness: 260, damping: 16 }}
      style={{ zIndex: z }}
      className={`absolute cursor-grab active:cursor-grabbing ${item.className}`}
    >
      {/* Inner layer: the peel / stick feel */}
      <motion.div initial={false} variants={stickerStates} animate={lifted ? "lifted" : "stuck"}>
        <Image
          src={item.img}
          alt={item.alt}
          width={320}
          height={320}
          draggable={false}
          priority
          sizes="(min-width: 768px) 260px, 50vw"
          className="pointer-events-none h-auto w-full select-none object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
