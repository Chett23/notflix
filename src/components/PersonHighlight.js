import React from "react";

const formatDate = (date) => {
  const formattedDate = date?.split("-");
  return (
    formattedDate &&
    `${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}`
  );
};

const PersonHighlight = ({ person }) => {
  const formattedDate = formatDate(person?.birthday);
  return (
    <div className="max-w-screen relative mx-auto max-h-[calc(100vh/7*5)] min-h-72 overflow-y-hidden">
      <img
        alt={person?.id}
        src={
          person &&
          `https://image.tmdb.org/t/p/w1280/${person?.combined_credits?.cast[0].backdrop_path || person?.combined_credits?.cast[0].poster_path}`
        }
        className="max-h-screen min-h-72 w-full self-center rounded-md opacity-30"
      />
      <div className="absolute inset-0 max-h-screen rounded-md bg-gradient-to-tr from-accent-900 opacity-65"></div>
      <div className="absolute inset-0 m-auto flex max-h-96 w-full max-w-4xl flex-row items-center justify-center gap-4 p-10 lg:w-[calc(85vw)]">
        <div className="flex w-1/3 max-w-lg flex-col gap-4 p-2 lg:p-4">
          <img
            alt={person.id}
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w342/${person?.profile_path}`
                : `https://ui-avatars.com/api/?name=${person.name}&background=random`
            }
            className="rounded-md"
          />
        </div>
        <div className="flex h-full w-2/3 flex-col items-start justify-center lg:justify-start">
          <span className="text-font-100">
            <a
              href={
                person.imdb_id
                  ? `https://www.imdb.com/name/${person?.imdb_id}`
                  : `https://www.imdb.com/find/?q=${encodeURIComponent(person.name)}&ref_=nv_sr_sm`
              }
              alt="imdb page"
              target="_blank"
            >
              <span className="text-lg font-extrabold hover:text-accent-500 lg:text-2xl">
                {person?.name}{" "}
              </span>
            </a>
            <span className="m-0 py-2 text-xs text-font-100 lg:text-sm">
              {person?.known_for_department}
            </span>
          </span>
          <span className=" text-xs font-light text-font-50 lg:text-base">
            <span className="m-0">
              {formattedDate} <b>·</b>{" "}
            </span>
            <span className="font-extrathin lg:text-xl">
              {person?.place_of_birth}
            </span>
          </span>

          <span className="pt-2 font-bold text-font-100">Overview</span>
          <span className="scrollbar-hide max-h-48 overflow-y-scroll pb-2 text-left text-sm text-font-50">
            {person?.biography ||
              `${person?.name} is known for her role${person.combined_credits.length > 0 ? "s" : ""} in ${person.combined_credits.cast.map((credit) => `${credit.title} (${credit.release_date.split("-")[0]})`)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonHighlight;
