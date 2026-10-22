import Reveal from "@/components/ui/Reveal";
import { nextUp, workStyle } from "@/data/about";
import NowPlaying from "./widgets/NowPlaying";
import StickyNote from "./widgets/StickyNote";
import EditsPlayer from "./widgets/EditsPlayer";
import Currently from "./widgets/Currently";
import AlwaysLost from "./widgets/AlwaysLost";

/** The "What I'm up to" widget board. */
export default function ThingsAboutMe() {
  return (
    <section className="bg-cream bg-grid px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
            Beyond the resume
          </p>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            What I&apos;m up to
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Widget className="md:col-span-2" delay={0}>
            <Currently />
          </Widget>
          <Widget delay={0.06}>
            <StickyNote label="How I work best" text={workStyle} bg="#F2CF63" tilt={3} />
          </Widget>
          <Widget className="md:col-span-2 md:row-span-2" delay={0.12}>
            <EditsPlayer />
          </Widget>
          <Widget delay={0.18}>
            <AlwaysLost />
          </Widget>
          <Widget delay={0.24}>
            <StickyNote label="What I want to do next" text={nextUp} bg="#F2A7B8" tilt={-3} />
          </Widget>
          <Widget className="md:col-span-3" delay={0.3}>
            <NowPlaying />
          </Widget>
        </div>
      </div>
    </section>
  );
}

function Widget({
  children,
  className = "",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={`flex min-w-0 ${className}`}>
      <div className="w-full min-w-0">{children}</div>
    </Reveal>
  );
}
