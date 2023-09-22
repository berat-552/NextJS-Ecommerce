import { ReviewFormProps } from "@/types/types";
import React from "react";
import Review from "./Review";
import { fetchReviews } from "@/lib/fetchReviews";

export default async function Reviews({ productId }: ReviewFormProps) {
  const reviews = await fetchReviews(productId);

  // calculates total number of reviews for each product
  const totalReviews = reviews.reduce((count, review) => {
    return count + 1;
  }, 0);

  return (
    <div className="flex flex-col items-start justify-center mb-4 mx-2">
      {reviews.length > 0 && (
        <h1 className="text-xl sm:text-2xl md:text-3xl m-2 font-medium">
          Reviews ({totalReviews})
        </h1>
      )}

      {reviews.length > 0 &&
        reviews.map((review) => <Review key={review.id} review={review} />)}
    </div>
  );
}
