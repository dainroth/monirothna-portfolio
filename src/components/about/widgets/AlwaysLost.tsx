"use client";
import { motion, useReducedMotion } from "framer-motion";
import WidgetLabel from "./WidgetLabel";

/** Fun fact card: a map with a wandering route and a compass that can't make up its mind. */
export default function AlwaysLost() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-52 flex-col justify-between overflow-hidden rounded-3xl border-2 border-ink bg-[#9FD8C2] p-6 shadow-brutal-lg">
      {/* Wandering route that loops back on itself */}
      <svg
        aria-hidden
        viewBox="0 0 200 140"
        className="pointer-events-none absolute -right-6 -top-4 w-56 text-ink/40"
        fill="none"
      >
        <motion.path
          d="M10 120 C 40 90, 20 60, 60 60 S 110 110, 120 70 S 80 20, 130 25 S 190 70, 160 90 S 120 60, 150 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <text x="146" y="36" className="fill-ink font-display text-[22px] font-extrabold">?</text>
      </svg>

      <div className="relative flex items-center gap-3">
        <Compass reduce={!!reduce} />
        <WidgetLabel>Fun fact</WidgetLabel>
      </div>

      <div className="relative mt-6">
        <p className="font-display text-3xl font-extrabold leading-tight text-ink">I&apos;m always lost.</p>
        <p className="mt-2 text-sm text-ink/70">
          Streets, malls, buildings I&apos;ve been to twice. Don&apos;t ask me for directions.
        </p>
      </div>
    </div>
  );
}

function Compass({ reduce }: { reduce: boolean }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-cream">
      <motion.span
        aria-hidden
        className="relative h-7 w-1.5"
        animate={reduce ? undefined : { rotate: [0, 70, -40, 160, 20, -90, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-[#e5484d]" />
        <span className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full bg-ink" />
      </motion.span>
    </span>
  );
}
