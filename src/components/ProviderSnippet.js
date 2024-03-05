import React from "react";

import { HiOutlineInformationCircle } from "react-icons/hi";

const ProviderSnippet = ({ providers, media }) => {
  return (
    <div className="pt-4 text-start">
      <a
        href={providers.link || ""}
        alt={`${media.title || media.name} TMDB Page`}
        target={providers.link && "_blank"}
      >
        <span
          className={`pt-2 text-lg font-bold text-font-100 ${providers.link ? "hover:text-accent-500" : "pointer-events-none"}`}
        >
          Where To Watch
        </span>
      </a>
      {Object.keys(providers).length > 0 ? (
        Object.keys(providers).map(
          (paymentMethod) =>
            paymentMethod !== "link" &&
            providers[paymentMethod].length > 0 && (
              <div
                key={`${media.id} - ${paymentMethod}`}
                className="flex flex-col items-start"
              >
                <span className="py-1 text-font-50">
                  {paymentMethod.charAt(0).toUpperCase() +
                    paymentMethod.slice(1)}
                  :
                </span>
                <div className="scrollbar-hide flex flex-row gap-2 truncate hover:overflow-x-scroll">
                  {providers[paymentMethod].map((provider) => (
                    <img
                      alt={`${media.id} - ${provider.provider_name}`}
                      key={`${media.id} - ${provider.provider_name}`}
                      src={`https://image.tmdb.org/t/p/w185/${provider.logo_path}`}
                      className="w-14 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ),
        )
      ) : (
        <div className="pt-10 text-left text-font-100">
          Unfortunatly there is nowhere to watch this as of now, according to
          the{" "}
          <a
            href="https://www.justwatch.com/"
            target="_blank"
            rel="noreferrer"
            alt="Just Watch webpage"
            className="hover:text-accent-500"
          >
            Just Watch
          </a>{" "}
          database. Please check back later.
        </div>
      )}
    </div>
  );
};

export default ProviderSnippet;
