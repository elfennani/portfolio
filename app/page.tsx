import Title from "../components/Title";
import Input from "../components/Input";
import Project from "../components/Project";
import Link from "../components/Link";
import fs from "fs/promises";
import yaml from "js-yaml";
import { ReactNode } from "react";

interface Info {
  heading: string;
  fullname: string;
  description: string;
  resume: string;
}

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/data/info.yaml", "utf-8");
  const info = yaml.load(file) as Info;

  const description = info.description
    .split(info.fullname)
    .flatMap((element, index, array) => {
      return index < array.length - 1
        ? [
            element,
            <span key={`name-${index}`} className="font-medium text-zinc-700">
              {info.fullname}
            </span>,
          ]
        : [element];
    });

  return (
    <main className="w-[900px] max-w-full pt-24 mx-auto h-16 flex flex-col gap-32 max-[932px]:p-4 max-[900px]:pt-12 max-[932px]:gap-24">
      <header className="flex flex-col gap-6">
        <div className="size-20 rounded-full bg-zinc-200"></div>
        <h1 className="text-2xl font-medium text-zinc-700">{info.heading}</h1>
        <p className="leading-7 text-zinc-500">{description}</p>
        <div className="flex gap-8">
          <Link href="#contact">Contact Me</Link>
          <Link href="#Resume">Download Resume</Link>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        <Title>Some of my projects</Title>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          <Project title="Elysian Eats (Food Delivery App)">
            Revolutionizing the way people experience food delivery, Elysian
            Eats is a dynamic app designed to connect users with their favorite
            local eateries. With seamless navigation and real-time order
            tracking, this platform ensures a delightful dining experience for
            all.
          </Project>
          <Project title="Aurora: (E-commerce Platform)">
            Aurora redefines online shopping by offering a curated selection of
            premium products coupled with personalized recommendations. With its
            sleek interface and robust backend, users can easily discover,
            purchase, and share their favorite items with ease.
          </Project>
          <Project title="Nimbus Notes (Productivity App)">
            Nimbus Notes empowers users to organize their thoughts, tasks, and
            ideas effortlessly. Featuring a minimalist design and powerful
            features like cross-platform syncing and collaborative editing, this
            app is your go-to companion for staying productive and organized.
          </Project>
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
      <footer className="flex flex-col gap-2">
        <form id="contact" className="bg-zinc-100 p-6 flex flex-col gap-6">
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
    </main>
  );
}
