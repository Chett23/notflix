import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { HiSearch } from "react-icons/hi";
import { apiOptions } from "../Constants/data";
import { getSearchResults } from "../utils/loaderFunctions";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [showBar, setShowBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = useDebouncedCallback(async (value) => {
    setSearchValue(value);

    const results = await getSearchResults(apiOptions, value);

    setSearchResults(results);
  }, 300);

  return (
    <div class="relative mx-auto pt-2 text-font-100">
      {showBar ? (
        <>
          <input
            className={`h-10 rounded-lg border bg-transparent px-5 pr-16 text-sm focus:outline-none`}
            type="search"
            name="search"
            placeholder="Search"
            autoFocus
            onf
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            onClick={() => setShowBar((prev) => !prev)}
            type="submit"
            class="absolute right-0 top-0 mr-4 mt-4"
          >
            <HiSearch className="h-6 w-6 text-font-50" />
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setShowBar((prev) => !prev);
          }}
          type="submit"
          className="mr-4 mt-1.5"
        >
          <HiSearch className="h-6 w-6 text-font-50" />
        </button>
      )}
      <div
        className={`absolute ${searchResults.results && showBar && searchValue.length > 0 ? "visible" : "hidden"} top-14 z-10 w-full rounded-md bg-background-800 p-2`}
      >
        {searchResults?.results &&
          searchResults?.results
            .sort((a, b) => a.vote_count - b.vote_count)
            .map((result) => {
              const media_type =
                result.media_type === "person"
                  ? "people"
                  : result.media_type === "tv"
                    ? "shows"
                    : result.media_type === "movie" && "movies";
              const media_date =
                result?.release_date?.split("-")[0] ||
                (result?.first_air_date &&
                  result?.first_air_date?.split("-")[0]) ||
                result?.air_date?.split("-")[0];
              return (
                <Link
                  to={`${media_type}/${result.id}`}
                  onClick={() => {
                    setSearchValue("");
                    setShowBar(false);
                  }}
                >
                  <div
                    className="cursor-pointer px-2 py-1 text-left hover:text-accent-500 hover hover:bg-background-900 rounded-md"
                    key={result.id}
                  >
                    {result.title || result.name}
                    {media_date && ` (${media_date})`}
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default SearchBar;
