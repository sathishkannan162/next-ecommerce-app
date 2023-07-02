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

const Navbar = () => {
  return (
      <Menubar>
          <div className="px-4" >
      <Image height="16" src={Logo} alt="Elona Ecommerce Logo" />
          </div>
          <SearchBar />
      <div className="flex flex-row">
      <MenubarMenu>
        <MenubarTrigger>Account</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Profile
          </MenubarItem>
          <MenubarItem>Orders</MenubarItem>
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
