'use client'
import React from "react";
import { MenubarItem } from "@/components/ui/menubar"
import { signOut, useSession } from "next-auth/react";

export interface SignoutItemProps {}

export default function SignoutItem(
  props: SignoutItemProps
): React.JSX.Element {
  const {data: session} = useSession();
  return (
    <>
      {session ? (
        <MenubarItem>
          <button onClick={() => signOut()}>Sign Out</button>
        </MenubarItem>
      ) : (
        <></>
      )}
    </>
  );
}
