import React from "react";
import { useSession } from "next-auth/react";
import { MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";

export interface SignInMenuTriggerProps {}

export default function SignInMenuTrigger(
  props: SignInMenuTriggerProps
): React.JSX.Element {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <></>
      ) : (
        <MenubarMenu>
          <Link href="/signin">
            <MenubarTrigger>Sign In </MenubarTrigger>
          </Link>
        </MenubarMenu>
      )}
    </>
  );
}
