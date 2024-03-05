import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { HiSearch } from "react-icons/hi";
import { apiOptions } from "../Constants/data";
import { getSearchResults } from "../utils/loaderFunctions";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [showBar, setShowBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const navigate = useNavigate();

  const handleSearch = useDebouncedCallback(async (value) => {
    setSearchValue(value);

    const results = await getSearchResults(apiOptions, value);
    
    setSearchResults(results);
  }, 300);

  return (
    <div className="relative mx-auto pt-2 text-font-100">
      {showBar ? (
        <>
          <input
            className={`h-10 rounded-lg border bg-transparent px-5 pr-10 text-sm focus:outline-none`}
            type="search"
            name="search"
            placeholder="Search"
            autoFocus
            onBlur={() => setShowBar(false)}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 mr-2 mt-4">
            <HiSearch className="h-6 w-6 text-font-50" />
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setShowBar(true);
          }}
          type="submit"
          className="mr-2 mt-1.5"
        >
          <HiSearch className="h-6 w-6 text-font-50" />
        </button>
      )}
      <div
        className={`absolute ${searchResults.results && showBar && searchValue?.length > 0 ? "visible" : "hidden"} scrollbar-hide top-14 z-10 max-h-96 w-full overflow-y-scroll rounded-md bg-background-800 p-2`}
      >
        {searchResults.results && searchResults?.results?.length == 0 ? (
          <div className="rounded-md px-2 py-1 text-left">
            These are not the droids you're looking for
          </div>
        ) : (
          searchResults?.results
            ?.sort((a, b) => b.vote_count - a.vote_count)
            .map((result, index) => {
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
                <div key={result.id}>
                  <div
                    onMouseDown={() => {
                      setSearchValue("");
                      setShowBar(false);
                      navigate(`${media_type}/${result.id}`);
                    }}
                    className="hover flex cursor-pointer gap-2 rounded-md px-2 py-1 text-left hover:bg-background-900 hover:text-accent-500"
                  >
                    <img
                      src={
                        result.profile_path
                          ? `https://image.tmdb.org/t/p/w45/${result?.profile_path}`
                          : result.poster_path
                            ? `https://image.tmdb.org/t/p/w92/${result?.poster_path}`
                            : `https://ui-avatars.com/api/?name=${result.name}&background=random`
                      }
                      className="h-12 w-8 rounded-md"
                    />
                    {result.title || result.name}
                    {media_date && ` (${media_date})`}
                  </div>
                  {/* spacing bar under each result EXCEPT for the last result in the array */}
                  {index !== searchResults?.results.length - 1 && (
                    <hr className="opacity-25" />
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default SearchBar;
