import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/data/projects";
import CaseStudyView from "@/components/views/CaseStudyView";
import { siteName } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    // Share previews use the project's cover when it has one, else the site-wide image.
    ...(project.cover && {
      openGraph: {
        title: `${project.title} — ${siteName}`,
        description: project.summary,
        images: [{ url: project.cover, alt: `${project.title} cover` }],
      },
    }),
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyView project={project} next={getNextProject(slug)} />;
}
