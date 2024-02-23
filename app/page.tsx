/* eslint-disable @next/next/no-img-element */
import Title from "../components/Title";
import Input from "../components/Input";
import Project from "../components/Project";
import Link from "../components/Link";
import fs from "fs/promises";
import parseMD from "parse-md";
import StyledMarkdown from "@/components/StyledMarkdown";
import { DescriptionMetadata, Markdown, ProjectMetadata } from "@/types";
import Container from "@/components/Container";
import Footer from "@/components/Footer";

const screenshotsDir = process.cwd() + "/public/screenshots";
const dataDir = process.cwd() + "/data";
const projectsDir = dataDir + "/projects";

async function mapProjects(project: string) {
  const slug = project.split(".")[0];
  const content = await fs.readFile(projectsDir + `/${project}`, "utf-8");
  const md = parseMD(content) as Markdown<ProjectMetadata>;
  const screenshots = (await fs.readdir(screenshotsDir + `/${slug}`)).map(
    (ss) => ({
      path: `/screenshots/${slug}/${ss}`,
      thumbnail: md.metadata.thumbnail == ss,
    })
  );

  return {
    ...md.metadata,
    content: md.content,
    screenshots,
    slug,
  };
}

export default async function Home() {
  const file = await fs.readFile(dataDir + "/description.md", "utf-8");
  const {
    content,
    metadata: { heading, resume, photo },
  } = parseMD(file) as Markdown<DescriptionMetadata>;

  const projectsAsync = (await fs.readdir(projectsDir)).map(mapProjects);
  const projects = (await Promise.all(projectsAsync)).sort(
    (p1, p2) => p2.created.getTime() - p1.created.getTime()
  );

  return (
    <Container>
      <header className="flex flex-col gap-6">
        <img
          src={photo}
          alt="Photo"
          className="size-20 rounded-full bg-zinc-200 grayscale"
        />
        <h1 className="text-2xl font-medium text-zinc-700">{heading}</h1>
        <StyledMarkdown>{content}</StyledMarkdown>
        <div className="flex gap-8">
          <Link href="#contact">Contact Me</Link>
          <Link href={resume}>Download Resume</Link>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        <Title>Some of my projects</Title>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {projects.map((project) => {
            const thumbnail = project.screenshots.find(
              (ss) => ss.thumbnail
            )?.path;

            return (
              <Project
                key={project.slug}
                title={project.title}
                thumbnail={thumbnail ?? project.screenshots[0].path}
                slug={project.slug}
              >
                {project.content}
              </Project>
            );
          })}
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <Title>Education</Title>
        <div className="flex gap-6">
          <div className="size-16 rounded-full bg-zinc-200"></div>
          <div className="flex flex-col gap-3 flex-1">
            <h3 className="font-medium text-zinc-700">
              Specialized Institute of Applied Technology
            </h3>
            <p className="text-zinc-500">Full Stack Web Development Diploma</p>
            <p className="text-zinc-500 text-xs">Sept 2021 - Sept 2023</p>
            <p className="leading-7 text-zinc-500 line-clamp-4">
              This program equipped me with comprehensive skills in web
              development and design, covering areas such as HTML, CSS,
              JavaScript, and UI/UX principles. Through hands-on projects and
              industry-relevant coursework, I gained practical experience in
              creating dynamic and responsive websites, preparing me for a
              successful career in the ever-evolving field of technology.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
