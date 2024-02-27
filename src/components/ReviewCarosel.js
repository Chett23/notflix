import moment from "moment";
import React from "react";

const ReviewCarosel = ({ reviewsArray, header }) => {
  const formatDate = (timestamp) => {
    const created_at = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(Date.now(timestamp));
    return created_at;
  };

  return (
    <div className="flex w-full flex-col items-start">
      <span className="p-6 text-xl font-bold text-font-100">{header}</span>
      <div className="scrollbar-hide flex w-full flex-row gap-4 overflow-x-scroll px-6">
        {reviewsArray.map((review) => (
          <a
            href={review.url}
            alt={`Review by ${review.author}`}
            key={review.id}
            target="_blank"
          >
            <div className="group relative flex h-48 max-h-48 min-w-72 flex-col rounded-md bg-accent-900 p-2 text-left">
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-font-100">
                    {review.author}
                  </span>
                  <span
                    className="text-xs text-font-50"
                    title={formatDate(review.created_at)}
                  >
                    {moment(review.created_at).fromNow()}
                  </span>
                </div>
                {review.author_details.rating >= 5 ? (
                  <img
                    width="36"
                    height="36"
                    src="https://img.icons8.com/color/48/tomato.png"
                    alt="tomato"
                    title={review.author_details.rating}
                  />
                ) : (
                  <img
                    width="36"
                    height="36"
                    src="https://img.icons8.com/fluency/48/rotten-tomatoes.png"
                    title={review.author_details.rating}
                    alt="rotten-tomatoes"
                  />
                )}
              </div>
              <span className="line-clamp-6 pt-2 text-sm text-font-50">
                {review.content}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarosel;
