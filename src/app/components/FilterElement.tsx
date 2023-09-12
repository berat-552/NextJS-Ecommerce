"use client";
import { FilterElementProps } from "@/types/types";
import { redirect } from "next/navigation";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
export default function FilterElement({ products }: FilterElementProps) {
  const router = useRouter();

  function filterProducts(e: ChangeEvent<HTMLSelectElement>) {
    const selectedFilter = e.target.value;

    // send user to page with page param
    router.push(`/filtered/${selectedFilter}`);
  }

  return (
    <select
      className="select select-bordered w-full max-w-[200px]"
      onChange={(e) => filterProducts(e)}
      defaultValue={""}
    >
      <option>-- Sort by --</option>
      <option value={"HIGH_TO_LOW"}>Price - High to Low</option>
      <option value={"LOW_TO_HIGH"}>Price - Low to High</option>
      <option value={"NEW"}>New - Old</option>
      <option value={"OLD"}>Old - New</option>
    </select>
  );
}
