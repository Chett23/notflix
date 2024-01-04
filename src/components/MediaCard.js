import React from "react";
import { useEffect, useState } from "react";

import { StarIcon } from "@heroicons/react/24/solid";

function MediaCard({ media, options, media_type }) {
  const [watchProvidersResults, setwatchProvidersResults] = useState({});

  const getProviders = async (media_type, media_id, raceFlag) => {
    await fetch(
      `https://api.themoviedb.org/3/${media_type}/${media_id}/watch/providers`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        let usResults = response.results?.US;
        !raceFlag &&
          setwatchProvidersResults({
            free: usResults?.free || [],
            ...usResults,
          });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let raceFlag = false;

    getProviders(media_type, media.id);

    return () => {
      raceFlag = true;
    };
  }, []);
  return (
    <div className="group relative mx-auto min-w-48 rounded-md" key={media.id}>
      <img
        alt={media.id}
        src={
          media.poster_path &&
          `https://image.tmdb.org/t/p/w342/${media.poster_path}`
        }
        className="rounded-md"
      />
      <div className="absolute inset-0 rounded-md bg-accent-900 opacity-0 group-hover:opacity-40 "></div>
      <div className="absolute inset-0 z-10 flex h-auto w-full cursor-pointer flex-col justify-end gap-2 self-center rounded-md bg-accent-900 px-2 py-4 text-left opacity-0 group-hover:opacity-100">
        <p className="absolute top-2 z-10 max-w-44 truncate text-lg font-extrabold text-font-50 hover:text-wrap hover:bg-accent-900">
          {media?.title || media?.name}
        </p>
        <div className="scrollbar-hide max-h-40 overflow-x-scroll">
          {watchProvidersResults &&
            Object.keys(watchProvidersResults).map((paymentMethod) => {
              if (
                paymentMethod != "link" &&
                watchProvidersResults[paymentMethod].length > 0
              ) {
                return (
                  <div
                    key={`${media.id} - ${paymentMethod}`}
                    className="flex flex-col"
                  >
                    <p className="text-font-50">
                      {paymentMethod.charAt(0).toUpperCase() +
                        paymentMethod.slice(1)}
                      :
                    </p>
                    <div className="scrollbar-hide flex flex-row gap-2 truncate hover:overflow-x-scroll">
                      {watchProvidersResults[paymentMethod].map((provider) => (
                        <img
                          alt={`${media.id} - ${provider.provider_name}`}
                          key={`${media.id} - ${provider.provider_name}`}
                          src={`https://image.tmdb.org/t/p/w45/${provider.logo_path}`}
                          className="w-5 rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="flex flex-col">
          <p className="text-base text-font-50">Rating:</p>
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <div className="flex flex-col gap-0">
              <p className="space-y-0 text-base text-font-50">
                <strong>{Math.round(media.vote_average * 10) / 10}</strong> / 10
              </p>
              <p className="space-y-0 text-xs text-font-50">
                {media.vote_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
