import React from "react";
import { useEffect, useState } from "react";

import { apiOptions } from "../Constants/data";

import { FaStar } from "react-icons/fa6";

import { Link } from "react-router-dom";

function MediaCard({ media, media_type, link_path }) {
  const [watchProvidersResults, setwatchProvidersResults] = useState({});

  const getProviders = async (media_type, media_id, signal) => {
    await fetch(
      `https://api.themoviedb.org/3/${media_type}/${media_id}/watch/providers`,
      { ...apiOptions, signal },
    )
      .then((response) => response.json())
      .then((response) => {
        let usResults = response.results?.US;
        setwatchProvidersResults({
          free: usResults?.free || [],
          ...usResults,
        });
      })
      .catch((err) => {
        if (err.message !== "The user aborted a request.") {
          console.error(err.message);
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    media_type && getProviders(media_type, media.id, controller.signal);

    return () => {
      controller.abort();
    };
  }, [media, media_type]);
  return (
    <Link to={link_path} preventScrollReset={false}>
      <div
        className="group relative mx-auto min-w-48 min-h-72 rounded-md"
        key={media.id}
      >
        <img
          alt={media.id}
          src={
            media.poster_path &&
            `https://image.tmdb.org/t/p/w342/${media.poster_path || media.backdrop_path}`
          }
          className="rounded-md h-72"
        />
        <div className={`absolute inset-0 rounded-md bg-accent-900 ${media.poster_path || media.backdrop_path ? 'opacity-0' : 'opacity-40'} group-hover:opacity-40 `}></div>
        <div className={`absolute inset-0 z-10 flex min-h-full w-full cursor-pointer flex-col justify-end gap-2 self-center rounded-md bg-accent-900 px-2 py-4 text-left  ${media.poster_path || media.backdrop_path ? 'opacity-0' : 'opacity-1000'} group-hover:opacity-80`}>
          <p className="absolute top-2 z-10 max-w-44 truncate text-lg font-extrabold text-font-50 hover:text-wrap hover:bg-accent-900">
            {media?.title || media?.name}
          </p>
          <div className="scrollbar-hide max-h-40 overflow-x-scroll">
            {watchProvidersResults &&
              Object.keys(watchProvidersResults).map((paymentMethod) => {
                return (
                  paymentMethod !== "link" &&
                  watchProvidersResults[paymentMethod].length > 0 && (
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
                        {watchProvidersResults[paymentMethod].map(
                          (provider) => (
                            <img
                              alt={`${media.id} - ${provider.provider_name}`}
                              key={`${media.id} - ${provider.provider_name}`}
                              src={`https://image.tmdb.org/t/p/w45/${provider.logo_path}`}
                              className="w-5 rounded-md"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  )
                );
              })}
          </div>
          <div className="flex flex-col">
            <p className="text-base text-font-50">Rating:</p>
            <div className="flex w-full flex-row items-center justify-start gap-4">
              <FaStar className="size-8 text-yellow-500" />
              <div className="flex flex-col gap-0">
                <p className="space-y-0 text-base text-font-50">
                  <strong>{Math.round(media.vote_average * 10) / 10}</strong> /
                  10
                </p>
                <p className="space-y-0 text-xs text-font-50">
                  {media.vote_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MediaCard;
