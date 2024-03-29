"use client";
import "~/styles/globals.css";
import { Header } from "~/app/_components/Header";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import UserContext from "utils/userContext";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={inter.className}>
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Header />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
