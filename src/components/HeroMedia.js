import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";
import { getMediaDetails } from "../utils/loaderFunctions";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const HeroMedia = ({ baseMedia, path_prefix = "" }) => {
  const [heroMedia, setHeroMedia] = useState(baseMedia);

  const getMediaDetails = async (options, signal) =>
    await fetch(
      `https://api.themoviedb.org/3/${baseMedia.media_type}/${baseMedia.id}?append_to_response=videos&language=en-US`,
      {
        ...options,
        signal,
      },
    )
      .then((response) => response.json())
      .then((results) => {
        setHeroMedia(results);
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });

  useEffect(() => {
    const controller = new AbortController();

    baseMedia.media_type && getMediaDetails(apiOptions, controller.signal);

    return () => {
      controller.abort();
    };
  });

  return (
    Object.keys(heroMedia).length > 0 && (
      <div className="relative mx-auto max-h-[calc(100vh/7*5)] overflow-y-hidden">
        <img
          alt={heroMedia.id}
          src={
            heroMedia &&
            `https://image.tmdb.org/t/p/w1280/${heroMedia?.backdrop_path}`
          }
          className="max-h-screen w-full self-center rounded-md"
        />
        <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
        <div className="absolute inset-0 flex max-h-screen flex-col items-start justify-end">
          <div className="flex max-w-lg flex-col gap-4 p-6 2xl:py-24">
            <p className="text-left text-base font-extrabold text-font-50 md:text-2xl">
              {heroMedia?.title || heroMedia?.name}
            </p>
            <p className="max-w-xs truncate text-left text-xs text-font-50 hover:text-wrap md:w-full md:text-wrap md:text-sm">
              {heroMedia?.overview}
            </p>
            <div className="flex flex-row gap-4">
              {/* TODO: make the play button start a yourube iframe popup of the main trailer instead of auto play */}
              <a
                href={`https://www.imdb.com/title/${heroMedia.imdb_id}`}
                target={heroMedia.imdb_id && "_blank"}
              >
                <button className="text-accent-900-50 h-12 w-36 rounded-md bg-accent-300 font-extrabold">
                  Play
                </button>
              </a>
              <Link to={`${path_prefix}${heroMedia.id}`}>
                <button className="text-accent-900-50 flex h-12 w-36 items-center justify-evenly rounded-md bg-accent-100 font-extrabold opacity-50">
                  <InformationCircleIcon className="w-8" />
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
