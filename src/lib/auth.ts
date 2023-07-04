import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { JWT } from "next-auth/jwt";

export type UserWithCartandId = Session["user"] & { cartId: string } & {
  id: string;
};

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
  session: {
    strategy: "jwt",
  },
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
  callbacks: {
    async session({ session, token }) {
      console.log({ token });
      console.log({ session });
      const userWithCartAndId = session.user as UserWithCartandId; // tsserver is not reloading the types from node modules folder after changes. So, I recast types, though i have correctly applied the types in nodemodules folder
      if (token) {
        if (session.user === undefined ) {
          return session;
        } else {
          userWithCartAndId.cartId = token.cartId as string;
          userWithCartAndId.id = token.userId as string;
          // /* @ts-ignore */ //Session type is inside node module and changing it doesn't reflect in my tsserver
          // session.user.cartId = token.cartId;

          // /* @ts-ignore */ //Session type is inside node module folder and changing it doesn't reflect in my tsserver
          // session.user.id = token.userId;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        let cart = await prisma.cart.findUnique({
          where: {
            userId: user.id,
          },
        });
        if (!cart) {
          cart = await prisma.cart.create({
            data: {
              userId: user.id,
            },
          });
        }
        token.cartId = cart.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.userId = user.id;
        return token;
      }
      return token;
    },
  },
};
