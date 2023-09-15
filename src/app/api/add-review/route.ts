import prisma from "@/lib/db/prisma";
import { Review } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // parse the body
  const review: Review = await request.json();

  if (!review) {
    return NextResponse.json({
      message: "Review data is missing or invalid",
      status: 404,
    });
  }

  // create new review in database
  await prisma.review.create({
    data: {
      rating: review.rating,
      name: review.name,
      message: review.message,
      productId: review.productId,
    },
  });

  return NextResponse.json({
    message: "Review created successfully",
    status: 200,
  });
}
