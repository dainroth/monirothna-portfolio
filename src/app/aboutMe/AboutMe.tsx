/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section
      className="bg-[#F7F5F0] py-24 px-6 flex flex-col items-center relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(28,28,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,26,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Mono label */}
      <motion.p
        className="font-comic-relief text-lg tracking-[0.2em] uppercase text-[#1a2b56] mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        About me
      </motion.p>

      <div className="relative w-full max-w-2xl h-87.5 mx-auto mb-12">
        {/* <div
          className="absolute inset-0 opacity-[0.04] rounded-3xl"
          style={{
            backgroundImage:
              "linear-gradient(#1c1c1a 1px, transparent 1px), linear-gradient(90deg, #1c1c1a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        /> */}

        {/* Center photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#e0dbd3] z-10"
        >
          {/* swap with: <img src="/assets/me.jpg" className="w-full h-full object-cover" alt="Sakhan" /> */}
          <div className="w-full h-full bg-[#e8e2d8] flex items-center justify-center">
            <img
              src="/assets/me.webp"
              alt="Sakhan"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Scattered image: anime photo — top left */}
        <FloatImg
          src="/assets/laptop.webp"
          style={{ top: "4%", left: "2%", width: 110 }}
          rotate={-8}
          delay={0.2}
          rounded="rounded-xl"
        />

        {/* Scattered image: macro — top right */}
        <FloatImg
          src="/assets/macro.webp"
          style={{ top: "2%", right: "4%", width: 90 }}
          rotate={10}
          delay={0.35}
        />

        {/* Scattered image: tablet — right */}
        <FloatImg
          src="/assets/tablet.webp"
          style={{ top: "38%", right: "2%", width: 110 }}
          rotate={-6}
          delay={0.5}
        />

        {/* Scattered image: macro again — bottom right area */}
        <FloatImg
          src="https://i.pinimg.com/736x/24/c1/14/24c11417496bc4a19a3287e4c05a1c69.jpg"
          style={{ bottom: "6%", right: "12%", width: 70 }}
          rotate={12}
          delay={0.6}
        />

        {/* Sticky note CTA — bottom left, slightly rotated */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: 10 }}
          whileInView={{ opacity: 1, rotate: -3, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute -bottom-[20px] left-[4px] bg-white border border-[#e0dbd3] rounded-xl px-4 py-3.5 w-[180px] z-20"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#C4763A] mb-2.5" />
          <p className="text-[12px] font-comic-relief text-[#555] leading-relaxed mb-2.5">
            Open to work — let&apos;s build something great.
          </p>
          <a
            href="/assets/Sakhan-wb.pdf"
            className="font-mono flex gap-2 text-base tracking-wide text-[#C4763A] hover:opacity-70 transition-opacity"
          >
            My CV
            <ArrowRight />
          </a>
        </motion.div>
      </div>

      {/* Bio — below the collage */}
      <motion.p
        className="text-center text-[15px] font-comic-relief text-[#666] leading-relaxed max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        I&apos;m Monirothna, a developer and university student in Phnom Penh. I
        appreciate the details that shape our experiences. When I&apos;m not
        coding, I enjoy editing videos, finding great coffee to share with
        friends, and discovering new music.
      </motion.p>
    </section>
  );
}

function FloatImg({
  src,
  style,
  rotate,
  delay,
  rounded = "rounded-lg",
}: {
  src: string;
  style: React.CSSProperties;
  rotate: number;
  delay: number;
  rounded?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.7 },
        y: {
          repeat: Infinity,
          duration: 5 + delay * 2,
          ease: "easeInOut",
          delay,
        },
      }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none z-0 ${rounded}`}
      style={{ ...style, rotate: `${rotate}deg` }}
    >
      <img
        src={src}
        alt=""
        className={`w-full h-auto object-contain ${rounded}`}
        style={{ filter: "saturate(0.85) sepia(0.08)" }}
      />
    </motion.div>
  );
}
