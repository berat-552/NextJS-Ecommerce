import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  // parse the body
  const searchQuery = await request.json();

  if (!searchQuery) {
    // Handle the case where the product is not found
    return NextResponse.json({
      message: "Product not found",
      status: 404,
    });
  }

  // find searched products
  const product = await prisma.product.findMany({
    where: {
      name: searchQuery,
    },
  });

  // Handle the case where the product is found
  return NextResponse.json({
    message: "Product found",
    status: 200,
    product, // return product
  });
}
