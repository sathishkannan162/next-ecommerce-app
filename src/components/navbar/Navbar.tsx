"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import Logo from "./assets/elona_1.png";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// export const truncateFirstName = (name: string, maxLength: number) => {
// const firstName = name.split(" ")[0];
// if (firstName.length > maxLength) {
// return firstName.slice(0, maxLength).concat("...");
// }
// return firstName;
// };

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <Menubar>
      <Link href="/">
        <div className="px-4">
          <Image height="16" src={Logo} alt="Elona Ecommerce Logo" />
        </div>
      </Link>
      <SearchBar />
      <div className="flex flex-row">
        {session ? (
          <></>
        ) : (
          <MenubarMenu>
            <MenubarTrigger>Sign In</MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Your Orders</MenubarItem>
            {session ? (
              <MenubarItem>
                <button onClick={() => signOut()}>Sign Out</button>
              </MenubarItem>
            ) : (
              <></>
            )}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <FaShoppingCart /> Cart
          </MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};

export default Navbar;
