import React from "react";
import Title from "./Title";
import Input from "./Input";
import Link from "./Link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col gap-2">
      <form
        id="contact"
        className="bg-zinc-100 p-6 flex flex-col gap-6 rounded"
      >
        <div className="flex flex-col gap-3">
          <Title>Looking for help?</Title>
          <p className="text-zinc-500">Send me details now</p>
        </div>
        <Input label="Name" placeholder="John Doe" name="name" />
        <Input label="Email" placeholder="example@abcd.xyz" name="email" />
        <Input
          label="Details"
          placeholder="Enter your message"
          name="details"
          textarea
        />
        <button
          type="submit"
          className="text-zinc-700 self-end font-medium leading-6 underline transition-colors hover:text-zinc-500"
        >
          Submit
        </button>
      </form>
      <nav className="flex justify-between py-6 max-[932px]:flex-col max-[932px]:items-center gap-6">
        <p className="text-zinc-500">Made with Next.js</p>
        <ul className="flex gap-x-16 gap-y-2 items-center justify-center flex-wrap max-[932px]:gap-x-8">
          <li>
            <Link href="#">Source Code</Link>
          </li>
          <li>
            <Link href="#">LinkedIn</Link>
          </li>
          <li>
            <Link href="#">GitHub</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
