"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/** Small draggable photo sticker. */
export default function Polaroid({
  constraintsRef,
}: {
  constraintsRef: React.RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      drag={!reduce}
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 20 }}
      initial={reduce ? { rotate: 6 } : { opacity: 0, y: 40, rotate: 18 }}
      animate={{ opacity: 1, y: 0, rotate: 6 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 14 }}
      className="relative w-40 cursor-grab justify-self-start bg-white p-2 pb-9 shadow-[6px_8px_0_rgba(14,26,43,0.18)] active:cursor-grabbing md:w-48 md:justify-self-end"
    >
      <div className="relative aspect-square overflow-hidden bg-paper">
        <Image
          src="/assets/me-3.jpg"
          alt="Roth"
          fill
          sizes="192px"
          draggable={false}
          className="pointer-events-none select-none object-cover"
        />
      </div>
      <p className="absolute bottom-2 left-0 right-0 text-center font-comic-relief text-sm text-ink/70">
        hi, that&apos;s me
      </p>
      <div className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 -rotate-12">
        <Image src="/assets/here.png" alt="" fill sizes="64px" className="object-contain" />
      </div>
    </motion.div>
  );
}
