import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { currently } from "@/data/about";
import WidgetLabel from "./WidgetLabel";

/** What I'm building and learning right now. */
export default function Currently() {
  const { building, learning } = currently;

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-ink bg-paper p-5 shadow-brutal-lg md:p-6">
      <div className="flex items-center justify-between gap-3">
        <WidgetLabel>Currently</WidgetLabel>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2f9e5b]" />
          Live
        </span>
      </div>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Link
          href={building.href}
          className="group flex flex-col justify-between rounded-2xl border-2 border-ink bg-sky p-4 text-cream transition-transform hover:-translate-y-1"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">Building</span>
          <span className="mt-6">
            <span className="flex items-center justify-between gap-2 font-display text-2xl font-bold">
              {building.title}
              <FiArrowUpRight className="shrink-0 transition-transform group-hover:rotate-45" />
            </span>
            <span className="mt-1 block text-sm text-cream/80">{building.text}</span>
          </span>
        </Link>

        <div className="flex flex-col justify-between rounded-2xl border-2 border-ink bg-ink p-4 text-cream">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">Learning</span>
          <span className="mt-6">
            <span className="block font-display text-2xl font-bold">{learning.title}</span>
            <span className="mt-1 block text-sm text-cream/70">{learning.text}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
