import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./lib/ui/nav/nav";
import { auth } from "@/auth";
import { CountProvider } from "./lib/contexts/BirdContext";

export const metadata: Metadata = {
  title: "Bird Keeper",
  description: "An App to hold onto birds you've found",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <html lang="en">
      <body className="">
        {isLoggedIn ? (
          <>
            <CountProvider userid={session.user!.name!}>
              <Nav />
              {children}
            </CountProvider>
          </>
        ) : (
          <>
            <div className="w-full h-full">
              <Nav />
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
