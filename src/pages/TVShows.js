import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";

import MediaCarosel from "../components/MediaCarosel";
import { HeroMedia } from "../components/HeroMedia";
import { useLoaderData } from "react-router-dom";
import { getShows, getTopShows, getDiscoverShows } from "../utils/loaderFunctions";

//
// Loader
//
export async function showsLoader() {
  const shows = await getShows(apiOptions);
  const topShows = await getTopShows(apiOptions);
  const discoverShows = await getDiscoverShows(apiOptions);

  return { shows, topShows,discoverShows };
}

export const TVShows = () => {
  const { shows, topShows, discoverShows } = useLoaderData();

  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {shows.length > 0 && (
        <HeroMedia
          baseMedia={shows[Math.floor(Math.random() * shows.length)]}
        />
      )}
      <MediaCarosel mediaArray={shows} header={"Popular"} />
      <MediaCarosel mediaArray={topShows} header={"Top Shows"} />
      <MediaCarosel mediaArray={discoverShows} header={"Discover Shows"} />
    </div>
  );
};
