import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const MediaSnippet = ({ media }) => {
  const formattedDate = formatDate(
    media?.release_date || media?.first_air_date || media?.air_date,
  );
  const directors = media.credits.crew.filter((crew) =>
    crew.job.includes("Director"),
  );
  const producers = media.credits.crew.filter((crew) =>
    crew.job.includes("Producer"),
  );
  return (
    <>
      <span className="space-x-2 text-xs font-light text-font-50 lg:text-base">
        <span className="m-0">{formattedDate}</span>
        <b>·</b>
        {media?.genres?.map((genre, index) => (
          <Link
            to={`../../genres/${genre.name}`}
            className=" m-0 hover:underline"
            key={genre.id}
          >
            {genre.name}
          </Link>
        ))}
      </span>

      <span className="m-0 py-2 text-xs text-font-100 lg:text-sm">
        {media.tagline}
      </span>

      <span className="pt-2 font-bold text-font-100">Overview</span>
      <span className="pb-2 text-left text-sm text-font-50">
        {media.overview}
      </span>

      <div className="flex min-w-full justify-between py-2 gap-2">
        {directors.length > 0 && (
          <div className="flex flex-col flex-wrap items-start overflow-hidden hover:z-10 ">
            <span className="flex-1 font-bold text-font-100">
              {directors.length > 1 ? "Directors" : "Director"}
            </span>
            <div className="flex h-40 max-h-40 flex-col flex-wrap items-start justify-start gap-x-2">
              {directors.slice(0, 12).map((director) => (
                <span className="text-font-50" key={director.id}>
                  {director?.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {producers.length > 0 && (
          <div className="flex flex-col flex-wrap items-start overflow-hidden hover:z-10">
            <span className="flex-1 font-bold text-font-100">
              {producers.length > 1 ? "Producers" : "Producer"}
            </span>
            <div className="flex h-40 max-h-40 flex-col flex-wrap items-start gap-x-2 ">
              {producers.slice(0, 12).map((producer) => (
                <span className="text-font-50" key={producer.id}>
                  {producer?.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MediaSnippet;
