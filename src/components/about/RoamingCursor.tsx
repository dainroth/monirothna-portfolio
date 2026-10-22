"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import CanvasCursor from "@/components/ui/CanvasCursor";

// Loose spring so the cursor trails the scroll like someone is moving it.
const follow = { stiffness: 60, damping: 16, mass: 0.9 };

/**
 * Multiplayer cursor that starts on the element marked `data-cursor-anchor`,
 * then wanders around the viewport as the page scrolls. Its comment bubble
 * reads `data-cursor-note` from whichever section crosses the middle of the screen.
 */
export default function RoamingCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, follow);
  const sy = useSpring(y, follow);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return;
    const anchor = document.querySelector<HTMLElement>("[data-cursor-anchor]");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor-note]"));

    // Park off-screen bottom-right so the first update glides in.
    const offX = window.innerWidth + 80;
    const offY = window.innerHeight + 80;
    x.jump(offX);
    y.jump(offY);
    sx.jump(offX);
    sy.jump(offY);

    let frame = 0;
    const update = () => {
      frame = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = window.scrollY;

      // Slow figure-eight driven by scroll distance.
      let tx = vw * (0.6 + 0.28 * Math.sin(s / 520));
      let ty = vh * (0.5 + 0.22 * Math.sin(s / 340 + 1));

      // Pinned to the name at the top, handing off to the roam over the first ~60% of a screen.
      if (anchor) {
        const r = anchor.getBoundingClientRect();
        const t = Math.min(1, s / (vh * 0.6));
        const e = t * t * (3 - 2 * t);
        tx = r.left + r.width * 0.85 + (tx - r.left - r.width * 0.85) * e;
        ty = r.top + r.height * 0.7 + (ty - r.top - r.height * 0.7) * e;
      }
      x.set(tx);
      y.set(ty);

      // Last section whose top has passed the middle, so a short footer still counts at the very end.
      const current = sections.findLast((el) => el.getBoundingClientRect().top <= vh / 2) ?? sections[0];
      setNote(current?.dataset.cursorNote ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const start = window.setTimeout(update, 600);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduce, x, y, sx, sy]);

  if (reduce || !note) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <CanvasCursor
          note={
            <motion.span
              key={note}
              className="block whitespace-nowrap"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {note}
            </motion.span>
          }
        />
      </motion.div>
    </motion.div>
  );
}
