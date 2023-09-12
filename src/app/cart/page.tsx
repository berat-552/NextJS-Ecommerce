import { Metadata } from "next";
import React from "react";
import { getCart } from "@/lib/db/cart";
import CartItem from "../components/CartItem";
import { setProductQuantity } from "@/lib/setProductQuantity";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your cart - E-Commerce",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="min-h-screen">
      <h1 className="text-md sm:text-xl md:text-2xl text-center mt-5">
        Shopping Cart
      </h1>
      <div className="flex flex-col items-start justify-center my-4">
        <div>
          {cart &&
            cart.items.length > 0 &&
            cart.items.length > 0 &&
            cart.items.map((item) => (
              <CartItem
                setProductQuantity={setProductQuantity}
                product={item.product}
                quantity={item.quantity}
                key={item.id}
              />
            ))}
        </div>
      </div>
      {cart?.items.length === 0 && (
        <div className="flex flex-col items-center justify-end text-center h-56">
          <h1 className="text-xl sm:text-2xl font-medium">No Items in Cart!</h1>
          <Link href={"/"} className="btn btn-neutral mt-10">
            Browse Products
          </Link>
        </div>
      )}
      {cart && cart.items.length > 0 && (
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-lg sm:text-xl font-medium">
            Subtotal: {cart && formatPrice(cart.subtotal)} (+£8 VAT)
          </h1>

          <h1 className="text-xl sm:text-2xl font-medium mt-5">
            Total: {formatPrice(cart.subtotal + 8)}
          </h1>

          <button className="btn btn-accent mx-auto mt-5 pointer-events-none">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
