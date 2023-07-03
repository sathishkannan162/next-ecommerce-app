"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage(): React.JSX.Element {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div>
        <div>{JSON.stringify(session)}</div>
        <div>signed in as {session?.user?.email}</div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <div>session not initialised</div>
      <button onClick={() => signIn()}>SignIn</button>
    </div>
  );
}
