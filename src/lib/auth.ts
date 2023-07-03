import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

// TODO: change authentication to use JWT, you don't need a database for persisting user session saving on cost.

if (
  process.env.GITHUB_CLIENT_ID === undefined ||
  process.env.GITHUB_CLIENT_SECRET === undefined ||
  process.env.GOOGLE_CLIENT_ID === undefined ||
  process.env.GOOGLE_CLIENT_SECRET === undefined
) {
  throw new Error("client id or secret for providers not set");
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
