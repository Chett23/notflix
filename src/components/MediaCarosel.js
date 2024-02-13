import React from "react";

import MediaCard from "./MediaCard";

const MediaCarosel = ({ mediaArray, header, path_prefix='' }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <p className="text-xl font-bold text-font-50">{header}</p>
      <div className="scrollbar-hide flex max-w-full gap-6 overflow-y-hidden overflow-x-scroll">
        {mediaArray &&
          mediaArray?.map((media) => (
            <MediaCard
              key={media.id}
              media_type={media.media_type}
              media={media}
              link_path={`${path_prefix}${media.id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default MediaCarosel;
