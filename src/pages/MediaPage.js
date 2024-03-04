import React from "react";

import { getMediaDetails, getProviders } from "../utils/loaderFunctions";
import { apiOptions } from "../Constants/data";
import { useLoaderData } from "react-router-dom";
import MediaCarosel from "../components/MediaCarosel";
import PeopleCarosel from "../components/PeopleCarosel";
import VideoCarosel from "../components/VideoCarosel";
import SeasonCarosel from "../components/SeasonCarosel";
import MediaHighlight from "../components/MediaHighlight";
import ReviewCarosel from "../components/ReviewCarosel";

export async function mediaPageLoader({ params }) {
  const media_type =
    params.media_type === "movies"
      ? "movie"
      : params.media_type === "shows"
        ? "tv"
        : params.media_type;
  const media = await getMediaDetails(apiOptions, media_type, params.media_id);
  const providers = await getProviders(apiOptions, media_type, params.media_id);
  return { media, providers };
}

export const MediaPage = () => {
  const { media, providers } = useLoaderData();

  return (
    <div>
      {media?.id ? (
        <>
          <MediaHighlight
            media={media}
            providers={providers}
            path_prefix={`../${media.media_type}/`}
          />
          {media?.credits?.cast.length > 0 && (
            <PeopleCarosel people={media.credits.cast} heading={'Cast'} />
          )}
          {media?.seasons && (
            <SeasonCarosel seasons={media.seasons} header={"Seasons"} />
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
          {media?.reviews?.results.length > 0 && (
            <ReviewCarosel
              reviewsArray={media.reviews.results}
              header={"Reviews"}
            />
          )}
        </>
      ) : (
        <div className="pt-24 text-xl font-bold text-font-50">
          These are not the droids youre looking for
        </div>
      )}
    </div>
  );
};
