import React from "react";
import { useLoaderData } from "react-router-dom";
import { apiOptions } from "../Constants/data";
import {
  getSeasonDetails,
  getMediaDetails,
  getSeasonProviders,
} from "../utils/loaderFunctions";
import PeopleCarosel from "../components/PeopleCarosel";
import EpisodeCarosel from "../components/EpisodeCarosel";
import SeasonCarosel from "../components/SeasonCarosel";
import MediaHighlight from "../components/MediaHighlight";
import MediaCarosel from "../components/MediaCarosel";
import ReviewCarosel from "../components/ReviewCarosel";
import VideoCarosel from "../components/VideoCarosel";

export async function seasonPageLoader({ params }) {
  const media = await getMediaDetails(apiOptions, "tv", params.media_id);
  const season = await getSeasonDetails(
    apiOptions,
    "tv",
    params.media_id,
    params.season_number,
  );
  const seasonProviders = await getSeasonProviders(
    apiOptions,
    "tv",
    params.media_id,
    params.season_number,
  );

  return { season, media, seasonProviders };
}

export const SeasonPage = () => {
  const { season, media, seasonProviders } = useLoaderData();

  return (
    <div>
      {season?.id ? (
        <>
          <MediaHighlight
            media={season}
            providers={seasonProviders}
            path_prefix={`../${media.media_type}/`}
          />
          {season?.credits?.cast.length > 0 && (
            <PeopleCarosel people={season.credits.cast} heading={"Cast"} />
          )}
          {season?.episodes && (
            <EpisodeCarosel episodes={season.episodes} header={"Episodes"} />
          )}
          {media?.seasons && (
            <SeasonCarosel seasons={media.seasons} header={"Other Seasons"} />
          )}
          {season?.videos?.results.length > 0 && (
            <VideoCarosel videoArray={season.videos.results} header={"Clips"} />
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
