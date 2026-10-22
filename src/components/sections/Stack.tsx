"use client";
import { motion, useReducedMotion } from "framer-motion";
import LogoLoop from "@/components/ui/LogoLoop";
import Reveal from "@/components/ui/Reveal";
import { isLight } from "@/components/ui/ProjectCover";
import { allTools, stackGroups, type StackGroup } from "@/data/stack";

const TILTS = [-2, 1.5, -1];

const tickerItems = allTools.map((t) => ({
  node: (
    <span className="flex items-center gap-3 font-display font-extrabold tracking-tight">
      {t.icon && <t.icon className="text-[0.8em]" />}
      {t.name}
      <span className="ml-[0.6em] text-pop">✦</span>
    </span>
  ),
  title: t.name,
}));

const Stack = () => {
  return (
    <section id="stack" className="overflow-hidden bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
              Toolbox
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink md:text-7xl">
              What I work with
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-mute">
            The tools I reach for to take an idea from a Figma frame to
            something live.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {stackGroups.map((group, i) => (
            <GroupCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>

      {/* Ticker tape */}
      <div className="relative -mx-[5%] mt-24 w-[110%] -rotate-2 border-y-2 border-ink bg-ink py-5 text-cream md:mt-32">
        <LogoLoop
          logos={tickerItems}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={48}
          hoverSpeed={15}
          ariaLabel="Technologies I use"
          renderItem={(item) => ("node" in item ? item.node : null)}
        />
      </div>
    </section>
  );
};

function GroupCard({ group, index }: { group: StackGroup; index: number }) {
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];
  const dark = !isLight(group.color);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : tilt }}
      whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: index * 0.08 }}
      className="flex flex-col rounded-3xl border-2 border-ink p-6 shadow-brutal-lg md:p-7"
      style={{ backgroundColor: group.color }}
    >
      <div className={`flex items-start justify-between font-mono text-xs ${dark ? "text-cream/80" : "text-ink/70"}`}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{group.tools.length} tools</span>
      </div>

      <h3 className={`mt-8 font-display text-3xl font-extrabold tracking-tight ${dark ? "text-cream" : "text-ink"}`}>
        {group.title}
      </h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-cream/80" : "text-ink/75"}`}>
        {group.blurb}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {group.tools.map((tool) => {
          const chip = (
            <>
              {tool.icon && <tool.icon className="shrink-0" />}
              {tool.name}
            </>
          );
          const cls =
            "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-semibold text-ink transition-transform";
          return (
            <li key={tool.name}>
              {tool.href ? (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} hover:-translate-y-0.5 hover:bg-sun`}
                >
                  {chip}
                </a>
              ) : (
                <span className={cls}>{chip}</span>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default Stack;
