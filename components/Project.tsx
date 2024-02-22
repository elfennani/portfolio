import Link from "@/components/Link";

interface ProjectProps {
  title: string;
  children: string;
}
const Project = ({ title, children }: ProjectProps) => (
  <div className="flex flex-col gap-4">
    <div className="relative pt-[66%] h-0 overflow-hidden rounded">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-200" />
    </div>
    <p className="text-zinc-700 font-medium leading-6">{title}</p>
    <p className="leading-7 text-zinc-500 line-clamp-4">{children}</p>
    <Link href="#">See More</Link>
  </div>
);

export default Project;
