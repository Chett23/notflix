import React from "react";
import { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const randMovieIndex = Math.floor(
    Math.random() * (movies.length - 0 + 1) + 0,
  );

  const getMovies = async () => {
    let results;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
      },
    };

    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
    return results;
  };

  const getShows = async () => {
    let results;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
      },
    };

    await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1",
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setShows(response.results);
      })
      .catch((err) => console.error(err));
    return results;
  };

  useEffect(() => {
    getMovies();
    getShows();
  }, []);

  return (
    <div>
      {movies && (
        <div className="relative mx-auto max-h-screen">
          <img
            alt={movies[randMovieIndex]?.id}
            src={
              movies[randMovieIndex] &&
              `http://image.tmdb.org/t/p/original/${movies[randMovieIndex]?.backdrop_path}`
            }
            className="max-h-screen w-full rounded-md object-cover"
          />
          <div className="from-accent-900 absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr opacity-65"></div>
          <div className="absolute inset-0 flex max-h-screen flex-col items-start justify-end">
            <div className="flex max-w-lg flex-col gap-4 p-6 2xl:py-24">
              <p className="text-font-50  text-left text-2xl font-bold">
                {movies[randMovieIndex]?.title}
              </p>
              <p className="text-font-50 text-left text-sm">
                {movies[randMovieIndex]?.overview}
              </p>
              <div className="flex flex-row gap-4">
                <button className="bg-accent-300 text-accent-900-50 h-12 w-36 rounded-md font-extrabold">
                  Play
                </button>
                <button className="bg-accent-100 text-accent-900-50 flex h-12 w-36 items-center justify-evenly rounded-md font-extrabold opacity-50">
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
        <p className="text-font-50 text-xl font-bold">Popular Movies</p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-scroll">
          {movies?.map((movie) => (
            <div
              className="group relative mx-auto min-w-48 rounded-md"
              key={movie.id}
            >
              <img
                alt={movie.id}
                src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="rounded-md"
              />
              <div className="bg-accent-900 absolute inset-0 rounded-md opacity-0 group-hover:opacity-40 "></div>
              <div className="bg-accent-900 absolute inset-0 top-10 z-10 flex w-96 cursor-pointer flex-col justify-end gap-2 text-left opacity-0 group-hover:opacity-100">
                {/* <p className="text-font-50 font-bold">{movie.title}</p> */}
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  <StarIcon className="h-8 w-8 text-yellow-500" />
                  <p className="text-font-50 font-bold">
                    {Math.round(movie.vote_average * 10) / 10} / 10
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Popular Shows */}
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="text-font-50 text-xl font-bold">Popular TV Shows</p>
        <div className="scrollbar-hide flex max-w-full gap-6 overflow-scroll">
          {shows?.map((show) => (
            <div className="b min-w-48 rounded-md" key={show.id}>
              <img
                alt={show.id}
                src={`http://image.tmdb.org/t/p/original/${show?.poster_path}`}
                className="rounded-md"
              />
              <p className="text-font-50">{show.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
