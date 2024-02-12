import React from "react";
import { useEffect, useState } from "react";

import { HeroMedia } from "../components/HeroMedia";
import { getMediaDetails } from "../utils/loaderFunctions";
import { apiOptions } from "../Constants/data";
import { useLoaderData } from "react-router-dom";

export async function mediaPageLoader({ params }) {
  const media = await getMediaDetails(
    apiOptions,
    params.media_type,
    params.media_id,
  );
  return { media };
}

export const MediaPage = ({ params }) => {
  const { media } = useLoaderData();
  useEffect(() => {}, []);

  // TODO:
  // media page url does not work correctly when starting from /movies or /shows
  // top movies list doesnt work correctly media_type is not present

  return (
    <div>
      {media ? (
        <HeroMedia baseMedia={media} />
      ) : (
        <div className="text-font-50">Media</div>
      )}
    </div>
  );
};
