"use client";
import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";

export interface CartItemProps {
  product: Product;
  quantity: number;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartItem({
  product,
  quantity,
  setProductQuantity,
}: CartItemProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: React.JSX.Element[] = [];

  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(<option value={i}>{i}</option>);
  }

  return (
    <>
      <div className="flex flex-row items-start justify-center">
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
              className="object-cover h-48 rounded-xl"
              priority
            />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>

          <div className="flex items-center justify-between">
            <p>Total: {formatPrice(product.price)}</p>
            {isPending && (
              <span className="loading loading-spinner loading-sm ml-2"></span>
            )}
          </div>

          <select
            className="select w-full max-w-[5rem]"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);

              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity);
              });
            }}
          >
            <option value={0} className=" font-bold">
              0 (Remove)
            </option>
            {quantityOptions}
          </select>
        </div>
      </div>
      <div className="m-2 h-1 bg-base-300 rounded-full" />
    </>
  );
}
