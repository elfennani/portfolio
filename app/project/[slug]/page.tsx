/* eslint-disable @next/next/no-img-element */
import Container from "@/components/Container";
import Link from "@/components/Link";
import StyledMarkdown from "@/components/StyledMarkdown";
import Title from "@/components/Title";
import { Markdown, ProjectMetadata } from "@/types";
import fs from "fs/promises";
import NextLink from "next/link";
import parseMD from "parse-md";

interface Props {
  params: {
    slug: string;
  };
}

const dataDir = process.cwd() + "/data";
const projectsDir = dataDir + "/projects";
const screenshotsDir = process.cwd() + "/public/screenshots";

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
    />
  </svg>
);

export default async function ProjectPage({ params: { slug } }: Props) {
  const project = await fs.readFile(projectsDir + `/${slug}.md`, "utf-8");
  const screenshots = await fs.readdir(screenshotsDir + `/${slug}`);
  const {
    content,
    metadata: { created, thumbnail, title },
  } = parseMD(project) as Markdown<ProjectMetadata>;

  return (
    <Container>
      <header className="flex flex-col gap-4">
        <NextLink
          href="/"
          className="hover:bg-zinc-50 mb-8 font-medium cursor-pointer transition-colors flex rounded items-center px-4 py-2 gap-3 self-start"
        >
          <BackIcon />
          Back to Home
        </NextLink>
        <img
          src={`/icons/${slug}.png`}
          alt={title}
          className="rounded-lg size-24"
        />
        <Title>{title}</Title>
        <StyledMarkdown>{content}</StyledMarkdown>
        <div className="flex gap-8">
          <Link href="#">Live Version</Link>
          <Link href="#">Source Code</Link>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        <Title>
          Screenshots{" "}
          <sup className="text-sm font-medium">{screenshots.length}</sup>
        </Title>
        <div className="flex flex-col gap-2">
          {screenshots.map((ss) => (
            <img
              src={`/screenshots/${slug}/${ss}`}
              key={ss}
              alt={slug}
              className="rounded"
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

export async function generateStaticParams() {
  const projects = await fs.readdir(projectsDir);
  return projects.map((p) => ({ slug: p.split(".")[0] }));
}
