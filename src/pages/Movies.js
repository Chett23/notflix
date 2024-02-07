import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";

import { HeroMedia } from "../components/HeroMedia";
import MediaCarosel from "../components/MediaCarosel";

export const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);


  const getVideo = (details) => {
    return details.videos.results.find(
      (videoInfo) =>
        videoInfo.site === "YouTube" &&
        (videoInfo.type === "Teaser" || videoInfo.type === "Trailer"),
    );
  };

  const getTrendingMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        setTrendingMovies(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getDiscoverMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        setDiscoverMovies(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getTopMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        setTopMovies(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getGenres = async (options, signal) =>
    await fetch("https://api.themoviedb.org/3/genre/movie/list", {
      ...options,
      signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setGenres(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  useEffect(() => {
    const controller = new AbortController();

    getTrendingMovies(apiOptions, controller.signal);
    getTopMovies(apiOptions, controller.signal);
    getDiscoverMovies(apiOptions, controller.signal);
    getGenres(apiOptions, controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {trendingMovies.length > 0 && (
        <HeroMedia
          baseMedia={
            trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
          }
        />
      )}
      <MediaCarosel mediaArray={trendingMovies} header={"Popular"} />
      <MediaCarosel mediaArray={topMovies} header={"Top Rated"} />
      <MediaCarosel mediaArray={discoverMovies} header={"Discover"} />
    </div>
  );
};
