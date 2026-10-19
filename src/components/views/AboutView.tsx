"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/layout/Footer";
import WorkFlow from "@/components/sections/WorkFlow";

type CardType = "Editing" | "Favorite TV show" | string;

const personalityCards = [
  {
    label: "Currently obsessing over",
    value: "Motion design & micro-interactions",
  },
  {
    label: "Always up for",
    value: "Weird side projects or just catching up over coffee",
  },
  {
    label: "My Favorite song right now",
    value: "God was showing off by Bruno Mars",
  },
  {
    label: "Editing",
    value: "Currently making a return back to editing videos for fun",
  },
  {
    label: "Favorite TV show",
    value: "Suit, Cunk on Earth & Jujutsu Kaisen",
  },
];

const AboutView = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const closeModal = () => setActiveCard(null);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-white selection:bg-blue-500/30 font-comic-relief">
      <Header />

      <section className="w-full max-w-6xl mx-auto px-6 py-28">
        {/* About Me Tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm tracking-widest uppercase text-[#9b8ea0] mb-10 font-medium"
        >
          About me
        </motion.p>

        {/* Hero Card */}
        <div
          className="relative w-full rounded-[40px] px-8 py-16 md:px-16 md:py-24 overflow-hidden border border-black/5"
          style={{
            backgroundColor: "#F7F5F0",
            backgroundImage: `
              linear-gradient(rgba(28,28,26,0.04) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(28,28,26,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-center mb-16">
            {/* Text Side */}
            <div className="flex flex-col gap-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[30px] leading-[1.30] font-semibold text-[#1a1410]"
              >
                Hey, I&apos;m{" "}
                <span className="italic font-normal text-[#1a2b56]">
                  Monirothna
                </span>{" "}
                or{" "}
                <span className="italic font-normal text-[#1a2b56]">roth</span>
                <br />A developer who codes & a designer who{" "}
                <span className="relative inline-block">
                  feels.
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 100 6"
                    height="6"
                  >
                    <path
                      d="M0,4 Q25,0 50,4 Q75,8 100,4"
                      stroke="#c97b3a"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </motion.h3>

              <motion.p className="text-[16px] text-[#5a5047] leading-[1.8]">
                I live in the space between design and engineering — the part
                where a pixel decision actually ships, and a coded interaction
                finally feels{" "}
                <em className="text-[#1a1410] not-italic font-medium">right</em>
                .
              </motion.p>

              <motion.p className="text-[16px] text-[#5a5047] leading-[1.8]">
                In my free time, I get a kick out of editing videos—it&apos;s a
                fun way for me to express my creativity. When I&apos;m not at my
                desk, you can find me sketching or sipping on what I promise
                will be my last coffee.
              </motion.p>

              <div className="flex items-center gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/assets/Sakhan-wb.pdf"
                    className="bg-[#1a1410] text-white text-sm font-medium px-8 py-4 rounded-full hover:bg-[#1a2b56] transition-colors shadow-lg inline-block"
                  >
                    My CV →
                  </Link>
                </motion.div>
                <Link
                  href="#projects"
                  className="text-base font-medium text-[#5a5047] underline underline-offset-4 decoration-[#1a2b56]/50 hover:text-[#1a1410]"
                >
                  See My work
                </Link>
              </div>
            </div>

            {/* Profile Image Side */}
            <div className="relative max-w-65 w-full mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                whileInView={{ opacity: 1, rotate: -20 }}
                className="absolute -top-3 left-2 w-24 h-24 z-20 pointer-events-none"
              >
                <Image
                  src="/assets/here.png"
                  alt="sketch"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <div className="relative rounded-[24px] overflow-hidden aspect-3/4 bg-[#e8e0d8]">
                <Image
                  src="/assets/me-3.jpg"
                  alt="roth"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#c97b3a]/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-black/5 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="border-t border-black/8 pt-12 mt-12">
          <p className="text-s uppercase tracking-widest text-[#9b8ea0] mb-6 font-medium">
            * A few things about me
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {personalityCards.map((card, i) => {
              const isEditing = card.label === "Editing";
              const isFavSong = card.label === "My Favorite song right now";
              const isFavShow = card.label === "Favorite TV show";
              const isInteractive = isEditing || isFavShow;

              return (
                <motion.div
                  key={card.label}
                  onClick={() => isInteractive && setActiveCard(card.label)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group relative border border-black/4 rounded-[28px] p-8 transition-all duration-300 h-full
                    ${isInteractive ? "cursor-pointer" : "cursor-default"}
                    ${
                      isEditing
                        ? "md:col-span-2 bg-[#e8e0d8]/30"
                        : isFavSong
                          ? "bg-[#d2dde4]/30"
                          : isFavShow
                            ? "bg-[#1a2b56]/5"
                            : "bg-white/60"
                    }
                    hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <p className="text-[11px] text-[#2a6d96] uppercase tracking-[0.25em] mb-2.5 font-medium">
                    {card.label}
                  </p>
                  <p
                    className={`font-medium leading-tight ${isFavShow ? "text-[#1a2b56] text-base" : "text-[#1a1410] text-base"}`}
                  >
                    {card.value}
                  </p>

                  {isFavSong && (
                    <div className="absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 rotate-12 bg-white rounded-lg border border-black/5 p-1 shadow-lg group-hover:rotate-6 transition-transform">
                      <Image
                        src="https://i.pinimg.com/736x/b8/fd/89/b8fd894762b443a6250fa6b8bf070598.jpg"
                        alt="song art"
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  )}

                  {isEditing && (
                    <span className="absolute bottom-6 right-6 text-[10px] bg-[#1a2b56] text-white px-3 py-1 rounded-full font-bold italic shadow-lg">
                      In Process...
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-4xl bg-[#F7F5F0] rounded-[32px] overflow-hidden shadow-2xl border border-white/20 z-10"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-20 text-black/50 hover:text-black p-2"
              >
                ✕
              </button>

              <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh] custom-scrollbar">
                {activeCard === "Favorite TV show" && (
                  <div className="space-y-12">
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-4xl italic text-[#1a1410]">
                        Television Favorites
                      </h2>
                      <p className="text-[#5a5047] text-sm font-medium">
                        Stories that keep me inspired.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      {[
                        { title: "Suits", poster: "/assets/suit.jpg" },
                        {
                          title: "Cunk on Earth",
                          poster: "/assets/cunk-1.jpg",
                        },
                        {
                          title: "Jujutsu Kaisen",
                          poster: "/assets/jujutsu.jpg",
                        },
                      ].map((show, index) => (
                        <motion.div
                          key={show.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex flex-col items-center text-center"
                        >
                          <div className="relative aspect-2/3 w-full max-w-45 rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-stone-200">
                            <Image
                              alt={show.title}
                              src={show.poster}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-[#1a1410]">
                              {show.title}
                            </h4>
                            <p className="text-[10px] uppercase text-[#9b8ea0] mt-1 font-bold tracking-[0.2em]">
                              Series
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeCard === "Editing" && (
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl italic text-[#1a1410]">
                          Video Edits
                        </h2>
                        <p className="text-[#5a5047] text-sm font-medium">
                          Exploring rhythm, motion, and color.
                        </p>
                      </div>
                      <p className="text-xs text-[#9b8ea0] leading-relaxed max-w-md">
                        Alight Motion, Video Star, After Effects, and Premiere
                        Pro are my go-to tools for bringing stories to life.
                      </p>
                    </div>

                    <div className="columns-2 gap-6 space-y-6">
                      {[
                        {
                          title: "Nanami Edit",
                          path: "/assets/nanami-1.mp4",
                          type: " Trying out new techniques and styles",
                        },
                        {
                          title: "Street Cinematics",
                          path: "/assets/miku.mp4",
                          type: "Trying Null Composite Mode",
                        },
                        {
                          title: "Motion Practice",
                          path: "/assets/nanami-2.mp4",
                          type: "",
                        },
                        {
                          title: "More coming soon...",
                          path: "",
                          type: "Motion-Graph",
                        },
                      ].map((edit) => (
                        <div key={edit.title} className="break-inside-avoid">
                          <VideoCard
                            src={edit.path}
                            title={edit.title}
                            type={edit.type}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div id="projects" ref={projectsRef}>
        <Projects />
      </div>
      <div className="bg-[#FCF9F3]">
        <WorkFlow />
      </div>
      <Footer />
    </div>
  );
};

const VideoCard = ({
  src,
  title,
  type,
}: {
  src: string;
  title: string;
  type: string;
}) => {
  const isValidSrc = src && src !== "" && !src.includes("VIDEO_ID");

  return (
    <div className="group flex flex-col space-y-3">
      <div className="relative rounded-2xl overflow-hidden shadow-md border border-black/5 bg-stone-200">
        {isValidSrc ? (
          <video
            onMouseEnter={(e) => {
              const video = e.currentTarget;
              // .play() returns a promise. We store it to check later.
              const playPromise = video.play();

              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  // Auto-play was prevented or interrupted
                  console.log("Playback prevented:", error);
                });
              }
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget;
              // We only pause if the video is already playing or ready
              if (video.readyState >= 2) {
                video.pause();
                video.currentTime = 0;
              }
            }}
            src={src}
            loop
            playsInline
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-video w-full flex items-center justify-center bg-[#1a2b56]/5 text-[#1a2b56]/40 italic text-xs p-4 text-center">
            Video coming soon: {title}
          </div>
        )}

        {isValidSrc && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-8 border-l-white border-b-[5px] border-b-transparent ml-1" />
            </div>
          </div>
        )}
      </div>

      <div className="px-1">
        <h4 className="text-sm font-medium text-[#1a1410]">{title}</h4>
        <p className="text-[9px] uppercase tracking-widest text-[#9b8ea0] font-bold">
          {type}
        </p>
      </div>
    </div>
  );
};

export default AboutView;
