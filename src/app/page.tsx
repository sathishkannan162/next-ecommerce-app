'use client'
// import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
{/* import Navbar from "../components/navbar/Navbar"; */}

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <HeroSection />
      <ProductGrid />
    </main>
  );
}
