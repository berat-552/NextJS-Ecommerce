import prisma from "./db/prisma";

export async function fetchReviews(id: string) {
  // get all reviews that match the productId
  const reviews = await prisma.review.findMany({
    where: {
      productId: id,
    },
  });

  return reviews;
}
