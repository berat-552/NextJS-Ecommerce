"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";

export default function ShoppingCart() {
  return (
    <button className="btn btn-ghost btn-circle">
      <AiOutlineShoppingCart className="text-xl" />
    </button>
  );
}
