import React, { useState } from "react";
import CreditCard from "./CreditCard";

const KnownFor = ({ person }) => {
  const [seeAll, setSeeAll] = useState(false);
  const sorted = person.combined_credits.cast.sort(
    (a, b) => b.vote_average - a.vote_average,
  );

  // combine credits for multiple roles in the same production, https://stackoverflow.com/questions/33850412/merge-javascript-objects-in-array-with-same-key

  return (
    <div className="mx-auto flex min-h-72 w-full flex-col items-start p-4">
      <span className="max-h-56 pb-2 text-lg font-bold text-font-100 xl:text-xl">
        Known For:
      </span>
      <div
        className={`${seeAll ? "min-h-96 flex-wrap" : "flex-nowrap"} scrollbar-hide flex max-w-full gap-4 overflow-x-scroll`}
      >
        {sorted.slice(0, seeAll ? sorted.length : 12).map((credit) => (
          <CreditCard credit={credit} key={credit.credit_id} />
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
