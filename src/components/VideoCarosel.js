import React, { useState } from "react";
import YouTube from "react-youtube";

import YouTubeModal from "./YouTubeModal";

const VideoCarosel = ({ videoArray, header }) => {
  const sortedVideos = videoArray.sort((a, b) =>
    ((a.type === "Trailer") === b.type) === "Trailer"
      ? 0
      : a.type === "Trailer"
        ? -1
        : 1,
  );
  return (
    <div className="flex w-full flex-col items-start">
      <span className="px-6 text-xl font-bold text-font-100">{header}</span>
      <div className=" scrollbar-hide flex w-full flex-row gap-4 overflow-x-scroll p-6 ">
        {sortedVideos.map((video) => (
          <YouTubeModal
            video={video}
            key={video.id}
            Component={({ setOpen }) => (
              <div
                className="group relative flex h-full min-w-80 flex-col items-start"
                onClick={() => setOpen(true)}
              >
                <img
                  className="max-h-44 w-full rounded-md object-cover"
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                />
                <div className="absolute inset-0 max-h-full max-w-full rounded-md bg-accent-900 opacity-0 group-hover:opacity-60 " />
                <div className="absolute inset-0 z-10 flex cursor-pointer flex-col justify-start gap-2 self-center rounded-md px-2 py-4 text-left opacity-0 group-hover:opacity-100">
                  <span className="text-base font-bold text-font-100">
                    {video.name}
                  </span>
                </div>
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarosel;
