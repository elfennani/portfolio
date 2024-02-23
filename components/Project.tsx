/* eslint-disable @next/next/no-img-element */
import Link from "@/components/Link";
import StyledMarkdown from "./StyledMarkdown";
import Image from "next/image";

interface ProjectProps {
  title: string;
  thumbnail: string;
  children: string;
  slug: string;
}
const Project = ({ title, children, thumbnail, slug }: ProjectProps) => (
  <div className="flex flex-col gap-4">
    <div className="relative pt-[66%] h-0 overflow-hidden rounded">
      <img
        src={thumbnail}
        alt={title}
        className="bg-zinc-200 object-cover absolute top-0 left-0 right-0 bottom-0"
      />
    </div>
    <p className="text-zinc-700 font-medium leading-6">{title}</p>
    <StyledMarkdown clamp>{children}</StyledMarkdown>
    <Link href={`/project/${slug}`}>See More</Link>
  </div>
);

export default Project;
