import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";
import { HeroMedia } from "../components/HeroMedia";
import MediaCarosel from "../components/MediaCarosel";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [topShows, setTopShows] = useState([]);

  const getMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getShows = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1",
      { ...options, signal },
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
      { ...options, signal },
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

  useEffect(() => {
    const controller = new AbortController();

    getMovies(apiOptions, controller.signal);
    getShows(apiOptions, controller.signal);
    getTopShows(apiOptions, controller.signal);
    getTopMovies(apiOptions, controller.signal);

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
      <MediaCarosel mediaArray={movies} header="Popular Mmovies" />
      <MediaCarosel mediaArray={shows} header={"Popular TV Shows"} />
      <MediaCarosel mediaArray={topMovies} header={"Top Movies"} />
      <MediaCarosel mediaArray={topShows} header={"Top TV Shows"} />
    </div>
  );
};
