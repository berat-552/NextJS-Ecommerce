import { ProductReview } from "@/types/types";
import React from "react";

export default function Review({ review }: ProductReview) {
  return (
    <>
      <div className="flex items-center justify-start m-2 py-4 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="text-gray-300 w-16 h-16 -ml-1.5 -mt-1.5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clipRule="evenodd"
          ></path>
        </svg>
        <h1 className="text-md sm:text-xl mx-4 uppercase">{review.name}</h1>

        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name={`rating-${review.productId}`} // Use an empty string if productId is null
              className={`mask mask-star-2 cursor-default ${
                value <= review.rating ? "bg-orange-400" : ""
              }`}
              disabled
            />
          ))}
        </div>
      </div>
      <h1 className="ml-2 text-md sm:text-xl">{review.message}</h1>
    </>
  );
}
