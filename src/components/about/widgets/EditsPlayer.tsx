"use client";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { edits } from "@/data/about";
import WidgetLabel from "./WidgetLabel";

/** Plays the edits in place (muted, while on screen) with prev/next controls. */
export default function EditsPlayer() {
  const [index, setIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(boxRef, { margin: "-20%" });
  const reduce = useReducedMotion();
  const edit = edits[index];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce, index]);

  const go = (d: number) => setIndex((i) => (i + d + edits.length) % edits.length);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-ink text-cream shadow-brutal-lg">
      <div className="flex items-center justify-between gap-3 px-5 pt-5 md:px-6">
        <WidgetLabel dark>Editing · back at it for fun</WidgetLabel>
        <span className="rounded-full bg-blush px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
          In progress…
        </span>
      </div>

      <div
        ref={boxRef}
        className="relative mx-5 mt-4 aspect-video flex-1 overflow-hidden rounded-2xl border-2 border-cream/10 bg-black md:mx-6 md:aspect-auto md:min-h-80"
      >
        <video
          key={edit.path}
          ref={videoRef}
          src={edit.path}
          muted
          loop
          playsInline
          controls={!!reduce}
          className="absolute inset-0 h-full w-full animate-in object-contain fade-in duration-300"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-5 md:p-6">
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-bold">{edit.title}</p>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">
            {edit.type}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="mr-1 font-mono text-xs text-cream/60">
            {index + 1} / {edits.length}
          </span>
          {[
            { d: -1, icon: <FiChevronLeft />, label: "Previous edit" },
            { d: 1, icon: <FiChevronRight />, label: "Next edit" },
          ].map((b) => (
            <button
              key={b.d}
              onClick={() => go(b.d)}
              aria-label={b.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream/30 transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>

      <p className="border-t border-cream/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 md:px-6">
        Alight Motion · Video Star · After Effects · Premiere Pro
      </p>
    </div>
  );
}
