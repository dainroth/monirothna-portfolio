import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiSpringboot,
  SiTypescript,
  SiFigma,
  SiNodedotjs,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiFramer,
  SiReactrouter,
  SiGodotengine,
} from "react-icons/si";

export type Tool = { name: string; icon?: IconType; href?: string };

export type StackGroup = {
  title: string;
  blurb: string;
  color: string;
  tools: Tool[];
};

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    blurb: "Where I spend most of my time: fast, animated, accessible UIs.",
    color: "#3355D6",
    tools: [
      { name: "React", icon: SiReact, href: "https://react.dev" },
      { name: "Next.js", icon: SiNextdotjs, href: "https://nextjs.org" },
      { name: "TypeScript", icon: SiTypescript, href: "https://www.typescriptlang.org" },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss, href: "https://tailwindcss.com" },
      { name: "Framer Motion", icon: SiFramer, href: "https://motion.dev" },
      { name: "React Router", icon: SiReactrouter, href: "https://reactrouter.com" },
    ],
  },
  {
    title: "Backend & data",
    blurb: "Enough of the server side to ship things end to end.",
    color: "#4464a8",
    tools: [
      { name: "Node.js", icon: SiNodedotjs, href: "https://nodejs.org" },
      { name: "GraphQL", icon: SiGraphql, href: "https://graphql.org" },
      { name: "Spring Boot", icon: SiSpringboot, href: "https://spring.io/projects/spring-boot" },
      { name: "PostgreSQL", icon: SiPostgresql, href: "https://www.postgresql.org" },
      { name: "MySQL", icon: SiMysql, href: "https://www.mysql.com" },
    ],
  },
  {
    title: "Design & tools",
    blurb: "Sketching it first, versioning it always, and the odd game.",
    color: "#F2A7B8",
    tools: [
      { name: "Figma", icon: SiFigma, href: "https://www.figma.com" },
      { name: "Illustrator" },
      { name: "Git", icon: SiGit, href: "https://git-scm.com" },
      { name: "Godot", icon: SiGodotengine, href: "https://godotengine.org" },
    ],
  },
];

export const allTools = stackGroups.flatMap((g) => g.tools);
