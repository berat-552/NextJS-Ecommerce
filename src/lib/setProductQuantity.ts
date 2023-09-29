"use server";

import { revalidatePath } from "next/cache";
import { createCart, getCart } from "./db/cart";
import prisma from "./db/prisma";

export async function setProductQuantity(
  productId: string,
  quantity: number
): Promise<void> {
  // get existing cart or create new
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => {
    return item.productId === productId;
  });

  // delete product from cart if quantity is changed to 0
  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: {
          id: articleInCart.id,
        },
      });
    }
  } else {
    // otherwise update quantity if it exists
    if (articleInCart) {
      await prisma.cartItem.update({
        where: {
          id: articleInCart.id,
        },
        data: {
          quantity, // short syntax
        },
      });
    } else {
      // or create a new entry
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity, // short syntax
        },
      });
    }
  }

  revalidatePath("/cart");
}
