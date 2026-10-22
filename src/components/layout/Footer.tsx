"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { email, socialLinks } from "@/data/socials";

// Sticky-note colors + tilts for the social cards (email has its own button).
const notes = socialLinks
  .filter((s) => !s.url.startsWith("mailto:"))
  .map((s, i) => ({
    ...s,
    bg: ["#F2CF63", "#F2A7B8", "#9FD8C2", "#A9C1EE"][i % 4],
    tilt: [-4, 3, -2, 5][i % 4],
  }));

export default function Footer() {
  const reduce = useReducedMotion();
  const [localTime, setLocalTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () =>
      setLocalTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Phnom_Penh",
        }),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pop">
          Contact
        </p>

        <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
          Got an idea?
          <br />
          Let&apos;s{" "}
          <span className="relative inline-block text-sun">
            build it.
            <svg
              aria-hidden
              viewBox="0 0 300 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-4 w-full md:-bottom-3 md:h-6"
            >
              <motion.path
                d="M4 16 C 60 4, 120 22, 180 10 S 270 8, 296 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button
            onClick={copyEmail}
            className="group inline-flex w-fit items-center gap-3 rounded-full border-2 border-cream bg-cream px-6 py-4 font-display text-lg font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-sun md:text-xl"
            aria-label={`Copy email address ${email}`}
          >
            <span className="break-all">{copied ? "Copied to clipboard" : email}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
              {copied ? <FiCheck /> : <FiCopy className="transition-transform group-hover:scale-110" />}
            </span>
          </button>
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            If it doesn&apos;t spark joy, I&apos;m not done. Freelance, full-time
            or just a chat over coffee — my inbox is open.
          </p>
        </div>

        {/* Socials as sticky notes */}
        <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {notes.map((note, i) => (
            <motion.li
              key={note.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : note.tilt }}
              whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 160, damping: 15, delay: i * 0.06 }}
            >
              <a
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex aspect-square flex-col justify-between p-4 text-ink shadow-[6px_6px_0_rgba(0,0,0,0.35)] md:p-5"
                style={{ backgroundColor: note.bg }}
              >
                <div className="flex items-start justify-between">
                  <note.icon className="text-2xl md:text-3xl" />
                  <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold md:text-2xl">{note.name}</p>
                  <p className="mt-0.5 truncate text-xs text-ink/70 md:text-sm">{note.handle}</p>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Giant wordmark, cut off by the bottom edge */}
      <div aria-hidden className="mt-20 flex select-none justify-center overflow-hidden leading-[0.75]">
        {"ROTH".split("").map((ch, i) => (
          <motion.span
            key={i}
            whileHover={reduce ? undefined : { y: "-12%", color: ["#F2CF63", "#F2A7B8", "#9FD8C2", "#3355D6"][i] }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="translate-y-[18%] font-display text-[34vw] font-extrabold tracking-tighter text-cream/10 md:text-[30vw]"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="relative border-t border-cream/10 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 sm:flex-row sm:px-6">
          <p>
            Phnom Penh · {localTime ? `${localTime} ICT` : "—"}
          </p>
          <p>© {new Date().getFullYear()} Sakhan Monirothna</p>
        </div>
      </div>
    </footer>
  );
}
