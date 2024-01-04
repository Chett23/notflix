import React from "react";
import { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MediaCard from "../components/MediaCard";

export const MediaPage = ({ media }) => {
  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
    },
  };

  useEffect(() => {}, []);

  return (
    <div>
      {media ? (
        <div className="relative mx-auto max-h-screen">
          <img
            alt={media?.id}
            src={`https://image.tmdb.org/t/p/w1280/${media?.backdrop_path}`}
            className="max-h-screen w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
          <div className="absolute inset-0 flex max-h-screen flex-col items-start justify-end">
            <div className="flex max-w-lg flex-col gap-4 p-6 2xl:py-24">
              <p className="text-left text-base font-extrabold text-font-50 md:text-2xl">
                {media?.title || media?.name}
              </p>
              <p className="max-w-xs truncate text-left text-xs text-font-50 hover:text-wrap md:w-full md:text-wrap md:text-sm">
                {media?.overview}
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
      ) : (
        <div className="text-font-50">Media</div>
      )}
    </div>
  );
};
