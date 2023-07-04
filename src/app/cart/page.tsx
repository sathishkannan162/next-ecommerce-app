import { options } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getProductsOnCart() {
  const session = await getServerSession(options);
  if (session === null) {
    redirect("/signin");
  }
  if (
    session.user === null ||
    session.user === undefined ||
    session.user?.email === null ||
    session.user?.email === undefined
  ) {
    return "user or user email not defined";
  }

  const userWithCart = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
    include: {
      cart: true,
    },
  });
  if (userWithCart === null) {
    return "no such user is found";
  }

  if (userWithCart.cart === null) {
    return "no cart present";
  }

  const productsOnCart = await prisma.productsOnCart.findMany({
    where: {
      cartId: userWithCart.cart.id,
    },
    include: {
      product: true,
    },
  });
  console.log(JSON.stringify(productsOnCart));

  return productsOnCart.map((product) => product.product.title);
}

export default async function Cart() {
  const products = await getProductsOnCart();
  if (products === "no such user is found") {
    redirect("/sigin");
  }
  if (products === "no cart present") {
    return <div>Add products to cart to View.</div>;
  }
  if (products === "user or user email not defined") {
    redirect("/sigin");
  }

  return (
    <div>
      <div>Cart</div>
      <div>
        {products.map((product: string, index: number) => (
          <div key={index}>{product}</div>
        ))}
      </div>
    </div>
  );
}
