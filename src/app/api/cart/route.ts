import { options } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function addProductToCart(userEmail: string, productId: number) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!user) {
    throw new Error("user authenticated but not in database");
  } else {
    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
    }
    // Retrieve the cart and product from the database
    // TODO: change this.
    // Create a new entry in the `ProductsOnCart` table
    const newProductOnCart = await prisma.productsOnCart.create({
      data: {
        cart: { connect: { id: cart.id } },
        product: { connect: { id: productId } },
      },
    });

    console.log(`Product with ID ${productId} added to cart ${cart.id}`);
    console.log("Updated cart:", cart.id);
    console.log("Updated product:", productId);
    console.log("Updated products on cart:", newProductOnCart);
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(options);
  let { productId } = await req.json();
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
  addProductToCart(session.user.email, productId);

  return NextResponse.json({
    message: `Product with ID ${productId} added to cart of ${session.user.name}`,
  });
}
