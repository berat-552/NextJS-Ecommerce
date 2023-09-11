import { Metadata } from "next";
import React from "react";
import { getCart } from "@/lib/db/cart";
import CartItem from "../components/CartItem";
import { setProductQuantity } from "@/lib/setProductQuantity";

export const metadata: Metadata = {
  title: "Your cart - E-Commerce",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="min-h-screen">
      <h1 className="text-md sm:text-xl md:text-2xl text-center">
        Shopping Cart
      </h1>
      <div className="flex flex-col items-start justify-center my-4">
        <div>
          {cart &&
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
    </div>
  );
}
