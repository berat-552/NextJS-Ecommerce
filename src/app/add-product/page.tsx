"use client";

import { Product } from "@/types/types";
import { revalidatePath } from "next/cache";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
  });

  const { push } = useRouter();
  async function addProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, description, imageUrl, price } = product;

    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imageUrl,
      }),
    });

    push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl mb-4">Add Product</h1>
      <form
        onSubmit={(e) => addProduct(e)}
        className="flex flex-col items-center justify-center w-full"
      >
        <input
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          type="text"
          placeholder="Product Name"
          required
          className="input input-bordered w-full max-w-md my-5"
        />

        <input
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          type="url"
          placeholder="Image URL (unsplash images)"
          required
          className="input input-bordered w-full max-w-md my-5"
        />

        <input
          onChange={(e) =>
            setProduct({ ...product, price: parseInt(e.target.value) })
          }
          type="number"
          placeholder="Price"
          required
          className="input input-bordered w-full max-w-md my-5"
        />

        <textarea
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="textarea textarea-bordered my-4 max-h-36 min-h-16 max-w-xs w-full"
          required
          placeholder="Description"
        ></textarea>

        <button type="submit" className="btn w-1/4">
          Add
        </button>
      </form>
    </div>
  );
}
