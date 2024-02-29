import React from "react";

import { SiBuymeacoffee } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";

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
        <a href="https://linkedin.com/in/chester-hansen" target="_blank">
          <RiLinkedinFill className="size-6 rounded-sm bg-font-100 fill-background-950 p-[2px] hover:bg-accent-500" />
        </a>
        <a href="https://github.com/chett23/notflix" target="_blank">
          <FaGithub className="size-6 rounded-sm bg-font-100 fill-background-950 p-[2px] hover:bg-accent-500" />
        </a>
        <a href="https://www.buymeacoffee.com/chansendev" target="_blank">
          <SiBuymeacoffee className="size-6 rounded-sm bg-font-100 fill-background-950 p-[2px] hover:bg-accent-500" />
        </a>
      </div>
      <span className="self-center text-xs font-thin">
        provider information provided by{" "}
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          rel="noreferrer"
          alt="Just Watch webpage"
          className="hover:text-accent-500"
        >
          Just Watch
        </a>
      </span>
    </div>
  );
}
