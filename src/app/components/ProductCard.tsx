import { fetchReviews } from "@/lib/fetchReviews";
import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";

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
          <span>{averageReviews().toFixed(1)}/5 </span>
          <AiFillStar className="ml-1 text-xl" />
        </div>

        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
