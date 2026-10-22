import Image from "next/image";
import type { Project } from "@/data/projects";

/** Light accent colors need dark text on top of them. */
export function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}

/** Project cover image, or a colored placeholder until one is added. */
export default function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
  badge,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Shown in the browser bar of screenshot covers; callers place it themselves otherwise. */
  badge?: React.ReactNode;
}) {
  // Screenshot covers turn the whole frame into a browser window.
  if (project.cover && project.coverFrame) {
    const url = project.links.live ?? project.links.other?.url;
    return (
      <div className="absolute inset-0 flex flex-col bg-cream">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b-2 border-ink px-4">
          {["bg-[#e5484d]", "bg-sun", "bg-[#2f9e5b]"].map((c) => (
            <span key={c} className={`h-3 w-3 shrink-0 rounded-full border border-ink ${c}`} />
          ))}
          {url && (
            <span className="ml-2 min-w-0 truncate rounded-full bg-paper px-3 py-1 font-mono text-xs text-mute">
              {new URL(url).host}
            </span>
          )}
          {badge && <span className="ml-auto shrink-0">{badge}</span>}
        </div>
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={project.cover}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${project.coverPosition ?? "object-top"} ${className}`}
          />
        </div>
      </div>
    );
  }

  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.title} cover`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-grid ${className}`}
      style={{ backgroundColor: project.color }}
    >
      <span
        className={`px-6 text-center font-display text-4xl leading-none font-extrabold tracking-tight md:text-6xl ${
          isLight(project.color) ? "text-ink/80" : "text-cream/90"
        }`}
      >
        {project.title}
      </span>
    </div>
  );
}
