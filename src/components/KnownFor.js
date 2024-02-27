import React from "react";
import CreditCard from "./CreditCard";

const KnownFor = ({ person }) => {
  const sorted = person.combined_credits.cast.sort(
    (a, b) => b.vote_average - a.vote_average,
  );


  return (
    <div className="mx-auto flex h-full w-full flex-col items-start p-4 xl:w-3/5">
      <span className="max-h-56 pb-2 text-lg font-bold text-font-100 xl:text-xl">
        Known For:
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {sorted.slice(0, 12).map((credit) => (
          <CreditCard credit={credit} key={credit.credit_id} />
        ))}
      </div>
    </div>
  );
};

export default KnownFor;
