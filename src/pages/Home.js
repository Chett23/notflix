import React from "react";
import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";

import { apiOptions } from "../Constants/data";
import { HeroMedia } from "../components/HeroMedia";
import MediaCarosel from "../components/MediaCarosel";

import {
  getMovies,
  getShows,
  getTopMovies,
  getTopShows,
} from "../utils/loaderFunctions";

//
// Loadrers
//

export async function homeLoader() {
  const movies = await getMovies(apiOptions);
  const topMovies = await getTopMovies(apiOptions);
  const shows = await getShows(apiOptions);
  const topShows = await getTopShows(apiOptions);
  return { movies, topMovies, shows, topShows };
}

//
// Component
//

export const Home = () => {
  const { movies, topMovies, topShows, shows } = useLoaderData();

  useEffect(() => {}, []);

  return (
    <div>
      {movies.length > 0 && (
        <HeroMedia
          baseMedia={movies[Math.floor(Math.random() * movies.length)]}
        />
      )}
      <MediaCarosel mediaArray={movies} header="Popular Mmovies" />
      <MediaCarosel mediaArray={shows} header={"Popular TV Shows"} />
      <MediaCarosel mediaArray={topMovies} header={"Top Movies"} />
      <MediaCarosel mediaArray={topShows} header={"Top TV Shows"} />
    </div>
  );
};
