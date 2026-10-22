"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences, type Experience } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";

// Oldest first, like a path you walk down.
const items = [...experiences].reverse();
const TILTS = [0, -5, 4, -3, 5];

type Point = { x: number; y: number };

/**
 * Work experience as tilted cards scattered on a design canvas,
 * zig-zagging left/right with dashed connectors between them.
 */
export default function ExperienceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(items.length - 1);

  // offset* ignores CSS transforms, so the tilt/entrance animation
  // doesn't throw the connector endpoints off.
  const measure = () => {
    const c = containerRef.current;
    if (!c) return;
    setSize({ w: c.offsetWidth, h: c.offsetHeight });
    setPoints(
      cardRefs.current.map((el) =>
        el
          ? {
              x: el.offsetLeft + el.offsetWidth / 2,
              y: el.offsetTop + el.offsetHeight / 2,
            }
          : { x: 0, y: 0 },
      ),
    );
  };

  useLayoutEffect(measure, []);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="bg-cream bg-grid px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
            Experience
          </p>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink md:text-7xl">
            My Journey
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            width={size.w}
            height={size.h}
          >
            {points.slice(1).map((p, i) => {
              const a = points[i];
              return (
                <motion.line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgb(14 26 43 / 0.2)"
                  strokeWidth={2}
                  strokeDasharray="10 8"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              );
            })}
          </svg>

          <ol className="relative z-10 flex flex-col">
            {items.map((item, i) => (
              <li
                key={item.company}
                className={`flex justify-center ${i % 2 ? "md:justify-end" : "md:justify-start"} ${
                  i > 0 ? "mt-10 md:-mt-20" : ""
                }`}
              >
                <Card
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  item={item}
                  index={i}
                  tilt={TILTS[i % TILTS.length]}
                  active={active === i}
                  onActivate={() => setActive(i)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Card({
  ref,
  item,
  index,
  tilt,
  active,
  onActivate,
}: {
  ref: (el: HTMLDivElement | null) => void;
  item: Experience;
  index: number;
  tilt: number;
  active: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : tilt }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative w-full max-w-76 bg-white p-5 outline-none md:w-76 md:p-6"
      style={{
        border: `1.5px solid ${active ? item.color : "rgb(14 26 43 / 0.15)"}`,
        transition: "border-color 0.2s",
      }}
    >
      {/* Figma-style selection handles */}
      {[
        "-left-1.5 -top-1.5",
        "-right-1.5 -top-1.5",
        "-left-1.5 -bottom-1.5",
        "-right-1.5 -bottom-1.5",
      ].map((pos) => (
        <motion.span
          key={pos}
          aria-hidden
          initial={false}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
          transition={{ duration: 0.15 }}
          className={`absolute h-3 w-3 border-[1.5px] bg-white ${pos}`}
          style={{ borderColor: item.color }}
        />
      ))}

      <div className="flex items-start justify-between font-mono text-xs">
        <span className="font-semibold text-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-mute">{item.date}</span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.company} logo`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-extrabold text-white"
            style={{ backgroundColor: item.color }}
          >
            {item.company[0]}
          </span>
        )}
        {item.current && (
          <span
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white"
            style={{ backgroundColor: item.color }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Currently here
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
        {item.company}
      </h3>
      <p className="mt-0.5 text-sm text-mute">{item.title}</p>
      {item.location && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
          {item.location}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-mute">{item.description}</p>

      {item.stack && (
        <ul className="mt-4 flex flex-wrap gap-1">
          {item.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-ink/15 bg-paper px-2 py-0.5 text-[10px] font-medium text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
