import React from "react";
import { Link } from "react-router-dom";

const PeopleCarosel = ({ people, heading }) => {
  return (
    <div className="flex w-full flex-col items-start">
      <span className="p-6 text-xl font-bold text-font-100">{heading}</span>
      <div className="scrollbar-hide flex w-full flex-row gap-4 overflow-x-scroll p-6 ">
        {people.map((castMember, index) => (
          // <a href="">
          <Link
            to={`../people/${castMember.id}`}
            key={`${castMember.id} - ${index}`}
          >
            <div className="flex h-full max-w-36 flex-col items-center">
              <img
                className="max-h-36 min-w-36 rounded-full object-cover"
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${castMember.profile_path}`
                    : `https://ui-avatars.com/api/?name=${castMember.name}&background=random`
                }
              />
              <span className="text-base font-bold text-font-100">
                {castMember.character}
              </span>
              <span className="text-sm text-font-200">{castMember.name}</span>
            </div>
          </Link>
          // </a>
        ))}
      </div>
    </div>
  );
};

export default PeopleCarosel;
