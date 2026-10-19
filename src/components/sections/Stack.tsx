"use client";
import LogoLoop from "@/components/ui/LogoLoop";
import Image from "next/image";
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
} from "react-icons/si";

const techLogos = [
  {
    node: <SiReact />,
    title: "React",
    href: "https://react.dev",
    color: "#61DAFB",
  },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiGraphql />,
    title: "GraphQL",
    href: "https://graphql.org",
  },
  {
    node: <SiSpringboot />,
    title: "Spring Boot",
    href: "https://spring.io/projects/spring-boot",
  },
  {
    node: <SiNodedotjs />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <SiFigma />,
    title: "Figma",
    href: "https://www.figma.com",
  },
  {
    node: <SiMysql />,
    title: "MySQL",
    href: "https://www.mysql.com",
  },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: <SiGit />,
    title: "Git",
    href: "https://git-scm.com",
  },
];

const Stack = () => {
  return (
    <section className="overflow-hidden py-4 bg-[#FAFAFA]">
      <div className="flex flex-col items-center mb-4">
        <Image
          src="/assets/snoopy-skill.webp"
          alt="skill"
          width={200}
          height={200}
          className="mb-2"
        />
        <span className="font-mono mb-8 text-base text-[#1a2b56] uppercase tracking-widest">
          Sneak peek of my stack
        </span>
      </div>

      <div
        style={{
          height: "120px",
          position: "relative",
          overflow: "hidden",
          color: "#1a2b56",
        }}
      >
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={50}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#FAFAFA"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default Stack;
