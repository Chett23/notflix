import React, { useState } from "react";

import ProviderSnippet from "./ProviderSnippet";
import MediaSnippet from "./MediaSnippet";

const MediaHighlight = ({ media, providers }) => {
  const [showProviders, setShowProviders] = useState(true);

  return (
    <div className="max-w-screen relative mx-auto max-h-[calc(100vh/7*5)] min-h-72 overflow-y-hidden">
      <img
        alt={media.id}
        src={
          media &&
          `https://image.tmdb.org/t/p/w1280/${media?.backdrop_path || media?.poster_path}`
        }
        className="max-h-screen w-full self-center rounded-md opacity-30"
      />
      <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
      <div className="absolute inset-0 m-auto flex max-h-96 w-full max-w-4xl flex-row items-center justify-center gap-4 lg:w-[calc(85vw)]">
        <div className="flex w-1/3 max-w-lg flex-col gap-4 p-2 lg:p-4">
          <img
            alt={media.id}
            src={`https://image.tmdb.org/t/p/w342/${media?.poster_path}`}
            className="rounded-md"
          />
        </div>
        <div className="flex h-full w-2/3 flex-col items-start justify-center lg:justify-start">
          <div className="flex w-full justify-between">
            <span className="w-full text-left text-font-100">
              <a
                className={
                  media.homepage
                    ? "hover:text-accent-500"
                    : "pointer-events-none"
                }
                href={media.homepage || ""}
                alt={`${media.title || media.name} IMDB Page`}
                target={media.homepage && "_blank"}
              >
                <span className="text-lg font-extrabold lg:text-2xl">
                  {media.title || media.name}{" "}
                </span>
              </a>
              <span className="font-extrathin lg:text-xl">
                (
                {media?.release_date?.split("-")[0] ||
                  (media.first_air_date &&
                    `${media?.first_air_date?.split("-")[0]} - ${media?.last_air_date?.split("-")[0]}`) ||
                  media?.air_date.split("-")[0]}
                )
              </span>
            </span>
            <span
              className=" m-auto cursor-pointer rounded-md bg-background-900 p-1 text-xs text-font-100 hover:text-accent-500"
              onClick={() => setShowProviders((prev) => !prev)}
            >
              {showProviders ? "Details" : "Where To watch?"}
            </span>
          </div>
          {showProviders ? (
            <ProviderSnippet providers={providers} media={media} />
          ) : (
            <MediaSnippet media={media} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaHighlight;
