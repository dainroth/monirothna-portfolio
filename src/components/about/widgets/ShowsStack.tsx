"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { shows } from "@/data/about";
import WidgetLabel from "./WidgetLabel";

// Where each poster sits when the stack is closed vs. spread out.
const fan = [
  { closed: { rotate: -8, x: -18, y: 0 }, open: { rotate: -14, x: -70, y: 0 } },
  { closed: { rotate: 0, x: 0, y: 0 }, open: { rotate: 0, x: 0, y: -10 } },
  { closed: { rotate: 8, x: 18, y: 0 }, open: { rotate: 14, x: 70, y: 0 } },
];

/** Fanned stack of posters that spreads out on hover (or tap). */
export default function ShowsStack() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      className="flex h-full flex-col rounded-3xl border-2 border-ink bg-[#9FD8C2] p-5 shadow-brutal-lg md:p-6"
    >
      <WidgetLabel>On my TV</WidgetLabel>
      <div className="relative mt-6 flex h-48 w-full items-center justify-center">
        {shows.map((show, i) => (
          <motion.div
            key={show.title}
            initial={false}
            animate={!reduce && open ? fan[i].open : fan[i].closed}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="absolute aspect-2/3 h-44 overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-brutal"
            style={{ zIndex: i === 1 ? 3 : 2 }}
          >
            <Image src={show.poster} alt={show.title} fill sizes="120px" className="object-cover" />
          </motion.div>
        ))}
      </div>
      <p className="mt-6 font-display text-lg font-bold leading-snug text-ink">
        {shows.map((s) => s.title).join(", ").replace(/, ([^,]*)$/, " & $1")}
      </p>
    </div>
  );
}
