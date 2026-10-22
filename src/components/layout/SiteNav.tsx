"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCover from "@/components/ui/ProjectCover";
import { projects } from "@/data/projects";

const links = [
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/about" },
];
const contact = { label: "Contact", href: "/#contact" };
const featured = projects.find((p) => p.featured) ?? projects[0];

/** Which link should show the selection box: the current page, or the home section in view. */
function useActiveHref() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["stack", "contact"];
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const current = ids.findLast((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= mid;
      });
      setSection(current ? `/#${current}` : null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [pathname]);

  if (pathname === "/about") return "/about";
  if (pathname.startsWith("/work")) return "/work";
  return pathname === "/" ? section : null;
}

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const active = useActiveHref();

  const go = (href: string) => {
    setIsOpen(false);

    // Section links only scroll in place on the home page
    if (!href.startsWith("/#") || pathname !== "/") {
      router.push(href);
      return;
    }

    const selector = href.slice(1);
    setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto w-full max-w-md overflow-hidden rounded-3xl border-[1.5px] border-ink bg-cream shadow-[3px_3px_0_0_var(--color-ink)] md:w-auto md:max-w-none"
    >
      <div className="flex h-12 items-center justify-between gap-2 pl-2.5 pr-1.5 md:gap-5">
        <Link href="/" aria-label="Home" className="shrink-0 transition-transform hover:-rotate-6">
          <Image
            src="/assets/logo.png"
            alt=""
            width={30}
            height={30}
            priority
            className="h-7.5 w-7.5 object-contain"
          />
        </Link>

        <ul className="hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink {...link} active={active === link.href} group="desktop" onNavigate={go} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ContactButton onNavigate={go} />

          {/* Hamburger / Close, mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -3 }}
                className="absolute block h-0.5 w-5 rounded-full bg-ink"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 3, width: isOpen ? 20 : 12 }}
                className="absolute block h-0.5 rounded-full bg-ink"
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden md:hidden"
          >
            <div className="border-t-[1.5px] border-ink px-4 pb-5 pt-3">
              <ul className="flex flex-col">
                {[...links, contact].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <NavLink {...link} active={active === link.href} group="mobile" size="lg" onNavigate={go} />
                  </motion.li>
                ))}
              </ul>

              {featured && (
                <Link
                  href={`/work/${featured.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="group mt-4 block overflow-hidden rounded-2xl border-2 border-ink shadow-brutal"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <ProjectCover
                      project={featured}
                      sizes="100vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-ink bg-paper px-4 py-2.5">
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                        Featured project
                      </span>
                      <span className="font-display font-semibold text-ink">{featured.title}</span>
                    </span>
                    <FiArrowUpRight className="text-ink transition-transform group-hover:rotate-45" />
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  label,
  href,
  active,
  group,
  size = "sm",
  onNavigate,
}: {
  label: string;
  href: string;
  active: boolean;
  group: string;
  size?: "sm" | "lg";
  onNavigate: (href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className={`relative inline-block rounded-full font-display font-semibold transition-colors hover:bg-ink/5 ${
        active ? "text-pop" : "text-ink"
      } ${size === "lg" ? "px-3 py-2 text-2xl" : "px-3.5 py-1.5 text-sm"}`}
    >
      {active && (
        // Shared layoutId lets the pill slide between links as the active one changes.
        <motion.span
          layoutId={`nav-active-${group}`}
          aria-hidden
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="absolute inset-0 rounded-full bg-pop/10"
        />
      )}
      <span className="relative">{label}</span>
    </Link>
  );
}

function ContactButton({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <Link
      href={contact.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(contact.href);
      }}
      className="hidden items-center gap-2 rounded-full bg-ink px-4 py-1.5 font-display text-sm font-semibold text-cream transition-colors hover:bg-navy md:inline-flex"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2f9e5b] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2f9e5b]" />
      </span>
      {contact.label}
    </Link>
  );
}
