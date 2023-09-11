"use server";

import { revalidatePath } from "next/cache";
import { createCart, getCart } from "./db/cart";
import prisma from "./db/prisma";

export async function setProductQuantity(productId: string, quantity: number) {
  // get existing cart or create new
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => {
    return item.productId === productId;
  });

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: {
          id: articleInCart.id,
        },
      });
    }
  } else {
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
