import React from "react";

const VideoCarosel = ({ videoArray, header }) => {
  return (
    <div className="flex w-full flex-col items-start">
      <span className="px-6 text-xl font-bold text-font-50">{header}</span>
      <div className=" scrollbar-hide flex w-full flex-row gap-4 overflow-x-scroll p-6 ">
        {videoArray.map((video) => (
          <a
            href={video.site === 'YouTube' && `https://youtube.com/watch?v=${video.key}`}
            target={video.site === 'YouTube' && "_blank"}
            key={`${video.id}`}
          >
            <div className="group relative flex h-full min-w-80 flex-col items-start">
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
          </a>
        ))}
      </div>
    </div>
  );
};

export default VideoCarosel;
