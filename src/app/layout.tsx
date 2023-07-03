import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elona",
  description:
    "Ecommerce website, selling mobile phones, clothes and kitchen wares",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
