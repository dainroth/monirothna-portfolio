"use client";
import { motion, useReducedMotion } from "framer-motion";
import WidgetLabel from "./WidgetLabel";

/** Tilted sticky note with a strip of tape on top. */
export default function StickyNote({
  label,
  text,
  bg,
  tilt,
}: {
  label: string;
  text: string;
  bg: string;
  tilt: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{ rotate: reduce ? 0 : tilt }}
      whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative flex h-full min-h-52 flex-col justify-between p-6 shadow-[6px_8px_0_rgba(14,26,43,0.2)]"
      style={{ backgroundColor: bg }}
    >
      <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-cream/70 shadow-sm" />
      <WidgetLabel>{label}</WidgetLabel>
      <p className="mt-6 font-display text-2xl font-bold leading-tight text-ink">{text}</p>
    </motion.div>
  );
}
