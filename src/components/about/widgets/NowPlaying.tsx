"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiPause, FiPlay } from "react-icons/fi";
import { song } from "@/data/about";
import { formatTime, loadSpotifyApi, type SpotifyController } from "@/lib/spotify";
import WidgetLabel from "./WidgetLabel";

/**
 * "Now playing" card with our own controls. Spotify's official iFrame API drives a
 * tiny player behind the scenes; it's only revealed if the browser blocks playback.
 */
export default function NowPlaying() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const pausedRef = useRef(true);
  const nearby = useInView(cardRef, { once: true, margin: "300px" });

  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEmbed, setShowEmbed] = useState(false);

  // Load the player shortly before the card scrolls into view.
  useEffect(() => {
    if (!nearby || !hostRef.current) return;
    let cancelled = false;
    let controller: SpotifyController | null = null;

    loadSpotifyApi().then((api) => {
      if (cancelled || !hostRef.current) return;
      const mount = document.createElement("div");
      hostRef.current.appendChild(mount);
      api.createController(
        mount,
        { uri: `spotify:track:${song.spotifyId}`, width: "100%", height: 80 },
        (c) => {
          controller = c;
          controllerRef.current = c;
          c.addListener("ready", () => setReady(true));
          c.addListener("playback_update", (e) => {
            pausedRef.current = e.data.isPaused;
            setPaused(e.data.isPaused);
            setPosition(e.data.position);
            setDuration(e.data.duration);
          });
        },
      );
    });

    return () => {
      cancelled = true;
      controller?.destroy();
      controllerRef.current = null;
    };
  }, [nearby]);

  const toggle = () => {
    const c = controllerRef.current;
    if (!c) return;
    const wasPaused = pausedRef.current;
    c.togglePlay();
    // If the browser refuses to start audio from our button, show Spotify's
    // own player so the visitor can press play there.
    if (wasPaused) {
      setTimeout(() => {
        if (pausedRef.current) setShowEmbed(true);
      }, 2500);
    }
  };

  const playing = !paused;
  const progress = duration ? Math.min(100, (position / duration) * 100) : 0;

  return (
    <div
      ref={cardRef}
      className="relative flex h-full flex-col gap-5 rounded-3xl border-2 border-ink bg-navy p-5 text-cream shadow-brutal-lg sm:flex-row sm:items-center md:p-6"
    >
      {/* Spinning record */}
      <div
        className="relative h-28 w-28 shrink-0 animate-spin overflow-hidden rounded-full border-2 border-ink shadow-brutal md:h-32 md:w-32"
        style={{
          animationDuration: "8s",
          animationPlayState: playing && !reduce ? "running" : "paused",
        }}
      >
        <Image src={song.art} alt={`${song.title} cover art`} fill sizes="128px" className="object-cover" />
        <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-cream" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <WidgetLabel dark>My song right now</WidgetLabel>
          <Equalizer active={playing && !reduce} />
        </div>
        <p className="mt-3 truncate font-display text-2xl font-bold md:text-3xl">{song.title}</p>
        <p className="text-cream/70">{song.artist}</p>

        {/* Controls */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause song" : "Play song"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-ink transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-60"
          >
            {playing ? <FiPause /> : <FiPlay className="ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-cream/20">
              <div
                className="h-full rounded-full bg-sun transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-cream/50">
              <span>{formatTime(position)}</span>
              <a
                href={`https://open.spotify.com/track/${song.spotifyId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-cream"
              >
                via Spotify <FiArrowUpRight />
              </a>
              <span>{duration ? formatTime(duration) : "--:--"}</span>
            </div>
          </div>
        </div>

        {/* Spotify player: hidden unless playback had to fall back to it */}
        <div
          ref={hostRef}
          className={
            showEmbed
              ? "mt-4 overflow-hidden rounded-xl"
              : "pointer-events-none absolute bottom-0 left-0 h-px w-px overflow-hidden opacity-0"
          }
        />
        {showEmbed && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-cream/50">
            Your browser wants a tap on Spotify&apos;s play button first
          </p>
        )}
      </div>
    </div>
  );
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <span className="flex h-5 items-end gap-0.5" aria-hidden>
      {[0.5, 1, 0.7, 0.9].map((h, i) => (
        <motion.span
          key={i}
          className="w-1 origin-bottom rounded-full bg-sun"
          style={{ height: `${h * 100}%` }}
          initial={false}
          animate={active ? { scaleY: [1, 0.3, 1] } : { scaleY: 0.3 }}
          transition={{ duration: 0.6 + i * 0.15, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}
