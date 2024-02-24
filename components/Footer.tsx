"use client";
import React, { FormEventHandler, useState } from "react";
import Title from "./Title";
import Input from "./Input";
import Link from "./Link";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  type SubmitEvent = FormEventHandler<HTMLFormElement>;
  const onSubmitHandler: SubmitEvent = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResponse(null);

    if (!email.trim() || !message.trim()) {
      setResponse("Email and Details are required!");
      return;
    }
    setIsSending(true);

    try {
      await fetch("https://formcarry.com/s/j9XyeldV8zn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      setResponse("I received your submission, thank you!");
    } catch (error) {
      setResponse("Failed to send your submission, try again!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer className="flex flex-col gap-2">
      <form
        id="contact"
        className="bg-zinc-100 p-6 flex flex-col gap-6 rounded"
        onSubmit={onSubmitHandler}
        action="https://formcarry.com/s/j9XyeldV8zn"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-3">
          <Title>Looking for help?</Title>
          <p className="text-zinc-500">Send me details now</p>
        </div>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          name="name"
        />
        <Input
          label="Email*"
          value={email}
          onChangeText={setEmail}
          placeholder="example@abcd.xyz"
          name="email"
        />
        <Input
          label="Details*"
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          name="details"
          textarea
        />
        <div className="flex justify-between items-center">
          <p className="font-medium">{response}</p>
          <button
            type="submit"
            className="text-zinc-700 disabled:opacity-50 font-medium leading-6 underline transition-colors hover:text-zinc-500"
            disabled={isSending}
          >
            Submit
          </button>
        </div>
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
