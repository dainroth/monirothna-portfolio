"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const leftLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
];

const rightLinks = [
  { label: "About\u00A0Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255,255,255,0.9)", "rgba(255,255,255,1)"],
  );

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // Small delay to let the menu close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none"
    >
      <motion.div
        layout
        style={{ backgroundColor }}
        animate={{
          borderRadius: isOpen ? "32px" : "100px",
          width: isOpen ? "min(550px, 100%)" : "280px",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
        className="relative shadow-[0_4px_32px_rgba(0,0,0,0.10)] border border-black/5 pointer-events-auto overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 h-15">
          <div className="flex items-center  shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={34}
              height={34}
              priority
              className="object-contain w-8.5 h-8.5"
            />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-comic-relief text-[#1a1a1a] text-3xl mt-2 "
                >
                  othna
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger / Close */}
          <motion.button
            layout="position"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 shrink-0 flex items-center justify-center text-black cursor-pointer"
          >
            {/* using a simple div-based icon for the smoothest "X" transition */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -3,
                }}
                className="absolute block h-0.5 w-5 bg-black rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 3,
                  width: isOpen ? 20 : 12,
                }}
                className="absolute block h-0.5 bg-black rounded-full"
              />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="px-7 md:px-10 pb-8 pt-2 flex flex-col md:grid md:grid-cols-5 gap-y-8 md:gap-x-4">
                {/* Links Wrapper: Groups links together on mobile */}
                <div className="flex justify-between md:contents">
                  {/* Left links */}
                  <div className="flex flex-col gap-5 font-comic-relief">
                    {leftLinks.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className="text-[#1a1a1a] text-base md:text-xl font-normal hover:text-[#344B94] transition-colors"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right links */}
                  <div className="flex flex-col gap-5 font-comic-relief md:ml-6">
                    {rightLinks.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className="text-[#1a1a1a] text-base md:text-xl font-normal hover:text-[#344B94] transition-colors"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Spacer: Only visible on desktop to maintain grid alignment */}
                <div className="hidden md:block col-span-1" />

                {/* Featured image: Now stacks naturally on mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group overflow-hidden rounded-2xl bg-gray-100 md:col-span-2"
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                  }}
                >
                  <Link
                    href="https://eykorban.vercel.app/"
                    className="absolute inset-0 z-10"
                    tabIndex={-1}
                    aria-label="Go to featured project"
                  >
                    <span className="sr-only">Go to featured project</span>
                  </Link>
                  <Image
                    src="/assets/here-my-id.jpg"
                    alt="Featured Project"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white font-comic-relief text-base md:text-lg pointer-events-none">
                    Featured Project
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
