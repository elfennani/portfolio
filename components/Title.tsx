import { ReactElement, ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-medium text-zinc-700">{children}</h2>
);

export default Title;
