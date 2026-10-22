"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/data/projects";
import ProjectCover, { isLight } from "@/components/ui/ProjectCover";
import CanvasCursor from "@/components/ui/CanvasCursor";

export default function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  // Cursor-follow "View" pill
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Stiff spring: it stands in for the real pointer, so it must not lag noticeably.
  const px = useSpring(x, { stiffness: 1200, damping: 60 });
  const py = useSpring(y, { stiffness: 1200, damping: 60 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const num = (n: number) => String(n).padStart(2, "0");
  const badge = (
    <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-mono text-xs font-semibold text-ink">
      {num(index + 1)} / {num(total)}
    </span>
  );

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      onMouseMove={onMove}
      onMouseEnter={(e) => {
        // Start right under the pointer instead of sliding in from the last spot.
        onMove(e);
        px.jump(x.get());
        py.jump(y.get());
        setHovering(true);
      }}
      onMouseLeave={() => setHovering(false)}
      className="group relative block md:cursor-none"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-2 border-ink shadow-brutal transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-brutal-lg">
        <ProjectCover
          project={project}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={index < 2}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
          badge={badge}
        />
        {!project.coverFrame && <span className="absolute left-4 top-4">{badge}</span>}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            {project.label}
            {project.year && ` · ${project.year}`}
          </p>
          <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-ink">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
            {project.summary}
          </p>
        </div>
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-cream">
          <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>

      {/* Figma-style cursor that replaces the pointer; the arrow tip sits on the real mouse position */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ left: px, top: py, transformOrigin: "top left" }}
          animate={{ scale: hovering ? 1 : 0.6, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute z-20 hidden md:block"
        >
          <CanvasCursor
            label="View case study"
            color={isLight(project.color) ? "#0E1A2B" : project.color}
          />
        </motion.div>
      )}
    </Link>
  );
}
