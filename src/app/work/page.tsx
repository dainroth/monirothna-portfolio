import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Work",
  description: "Every project I've built: web apps, design work, school projects and games.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkView />;
}
