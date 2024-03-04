import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";

import { HeroMedia } from "../components/HeroMedia";
import MediaCarosel from "../components/MediaCarosel";
import { useLoaderData } from "react-router-dom";
import {
  getDiscoverMovies,
  getMovies,
  getTopMovies,
} from "../utils/loaderFunctions";

export async function moviesLoader() {
  const movies = await getMovies(apiOptions);
  const top = await getTopMovies(apiOptions);
  const discover = await getDiscoverMovies(apiOptions);

  return { movies, top, discover };
}

export const Movies = () => {
  const { movies, top, discover } = useLoaderData();

  const getVideo = (details) => {
    return details.videos.results.find(
      (videoInfo) =>
        videoInfo.site === "YouTube" &&
        (videoInfo.type === "Teaser" || videoInfo.type === "Trailer"),
    );
  };



  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {movies.length > 0 && (
        <HeroMedia
          baseMedia={movies[Math.floor(Math.random() * movies.length)]}
        />
      )}
      <MediaCarosel mediaArray={movies} header={"Popular"} path_prefix="../" />
      <MediaCarosel mediaArray={top} header={"Top Rated"} path_prefix="../" />
      <MediaCarosel
        mediaArray={discover}
        header={"Discover"}
        path_prefix="/movies"
      />
    </div>
  );
};
