import React, { ReactNode } from "react";
import Footer from "./Footer";

type Props = {
  children?: ReactNode | ReactNode[] | null;
};

const Container = ({ children }: Props) => {
  return (
    <main className="w-[900px] max-w-full pt-24 mx-auto h-16 flex flex-col gap-32 max-[932px]:p-4 max-[900px]:pt-12 max-[932px]:gap-24">
      {children}
      <Footer />
    </main>
  );
};

export default Container;
