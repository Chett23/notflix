import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Footer } from "../components/Footer";

const Error = () => {
  return (
    <div className={" min-h-screen bg-background-950 text-center"}>
      <Navbar />
      <ScrollToTop />
      <div className="m-auto flex min-h-[75svh] w-2/3 flex-col pt-24">
        <span className="text-xl text-font-100">
          We encountered an Error. Please go back <Link to={"/"}>Home.</Link>
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
