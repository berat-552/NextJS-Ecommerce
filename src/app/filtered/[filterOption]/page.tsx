import FilterElement from "@/app/components/FilterElement";
import ProductCard from "@/app/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { FilteredPageProps } from "@/types/types";

import React from "react";

//  [key: string] - the keys are of type string
// { [key: string]: string }: This is specifying that the values associated with the keys in the object are themselves objects. These objects have keys of type string and values of type string
interface FilterOption {
  [key: string]: {
    [key: string]: string;
  };
}

const filterOptions: FilterOption = {
  LOW_TO_HIGH: { price: "asc" },
  HIGH_TO_LOW: { price: "desc" },
  NEW: { createdAt: "desc" },
  OLD: { createdAt: "asc" },
};

export default async function FilteredPage({
  params: { filterOption },
}: FilteredPageProps) {
  // access filter if the prop matches any of the filter options, else return empty object
  const orderByOption = filterOptions[filterOption] || {};

  const products = await prisma.product.findMany({
    orderBy: orderByOption,
  });

  return (
    <div>
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
    </div>
  );
}
