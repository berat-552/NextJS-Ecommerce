import prisma from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { ProductParams } from "@/types/types";
import { Metadata } from "next";
import Image from "next/image";
import React, { cache } from "react";

// cache data
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id, // or simply id as both variable names match
    },
  });
  return product;
});

// dynamic metadata
export async function generateMetadata({
  params: { id },
}: ProductParams): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product?.name,
    description: `Product ${product?.name} - E-Commerce`,
  };
}

export default async function Product({ params: { id } }: ProductParams) {
  // fetch product with id
  const product = await getProduct(id);

  return (
    <div className="flex flex-col items-center justify-center mt-10 min-h-screen">
      {product && (
        <div className="card max-w-full bg-base-100 shadow-xl">
          <figure>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>{formatPrice(product.price)}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
