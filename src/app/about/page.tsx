import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Developer, designer and video editor in Phnom Penh. Where I've worked, what I'm building and what I'm into.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
