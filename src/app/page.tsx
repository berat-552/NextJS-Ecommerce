import prisma from "@/lib/db/prisma";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import PaginationBar from "./components/PaginationBar";
import { HomeProps } from "@/types/types";

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  // convert to number
  const currentPage = parseInt(page);

  const pageSize = 4;

  // total number of products in database
  const totalItemCount = await prisma.product.count();

  // round up to integer
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const isEmpty = !products || products.length < 1 || !Array.isArray(products);

  // add products in db
  return (
    <>
      <div className="m-10 flex items-center justify-center flex-wrap">
        {!isEmpty ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <p>No products</p>
        )}
      </div>
      <div className="flex items-center justify-center">
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
}
