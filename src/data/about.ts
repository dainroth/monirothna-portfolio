import { projects } from "@/data/projects";
import { workExperiences } from "@/data/experience";

export const tags = [
  { label: "Developer", bg: "#F2CF63" },
  { label: "Designer", bg: "#F2A7B8" },
  { label: "Video editor", bg: "#9FD8C2" },
  { label: "Phnom Penh", bg: "#A9C1EE" },
];

export const stats = [
  {
    // Counted from starting university in 2023.
    value: new Date().getFullYear() - 2023,
    suffix: "+",
    label: "Years writing code",
  },
  { value: projects.length, suffix: "", label: "Projects built" },
  { value: workExperiences.length, suffix: "", label: "Teams worked with" },
];

export const currently = {
  building: {
    title: "Sneak-a-Tab",
    text: "My own little game, made in Godot",
    href: "/work/sneak-a-tab",
  },
  learning: {
    title: "Space simulators",
    text: "How they work, and the physics behind them",
  },
};

export const workStyle = "In a team, talking things through, not disappearing into a cave.";

export const nextUp = "Building more UI, and digging into machine learning & AI.";

export const song = {
  title: "God Was Showing Off",
  artist: "Bruno Mars",
  art: "/assets/now-playing.jpg",
  /** The part after /track/ in a Spotify share link. */
  spotifyId: "1sVBT215CDmVJvfy1E2OCU",
};

export const shows = [
  { title: "Suits", poster: "/assets/suit.jpg" },
  { title: "Cunk on Earth", poster: "/assets/cunk-1.jpg" },
  { title: "Jujutsu Kaisen", poster: "/assets/jujutsu.jpg" },
];

export const edits = [
  {
    title: "Nanami Edit",
    path: "/assets/nanami-1.mp4",
    type: "Trying out new techniques and styles",
  },
  {
    title: "Street Cinematics",
    path: "/assets/miku.mp4",
    type: "Trying Null Composite Mode",
  },
  {
    title: "Motion Practice",
    path: "/assets/nanami-2.mp4",
    type: "Motion practice",
  },
];
