import React from "react";
import { useEffect, useState } from "react";

import { HeroMedia } from "../components/HeroMedia";
import { getMediaDetails } from "../utils/loaderFunctions";
import { apiOptions } from "../Constants/data";
import { useLoaderData } from "react-router-dom";
import MediaCarosel from "../components/MediaCarosel";

export async function mediaPageLoader({ params }) {
  const media_type =
    params.media_type === "movies"
      ? "movie"
      : params.media_type === "shows"
        ? "tv"
        : "";
  const media = await getMediaDetails(apiOptions, media_type, params.media_id);
  return { media };
}

// TODO: hero media isnt changing when clicking on a media from the carousel while on mediapage. Id and url are accuratly changing.


export const MediaPage = () => {
  const { media } = useLoaderData();
  console.log(media);
  useEffect(() => {}, [media]);

  return (
    <div>
      {media ? (
        <>
          <HeroMedia baseMedia={media} path_prefix="" />
          <div className="flex flex-col items-start w-full">
            <span className="text-lg p-6 font-bold text-font-50">Cast</span>
            <div className="scrollbar-hide p-6 flex w-full flex-row gap-4 overflow-x-scroll ">
              {media.credits.cast.map((castMember) => (
                <div className="h-full flex flex-col items-center max-w-36">
                  <img
                    className="max-h-36 min-w-36 rounded-full object-cover"
                    src={
                      castMember.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${castMember.profile_path}`
                        : `https://ui-avatars.com/api/?name=${castMember.name}&background=random`
                    }
                  />
                  <span className="text-base font-bold text-font-100">
                    {castMember.character}
                  </span>
                  <span className="text-sm text-font-200">
                    {castMember.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <MediaCarosel mediaArray={media.recommendations.results} header={'You may also like'} path_prefix="../shows/"/>
          <MediaCarosel mediaArray={media.similar.results} header={`Similar to ${media?.title || media?.name}`} path_prefix="../shows/"/>
        </>
      ) : (
        <div className="text-font-50"></div>
      )}
    </div>
  );
};
