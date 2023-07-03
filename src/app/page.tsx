// import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
// import Navbar from "../components/navbar/Navbar";
import prisma from "@/lib/prisma";

async function getProducts() {
  let products = await prisma.product.findMany();
  console.log(products);
  return products;
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <HeroSection />
      <ProductGrid products={products} />
    </main>
  );
}
