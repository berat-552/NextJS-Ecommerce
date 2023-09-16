import FilterElement from "@/app/components/FilterElement";
import ProductCard from "@/app/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { FilteredPageProps } from "@/types/types";

import React from "react";

export default async function FilteredPage({
  params: { filterOption },
}: FilteredPageProps) {
  let orderByOption = {};

  if (filterOption === "LOW_TO_HIGH") {
    orderByOption = { price: "asc" };
  } else if (filterOption === "HIGH_TO_LOW") {
    orderByOption = { price: "desc" };
  } else if (filterOption === "NEW") {
    orderByOption = { createdAt: "desc" };
  } else if (filterOption === "OLD") {
    orderByOption = { createdAt: "asc" };
  }

  const products = await prisma.product.findMany({
    orderBy: orderByOption,
  });

  return (
    <div>
      <>
        <div className="flex items-center justify-end mt-5 mr-14">
          <FilterElement products={products} />
        </div>

        <div className="font-medium mt-4">
          {filterOption === "LOW_TO_HIGH" ? (
            <h1 className="text-center text-xl">Price : Low to High</h1>
          ) : filterOption === "HIGH_TO_LOW" ? (
            <h1 className="text-center text-xl">Price : High to Low</h1>
          ) : filterOption === "NEW" ? (
            <h1 className="text-center text-xl">Newest Products</h1>
          ) : (
            <h1 className="text-center text-xl">Oldest Products</h1>
          )}
        </div>

        <div className="m-8 flex items-center justify-center flex-wrap">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      </>
    </div>
  );
}
