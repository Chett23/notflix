import "./App.css";
import { Home } from "./pages/Home";
import { useScrollPosition } from "./utils/useScrollPosition";

import netflix_logo from "./images/netflix_assets/Netflix_Logo_RGB.png";
import { UserIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

function App() {

  return (
    <div className={"bg-background-950 h-auto text-center"}>
      <header
        className={`fixed z-10 flex w-full flex-row justify-between`}
      >
        <div className={"flex flex-row items-center space-x-6 p-4"}>
          <img src={netflix_logo} className={"w-24"} alt="netflix logo" />
          <p className="text-font-50 text-xs md:text-sm ">Home</p>
          <p className="text-font-50 text-xs md:text-sm ">TV Shows</p>
          <p className="text-font-50 text-xs md:text-sm ">Movies</p>
          <p className="text-font-50 text-xs md:text-sm ">New & popular</p>
          <p className="text-font-50 text-xs md:text-sm ">My List</p>
          <p className="text-font-50 text-xs md:text-sm ">Browse by Language</p>
        </div>
        <div className={"flex flex-row items-center space-x-4 p-4"}>
          <MagnifyingGlassIcon className="text-font-50 h-6 w-6" />
          <p className="text-font-50 text-sm ">Kids</p>
          <BellIcon className={"text-font-50 h-6 w-6"} />
          <UserIcon className="text-font-50 h-6 w-6" />
        </div>
      </header>
      <Home />
    </div>
  );
}

export default App;
