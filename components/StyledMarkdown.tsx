import { ClassAttributes, HTMLAttributes } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";

type StrongProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

interface Props {
  children: string;
  clamp?: boolean;
}

const StyledMarkdown = ({ children, clamp = false }: Props) => {
  const strong = (props: StrongProps) => (
    <strong {...props} className="font-medium text-zinc-700" />
  );
  return (
    <ReactMarkdown
      components={{ strong }}
      className={`leading-7 text-zinc-500 ${clamp ? "line-clamp-4" : ""}`}
    >
      {children}
    </ReactMarkdown>
  );
};

export default StyledMarkdown;
