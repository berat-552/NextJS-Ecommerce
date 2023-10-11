import { fetchReviews } from "@/lib/fetchReviews";
import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export interface ProductCardProps {
  product: Product;
}

export default async function ProductCard({ product }: ProductCardProps) {
  // new if createdAt is less than 7 days old
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  // reviews for that specific product
  const reviews = await fetchReviews(product.id);

  // calculates total number of reviews for each product
  const totalReviews = reviews.reduce((count, review) => {
    return count + 1;
  }, 0);

  function averageReviews(): number {
    if (totalReviews === 0) {
      return 0; // Return 0 if there are no reviews
    }

    let totalRatings = 0;

    for (let i = 0; i < reviews.length; i++) {
      // append all the reviews' rating property
      totalRatings += reviews[i].rating;
    }

    // divide ratings by number of reviews
    return totalRatings / totalReviews;
  }

  const avgReview = averageReviews();

  function generateStars() {
    let stars: React.JSX.Element[] = [];

    // round down integer
    const numFullStars = Math.floor(avgReview);

    if (avgReview < 1) return stars;

    // dynamically add number of stars
    for (let i = 0; i < numFullStars; i++) {
      stars.push(
        <AiFillStar key={i} className="ml-1 text-xl text-yellow-500" />
      );
    }

    // condition to add half star
    if (avgReview - numFullStars >= 0.4) {
      stars.push(
        <BsStarHalf
          key={Math.floor(Math.random() * 9999)}
          className="ml-1 text-yellow-500"
        />
      );
    }

    return stars;
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="card card-compact  bg-base-100 hover:shadow-xl transition-shadow max-w-sm mx-2 my-2 duration-300"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="object-cover h-48"
          priority
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="text-md flex items-center text-lg">
          <span>{avgReview >= 1 ? avgReview.toFixed(1) : 0}/5</span>
          <div className="flex">{generateStars()}</div>
        </div>

        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
