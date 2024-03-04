import React, { useState } from "react";

import { Link } from "react-router-dom";

import netflix_logo from "../images/netflix_assets/Netflix_Logo_RGB.png";

import { HiUser } from "react-icons/hi2";
import { HiSearch, HiOutlineBell, HiOutlineMenu } from "react-icons/hi";

import { useScrollPosition } from "../utils/useScrollPosition";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const scrollPosition = useScrollPosition();
  const [width] = useWindowDimensions();

  return (
    <header
      className={`z-20 flex h-20 w-full flex-row justify-between bg-gradient-to-b from-background-950 md:fixed ${
        scrollPosition > 42 && " bg-background-950"
      } transition duration-300`}
    >
      <div className={"flex flex-row items-center space-x-6 p-4"}>
        <Link
          to={"/"}
          className="cursor-pointer text-xs text-font-50 hover:text-accent-500 md:text-sm"
        >
          <img src={netflix_logo} className={"w-24"} alt="netflix logo" />
        </Link>
        {width <= 768 ? (
          <>
            <div className="realative size-6 cursor-pointer rounded-md text-font-50 hover:bg-background-800 hover:text-accent-500">
              <HiOutlineMenu
                onClick={() => setShowHamburgerMenu((prev) => !prev)}
                className="m-auto mt-1"
              />
            </div>
            <div
              className={`absolute ${showHamburgerMenu ? "visible" : "hidden"} scrollbar-hide left-28 top-14 z-10 flex flex-col items-start rounded-md bg-background-800 p-2`}
            >
              <Link
                to={"/"}
                className="cursor-pointer p-2 text-xs text-font-50 hover:text-accent-500 md:text-sm"
                onClick={() => setShowHamburgerMenu(false)}
              >
                Home
              </Link>
              <Link
                to={"shows"}
                className="cursor-pointer p-2 text-xs text-font-50 hover:text-accent-500 md:text-sm"
                onClick={() => setShowHamburgerMenu(false)}
              >
                TV Shows
              </Link>
              <Link
                to={"movies"}
                className="cursor-pointer p-2 text-xs text-font-50 hover:text-accent-500 md:text-sm"
                onClick={() => setShowHamburgerMenu(false)}
              >
                Movies
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              to={"/"}
              className="cursor-pointer text-xs text-font-50 hover:text-accent-500 md:text-sm"
            >
              Home
            </Link>
            <Link
              to={"shows"}
              className="cursor-pointer text-xs text-font-50 hover:text-accent-500 md:text-sm"
            >
              TV Shows
            </Link>
            <Link
              to={"movies"}
              className="cursor-pointer text-xs text-font-50 hover:text-accent-500 md:text-sm"
            >
              Movies
            </Link>
          </>
        )}
      </div>
      <div className={"flex flex-row items-center space-x-4 p-4"}>
        <SearchBar />
      </div>
    </header>
  );
};
