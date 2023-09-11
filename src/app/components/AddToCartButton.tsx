"use client";
import React, { useState } from "react";
import { AddToCartButtonProps } from "@/types/types";
import { AiOutlineShoppingCart, AiOutlineCheck } from "react-icons/ai";

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  // add to cart loading state
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  async function addToCart() {
    // initially false
    setLoading(false);
    setLoading(true);

    setSuccess(false);

    incrementProductQuantity(productId);

    setTimeout(() => {
      setLoading(false);
    }, 1250);

    setSuccess(true);
  }

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary" onClick={() => addToCart()}>
        Add To Cart
        <AiOutlineShoppingCart className="text-xl" />
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          success && <AiOutlineCheck className="text-xl" />
        )}
      </button>
    </div>
  );
}
