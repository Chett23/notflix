import React from "react";
import { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MediaCard from "../components/MediaCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovies] = useState({});
  const [topMovies, setTopMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [topShows, setTopShows] = useState([]);

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
    },
  };

  const getMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        const randMovieIndex = Math.floor(
          Math.random() * (response.results.length - 0 + 1) + 0,
        );
        setMovies(response.results);
        setHeroMovies(response.results[randMovieIndex]);
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
      {heroMovie && (
        <div className="relative mx-auto max-h-screen">
          <img
            alt={heroMovie.id}
            src={
              heroMovie &&
              `https://image.tmdb.org/t/p/w1280/${heroMovie?.backdrop_path}`
            }
            className="max-h-screen w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
          <div className="absolute inset-0 flex max-h-screen flex-col items-start justify-end">
            <div className="flex max-w-lg flex-col gap-4 p-6 2xl:py-24">
              <p className="text-left text-base font-extrabold text-font-50 md:text-2xl">
                {heroMovie?.title}
              </p>
              <p className="max-w-xs truncate text-left text-xs text-font-50 hover:text-wrap md:w-full md:text-wrap md:text-sm">
                {heroMovie?.overview}
              </p>
              <div className="flex flex-row gap-4">
                <button className="text-accent-900-50 h-12 w-36 rounded-md bg-accent-300 font-extrabold">
                  Play
                </button>
                <Link to={`media/${heroMovie?.id}`}>
                  <button className="text-accent-900-50 flex h-12 w-36 items-center justify-evenly rounded-md bg-accent-100 font-extrabold opacity-50">
                    <InformationCircleIcon className="w-8" />
                    More Info
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popular Movies */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Popular Movies</p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {movies &&
            movies?.map((movie) => (
              <MediaCard
                key={movie.id}
                media_type={movie.media_type}
                options={apiOptions}
                media={movie}
              />
            ))}
        </div>
      </div>
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
      {/* Top Movies */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Top Movies </p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {topMovies?.map((show) => (
            <MediaCard
              key={show.id}
              media_type={"movie"}
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
