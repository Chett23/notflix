import React, { useState } from "react";
import CreditCard from "./CreditCard";
import { ScrollArrows } from "./ScrollArrows";

const KnownFor = ({ person }) => {
  const [seeAll, setSeeAll] = useState(false);
  const credit_source =
    person.combined_credits.cast.length == 0 ? "crew" : "cast";

  const credits = person.combined_credits[credit_source]
    .reduce((condenced_in_progress, credit) => {
      const credit_index = condenced_in_progress.findIndex(
        (item) => item.id === credit.id,
      );
      const credit_type = credit_source == "cast" ? "character" : "job";
      if (credit_index >= 0) {
        condenced_in_progress[credit_index] = {
          ...condenced_in_progress[credit_index],
          character: `${condenced_in_progress[credit_index][credit_type]} / ${credit[credit_type]}`,
          episode_count:
            condenced_in_progress[credit_index].episode_count +
            credit.episode_count,
        };
        return condenced_in_progress;
      } else {
        return [credit, ...condenced_in_progress];
      }
    }, [])
    .reverse()
    .sort((a, b) =>
      a.order == undefined
        ? 1
        : a.order - b.order || b.vote_count - a.vote_count,
    );

  return (
    <div className="mx-auto flex min-h-72 w-full flex-col items-start p-4">
      <div className="flex w-full justify-between">
        <span className="max-h-56 pb-2 text-lg font-bold text-font-100 xl:text-xl">
          Known For:
        </span>
        {!seeAll && <ScrollArrows element_id={`KnownFor`} />}
      </div>
      <div
        className={`${seeAll ? "min-h-96 flex-wrap" : "flex-nowrap"} scrollbar-hide flex max-w-full gap-4 overflow-x-scroll`}
        id="KnownFor"
      >
        {credits.slice(0, seeAll ? credits.length : 12).map((credit) => (
          <CreditCard
            credit={credit}
            creditSource={credit_source}
            key={`${credit.id} - ${credit.credit_id}`}
          />
        ))}
      </div>
      <span
        onClick={() => setSeeAll((prev) => !prev)}
        className={`cursor-pointer p-1 text-font-100 hover:text-accent-500 `}
      >
        {seeAll ? "Less" : "More"}
      </span>
    </div>
  );
};

export default KnownFor;
