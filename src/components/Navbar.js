import React from "react";

import netflix_logo from "../images/netflix_assets/Netflix_Logo_RGB.png";
import { UserIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

import { useScrollPosition } from "../utils/useScrollPosition";
import { useWindowDimensions } from "../utils/useWindowDimensions";

export const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [width] = useWindowDimensions();

  return (
    <header
      className={`z-10 flex w-full flex-row justify-between bg-gradient-to-b from-background-950 md:fixed ${
        scrollPosition > 42 && " bg-background-950"
      } transition duration-300`}
    >
      <div className={"flex flex-row items-center space-x-6 p-4"}>
        <img src={netflix_logo} className={"w-24"} alt="netflix logo" />
        {width <= 870 ? (
          <></>
        ) : (
          <>
            <p className="text-xs text-font-50 md:text-sm ">Home</p>
            <p className="text-xs text-font-50 md:text-sm ">TV Shows</p>
            <p className="text-xs text-font-50 md:text-sm ">Movies</p>
            <p className="text-xs text-font-50 md:text-sm ">New & popular</p>
            <p className="text-xs text-font-50 md:text-sm ">My List</p>
            <p className="text-xs text-font-50 md:text-sm ">
              Browse by Language
            </p>
          </>
        )}
      </div>
      <div className={"flex flex-row items-center space-x-4 p-4"}>
        <MagnifyingGlassIcon className="h-6 w-6 text-font-50" />
        <p className="text-sm text-font-50 ">Kids</p>
        <BellIcon className={"h-6 w-6 text-font-50"} />
        <UserIcon className="h-6 w-6 text-font-50" />
      </div>
    </header>
  );
};
