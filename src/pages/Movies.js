import React from "react";
import { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MediaCard from "../components/MediaCard";

export const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState({});
  const [topMovies, setTopMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
    },
  };

  const getVideo = (details) => {
    return details.videos.results.find(
      (videoInfo) =>
        videoInfo.site == "YouTube" &&
        (videoInfo.type == "Teaser" || videoInfo.type == "Trailer"),
    );
  };

  const getTrendingMovies = async (options, signal) =>
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
      { ...options, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        const randMovieIndex = Math.floor(
          Math.random() * (response.results.length - 0 + 1) + 0,
        );
        setTrendingMovies(response.results);
        getHeroMovieData(response.results[randMovieIndex].id, options, signal);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  const getHeroMovieData = async (movie_id, options) =>
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos&language=en-US`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        let video = getVideo(response);
        console.log({ ...response, video: video });
        setHeroMovie({ ...response, video: video });
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
      {heroMovie && (
        <div className="relative mx-auto max-h-screen">
          {/* {heroMovie.video ? (
            <iframe
              className="h-96 max-h-screen w-full min-h-64 rounded-md object-cover"
              src={`https://youtube.com/embed/${heroMovie.video.key}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
              title="Embedded youtube"
            />
          ) : (
            <img
              alt={heroMovie?.id}
              src={
                heroMovie &&
                `https://image.tmdb.org/t/p/w1280/${heroMovie.backdrop_path}`
              }
              className="max-h-screen w-full rounded-md object-cover"
            />
          )} */}
		  <img
              alt={heroMovie?.id}
              src={
                heroMovie &&
                `https://image.tmdb.org/t/p/w1280/${heroMovie.backdrop_path}`
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
                <button className="text-accent-900-50 flex h-12 w-36 items-center justify-evenly rounded-md bg-accent-100 font-extrabold opacity-50">
                  <InformationCircleIcon className="w-8" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popular Movies */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Popular</p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {trendingMovies &&
            trendingMovies?.map((movie) => (
              <MediaCard
                key={movie.id}
                media_type={movie.media_type}
                options={apiOptions}
                media={movie}
              />
            ))}
        </div>
      </div>
      {/* Top Movies */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Top Rated </p>
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
      {/* Discover Movies */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-xl font-bold text-font-50">Discover </p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
          {discoverMovies?.map((show) => (
            <MediaCard
              key={show.id}
              media_type={"movie"}
              options={apiOptions}
              media={show}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
