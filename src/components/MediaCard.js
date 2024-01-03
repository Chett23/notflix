import React from "react";

import { StarIcon } from "@heroicons/react/24/solid";

function MediaCard({ media }) {
  return (
    <div className="group relative mx-auto min-w-48 rounded-md" key={media.id}>
      <img
        alt={media.id}
        src={`http://image.tmdb.org/t/p/original/${media.poster_path}`}
        className="rounded-md"
      />
      <div className="absolute inset-0 rounded-md bg-accent-900 opacity-0 group-hover:opacity-40 "></div>
      <div className="absolute inset-0 z-10 flex h-auto w-full cursor-pointer flex-col justify-between gap-2 self-center rounded-md bg-accent-900 px-2 py-4 text-left opacity-0 group-hover:opacity-100">
        <p className="text-lg font-extrabold text-font-50">
          {media?.title || media?.name}
        </p>
        <div className="flex flex-col">
          <p className="text-base text-font-50">Rating</p>
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-font-50">
                <strong>{Math.round(media.vote_average * 10) / 10}</strong> / 10
              </p>
              <p className="text-xxs text-font-50">{media.vote_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
