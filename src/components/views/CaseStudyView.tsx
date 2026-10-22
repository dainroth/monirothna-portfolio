import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/data/projects";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ProjectCover from "@/components/ui/ProjectCover";

export default function CaseStudyView({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const links = [
    project.links.live && { label: "Live site", url: project.links.live },
    project.links.github && { label: "GitHub", url: project.links.github },
    project.links.other,
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <SmoothScroll>
      <div className="min-h-svh bg-cream text-ink">
        <Header />

        <article className="px-4 pb-24 pt-32 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Link
                href="/work"
                className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mute hover:text-ink"
              >
                <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                All work
              </Link>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
                {project.label}
                {project.year && ` · ${project.year}`}
              </p>
              <h1 className="mt-3 font-display text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">
                {project.summary}
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mt-12 grid gap-6 border-y-2 border-ink py-6 sm:grid-cols-3"
            >
              <Meta title="Role">{project.role}</Meta>
              <Meta title="Stack">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Meta>
              <Meta title="Links">
                {links.length ? (
                  <ul className="space-y-1">
                    {links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-4 hover:text-pop"
                        >
                          {l.label}
                          <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-mute">Coming soon</span>
                )}
              </Meta>
            </Reveal>

            <Reveal
              delay={0.15}
              className="relative mt-12 aspect-video overflow-hidden rounded-3xl border-2 border-ink shadow-brutal-lg"
            >
              <ProjectCover project={project} sizes="(min-width: 1152px) 1152px, 100vw" priority />
            </Reveal>

            <div className="mx-auto mt-24 max-w-3xl space-y-20">
              {project.sections.map((section, i) => (
                <Reveal key={section.heading} as="section">
                  <p className="font-mono text-xs text-pop">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-mute">
                    {section.body}
                  </p>
                  {section.images?.map((src) => (
                    <div
                      key={src}
                      className="relative mt-8 aspect-video overflow-hidden rounded-2xl border-2 border-ink"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </article>

        <Link
          href={`/work/${next.slug}`}
          className="group block border-t-2 border-ink px-4 py-20 transition-colors sm:px-6"
          style={{ ["--next" as string]: next.color }}
        >
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">
                Next project
              </p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-tight transition-colors group-hover:text-(--next) md:text-7xl">
                {next.title}
              </p>
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-ink text-2xl transition-colors group-hover:bg-ink group-hover:text-cream">
              <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </Link>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function Meta({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-mute">
        {title}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
