import AddToCartButton from "@/app/components/AddToCartButton";
import prisma from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { ProductParams } from "@/types/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { cache } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { incrementProductQuantity } from "@/lib/incrementProductQuantity";
import ReviewForm from "@/app/components/ReviewForm";
import Reviews from "@/app/components/Reviews";
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
    <>
      <Link
        href={".."}
        className="flex justify-start items-center ml-10 mt-4 group"
      >
        <AiOutlineArrowLeft className="text-2xl" />
        <p className="opacity-0 group-hover:opacity-100 transition-all px-1 text-xl">
          Back
        </p>
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {product && (
          <div className="max-w-sm card sm:max-w-full bg-base-100">
            <figure>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain w-auto h-auto rounded-xl"
                priority
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p>{formatPrice(product.price)}</p>
              <div className="card-actions justify-end">
                <AddToCartButton
                  productId={product.id}
                  incrementProductQuantity={incrementProductQuantity}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Reviews productId={id} />
      <div className="h-1 w-full bg-primary" />

      <ReviewForm productId={id} />
    </>
  );
}
