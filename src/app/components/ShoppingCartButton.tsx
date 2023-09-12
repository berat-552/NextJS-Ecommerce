"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import Link from "next/link";
import { ShoppingCartProps } from "@/types/types";

export default function ShoppingCart({ size }: ShoppingCartProps) {
  return (
    <Link href={"/cart"} className="btn btn-ghost btn-circle relative">
      <AiOutlineShoppingCart className="text-2xl" />
      {size ? (
        <span className="font-bold text-md absolute top-0 left-8 badge">
          {size}
        </span>
      ) : (
        <span className="font-bold text-md absolute top-0 left-8 badge">0</span>
      )}
    </Link>
  );
}
