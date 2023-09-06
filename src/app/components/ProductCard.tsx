import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // new if less than 7 days old
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

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
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className="badge badge-secondary">NEW</div>}

        <p>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
