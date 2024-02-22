interface LinkProps {
  href: string;
  children: string;
}

const Link = (props: LinkProps) => (
  <a
    href={props.href}
    className="text-zinc-700 font-medium leading-6 underline transition-colors hover:text-zinc-500"
  >
    {props.children}
  </a>
);

export default Link;
