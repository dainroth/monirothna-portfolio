export type Experience = {
  date: string;
  title: string;
  company: string;
  description: string;
  kind: "work" | "education";
  /** Accent for the card border + monogram. */
  color: string;
  stack?: string[];
  /** e.g. "Phnom Penh, Cambodia" or "Remote" — shown in caps under the role. */
  location?: string;
  /** Path under public/, e.g. "/assets/logos/floresta.png". Falls back to a monogram. */
  logo?: string;
  current?: boolean;
};

// Newest first.
export const experiences: Experience[] = [
  {
    date: "May 2026 — Present",
    title: "Developer Intern",
    company: "Floresta",
    description:
      "Helping build True Khmer, a new platform launching soon. It's my first project in React Router, so I picked it up on the job, and working on a product from the very start has taught me a lot.",
    kind: "work",
    color: "#2f9e5b",
    stack: ["React Router", "Framer Motion"],
    current: true,
  },
  {
    date: "Jan 2026 — Apr 2026",
    title: "Junior Developer",
    company: "Nano Sound Co. Ltd",
    description:
      "Built and maintained the admin system for NTX sales. I shipped the new features the sales team asked for, and jumped in to fix things whenever the system broke.",
    kind: "work",
    color: "#4464a8",
    stack: ["React", "Next.js", "GraphQL", "TypeScript", "Tailwind"],
  },
  {
    date: "Sep 2025 — Dec 2025",
    title: "Junior Front-End Developer",
    company: "Bong IT Solutions",
    description:
      "My first job in tech. I helped out on the company's internal systems and learned how real projects and teams work day to day.",
    kind: "work",
    color: "#8b5cf6",
    stack: ["React", "Next.js", "Git", "Tailwind"],
  },
  {
    date: "2024 — 2025",
    title: "Upskilling Project",
    company: "Tux Global Institute",
    description:
      "Completed a data science and machine learning course, gaining proficiency in Python, data analysis, and machine learning algorithms.",
    kind: "education",
    color: "#0E9F9A",
  },
  {
    date: "2023",
    title: "Started University",
    company: "Setec Institute",
    description:
      "Started my journey in software development, learning the fundamentals of programming and web technologies.",
    kind: "education",
    color: "#e5484d",
  },
];

export const workExperiences = experiences.filter((e) => e.kind === "work");
