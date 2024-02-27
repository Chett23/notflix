import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const formattedDate = date.split("-");
  return `${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}`;
};

const MediaHighlight = ({ media, providers, path_prefix }) => {
  const formattedDate = formatDate(
    media?.release_date || media?.first_air_date,
  );
  const directors = media.credits.crew.filter((crew) =>
    crew.job.includes("Director"),
  );
  const producers = media.credits.crew.filter((crew) =>
    crew.job.includes("Producer"),
  );

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
      <div className="absolute inset-0 m-auto flex max-h-96 w-full max-w-4xl flex-row items-center justify-center gap-4 p-10 lg:w-[calc(85vw)]">
        <div className="flex w-1/3 max-w-lg flex-col gap-4 p-2 lg:p-4">
          <img
            alt={media.id}
            src={`https://image.tmdb.org/t/p/w342/${media?.poster_path}`}
            className="rounded-md"
          />
        </div>
        <div className="flex h-full w-2/3 flex-col items-start justify-center lg:justify-start">
          <span className="text-font-100">
            <span className="text-lg font-extrabold lg:text-2xl">
              {media.title || media.name}{" "}
            </span>
            <span className="font-extrathin lg:text-xl">
              (
              {media?.release_date?.split("-")[0] ||
                media?.first_air_date?.split("-")[0]}
              )
            </span>
          </span>
          <span className=" text-xs font-light text-font-50 lg:text-base">
            <span className="m-0">
              {formattedDate} <b>·</b>{" "}
            </span>
            {media.genres.map((genre, index) => (
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

          <div className="flex min-w-full justify-between py-2">
            {directors.length > 0 && (
              <div className="flex flex-col flex-wrap items-start">
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
              <div className="flex flex-col flex-wrap items-start">
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
        </div>
      </div>
    </div>
  );
};

export default MediaHighlight;
