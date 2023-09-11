"use server";
import { revalidatePath } from "next/cache";
import { createCart, getCart } from "./db/cart";
import prisma from "./db/prisma";

export async function incrementProductQuantity(productId: string) {
  // either fetch existing cart or create new cart
  let cart = await getCart();

  if (!cart) {
    cart = await createCart();
  }

  const articleInCart = cart.items.find((item) => {
    return item.productId === productId;
  });

  // if a product already exists, we don't want to make a new entry but increase quantity
  if (articleInCart) {
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId, // short syntax
        quantity: 1,
      },
    });
  }

  // refreshes with latest data
  revalidatePath("/products/[id]");
}
