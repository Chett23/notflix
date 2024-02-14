import React from "react";
import { useEffect, useState } from "react";

import { HeroMedia } from "../components/HeroMedia";
import { getMediaDetails } from "../utils/loaderFunctions";
import { apiOptions } from "../Constants/data";
import { useLoaderData } from "react-router-dom";
import MediaCarosel from "../components/MediaCarosel";
import CastCarosel from "../components/CastCarosel";
import VideoCarosel from "../components/VideoCarosel";


export async function mediaPageLoader({ params }) {
  const media_type =
    params.media_type === "movies"
      ? "movie"
      : params.media_type === "shows"
        ? "tv"
        : params.media_type;
  const media = await getMediaDetails(apiOptions, media_type, params.media_id);
  return { media };
}

// TODO: hero media isnt changing when clicking on a media from the carousel while on mediapage. Id and url are accuratly changing.

export const MediaPage = () => {
  const { media } = useLoaderData();
  useEffect(() => {}, [media]);

  return (
    <div>
      {media?.id ? (
        <>
          <HeroMedia
            baseMedia={media}
            path_prefix={`../${media.media_type}/`}
          />
          {media?.credits?.cast.length > 0 && (
            <CastCarosel castArray={media.credits.cast} />
          )}
          {media?.videos?.results.length > 0 && (
            <VideoCarosel videoArray={media.videos.results} header={"Clips"} />
          )}
          {media?.recommendations?.results.length > 0 && (
            <MediaCarosel
              mediaArray={media.recommendations.results}
              header={"You may also like"}
              path_prefix="../"
            />
          )}
          {media?.similar?.results.length > 0 && (
            <MediaCarosel
              mediaArray={media.similar.results}
              header={`Similar to ${media?.title || media?.name}`}
              path_prefix={`../${media.media_type}`}
            />
          )}
          <div>Watch providers</div>
        </>
      ) : (
        <div className="pt-24 text-xl font-bold text-font-50">
          These are not the droids youre looking for
        </div>
      )}
    </div>
  );
};
