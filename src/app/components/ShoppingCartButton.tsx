"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import Link from "next/link";

interface ShoppingCartProps {
  size: number;
}

export default function ShoppingCart({ size }: ShoppingCartProps) {
  return (
    <Link href={"/cart"} className="btn btn-ghost btn-circle relative">
      <AiOutlineShoppingCart className="text-2xl" />
      <span className="font-bold text-md absolute top-0 left-8 badge">
        {size}{" "}
      </span>
    </Link>
  );
}
