import React from "react";
import { Github, Linkedin } from "../utils/SVGs";

export function Footer() {
  return (
    <div className="mx-auto h-auto p-24 text-font-50">
      <span className="self-center">
        Made with love by{" "}
        <a
          href="https://portfolio.chansendev.com"
          target="_blank"
          rel="noreferrer"
          alt="chansendev webpage"
          className="hover:text-accent-500"
        >
          Chester Hansen
        </a>
      </span>
      <div className="flex justify-center gap-4 p-2">
        <Linkedin classes="size-6 fill-font-100 hover:fill-accent-500" />
        <Github classes="size-6 fill-font-100 hover:fill-accent-500" />
      </div>
    </div>
  );
}
