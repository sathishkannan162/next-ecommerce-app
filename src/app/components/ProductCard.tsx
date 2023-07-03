import React, { SetStateAction } from "react";
import Link from "next/link";

export interface ProductCardProps {
  title: string;
  productId: number;
  // cartItems: number[];
  // setCartItems: React.Dispatch<SetStateAction<number[]>>;
}

export default function ProductCard({
  title,
  productId,
}: // cartItems,
// setCartItems,
ProductCardProps): React.JSX.Element {
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  // e.preventDefault();
  // setCartItems([...cartItems, productId]);
  // };

  return (
    <Link href={`/product/${productId}`}>
      <div className="flex h-48 w-80 flex-col items-center justify-center gap-4 bg-slate-200">
        {title}
        {/* <button onClick={handleClick} className="bg-blue-200 p-2"> */}
        {/*   Add to Cart */}
        {/* </button> */}
      </div>
    </Link>
  );
}
