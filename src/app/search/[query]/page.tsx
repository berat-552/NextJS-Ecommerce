import React from "react";
import { SearchProductParams } from "@/types/types";
import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import ProductCard from "@/app/components/ProductCard";
import { Metadata } from "next";

// dynamic metadata
export async function generateMetadata({
  params: { query },
}: SearchProductParams): Promise<Metadata> {
  return {
    title: query,
    description: `Results for ${query} - E-Commerce`,
  };
}

async function getProducts(query: string) {
  // returns all products that contain the query string
  const products = await prisma.product.findMany({
    where: {
      OR: [{ name: { contains: query, mode: "insensitive" } }], // case insensitive
    },
  });
  return products;
}

// pull query from url params
export default async function SearchPage({
  params: { query },
}: SearchProductParams) {
  // pass query to search products in db
  const products: Product[] = await getProducts(query);

  return (
    <div className="min-h-screen">
      {query && products.length > 0 && (
        <h1 className="mt-4 text-xl sm:text-2xl text-center font-medium">{`Results for "${query}"`}</h1>
      )}
      <div className="m-10 flex items-center justify-center flex-wrap">
        {products.length > 0 ? (
          products.map((product) => (
            <>
              <ProductCard product={product} key={product.id} />
            </>
          ))
        ) : (
          <h1 className="mt-4 text-xl sm:text-2xl text-center font-medium">{`No products match "${query}"`}</h1>
        )}
      </div>
    </div>
  );
}
