import React from "react";
import { Carousel } from "@material-tailwind/react";

export const ImageCarosel = ({ images }) => {
  return (
    <div className="flex w-full flex-col items-start">
      <span className="text-lg text-font-100">Images</span>
      <div className="m-auto flex max-w-fit items-center border">
        <Carousel className="max-w-xl rounded-xl" loop="true">
          {images.map((image, index) => (
            <img
              src={`https://image.tmdb.org/t/p//w300/${image.file_path}`}
              alt={index}
              className="size-full object-cover"
            />
          ))}
        </Carousel>
        <div className="scrollbar-hide flex max-h-[700px] max-w-full flex-col gap-4 overflow-y-scroll p-6 ">
          {images.map((image, index) => (
            <img
              src={`https://image.tmdb.org/t/p//w300/${image.file_path}`}
              alt={index}
              className="size-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
