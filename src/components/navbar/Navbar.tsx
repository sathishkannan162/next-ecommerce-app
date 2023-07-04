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
import SignInMenuTrigger from "./SignInMenuTrigger";
import SignoutItem from "./SignoutItem";

const Navbar = () => {
  return (
    <Menubar>
      <Link href="/">
        <div className="px-4">
          <Image height="16" src={Logo} alt="Elona Ecommerce Logo" />
        </div>
      </Link>
      <SearchBar />
      <div className="flex flex-row">
        <Link href="/">
          <MenubarMenu>
            <MenubarTrigger>Home</MenubarTrigger>
          </MenubarMenu>
        </Link>
        <SignInMenuTrigger />
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent>
            <Link href="/orders">
              <MenubarItem>Your Orders</MenubarItem>
            </Link>
            <SignoutItem />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <Link href="/cart">
            <MenubarTrigger>
              <FaShoppingCart /> Cart
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};

export default Navbar;
