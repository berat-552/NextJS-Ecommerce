import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // parse the body
  const data = await request.json();

  // make a new product in database
  await prisma.product.create({
    data: data,
  });

  revalidatePath("/");

  return NextResponse.json({
    message: "product created",
    status: 200,
  });
}
