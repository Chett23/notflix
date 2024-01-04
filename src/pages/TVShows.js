import React from "react";
import { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MediaCard from "../components/MediaCard";

export const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [topShows, setTopShows] = useState([]);

  const randMovieIndex = Math.floor(Math.random() * shows.length + 0);

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
    },
  };

  const getShows = async (options, raceFlag) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1",
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        !raceFlag && setShows(response.results);
      })
      .catch((err) => console.error(err));

  const getTopShows = async (options, raceFlag) =>
    await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        !raceFlag && setTopShows(response.results);
      })
      .catch((err) => console.error(err));

  useEffect(() => {
    let raceFlag = false;

    getShows(apiOptions, raceFlag);
    getTopShows(apiOptions, raceFlag);

    return () => {
      raceFlag = true;
    };
  }, []);

  return (
    <div>
      {shows && (
        <div className="relative mx-auto max-h-screen">
          <img
            alt={shows[randMovieIndex]?.id}
            src={
              shows[randMovieIndex] &&
              `https://image.tmdb.org/t/p/w1280/${shows[randMovieIndex]?.backdrop_path}`
            }
            className="max-h-screen w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
          <div className="absolute inset-0 flex max-h-screen flex-col items-start justify-end">
            <div className="flex max-w-lg flex-col gap-4 p-6 2xl:py-24">
              <p className="text-left text-base font-extrabold text-font-50 md:text-2xl">
                {shows[randMovieIndex]?.title}
              </p>
              <p className="max-w-xs truncate text-left text-xs text-font-50 hover:text-wrap md:w-full md:text-wrap md:text-sm">
                {shows[randMovieIndex]?.overview}
              </p>
              <div className="flex flex-row gap-4">
                <button className="text-accent-900-50 h-12 w-36 rounded-md bg-accent-300 font-extrabold">
                  Play
                </button>
                <button className="text-accent-900-50 flex h-12 w-36 items-center justify-evenly rounded-md bg-accent-100 font-extrabold opacity-50">
                  <InformationCircleIcon className="w-8" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popular Shows */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Popular TV Shows</p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {shows?.map((show) => (
            <MediaCard
              key={show.id}
              media_type={show.media_type}
              options={apiOptions}
              media={show}
            />
          ))}
        </div>
      </div>
      {/* Top Shows */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Top Shows </p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {topShows?.map((show) => (
            <MediaCard
              key={show.id}
              media_type={"tv"}
              options={apiOptions}
              media={show}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
