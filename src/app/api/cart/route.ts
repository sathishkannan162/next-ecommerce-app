import { options, UserWithCartandId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function addProductToCart(cartId: string, productId: number) {
  // Retrieve the cart and product from the database
  // TODO: change this.
  // Create a new entry in the `ProductsOnCart` table
  // const checkProductOnCart = await prisma.productsOnCart.findUnique({
  //   where: {
  //     cartId_productId: {
  //       cartId: cartId,
  //       productId: productId,
  //     },
  //   },
  // });
  // if (checkProductOnCart) {
  //   return false;
  // }

  const newProductOnCart = await prisma.productsOnCart.create({
    data: {
      cart: { connect: { id: cartId } },
      product: { connect: { id: productId } },
    },
  });

  console.log(`Product with ID ${productId} added to cart ${cartId}`);
  console.log("Updated cart:", cartId);
  console.log("Updated product:", productId);
  console.log("Updated products on cart:", newProductOnCart);
}

export interface ApiBody {
  productId: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(options);
  let { productId }: ApiBody = await req.json();

  if (
    session === null ||
    session === undefined ||
    session.user?.email == undefined ||
    session.user?.email === null
  ) {
    return NextResponse.json({
      message: "user not signed in or email not present",
    });
  }
  const userWithCartAndId = session.user as UserWithCartandId;
  await addProductToCart(userWithCartAndId.cartId, productId);

  return NextResponse.json({
    message: `Product with ID ${productId} added to cart of ${session.user.name}`,
  });
}
