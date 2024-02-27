import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="m-auto flex h-2/3 w-2/3 flex-col">
      <span className="text-xl text-font-400">
        We encountered an Error. Please go back <Link to={"/"}>Home.</Link>
      </span>
    </div>
  );
};

export default Error;
