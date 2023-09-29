"use client";
import { Review, ReviewFormProps } from "@/types/types";
import React, { useState, FormEvent } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function ReviewForm({ productId }: ReviewFormProps) {
  const initialReview = {
    rating: 1,
    message: "",
    name: "",
  };
  const [review, setReview] = useState<Review>(initialReview);

  //  loading state
  const [loading, setLoading] = useState(false);

  // success state
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  function handleRatingChange(value: number): void {
    setReview({ ...review, rating: value });
  }

  async function submitReview(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // initially false
    setLoading(false);
    setLoading(true);

    setSuccess(false);

    const { rating, message, name } = review;

    const response = await fetch("/api/add-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        message,
        name,
        productId,
      }),
    });

    setTimeout(() => {
      setLoading(false);
    }, 1250);

    setSuccess(true);
    if (response.ok) setReview(initialReview);

    // refresh for latest data
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-medium my-2 text-center">
        Add a review
      </h1>

      <form
        onSubmit={(e) => submitReview(e)}
        className="flex flex-col items-center justify-center max-w-sm mx-auto sm:max-w-md md:max-w-lg"
      >
        <div className="rating rating-lg my-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              required
              type="radio"
              value={value}
              className="mask mask-star-2 bg-orange-400"
              key={value}
              onChange={() => handleRatingChange(value)}
              checked={review.rating === value}
              // fixes check bug
            />
          ))}
        </div>

        <textarea
          required
          onChange={(e) => setReview({ ...review, message: e.target.value })}
          value={review.message}
          className="textarea textarea-primary max-w-md max-h-36 min-h-16 w-full border-2 text-md sm:text-xl"
          placeholder="Your Review"
        ></textarea>

        <div className="flex items-center justify-between">
          <input
            required
            onChange={(e) => setReview({ ...review, name: e.target.value })}
            value={review.name}
            type="text"
            placeholder="Name"
            className="input input-bordered input-primary w-full max-w-xs m-8 border-2 text-md sm:text-xl"
          />
        </div>

        <button type="submit" className="btn btn-primary mb-4 flex">
          Submit
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            success && <AiOutlineCheck className="text-xl" />
          )}
        </button>
      </form>
    </div>
  );
}
