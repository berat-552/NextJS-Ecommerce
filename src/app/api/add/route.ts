import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // parse the body
  const data = await request.json();

  if (!data) {
    return NextResponse.json({
      message: "Product could not be created",
      status: 404,
    });
  }

  // make a new product in database
  await prisma.product.create({
    data: data,
  });

  return NextResponse.json({
    message: "product created",
    status: 200,
  });
}
