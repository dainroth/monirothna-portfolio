"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Brand colors, left to right: sun, blush, pop, navy.
const panels = ["#F2CF63", "#F2A7B8", "#3355D6", "#13273F"];
const ease = [0.76, 0, 0.24, 1] as const;
const STAGGER = 0.07;
const DURATION = 0.5;

type Phase = "idle" | "cover" | "covered" | "reveal";

const targets: Record<Phase, string> = {
  idle: "100%",
  cover: "0%",
  covered: "0%",
  reveal: "-100%",
};

/**
 * Colored panels sweep up over the page when an internal link to another page
 * is clicked, the route changes underneath, then they sweep off the top.
 * Works for every <a>/<Link> by listening for clicks on the document.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const fromPath = useRef(pathname);

  // Intercept clicks before Next's <Link> handles them.
  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href);
      // Same page (incl. hash links like /#work while on /) scrolls as usual.
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      if (pending.current) return;
      pending.current = url.pathname + url.search + url.hash;
      fromPath.current = location.pathname;
      setPhase("cover");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  // New page is in: wait a frame so it paints under the panels, then reveal.
  useEffect(() => {
    if (phase !== "covered") return;
    const reveal = () => requestAnimationFrame(() => setPhase("reveal"));
    if (pathname !== fromPath.current) {
      const frame = reveal();
      return () => cancelAnimationFrame(frame);
    }
    // Safety net: never leave the screen covered if the route doesn't change.
    const timeout = window.setTimeout(reveal, 3000);
    return () => window.clearTimeout(timeout);
  }, [phase, pathname]);

  const onPanelDone = (i: number) => {
    if (i !== panels.length - 1) return;
    if (phase === "cover") {
      setPhase("covered");
      if (pending.current) router.push(pending.current);
    } else if (phase === "reveal") {
      pending.current = null;
      setPhase("idle");
    }
  };

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-100 flex overflow-hidden ${phase === "idle" ? "pointer-events-none" : ""}`}
    >
      {panels.map((color, i) => (
        <motion.div
          key={color}
          className="h-full flex-1"
          style={{ backgroundColor: color }}
          initial={{ y: "100%" }}
          animate={{ y: targets[phase] }}
          transition={
            phase === "idle" || phase === "covered"
              ? { duration: 0 }
              : { duration: DURATION, ease, delay: i * STAGGER }
          }
          onAnimationComplete={() => onPanelDone(i)}
        />
      ))}
    </div>
  );
}
