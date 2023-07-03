import prisma from "@/lib/prisma";
import React from "react";
import AddToCart from "./AddToCart";

async function getProduct(productId: number) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });
  return product;
}

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);

  if (product === null) {
    return <div>Product does not exist</div>;
  }

  return (
    <div>
      <div>Title: {product.title}</div>
      <div>Product ID: {product.id}</div>
      <AddToCart productId={product.id} />
    </div>
  );
}
