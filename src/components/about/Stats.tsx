"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/data/about";

export default function Stats() {
  return (
    <section className="border-y-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-6xl divide-y-2 divide-ink sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="px-6 py-10 md:py-14">
            <p className="font-display text-6xl font-extrabold tracking-tight md:text-7xl">
              <CountUp to={s.value} />
              <span className="text-pop">{s.suffix}</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mute">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Counts from 0 up to `to` the first time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{reduce ? to : n}</span>;
}
