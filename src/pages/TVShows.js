import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";

import MediaCarosel from "../components/MediaCarosel";
import { HeroMedia } from "../components/HeroMedia";

export const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [discoverShows, setDiscoverShows] = useState([]);

  const getShows = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1",
      {...options,signal},
    )
      .then((response) => response.json())
      .then((response) => {
        setShows(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });
  const getTopShows = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      {...options,signal},
    )
      .then((response) => response.json())
      .then((response) => {
        setTopShows(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getDiscoverMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/discover/tv?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        setDiscoverShows(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  useEffect(() => {
    const controller = new AbortController();

    getShows(apiOptions, controller.signal);
    getTopShows(apiOptions, controller.signal);
    getDiscoverMovies(apiOptions, controller.signal);

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
