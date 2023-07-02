"use client";
import ProductCard from "./ProductCard";
import React, { useState } from "react";
import products, { product } from "../../data/products";

export interface ProductGridProps {}

export default function ProductGrid(
  props: ProductGridProps
): React.JSX.Element {
  const [cartItems, setCartItems] = useState<number[]>([]);

  return (
    <>
      <div>CartItems:</div>
      <div className="flex flex-col gap-2">
        {cartItems.map((id, index) => (
          <div key={index}>{id}</div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 py-8">
          {products.map((product) => (
            <ProductCard
              cartItems={cartItems}
              setCartItems={setCartItems}
              productId={product.id}
              title={product.title}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
