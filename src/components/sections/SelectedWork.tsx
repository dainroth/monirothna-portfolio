import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

export default function SelectedWork() {
  return (
    <section id="work" className="bg-cream px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink md:text-7xl">
              Things I&apos;ve built
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-mute">
              Web apps, design work and the odd game. Pick one to see how it came
              together.
            </p>
            <Link
              href="/work"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2 font-display text-sm font-semibold text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-sun"
            >
              See all projects
              <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.12}>
              <ProjectCard project={project} index={i} total={featured.length} />
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <Reveal className="mt-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-mute">
              More projects
            </p>
            <ul className="border-t-2 border-ink">
              {more.map((project) => (
                <li key={project.slug} className="border-b-2 border-ink">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-center gap-4 py-5 transition-colors hover:bg-ink hover:text-cream md:px-4"
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border-2 border-ink"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-display text-xl font-bold md:text-2xl">
                      {project.title}
                    </span>
                    <span className="ml-auto hidden font-mono text-xs uppercase tracking-[0.2em] opacity-60 sm:inline">
                      {project.label}
                    </span>
                    <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
