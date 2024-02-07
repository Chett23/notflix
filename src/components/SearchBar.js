import React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  return (
    <div class="relative mx-auto pt-2 text-font-100">
      <input
        class="h-10 rounded-lg bg-transparent px-5 pr-16 text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" class="absolute right-0 top-0 mr-4 mt-4">
        <MagnifyingGlassIcon className="h-6 w-6 text-font-50" />
      </button>
    </div>
  );
};

export default SearchBar;
