import React from "react";

import { FaStar } from "react-icons/fa6";

import { Link } from "react-router-dom";

const CreditCard = ({ credit }) => {
  return (
    <Link to={`../../${credit.media_type}/${credit.id}`}>
      <div className="flex h-48 w-64 gap-2 rounded-md bg-accent-800 bg-opacity-40">
        {credit?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342/${credit?.poster_path}`}
            alt={`credit - ${credit.title}/${credit.character}`}
            className="w-28 min-w-28 rounded-l-md object-cover"
          />
        )}
        <div className="flex flex-col items-start gap-1 p-1">
          <span
            className="max-w-32 truncate text-font-100"
            title={credit.title || credit.name}
          >
            {credit.title || credit.name}
          </span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <FaStar className=" h-3 w-3 fill-yellow-600" />
              <span className="text-xs text-font-50">
                {Number(credit.vote_average.toFixed(1))}
              </span>
            </div>
            <span className="text-xs text-font-50">{credit.media_type}</span>
          </div>
          <span className="max-w-32 truncate text-xs text-font-50">
            {credit.character}
          </span>
          <span className="text-xs text-font-50">
            {credit?.release_date?.split("-")[0] ||
              credit?.first_air_date?.split("-")[0]}{" "}
            {credit.episode_count && <b>·</b>}{" "}
            {credit.episode_count && `${credit.episode_count} eps`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CreditCard;
