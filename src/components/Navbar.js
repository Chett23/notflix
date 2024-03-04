import React from "react";

import { Link } from "react-router-dom";

import netflix_logo from "../images/netflix_assets/Netflix_Logo_RGB.png";

import { HiUser } from "react-icons/hi2";
import { HiSearch, HiOutlineBell, HiOutlineMenu } from "react-icons/hi";

import { useScrollPosition } from "../utils/useScrollPosition";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [width] = useWindowDimensions();

  return (
    <header
      className={`z-20 flex w-full flex-row justify-between bg-gradient-to-b h-20 from-background-950 md:fixed ${
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
            <HiOutlineMenu className="text-font-50" />
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
        {/* <HiSearch className="h-6 w-6 text-font-50" /> */}
        <SearchBar />
        <p className="text-sm text-font-50 ">Profile</p>
        <HiOutlineBell className={"h-6 w-6 text-font-50"} />
        <HiUser className="h-6 w-6 text-font-50" />
      </div>
    </header>
  );
};
