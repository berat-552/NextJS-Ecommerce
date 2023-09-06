import prisma from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { ProductParams } from "@/types/types";
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

export default async function Product({ params: { id } }: ProductParams) {
  console.log(id);
  // fetch product with id
  const product = await getProduct(id);

  // if (!product) {
  //   return;
  // }

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
