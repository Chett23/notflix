import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ScrollArrows } from "./ScrollArrows";

const SeasonCarosel = ({ seasons, header }) => {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full justify-between">
        <span className="px-6 text-xl font-bold text-font-100">{header}</span>
        <ScrollArrows element_id={`SeasonCarosel - ${header}`} />
      </div>
      <div
        className=" scrollbar-hide flex w-full flex-row gap-4 overflow-x-scroll p-6 "
        id={`SeasonCarosel - ${header}`}
      >
        {seasons.map((season, index) => (
          <Link to={`seasons/${season.season_number}`} key={season?.id}>
            <div className="group relative flex h-full flex-col items-start">
              <img
                className="max-h-60 w-full rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/w342/${season.poster_path}`}
              />
              <div className="absolute inset-0 max-h-full max-w-full rounded-md bg-accent-900 opacity-0 group-hover:opacity-60 " />
              <div className="absolute inset-0 z-10 flex cursor-pointer flex-col justify-between gap-2 rounded-md px-2 py-4 text-left opacity-0 group-hover:opacity-100">
                <span className="text-base font-bold text-font-100">
                  {season.name}{" "}
                  <span className="font-light">
                    ({season?.air_date?.split("-")[0]})
                  </span>
                </span>
                <div className="flex flex-col">
                  <p className="text-base text-font-50">Rating:</p>
                  <div className="flex w-full flex-row items-center justify-start gap-4">
                    <FaStar className="size-4 text-yellow-500" />
                    <div className="flex flex-col gap-0">
                      <p className="space-y-0 text-base text-font-50">
                        <strong>
                          {Math.round(season.vote_average * 10) / 10}
                        </strong>{" "}
                        / 10
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeasonCarosel;
