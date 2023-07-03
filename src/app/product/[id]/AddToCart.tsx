"use client";
import React, { useState } from "react";
import { postData } from "@/helpers/fetchers";

export interface AddToCartProps {
  productId: number;
}

export default function AddToCart({
  productId,
}: AddToCartProps): React.JSX.Element {
  const [inCart, setInCart] = useState<boolean>(false);

  const handleClick = async () => {
    setInCart(() => true);
    const response = await postData("/api/cart", { productId: productId });
    if (!response.ok) {
      alert("server error: not added to cart");
      setInCart(() => false);
    }
    else {
        alert('added')
      }
  };

  return (
    <button
      className={`${inCart ? "bg-green-300" : "bg-blue-300"} p-2`}
      onClick={handleClick}
    >
      {inCart ? "Added" : "Add to Cart"}
    </button>
  );
}
