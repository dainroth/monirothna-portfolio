"use client";
import LogoLoop from "@/src/components/LogoLoop";
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
];

const Stack = () => {
  return (
    // REDUCED: py-8 to py-4 to hug the Hero and Experience sections
    <section className="overflow-hidden py-4 bg-[#FAFAFA]">
      {/* TIGHTENED: flex-col items-center now has less bottom margin */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src="/assets/snoopy-skill.webp"
          alt="skill"
          width={200} // SLIGHTLY SMALLER: 250 to 180 to reduce vertical "dead space"
          height={200}
          className="mb-2" // NEGATIVE MARGIN: Pulls the text closer to the image
        />
        <span className="font-mono mb-8 text-base text-[#1a2b56] uppercase tracking-widest">
          Sneak peek of my stack
        </span>
      </div>

      <div
        style={{
          // REDUCED: height 200px to 120px to remove the "giant white bar" feel
          height: "120px",
          position: "relative",
          overflow: "hidden",
          color: "#1a2b56",
        }}
      >
        <LogoLoop
          logos={techLogos}
          speed={40} // SLOWER: 60 to 40 for a more "premium/smooth" feel
          direction="left"
          logoHeight={50} // SMALLER: 60 to 50 for better visual balance
          gap={80} // WIDER GAP: Paradoxically, more space *between* icons looks cleaner than space *above* them
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#FAFAFA" // MATCHED: Set to your background color for seamless edges
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default Stack;
