'use client'
import { SessionProvider } from "next-auth/react"
import React from "react";

export interface NextAuthProviderProps {
    children?: React.ReactNode;
  }

export default function NextAuthProvider({
  children,
}: NextAuthProviderProps) {
  return (
    <SessionProvider> 
    {children}
    </SessionProvider>
  )
}
