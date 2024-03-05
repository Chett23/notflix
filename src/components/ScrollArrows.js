import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const ScrollArrows = ({ element_id }) => {
  return (
    <div className="flex items-center gap-2 text-font-100 ">
      <IoIosArrowBack
        className="size-6 cursor-pointer"
        onClick={() =>
          document.getElementById(element_id).scrollBy({
            left: -window.innerWidth / 1.1,
            behavior: "smooth",
          })
        }
      />
      <IoIosArrowForward
        className="size-6 cursor-pointer"
        onClick={() =>
          document
            .getElementById(element_id)
            .scrollBy({ left: window.innerWidth / 1.1, behavior: "smooth" })
        }
      />
    </div>
  );
};
